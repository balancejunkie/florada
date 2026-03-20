"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#historia", label: "Nossa História" },
  { href: "#galeria", label: "Galeria" },
  { href: "#midia", label: "Na Mídia" },
  { href: "#contato", label: "Contato" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <Image
            src="/images/logo/logo.png"
            alt="Florada Fonte de Mel"
            width={44}
            height={44}
            className="drop-shadow-lg"
            priority
          />
          <span
            className={`font-display text-lg font-semibold tracking-wide transition-colors duration-500 ${
              scrolled ? "text-honey" : "text-white"
            }`}
          >
            Florada
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-honey ${
                scrolled ? "text-cream" : "text-white/90"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen
                ? "rotate-45 translate-y-2 bg-honey"
                : scrolled
                  ? "bg-cream"
                  : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen
                ? "opacity-0"
                : scrolled
                  ? "bg-cream"
                  : "bg-white"
            }`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen
                ? "-rotate-45 -translate-y-2 bg-honey"
                : scrolled
                  ? "bg-cream"
                  : "bg-white"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-forest/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-cream text-sm font-medium tracking-wide hover:text-honey transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
