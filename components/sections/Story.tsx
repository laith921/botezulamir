"use client";

import { motion } from "motion/react";
import { Mail, Sparkles } from "lucide-react";

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
        <div className="relative flex min-h-[520px] items-center justify-center overflow-hidden rounded-[36px] border border-[#e7dfd1] bg-[linear-gradient(145deg,#f8f5ef,#ffffff)] shadow-[0_30px_80px_rgba(38,55,70,0.10)]">
          <div className="absolute -left-20 top-10 h-52 w-52 rounded-full bg-[#dfd1b5]/20 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#a9c6d2]/20 blur-3xl" />

          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.92 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative z-10 text-center"
          >
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#d8c7a4] bg-white/80 shadow-sm">
              <Mail size={42} className="text-[#a88d5d]" />
            </div>

            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.42em] text-[#a88d5d]">
              O invitație specială
            </p>

            <div className="mx-auto mt-6 flex items-center justify-center gap-3 text-[#b99a63]">
              <span className="h-px w-14 bg-[#d8c7a4]" />
              <Sparkles size={18} />
              <span className="h-px w-14 bg-[#d8c7a4]" />
            </div>

            <p className="mx-auto mt-6 max-w-xs text-lg leading-8 text-slate-600">
              Pentru o zi care va rămâne mereu în inimile noastre.
            </p>
          </motion.div>
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