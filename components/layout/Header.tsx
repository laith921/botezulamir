"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Program", href: "#eveniment" },
  { label: "Locații", href: "#locatii" },
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

  function scrollToSection(id: string) {
    const element = document.querySelector(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setOpen(false);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid
          ? "border-b border-white/60 bg-white/75 shadow-[0_8px_35px_rgba(38,55,70,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-end px-5 py-4 sm:px-7 lg:justify-center">
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className="appearance-none border-0 bg-transparent p-0 text-sm font-medium text-[#56616a] transition hover:text-[#a88d5d]"
            >
              {link.label}
            </button>
          ))}

          <button
            type="button"
            onClick={() => scrollToSection("#rsvp")}
            style={{
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
              WebkitAppearance: "none",
              appearance: "none",
            }}
            className="ml-2 inline-flex items-center justify-center rounded-full border border-[#263746] bg-[#263746] px-6 py-3 text-sm font-semibold !text-white shadow-[0_12px_30px_rgba(38,55,70,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#1d2a35]"
          >
            Confirmă prezența
          </button>
        </nav>

        <button
          type="button"
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          onClick={() => setOpen((current) => !current)}
          className="rounded-full border border-white/75 bg-white/85 p-3 text-[#263746] shadow-sm backdrop-blur transition hover:bg-white lg:hidden"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/60 bg-white/95 px-5 py-5 shadow-lg backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-lg flex-col gap-2">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => scrollToSection(link.href)}
                className="w-full appearance-none rounded-2xl border-0 bg-transparent px-4 py-3 text-left font-medium text-[#56616a] transition hover:bg-[#f7f4ee] hover:text-[#a88d5d]"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("#rsvp")}
              style={{
                color: "#ffffff",
                WebkitTextFillColor: "#ffffff",
                WebkitAppearance: "none",
                appearance: "none",
              }}
              className="mt-3 w-full rounded-full border border-[#263746] bg-[#263746] px-6 py-4 text-center font-semibold !text-white shadow-sm"
            >
              Confirmă prezența
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}