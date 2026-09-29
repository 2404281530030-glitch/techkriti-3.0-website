import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "../screens/ContactPage.jsx";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Techकृति 3.0" },
      { name: "description", content: "Reach the Techकृति 3.0 team at KIT Varanasi by email, phone or social media." },
      { property: "og:title", content: "Contact | Techकृति 3.0" },
      { property: "og:description", content: "Get in touch with the Techकृति 3.0 organising team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});
