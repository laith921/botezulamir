"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import {
  Check,
  Copy,
  Link2,
  LogOut,
  Plus,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

type RSVPRow = {
  id: string;
  guest_id: string | null;
  guest_slug: string | null;
  name: string;
  phone: string | null;
  attendance: "yes" | "no";
  adults: number;
  children: number;
  allergies: string | null;
  created_at: string;
};

type GuestRow = {
  id: string;
  display_name: string;
  slug: string;
  greeting: string | null;
  is_active: boolean;
  created_at: string;
};

function createSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [guests, setGuests] = useState<GuestRow[]>([]);

  const [checkingSession, setCheckingSession] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedGuestId, setCopiedGuestId] = useState<string | null>(null);

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

  async function loadData() {
    setLoadingData(true);
    setError("");

    const [rsvpResult, guestsResult] = await Promise.all([
      supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("guests")
        .select("id, display_name, slug, greeting, is_active, created_at")
        .order("created_at", { ascending: false }),
    ]);

    if (rsvpResult.error || guestsResult.error) {
      setError("Datele nu au putut fi încărcate.");
    } else {
      setRows((rsvpResult.data ?? []) as RSVPRow[]);
      setGuests((guestsResult.data ?? []) as GuestRow[]);
    }

    setLoadingData(false);
  }

  useEffect(() => {
    if (!session) {
      setRows([]);
      setGuests([]);
      return;
    }

    loadData();
  }, [session]);

  const statistics = useMemo(() => {
    const confirmed = rows.filter((row) => row.attendance === "yes");
    const declined = rows.filter((row) => row.attendance === "no");

    return {
      invitations: guests.length,
      confirmed: confirmed.length,
      declined: declined.length,
      adults: confirmed.reduce((sum, row) => sum + row.adults, 0),
      children: confirmed.reduce((sum, row) => sum + row.children, 0),
    };
  }, [rows, guests]);

  function findGuestRSVP(guest: GuestRow) {
    return rows.find(
      (row) =>
        row.guest_id === guest.id || row.guest_slug === guest.slug,
    );
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoginLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const { error: loginError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (loginError) {
      setError("Email sau parolă incorectă.");
    }

    setLoginLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  async function handleAddGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setGuestLoading(true);
    setError("");
    setSuccess("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const displayName = String(
      form.get("display_name") ?? "",
    ).trim();

    const customSlug = String(form.get("slug") ?? "").trim();
    const slug = createSlug(customSlug || displayName);

    const payload = {
      display_name: displayName,
      slug,
      greeting:
        String(form.get("greeting") ?? "").trim() || null,
      is_active: true,
    };

    const { error: insertError } = await supabase
      .from("guests")
      .insert(payload);

    if (insertError) {
      if (insertError.code === "23505") {
        setError("Există deja o invitație cu acest link.");
      } else {
        setError("Invitatul nu a putut fi adăugat.");
      }

      setGuestLoading(false);
      return;
    }

    formElement.reset();
    setSuccess("Invitatul a fost adăugat.");
    setGuestLoading(false);

    await loadData();
  }

  async function handleDeleteGuest(guest: GuestRow) {
    const confirmed = window.confirm(
      `Ștergi invitația pentru „${guest.display_name}”?`,
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("guests")
      .delete()
      .eq("id", guest.id);

    if (deleteError) {
      setError("Invitația nu a putut fi ștearsă.");
      return;
    }

    setSuccess("Invitația a fost ștearsă.");
    await loadData();
  }

  async function copyGuestLink(guest: GuestRow) {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://botezulamir.ro";

    const link = `${origin}/?inv=${guest.slug}`;

    await navigator.clipboard.writeText(link);

    setCopiedGuestId(guest.id);

    window.setTimeout(() => {
      setCopiedGuestId(null);
    }, 1800);
  }

  if (checkingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f4ee]">
        <p className="text-slate-500">
          Se verifică autentificarea...
        </p>
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
              <p className="text-center text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-full bg-[#263746] px-8 py-4 font-semibold text-white transition hover:bg-[#1d2a35] disabled:opacity-60"
            >
              {loginLoading
                ? "Se autentifică..."
                : "Intră în panou"}
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
              Invitații și RSVP
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadData}
              disabled={loadingData}
              className="inline-flex items-center gap-2 rounded-full border border-[#d8c7a4] bg-white px-5 py-3 font-semibold text-slate-700 disabled:opacity-60"
            >
              <RefreshCw
                size={18}
                className={loadingData ? "animate-spin" : ""}
              />
              Reîncarcă
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-[#d8c7a4] bg-white px-5 py-3 font-semibold text-slate-700"
            >
              <LogOut size={18} />
              Deconectare
            </button>
          </div>
        </header>

        <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Invitații", statistics.invitations],
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

        {success && (
          <p className="mt-8 rounded-2xl bg-emerald-50 p-4 text-emerald-700">
            {success}
          </p>
        )}

        <section className="mt-10 rounded-[30px] bg-white p-7 shadow-sm sm:p-9">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f4ee] text-[#a88d5d]">
              <Plus size={22} />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#263746]">
                Adaugă o invitație
              </h2>

              <p className="mt-1 text-slate-500">
                Linkul personalizat este generat automat.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleAddGuest}
            className="mt-8 grid gap-5 lg:grid-cols-2"
          >
            <input
              required
              name="display_name"
              placeholder="Numele afișat, de exemplu Familia Popescu"
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#a88d5d]"
            />

            <input
              name="slug"
              placeholder="Link opțional, de exemplu familia-popescu"
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#a88d5d]"
            />

            <input
              name="greeting"
              placeholder="Adresare opțională, de exemplu Dragă familie Popescu"
              className="rounded-2xl border border-slate-200 px-5 py-4 outline-none focus:border-[#a88d5d] lg:col-span-2"
            />

            <button
              type="submit"
              disabled={guestLoading}
              className="rounded-full bg-[#263746] px-8 py-4 font-semibold text-white transition hover:bg-[#1d2a35] disabled:opacity-60 lg:col-span-2"
            >
              {guestLoading
                ? "Se adaugă..."
                : "Adaugă invitația"}
            </button>
          </form>
        </section>

        <section className="mt-10 overflow-hidden rounded-[30px] bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-7">
            <Users size={22} className="text-[#a88d5d]" />

            <div>
              <h2 className="text-3xl font-semibold text-[#263746]">
                Lista invitaților
              </h2>

              <p className="mt-1 text-slate-500">
                Copiază linkul și trimite-l fiecărui invitat.
              </p>
            </div>
          </div>

          {loadingData ? (
            <p className="p-8 text-slate-500">Se încarcă...</p>
          ) : guests.length === 0 ? (
            <p className="p-8 text-slate-500">
              Nu există încă invitații personalizate.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="bg-[#f1ede5]">
                  <tr>
                    <th className="p-4 text-left">Invitat</th>
                    <th className="p-4 text-left">Link</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Acțiuni</th>
                  </tr>
                </thead>

                <tbody>
                  {guests.map((guest) => {
                    const response = findGuestRSVP(guest);

                    return (
                      <tr
                        key={guest.id}
                        className="border-t border-slate-100"
                      >
                        <td className="p-4">
                          <p className="font-semibold text-[#263746]">
                            {guest.display_name}
                          </p>

                          {guest.greeting && (
                            <p className="mt-1 text-sm text-slate-500">
                              {guest.greeting}
                            </p>
                          )}
                        </td>

                        <td className="p-4">
                          <code className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                            ?inv={guest.slug}
                          </code>
                        </td>

                        <td className="p-4 text-center">
                          {!response ? (
                            <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
                              În așteptare
                            </span>
                          ) : response.attendance === "yes" ? (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                              Confirmat
                            </span>
                          ) : (
                            <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
                              Nu participă
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => copyGuestLink(guest)}
                              className="inline-flex items-center gap-2 rounded-full border border-[#d8c7a4] bg-white px-4 py-2 text-sm font-semibold text-[#263746]"
                            >
                              {copiedGuestId === guest.id ? (
                                <>
                                  <Check size={16} />
                                  Copiat
                                </>
                              ) : (
                                <>
                                  <Copy size={16} />
                                  Copiază link
                                </>
                              )}
                            </button>

                            <a
                              href={`/?inv=${guest.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-slate-600"
                              title="Deschide invitația"
                            >
                              <Link2 size={17} />
                            </a>

                            <button
                              type="button"
                              onClick={() => handleDeleteGuest(guest)}
                              className="inline-flex items-center justify-center rounded-full border border-red-100 p-2.5 text-red-600"
                              title="Șterge invitația"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="mt-10 overflow-hidden rounded-[30px] bg-white shadow-sm">
          <div className="border-b border-slate-100 p-7">
            <h2 className="text-3xl font-semibold text-[#263746]">
              Confirmări RSVP
            </h2>
          </div>

          {loadingData ? (
            <p className="p-8 text-slate-500">Se încarcă...</p>
          ) : rows.length === 0 ? (
            <p className="p-8 text-slate-500">
              Nu există confirmări înregistrate.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
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
                    <tr
                      key={row.id}
                      className="border-t border-slate-100"
                    >
                      <td className="p-4 font-medium">
                        {row.name}
                      </td>

                      <td className="p-4">
                        {row.phone || "—"}
                      </td>

                      <td className="p-4 text-center">
                        {row.attendance === "yes" ? "Da" : "Nu"}
                      </td>

                      <td className="p-4 text-center">
                        {row.adults}
                      </td>

                      <td className="p-4 text-center">
                        {row.children}
                      </td>

                      <td className="p-4">
                        {row.allergies || "—"}
                      </td>

                      <td className="p-4">
                        {new Date(row.created_at).toLocaleString(
                          "ro-RO",
                        )}
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