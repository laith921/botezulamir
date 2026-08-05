"use client";

import { motion } from "motion/react";

const illustrations = [
  { emoji: "🧸", title: "Ursulețul lui Amir" },
  { emoji: "🎈", title: "Balonul cu aer cald" },
  { emoji: "☁️", title: "Printre nori" },
];

export default function Gallery() {
  return (
    <section id="galerie" className="bg-white px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            O lume de poveste
          </p>

          <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
            Pentru micul nostru Amir
          </h2>
        </div>

        <div className="mt-16 grid gap-7 md:grid-cols-3">
          {illustrations.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -8 }}
              className="flex min-h-72 flex-col items-center justify-center rounded-[36px] bg-[#fbf8f2] p-8 text-center shadow-sm"
            >
              <div className="text-8xl">{item.emoji}</div>

              <h3 className="mt-8 text-xl font-semibold text-slate-700">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}