"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-5 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-20">
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
        <Heart
          size={34}
          fill="currentColor"
          className="mx-auto text-[#c9a86a]"
        />

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-xs">
          Sfântul Botez
        </p>

        <h2 className="mt-3 font-serif text-5xl font-semibold text-[#263746] drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] sm:text-7xl">
          Amir
        </h2>

        <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent" />

        <p className="mt-6 text-base font-medium text-[#263746]">
          2 octombrie 2026
        </p>

        <p className="mt-1 text-[#56616a]">
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
          className="mt-10 appearance-none border-0 bg-transparent text-[11px] font-semibold uppercase tracking-[0.28em] text-[#8d7852] transition hover:text-[#263746]"
        >
          Înapoi la început ↑
        </button>
      </motion.div>
    </footer>
  );
}