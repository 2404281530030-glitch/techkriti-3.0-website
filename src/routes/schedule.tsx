import { createFileRoute } from "@tanstack/react-router";
import ScheduleSection from "../components/ScheduleSection.jsx";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Schedule | Techकृति 3.0" },
      { name: "description", content: "Day-wise timings and venues for every Techकृति 3.0 event." },
      { property: "og:title", content: "Schedule | Techकृति 3.0" },
      { property: "og:description", content: "Day-wise timings and venues for every Techकृति 3.0 event." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <div className="pt-20">
      <ScheduleSection />
    </div>
  ),
});
