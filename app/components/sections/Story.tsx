"use client";

import { motion } from "motion/react";

export default function Story() {
  return (
    <section id="poveste" className="bg-white px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
          Povestea noastră
        </p>

        <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
          Un început plin de iubire
        </h2>

        <p className="mt-8 text-lg leading-9 text-slate-600">
          Cu multă bucurie în suflet, vă invităm să fiți alături de noi
          la Sfântul Botez al micuțului Amir și să împărtășim împreună
          această zi deosebită.
        </p>

        <div className="mt-10 text-6xl">🧸</div>
      </motion.div>
    </section>
  );
}