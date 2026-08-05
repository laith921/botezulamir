"use client";

import { motion } from "motion/react";
import { useState } from "react";

export default function OpeningAnimation() {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f7f4ee]">
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: -80, opacity: 1 }}
        transition={{
          duration: 2.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="flex h-44 w-32 items-center justify-center rounded-[52%_52%_46%_46%] border border-white/70 bg-[linear-gradient(145deg,#d8c7a4,#9cb9c5)] shadow-[0_30px_80px_rgba(38,55,70,0.18)]">
          <div className="h-28 w-px bg-white/50" />
        </div>

        <div className="mx-auto h-14 w-px bg-[#9c8255]" />

        <div className="mx-auto flex h-12 w-16 items-center justify-center rounded-b-xl bg-[#b99462] shadow-md">
          <span className="text-2xl">🧸</span>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute bottom-10 text-xs font-semibold uppercase tracking-[0.3em] text-[#8d7852]"
      >
        Intră în invitație
      </button>
    </div>
  );
}