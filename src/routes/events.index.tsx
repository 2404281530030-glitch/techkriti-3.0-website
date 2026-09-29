import { createFileRoute } from "@tanstack/react-router";
import EventsPage from "../screens/EventsPage.jsx";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events & Workshops | Techकृति 3.0" },
      {
        name: "description",
        content: "Every technical and non-technical event at Techकृति 3.0 — hackathon, coding contests, quizzes, expos and more.",
      },
      { property: "og:title", content: "Events & Workshops | Techकृति 3.0" },
      { property: "og:description", content: "Explore all competitions and workshops at Techकृति 3.0." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});
