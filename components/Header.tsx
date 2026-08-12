"use client";

import { useState } from "react";
import { Instagram, Mail, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "SHOP", href: "#" },
  { label: "ABOUT", href: "#about" },
  { label: "ARCHIVE", href: "#archive" },
];

const OUTER_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Contact", href: "mailto:eunyeon040321@gmail.com", icon: Mail },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-off/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
        <a
          href="/"
          data-cursor-hover
          className="font-serif text-2xl font-bold italic tracking-tight text-brand-black sm:text-3xl"
        >
          eunyeon
        </a>

        <nav className="hidden items-center gap-9 font-display text-[13px] font-bold uppercase tracking-widest2 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-cursor-hover
              className="relative text-brand-black transition-colors duration-200 hover:text-brand-red"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {OUTER_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              data-cursor-hover
              aria-label={label}
              className="text-brand-black transition-colors duration-200 hover:text-brand-red"
            >
              <Icon size={18} strokeWidth={1.75} />
            </a>
          ))}
        </div>

        <button
          data-cursor-hover
          aria-label="Toggle menu"
          className="text-brand-black md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-black/10 px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4 font-display text-sm font-bold uppercase tracking-widest2">
            {[...NAV_LINKS, ...OUTER_LINKS.map((l) => ({ label: l.label, href: l.href }))].map(
              (link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor-hover
                  className="text-brand-black transition-colors duration-200 hover:text-brand-red"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
