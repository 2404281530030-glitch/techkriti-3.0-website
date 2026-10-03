import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/techkriti-logo.png.asset.json";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/schedule", label: "Schedule" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const signOut = async () => {
    setOpen(false);
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open ? "glass border-x-0 border-t-0" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Techkriti 3.0" className="h-12 w-12 rounded-full object-contain ring-1 ring-primary/40" />
          <span className="font-display hidden rounded border border-primary/40 px-1.5 py-0.5 text-xs text-primary sm:inline">3.0</span>
        </Link>
        <div className="ml-auto hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
          <Button asChild variant="hero" size="sm" className="rounded-full px-5">
            <Link to={user ? "/dashboard" : "/register"}>{user ? "My Dashboard" : "Register"}</Link>
          </Button>
          {user && (
            <Button variant="ghost" size="sm" onClick={signOut} aria-label="Log out"><LogOut className="h-4 w-4" /> Log out</Button>
          )}
        </div>
        <button className="ml-auto md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div className="flex flex-col gap-1 px-5 pb-6 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-lg hover:bg-secondary">
              {l.label}
            </Link>
          ))}
          <Button asChild variant="hero" className="mt-3 h-12 rounded-full">
            <Link to={user ? "/dashboard" : "/register"} onClick={() => setOpen(false)}>
              {user ? "My Dashboard" : "Register now"}
            </Link>
          </Button>
          {user && (
            <Button variant="outline" className="mt-2 h-12 rounded-full" onClick={signOut}><LogOut className="h-4 w-4" /> Log out</Button>
          )}
        </div>
      )}
    </header>
  );
}
