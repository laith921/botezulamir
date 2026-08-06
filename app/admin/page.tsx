"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session } from "@supabase/supabase-js";
import {
  ArrowUpDown,
  Check,
  Copy,
  Download,
  Link2,
  LogOut,
  MessageCircle,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Search,
  Trash2,
  Users,
  X,
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

type GuestDraft = {
  display_name: string;
  slug: string;
  greeting: string;
  is_active: boolean;
};

type RSVPDraft = {
  name: string;
  phone: string;
  attendance: "yes" | "no";
  adults: number;
  children: number;
  allergies: string;
};

type GuestFilter = "all" | "yes" | "no" | "waiting";
type GuestSort = "newest" | "name" | "status";
type RSVPSort = "newest" | "name" | "attendance";

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
  const [actionLoadingId, setActionLoadingId] =
    useState<string | null>(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedGuestId, setCopiedGuestId] =
    useState<string | null>(null);

  const [editingGuestId, setEditingGuestId] =
    useState<string | null>(null);
  const [guestDraft, setGuestDraft] =
    useState<GuestDraft | null>(null);

  const [editingRSVPId, setEditingRSVPId] =
    useState<string | null>(null);
  const [rsvpDraft, setRsvpDraft] =
    useState<RSVPDraft | null>(null);

  const [guestSearch, setGuestSearch] = useState("");
  const [guestFilter, setGuestFilter] =
    useState<GuestFilter>("all");
  const [guestSort, setGuestSort] =
    useState<GuestSort>("newest");
  const [rsvpSearch, setRsvpSearch] = useState("");
  const [rsvpSort, setRsvpSort] =
    useState<RSVPSort>("newest");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        setSession(nextSession);
      },
    );

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
        .select(
          "id, display_name, slug, greeting, is_active, created_at",
        )
        .order("created_at", { ascending: false }),
    ]);

    if (rsvpResult.error || guestsResult.error) {
      console.error(
        "Eroare încărcare date:",
        rsvpResult.error,
        guestsResult.error,
      );
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
    const confirmed = rows.filter(
      (row) => row.attendance === "yes",
    );
    const declined = rows.filter(
      (row) => row.attendance === "no",
    );
    const waiting = guests.filter(
      (guest) =>
        !rows.some(
          (row) =>
            row.guest_id === guest.id ||
            row.guest_slug === guest.slug,
        ),
    ).length;

    return {
      invitations: guests.length,
      confirmed: confirmed.length,
      declined: declined.length,
      waiting,
      adults: confirmed.reduce(
        (sum, row) => sum + row.adults,
        0,
      ),
      children: confirmed.reduce(
        (sum, row) => sum + row.children,
        0,
      ),
    };
  }, [rows, guests]);

  function findGuestRSVP(guest: GuestRow) {
    return rows.find(
      (row) =>
        row.guest_id === guest.id ||
        row.guest_slug === guest.slug,
    );
  }

  const filteredGuests = useMemo(() => {
    const query = guestSearch.trim().toLowerCase();

    const filtered = guests.filter((guest) => {
      const response = rows.find(
        (row) =>
          row.guest_id === guest.id ||
          row.guest_slug === guest.slug,
      );

      const matchesSearch =
        !query ||
        guest.display_name.toLowerCase().includes(query) ||
        guest.slug.toLowerCase().includes(query) ||
        (guest.greeting ?? "").toLowerCase().includes(query);

      const matchesFilter =
        guestFilter === "all" ||
        (guestFilter === "waiting" && !response) ||
        (guestFilter === "yes" && response?.attendance === "yes") ||
        (guestFilter === "no" && response?.attendance === "no");

      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      if (guestSort === "name") {
        return a.display_name.localeCompare(
          b.display_name,
          "ro",
        );
      }

      if (guestSort === "status") {
        const statusRank = (guest: GuestRow) => {
          const response = rows.find(
            (row) =>
              row.guest_id === guest.id ||
              row.guest_slug === guest.slug,
          );

          if (!response) return 0;
          if (response.attendance === "yes") return 1;
          return 2;
        };

        return statusRank(a) - statusRank(b);
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  }, [guestFilter, guestSearch, guestSort, guests, rows]);

  const filteredRows = useMemo(() => {
    const query = rsvpSearch.trim().toLowerCase();

    const filtered = rows.filter((row) =>
      !query ||
      row.name.toLowerCase().includes(query) ||
      (row.phone ?? "").toLowerCase().includes(query) ||
      (row.allergies ?? "").toLowerCase().includes(query),
    );

    return [...filtered].sort((a, b) => {
      if (rsvpSort === "name") {
        return a.name.localeCompare(b.name, "ro");
      }

      if (rsvpSort === "attendance") {
        return a.attendance.localeCompare(b.attendance);
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  }, [rows, rsvpSearch, rsvpSort]);

  async function handleLogin(
    event: FormEvent<HTMLFormElement>,
  ) {
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

  async function handleAddGuest(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setGuestLoading(true);
    setError("");
    setSuccess("");

    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    const displayName = String(
      form.get("display_name") ?? "",
    ).trim();

    const customSlug = String(
      form.get("slug") ?? "",
    ).trim();

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
        console.error(
          "Eroare adăugare invitat:",
          insertError,
        );
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

  function startEditGuest(guest: GuestRow) {
    setEditingGuestId(guest.id);
    setGuestDraft({
      display_name: guest.display_name,
      slug: guest.slug,
      greeting: guest.greeting ?? "",
      is_active: guest.is_active,
    });
    setError("");
    setSuccess("");
  }

  function cancelEditGuest() {
    setEditingGuestId(null);
    setGuestDraft(null);
  }

  async function handleUpdateGuest(guest: GuestRow) {
    if (!guestDraft) return;

    const displayName = guestDraft.display_name.trim();
    const slug = createSlug(
      guestDraft.slug || guestDraft.display_name,
    );

    if (!displayName || !slug) {
      setError(
        "Numele invitatului și linkul nu pot fi goale.",
      );
      return;
    }

    setActionLoadingId(guest.id);
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("guests")
      .update({
        display_name: displayName,
        slug,
        greeting: guestDraft.greeting.trim() || null,
        is_active: guestDraft.is_active,
      })
      .eq("id", guest.id);

    if (updateError) {
      console.error(
        "Eroare actualizare invitație:",
        updateError,
      );

      setError(
        updateError.code === "23505"
          ? "Există deja o invitație cu acest link."
          : "Invitația nu a putut fi modificată.",
      );

      setActionLoadingId(null);
      return;
    }

    setEditingGuestId(null);
    setGuestDraft(null);
    setActionLoadingId(null);
    setSuccess("Invitația a fost modificată.");

    await loadData();
  }

  async function handleDeleteGuest(guest: GuestRow) {
    const response = findGuestRSVP(guest);

    const confirmed = window.confirm(
      response
        ? `Ștergi invitația pentru „${guest.display_name}” și răspunsul RSVP asociat?`
        : `Ștergi invitația pentru „${guest.display_name}”?`,
    );

    if (!confirmed) return;

    setActionLoadingId(guest.id);
    setError("");
    setSuccess("");

    if (response) {
      const { error: rsvpDeleteError } = await supabase
        .from("rsvp")
        .delete()
        .eq("id", response.id);

      if (rsvpDeleteError) {
        console.error(
          "Eroare ștergere RSVP asociat:",
          rsvpDeleteError,
        );
        setError(
          "Răspunsul asociat nu a putut fi șters.",
        );
        setActionLoadingId(null);
        return;
      }
    }

    const { error: deleteError } = await supabase
      .from("guests")
      .delete()
      .eq("id", guest.id);

    if (deleteError) {
      console.error(
        "Eroare ștergere invitație:",
        deleteError,
      );
      setError("Invitația nu a putut fi ștearsă.");
      setActionLoadingId(null);
      return;
    }

    setActionLoadingId(null);
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

  function createWhatsAppLink(guest: GuestRow) {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://botezulamir.ro";

    const invitationLink = `${origin}/?inv=${guest.slug}`;

    const message = [
      `Bună, ${guest.display_name}!`,
      "",
      "Ne-ar face mare plăcere să fiți alături de noi la botezul lui Amir.",
      "",
      invitationLink,
      "",
      "Vă rugăm să confirmați prezența până la 15 septembrie 2026.",
    ].join("\n");

    return `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message,
    )}`;
  }

  function exportRSVP() {
    const escapeCsv = (value: string | number | null) => {
      const textValue = value === null ? "" : String(value);
      return `"${textValue.replace(/"/g, '""')}"`;
    };

    const header = [
      "Invitat",
      "Participă",
      "Adulți",
      "Copii",
      "Telefon",
      "Observații",
      "Data răspunsului",
    ];

    const data = rows.map((row) => [
      row.name,
      row.attendance === "yes" ? "Da" : "Nu",
      row.adults,
      row.children,
      row.phone ?? "",
      row.allergies ?? "",
      new Date(row.created_at).toLocaleString("ro-RO"),
    ]);

    const csv = [header, ...data]
      .map((line) => line.map(escapeCsv).join(";"))
      .join("\n");

    const blob = new Blob(["\uFEFF", csv], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `rsvp-amir-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  function startEditRSVP(row: RSVPRow) {
    setEditingRSVPId(row.id);
    setRsvpDraft({
      name: row.name,
      phone: row.phone ?? "",
      attendance: row.attendance,
      adults: row.adults,
      children: row.children,
      allergies: row.allergies ?? "",
    });
    setError("");
    setSuccess("");
  }

  function cancelEditRSVP() {
    setEditingRSVPId(null);
    setRsvpDraft(null);
  }

  async function handleUpdateRSVP(row: RSVPRow) {
    if (!rsvpDraft) return;

    if (!rsvpDraft.name.trim()) {
      setError("Numele din răspuns nu poate fi gol.");
      return;
    }

    if (
      !Number.isFinite(rsvpDraft.adults) ||
      !Number.isFinite(rsvpDraft.children) ||
      rsvpDraft.adults < 0 ||
      rsvpDraft.children < 0
    ) {
      setError(
        "Numărul de adulți și copii trebuie să fie valid.",
      );
      return;
    }

    setActionLoadingId(row.id);
    setError("");
    setSuccess("");

    const { error: updateError } = await supabase
      .from("rsvp")
      .update({
        name: rsvpDraft.name.trim(),
        phone: rsvpDraft.phone.trim() || null,
        attendance: rsvpDraft.attendance,
        adults: rsvpDraft.adults,
        children: rsvpDraft.children,
        allergies: rsvpDraft.allergies.trim() || null,
      })
      .eq("id", row.id);

    if (updateError) {
      console.error(
        "Eroare actualizare RSVP:",
        updateError,
      );
      setError("Răspunsul RSVP nu a putut fi modificat.");
      setActionLoadingId(null);
      return;
    }

    setEditingRSVPId(null);
    setRsvpDraft(null);
    setActionLoadingId(null);
    setSuccess("Răspunsul RSVP a fost modificat.");

    await loadData();
  }

  async function handleDeleteRSVP(row: RSVPRow) {
    const confirmed = window.confirm(
      `Ștergi răspunsul RSVP pentru „${row.name}”? Invitatul va putea completa din nou formularul.`,
    );

    if (!confirmed) return;

    setActionLoadingId(row.id);
    setError("");
    setSuccess("");

    const { error: deleteError } = await supabase
      .from("rsvp")
      .delete()
      .eq("id", row.id);

    if (deleteError) {
      console.error(
        "Eroare ștergere RSVP:",
        deleteError,
      );
      setError("Răspunsul RSVP nu a putut fi șters.");
      setActionLoadingId(null);
      return;
    }

    setActionLoadingId(null);
    setSuccess(
      "Răspunsul RSVP a fost șters. Invitatul poate răspunde din nou.",
    );

    await loadData();
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

          <form
            onSubmit={handleLogin}
            className="mt-10 space-y-5"
          >
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
                className={
                  loadingData ? "animate-spin" : ""
                }
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

        <section className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          {[
            ["Invitații", statistics.invitations],
            ["Confirmări", statistics.confirmed],
            ["Refuzuri", statistics.declined],
            ["În așteptare", statistics.waiting],
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
          <div className="border-b border-slate-100 p-7">
            <div className="flex items-center gap-3">
              <Users size={22} className="text-[#a88d5d]" />

              <div>
                <h2 className="text-3xl font-semibold text-[#263746]">
                  Lista invitaților
                </h2>

                <p className="mt-1 text-slate-500">
                  Poți căuta, filtra, trimite, modifica sau șterge orice invitație.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={guestSearch}
                  onChange={(event) => setGuestSearch(event.target.value)}
                  placeholder="Caută după nume, adresare sau link..."
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
                />
              </label>

              <select
                value={guestFilter}
                onChange={(event) => setGuestFilter(event.target.value as GuestFilter)}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-[#a88d5d]"
              >
                <option value="all">Toți invitații</option>
                <option value="yes">Confirmați</option>
                <option value="no">Refuzați</option>
                <option value="waiting">În așteptare</option>
              </select>

              <label className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <select
                  value={guestSort}
                  onChange={(event) => setGuestSort(event.target.value as GuestSort)}
                  className="rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
                >
                  <option value="newest">Cele mai noi</option>
                  <option value="name">După nume</option>
                  <option value="status">După status</option>
                </select>
              </label>
            </div>
          </div>

          {loadingData ? (
            <p className="p-8 text-slate-500">
              Se încarcă...
            </p>
          ) : filteredGuests.length === 0 ? (
            <p className="p-8 text-slate-500">
              Nu există invitații care corespund criteriilor selectate.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px]">
                <thead className="bg-[#f1ede5]">
                  <tr>
                    <th className="p-4 text-left">Invitat</th>
                    <th className="p-4 text-left">Link</th>
                    <th className="p-4 text-center">Activă</th>
                    <th className="p-4 text-center">
                      Status RSVP
                    </th>
                    <th className="p-4 text-right">Acțiuni</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredGuests.map((guest) => {
                    const response = findGuestRSVP(guest);
                    const isEditing =
                      editingGuestId === guest.id;

                    return (
                      <tr
                        key={guest.id}
                        className="border-t border-slate-100 align-top"
                      >
                        <td className="p-4">
                          {isEditing && guestDraft ? (
                            <div className="space-y-3">
                              <input
                                value={guestDraft.display_name}
                                onChange={(event) =>
                                  setGuestDraft({
                                    ...guestDraft,
                                    display_name:
                                      event.target.value,
                                  })
                                }
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                              />

                              <input
                                value={guestDraft.greeting}
                                onChange={(event) =>
                                  setGuestDraft({
                                    ...guestDraft,
                                    greeting:
                                      event.target.value,
                                  })
                                }
                                placeholder="Adresare"
                                className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                              />
                            </div>
                          ) : (
                            <>
                              <p className="font-semibold text-[#263746]">
                                {guest.display_name}
                              </p>

                              {guest.greeting && (
                                <p className="mt-1 text-sm text-slate-500">
                                  {guest.greeting}
                                </p>
                              )}
                            </>
                          )}
                        </td>

                        <td className="p-4">
                          {isEditing && guestDraft ? (
                            <input
                              value={guestDraft.slug}
                              onChange={(event) =>
                                setGuestDraft({
                                  ...guestDraft,
                                  slug: event.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            <code className="rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                              ?inv={guest.slug}
                            </code>
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {isEditing && guestDraft ? (
                            <label className="inline-flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={
                                  guestDraft.is_active
                                }
                                onChange={(event) =>
                                  setGuestDraft({
                                    ...guestDraft,
                                    is_active:
                                      event.target.checked,
                                  })
                                }
                              />
                              <span className="text-sm">
                                Activă
                              </span>
                            </label>
                          ) : guest.is_active ? (
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                              Da
                            </span>
                          ) : (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                              Nu
                            </span>
                          )}
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
                            {isEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateGuest(guest)
                                  }
                                  disabled={
                                    actionLoadingId ===
                                    guest.id
                                  }
                                  className="inline-flex items-center gap-2 rounded-full bg-[#263746] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                >
                                  <Save size={16} />
                                  Salvează
                                </button>

                                <button
                                  type="button"
                                  onClick={cancelEditGuest}
                                  className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-slate-600"
                                >
                                  <X size={17} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    copyGuestLink(guest)
                                  }
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
                                  href={createWhatsAppLink(guest)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center rounded-full border border-emerald-100 p-2.5 text-emerald-600"
                                  title="Trimite pe WhatsApp"
                                >
                                  <MessageCircle size={17} />
                                </a>

                                <a
                                  href={`/?inv=${guest.slug}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-slate-600"
                                >
                                  <Link2 size={17} />
                                </a>

                                <button
                                  type="button"
                                  onClick={() =>
                                    startEditGuest(guest)
                                  }
                                  className="inline-flex items-center justify-center rounded-full border border-[#d8c7a4] p-2.5 text-[#8d6f3e]"
                                >
                                  <Pencil size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteGuest(guest)
                                  }
                                  disabled={
                                    actionLoadingId ===
                                    guest.id
                                  }
                                  className="inline-flex items-center justify-center rounded-full border border-red-100 p-2.5 text-red-600 disabled:opacity-60"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </>
                            )}
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-[#263746]">
                  Confirmări RSVP
                </h2>

                <p className="mt-1 text-slate-500">
                  Poți căuta, ordona, exporta, modifica sau șterge orice răspuns.
                </p>
              </div>

              <button
                type="button"
                onClick={exportRSVP}
                disabled={rows.length === 0}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#263746] px-5 py-3 font-semibold text-white disabled:opacity-50"
              >
                <Download size={18} />
                Export Excel
              </button>
            </div>

            <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  value={rsvpSearch}
                  onChange={(event) => setRsvpSearch(event.target.value)}
                  placeholder="Caută după nume, telefon sau observații..."
                  className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
                />
              </label>

              <label className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                <select
                  value={rsvpSort}
                  onChange={(event) => setRsvpSort(event.target.value as RSVPSort)}
                  className="rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
                >
                  <option value="newest">Cele mai noi</option>
                  <option value="name">După nume</option>
                  <option value="attendance">După participare</option>
                </select>
              </label>
            </div>
          </div>

          {loadingData ? (
            <p className="p-8 text-slate-500">
              Se încarcă...
            </p>
          ) : filteredRows.length === 0 ? (
            <p className="p-8 text-slate-500">
              Nu există răspunsuri care corespund căutării.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1280px]">
                <thead className="bg-[#f1ede5]">
                  <tr>
                    <th className="p-4 text-left">Nume</th>
                    <th className="p-4 text-left">Telefon</th>
                    <th className="p-4 text-center">
                      Participă
                    </th>
                    <th className="p-4 text-center">Adulți</th>
                    <th className="p-4 text-center">Copii</th>
                    <th className="p-4 text-left">
                      Observații
                    </th>
                    <th className="p-4 text-left">Data</th>
                    <th className="p-4 text-right">
                      Acțiuni
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRows.map((row) => {
                    const isEditing =
                      editingRSVPId === row.id;

                    return (
                      <tr
                        key={row.id}
                        className="border-t border-slate-100 align-top"
                      >
                        <td className="p-4">
                          {isEditing && rsvpDraft ? (
                            <input
                              value={rsvpDraft.name}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  name: event.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            <span className="font-medium">
                              {row.name}
                            </span>
                          )}
                        </td>

                        <td className="p-4">
                          {isEditing && rsvpDraft ? (
                            <input
                              value={rsvpDraft.phone}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  phone: event.target.value,
                                })
                              }
                              className="w-full rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            row.phone || "—"
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {isEditing && rsvpDraft ? (
                            <select
                              value={rsvpDraft.attendance}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  attendance:
                                    event.target.value as
                                      | "yes"
                                      | "no",
                                })
                              }
                              className="rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                            >
                              <option value="yes">Da</option>
                              <option value="no">Nu</option>
                            </select>
                          ) : row.attendance === "yes" ? (
                            "Da"
                          ) : (
                            "Nu"
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {isEditing && rsvpDraft ? (
                            <input
                              type="number"
                              min="0"
                              value={rsvpDraft.adults}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  adults: Number(
                                    event.target.value,
                                  ),
                                })
                              }
                              className="w-20 rounded-xl border border-slate-200 px-3 py-2 text-center outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            row.adults
                          )}
                        </td>

                        <td className="p-4 text-center">
                          {isEditing && rsvpDraft ? (
                            <input
                              type="number"
                              min="0"
                              value={rsvpDraft.children}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  children: Number(
                                    event.target.value,
                                  ),
                                })
                              }
                              className="w-20 rounded-xl border border-slate-200 px-3 py-2 text-center outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            row.children
                          )}
                        </td>

                        <td className="p-4">
                          {isEditing && rsvpDraft ? (
                            <textarea
                              rows={2}
                              value={rsvpDraft.allergies}
                              onChange={(event) =>
                                setRsvpDraft({
                                  ...rsvpDraft,
                                  allergies:
                                    event.target.value,
                                })
                              }
                              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 outline-none focus:border-[#a88d5d]"
                            />
                          ) : (
                            row.allergies || "—"
                          )}
                        </td>

                        <td className="p-4">
                          {new Date(
                            row.created_at,
                          ).toLocaleString("ro-RO")}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            {isEditing ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleUpdateRSVP(row)
                                  }
                                  disabled={
                                    actionLoadingId === row.id
                                  }
                                  className="inline-flex items-center gap-2 rounded-full bg-[#263746] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                                >
                                  <Save size={16} />
                                  Salvează
                                </button>

                                <button
                                  type="button"
                                  onClick={cancelEditRSVP}
                                  className="inline-flex items-center justify-center rounded-full border border-slate-200 p-2.5 text-slate-600"
                                >
                                  <X size={17} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    startEditRSVP(row)
                                  }
                                  className="inline-flex items-center justify-center rounded-full border border-[#d8c7a4] p-2.5 text-[#8d6f3e]"
                                >
                                  <Pencil size={17} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteRSVP(row)
                                  }
                                  disabled={
                                    actionLoadingId === row.id
                                  }
                                  className="inline-flex items-center justify-center rounded-full border border-red-100 p-2.5 text-red-600 disabled:opacity-60"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </>
                            )}
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
      </div>
    </main>
  );
}