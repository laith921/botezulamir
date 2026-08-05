"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";

type RSVPRow = {
  id: string;
  name: string;
  phone: string | null;
  attendance: "yes" | "no";
  adults: number;
  children: number;
  allergies: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loadingRows, setLoadingRows] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session) {
      setRows([]);
      return;
    }

    async function loadRSVP() {
      setLoadingRows(true);
      setError("");

      const { data, error: loadError } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (loadError) {
        setError("Confirmările nu au putut fi încărcate.");
      } else {
        setRows((data ?? []) as RSVPRow[]);
      }

      setLoadingRows(false);
    }

    loadRSVP();
  }, [session]);

  const statistics = useMemo(() => {
    const confirmed = rows.filter((row) => row.attendance === "yes");
    const declined = rows.filter((row) => row.attendance === "no");

    return {
      confirmed: confirmed.length,
      declined: declined.length,
      adults: confirmed.reduce((sum, row) => sum + row.adults, 0),
      children: confirmed.reduce((sum, row) => sum + row.children, 0),
    };
  }, [rows]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (loginError) {
      setError("Email sau parolă incorectă.");
    }

    setLoginLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4ee]">
        <p className="text-slate-500">Se verifică autentificarea...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4ee] px-6">
        <div className="w-full max-w-md rounded-[32px] border border-white bg-white/90 p-8 shadow-[0_25px_80px_rgba(38,55,70,0.12)] sm:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.4em] text-[#a88d5d]">
            Administrare
          </p>

          <h1 className="mt-5 text-center text-5xl font-semibold text-[#263746]">
            Autentificare
          </h1>

          <form onSubmit={handleLogin} className="mt-10 space-y-5">
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#a88d5d]"
            />

            <input
              required
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Parolă"
              className="w-full rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#a88d5d]"
            />

            {error && (
              <p className="text-center text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-full bg-[#263746] px-8 py-4 font-semibold text-white transition hover:bg-[#1d2a35] disabled:opacity-60"
            >
              {loginLoading ? "Se autentifică..." : "Intră în panou"}
            </button>
          </form>

          <a
            href="/"
            className="mt-7 block text-center text-sm text-slate-500 hover:text-[#a88d5d]"
          >
            Înapoi la invitație
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#a88d5d]">
              Administrare
            </p>

            <h1 className="mt-4 text-5xl font-semibold text-[#263746]">
              Confirmări RSVP
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d8c7a4] bg-white px-6 py-3 font-semibold text-slate-700"
          >
            <LogOut size={18} />
            Deconectare
          </button>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Confirmări", statistics.confirmed],
            ["Refuzuri", statistics.declined],
            ["Adulți", statistics.adults],
            ["Copii", statistics.children],
          ].map(([label, value]) => (
            <article
              key={String(label)}
              className="rounded-[28px] bg-white p-7 shadow-sm"
            >
              <p className="text-slate-500">{label}</p>
              <p className="mt-3 text-4xl font-semibold text-[#263746]">
                {value}
              </p>
            </article>
          ))}
        </section>

        {error && (
          <p className="mt-8 rounded-2xl bg-red-50 p-4 text-red-700">
            {error}
          </p>
        )}

        <section className="mt-10 overflow-hidden rounded-[28px] bg-white shadow-sm">
          {loadingRows ? (
            <p className="p-8 text-slate-500">Se încarcă...</p>
          ) : rows.length === 0 ? (
            <p className="p-8 text-slate-500">
              Nu există confirmări înregistrate.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead className="bg-[#f1ede5]">
                  <tr>
                    <th className="p-4 text-left">Nume</th>
                    <th className="p-4 text-left">Telefon</th>
                    <th className="p-4 text-center">Participă</th>
                    <th className="p-4 text-center">Adulți</th>
                    <th className="p-4 text-center">Copii</th>
                    <th className="p-4 text-left">Observații</th>
                    <th className="p-4 text-left">Data</th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-slate-100">
                      <td className="p-4 font-medium">{row.name}</td>
                      <td className="p-4">{row.phone || "—"}</td>
                      <td className="p-4 text-center">
                        {row.attendance === "yes" ? "Da" : "Nu"}
                      </td>
                      <td className="p-4 text-center">{row.adults}</td>
                      <td className="p-4 text-center">{row.children}</td>
                      <td className="p-4">{row.allergies || "—"}</td>
                      <td className="p-4">
                        {new Date(row.created_at).toLocaleString("ro-RO")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}