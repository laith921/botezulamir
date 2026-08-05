"use client";

import { motion } from "motion/react";
import { Camera, Images } from "lucide-react";

export default function Gallery() {
  return (
    <section
      id="galerie"
      className="relative px-6 py-24 sm:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.9 }}
        className="mx-auto max-w-5xl rounded-[42px] border border-white/70 bg-white/78 px-8 py-14 text-center shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:px-14 sm:py-20"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c7a4] bg-white/80 text-[#a88d5d] shadow-sm">
          <Camera size={28} />
        </div>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
          Amintiri din această zi
        </p>

        <h2 className="mt-7 text-4xl font-semibold leading-tight text-[#263746] sm:text-6xl">
          Galeria foto
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-9 text-slate-700">
          Fotografiile de la botezul lui Amir vor fi disponibile aici după
          eveniment.
        </p>

        <p className="mx-auto mt-4 max-w-2xl leading-8 text-slate-600">
          Vă invităm să reveniți pentru a retrăi împreună cele mai frumoase
          momente ale acestei zile.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex aspect-[4/3] items-center justify-center rounded-[28px] border border-dashed border-[#d8c7a4] bg-white/55 text-[#a88d5d] backdrop-blur"
            >
              <Images size={28} />
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Galeria va fi actualizată la câteva săptămâni după eveniment.
        </p>
      </motion.div>
    </section>
  );
}