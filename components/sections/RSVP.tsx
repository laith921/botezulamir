"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  AlertCircle,
  ChevronDown,
  Heart,
} from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "@/lib/supabase";

type GuestData = {
  id: string;
  display_name: string;
  slug: string;
  greeting: string | null;
};

type SupabaseError = {
  message?: string;
  details?: string;
  hint?: string;
  code?: string;
};

const celebrationParticles = [
  { left: "10%", delay: 0, symbol: "✦" },
  { left: "24%", delay: 0.14, symbol: "•" },
  { left: "39%", delay: 0.28, symbol: "✧" },
  { left: "53%", delay: 0.08, symbol: "•" },
  { left: "68%", delay: 0.22, symbol: "✦" },
  { left: "82%", delay: 0.12, symbol: "•" },
  { left: "92%", delay: 0.34, symbol: "✧" },
];

function getReadableError(error: SupabaseError) {
  const message = error.message ?? "";
  const details = error.details ?? "";
  const combined = `${message} ${details}`.toLowerCase();

  if (
    error.code === "42501" ||
    combined.includes("row-level security")
  ) {
    return "Baza de date nu permite momentan trimiterea confirmării.";
  }

  if (
    error.code === "23505" ||
    combined.includes("duplicate key") ||
    combined.includes("unique constraint")
  ) {
    return "Pentru această invitație există deja o confirmare înregistrată.";
  }

  if (
    combined.includes("guest_id") ||
    combined.includes("guest_slug")
  ) {
    return "Tabelul RSVP nu este configurat complet pentru invitațiile personalizate.";
  }

  if (
    combined.includes("failed to fetch") ||
    combined.includes("network")
  ) {
    return "Nu s-a putut realiza conexiunea. Verificați internetul și încercați din nou.";
  }

  return message
    ? `Confirmarea nu a putut fi trimisă: ${message}`
    : "Confirmarea nu a putut fi trimisă. Vă rugăm să încercați din nou.";
}

