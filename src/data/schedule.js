import { events3, ceremonies } from './events3';

function toRows(day) {
  const rows = [
    ...ceremonies.filter((c) => c.day === day).map((c) => ({ time: c.time, event: c.title, venue: c.venue })),
    ...events3.filter((e) => e.day === day).map((e) => ({ time: e.time, event: e.title, venue: e.venue })),
  ];
  return rows;
}

export const day1Schedule = toRows(1);
export const day2Schedule = toRows(2);
