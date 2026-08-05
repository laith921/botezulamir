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
      className="relative px-5 py-16 sm:px-6 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="mx-auto max-w-5xl rounded-[34px] border border-white/70 bg-white/80 px-6 py-10 shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:rounded-[42px] sm:px-12 sm:py-16"
      >
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#a88d5d] sm:text-sm">
            Programul zilei
          </p>

          <h2 className="mt-5 text-4xl font-semibold text-[#263746] sm:text-6xl">
            2 octombrie 2026
          </h2>

          <div className="mx-auto mt-7 h-px w-24 bg-[#b99a63]" />
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <div className="absolute left-[27px] top-8 h-[calc(100%-4rem)] w-px bg-[#d8c7a4] sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-14">
            {events.map((event, index) => {
              const Icon = event.icon;
              const rightSide = index % 2 === 1;

              return (
                <motion.article
                  key={event.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.12,
                  }}
                  className="relative flex gap-5 sm:grid sm:grid-cols-[1fr_56px_1fr] sm:items-center sm:gap-8"
                >
                  <div
                    className={`hidden sm:block ${
                      rightSide ? "order-3 text-left" : "text-right"
                    }`}
                  >
                    {!rightSide ? (
                      <>
                        <p className="text-4xl font-semibold text-[#263746]">
                          {event.hour}
                        </p>

                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a88d5d]">
                          {event.title}
                        </p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-3xl font-semibold leading-tight text-[#263746]">
                          {event.place}
                        </h3>

                        <p className="mt-3 text-slate-600">
                          {event.address}
                        </p>

                        <a
                          href={event.maps}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-5 py-3 text-sm font-semibold text-[#263746] transition hover:bg-[#dcc18d]"
                        >
                          Google Maps
                          <ExternalLink size={16} />
                        </a>
                      </>
                    )}
                  </div>

                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#d8c7a4] bg-[#fffdf9] text-[#a88d5d] shadow-sm sm:order-2">
                    <Icon size={23} />
                  </div>

                  <div
                    className={`min-w-0 ${
                      rightSide ? "sm:order-1 sm:text-right" : ""
                    }`}
                  >
                    <div className="sm:hidden">
                      <div className="flex items-center gap-2 text-2xl font-semibold text-[#263746]">
                        <Clock3
                          size={18}
                          className="text-[#a88d5d]"
                        />
                        {event.hour}
                      </div>

                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#a88d5d]">
                        {event.title}
                      </p>

                      <h3 className="mt-4 text-2xl font-semibold leading-tight text-[#263746]">
                        {event.place}
                      </h3>

                      <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-slate-600">
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
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-5 py-3 text-sm font-semibold text-[#263746] transition hover:bg-[#dcc18d]"
                      >
                        Deschide în Google Maps
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    <div className="hidden sm:block">
                      {!rightSide ? (
                        <>
                          <h3 className="text-3xl font-semibold leading-tight text-[#263746]">
                            {event.place}
                          </h3>

                          <p className="mt-3 text-slate-600">
                            {event.address}
                          </p>

                          <a
                            href={event.maps}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-5 py-3 text-sm font-semibold text-[#263746] transition hover:bg-[#dcc18d]"
                          >
                            Google Maps
                            <ExternalLink size={16} />
                          </a>
                        </>
                      ) : (
                        <>
                          <p className="text-4xl font-semibold text-[#263746]">
                            {event.hour}
                          </p>

                          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#a88d5d]">
                            {event.title}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}