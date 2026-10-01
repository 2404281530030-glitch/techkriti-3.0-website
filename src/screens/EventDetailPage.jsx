import React from 'react';
import { Link, useParams } from '@tanstack/react-router';
import { Calendar, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { eventBySlug } from '../data/events3';
import { Button } from '../components/ui/button';

function EventDetailPage() {
  const { eventSlug } = useParams({ strict: false });
  const event = eventBySlug(eventSlug);

  if (!event) {
    return (
      <div className="px-5 pt-40 text-center">
        <h1 className="font-display text-3xl">Event not found</h1>
        <Link to="/events" className="mt-4 inline-block text-primary">Back to events</Link>
      </div>
    );
  }

  const facts = [
    { icon: Calendar, label: 'Day', value: `Day ${event.day}` },
    { icon: Clock, label: 'Time', value: event.time },
    { icon: MapPin, label: 'Venue', value: event.venue },
    { icon: Users, label: 'Format', value: event.team ? `Team (${event.minTeam ? event.minTeam + '–' : 'up to '}${event.maxTeam})` : 'Individual' },
    ...(event.prize ? [{ icon: Users, label: 'Prize', value: event.prize }] : []),
  ];

  return (
    <div>
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden">
        <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
        <div className="relative mx-auto w-full max-w-5xl px-5 pb-10">
          <Link to="/events" className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> All events
          </Link>
          <p className="section-eyebrow">{event.dept} · {event.type}</p>
          <h1 className="font-display mt-2 text-4xl font-black md:text-6xl">{event.title}</h1>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-5">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="glass rounded-xl p-4">
              <f.icon className="h-5 w-5 text-primary" />
              <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{f.label}</p>
              <p className="font-medium">{f.value}</p>
            </div>
          ))}
        </div>
        <div className="glass mt-8 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-primary">About this event</h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{event.brief}</p>
          {event.team && (
            <p className="mt-4 text-sm text-muted-foreground">
              Team event: create your team from your dashboard and invite members using their participant IDs.
            </p>
          )}
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/register">Register for this event</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailPage;
