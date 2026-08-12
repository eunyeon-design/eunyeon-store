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
        <linearGradient id="ribbonGradient" x1="0" y1="0" x2="34" y2="38">
          <stop offset="0%" stopColor="#ffc3dc" />
          <stop offset="100%" stopColor="#ee7da6" />
        </linearGradient>
        <radialGradient id="pearlGradient" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#fbdce8" />
        </radialGradient>
      </defs>

      {/* right tail — shallow, soft notch at the bottom edge */}
      <path
        d="M16 20 L20 19 L27 36 L23.5 34.7 L20 37 L17 21 Z"
        fill="url(#ribbonGradient)"
      />
      {/* left tail — shallow, soft notch at the bottom edge */}
      <path
        d="M18 20 L14 19 L7 36 L10.5 34.7 L14 37 L17 21 Z"
        fill="url(#ribbonGradient)"
      />

      {/* right loop — outer, kite-folded shape instead of round */}
      <path
        d="M17 18 Q22 10 26 6 Q31 9 33 13 Q30 19 26 24 Q21 22 17 18 Z"
        fill="url(#ribbonGradient)"
      />
      {/* left loop — outer, kite-folded shape instead of round */}
      <path
        d="M17 18 Q12 10 8 6 Q3 9 1 13 Q4 19 8 24 Q13 22 17 18 Z"
        fill="url(#ribbonGradient)"
      />
      {/* right loop — inner ruffle highlight */}
      <path
        d="M17 18 Q20 13 23 10 Q26 12 27 15 Q25 18 22 20 Q19 19 17 18 Z"
        fill="#ffffff"
        opacity="0.24"
      />
      {/* left loop — inner ruffle highlight */}
      <path
        d="M17 18 Q14 13 11 10 Q8 12 7 15 Q9 18 12 20 Q15 19 17 18 Z"
        fill="#ffffff"
        opacity="0.24"
      />

      {/* pearl knot */}
      <circle cx="17" cy="18.5" r="3.4" fill="url(#pearlGradient)" stroke="#e0578c" strokeWidth="0.8" />
      <circle cx="15.8" cy="17.3" r="0.9" className="ribbon-cursor-dot" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
