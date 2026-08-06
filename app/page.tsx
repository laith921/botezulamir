"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Heart,
  LockKeyhole,
  Sparkles,
} from "lucide-react";

import BackgroundEffects from "@/components/layout/BackgroundEffects";

import OpeningAnimation from "@/components/layout/OpeningAnimation";

import Countdown from "@/components/sections/Countdown";
import Event from "@/components/sections/Event";
import Footer from "@/components/sections/Footer";
import GuestBook from "@/components/sections/GuestBook";
import Hero from "@/components/sections/Hero";
import RSVP from "@/components/sections/RSVP";

import { supabase } from "@/lib/supabase";

type AccessStatus =
  | "checking"
  | "allowed"
  | "restricted";

export default function Home() {
  const [accessStatus, setAccessStatus] =
    useState<AccessStatus>("checking");

  useEffect(() => {
    let active = true;

    async function verifyInvitation() {
      const params = new URLSearchParams(
        window.location.search,
      );

      const slug = params.get("inv")?.trim();

      if (!slug) {
        if (active) {
          setAccessStatus("restricted");
        }

        return;
      }

      const { data, error } = await supabase.rpc(
        "get_guest_by_slug",
        {
          guest_slug: slug,
        },
      );

      if (!active) {
        return;
      }

      if (
        error ||
        !data ||
        data.length === 0
      ) {
        setAccessStatus("restricted");
        return;
      }

      setAccessStatus("allowed");

      const accessKey = `invitation-open-recorded:${slug}`;

      if (!window.sessionStorage.getItem(accessKey)) {
        const { error: recordError } = await supabase.rpc(
          "record_invitation_open",
          {
            guest_slug: slug,
          },
        );

        if (recordError) {
          console.error(
            "Accesarea invitației nu a putut fi înregistrată:",
            recordError,
          );
        } else {
          window.sessionStorage.setItem(accessKey, "true");
        }
      }
    }

    verifyInvitation();

    return () => {
      active = false;
    };
  }, []);

  if (accessStatus === "checking") {
    return (
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6">
        <div
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('/images/hero-background-mobile.png')",
          }}
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat sm:hidden"
        />

        <div
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('/images/hero-background.png')",
          }}
          className="fixed inset-0 -z-20 hidden bg-cover bg-center bg-no-repeat sm:block"
        />

        <div className="fixed inset-0 -z-10 bg-white/10" />

        <motion.section
          initial={{
            opacity: 0,
            y: 18,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-md text-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto flex h-24 w-24 items-center justify-center"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-0 rounded-full border border-[#c9a86a]/40 border-t-[#a88d5d]"
            />

            <motion.div
              animate={{
                scale: [1, 1.06, 1],
                opacity: [0.82, 1, 0.82],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/75 bg-white/55 text-[#a88d5d] shadow-[0_18px_50px_rgba(38,55,70,0.10)] backdrop-blur-md"
            >
              <Heart
                size={28}
                strokeWidth={1.6}
                fill="currentColor"
              />
            </motion.div>

            <motion.div
              animate={{
                opacity: [0.25, 1, 0.25],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-1 top-2 text-[#c9a86a]"
            >
              <Sparkles size={18} strokeWidth={1.6} />
            </motion.div>
          </motion.div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9b7c45] sm:text-xs">
            Botezul lui Amir
          </p>

          <motion.h1
            animate={{
              opacity: [0.55, 1, 0.55],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mt-3 font-serif text-3xl text-[#263746] sm:text-4xl"
          >
            Se verifică invitația
          </motion.h1>

          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent" />

          <p className="mx-auto mt-5 max-w-sm text-sm leading-6 text-[#56616a]">
            Pregătim invitația personalizată pentru
            dumneavoastră.
          </p>

          <div className="mx-auto mt-7 flex w-28 items-center justify-center gap-2">
            {[0, 1, 2].map((item) => (
              <motion.span
                key={item}
                animate={{
                  opacity: [0.25, 1, 0.25],
                  scale: [0.8, 1.15, 0.8],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: item * 0.18,
                  ease: "easeInOut",
                }}
                className="h-2 w-2 rounded-full bg-[#a88d5d]"
              />
            ))}
          </div>
        </motion.section>
      </main>
    );
  }

  if (accessStatus === "restricted") {
    return (
      <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-12">
        <div
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('/images/hero-background-mobile.png')",
          }}
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat sm:hidden"
        />

        <div
          aria-hidden="true"
          style={{
            backgroundImage:
              "url('/images/hero-background.png')",
          }}
          className="fixed inset-0 -z-20 hidden bg-cover bg-center bg-no-repeat sm:block"
        />

        <div className="fixed inset-0 -z-10 bg-white/10" />

        <motion.section
          initial={{
            opacity: 0,
            y: 24,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto w-full max-w-2xl text-center"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/55 text-[#a88d5d] shadow-[0_16px_40px_rgba(38,55,70,0.10)] backdrop-blur-sm"
          >
            <LockKeyhole size={25} strokeWidth={1.7} />
          </motion.div>

          <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.38em] text-[#9b7c45] sm:text-sm">
            Invitație privată
          </p>

          <h1 className="mt-4 font-serif text-[48px] font-semibold leading-tight text-[#263746] drop-shadow-[0_3px_12px_rgba(255,255,255,0.85)] sm:mt-6 sm:text-7xl">
            Botezul lui Amir
          </h1>

          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#b99a63] to-transparent sm:mt-8 sm:w-32" />

          <div className="mx-auto mt-7 max-w-lg space-y-5 text-[15px] leading-7 text-[#39434a] drop-shadow-[0_1px_8px_rgba(255,255,255,0.95)] sm:mt-9 sm:text-lg sm:leading-8">
            <p>
              Această pagină este rezervată invitaților
              noștri.
            </p>

            <p>
              Dacă ați primit o invitație, vă rugăm să
              folosiți linkul personalizat primit în mesaj
              pentru a o deschide.
            </p>
          </div>

          <div className="mx-auto mt-8 flex max-w-[250px] items-center justify-center gap-3 sm:mt-10">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a86a]/55" />

            <span
              aria-hidden="true"
              className="text-[#b99a63]"
            >
              ✦
            </span>

            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a86a]/55" />
          </div>
        </motion.section>
      </main>
    );
  }

  return (
    <main className="relative isolate overflow-hidden">
      <OpeningAnimation />
      <BackgroundEffects />
      

      <div className="relative z-10">
        <Hero />
        <Event />
        <Countdown />
        <RSVP />
        <GuestBook />
        <Footer />
      </div>
    </main>
  );
}