"use client";

import { motion } from "motion/react";

export default function Family() {
  return (
    <section className="bg-white px-6 py-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-4xl text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
          Cu drag vă invită
        </p>

        <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
          Părinții și nașii
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          <div className="rounded-[32px] bg-[#fbf8f2] p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Părinții
            </p>

            <h3 className="mt-5 font-serif text-3xl text-slate-800">
              Andreea și Laith
            </h3>
          </div>

          <div className="rounded-[32px] bg-[#f7fbfe] p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">
              Nașii
            </p>

            <h3 className="mt-5 font-serif text-3xl text-slate-800">
              Diana și Bruno
            </h3>
          </div>
        </div>
      </motion.div>
    </section>
  );
}