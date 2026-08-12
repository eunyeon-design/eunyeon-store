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
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ribbonGradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#ff6f91" />
          <stop offset="100%" stopColor="#e50012" />
        </linearGradient>
      </defs>
      <path
        d="M16 16 C11 10 3 9 2 13 C1 17 9 18 16 16 Z"
        fill="url(#ribbonGradient)"
        opacity="0.92"
      />
      <path
        d="M16 16 C21 10 29 9 30 13 C31 17 23 18 16 16 Z"
        fill="url(#ribbonGradient)"
        opacity="0.92"
      />
      <circle cx="16" cy="16" r="2.6" className="ribbon-cursor-dot" fill="#fbf9f5" />
    </svg>
  );
}
