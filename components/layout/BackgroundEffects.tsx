"use client";

import { motion } from "motion/react";

const particles = [
  { left: "7%", top: "12%", size: 3, duration: 7, delay: 0 },
  { left: "18%", top: "32%", size: 2, duration: 9, delay: 1.1 },
  { left: "30%", top: "18%", size: 3, duration: 8, delay: 0.6 },
  { left: "44%", top: "44%", size: 2, duration: 10, delay: 1.8 },
  { left: "58%", top: "14%", size: 3, duration: 7.5, delay: 0.9 },
  { left: "72%", top: "36%", size: 2, duration: 9.5, delay: 2 },
  { left: "88%", top: "20%", size: 3, duration: 8.5, delay: 1.4 },
  { left: "12%", top: "62%", size: 2, duration: 10, delay: 0.5 },
  { left: "26%", top: "78%", size: 3, duration: 8, delay: 1.7 },
  { left: "52%", top: "68%", size: 2, duration: 9, delay: 0.3 },
  { left: "68%", top: "84%", size: 3, duration: 7.5, delay: 1.2 },
  { left: "91%", top: "70%", size: 2, duration: 10, delay: 2.2 },
];

export default function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}-${index}`}
          initial={{
            opacity: 0.15,
            scale: 0.8,
            y: 0,
          }}
          animate={{
            opacity: [0.12, 0.65, 0.12],
            scale: [0.8, 1.35, 0.8],
            y: [0, -12, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-[#c9a86a] shadow-[0_0_8px_rgba(201,168,106,0.45)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0.08 }}
        animate={{
          opacity: [0.06, 0.14, 0.06],
          x: [-15, 15, -15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-90px] top-[22%] h-52 w-52 rounded-full bg-[#d9edf6]/35 blur-3xl sm:h-80 sm:w-80"
      />

      <motion.div
        initial={{ opacity: 0.07 }}
        animate={{
          opacity: [0.05, 0.12, 0.05],
          x: [12, -12, 12],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-100px] top-[58%] h-56 w-56 rounded-full bg-[#ead8b5]/30 blur-3xl sm:h-96 sm:w-96"
      />
    </div>
  );
}