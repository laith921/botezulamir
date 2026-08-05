"use client";

import { motion } from "motion/react";
import { Church, Clock3, PartyPopper } from "lucide-react";

const events = [
  {
    icon: Church,
    label: "Ceremonia religioasă",
    time: "16:00",
    place: "Biserica Sf. Mare Mucenic Gheorghe",
    location: "Aradul Nou",
  },
  {
    icon: PartyPopper,
    label: "Recepția",
    time: "17:30",
    place: "Safir 2",
    location: "Horia",
  },
];

export default function Event() {
  return (
    <section
      id="eveniment"
      className="bg-[#f7f4ee] px-6 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#a88d5d] sm:text-sm">
            Programul zilei
          </p>

          <h2 className="mt-6 text-5xl font-semibold text-[#263746] sm:text-6xl">
            2 octombrie 2026
          </h2>

          <div className="mx-auto mt-8 h-px w-28 bg-[#b99a63]" />
        </div>

        <div className="relative mt-20 grid gap-8 md:grid-cols-2">
          <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-[#d8c7a4] md:block" />

          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.article
                key={event.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="relative rounded-[34px] border border-white/80 bg-white/75 p-9 shadow-[0_24px_70px_rgba(38,55,70,0.09)] backdrop-blur"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#d8c7a4] bg-[#faf8f4] text-[#a88d5d]">
                  <Icon size={25} />
                </div>

                <p className="mt-8 text-xs font-semibold uppercase tracking-[0.32em] text-[#a88d5d]">
                  {event.label}
                </p>

                <h3 className="mt-4 text-3xl font-semibold text-[#263746]">
                  {event.place}
                </h3>

                <p className="mt-3 text-slate-500">{event.location}</p>

                <div className="mt-8 flex items-center gap-3 text-lg font-semibold text-[#263746]">
                  <Clock3 size={20} className="text-[#a88d5d]" />
                  {event.time}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}