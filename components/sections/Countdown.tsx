"use client";

import { useEffect, useState } from "react";

const eventDate = new Date("2026-10-02T16:00:00");

function calculateTime() {
  const difference = eventDate.getTime() - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(calculateTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(calculateTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const values = [
    ["Zile", time.days],
    ["Ore", time.hours],
    ["Minute", time.minutes],
    ["Secunde", time.seconds],
  ];

  return (
    <section className="bg-[#fbf8f2] px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
          Până la ziua cea mare
        </p>

        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {values.map(([label, value]) => (
            <div
              key={String(label)}
              className="rounded-[28px] bg-white px-4 py-7 shadow-sm"
            >
              <p className="text-4xl font-semibold text-slate-800">
                {String(value).padStart(2, "0")}
              </p>

              <p className="mt-3 text-sm uppercase tracking-wider text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}