export default function RSVP() {
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [loadingGuest, setLoadingGuest] = useState(true);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGuest() {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get("inv");

      if (!slug) {
        setLoadingGuest(false);
        return;
      }

      const { data, error: guestError } = await supabase.rpc(
        "get_guest_by_slug",
        {
          guest_slug: slug,
        },
      );

      if (guestError) {
        console.error(
          "Eroare la încărcarea invitatului:",
          guestError,
        );
      } else if (data && data.length > 0) {
        setGuest(data[0] as GuestData);
      }

      setLoadingGuest(false);
    }

    loadGuest();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const name =
      guest?.display_name ||
      String(form.get("name") ?? "").trim();

    const adults = Number(form.get("adults") ?? 1);
    const children = Number(form.get("children") ?? 0);

    if (!name) {
      setError("Vă rugăm să completați numele.");
      setLoading(false);
      return;
    }

    if (
      !Number.isFinite(adults) ||
      !Number.isFinite(children) ||
      adults < 0 ||
      children < 0
    ) {
      setError(
        "Numărul de adulți și copii trebuie completat corect.",
      );
      setLoading(false);
      return;
    }

    const payload = {
      guest_id: guest?.id ?? null,
      guest_slug: guest?.slug ?? null,
      name,
      phone:
        String(form.get("phone") ?? "").trim() || null,
      attendance: String(
        form.get("attendance") ?? "yes",
      ),
      adults,
      children,
      allergies:
        String(form.get("allergies") ?? "").trim() || null,
    };

    try {
      const { error: insertError } = await supabase
        .from("rsvp")
        .insert([payload]);

      if (insertError) {
        console.error("Eroare Supabase RSVP:", insertError);
        setError(getReadableError(insertError));
        return;
      }

      setSent(true);
      formElement.reset();
    } catch (unexpectedError) {
      console.error(
        "Eroare neașteptată RSVP:",
        unexpectedError,
      );

      setError(
        "A apărut o problemă neașteptată. Vă rugăm să încercați din nou.",
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mx-auto block w-full appearance-none border-0 border-b border-[#8d6f3e]/75 bg-transparent px-2 py-3 text-center text-[16px] font-medium text-black outline-none transition placeholder:text-center placeholder:text-black/70 focus:border-black focus:ring-0";

  const labelClass =
    "mb-2 block text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#6f542c]";

  const personalizedGreeting =
    guest?.greeting?.trim() ||
    (guest ? `Dragă ${guest.display_name},` : null);

  return (
    <section
      id="rsvp"
      className="relative px-5 py-14 sm:px-6 sm:py-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mx-auto max-w-2xl"
      >
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#9b7c45] sm:text-sm">
            RSVP
          </p>

          <h2 className="mt-4 font-serif text-3xl leading-tight text-[#263746] sm:mt-6 sm:text-5xl">
            Confirmați prezența
          </h2>

          <div className="mx-auto mt-5 h-px w-20 bg-[#b99a63] sm:mt-7 sm:w-24" />

          {!loadingGuest && personalizedGreeting && (
            <p className="mt-5 font-serif text-xl italic text-[#8d6f3e] sm:mt-7 sm:text-2xl">
              {personalizedGreeting}
            </p>
          )}

          <p className="mt-4 text-sm leading-6 text-[#39434a] sm:mt-6 sm:text-base sm:leading-8">
            Vă rugăm să răspundeți până la
            <span className="font-semibold text-black">
              {" "}
              15 septembrie 2026.
            </span>
          </p>
        </div>

        {sent ? (
          <div className="relative mt-10 overflow-hidden px-3 py-10 text-center sm:mt-14">
            {celebrationParticles.map(
              ({ left, delay, symbol }, index) => (
                <motion.span
                  key={`${left}-${index}`}
                  aria-hidden="true"
                  initial={{
                    y: 70,
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={{
                    y: -145,
                    opacity: [0, 1, 1, 0],
                    rotate: 180,
                  }}
                  transition={{
                    duration: 2.1,
                    delay,
                    ease: "easeOut",
                  }}
                  className="pointer-events-none absolute bottom-0 text-lg text-[#c9a86a]"
                  style={{ left }}
                >
                  {symbol}
                </motion.span>
              ),
            )}

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mx-auto flex h-14 w-14 items-center justify-center text-[#a88d5d]"
            >
              <Heart size={31} fill="currentColor" />
            </motion.div>

            <h3 className="mt-5 font-serif text-3xl text-[#263746] sm:text-4xl">
              Vă mulțumim!
            </h3>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#39434a] sm:text-base">
              {guest
                ? `Confirmarea pentru ${guest.display_name} a fost înregistrată.`
                : "Confirmarea dumneavoastră a fost înregistrată."}
            </p>

            <p className="mt-2 font-serif text-lg italic text-[#6f542c]">
              Abia așteptăm să vă avem alături!
            </p>

            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
              }
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
              }}
              className="mt-7 appearance-none rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-7 py-3 font-semibold text-[#263746] transition active:scale-[0.98] sm:hover:bg-[#dcc18d]"
            >
              Înapoi la invitație
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-10 max-w-xl space-y-6 sm:mt-14 sm:space-y-8"
          >
            {guest ? (
              <div>
                <label className={labelClass}>
                  Invitația pentru
                </label>

                <div className="border-b border-[#8d6f3e]/75 px-2 py-3 text-center font-semibold text-black">
                  {guest.display_name}
                </div>
              </div>
            ) : (
              <div>
                <label
                  htmlFor="name"
                  className={labelClass}
                >
                  Nume și prenume
                </label>

                <input
                  required
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Introduceți numele"
                  className={inputClass}
                  style={{
                    color: "#000000",
                    WebkitTextFillColor: "#000000",
                  }}
                />
              </div>
            )}

            <div>
              <label
                htmlFor="phone"
                className={labelClass}
              >
                Telefon
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Numărul de telefon"
                className={inputClass}
                style={{
                  color: "#000000",
                  WebkitTextFillColor: "#000000",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="attendance"
                className={labelClass}
              >
                Participare
              </label>

              <div className="relative">
                <select
                  id="attendance"
                  name="attendance"
                  defaultValue="yes"
                  className={`${inputClass} cursor-pointer pr-10`}
                  style={{
                    colorScheme: "light",
                    color: "#000000",
                    WebkitTextFillColor: "#000000",
                  }}
                >
                  <option
                    value="yes"
                    style={{ color: "#000000" }}
                  >
                    Participăm cu drag
                  </option>

                  <option
                    value="no"
                    style={{ color: "#000000" }}
                  >
                    Nu putem participa
                  </option>
                </select>

                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-[#6f542c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:gap-8">
              <div>
                <label
                  htmlFor="adults"
                  className={labelClass}
                >
                  Adulți
                </label>

                <input
                  required
                  id="adults"
                  min="0"
                  defaultValue="1"
                  type="number"
                  name="adults"
                  inputMode="numeric"
                  className={inputClass}
                  style={{
                    color: "#000000",
                    WebkitTextFillColor: "#000000",
                  }}
                />
              </div>

              <div>
                <label
                  htmlFor="children"
                  className={labelClass}
                >
                  Copii
                </label>

                <input
                  required
                  id="children"
                  min="0"
                  defaultValue="0"
                  type="number"
                  name="children"
                  inputMode="numeric"
                  className={inputClass}
                  style={{
                    color: "#000000",
                    WebkitTextFillColor: "#000000",
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="allergies"
                className={labelClass}
              >
                Observații
              </label>

              <textarea
                id="allergies"
                name="allergies"
                rows={3}
                placeholder="Alergii alimentare sau alte observații"
                className={`${inputClass} resize-none`}
                style={{
                  color: "#000000",
                  WebkitTextFillColor: "#000000",
                }}
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 border-l-2 border-red-500 px-3 py-2 text-sm font-medium text-red-800">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <p className="leading-6">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
              }}
              className="mx-auto block w-full appearance-none rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-7 py-3.5 font-semibold text-[#263746] shadow-[0_12px_30px_rgba(201,168,106,0.20)] transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:max-w-sm sm:px-8 sm:py-4 sm:hover:bg-[#dcc18d]"
            >
              {loading
                ? "Se trimite..."
                : "Trimite confirmarea"}
            </button>

            <p className="mx-auto mt-10 max-w-sm text-center text-[13px] leading-6 text-[#263746] drop-shadow-[0_2px_8px_rgba(255,255,255,0.95)] sm:mt-12 sm:max-w-md sm:text-sm">
              Dacă intervin modificări, vă rugăm să ne contactați telefonic.
            </p>
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}