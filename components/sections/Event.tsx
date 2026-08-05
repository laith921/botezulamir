"use client";

import { motion } from "motion/react";
import { Church, Clock3, MapPin, PartyPopper } from "lucide-react";

const events = [
  {
    icon: Church,
    title: "Ceremonia religioasă",
    time: "16:00",
    place: "Biserica Sfântul Mare Mucenic Gheorghe",
    address: "Aradul Nou",
  },
  {
    icon: PartyPopper,
    title: "Petrecerea",
    time: "17:30",
    place: "Safir 2",
    address: "Horia, Str. 1 Decembrie 1918 nr. 2A",
  },
];

export default function Event() {
  return (
    <section id="eveniment" className="bg-[#f7fbfe] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            Detaliile evenimentului
          </p>

          <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
            2 octombrie 2026
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {events.map((event, index) => {
            const Icon = event.icon;

            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="rounded-[32px] bg-white p-8 shadow-[0_20px_70px_rgba(30,64,100,0.10)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Icon size={27} />
                </div>

                <h3 className="mt-7 text-2xl font-semibold text-slate-800">
                  {event.title}
                </h3>

                <div className="mt-6 space-y-4 text-slate-600">
                  <p className="flex items-center gap-3">
                    <Clock3 size={20} className="text-sky-600" />
                    {event.time}
                  </p>

                  <p className="flex items-start gap-3">
                    <MapPin
                      size={20}
                      className="mt-1 shrink-0 text-sky-600"
                    />
                    <span>
                      <strong className="block text-slate-700">
                        {event.place}
                      </strong>
                      {event.address}
                    </span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}