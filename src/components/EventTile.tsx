import { Link } from "@tanstack/react-router";
import { Users, User } from "lucide-react";
import type { TKEvent } from "@/data/events3";

export function EventTile({ event }: { event: TKEvent }) {
  return (
    <Link
      to="/events/$eventSlug"
      params={{ eventSlug: event.slug }}
      className="group glass relative flex flex-col overflow-hidden rounded-2xl transition-all hover:-translate-y-1 hover:border-primary/50"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={event.image} alt={event.title} loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        {event.flagship && (
          <span className="bg-gradient-brand absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
            Flagship
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-widest text-primary">{event.dept}</p>
        <h3 className="font-display mt-1 text-lg font-bold">{event.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{event.brief}</p>
        <div className="mt-auto flex items-center gap-3 pt-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            {event.team ? <Users className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
            {event.team ? (event.minTeam ? `Team ${event.minTeam}–${event.maxTeam}` : `Team up to ${event.maxTeam}`) : "Solo"}
          </span>
          <span>· Day {event.day}</span>
        </div>
      </div>
    </Link>
  );
}
