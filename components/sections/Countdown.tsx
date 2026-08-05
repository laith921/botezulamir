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

const labels = [
  { key: "days", label: "Zile" },
  { key: "hours", label: "Ore" },
  { key: "minutes", label: "Minute" },
  { key: "seconds", label: "Secunde" },
] as const;

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
      className="relative px-6 py-24 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-5xl rounded-[42px] border border-white/70 bg-white/78 px-7 py-14 text-center shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:px-12 sm:py-20"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
          Până la ziua cea mare
        </p>

        <h2 className="mt-7 text-4xl font-semibold leading-tight text-[#263746] sm:text-6xl">
          Numărăm clipele împreună
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {labels.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-[28px] border border-white/80 bg-white/75 px-4 py-7 shadow-sm backdrop-blur sm:px-6 sm:py-9"
            >
              <motion.p
                key={timeLeft[key]}
                initial={{ opacity: 0.4, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-4xl font-semibold tabular-nums text-[#263746] sm:text-5xl"
              >
                {String(timeLeft[key]).padStart(2, "0")}
              </motion.p>

              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#a88d5d]">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-base leading-8 text-slate-600 sm:text-lg">
          2 octombrie 2026, ora 16:00
        </p>
      </motion.div>
    </section>
  );
}