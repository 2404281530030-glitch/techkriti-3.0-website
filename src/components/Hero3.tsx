import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/CountdownTimer.jsx";

export function Hero3() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-20">
      {/* Background video: covers the area without stretching, loops seamlessly */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-50"
        src="/hero-video.mp4"
        poster="/gallery1.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
      <div className="grid-lines absolute inset-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 pt-24 text-center">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="section-eyebrow">
          Kashi Institute of Technology · Varanasi · 27–28 Nov 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display mt-5 text-5xl font-black leading-none sm:text-7xl md:text-8xl"
        >
          <span className="glitch text-gradient" data-text="TECHKRITI">TECHKRITI</span>
          <span className="mt-2 block text-3xl font-bold text-foreground sm:text-5xl">3.0</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
          20+ competitions, a 24-hour hackathon, tech exhibition and startup expo. One pass, up to four events.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="hero" size="lg"><Link to="/register">Register now</Link></Button>
          <Button asChild variant="neon" size="lg"><Link to="/events">Explore events</Link></Button>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10 w-full">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">Fest begins in</p>
          <CountdownTimer />
        </motion.div>
      </div>
      <ChevronDown className="absolute bottom-6 left-1/2 h-6 w-6 -translate-x-1/2 animate-bounce text-muted-foreground" />
    </section>
  );
}
