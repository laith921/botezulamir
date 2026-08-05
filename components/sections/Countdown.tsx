"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

const eventDate = new Date("2026-10-02T16:00:00+03:00").getTime();

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const countdownItems = [
  { key: "days", label: "Zile" },
  { key: "hours", label: "Ore" },
  { key: "minutes", label: "Minute" },
  { key: "seconds", label: "Secunde" },
] as const;

function calculateTimeLeft(): TimeLeft {
  const difference = Math.max(eventDate - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (difference / (1000 * 60 * 60)) % 24,
    ),
    minutes: Math.floor(
      (difference / (1000 * 60)) % 60,
    ),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(),
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <section
      id="countdown"
      className="relative px-5 py-12 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 22,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.25,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b7c45] sm:text-sm">
          Până la ziua cea mare
        </p>

        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#263746] sm:mt-6 sm:text-5xl">
          Numărăm clipele împreună
        </h2>

        <div className="mx-auto mt-6 h-px w-20 bg-[#b99a63] sm:w-24" />

        <div className="mx-auto mt-9 grid max-w-xl grid-cols-4 gap-2 sm:mt-14 sm:gap-8">
          {countdownItems.map(({ key, label }, index) => (
            <motion.div
              key={key}
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
              }}
              className="relative px-1 py-2"
            >
              <motion.p
                key={timeLeft[key]}
                initial={{
                  opacity: 0.45,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="font-serif text-3xl font-semibold tabular-nums text-[#263746] drop-shadow-[0_1px_7px_rgba(255,255,255,0.9)] sm:text-5xl"
              >
                {String(timeLeft[key]).padStart(2, "0")}
              </motion.p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#9b7c45] sm:mt-3 sm:text-xs sm:tracking-[0.26em]">
                {label}
              </p>

              {index !== countdownItems.length - 1 && (
                <span className="absolute right-[-5px] top-1/2 hidden h-8 w-px -translate-y-1/2 bg-[#c9a86a]/35 sm:block" />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-sm items-center justify-center gap-3 sm:mt-11">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a86a]/45" />
          <span className="text-[#b99a63]">✦</span>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a86a]/45" />
        </div>

        <p className="mt-6 text-sm font-medium text-[#263746] sm:text-base">
          2 octombrie 2026 · Ora 16:00
        </p>
      </motion.div>
    </section>
  );
}
