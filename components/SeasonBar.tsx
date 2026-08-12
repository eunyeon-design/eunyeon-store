"use client";

import { useState } from "react";
import type { SeasonOption } from "@/types/product";

const SEASONS: SeasonOption[] = [
  { id: "2026AW_VIDEO", label: "2026AW VIDEO", href: "#", isVideo: true },
  { id: "26AW", label: "26AW", href: "#" },
  { id: "26SS", label: "26SS", href: "#" },
  { id: "2026SS_VIDEO", label: "2026SS VIDEO", href: "#", isVideo: true },
  { id: "25AW", label: "25AW", href: "#" },
  { id: "25SS", label: "25SS", href: "#" },
  { id: "24AW", label: "24AW", href: "#" },
  { id: "24SS", label: "24SS", href: "#" },
];

export default function SeasonBar() {
  const [active, setActive] = useState<SeasonOption["id"] | null>(null);

  return (
    <div
      className="w-full overflow-x-auto border-b border-brand-black/10 bg-brand-off [overscroll-behavior-x:contain] [touch-action:pan-x]"
    >
      <ul className="flex min-w-max items-center gap-5 whitespace-nowrap px-4 py-2 text-[11px] font-display font-bold uppercase tracking-widest2 sm:gap-7 sm:px-8">
        {SEASONS.map((season) => (
          <li key={season.id}>
            <a
              href={season.href}
              data-cursor-hover
              onClick={(event) => {
                event.preventDefault();
                setActive(season.id);
              }}
              className={`transition-colors duration-200 hover:text-brand-red ${
                active === season.id ? "text-brand-red" : "text-brand-black/70"
              }`}
            >
              {season.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            data-cursor-hover
            className="text-brand-black/50 transition-colors duration-200 hover:text-brand-red"
          >
            +
          </a>
        </li>
      </ul>
    </div>
  );
}
