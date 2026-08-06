"use client";

import { useMemo } from "react";
import {
  ArrowUpDown,
  Download,
  MessageCircleHeart,
  Search,
  Trash2,
} from "lucide-react";

export type GuestBookMessage = {
  id: string;
  guest_id: string | null;
  guest_slug: string | null;
  guest_name: string;
  message: string;
  is_approved: boolean;
  created_at: string;
};

type GuestBookSort = "newest" | "oldest" | "name";

type GuestBookTableProps = {
  messages: GuestBookMessage[];
  loading: boolean;
  actionLoadingId: string | null;
  search: string;
  sort: GuestBookSort;
  onSearchChange: (value: string) => void;
  onSortChange: (value: GuestBookSort) => void;
  onDelete: (message: GuestBookMessage) => void;
  onExport: () => void;
};

export default function GuestBookTable({
  messages,
  loading,
  actionLoadingId,
  search,
  sort,
  onSearchChange,
  onSortChange,
  onDelete,
  onExport,
}: GuestBookTableProps) {
  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = messages.filter(
      (item) =>
        !query ||
        item.guest_name.toLowerCase().includes(query) ||
        item.message.toLowerCase().includes(query),
    );

    return [...filtered].sort((a, b) => {
      if (sort === "name") {
        return a.guest_name.localeCompare(
          b.guest_name,
          "ro",
        );
      }

      if (sort === "oldest") {
        return (
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
        );
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });
  }, [messages, search, sort]);

  return (
    <section className="mt-10 overflow-hidden rounded-[30px] bg-white shadow-sm">
      <div className="border-b border-slate-100 p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f7f4ee] text-[#a88d5d]">
              <MessageCircleHeart size={22} />
            </div>

            <div>
              <h2 className="text-3xl font-semibold text-[#263746]">
                Guest Book
              </h2>

              <p className="mt-1 text-slate-500">
                Mesajele și urările lăsate pentru Amir.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onExport}
            disabled={messages.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#263746] px-5 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Download size={18} />
            Exportă urările
          </button>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto]">
          <label className="relative block">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              value={search}
              onChange={(event) =>
                onSearchChange(event.target.value)
              }
              placeholder="Caută după invitat sau mesaj..."
              className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
            />
          </label>

          <label className="relative">
            <ArrowUpDown
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={sort}
              onChange={(event) =>
                onSortChange(
                  event.target.value as GuestBookSort,
                )
              }
              className="rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-[#a88d5d]"
            >
              <option value="newest">Cele mai noi</option>
              <option value="oldest">Cele mai vechi</option>
              <option value="name">După nume</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="p-8 text-slate-500">
          Se încarcă mesajele...
        </p>
      ) : filteredMessages.length === 0 ? (
        <p className="p-8 text-slate-500">
          Nu există mesaje care corespund căutării.
        </p>
      ) : (
        <div className="divide-y divide-slate-100">
          {filteredMessages.map((item) => (
            <article
              key={item.id}
              className="grid gap-5 p-7 lg:grid-cols-[220px_minmax(0,1fr)_180px_auto] lg:items-start"
            >
              <div>
                <p className="font-semibold text-[#263746]">
                  {item.guest_name}
                </p>

                {item.guest_slug && (
                  <code className="mt-2 inline-block rounded-lg bg-slate-50 px-2.5 py-1 text-xs text-slate-500">
                    ?inv={item.guest_slug}
                  </code>
                )}
              </div>

              <blockquote className="rounded-2xl bg-[#faf8f3] px-5 py-4 text-[15px] leading-7 text-[#39434a]">
                „{item.message}”
              </blockquote>

              <div className="text-sm text-slate-500">
                <p>
                  {new Date(
                    item.created_at,
                  ).toLocaleDateString("ro-RO")}
                </p>

                <p className="mt-1">
                  {new Date(
                    item.created_at,
                  ).toLocaleTimeString("ro-RO", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onDelete(item)}
                disabled={actionLoadingId === item.id}
                title="Șterge mesajul"
                className="inline-flex items-center justify-center rounded-full border border-red-100 p-2.5 text-red-600 disabled:opacity-60"
              >
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}