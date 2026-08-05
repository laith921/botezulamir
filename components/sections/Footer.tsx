"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-5 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-16">
      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.3,
        }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/40 text-[#a88d5d] shadow-sm backdrop-blur-[3px] sm:h-13 sm:w-13 sm:bg-white/70">
          <Heart
            size={19}
            fill="currentColor"
          />
        </div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-xs">
          Sfântul Botez
        </p>

        <h2 className="mt-3 font-serif text-5xl font-semibold text-[#263746] drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)] sm:mt-5 sm:text-7xl">
          Amir
        </h2>

        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent sm:mt-7 sm:w-24" />

        <p className="mt-5 text-sm font-medium text-[#263746] sm:mt-7 sm:text-base">
          2 octombrie 2026
        </p>

        <p className="mt-1 text-sm text-[#56616a]">
          Arad
        </p>

        <button
          type="button"
          onClick={() =>
            document
              .getElementById("hero")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
          }
          className="mt-6 appearance-none border-0 bg-transparent text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8d7852] transition hover:text-[#263746] sm:mt-8 sm:text-xs"
        >
          Înapoi la început ↑
        </button>
      </motion.div>
    </footer>
  );
}