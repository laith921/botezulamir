"use client";

import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RSVP() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);

    const payload = {
      name: String(form.get("name") ?? ""),
      phone: String(form.get("phone") ?? ""),
      attendance: String(form.get("attendance") ?? "yes"),
      adults: Number(form.get("adults") ?? 1),
      children: Number(form.get("children") ?? 0),
      allergies: String(form.get("allergies") ?? ""),
    };

    const { error: insertError } = await supabase
      .from("rsvp")
      .insert(payload);

    setLoading(false);

    if (insertError) {
      setError("A apărut o eroare. Te rugăm să încerci din nou.");
      return;
    }

    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <section id="rsvp" className="bg-[#fbf8f2] px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-[38px] bg-white p-7 shadow-[0_25px_80px_rgba(30,64,100,0.12)] sm:p-12">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-600">
              RSVP
            </p>

            <h2 className="mt-6 font-serif text-4xl text-slate-800 sm:text-5xl">
              Confirmați prezența
            </h2>

            <p className="mt-5 text-slate-600">
              Vă rugăm să răspundeți până la 15 septembrie 2026.
            </p>
          </div>

          {sent ? (
            <div className="mt-12 rounded-[28px] bg-sky-50 p-8 text-center">
              <div className="text-5xl">🤍</div>

              <h3 className="mt-5 text-2xl font-semibold text-slate-800">
                Vă mulțumim!
              </h3>

              <p className="mt-3 text-slate-600">
                Răspunsul dumneavoastră a fost înregistrat.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <input
                required
                name="name"
                placeholder="Nume și prenume"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-sky-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Telefon"
                className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-sky-500"
              />

              <select
                name="attendance"
                defaultValue="yes"
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-4 outline-none transition focus:border-sky-500"
              >
                <option value="yes">Participăm cu drag</option>
                <option value="no">Nu putem participa</option>
              </select>

              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  min="0"
                  defaultValue="1"
                  type="number"
                  name="adults"
                  placeholder="Număr adulți"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-sky-500"
                />

                <input
                  min="0"
                  defaultValue="0"
                  type="number"
                  name="children"
                  placeholder="Număr copii"
                  className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-sky-500"
                />
              </div>

              <textarea
                name="allergies"
                rows={4}
                placeholder="Alergii alimentare sau alte observații"
                className="w-full resize-none rounded-2xl border border-slate-200 px-5 py-4 outline-none transition focus:border-sky-500"
              />

              {error && (
                <p className="text-center text-sm text-red-600">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-sky-600 px-8 py-4 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Se trimite..." : "Trimite confirmarea"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}