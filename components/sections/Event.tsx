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
      "https://www.google.com/maps/search/?api=1&query=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou",
  },
  {
    icon: PartyPopper,
    title: "Petrecerea",
    hour: "17:30",
    place: "Safir 2",
    address: "Sat Horia, Str. 1 Decembrie 1918 nr. 2A",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia+Arad",
  },
];

export default function Event() {
  return (
    <section
      id="eveniment"
      className="relative px-5 py-12 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-5xl"
      >
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-sm">
            Programul zilei
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#263746] sm:mt-6 sm:text-5xl">
            2 octombrie 2026
          </h2>

          <div className="mx-auto mt-6 h-px w-20 bg-[#b99a63] sm:w-24" />
        </div>

        <div className="mx-auto mt-8 max-w-3xl space-y-4 sm:mt-14 sm:space-y-7">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.65,
                  delay: index * 0.1,
                }}
                className="rounded-[26px] border border-white/55 bg-white/42 p-5 shadow-[0_14px_40px_rgba(38,55,70,0.08)] backdrop-blur-[3px] sm:rounded-[34px] sm:bg-white/75 sm:p-8 sm:backdrop-blur-md"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/70 bg-white/70 text-[#a88d5d] shadow-sm backdrop-blur sm:h-14 sm:w-14">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#9b7c45] sm:text-xs">
                        {event.title}
                      </p>

                      <div className="flex items-center gap-2 font-serif text-2xl font-semibold text-[#263746] sm:text-3xl">
                        <Clock3
                          size={17}
                          className="text-[#a88d5d]"
                        />

                        {event.hour}
                      </div>
                    </div>

                    <h3 className="mt-3 font-serif text-2xl leading-tight text-[#263746] sm:mt-4 sm:text-3xl">
                      {event.place}
                    </h3>

                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#56616a] sm:text-base">
                      <MapPin
                        size={17}
                        className="mt-1 shrink-0 text-[#a88d5d]"
                      />

                      <span>{event.address}</span>
                    </p>

                    <a
                      href={event.maps}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#263746",
                        WebkitTextFillColor: "#263746",
                        textDecoration: "none",
                      }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-5 py-3 text-sm font-semibold shadow-sm transition active:scale-[0.98] sm:hover:-translate-y-0.5 sm:hover:bg-[#dcc18d]"
                    >
                      Deschide în Google Maps
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}