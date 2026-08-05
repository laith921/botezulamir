"use client";

import { motion } from "motion/react";

export default function Gallery() {
  return (
    <section
      id="galerie"
      className="relative overflow-hidden bg-[#f7f4ee] px-6 py-24 sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d8c7a4]/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
          O zi de neuitat
        </p>

        <h2 className="mt-7 text-4xl font-semibold leading-tight text-[#263746] sm:text-6xl">
          Cu drag, pentru Amir
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-600">
          Ne dorim ca această zi să rămână o amintire frumoasă, plină de
          emoție, lumină și oameni dragi.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
          <div className="rounded-[28px] border border-[#e8dfd0] bg-white/75 px-6 py-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#a88d5d]">
              Credință
            </p>
          </div>

          <div className="rounded-[28px] border border-[#e8dfd0] bg-white/75 px-6 py-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#a88d5d]">
              Familie
            </p>
          </div>

          <div className="rounded-[28px] border border-[#e8dfd0] bg-white/75 px-6 py-10 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#a88d5d]">
              Bucurie
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}