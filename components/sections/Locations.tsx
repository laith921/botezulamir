"use client";

import { Church, MapPin, PartyPopper } from "lucide-react";

const churchUrl =
  "https://www.google.com/maps/search/?api=1&query=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou";

const restaurantUrl =
  "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia+Arad";

export default function Locations() {
  return (
    <section id="locatii" className="bg-[#f7fbfe] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
            Cum ajungeți
          </p>

          <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
            Locațiile evenimentului
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <article className="rounded-[34px] bg-white p-8 shadow-[0_20px_70px_rgba(30,64,100,0.10)]">
            <Church size={36} className="text-sky-600" />

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Ceremonia religioasă
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Biserica Sfântul Mare Mucenic Gheorghe
              <br />
              Aradul Nou
            </p>

            <a
              href={churchUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              <MapPin size={18} />
              Deschide harta
            </a>
          </article>

          <article className="rounded-[34px] bg-white p-8 shadow-[0_20px_70px_rgba(30,64,100,0.10)]">
            <PartyPopper size={36} className="text-sky-600" />

            <h3 className="mt-6 text-2xl font-semibold text-slate-800">
              Petrecerea
            </h3>

            <p className="mt-4 leading-8 text-slate-600">
              Safir 2
              <br />
              Horia, Str. 1 Decembrie 1918 nr. 2A
            </p>

            <a
              href={restaurantUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sky-600 px-7 py-3 font-semibold text-white transition hover:bg-sky-700"
            >
              <MapPin size={18} />
              Deschide harta
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}