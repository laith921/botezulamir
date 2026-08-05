"use client";

import { motion } from "motion/react";
import {
  Church,
  ExternalLink,
  MapPin,
  PartyPopper,
} from "lucide-react";

const locations = [
  {
    icon: Church,
    eyebrow: "Slujba de botez",
    title: "Biserica Sf. Mare Mucenic Gheorghe",
    subtitle: "Aradul Nou",
    time: "16:00",
    map:
      "https://www.google.com/maps?q=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou&output=embed",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou",
  },
  {
    icon: PartyPopper,
    eyebrow: "Petrecerea",
    title: "Safir 2",
    subtitle: "Sat Horia, Str. 1 Decembrie 1918 nr. 2A",
    time: "17:30",
    map:
      "https://www.google.com/maps?q=Safir+2+Horia+Arad&output=embed",
    directions:
      "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia+Arad",
  },
];

export default function Locations() {
  return (
    <section
      id="locatii"
      className="relative px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
            Locațiile evenimentului
          </p>

          <h2 className="mt-7 text-4xl font-semibold text-[#263746] sm:text-6xl">
            Detalii și orientare
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-[#b99a63]" />
        </div>

        <div className="mt-16 space-y-10">
          {locations.map((location, index) => {
            const Icon = location.icon;

            return (
              <motion.article
                key={location.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.12,
                }}
                className="overflow-hidden rounded-[40px] border border-white/70 bg-white/78 shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md"
              >
                <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/80 bg-white/75 text-[#a88d5d] shadow-sm backdrop-blur">
                      <Icon size={26} />
                    </div>

                    <p className="mt-8 text-xs font-semibold uppercase tracking-[0.34em] text-[#a88d5d]">
                      {location.eyebrow}
                    </p>

                    <h3 className="mt-4 text-3xl font-semibold leading-tight text-[#263746] sm:text-4xl">
                      {location.title}
                    </h3>

                    <div className="mt-6 space-y-3 text-slate-700">
                      <p className="flex items-start gap-3 leading-7">
                        <MapPin
                          size={18}
                          className="mt-1 shrink-0 text-[#a88d5d]"
                        />

                        <span>{location.subtitle}</span>
                      </p>

                      <p className="text-lg font-semibold text-[#263746]">
                        Ora {location.time}
                      </p>
                    </div>

                    <a
                      href={location.directions}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#263746] bg-white/80 px-6 py-3 font-semibold text-[#263746] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-[#263746] hover:text-white"
                    >
                      Deschide în Google Maps
                      <ExternalLink size={17} />
                    </a>
                  </div>

                  <iframe
                    title={`Harta ${location.title}`}
                    src={location.map}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[360px] w-full border-0 lg:h-full lg:min-h-[430px]"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}