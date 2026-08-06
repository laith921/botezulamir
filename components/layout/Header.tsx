"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Program", href: "#eveniment" },
  { label: "Confirmare", href: "#rsvp" },
];

export default function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSolid(window.scrollY > 48);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 hidden transition-all duration-500 lg:block ${
        solid
          ? "border-b border-white/55 bg-white/72 shadow-[0_10px_34px_rgba(38,55,70,0.07)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-center px-7 transition-all duration-500 ${
          solid ? "py-3" : "py-4"
        }`}
      >
        <nav className="flex items-center gap-9">
          {links.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
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
            className="ml-1 inline-flex items-center justify-center rounded-full border border-[#c9a86a] bg-[#e8d5ae] px-6 py-2.5 text-sm font-semibold shadow-[0_12px_30px_rgba(201,168,106,0.20)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#dcc18d] hover:shadow-[0_14px_34px_rgba(201,168,106,0.26)] active:scale-[0.98]"
          >
            Confirmă prezența
          </button>
        </nav>
      </div>
    </header>
  );
}