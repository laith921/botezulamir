"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  CalendarDays,
  ChevronDown,
  MapPin,
} from "lucide-react";
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
      className="relative flex min-h-[78svh] items-center justify-center overflow-hidden px-5 pb-8 pt-10 sm:min-h-screen sm:px-6 sm:py-24"
    >
      <div
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('/images/hero-background-mobile.png')",
        }}
        className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat sm:hidden"
      />

      <div
        aria-hidden="true"
        style={{
          backgroundImage:
            "url('/images/hero-background.png')",
        }}
        className="pointer-events-none fixed inset-0 -z-20 hidden bg-cover bg-center bg-no-repeat sm:block"
      />

      <div className="pointer-events-none fixed inset-0 -z-10 bg-transparent sm:bg-white/10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 mx-auto w-full max-w-4xl px-1 py-3 text-center sm:rounded-[46px] sm:border sm:border-white/60 sm:bg-white/45 sm:px-12 sm:py-14 sm:shadow-[0_30px_90px_rgba(38,55,70,0.10)] sm:backdrop-blur-[4px]"
      >
        {!loadingGuest && greeting && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-3 font-serif text-xl italic text-[#8d6f3e] drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)] sm:mb-7 sm:text-3xl"
          >
            {greeting}
          </motion.p>
        )}

        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] drop-shadow-[0_1px_6px_rgba(255,255,255,0.95)] sm:text-sm sm:tracking-[0.48em]">
          Sfântul Botez
        </p>

        <h1 className="mt-3 font-serif text-[62px] font-semibold leading-[0.88] tracking-[-0.04em] text-[#263746] drop-shadow-[0_3px_12px_rgba(255,255,255,0.78)] sm:mt-7 sm:text-8xl md:text-[116px]">
          Amir
        </h1>

        <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent sm:mt-8 sm:w-32" />

        <p className="mx-auto mt-4 max-w-[310px] text-[15px] leading-6 text-[#374854] drop-shadow-[0_1px_7px_rgba(255,255,255,0.95)] sm:mt-8 sm:max-w-2xl sm:text-xl sm:leading-9">
          Cu inimile pline de bucurie, vă invităm să ne fiți
          alături într-o zi specială, dedicată lui Amir.
        </p>

        <div className="mx-auto mt-5 grid max-w-[310px] grid-cols-2 gap-2 text-xs text-[#263746] sm:mt-9 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center sm:gap-4 sm:text-base">
          <div className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-3 shadow-sm backdrop-blur-[3px] sm:px-5">
            <CalendarDays
              size={16}
              className="shrink-0 text-[#a88d5d] sm:h-[18px] sm:w-[18px]"
            />
            <span className="whitespace-nowrap">2 oct. 2026</span>
          </div>

          <div className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-white/70 bg-white/65 px-3 py-3 shadow-sm backdrop-blur-[3px] sm:px-5">
            <MapPin
              size={16}
              className="shrink-0 text-[#a88d5d] sm:h-[18px] sm:w-[18px]"
            />
            <span>Arad</span>
          </div>
        </div>

        <div className="mx-auto mt-5 flex max-w-[310px] justify-center sm:mt-10 sm:max-w-none">
          <div
            role="button"
            tabIndex={0}
            onClick={() => scrollToSection("rsvp")}
            onKeyDown={(event) => handleKeyboard(event, "rsvp")}
            className="flex w-full cursor-pointer select-none items-center justify-center rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-7 py-3.5 shadow-[0_14px_34px_rgba(201,168,106,0.25)] transition duration-300 active:scale-[0.98] sm:w-auto sm:px-10 sm:py-4 sm:hover:-translate-y-1 sm:hover:bg-[#dcc18d]"
          >
            <span
              className="text-sm font-semibold sm:text-base"
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
              }}
            >
              Confirmă prezența
            </span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => scrollToSection("eveniment")}
          aria-label="Vezi programul evenimentului"
          animate={{
            y: [0, 6, 0],
            opacity: [0.45, 0.9, 0.45],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mx-auto mt-4 flex appearance-none flex-col items-center border-0 bg-transparent text-[#8d7852] sm:mt-7"
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.28em] sm:text-[10px]">
            Vezi detaliile
          </span>
          <ChevronDown size={20} className="mt-1" />
        </motion.button>
      </motion.div>
    </section>
  );
}