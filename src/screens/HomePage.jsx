import React from 'react';
import { Link } from '@tanstack/react-router';
import { Hero3 } from '../components/Hero3';
import { EventTile } from '../components/EventTile';
import AboutSection from '../components/AboutSection.jsx';
import ScheduleSection from '../components/ScheduleSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import { Slide } from '../components/Reveal.jsx';
import { events3 } from '../data/events3';
import { Button } from '../components/ui/button';

const stats = [
  { n: '20+', l: 'Competitions' },
  { n: '24h', l: 'Hackathon' },
  { n: '6', l: 'Departments' },
  { n: '2', l: 'Days' },
];

function HomePage() {
  const flagship = events3.filter((e) => e.flagship);
  const more = events3.filter((e) => !e.flagship).slice(0, 6);
  return (
    <div>
      <Hero3 />

      <section className="relative z-10 mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 px-5 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.l} className="glass rounded-2xl p-5 text-center">
            <div className="font-display text-gradient text-3xl font-black">{s.n}</div>
            <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </section>

      <AboutSection />

      <section className="mx-auto max-w-7xl px-5 py-16">
        <Slide direction="up">
          <p className="section-eyebrow text-center">Main attractions</p>
          <h2 className="font-display mt-2 text-center text-3xl font-bold md:text-4xl">Flagship Events</h2>
        </Slide>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {flagship.map((e) => <EventTile key={e.slug} event={e} />)}
        </div>
        <h3 className="font-display mt-16 text-center text-2xl font-bold">More challenges</h3>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((e) => <EventTile key={e.slug} event={e} />)}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="neon" size="lg"><Link to="/events">View all events</Link></Button>
        </div>
      </section>

      <ScheduleSection />
      <GallerySection />

      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="glass glow relative overflow-hidden rounded-3xl p-10 text-center">
          <div className="grid-lines absolute inset-0 opacity-50" />
          <div className="relative">
            <h2 className="font-display text-3xl font-bold md:text-4xl">One pass. Four events.</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Pay the registration fee once, get your participant ID, and pick up to four events — build your team right from your dashboard.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6"><Link to="/register">Get your pass</Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
