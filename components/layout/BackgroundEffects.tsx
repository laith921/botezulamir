"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";

const particles = [
  {
    left: "10%",
    top: "16%",
    size: 2,
    duration: 9,
    delay: 0,
  },
  {
    left: "28%",
    top: "33%",
    size: 2,
    duration: 11,
    delay: 1.2,
  },
  {
    left: "48%",
    top: "14%",
    size: 2,
    duration: 10,
    delay: 0.6,
  },
  {
    left: "72%",
    top: "29%",
    size: 2,
    duration: 12,
    delay: 1.7,
  },
  {
    left: "88%",
    top: "18%",
    size: 2,
    duration: 10.5,
    delay: 0.9,
  },
  {
    left: "18%",
    top: "72%",
    size: 2,
    duration: 12,
    delay: 0.4,
  },
  {
    left: "56%",
    top: "67%",
    size: 2,
    duration: 11,
    delay: 1.5,
  },
  {
    left: "84%",
    top: "79%",
    size: 2,
    duration: 12.5,
    delay: 2,
  },
];

export default function BackgroundEffects() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}-${index}`}
          initial={{
            opacity: 0.08,
            scale: 0.85,
            y: 0,
          }}
          animate={
            reduceMotion
              ? {
                  opacity: 0.12,
                  scale: 1,
                  y: 0,
                }
              : {
                  opacity: [0.06, 0.28, 0.06],
                  scale: [0.85, 1.15, 0.85],
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute rounded-full bg-[#c9a86a] shadow-[0_0_7px_rgba(201,168,106,0.28)] ${
            index > 4 ? "hidden sm:block" : ""
          }`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0.04 }}
        animate={
          reduceMotion
            ? {
                opacity: 0.05,
                x: 0,
                y: 0,
              }
            : {
                opacity: [0.035, 0.075, 0.035],
                x: [-10, 10, -10],
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[-110px] top-[18%] h-48 w-48 rounded-full bg-[#d9edf6]/24 blur-3xl sm:h-80 sm:w-80"
      />

      <motion.div
        initial={{ opacity: 0.035 }}
        animate={
          reduceMotion
            ? {
                opacity: 0.045,
                x: 0,
                y: 0,
              }
            : {
                opacity: [0.03, 0.065, 0.03],
                x: [10, -10, 10],
                y: [0, 7, 0],
              }
        }
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[-125px] top-[57%] h-52 w-52 rounded-full bg-[#ead8b5]/22 blur-3xl sm:h-96 sm:w-96"
      />

      <motion.div
        initial={{ opacity: 0.02 }}
        animate={
          reduceMotion
            ? {
                opacity: 0.025,
                scale: 1,
              }
            : {
                opacity: [0.018, 0.04, 0.018],
                scale: [0.98, 1.04, 0.98],
              }
        }
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[22%] top-[44%] hidden h-72 w-72 rounded-full bg-white/25 blur-3xl sm:block"
      />
    </div>
  );
}