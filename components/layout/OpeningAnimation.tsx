"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function OpeningAnimation() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 6500);

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f7f4ee]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),transparent_48%),radial-gradient(circle_at_bottom,rgba(216,199,164,0.22),transparent_45%)]" />

      <motion.div
        initial={{ y: -520, opacity: 0 }}
        animate={{ y: -170, opacity: 1 }}
        transition={{
          duration: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2"
      >
        <div className="relative">
          <div className="flex h-44 w-32 items-center justify-center rounded-[52%_52%_46%_46%] border border-white/70 bg-[linear-gradient(145deg,#d8c7a4,#9cb9c5)] shadow-[0_30px_80px_rgba(38,55,70,0.18)]">
            <div className="h-28 w-px bg-white/50" />
          </div>

          <div className="mx-auto h-14 w-px bg-[#9c8255]" />

          <div className="mx-auto flex h-12 w-16 items-center justify-center rounded-b-xl bg-[#b99462] shadow-md">
            <span className="text-2xl">🧸</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 180, scale: 0.92 }}
        animate={{ opacity: 1, y: 120, scale: 1 }}
        transition={{
          delay: 2,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-30 mt-48 h-56 w-80"
      >
        <div className="absolute inset-x-0 bottom-0 h-44 rounded-[18px] bg-[#d7bd8b] shadow-[0_30px_80px_rgba(38,55,70,0.18)]" />

        <motion.div
          initial={{ rotateX: 0 }}
          animate={{ rotateX: 180 }}
          transition={{
            delay: 3.1,
            duration: 1.1,
            ease: "easeInOut",
          }}
          style={{ transformOrigin: "top" }}
          className="absolute inset-x-0 top-12 z-30 h-0 border-l-[160px] border-r-[160px] border-t-[100px] border-l-transparent border-r-transparent border-t-[#c5a76f]"
        />

        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: -95, opacity: 1 }}
          transition={{
            delay: 4.1,
            duration: 1.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute left-1/2 top-20 z-20 w-64 -translate-x-1/2 rounded-[18px] border border-[#e4d9c5] bg-[#fffdf9] px-7 py-8 text-center shadow-xl"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#a88d5d]">
            Sfântul Botez
          </p>

          <h2 className="mt-4 text-5xl font-semibold text-[#263746]">
            Amir
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#c5a76f]" />

          <p className="mt-5 text-sm text-slate-600">
            2 octombrie 2026
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        type="button"
        onClick={() => setVisible(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.2 }}
        className="absolute bottom-10 z-40 text-xs font-semibold uppercase tracking-[0.3em] text-[#8d7852]"
      >
        Intră în invitație
      </motion.button>
    </motion.div>
  );
}