"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#263746] px-6 py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-xs uppercase tracking-[0.45em] text-[#d8c7a4]">
          Sfântul Botez
        </p>

        <h2 className="mt-8 font-serif text-6xl">
          Amir
        </h2>

        <div className="mx-auto mt-8 h-px w-20 bg-[#d8c7a4]" />

        <p className="mt-8 text-lg text-slate-300">
          2 octombrie 2026
        </p>

        <p className="mt-3 text-slate-400">
          Arad
        </p>
      </motion.div>
    </footer>
  );
}