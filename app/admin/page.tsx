"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type RSVPRow = {
  id: string;
  name: string;
  phone: string | null;
  attendance: string;
  adults: number;
  children: number;
  allergies: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [rows, setRows] = useState<RSVPRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("rsvp")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setRows(data);
      }

      setLoading(false);
    }

    loadData();
  }, []);

  const confirmed = rows.filter((r) => r.attendance === "yes");
  const declined = rows.filter((r) => r.attendance === "no");

  const adults = confirmed.reduce((s, r) => s + r.adults, 0);
  const children = confirmed.reduce((s, r) => s + r.children, 0);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="mx-auto max-w-7xl">

        <h1 className="mb-10 text-5xl font-bold">
          Administrare RSVP
        </h1>

        <div className="mb-10 grid gap-5 md:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <p>Confirmări</p>
            <p className="mt-3 text-4xl font-bold">
              {confirmed.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p>Refuzuri</p>
            <p className="mt-3 text-4xl font-bold">
              {declined.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p>Adulți</p>
            <p className="mt-3 text-4xl font-bold">
              {adults}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p>Copii</p>
            <p className="mt-3 text-4xl font-bold">
              {children}
            </p>
          </div>

        </div>

        {loading ? (
          <p>Se încarcă...</p>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-white shadow">
            <table className="w-full">
              <thead className="bg-slate-200">
                <tr>
                  <th className="p-3 text-left">Nume</th>
                  <th className="p-3 text-left">Telefon</th>
                  <th className="p-3 text-center">Participă</th>
                  <th className="p-3 text-center">Adulți</th>
                  <th className="p-3 text-center">Copii</th>
                  <th className="p-3 text-left">Observații</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t">
                    <td className="p-3">{row.name}</td>
                    <td className="p-3">{row.phone}</td>
                    <td className="p-3 text-center">
                      {row.attendance === "yes" ? "Da" : "Nu"}
                    </td>
                    <td className="p-3 text-center">{row.adults}</td>
                    <td className="p-3 text-center">{row.children}</td>
                    <td className="p-3">{row.allergies}</td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </main>
  );
}