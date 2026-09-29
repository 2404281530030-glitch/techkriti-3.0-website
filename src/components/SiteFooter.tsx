import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/logo.png" alt="Techkriti" className="h-14 w-auto" />
          <p className="mt-4 max-w-md text-sm text-muted-foreground">
            The annual technical extravaganza of Kashi Institute of Technology, Varanasi — two days of innovation,
            competition and creation.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.instagram.com/tech_kriti.kashi" target="_blank" rel="noreferrer" aria-label="Instagram"
              className="rounded-full border p-2.5 text-muted-foreground hover:border-accent hover:text-accent">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.linkedin.com/company/techkriti-kashi/" target="_blank" rel="noreferrer" aria-label="LinkedIn"
              className="rounded-full border p-2.5 text-muted-foreground hover:border-primary hover:text-primary">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div>
          <h3 className="section-eyebrow mb-4">Explore</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/events" className="hover:text-foreground">Events</Link></li>
            <li><Link to="/schedule" className="hover:text-foreground">Schedule</Link></li>
            <li><Link to="/register" className="hover:text-foreground">Register</Link></li>
            <li><Link to="/gallery" className="hover:text-foreground">Gallery</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="section-eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><Mail className="mt-0.5 h-4 w-4 shrink-0" /> techkriti2025@gmail.com</li>
            <li className="flex gap-2"><Phone className="mt-0.5 h-4 w-4 shrink-0" /> +91 9839570621</li>
            <li className="flex gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> Kashi Institute of Technology, Mirzamurad, Varanasi, UP</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Techकृति · Kashi Institute of Technology
      </div>
    </footer>
  );
}
