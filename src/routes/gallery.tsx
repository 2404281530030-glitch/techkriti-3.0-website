import { createFileRoute } from "@tanstack/react-router";
import GalleryPage from "../screens/GalleryPage.jsx";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Techकृति 3.0" },
      { name: "description", content: "Photos and memories from previous editions of Techकृति at KIT Varanasi." },
      { property: "og:title", content: "Gallery | Techकृति 3.0" },
      { property: "og:description", content: "Photos and memories from previous editions of Techकृति." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});
