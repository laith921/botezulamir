"use client";

import { motion } from "motion/react";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      className="paper-noise relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f8fcfe_0%,#fcfaf6_72%,#ffffff_100%)] px-6 py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="watercolor-cloud -left-28 top-12 h-72 w-96 opacity-80" />
        <div className="watercolor-cloud -right-32 top-36 h-80 w-[430px] opacity-75" />
        <div className="watercolor-cloud bottom-6 left-[12%] h-48 w-72 opacity-55" />

        <div className="absolute left-[12%] top-[20%] h-2 w-2 rounded-full bg-[#d2b36d]/60" />
        <div className="absolute right-[18%] top-[29%] h-1.5 w-1.5 rounded-full bg-[#87bddc]/70" />
        <div className="absolute left-[22%] top-[62%] h-1.5 w-1.5 rounded-full bg-[#d2b36d]/60" />
      </div>

      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, -20, 0],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[7%] top-[11%] hidden lg:block"
      >
        <div className="relative">
          <div className="flex h-52 w-36 items-center justify-center rounded-[50%_50%_48%_48%] bg-[linear-gradient(145deg,#b9dceb,#78aed0)] shadow-[0_25px_70px_rgba(85,136,169,0.25)]">
            <div className="h-32 w-[2px] bg-white/45" />
          </div>

          <div className="mx-auto h-16 w-[2px] bg-[#9c8255]" />

          <div className="mx-auto -mt-1 h-7 w-10 rounded-b-lg bg-[#b98d57] shadow-md" />
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        animate={{
          y: [0, -10, 0],
          rotate: [1, -2, 1],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[13%] left-[7%] hidden text-[95px] md:block"
      >
        🧸
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/80 bg-white/65 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#4d91b8] shadow-sm backdrop-blur-md sm:text-sm"
        >
          <Sparkles size={15} />
          Vă invităm cu drag
        </motion.div>

        <h1 className="mt-8 text-[64px] font-semibold leading-[0.95] tracking-[-0.03em] text-[#263746] sm:text-7xl md:text-8xl lg:text-[106px]">
          Botezul lui
          <span className="mt-2 block text-[#609fc3]">Amir</span>
        </h1>

        <div className="mx-auto mt-8 h-px w-28 bg-gradient-to-r from-transparent via-[#cba967] to-transparent" />

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl sm:leading-9">
          Cu inimile pline de bucurie, vă invităm să ne fiți alături
          într-o zi specială, în care Amir va primi Sfântul Botez.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-700 sm:text-base">
          <div className="flex items-center gap-2 rounded-full border border-white bg-white/75 px-5 py-3 shadow-[0_12px_35px_rgba(52,83,105,0.08)] backdrop-blur">
            <CalendarDays size={19} className="text-[#5798bd]" />
            <span>2 octombrie 2026</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white bg-white/75 px-5 py-3 shadow-[0_12px_35px_rgba(52,83,105,0.08)] backdrop-blur">
            <MapPin size={19} className="text-[#5798bd]" />
            <span>Arad</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#rsvp"
            className="rounded-full bg-[#5798bd] px-9 py-4 font-semibold text-white shadow-[0_18px_40px_rgba(77,145,184,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#467fa1]"
          >
            Confirmă prezența
          </a>

          <a
            href="#eveniment"
            className="rounded-full border border-[#d8e4e9] bg-white/75 px-9 py-4 font-semibold text-slate-700 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Vezi detaliile
          </a>
        </div>
      </motion.div>

      <motion.a
        href="#poveste"
        aria-label="Derulează către poveste"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[#7196aa]"
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
}