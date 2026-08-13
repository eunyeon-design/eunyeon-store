"use client";

import { useState } from "react";
import { Instagram, Mail, Menu, Search, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";

const NAV_LINKS = [
  { label: "SHOP", href: "/shop" },
  { label: "ABOUT", href: "#about" },
  { label: "ARCHIVE", href: "#archive" },
];

const OUTER_LINKS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "Contact", href: "mailto:eunyeon040321@gmail.com", icon: Mail },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-brand-black/10 bg-brand-off/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-8">
        <a
          href="/"
          data-cursor-hover
          className="font-display text-2xl font-black italic tracking-tighter text-brand-black [font-stretch:condensed] sm:text-3xl"
        >
          <span className="text-brand-red">E</span>UN<span className="text-brand-red">Y</span>EON
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

        <div className="flex items-center gap-4">
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

          <div className="group relative" data-cursor-hover>
            <div className="flex cursor-pointer items-center gap-1.5 text-brand-black transition-colors duration-200 group-hover:text-brand-red">
              <Search size={18} strokeWidth={1.75} />
              <span className="hidden font-display text-[11px] font-bold uppercase tracking-widest2 sm:inline">
                Search
              </span>
            </div>

            <div className="invisible absolute right-0 top-full z-50 mt-3 w-64 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="border border-brand-black/15 bg-brand-off p-3 shadow-lg">
                <input
                  type="text"
                  placeholder="Search the archive..."
                  data-cursor-hover
                  className="w-full border-b border-brand-black/20 bg-transparent py-1 font-display text-sm text-brand-black outline-none placeholder:text-brand-black/40"
                />
              </div>
            </div>
          </div>

          <a
            href="/cart"
            data-cursor-hover
            aria-label="Cart"
            className="relative flex items-center gap-1.5 text-brand-black transition-colors duration-200 hover:text-brand-red"
          >
            <ShoppingBag size={18} strokeWidth={1.75} />
            <span className="hidden font-display text-[11px] font-bold uppercase tracking-widest2 sm:inline">
              Cart{totalItems > 0 ? ` (${totalItems})` : ""}
            </span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-red text-[9px] font-bold text-brand-off sm:hidden">
                {totalItems}
              </span>
            )}
          </a>

          <button
            data-cursor-hover
            aria-label="Toggle menu"
            className="text-brand-black md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-black/10 px-4 pb-6 md:hidden">
          <nav className="flex flex-col gap-4 pt-4 font-display text-sm font-bold uppercase tracking-widest2">
            {[
              ...NAV_LINKS,
              { label: `Cart${totalItems > 0 ? ` (${totalItems})` : ""}`, href: "/cart" },
              ...OUTER_LINKS.map((l) => ({ label: l.label, href: l.href })),
            ].map(
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
