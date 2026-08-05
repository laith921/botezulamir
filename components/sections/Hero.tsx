"use client";

import { motion } from "motion/react";
import { CalendarDays, ChevronDown, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbf8f2] px-6 py-24"
    >
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />

      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, -18, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[7%] top-20 hidden text-[110px] lg:block"
      >
        🎈
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.38em] text-sky-600 sm:text-base">
          Vă invităm cu drag
        </p>

        <h1 className="mt-7 font-serif text-6xl leading-none text-slate-800 sm:text-7xl md:text-8xl">
          Botezul lui Amir
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
          Cu inimile pline de bucurie, vă invităm să ne fiți alături
          într-o zi specială, plină de iubire și emoție.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-700 sm:text-base">
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <CalendarDays size={19} className="text-sky-600" />
            <span>2 octombrie 2026</span>
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <MapPin size={19} className="text-sky-600" />
            <span>Arad</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#rsvp"
            className="rounded-full bg-sky-600 px-8 py-4 font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-sky-700"
          >
            Confirmă prezența
          </a>

          <a
            href="#eveniment"
            className="rounded-full border border-slate-200 bg-white/80 px-8 py-4 font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-1"
          >
            Vezi detaliile
          </a>
        </div>
      </motion.div>

      <motion.a
        href="#poveste"
        aria-label="Derulează către următoarea secțiune"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}