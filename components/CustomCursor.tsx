"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const HOVER_SELECTOR = "a, button, [data-cursor-hover], input, textarea, select";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 22, stiffness: 320, mass: 0.4 });
  const springY = useSpring(cursorY, { damping: 22, stiffness: 320, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setIsPointerFine(fine);
    if (!fine) return;

    const handleMove = (event: MouseEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      setIsHovering(Boolean(target?.closest(HOVER_SELECTOR)));
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseleave", handleLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isPointerFine) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{ x: springX, y: springY, pointerEvents: "none" }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="ribbon-cursor animate-ribbon-float pointer-events-none"
        animate={{ scale: isHovering ? 1.5 : 1, rotate: isHovering ? -18 : -24 }}
        transition={{ type: "spring", damping: 14, stiffness: 220 }}
        style={{ translateX: "-50%", translateY: "-50%", pointerEvents: "none" }}
      >
        <CandyShape />
      </motion.div>
    </motion.div>
  );
}

function CandyShape() {
  return (
    <svg
      width="42"
      height="30"
      viewBox="0 0 46 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: "none" }}
    >
      <defs>
        <linearGradient id="candyGradient" x1="20%" y1="5%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f4a3c2" />
          <stop offset="55%" stopColor="#fbdbe8" />
          <stop offset="100%" stopColor="#fffaf9" />
        </linearGradient>
        <linearGradient id="wrapperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#eef4f6" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>

      {/* left cellophane twist — thicker faceted fan, tips softened but not blobby */}
      <path
        d="M16 16 L3 4.5 Q1 6 2.5 9 L5 16 L2.5 23 Q1 26 3 27.5 L16 16 Z"
        fill="url(#wrapperGradient)"
        stroke="#d3dce0"
        strokeWidth="0.4"
        strokeLinejoin="round"
        opacity="0.92"
      />
      {/* right cellophane twist — thicker faceted fan, tips softened but not blobby */}
      <path
        d="M30 16 L43 4.5 Q45 6 43.5 9 L41 16 L43.5 23 Q45 26 43 27.5 L30 16 Z"
        fill="url(#wrapperGradient)"
        stroke="#d3dce0"
        strokeWidth="0.4"
        strokeLinejoin="round"
        opacity="0.92"
      />
      {/* soft crinkle hints on wrapper */}
      <path d="M5 16 L2.7 9 M5 16 L2.7 23 M41 16 L43.3 9 M41 16 L43.3 23" stroke="#d8e2e5" strokeWidth="0.35" opacity="0.7" fill="none" />

      {/* candy body — faceted glass sphere */}
      <path
        d="M23 8.5 L27.2 10 L29.5 13.6 L29.5 18.4 L27.2 22 L23 23.5 L18.8 22 L16.5 18.4 L16.5 13.6 L18.8 10 Z"
        fill="url(#candyGradient)"
        stroke="#ffffff"
        strokeWidth="0.5"
        strokeOpacity="0.7"
        strokeLinejoin="round"
      />
      {/* facet lines for the cut-glass look */}
      <path
        d="M23 16 L23 8.5 M23 16 L29.5 13.6 M23 16 L29.5 18.4 M23 16 L27.2 22 M23 16 L18.8 22 M23 16 L16.5 18.4 M23 16 L16.5 13.6 M23 16 L18.8 10"
        stroke="#ffffff"
        strokeWidth="0.3"
        opacity="0.4"
      />
      {/* glossy highlight */}
      <ellipse cx="26" cy="12" rx="2.4" ry="1.3" fill="#ffffff" opacity="0.85" transform="rotate(-25 26 12)" />
    </svg>
  );
}
