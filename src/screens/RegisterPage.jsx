import React, { useEffect, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, CreditCard, IdCard, Users } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';

const steps = [
  { icon: IdCard, title: 'Create account', text: 'Sign up with email or Google and fill in your college details.' },
  { icon: CreditCard, title: 'Pay once', text: 'Pay the registration fee securely via Razorpay (UPI, cards, netbanking).' },
  { icon: CheckCircle2, title: 'Pick 4 events', text: 'Get your participant ID instantly and choose up to four events.' },
  { icon: Users, title: 'Build your team', text: 'For team events, create a team and invite members by their ID.' },
];

function RegisterPage() {
  const { user } = useAuth();
  const [fee, setFee] = useState(null);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    supabase.from('settings').select('fee_amount, team_fee, gaming_fee, registrations_open, max_events').eq('id', 1).single()
      .then(({ data }) => { if (data) { setFee(data); setOpen(data.registrations_open); } });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-10 pt-32">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="section-eyebrow">Registration</p>
          <h1 className="font-display mt-2 text-4xl font-black md:text-5xl">Get your <span className="text-gradient">Techkriti 3.0</span> pass</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            One registration fee unlocks up to {fee?.max_events ?? 4} events across all departments.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {open ? (
              <Button asChild variant="hero" size="lg">
                <Link to={user ? '/dashboard' : '/auth'}>{user ? 'Go to my dashboard' : 'Register now'}</Link>
              </Button>
            ) : (
              <p className="rounded-full border border-warning/50 px-4 py-2 text-warning">Registrations are currently closed</p>
            )}
            {!user && <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">Already registered? Sign in</Link>}
          </div>
        </div>
        <div className="glass glow rounded-3xl p-8 text-center">
          <p className="text-sm uppercase tracking-widest text-muted-foreground">General registration</p>
          <p className="font-display text-gradient mt-2 text-6xl font-black">₹{fee?.fee_amount ?? '—'}</p>
          <p className="mt-2 text-sm text-muted-foreground">per person · one-time · valid for any event (subject to its rules)</p>
          <ul className="mt-6 space-y-2 text-left text-sm">
            {['Unique participant ID', 'Personal schedule & venues', 'Team creation & invites', 'Certificate of participation'].map((t) => (
              <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 grid gap-5 md:grid-cols-3">
        <div className="glass rounded-2xl border-l-4 border-l-primary p-6">
          <h3 className="font-display text-lg font-bold">General Registration</h3>
          <p className="font-display text-gradient mt-2 text-3xl font-black">₹{fee?.fee_amount ?? '—'}<span className="text-sm font-normal text-muted-foreground"> / person</span></p>
          <p className="mt-3 text-sm text-muted-foreground">One-time registration, valid for participation in any event, subject to that event's rules.</p>
        </div>
        <div className="glass rounded-2xl border-l-4 border-l-accent p-6">
          <h3 className="font-display text-lg font-bold">Team Event Registration</h3>
          <p className="font-display text-gradient mt-2 text-3xl font-black">₹{fee?.team_fee ?? '—'}<span className="text-sm font-normal text-muted-foreground"> / person</span></p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>Hackathon: 2–6 members</li><li>Tech Exhibition: 4–5 members</li><li>Startup Expo: 2–6 members</li>
          </ul>
        </div>
        <div className="glass rounded-2xl border-l-4 border-l-primary p-6">
          <h3 className="font-display text-lg font-bold">Gaming</h3>
          <p className="font-display text-gradient mt-2 text-3xl font-black">₹{fee?.gaming_fee ?? '—'}<span className="text-sm font-normal text-muted-foreground"> / team</span></p>
          <p className="mt-3 text-sm text-muted-foreground">BGMI & Free Fire</p>
        </div>
      </div>

      <div className="glass glow mt-8 rounded-3xl p-8">
        <p className="section-eyebrow">Prize money</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[['Hackathon', '₹10,000'], ['Tech Exhibition', '₹10,000'], ['Startup Expo', '₹10,000'], ['Gaming', '₹3,000 / winner team']].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border p-4 text-center">
              <p className="text-sm text-muted-foreground">{k}</p>
              <p className="font-display text-gradient mt-1 text-2xl font-black">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">Gaming: ₹3,000 for each winning team of BGMI & Free Fire.</p>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.title} className="glass rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm text-primary">0{i + 1}</span>
              <s.icon className="h-5 w-5 text-accent" />
            </div>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisterPage;
