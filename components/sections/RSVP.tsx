"use client";

import { FormEvent, useEffect, useState } from "react";
import { AlertCircle, Check, ChevronDown } from "lucide-react";
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

function getReadableError(error: SupabaseError) {
  const message = error.message ?? "";
  const details = error.details ?? "";
  const combined = `${message} ${details}`.toLowerCase();

  if (
    error.code === "42501" ||
    combined.includes("row-level security") ||
    combined.includes("violates row-level security")
  ) {
    return "Baza de date nu permite momentan trimiterea confirmării. Trebuie activată permisiunea de salvare RSVP în Supabase.";
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
    combined.includes("column") &&
    combined.includes("does not exist")
  ) {
    return "În tabelul RSVP lipsește una dintre coloanele necesare.";
  }

  if (
    combined.includes("not-null constraint") ||
    combined.includes("null value")
  ) {
    return "O informație obligatorie nu a fost completată corect.";
  }

  if (
    combined.includes("failed to fetch") ||
    combined.includes("network")
  ) {
    return "Nu s-a putut realiza conexiunea cu baza de date. Verificați conexiunea la internet și încercați din nou.";
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
      setLoadingGuest(true);

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
        console.error("Eroare la încărcarea invitatului:", guestError);
        setLoadingGuest(false);
        return;
      }

      if (data && data.length > 0) {
        setGuest(data[0] as GuestData);
      }

      setLoadingGuest(false);
    }

    loadGuest();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      setError("Numărul de adulți și copii trebuie să fie corect.");
      setLoading(false);
      return;
    }

    const payload = {
      guest_id: guest?.id ?? null,
      guest_slug: guest?.slug ?? null,
      name,
      phone: String(form.get("phone") ?? "").trim() || null,
      attendance: String(form.get("attendance") ?? "yes"),
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
        console.error("Eroare Supabase RSVP:", {
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
          code: insertError.code,
          payload,
        });

        setError(getReadableError(insertError));
        setLoading(false);
        return;
      }

      setSent(true);
      formElement.reset();
    } catch (unexpectedError) {
      console.error(
        "Eroare neașteptată la trimiterea RSVP:",
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
    "w-full appearance-none rounded-2xl border border-[#e7ddcc] bg-[#fffdf9] px-5 py-4 text-[#263746] shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#b99a63] focus:ring-2 focus:ring-[#b99a63]/15";

  return (
    <section
      id="rsvp"
      className="relative px-5 py-20 sm:px-6 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[34px] border border-white/75 bg-[#fffdf9]/85 p-6 shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:rounded-[42px] sm:p-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.42em] text-[#a88d5d] sm:text-sm">
              RSVP
            </p>

            <h2 className="mt-6 font-serif text-3xl leading-tight text-[#263746] sm:text-5xl">
              Vă rugăm să confirmați prezența
            </h2>

            <div className="mx-auto mt-7 h-px w-24 bg-[#b99a63]" />

            {!loadingGuest && guest && (
              <p className="mt-7 font-serif text-xl italic text-[#8d7852] sm:text-2xl">
                {guest.greeting?.trim() ||
                  `Dragă ${guest.display_name},`}
              </p>
            )}

            <p className="mt-6 text-sm leading-7 text-slate-700 sm:text-base sm:leading-8">
              Ne-ar face o mare bucurie să ne fiți alături.
              <br />
              Vă rugăm să confirmați până la{" "}
              <span className="font-semibold text-[#263746]">
                15 septembrie 2026.
              </span>
            </p>
          </div>

          {sent ? (
            <div className="mt-10 rounded-[28px] border border-[#e7ddcc] bg-[#faf6ee] p-8 text-center shadow-sm sm:mt-12 sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d8c5a0] bg-white text-[#a88d5d]">
                <Check size={28} />
              </div>

              <h3 className="mt-6 text-3xl font-semibold text-[#263746]">
                Vă mulțumim!
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Confirmarea dumneavoastră a fost înregistrată.
              </p>

              <a
                href="#hero"
                className="mt-8 inline-flex rounded-full border border-[#b99a63] bg-[#f2e6cc] px-7 py-3 font-semibold text-[#263746] transition hover:bg-[#e8d5ae]"
              >
                Înapoi la invitație
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5 sm:mt-12 sm:space-y-6"
            >
              {guest ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Invitația pentru
                  </label>

                  <div className="rounded-2xl border border-[#e7ddcc] bg-[#faf6ee] px-5 py-4 font-semibold text-[#263746] shadow-sm">
                    {guest.display_name}
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Nume și prenume
                  </label>

                  <input
                    required
                    id="name"
                    name="name"
                    placeholder="Introduceți numele"
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Telefon
                </label>

                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="Introduceți numărul de telefon"
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="attendance"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Participare
                </label>

                <div className="relative">
                  <select
                    id="attendance"
                    name="attendance"
                    defaultValue="yes"
                    className={`${inputClass} cursor-pointer pr-12`}
                    style={{ colorScheme: "light" }}
                  >
                    <option value="yes">
                      Participăm cu drag
                    </option>

                    <option value="no">
                      Nu putem participa
                    </option>
                  </select>

                  <ChevronDown
                    size={19}
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-[#a88d5d]"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
                <div>
                  <label
                    htmlFor="adults"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Număr adulți
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
                  />
                </div>

                <div>
                  <label
                    htmlFor="children"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Număr copii
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
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="allergies"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Observații
                </label>

                <textarea
                  id="allergies"
                  name="allergies"
                  rows={4}
                  placeholder="Alergii alimentare sau alte observații"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-700">
                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <p className="leading-6">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full appearance-none rounded-full border border-[#b99a63] bg-[#e8d5ae] px-8 py-4 font-semibold text-[#263746] shadow-[0_16px_40px_rgba(154,126,77,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcc18d] disabled:cursor-not-allowed disabled:opacity-60"
                style={{ colorScheme: "light" }}
              >
                {loading
                  ? "Se trimite..."
                  : "Confirmă prezența"}
              </button>

              <p className="text-center text-xs leading-6 text-slate-500 sm:text-sm">
                Dacă intervin modificări după confirmare, vă rugăm
                să ne contactați telefonic.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}