"use client";

import { useEffect, useState } from "react";
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

  const greeting =
    guest?.greeting?.trim() ||
    (guest ? `Dragă ${guest.display_name},` : null);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28"
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
        className="relative z-10 mx-auto max-w-4xl rounded-[46px] border border-white/60 bg-white/45 px-8 py-14 text-center shadow-[0_30px_90px_rgba(38,55,70,0.10)] backdrop-blur-[3px] sm:px-12 sm:py-16"
      >
        {!loadingGuest && greeting && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 font-serif text-2xl italic text-[#9c7a3f] sm:text-3xl"
          >
            {greeting}
          </motion.p>
        )}

        <p className="text-xs font-semibold uppercase tracking-[0.48em] text-[#a88d5d] sm:text-sm">
          Sfântul Botez
        </p>

        <h1 className="mt-8 text-[76px] font-semibold leading-[0.88] tracking-[-0.04em] text-[#263746] sm:text-8xl md:text-[124px]">
          Amir
        </h1>

        <div className="mx-auto mt-9 h-px w-32 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent" />

        <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-slate-700 sm:text-xl sm:leading-9">
          Cu inimile pline de bucurie, vă invităm să ne fiți
          alături într-o zi specială, dedicată lui Amir.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-slate-700 sm:text-base">
          <div className="flex items-center gap-2 rounded-full border border-[#e4dbcb] bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <CalendarDays
              size={18}
              className="text-[#a88d5d]"
            />
            <span>2 octombrie 2026</span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-[#e4dbcb] bg-white/80 px-5 py-3 shadow-sm backdrop-blur">
            <MapPin
              size={18}
              className="text-[#a88d5d]"
            />
            <span>Arad</span>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="#rsvp"
            className="rounded-full bg-[#263746] px-9 py-4 font-semibold text-white shadow-[0_16px_38px_rgba(38,55,70,0.18)] transition duration-300 hover:-translate-y-1 hover:bg-[#1d2a35]"
          >
            Confirmă prezența
          </a>

          <a
            href="#eveniment"
            className="rounded-full border border-[#d8c7a4] bg-white/80 px-9 py-4 font-semibold text-[#263746] shadow-sm backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white"
          >
            Vezi detaliile
          </a>
        </div>
      </motion.div>
    </section>
  );
}