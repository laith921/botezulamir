"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { supabase } from "@/lib/supabase";

type GuestData = {
  id: string;
  display_name: string;
  slug: string;
  greeting: string | null;
};

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

      if (!guestError && data && data.length > 0) {
        setGuest(data[0] as GuestData);
      }

      setLoadingGuest(false);
    }

    loadGuest();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const payload = {
      guest_id: guest?.id ?? null,
      guest_slug: guest?.slug ?? null,
      name: guest?.display_name || String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      attendance: String(form.get("attendance") ?? "yes"),
      adults: Number(form.get("adults") ?? 1),
      children: Number(form.get("children") ?? 0),
      allergies: String(form.get("allergies") ?? "").trim(),
    };

    const { error: insertError } = await supabase
      .from("rsvp")
      .insert(payload);

    setLoading(false);

    if (insertError) {
      setError("A apărut o eroare. Vă rugăm să încercați din nou.");
      return;
    }

    setSent(true);
    formElement.reset();
  }

  const inputClass =
    "w-full rounded-2xl border border-white/80 bg-white/80 px-5 py-4 text-[#263746] shadow-sm outline-none backdrop-blur transition placeholder:text-slate-400 focus:border-[#a88d5d] focus:ring-2 focus:ring-[#a88d5d]/10";

  return (
    <section
      id="rsvp"
      className="relative px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[42px] border border-white/70 bg-white/78 p-8 shadow-[0_28px_90px_rgba(38,55,70,0.10)] backdrop-blur-md sm:p-12">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[#a88d5d] sm:text-sm">
              RSVP
            </p>

            <h2 className="mt-6 font-serif text-4xl text-[#263746] sm:text-5xl">
              Vă rugăm să confirmați prezența
            </h2>

            <div className="mx-auto mt-7 h-px w-24 bg-[#b99a63]" />

            {!loadingGuest && guest && (
              <p className="mt-7 font-serif text-2xl italic text-[#8d7852]">
                {guest.greeting?.trim() ||
                  `Dragă ${guest.display_name},`}
              </p>
            )}

            <p className="mt-6 leading-8 text-slate-700">
              Ne-ar face o mare bucurie să ne fiți alături.
              <br />
              Vă rugăm să confirmați până la{" "}
              <span className="font-semibold text-[#263746]">
                15 septembrie 2026.
              </span>
            </p>
          </div>

          {sent ? (
            <div className="mt-12 rounded-[30px] border border-white/80 bg-white/75 p-10 text-center shadow-sm backdrop-blur">
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
                className="mt-8 inline-flex rounded-full border border-[#263746] bg-white px-7 py-3 font-semibold text-[#263746] transition hover:bg-[#263746] hover:text-white"
              >
                Înapoi la invitație
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {guest ? (
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Invitația pentru
                  </label>

                  <div className="rounded-2xl border border-[#e5dccb] bg-white/75 px-5 py-4 font-semibold text-[#263746] shadow-sm">
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

                <select
                  id="attendance"
                  name="attendance"
                  defaultValue="yes"
                  className={inputClass}
                >
                  <option value="yes">Participăm cu drag</option>
                  <option value="no">Nu putem participa</option>
                </select>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
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
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-center text-sm text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#263746] px-8 py-4 font-semibold text-white shadow-[0_16px_40px_rgba(38,55,70,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d2a35] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Se trimite..." : "Confirmă prezența"}
              </button>

              <p className="text-center text-sm leading-6 text-slate-500">
                Dacă intervin modificări după confirmare, vă rugăm să ne
                contactați telefonic.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}