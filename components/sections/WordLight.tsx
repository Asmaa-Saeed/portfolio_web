"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Paragraph whose words light up one by one as it scrolls through the viewport. */
export function WordLight({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const words = root.querySelectorAll("[data-w]");
      if (!words.length) return;
      gsap.fromTo(
        words,
        { opacity: 0.16 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: root, start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
    },
    [],
  );

  return (
    <p ref={ref} className={`text-text ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i} data-w className="inline">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
