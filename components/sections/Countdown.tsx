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
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
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

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      id="countdown"
      className="relative px-5 py-12 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#a88d5d] sm:text-sm">
          Până la ziua cea mare
        </p>

        <h2 className="mt-4 font-serif text-3xl leading-tight text-[#263746] sm:mt-6 sm:text-5xl">
          Numărăm clipele împreună
        </h2>

        <div className="mx-auto mt-6 h-px w-20 bg-[#b99a63]" />

        <div className="mt-8 grid grid-cols-4 gap-2 sm:mt-12 sm:gap-5">
          {countdownItems.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-[20px] border border-white/45 bg-white/30 px-2 py-4 shadow-[0_10px_30px_rgba(38,55,70,0.06)] backdrop-blur-[2px] sm:rounded-[28px] sm:bg-white/70 sm:px-5 sm:py-8"
            >
              <motion.p
                key={timeLeft[key]}
                initial={{ opacity: 0.45, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif text-3xl font-semibold tabular-nums text-[#263746] sm:text-5xl"
              >
                {String(timeLeft[key]).padStart(2, "0")}
              </motion.p>

              <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#a88d5d] sm:mt-3 sm:text-xs sm:tracking-[0.28em]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-7 text-sm text-[#263746] sm:mt-10 sm:text-base">
          2 octombrie 2026 · Ora 16:00
        </p>
      </motion.div>
    </section>
  );
}