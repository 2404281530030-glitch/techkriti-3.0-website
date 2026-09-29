import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let active = true;
    const check = async (u: User | null) => {
      if (!active) return;
      setUser(u);
      if (u) {
        const { data } = await supabase.rpc("has_role", { _user_id: u.id, _role: "admin" });
        if (active) setIsAdmin(!!data);
      } else setIsAdmin(false);
      if (active) setLoading(false);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setTimeout(() => check(session?.user ?? null), 0);
    });
    supabase.auth.getSession().then(({ data }) => check(data.session?.user ?? null));
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, loading, isAdmin };
}
