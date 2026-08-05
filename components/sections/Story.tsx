"use client";

import { motion } from "motion/react";

export default function Story() {
  return (
    <section
      id="poveste"
      className="relative overflow-hidden bg-white px-6 py-28 sm:py-36"
    >
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[#d8c7a4]/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="relative">
          <div className="aspect-[4/5] rounded-[36px] border border-[#e7dfd1] bg-[linear-gradient(145deg,#f7f4ee,#ffffff)] shadow-[0_30px_80px_rgba(38,55,70,0.10)]" />

          <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 rounded-full border border-[#d8c7a4]/60 bg-[#f7f4ee] lg:block" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm uppercase tracking-[0.35em] text-[#a88d5d]">
              Fotografie Amir
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#a88d5d] sm:text-sm">
            Povestea noastră
          </p>

          <h2 className="mt-6 text-5xl font-semibold leading-tight text-[#263746] sm:text-6xl">
            O zi dedicată iubirii și familiei
          </h2>

          <div className="mt-8 h-px w-24 bg-[#b99a63]" />

          <p className="mt-8 text-lg leading-9 text-slate-600">
            Cu multă bucurie în suflet, vă invităm să fiți alături de noi
            la Sfântul Botez al lui Amir și să împărtășim împreună această
            zi deosebită.
          </p>

          <p className="mt-6 text-lg leading-9 text-slate-600">
            Prezența voastră va transforma acest moment într-o amintire
            prețioasă pentru întreaga noastră familie.
          </p>
        </div>
      </motion.div>
    </section>
  );
}