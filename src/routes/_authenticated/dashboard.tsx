import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { z } from "zod";
import { Calendar, Clock, LogOut, MapPin, Plus, Trash2, UserPlus, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createFeeOrder, verifyFeePayment } from "@/lib/payments.functions";
import { loadRazorpay } from "@/lib/csv";
import { events3, eventBySlug } from "@/data/events3";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My Dashboard | Techकृति 3.0" },
      { name: "description", content: "Your Techकृति 3.0 participant ID, events, schedule and teams." },
      { property: "og:title", content: "My Dashboard | Techकृति 3.0" },
      { property: "og:description", content: "Your Techकृति 3.0 participant dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Dashboard,
});

type Participant = {
  user_id: string; participant_code: string; full_name: string; email: string; phone: string;
  college: string; branch: string; year: string; payment_status: string; amount_paid: number;
};
type Reg = { id: string; event_slug: string; team_id: string | null };
type Team = { id: string; name: string; event_slug: string; leader_id: string };
type Invite = { invite_id: string; team_name: string; event_slug: string; leader_name: string; leader_code: string };
type Roster = { participant_code: string; full_name: string; status: string };

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(100),
  phone: z.string().trim().regex(/^[0-9+\-\s]{10,15}$/, "Enter a valid phone number"),
  college: z.string().trim().min(2, "Enter your college").max(150),
  branch: z.string().trim().min(1, "Enter your branch").max(80),
  year: z.string().trim().min(1, "Enter your year").max(20),
});

function Dashboard() {
  const navigate = useNavigate();
  const [me, setMe] = useState<Participant | null>(null);
  const [regs, setRegs] = useState<Reg[]>([]);
  const [teams, setTeams] = useState<Record<string, Team>>({});
  const [rosters, setRosters] = useState<Record<string, Roster[]>>({});
  const [invites, setInvites] = useState<Invite[]>([]);
  const [settings, setSettings] = useState({ fee_amount: 0, max_events: 4, registrations_open: true, announcement: null as string | null });
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const [p, r, s, inv] = await Promise.all([
      supabase.from("participants").select("*").eq("user_id", u.user.id).single(),
      supabase.from("event_registrations").select("id, event_slug, team_id").eq("user_id", u.user.id),
      supabase.from("settings").select("*").eq("id", 1).single(),
      supabase.rpc("my_invites"),
    ]);
    if (p.data) setMe(p.data as Participant);
    const regList = (r.data ?? []) as Reg[];
    setRegs(regList);
    if (s.data) setSettings(s.data as typeof settings);
    setInvites((inv.data ?? []) as Invite[]);
    const teamIds = regList.map((x) => x.team_id).filter(Boolean) as string[];
    if (teamIds.length) {
      const { data: t } = await supabase.from("teams").select("*").in("id", teamIds);
      const map: Record<string, Team> = {};
      (t ?? []).forEach((x) => (map[x.id] = x as Team));
      setTeams(map);
      const ros: Record<string, Roster[]> = {};
      await Promise.all(teamIds.map(async (id) => {
        const { data } = await supabase.rpc("team_roster", { _team: id });
        ros[id] = (data ?? []) as Roster[];
      }));
      setRosters(ros);
    } else { setTeams({}); setRosters({}); }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  if (loading || !me) return <div className="pt-40 text-center text-muted-foreground">Loading your dashboard…</div>;

  const profileDone = !!(me.full_name && me.phone && me.college && me.branch && me.year);
  const paid = me.payment_status === "paid";

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-28">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-eyebrow">Participant dashboard</p>
          <h1 className="font-display mt-1 text-3xl font-bold">Hi, {me.full_name || "there"}</h1>
        </div>
        <Button variant="ghost" onClick={signOut}><LogOut /> Sign out</Button>
      </div>
      {settings.announcement && (
        <div className="mt-6 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm">{settings.announcement}</div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <IdCard me={me} paid={paid} />
        <div className="lg:col-span-2">
          {!profileDone || !paid ? (
            <ProfileAndPay me={me} settings={settings} profileDone={profileDone} onDone={load} />
          ) : (
            <ProfileEditor me={me} onDone={load} compact />
          )}
        </div>
      </div>

      {invites.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-xl font-bold">Team requests</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {invites.map((i) => (
              <div key={i.invite_id} className="glass flex items-center justify-between gap-3 rounded-xl p-4">
                <div>
                  <p className="font-medium">{i.team_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {eventBySlug(i.event_slug)?.title} · by {i.leader_name} ({i.leader_code})
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="success" onClick={async () => {
                    const { error } = await supabase.rpc("respond_invite", { _invite: i.invite_id, _accept: true });
                    if (error) toast.error(error.message); else { toast.success("Joined team"); load(); }
                  }}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={async () => {
                    await supabase.rpc("respond_invite", { _invite: i.invite_id, _accept: false }); load();
                  }}>Decline</Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {paid && (
        <>
          <section className="mt-10">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-xl font-bold">My events</h2>
              <span className="text-sm text-muted-foreground">{regs.length} / {settings.max_events} selected</span>
            </div>
            {regs.length === 0 && <p className="mt-4 text-muted-foreground">You haven't picked any events yet — choose below.</p>}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {regs.map((r) => (
                <MyEvent key={r.id} reg={r} team={r.team_id ? teams[r.team_id] : undefined}
                  roster={r.team_id ? rosters[r.team_id] ?? [] : []} myId={me.user_id} onChange={load} />
              ))}
            </div>
          </section>
          {regs.length < settings.max_events && (
            <BrowseEvents taken={regs.map((r) => r.event_slug)} onChange={load} />
          )}
        </>
      )}
    </div>
  );
}

function IdCard({ me, paid }: { me: Participant; paid: boolean }) {
  return (
    <div className="glass glow relative overflow-hidden rounded-2xl p-6">
      <div className="bg-gradient-brand absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-30 blur-2xl" />
      <img src="/logo.png" alt="" className="h-10" />
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">Participant ID</p>
      <p className="font-display text-gradient text-3xl font-black">{me.participant_code}</p>
      <p className="mt-4 font-semibold">{me.full_name || "—"}</p>
      <p className="text-sm text-muted-foreground">{me.college || "College not set"}</p>
      <p className="text-sm text-muted-foreground">{[me.branch, me.year].filter(Boolean).join(" · ")}</p>
      <Badge className="mt-4" variant={paid ? "default" : "outline"}>{paid ? `Fee paid · ₹${me.amount_paid}` : "Fee pending"}</Badge>
      <p className="mt-3 text-xs text-muted-foreground">Share your ID with team leaders so they can add you to a team.</p>
    </div>
  );
}

function ProfileEditor({ me, onDone, compact }: { me: Participant; onDone: () => void; compact?: boolean }) {
  const [f, setF] = useState({ full_name: me.full_name, phone: me.phone, college: me.college, branch: me.branch, year: me.year });
  const [busy, setBusy] = useState(false);
  const save = async () => {
    const p = profileSchema.safeParse(f);
    if (!p.success) { toast.error(p.error.issues[0]?.message ?? "Invalid input"); return; }
    setBusy(true);
    const { error } = await supabase.rpc("update_my_profile", {
      _full_name: p.data.full_name, _phone: p.data.phone, _college: p.data.college, _branch: p.data.branch, _year: p.data.year,
    });
    setBusy(false);
    if (error) toast.error(error.message); else { toast.success("Profile saved"); onDone(); }
  };
  const field = (k: keyof typeof f, label: string, ph = "") => (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input value={f[k]} placeholder={ph} onChange={(e) => setF({ ...f, [k]: e.target.value })} />
    </div>
  );
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-display text-lg font-bold">{compact ? "My details" : "1. Your details"}</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {field("full_name", "Full name")}
        {field("phone", "Phone", "10-digit mobile")}
        {field("college", "College")}
        {field("branch", "Branch / Course", "e.g. CSE, BCA")}
        {field("year", "Year", "e.g. 2nd")}
        <div className="space-y-1.5"><Label>Email</Label><Input value={me.email} disabled /></div>
      </div>
      <Button className="mt-5" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save details"}</Button>
    </div>
  );
}

