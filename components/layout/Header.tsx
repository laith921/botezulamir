"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Poveste", href: "#poveste" },
  { label: "Eveniment", href: "#eveniment" },
  { label: "Galerie", href: "#galerie" },
  { label: "Locații", href: "#locatii" },
  { label: "RSVP", href: "#rsvp" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 40);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-white/70 bg-white/85 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="font-title text-3xl font-semibold text-[#263746]">
          Amir
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 transition hover:text-[#5798bd]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className="hidden rounded-full bg-[#5798bd] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#467fa1] lg:inline-flex"
        >
          Confirmă prezența
        </a>

        <button
          type="button"
          aria-label="Deschide meniul"
          onClick={() => setOpen(!open)}
          className="rounded-full bg-white/80 p-3 text-slate-700 shadow-sm backdrop-blur lg:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-6 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-medium text-slate-700 hover:bg-sky-50"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}