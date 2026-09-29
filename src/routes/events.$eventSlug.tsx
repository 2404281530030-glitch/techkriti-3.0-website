import { createFileRoute } from "@tanstack/react-router";
import EventDetailPage from "../screens/EventDetailPage.jsx";

export const Route = createFileRoute("/events/$eventSlug")({
  head: () => ({
    meta: [
      { title: "Event Details | Techकृति 3.0" },
      { name: "description", content: "Rules, format, prizes and coordinators for this Techकृति 3.0 event." },
      { property: "og:title", content: "Event Details | Techकृति 3.0" },
      { property: "og:description", content: "Rules, format, prizes and coordinators for this Techकृति 3.0 event." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventDetailPage,
});