function ProfileAndPay({ me, settings, profileDone, onDone }: {
  me: Participant; settings: { fee_amount: number; registrations_open: boolean }; profileDone: boolean; onDone: () => void;
}) {
  const createOrder = useServerFn(createFeeOrder);
  const verify = useServerFn(verifyFeePayment);
  const [busy, setBusy] = useState(false);

  const pay = async () => {
    setBusy(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load Razorpay. Check your connection.");
      const o = await createOrder();
      const RZ = (window as unknown as { Razorpay: new (opts: unknown) => { open: () => void; on: (e: string, cb: () => void) => void } }).Razorpay;
      const rz = new RZ({
        key: o.keyId, amount: o.amount, currency: "INR", order_id: o.orderId,
        name: "Techkriti 3.0", description: "Registration fee",
        prefill: { name: o.name, email: o.email, contact: o.phone },
        theme: { color: "#22b8f0" },
        handler: async (resp: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            await verify({ data: resp });
            toast.success("Payment successful! You can now pick your events.");
            onDone();
          } catch (e) { toast.error(e instanceof Error ? e.message : "Verification failed"); }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.on("payment.failed", () => toast.error("Payment failed. Please try again."));
      rz.open();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Payment could not start");
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <ProfileEditor me={me} onDone={onDone} />
      <div className={`glass rounded-2xl p-6 ${profileDone ? "" : "opacity-60"}`}>
        <h2 className="font-display text-lg font-bold">2. Pay registration fee</h2>
        <p className="mt-2 text-muted-foreground">
          ₹{settings.fee_amount} — one-time fee, covers up to 4 events. Pay via UPI, card or netbanking.
        </p>
        <Button variant="hero" size="lg" className="mt-5" disabled={!profileDone || busy || !settings.registrations_open} onClick={pay}>
          {busy ? "Opening payment…" : `Pay ₹${settings.fee_amount}`}
        </Button>
        {!profileDone && <p className="mt-2 text-xs text-muted-foreground">Save your details first.</p>}
        {!settings.registrations_open && <p className="mt-2 text-xs text-warning">Registrations are closed.</p>}
      </div>
    </div>
  );
}

function MyEvent({ reg, team, roster, myId, onChange }: {
  reg: Reg; team?: Team | undefined; roster: Roster[]; myId: string; onChange: () => void;
}) {
  const ev = eventBySlug(reg.event_slug);
  const [teamName, setTeamName] = useState("");
  const [code, setCode] = useState("");
  if (!ev) return null;
  const isLeader = team?.leader_id === myId;

  const createTeam = async () => {
    const { error } = await supabase.rpc("create_team", { _event: ev.slug, _name: teamName });
    if (error) toast.error(error.message); else { toast.success("Team created"); onChange(); }
  };
  const invite = async () => {
    if (!team) return;
    const { error } = await supabase.rpc("invite_member", { _team: team.id, _code: code, _max: ev.maxTeam });
    if (error) toast.error(error.message); else { toast.success("Request sent"); setCode(""); onChange(); }
  };
  const leave = async () => {
    if (!confirm(isLeader ? "Leaving will delete your team. Continue?" : "Leave this event?")) return;
    const { error } = await supabase.rpc("leave_event", { _event: ev.slug });
    if (error) toast.error(error.message); else onChange();
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-primary">{ev.dept}</p>
          <h3 className="font-display text-lg font-bold">{ev.title}</h3>
        </div>
        <Button size="icon" variant="ghost" onClick={leave} aria-label="Leave event"><Trash2 /></Button>
      </div>
      <div className="mt-3 grid gap-1.5 text-sm text-muted-foreground">
        <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Day {ev.day}</span>
        <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {ev.time}</span>
        <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {ev.venue}</span>
      </div>
      {ev.team && (
        <div className="mt-4 rounded-xl border p-4">
          {team ? (
            <>
              <p className="flex items-center gap-2 font-medium"><Users className="h-4 w-4 text-accent" /> {team.name}
                {isLeader && <Badge variant="outline">Leader</Badge>}</p>
              <ul className="mt-2 space-y-1 text-sm">
                {roster.map((m) => (
                  <li key={m.participant_code} className="flex justify-between">
                    <span>{m.full_name} <span className="text-muted-foreground">({m.participant_code})</span></span>
                    <span className={m.status === "member" ? "text-success" : "text-warning"}>{m.status === "member" ? "joined" : "pending"}</span>
                  </li>
                ))}
              </ul>
              {isLeader && roster.length < ev.maxTeam && (
                <div className="mt-3 flex gap-2">
                  <Input placeholder="Member ID e.g. TK3-1002" value={code} onChange={(e) => setCode(e.target.value)} maxLength={20} />
                  <Button size="sm" onClick={invite} disabled={!code.trim()}><UserPlus /> Invite</Button>
                </div>
              )}
            </>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">Team event (up to {ev.maxTeam}). Create a team or accept a request.</p>
              <div className="mt-2 flex gap-2">
                <Input placeholder="Team name" value={teamName} onChange={(e) => setTeamName(e.target.value)} maxLength={50} />
                <Button size="sm" onClick={createTeam} disabled={teamName.trim().length < 2}>Create</Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function BrowseEvents({ taken, onChange }: { taken: string[]; onChange: () => void }) {
  const [teamNames, setTeamNames] = useState<Record<string, string>>({});
  const available = events3.filter((e) => !taken.includes(e.slug));
  const join = async (slug: string, team: boolean) => {
    const { error } = team
      ? await supabase.rpc("create_team", { _event: slug, _name: teamNames[slug] ?? "" })
      : await supabase.rpc("join_event", { _event: slug });
    if (error) toast.error(error.message); else { toast.success("Added to your events"); onChange(); }
  };
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-bold">Add events</h2>
      <p className="text-sm text-muted-foreground">
        For team events, enter a team name to create your team — or wait for a leader's request. <Link to="/events" className="text-primary">Event details</Link>
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {available.map((e) => (
          <div key={e.slug} className="glass flex flex-col rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-widest text-primary">{e.dept}</p>
            <p className="font-semibold">{e.title}</p>
            <p className="text-xs text-muted-foreground">Day {e.day} · {e.time} · {e.team ? `Team ≤${e.maxTeam}` : "Solo"}</p>
            <div className="mt-3 flex gap-2">
              {e.team && (
                <Input className="h-8" placeholder="Team name" maxLength={50} value={teamNames[e.slug] ?? ""}
                  onChange={(x) => setTeamNames({ ...teamNames, [e.slug]: x.target.value })} />
              )}
              <Button size="sm" variant="neon" onClick={() => join(e.slug, e.team)}
                disabled={e.team && (teamNames[e.slug] ?? "").trim().length < 2}>
                <Plus /> {e.team ? "Create team" : "Join"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
