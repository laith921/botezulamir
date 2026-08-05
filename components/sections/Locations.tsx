"use client";

import { Church, ExternalLink, PartyPopper } from "lucide-react";

const churchMap =
  "https://www.google.com/maps?q=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou&output=embed";

const restaurantMap =
  "https://www.google.com/maps?q=Safir+2+Horia+Arad&output=embed";

const churchDirections =
  "https://www.google.com/maps/search/?api=1&query=Biserica+Sfântul+Mare+Mucenic+Gheorghe+Aradul+Nou";

const restaurantDirections =
  "https://www.google.com/maps/search/?api=1&query=Safir+2+Horia+Arad";

export default function Locations() {
  return (
    <section id="locatii" className="bg-[#f7fbfe] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#5798bd]">
            Cum ajungeți
          </p>

          <h2 className="mt-6 text-5xl font-semibold text-[#263746]">
            Locațiile evenimentului
          </h2>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <article className="overflow-hidden rounded-[34px] bg-white shadow-[0_20px_70px_rgba(30,64,100,0.10)]">
            <iframe
              title="Harta bisericii"
              src={churchMap}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0"
            />

            <div className="p-8">
              <Church size={36} className="text-[#5798bd]" />

              <h3 className="mt-6 text-3xl font-semibold text-slate-800">
                Ceremonia religioasă
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Biserica Sf. Mare Mucenic Gheorghe
                <br />
                Aradul Nou
                <br />
                Ora 16:00
              </p>

              <a
                href={churchDirections}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#5798bd] px-7 py-3 font-semibold text-white transition hover:bg-[#467fa1]"
              >
                Deschide în Google Maps
                <ExternalLink size={17} />
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-[34px] bg-white shadow-[0_20px_70px_rgba(30,64,100,0.10)]">
            <iframe
              title="Harta restaurantului"
              src={restaurantMap}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-80 w-full border-0"
            />

            <div className="p-8">
              <PartyPopper size={36} className="text-[#5798bd]" />

              <h3 className="mt-6 text-3xl font-semibold text-slate-800">
                Petrecerea
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                Safir 2
                <br />
                Sat Horia, Str. 1 Decembrie 1918 nr. 2A
                <br />
                Ora 17:30
              </p>

              <a
                href={restaurantDirections}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#5798bd] px-7 py-3 font-semibold text-white transition hover:bg-[#467fa1]"
              >
                Deschide în Google Maps
                <ExternalLink size={17} />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}