"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative px-5 pb-8 pt-8 sm:px-6 sm:pb-16 sm:pt-20">
      <motion.div
        initial={{
          opacity: 0,
          y: 16,
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
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-3xl text-center"
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay: 0.08,
          }}
        >
          <Heart
            size={30}
            fill="currentColor"
            className="mx-auto text-[#c9a86a] sm:h-[34px] sm:w-[34px]"
          />
        </motion.div>

        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:mt-6 sm:text-xs">
          Sfântul Botez
        </p>

        <h2 className="mt-3 font-serif text-[48px] font-semibold leading-none text-[#263746] drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)] sm:text-7xl">
          Amir
        </h2>

        <div className="mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent sm:mt-6 sm:w-24" />

        <p className="mt-5 text-sm font-medium text-[#263746] sm:mt-6 sm:text-base">
          2 octombrie 2026
        </p>

        <p className="mt-1 text-sm text-[#56616a] sm:text-base">
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
          className="mt-8 appearance-none border-0 bg-transparent text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8d7852] transition duration-300 hover:text-[#263746] sm:mt-10 sm:text-[11px] sm:tracking-[0.28em]"
        >
          Înapoi la început ↑
        </button>
      </motion.div>
    </footer>
  );
}