import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../screens/HomePage.jsx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Techकृति 3.0 | Annual Tech Fest of Kashi Institute of Technology" },
      {
        name: "description",
        content:
          "Techकृति 3.0 — the annual technical festival of Kashi Institute of Technology, Varanasi. Events, hackathons, workshops, schedule and registration.",
      },
      { property: "og:title", content: "Techकृति 3.0 | Tech Fest of KIT Varanasi" },
      {
        property: "og:description",
        content: "Two days of innovation, competitions and creativity at Kashi Institute of Technology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
