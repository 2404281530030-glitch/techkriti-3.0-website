import React, { useState } from 'react';
import { events3, DEPARTMENTS } from '../data/events3';
import { EventTile } from '../components/EventTile';
import { cn } from '../lib/utils';

function EventsPage() {
  const [dept, setDept] = useState('All');
  const list = dept === 'All' ? events3 : events3.filter((e) => e.dept === dept);
  return (
    <div className="mx-auto max-w-7xl px-5 pb-10 pt-32">
      <p className="section-eyebrow">Techकृति 3.0</p>
      <h1 className="font-display mt-2 text-4xl font-bold md:text-5xl">Events & Competitions</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Events are open across departments — join any event you like, up to four per participant.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {['All', ...DEPARTMENTS].map((d) => (
          <button key={d} onClick={() => setDept(d)}
            className={cn('rounded-full border px-4 py-2 text-sm transition-colors',
              dept === d ? 'border-primary bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground')}>
            {d}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => <EventTile key={e.slug} event={e} />)}
      </div>
    </div>
  );
}

export default EventsPage;
