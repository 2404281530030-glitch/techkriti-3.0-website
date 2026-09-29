import { createFileRoute } from "@tanstack/react-router";
import RegisterPage from "../screens/RegisterPage.jsx";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register | Techकृति 3.0" },
      { name: "description", content: "Register for Techकृति 3.0 events at Kashi Institute of Technology, Varanasi." },
      { property: "og:title", content: "Register | Techकृति 3.0" },
      { property: "og:description", content: "Secure your spot at Techकृति 3.0." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});
