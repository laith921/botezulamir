"use client";

import { motion } from "motion/react";

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-20 sm:pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl rounded-[42px] border border-white/70 bg-white/78 px-8 py-14 text-center shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:px-12 sm:py-16"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d]">
          Sfântul Botez
        </p>

        <h2 className="mt-7 font-serif text-6xl font-semibold text-[#263746] sm:text-7xl">
          Amir
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />

        <p className="mt-8 text-lg text-slate-700">
          2 octombrie 2026
        </p>

        <p className="mt-3 text-slate-600">
          Arad
        </p>

        <p className="mx-auto mt-10 max-w-xl leading-8 text-slate-600">
          Vă mulțumim că împărtășiți cu noi bucuria acestei zile speciale.
        </p>
      </motion.div>

      <p className="mx-auto mt-8 text-center text-xs tracking-[0.25em] text-[#8d7852]">
        BOTEZUL LUI AMIR
      </p>
    </footer>
  );
}