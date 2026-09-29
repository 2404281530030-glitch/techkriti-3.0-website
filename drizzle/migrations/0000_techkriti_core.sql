CREATE TYPE public.app_role AS ENUM ('admin','user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "own roles readable" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admins manage roles" ON public.user_roles FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  fee_amount int NOT NULL DEFAULT 200,
  max_events int NOT NULL DEFAULT 4,
  registrations_open boolean NOT NULL DEFAULT true,
  announcement text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
INSERT INTO public.settings (id) VALUES (1);
GRANT SELECT ON public.settings TO anon, authenticated;
GRANT UPDATE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings public read" ON public.settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins update settings" ON public.settings FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE SEQUENCE public.participant_code_seq START 1001;

CREATE TABLE public.participants (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  participant_code text NOT NULL UNIQUE DEFAULT ('TK3-' || nextval('public.participant_code_seq')::text),
  full_name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  college text NOT NULL DEFAULT '',
  branch text NOT NULL DEFAULT '',
  year text NOT NULL DEFAULT '',
  payment_status text NOT NULL DEFAULT 'pending',
  amount_paid int NOT NULL DEFAULT 0,
  razorpay_order_id text,
  razorpay_payment_id text,
  paid_at timestamptz,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.participants TO authenticated;
GRANT ALL ON public.participants TO service_role;
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read own or admin" ON public.participants FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin update" ON public.participants FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "admin delete" ON public.participants FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- participants may edit only profile fields (not payment) via this function
CREATE OR REPLACE FUNCTION public.update_my_profile(_full_name text, _phone text, _college text, _branch text, _year text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  IF length(_full_name) > 100 OR length(_phone) > 20 OR length(_college) > 150 OR length(_branch) > 80 OR length(_year) > 20 THEN
    RAISE EXCEPTION 'Input too long';
  END IF;
  UPDATE public.participants SET full_name = trim(_full_name), phone = trim(_phone), college = trim(_college),
    branch = trim(_branch), year = trim(_year), updated_at = now()
  WHERE user_id = auth.uid();
END $$;
GRANT EXECUTE ON FUNCTION public.update_my_profile(text,text,text,text,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.participants (user_id, email, full_name)
  VALUES (NEW.id, COALESCE(NEW.email,''), COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  IF lower(NEW.email) = 'admin@techkriti.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.teams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug text NOT NULL,
  name text NOT NULL,
  leader_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_slug, name)
);

CREATE TABLE public.event_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_slug text NOT NULL,
  team_id uuid REFERENCES public.teams(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, event_slug)
);

CREATE TABLE public.team_invites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  invitee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (team_id, invitee_id)
);

CREATE OR REPLACE FUNCTION public.is_team_member(_team uuid, _user uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.event_registrations WHERE team_id = _team AND user_id = _user)
      OR EXISTS (SELECT 1 FROM public.team_invites WHERE team_id = _team AND invitee_id = _user)
$$;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.teams, public.event_registrations, public.team_invites TO authenticated;
GRANT ALL ON public.teams, public.event_registrations, public.team_invites TO service_role;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teams read" ON public.teams FOR SELECT TO authenticated
  USING (leader_id = auth.uid() OR public.is_team_member(id, auth.uid()) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "teams admin all" ON public.teams FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "regs read" ON public.event_registrations FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin')
         OR (team_id IS NOT NULL AND public.is_team_member(team_id, auth.uid())));
CREATE POLICY "regs admin all" ON public.event_registrations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "invites read" ON public.team_invites FOR SELECT TO authenticated
  USING (invitee_id = auth.uid() OR public.is_team_member(team_id, auth.uid()) OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "invites admin all" ON public.team_invites FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- limited public lookup: name for a participant code (for team invites)
CREATE OR REPLACE FUNCTION public.lookup_participant(_code text)
RETURNS TABLE (participant_code text, full_name text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT participant_code, full_name FROM public.participants WHERE upper(participant_code) = upper(trim(_code)) AND auth.uid() IS NOT NULL
$$;
GRANT EXECUTE ON FUNCTION public.lookup_participant(text) TO authenticated;

-- team member names visible to fellow members
CREATE OR REPLACE FUNCTION public.team_roster(_team uuid)
RETURNS TABLE (participant_code text, full_name text, status text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT p.participant_code, p.full_name, 'member' FROM public.event_registrations r JOIN public.participants p ON p.user_id = r.user_id
    WHERE r.team_id = _team AND (public.is_team_member(_team, auth.uid()) OR public.has_role(auth.uid(),'admin'))
  UNION ALL
  SELECT p.participant_code, p.full_name, i.status FROM public.team_invites i JOIN public.participants p ON p.user_id = i.invitee_id
    WHERE i.team_id = _team AND i.status = 'pending' AND (public.is_team_member(_team, auth.uid()) OR public.has_role(auth.uid(),'admin'))
$$;
GRANT EXECUTE ON FUNCTION public.team_roster(uuid) TO authenticated;

-- my pending invites with context
CREATE OR REPLACE FUNCTION public.my_invites()
RETURNS TABLE (invite_id uuid, team_name text, event_slug text, leader_name text, leader_code text) LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT i.id, t.name, t.event_slug, p.full_name, p.participant_code
  FROM public.team_invites i JOIN public.teams t ON t.id = i.team_id JOIN public.participants p ON p.user_id = t.leader_id
  WHERE i.invitee_id = auth.uid() AND i.status = 'pending'
$$;
GRANT EXECUTE ON FUNCTION public.my_invites() TO authenticated;

CREATE OR REPLACE FUNCTION public.check_can_join(_user uuid, _event text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE s record; cnt int; paid text;
BEGIN
  SELECT * INTO s FROM public.settings WHERE id = 1;
  IF NOT s.registrations_open THEN RAISE EXCEPTION 'Registrations are closed'; END IF;
  SELECT payment_status INTO paid FROM public.participants WHERE user_id = _user;
  IF paid IS DISTINCT FROM 'paid' THEN RAISE EXCEPTION 'Registration fee not paid yet'; END IF;
  IF EXISTS (SELECT 1 FROM public.event_registrations WHERE user_id = _user AND event_slug = _event) THEN
    RAISE EXCEPTION 'Already registered for this event'; END IF;
  SELECT count(*) INTO cnt FROM public.event_registrations WHERE user_id = _user;
  IF cnt >= s.max_events THEN RAISE EXCEPTION 'You can join at most % events', s.max_events; END IF;
END $$;

CREATE OR REPLACE FUNCTION public.join_event(_event text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  IF length(_event) > 60 THEN RAISE EXCEPTION 'Invalid event'; END IF;
  PERFORM public.check_can_join(auth.uid(), _event);
  INSERT INTO public.event_registrations (user_id, event_slug) VALUES (auth.uid(), _event);
END $$;
GRANT EXECUTE ON FUNCTION public.join_event(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.leave_event(_event text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE t uuid;
BEGIN
  SELECT team_id INTO t FROM public.event_registrations WHERE user_id = auth.uid() AND event_slug = _event;
  IF t IS NOT NULL AND EXISTS (SELECT 1 FROM public.teams WHERE id = t AND leader_id = auth.uid()) THEN
    DELETE FROM public.teams WHERE id = t; -- members' team_id set null
  END IF;
  DELETE FROM public.event_registrations WHERE user_id = auth.uid() AND event_slug = _event;
END $$;
GRANT EXECUTE ON FUNCTION public.leave_event(text) TO authenticated;

CREATE OR REPLACE FUNCTION public.create_team(_event text, _name text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE tid uuid; reg record;
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Not signed in'; END IF;
  IF length(trim(_name)) < 2 OR length(_name) > 50 THEN RAISE EXCEPTION 'Team name must be 2-50 characters'; END IF;
  SELECT * INTO reg FROM public.event_registrations WHERE user_id = auth.uid() AND event_slug = _event;
  IF reg IS NULL THEN
    PERFORM public.check_can_join(auth.uid(), _event);
  ELSIF reg.team_id IS NOT NULL THEN RAISE EXCEPTION 'You are already in a team for this event';
  END IF;
  INSERT INTO public.teams (event_slug, name, leader_id) VALUES (_event, trim(_name), auth.uid()) RETURNING id INTO tid;
  IF reg IS NULL THEN
    INSERT INTO public.event_registrations (user_id, event_slug, team_id) VALUES (auth.uid(), _event, tid);
  ELSE
    UPDATE public.event_registrations SET team_id = tid WHERE id = reg.id;
  END IF;
  RETURN tid;
END $$;
GRANT EXECUTE ON FUNCTION public.create_team(text,text) TO authenticated;

CREATE OR REPLACE FUNCTION public.invite_member(_team uuid, _code text, _max int)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE target uuid; ev text; size int;
BEGIN
  SELECT event_slug INTO ev FROM public.teams WHERE id = _team AND leader_id = auth.uid();
  IF ev IS NULL THEN RAISE EXCEPTION 'Only the team leader can invite'; END IF;
  SELECT user_id INTO target FROM public.participants WHERE upper(participant_code) = upper(trim(_code));
  IF target IS NULL THEN RAISE EXCEPTION 'No participant with ID %', _code; END IF;
  IF target = auth.uid() THEN RAISE EXCEPTION 'You are already in this team'; END IF;
  IF EXISTS (SELECT 1 FROM public.event_registrations WHERE user_id = target AND event_slug = ev AND team_id IS NOT NULL) THEN
    RAISE EXCEPTION 'This participant is already in a team for this event'; END IF;
  SELECT (SELECT count(*) FROM public.event_registrations WHERE team_id = _team)
       + (SELECT count(*) FROM public.team_invites WHERE team_id = _team AND status = 'pending') INTO size;
  IF _max > 0 AND size >= LEAST(_max, 10) THEN RAISE EXCEPTION 'Team is full'; END IF;
  INSERT INTO public.team_invites (team_id, invitee_id) VALUES (_team, target)
    ON CONFLICT (team_id, invitee_id) DO UPDATE SET status = 'pending';
END $$;
GRANT EXECUTE ON FUNCTION public.invite_member(uuid,text,int) TO authenticated;

CREATE OR REPLACE FUNCTION public.respond_invite(_invite uuid, _accept boolean)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE inv record; ev text; reg record;
BEGIN
  SELECT * INTO inv FROM public.team_invites WHERE id = _invite AND invitee_id = auth.uid() AND status = 'pending';
  IF inv IS NULL THEN RAISE EXCEPTION 'Invite not found'; END IF;
  IF NOT _accept THEN UPDATE public.team_invites SET status = 'declined' WHERE id = _invite; RETURN; END IF;
  SELECT event_slug INTO ev FROM public.teams WHERE id = inv.team_id;
  SELECT * INTO reg FROM public.event_registrations WHERE user_id = auth.uid() AND event_slug = ev;
  IF reg IS NULL THEN
    PERFORM public.check_can_join(auth.uid(), ev);
    INSERT INTO public.event_registrations (user_id, event_slug, team_id) VALUES (auth.uid(), ev, inv.team_id);
  ELSIF reg.team_id IS NOT NULL THEN RAISE EXCEPTION 'You are already in a team for this event';
  ELSE UPDATE public.event_registrations SET team_id = inv.team_id WHERE id = reg.id;
  END IF;
  UPDATE public.team_invites SET status = 'accepted' WHERE id = _invite;
END $$;
GRANT EXECUTE ON FUNCTION public.respond_invite(uuid,boolean) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.check_can_join(uuid,text) FROM PUBLIC, anon, authenticated;