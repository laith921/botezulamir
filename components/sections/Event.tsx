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
    embed:
      "https://www.google.com/maps?q=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou&output=embed",
  },
  {
    icon: PartyPopper,
    title: "Petrecerea",
    hour: "17:30",
    place: "Safir 2",
    address: "Sat Horia, Str. 1 Decembrie 1918 nr. 2A",
    maps:
      "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia+Arad",
    embed:
      "https://www.google.com/maps?q=Safir+2+Horia+Arad&output=embed",
  },
];

export default function Event() {
  return (
    <section
      id="eveniment"
      className="relative px-5 py-10 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: 0.75,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-4xl"
      >
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-sm">
            Programul zilei
          </p>

          <h2 className="mt-4 font-serif text-3xl text-[#263746] sm:mt-6 sm:text-5xl">
            2 octombrie 2026
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#b99a63] sm:mt-6 sm:w-24" />
        </div>

        <div className="mx-auto mt-8 max-w-2xl sm:mt-16">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.article
                key={event.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`relative py-7 sm:py-10 ${
                  index !== events.length - 1
                    ? "border-b border-[#c9a86a]/35"
                    : ""
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-6">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center text-[#a88d5d] sm:h-12 sm:w-12">
                    <Icon
                      size={22}
                      className="sm:h-[25px] sm:w-[25px]"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7c45] sm:text-xs sm:tracking-[0.26em]">
                        {event.title}
                      </p>

                      <div className="flex items-center gap-2 font-serif text-2xl font-semibold text-[#263746] sm:text-3xl">
                        <Clock3
                          size={16}
                          className="text-[#a88d5d] sm:h-[17px] sm:w-[17px]"
                        />

                        {event.hour}
                      </div>
                    </div>

                    <h3 className="mt-3 font-serif text-[24px] leading-tight text-[#263746] sm:mt-4 sm:text-3xl">
                      {event.place}
                    </h3>

                    <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-[#56616a] sm:text-base">
                      <MapPin
                        size={16}
                        className="mt-1 shrink-0 text-[#a88d5d]"
                      />

                      <span>{event.address}</span>
                    </p>

                    <div className="mt-5 overflow-hidden rounded-[20px] border border-white/60 bg-white/25 shadow-[0_12px_32px_rgba(38,55,70,0.10)] sm:rounded-[24px]">
                      <iframe
                        src={event.embed}
                        title={`Hartă ${event.place}`}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="h-[165px] w-full border-0 sm:h-[210px]"
                      />
                    </div>

                    <a
                      href={event.maps}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#8d6f3e",
                        WebkitTextFillColor: "#8d6f3e",
                        textDecoration: "none",
                      }}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 active:scale-[0.98] sm:hover:gap-3 sm:hover:text-[#263746]"
                    >
                      Deschide în Google Maps
                      <ExternalLink size={15} />
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