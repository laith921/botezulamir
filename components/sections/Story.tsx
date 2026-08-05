"use client";

import { motion } from "motion/react";

export default function Story() {
  return (
    <section
      id="poveste"
      className="relative px-6 py-24 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-5xl rounded-[42px] border border-white/70 bg-white/78 px-8 py-14 text-center shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:px-14 sm:py-20"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
          Cu drag vă invităm
        </p>

        <h2 className="mt-7 text-4xl font-semibold leading-tight text-[#263746] sm:text-6xl">
          O zi deosebită pentru Amir
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />

        <p className="mx-auto mt-9 max-w-3xl text-lg leading-9 text-slate-700 sm:text-xl sm:leading-10">
          Cu multă bucurie în suflet, vă invităm să ne fiți alături la
          Sfântul Botez al lui Amir și să împărtășim împreună acest moment
          plin de emoție.
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-slate-600">
          Prezența dumneavoastră va transforma această zi într-o amintire
          prețioasă pentru noi.
        </p>

        <div className="mx-auto mt-12 flex items-center justify-center gap-5 text-[#b99a63]">
          <span className="h-px w-16 bg-[#d8c7a4]" />
          <span className="text-lg">✦</span>
          <span className="h-px w-16 bg-[#d8c7a4]" />
        </div>
      </motion.div>
    </section>
  );
}