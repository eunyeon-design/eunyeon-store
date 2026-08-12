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
      style={{ x: springX, y: springY }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="ribbon-cursor animate-ribbon-float"
        animate={{ scale: isHovering ? 1.6 : 1, rotate: isHovering ? 6 : -8 }}
        transition={{ type: "spring", damping: 14, stiffness: 220 }}
        style={{ translateX: "-50%", translateY: "-50%" }}
      >
        <RibbonShape />
      </motion.div>
    </motion.div>
  );
}

function RibbonShape() {
  return (
    <svg
      width="30"
      height="36"
      viewBox="0 0 34 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonGradient" x1="0" y1="0" x2="34" y2="26">
          <stop offset="0%" stopColor="#ffc3dc" />
          <stop offset="100%" stopColor="#ee7da6" />
        </linearGradient>
        <linearGradient id="ribbonTailGradient" x1="0" y1="18" x2="34" y2="38">
          <stop offset="0%" stopColor="#ee7da6" />
          <stop offset="100%" stopColor="#e0578c" />
        </linearGradient>
        <radialGradient id="pearlGradient" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fbdce8" />
        </radialGradient>
      </defs>

      {/* right tail */}
      <path
        d="M18 20 L26 36 L22.5 32 L20 37 L17 21 Z"
        fill="url(#ribbonTailGradient)"
        opacity="0.95"
      />
      {/* left tail */}
      <path
        d="M16 20 L8 36 L11.5 32 L14 37 L17 21 Z"
        fill="url(#ribbonTailGradient)"
        opacity="0.95"
      />

      {/* right loop — outer */}
      <path
        d="M17 18 C24 7 35 5 34 14 C33.3 22 22 24 17 18 Z"
        fill="url(#ribbonGradient)"
      />
      {/* left loop — outer */}
      <path
        d="M17 18 C10 7 -1 5 0 14 C0.7 22 12 24 17 18 Z"
        fill="url(#ribbonGradient)"
      />
      {/* right loop — inner ruffle highlight */}
      <path
        d="M17 18 C21 12 28 11 27.5 15.5 C27 19.5 21 20.5 17 18 Z"
        fill="#ffffff"
        opacity="0.22"
      />
      {/* left loop — inner ruffle highlight */}
      <path
        d="M17 18 C13 12 6 11 6.5 15.5 C7 19.5 13 20.5 17 18 Z"
        fill="#ffffff"
        opacity="0.22"
      />

      {/* pearl knot */}
      <circle cx="17" cy="18.5" r="3.4" fill="url(#pearlGradient)" stroke="#e0578c" strokeWidth="0.8" />
      <circle cx="15.8" cy="17.3" r="0.9" className="ribbon-cursor-dot" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
