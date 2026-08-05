"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { CalendarDays, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabase";

type GuestData = {
  id: string;
  display_name: string;
  slug: string;
  greeting: string | null;
};

export default function Hero() {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [loadingGuest, setLoadingGuest] = useState(true);

  const { scrollY } = useScroll();

  const backgroundY = useTransform(
    scrollY,
    [0, 1400],
    [0, 90],
  );

  const backgroundScale = useTransform(
    scrollY,
    [0, 1400],
    [1.04, 1.1],
  );

  const backgroundOpacity = useTransform(
    scrollY,
    [0, 1600],
    [1, 0.82],
  );

  useEffect(() => {
    async function loadGuest() {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("inv");

      if (!slug) {
        setLoadingGuest(false);
        return;
      }

      const { data, error } = await supabase.rpc(
        "get_guest_by_slug",
        {
          guest_slug: slug,
        },
      );

      if (!error && data && data.length > 0) {
        setGuest(data[0] as GuestData);
      }

      setLoadingGuest(false);
    }

    loadGuest();
  }, []);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleKeyboard(
    event: KeyboardEvent<HTMLDivElement>,
    sectionId: string,
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      scrollToSection(sectionId);
    }
  }

  const greeting =
    guest?.greeting?.trim() ||
    (guest ? `Dragă ${guest.display_name},` : null);

  return (
    <section
      id="hero"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 py-20 sm:min-h-screen sm:px-6 sm:py-28"
    >
      <motion.div
        aria-hidden="true"
        style={{
          y: backgroundY,
          scale: backgroundScale,
          opacity: backgroundOpacity,
          backgroundImage:
            "url('/images/hero-background.png')",
        }}
        className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat will-change-transform"
      />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-white/10" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-auto w-full max-w-4xl rounded-[34px] border border-white/60 bg-white/42 px-6 py-10 text-center shadow-[0_30px_90px_rgba(38,55,70,0.10)] backdrop-blur-[4px] sm:rounded-[46px] sm:px-12 sm:py-16"
      >
        {!loadingGuest && greeting && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 font-serif text-xl italic text-[#9c7a3f] sm:mb-8 sm:text-3xl"
          >
            {greeting}
          </motion.p>
        )}

        <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#a88d5d] sm:text-sm sm:tracking-[0.48em]">
          Sfântul Botez
        </p>

        <h1 className="mt-6 text-6xl font-semibold leading-[0.9] tracking-[-0.04em] text-[#263746] sm:mt-8 sm:text-8xl md:text-[124px]">
          Amir
        </h1>

        <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent sm:mt-9 sm:w-32" />

        <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-slate-700 sm:mt-9 sm:max-w-2xl sm:text-xl sm:leading-9">
          Cu inimile pline de bucurie, vă invităm să ne fiți alături
          într-o zi specială, dedicată lui Amir.
        </p>

        <div className="mt-8 flex flex-col gap-3 text-sm text-slate-700 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 sm:text-base">
          <div className="flex items-center justify-center gap-2 rounded-full border border-[#e4dbcb] bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <CalendarDays
              size={18}
              className="text-[#a88d5d]"
            />

            <span>2 octombrie 2026</span>
          </div>

          <div className="flex items-center justify-center gap-2 rounded-full border border-[#e4dbcb] bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <MapPin
              size={18}
              className="text-[#a88d5d]"
            />

            <span>Arad</span>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:justify-center sm:gap-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => scrollToSection("rsvp")}
            onKeyDown={(event) =>
              handleKeyboard(event, "rsvp")
            }
            className="flex w-full cursor-pointer select-none items-center justify-center rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-8 py-4 shadow-[0_16px_38px_rgba(201,168,106,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-[#dcc18d] focus:outline-none focus:ring-2 focus:ring-[#c9a86a] focus:ring-offset-2 sm:w-auto sm:px-9"
          >
            <span
              className="text-base font-semibold"
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
              }}
            >
              Confirmă prezența
            </span>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => scrollToSection("eveniment")}
            onKeyDown={(event) =>
              handleKeyboard(event, "eveniment")
            }
            className="flex w-full cursor-pointer select-none items-center justify-center rounded-full border border-[#d8c7a4] bg-white/90 px-8 py-4 shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#a88d5d] focus:ring-offset-2 sm:w-auto sm:px-9"
          >
            <span
              className="text-base font-semibold"
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
              }}
            >
              Vezi detaliile
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}