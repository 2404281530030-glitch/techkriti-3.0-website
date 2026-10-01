import React, { useEffect, useState } from 'react';
import { FEST_START } from '../data/events3';

const calc = () => {
  const d = Math.max(0, +new Date(FEST_START) - Date.now());
  return {
    Days: Math.floor(d / 86400000),
    Hours: Math.floor((d / 3600000) % 24),
    Minutes: Math.floor((d / 60000) % 60),
    Seconds: Math.floor((d / 1000) % 60),
  };
};

function CountdownTimer() {
  const [t, setT] = useState({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
  useEffect(() => {
    setT(calc());
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3">
      {Object.entries(t).map(([label, v]) => (
        <div key={label} className="glass rounded-xl px-1 py-3 text-center sm:px-3 sm:py-4">
          <div className="font-display text-gradient text-2xl font-black tabular-nums sm:text-4xl">
            {String(v).padStart(2, '0')}
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default CountdownTimer;
