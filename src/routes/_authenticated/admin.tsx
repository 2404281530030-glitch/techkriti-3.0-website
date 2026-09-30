import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/useAuth";
import { events3 } from "@/data/events3";
import { downloadCsv } from "@/lib/csv";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Control Room · Techkriti 3.0" },
      { name: "description", content: "Manage Techkriti 3.0 registrations, payments, teams and fest settings." },
      { property: "og:title", content: "Admin Control Room · Techkriti 3.0" },
      { property: "og:description", content: "Organiser dashboard for Techkriti 3.0." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type P = Tables<"participants">;
type R = Tables<"event_registrations">;
type T = Tables<"teams">;
type S = Tables<"settings">;

const eventTitle = (slug: string) => events3.find((e) => e.slug === slug)?.title ?? slug;

function AdminPage() {
  const { isAdmin, loading } = useAuth();
  const [people, setPeople] = useState<P[]>([]);
  const [regs, setRegs] = useState<R[]>([]);
  const [teams, setTeams] = useState<T[]>([]);
  const [settings, setSettings] = useState<S | null>(null);
  const [busy, setBusy] = useState(true);

  const load = async () => {
    setBusy(true);
    const [p, r, t, s] = await Promise.all([
      supabase.from("participants").select("*").order("created_at", { ascending: false }),
      supabase.from("event_registrations").select("*"),
      supabase.from("teams").select("*"),
      supabase.from("settings").select("*").eq("id", 1).maybeSingle(),
    ]);
    if (p.error) toast.error(p.error.message);
    setPeople(p.data ?? []);
    setRegs(r.data ?? []);
    setTeams(t.data ?? []);
    setSettings(s.data ?? null);
    setBusy(false);
  };

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen pt-32 text-center text-muted-foreground">Loading…</div>;
  if (!isAdmin)
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="font-display text-2xl">Access denied</h1>
        <p className="mt-2 text-muted-foreground">This area is for Techkriti organisers only.</p>
        <Link to="/" className="mt-6 inline-block text-primary underline">Go home</Link>
      </div>
    );

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 pb-20 pt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary">Organiser</p>
          <h1 className="font-display text-3xl md:text-4xl">Control Room</h1>
        </div>
        <Button variant="outline" onClick={load} disabled={busy}>{busy ? "Refreshing…" : "Refresh data"}</Button>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="mb-6 flex-wrap h-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><Overview people={people} regs={regs} teams={teams} /></TabsContent>
        <TabsContent value="participants"><Participants people={people} regs={regs} onChange={load} /></TabsContent>
        <TabsContent value="events"><EventsTab people={people} regs={regs} teams={teams} onChange={load} /></TabsContent>
        <TabsContent value="settings">{settings && <SettingsTab s={settings} onChange={load} />}</TabsContent>
      </Tabs>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Overview({ people, regs, teams }: { people: P[]; regs: R[]; teams: T[] }) {
  const paid = people.filter((p) => p.payment_status === "paid");
  const revenue = paid.reduce((a, p) => a + p.amount_paid, 0);
  const perEvent = events3
    .map((e) => ({ e, n: regs.filter((r) => r.event_slug === e.slug).length }))
    .sort((a, b) => b.n - a.n);
  const max = Math.max(1, ...perEvent.map((x) => x.n));
  const today = new Date().toDateString();
  const todayCount = people.filter((p) => new Date(p.created_at).toDateString() === today).length;
  const colleges = new Map<string, number>();
  people.forEach((p) => p.college && colleges.set(p.college, (colleges.get(p.college) ?? 0) + 1));
  const topColleges = [...colleges.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Sign-ups" value={people.length} hint={`${todayCount} today`} />
        <Stat label="Paid" value={paid.length} hint={`${people.length - paid.length} pending`} />
        <Stat label="Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
        <Stat label="Event entries" value={regs.length} hint={`${teams.length} teams`} />
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="glass rounded-2xl p-5 lg:col-span-2">
          <h3 className="mb-4 font-display">Registrations per event</h3>
          <div className="space-y-2">
            {perEvent.map(({ e, n }) => (
              <div key={e.slug} className="flex items-center gap-3 text-sm">
                <span className="w-44 shrink-0 truncate">{e.title}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full gradient-brand" style={{ width: `${(n / max) * 100}%` }} />
                </div>
                <span className="w-8 text-right tabular-nums">{n}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="mb-4 font-display">Top colleges</h3>
          {topColleges.length === 0 && <p className="text-sm text-muted-foreground">No data yet.</p>}
          <ul className="space-y-2 text-sm">
            {topColleges.map(([c, n]) => (
              <li key={c} className="flex justify-between gap-2"><span className="truncate">{c}</span><span>{n}</span></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Participants({ people, regs, onChange }: { people: P[]; regs: R[]; onChange: () => void }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [edit, setEdit] = useState<P | null>(null);

  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return people.filter(
      (p) =>
        (status === "all" || p.payment_status === status) &&
        (!s || [p.full_name, p.email, p.phone, p.participant_code, p.college].some((v) => v.toLowerCase().includes(s))),
    );
  }, [people, q, status]);

  const exportCsv = () =>
    downloadCsv(`techkriti-participants-${Date.now()}.csv`,
      list.map((p) => ({
        ID: p.participant_code, Name: p.full_name, Email: p.email, Phone: p.phone, College: p.college,
        Branch: p.branch, Year: p.year, Payment: p.payment_status, Amount: p.amount_paid,
        PaymentID: p.razorpay_payment_id ?? "", PaidAt: p.paid_at ?? "",
        Events: regs.filter((r) => r.user_id === p.user_id).map((r) => eventTitle(r.event_slug)).join("; "),
        Joined: p.created_at, Notes: p.notes ?? "",
      })));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <Input placeholder="Search name, email, phone, ID, college…" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All payments</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>
        <Button variant="outline" onClick={exportCsv} disabled={!list.length}>Download CSV ({list.length})</Button>
      </div>
      <div className="glass overflow-x-auto rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">
              {["ID", "Name", "Contact", "College", "Events", "Payment", ""].map((h) => <th key={h} className="p-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {list.map((p) => (
              <tr key={p.user_id} className="border-b border-border/50 hover:bg-muted/30">
                <td className="p-3 font-mono text-xs">{p.participant_code}</td>
                <td className="p-3">{p.full_name || <span className="text-muted-foreground">—</span>}</td>
                <td className="p-3 text-xs"><div>{p.email}</div><div className="text-muted-foreground">{p.phone}</div></td>
                <td className="p-3 text-xs">{p.college}<div className="text-muted-foreground">{p.branch} {p.year}</div></td>
                <td className="p-3">{regs.filter((r) => r.user_id === p.user_id).length}</td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${p.payment_status === "paid" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {p.payment_status}{p.payment_status === "paid" ? ` · ₹${p.amount_paid}` : ""}
                  </span>
                </td>
                <td className="p-3"><Button size="sm" variant="ghost" onClick={() => setEdit(p)}>Edit</Button></td>
              </tr>
            ))}
            {!list.length && <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No participants found.</td></tr>}
          </tbody>
        </table>
      </div>
      {edit && <EditDialog p={edit} onClose={() => setEdit(null)} onSaved={() => { setEdit(null); onChange(); }} />}
    </div>
  );
}

function EditDialog({ p, onClose, onSaved }: { p: P; onClose: () => void; onSaved: () => void }) {
  const [f, setF] = useState({ ...p, notes: p.notes ?? "" });
  const [saving, setSaving] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF({ ...f, [k]: k === "amount_paid" ? Number(e.target.value) || 0 : e.target.value });

  const save = async () => {
    setSaving(true);
    const markPaid = f.payment_status === "paid" && p.payment_status !== "paid";
    const { error } = await supabase.from("participants").update({
      full_name: f.full_name.trim(), phone: f.phone.trim(), college: f.college.trim(), branch: f.branch.trim(),
      year: f.year.trim(), payment_status: f.payment_status, amount_paid: f.amount_paid, notes: f.notes || null,
      ...(markPaid ? { paid_at: new Date().toISOString() } : {}), updated_at: new Date().toISOString(),
    }).eq("user_id", p.user_id);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("Participant updated");
    onSaved();
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Edit {p.participant_code}</DialogTitle></DialogHeader>
        <p className="-mt-2 text-xs text-muted-foreground">{p.email}</p>
        <div className="grid grid-cols-2 gap-3">
          {(["full_name", "phone", "college", "branch", "year"] as const).map((k) => (
            <div key={k} className={k === "full_name" || k === "college" ? "col-span-2" : ""}>
              <Label className="capitalize">{k.replace("_", " ")}</Label>
              <Input value={f[k]} onChange={set(k)} />
            </div>
          ))}
          <div>
            <Label>Payment status</Label>
            <select value={f.payment_status} onChange={set("payment_status")} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="pending">pending</option>
              <option value="paid">paid</option>
              <option value="refunded">refunded</option>
            </select>
          </div>
          <div><Label>Amount paid (₹)</Label><Input type="number" value={f.amount_paid} onChange={set("amount_paid")} /></div>
          <div className="col-span-2"><Label>Internal notes</Label><Textarea value={f.notes} onChange={set("notes")} /></div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EventsTab({ people, regs, teams, onChange }: { people: P[]; regs: R[]; teams: T[]; onChange: () => void }) {
  const [slug, setSlug] = useState(events3[0]?.slug ?? "");
  const byId = new Map(people.map((p) => [p.user_id, p]));
  const teamName = new Map(teams.map((t) => [t.id, t.name]));
  const rows = regs.filter((r) => r.event_slug === slug);

  const remove = async (r: R) => {
    if (!confirm("Remove this participant from the event?")) return;
    const { error } = await supabase.from("event_registrations").delete().eq("id", r.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Removed");
    onChange();
  };

  const exportCsv = () =>
    downloadCsv(`${slug}-registrations.csv`, rows.map((r) => {
      const p = byId.get(r.user_id);
      return { ID: p?.participant_code, Name: p?.full_name, Email: p?.email, Phone: p?.phone, College: p?.college,
        Team: r.team_id ? teamName.get(r.team_id) ?? "" : "Solo", Payment: p?.payment_status, RegisteredAt: r.created_at };
    }));

  const exportAll = () =>
    downloadCsv(`techkriti-all-event-entries.csv`, regs.map((r) => {
      const p = byId.get(r.user_id);
      return { Event: eventTitle(r.event_slug), ID: p?.participant_code, Name: p?.full_name, Email: p?.email,
        Phone: p?.phone, College: p?.college, Team: r.team_id ? teamName.get(r.team_id) ?? "" : "Solo", Payment: p?.payment_status };
    }));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <select value={slug} onChange={(e) => setSlug(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
          {events3.map((e) => (
            <option key={e.slug} value={e.slug}>{e.title} ({regs.filter((r) => r.event_slug === e.slug).length})</option>
          ))}
        </select>
        <Button variant="outline" onClick={exportCsv} disabled={!rows.length}>Download this event</Button>
        <Button variant="outline" onClick={exportAll} disabled={!regs.length}>Download all entries</Button>
      </div>
      <div className="glass overflow-x-auto rounded-2xl">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr className="border-b border-border">{["ID", "Name", "College", "Team", "Payment", ""].map((h) => <th key={h} className="p-3">{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const p = byId.get(r.user_id);
              return (
                <tr key={r.id} className="border-b border-border/50">
                  <td className="p-3 font-mono text-xs">{p?.participant_code}</td>
                  <td className="p-3">{p?.full_name}<div className="text-xs text-muted-foreground">{p?.email}</div></td>
                  <td className="p-3 text-xs">{p?.college}</td>
                  <td className="p-3">{r.team_id ? teamName.get(r.team_id) : <span className="text-muted-foreground">Solo</span>}</td>
                  <td className="p-3 text-xs">{p?.payment_status}</td>
                  <td className="p-3"><Button size="sm" variant="ghost" onClick={() => remove(r)}>Remove</Button></td>
                </tr>
              );
            })}
            {!rows.length && <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">No registrations for this event yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SettingsTab({ s, onChange }: { s: S; onChange: () => void }) {
  const [f, setF] = useState({ ...s, announcement: s.announcement ?? "" });
  const save = async () => {
    const { error } = await supabase.from("settings").update({
      fee_amount: f.fee_amount, max_events: f.max_events, registrations_open: f.registrations_open,
      announcement: f.announcement || null, updated_at: new Date().toISOString(),
    }).eq("id", 1);
    if (error) { toast.error(error.message); return; }
    toast.success("Settings saved");
    onChange();
  };
  return (
    <div className="glass max-w-xl space-y-5 rounded-2xl p-6">
      <div className="flex items-center justify-between">
        <div><Label>Registrations open</Label><p className="text-xs text-muted-foreground">Turn off to stop new event sign-ups.</p></div>
        <Switch checked={f.registrations_open} onCheckedChange={(v) => setF({ ...f, registrations_open: v })} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><Label>Registration fee (₹)</Label><Input type="number" min={0} value={f.fee_amount} onChange={(e) => setF({ ...f, fee_amount: Number(e.target.value) || 0 })} /></div>
        <div><Label>Max events per person</Label><Input type="number" min={1} value={f.max_events} onChange={(e) => setF({ ...f, max_events: Number(e.target.value) || 1 })} /></div>
      </div>
      <div><Label>Announcement banner</Label><Textarea placeholder="Shown to participants on their dashboard" value={f.announcement} onChange={(e) => setF({ ...f, announcement: e.target.value })} /></div>
      <Button onClick={save}>Save settings</Button>
    </div>
  );
}
