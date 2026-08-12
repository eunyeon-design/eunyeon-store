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
      height="34"
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonGradient" x1="0" y1="0" x2="32" y2="24">
          <stop offset="0%" stopColor="#ffb3d1" />
          <stop offset="100%" stopColor="#f8c5d5" />
        </linearGradient>
        <linearGradient id="ribbonTailGradient" x1="0" y1="16" x2="32" y2="34">
          <stop offset="0%" stopColor="#f8a9c4" />
          <stop offset="100%" stopColor="#f47fac" />
        </linearGradient>
      </defs>

      {/* right tail */}
      <path
        d="M17 17 L23 30 L20.3 27.2 L18.3 30.5 L15.5 18 Z"
        fill="url(#ribbonTailGradient)"
        opacity="0.92"
      />
      {/* left tail */}
      <path
        d="M15 17 L9 30 L11.7 27.2 L13.7 30.5 L16.5 18 Z"
        fill="url(#ribbonTailGradient)"
        opacity="0.92"
      />

      {/* right loop */}
      <path
        d="M16 17 C20 10 30 7 31 13 C31.8 18.5 22 20.5 16 17 Z"
        fill="url(#ribbonGradient)"
        opacity="0.95"
      />
      {/* left loop */}
      <path
        d="M16 17 C12 10 2 7 1 13 C0.2 18.5 10 20.5 16 17 Z"
        fill="url(#ribbonGradient)"
        opacity="0.95"
      />

      {/* knot */}
      <rect x="13.2" y="14.5" width="5.6" height="5" rx="1.6" fill="#f47fac" />
      <circle cx="15" cy="16" r="1" className="ribbon-cursor-dot" fill="#ffffff" opacity="0.85" />
    </svg>
  );
}
