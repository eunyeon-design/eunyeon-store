"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  lines: string[];
  speed?: number;
  className?: string;
}

export default function TypewriterText({
  lines,
  speed = 35,
  className,
}: TypewriterTextProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>(() =>
    lines.map(() => "")
  );
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeNext() {
      if (cancelled) return;

      if (lineIndex >= lines.length) {
        setDone(true);
        return;
      }

      const currentLine = lines[lineIndex];

      if (charIndex <= currentLine.length) {
        const snapshot = currentLine.slice(0, charIndex);
        setDisplayedLines((prev) => {
          const next = [...prev];
          next[lineIndex] = snapshot;
          return next;
        });
        charIndex += 1;
        timeoutId = setTimeout(typeNext, speed);
      } else {
        lineIndex += 1;
        charIndex = 0;
        timeoutId = setTimeout(typeNext, speed * 8);
      }
    }

    typeNext();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <p className={className}>
      {displayedLines.map((line, index) => (
        <span key={index}>
          {line}
          {index < displayedLines.length - 1 && <br />}
        </span>
      ))}
      {!done && (
        <span className="ml-0.5 inline-block h-[1em] w-[1px] translate-y-[2px] animate-pulse bg-current align-middle" />
      )}
    </p>
  );
}
