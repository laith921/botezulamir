"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Check } from "lucide-react";

const links = [
  { label: "Program", href: "#eveniment" },
  { label: "Confirmare", href: "#rsvp" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);
  const [showMobileHeader, setShowMobileHeader] =
    useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY;

        setSolid(scrollPosition > 48);
        setShowMobileHeader(scrollPosition > 260);

        ticking = false;
      });

      ticking = true;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

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
  }

  return (
    <>
      {/* Header compact pentru telefon */}
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 pt-[max(10px,env(safe-area-inset-top))] transition-all duration-500 lg:hidden ${
          showMobileHeader
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-5 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-sm items-center justify-between gap-2 rounded-full border border-white/65 bg-white/45 p-1.5 shadow-[0_10px_35px_rgba(38,55,70,0.10)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => scrollToSection("#eveniment")}
            aria-label="Vezi programul evenimentului"
            className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full px-3 py-2.5 text-[12px] font-semibold text-[#56616a] transition active:scale-[0.97]"
          >
            <CalendarDays
              size={15}
              className="shrink-0 text-[#a88d5d]"
            />
            <span>Program</span>
          </button>

          <button
            type="button"
            onClick={() => scrollToSection("#rsvp")}
            aria-label="Confirmă prezența"
            style={{
              color: "#263746",
              WebkitTextFillColor: "#263746",
              WebkitAppearance: "none",
              appearance: "none",
            }}
            className="inline-flex min-w-0 flex-[1.2] items-center justify-center gap-2 rounded-full border border-[#c9a86a] bg-[#e8d5ae]/95 px-3 py-2.5 text-[12px] font-semibold text-[#263746] shadow-[0_8px_22px_rgba(201,168,106,0.20)] transition active:scale-[0.97]"
          >
            <Check
              size={15}
              className="shrink-0"
            />
            <span className="whitespace-nowrap">
              Confirmă
            </span>
          </button>
        </nav>
      </header>

      {/* Header pentru desktop */}
      <header
        className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 lg:block ${
          solid
            ? "border-b border-white/35 bg-white/25 shadow-[0_8px_28px_rgba(38,55,70,0.05)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-center px-7 transition-all duration-500 ${
            solid ? "py-2.5" : "py-4"
          }`}
        >
          <nav className="flex items-center gap-9">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() =>
                  scrollToSection(link.href)
                }
                className="appearance-none border-0 bg-transparent p-0 text-sm font-medium tracking-[0.02em] text-[#56616a] transition duration-300 hover:-translate-y-0.5 hover:text-[#a88d5d]"
              >
                {link.label}
              </button>
            ))}

            <button
              type="button"
              onClick={() => scrollToSection("#rsvp")}
              style={{
                color: "#263746",
                WebkitTextFillColor: "#263746",
                WebkitAppearance: "none",
                appearance: "none",
              }}
              className="ml-1 inline-flex items-center justify-center rounded-full border border-[#c9a86a] bg-[#e8d5ae]/90 px-6 py-2.5 text-sm font-semibold shadow-[0_10px_25px_rgba(201,168,106,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcc18d] active:scale-[0.98]"
            >
              Confirmă prezența
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}