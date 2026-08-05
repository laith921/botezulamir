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
    const handleScroll = () => {
      setSolid(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-[#eee7dc] bg-white/90 shadow-sm backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4 lg:justify-between">
        <div className="hidden w-[180px] lg:block" />

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#56616a] transition hover:text-[#a88d5d]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#rsvp"
          className="hidden w-[180px] justify-center rounded-full border border-[#263746] bg-white px-6 py-3 text-sm font-semibold text-[#263746] transition hover:bg-[#263746] hover:text-white lg:inline-flex"
        >
          Confirmă prezența
        </a>

        <div className="flex w-full justify-end lg:hidden">
          <button
            type="button"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            onClick={() => setOpen((current) => !current)}
            className="rounded-full border border-[#e4dbcb] bg-white/90 p-3 text-[#263746] shadow-sm backdrop-blur"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[#eee7dc] bg-white px-6 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-medium text-[#56616a] transition hover:bg-[#f7f4ee] hover:text-[#a88d5d]"
              >
                {link.label}
              </a>
            ))}

            <a
              href="#rsvp"
              onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-[#263746] px-6 py-4 text-center font-semibold text-white"
            >
              Confirmă prezența
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}