"use client";

import { motion } from "motion/react";
import {
  Church,
  Clock3,
  ExternalLink,
  MapPin,
  PartyPopper,
} from "lucide-react";

const events = [
  {
    icon: Church,
    title: "Slujba de botez",
    hour: "16:00",
    place: "Biserica Sf. Mare Mucenic Gheorghe",
    address: "Aradul Nou",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Biserica+Sf.+Mare+Mucenic+Gheorghe+Arad",
  },
  {
    icon: PartyPopper,
    title: "Petrecerea",
    hour: "17:30",
    place: "Safir 2",
    address: "Sat Horia, Str. 1 Decembrie 1918 nr. 2A",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia",
  },
];

export default function Event() {
  return (
    <section
      id="eveniment"
      className="relative px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d]">
            Programul zilei
          </p>

          <h2 className="mt-6 text-5xl font-semibold text-[#263746]">
            2 octombrie 2026
          </h2>

          <div className="mx-auto mt-7 h-px w-24 bg-[#b99a63]" />
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                }}
                className="rounded-[40px] border border-white/70 bg-white/78 p-10 shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md"
              >
                <div className="flex items-center justify-between">

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f8f4ed] text-[#b99a63]">
                    <Icon size={28} />
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock3
                      size={22}
                      className="text-[#b99a63]"
                    />

                    <span className="text-5xl font-semibold text-[#263746]">
                      {event.hour}
                    </span>
                  </div>
                </div>

                <p className="mt-10 text-xs font-semibold uppercase tracking-[0.35em] text-[#a88d5d]">
                  {event.title}
                </p>

                <h3 className="mt-5 text-4xl font-semibold text-[#263746]">
                  {event.place}
                </h3>

                <p className="mt-5 flex items-start gap-3 text-lg leading-8 text-slate-600">
                  <MapPin
                    size={20}
                    className="mt-1 shrink-0 text-[#a88d5d]"
                  />

                  {event.address}
                </p>

                <a
                  href={event.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-3 rounded-full border border-[#263746] bg-white px-7 py-4 font-semibold text-[#263746] transition hover:bg-[#263746] hover:text-white"
                >
                  Vezi pe Google Maps

                  <ExternalLink size={18} />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}