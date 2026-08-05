"use client";

import { motion } from "motion/react";
import { CalendarDays, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f7f4ee] px-6 py-28"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,196,157,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(158,184,196,0.18),transparent_32%)]" />

      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#c8aa72]/50 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
          Sfântul Botez
        </p>

        <h1 className="mt-8 text-[72px] font-semibold leading-[0.9] tracking-[-0.04em] text-[#263746] sm:text-8xl md:text-[120px]">
          Amir
        </h1>

        <div className="mx-auto mt-8 h-px w-32 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent" />

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Cu inimile pline de bucurie, vă invităm să ne fiți alături
          într-o zi specială, dedicată lui Amir.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-700 sm:text-base">
          <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
            <CalendarDays size={18} className="text-[#a88d5d]" />
            <span>2 octombrie 2026</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/90 bg-white/70 px-5 py-3 shadow-sm backdrop-blur">
            <MapPin size={18} className="text-[#a88d5d]" />
            <span>Arad</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#rsvp"
            className="rounded-full bg-[#263746] px-9 py-4 font-semibold text-white shadow-[0_18px_45px_rgba(38,55,70,0.2)] transition duration-300 hover:-translate-y-1 hover:bg-[#1f2e3a]"
          >
            Confirmă prezența
          </a>

          <a
            href="#eveniment"
            className="rounded-full border border-[#d8c7a4] bg-white/70 px-9 py-4 font-semibold text-slate-700 backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Vezi detaliile
          </a>
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c7a4]/70 bg-white/50 text-2xl shadow-sm">
            🧸
          </div>
        </div>
      </motion.div>
    </section>
  );
}