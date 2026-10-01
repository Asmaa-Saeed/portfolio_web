"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Props = { to: number; from?: number; prefix?: string; suffix?: string; duration?: number };

/** Number that counts up the first time it enters the viewport. */
export function CountUp({ to, from = 0, prefix = "", suffix = "", duration = 1.6 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { v: from };
      el.textContent = `${prefix}${from}${suffix}`;
      gsap.to(state, {
        v: to,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(state.v)}${suffix}`;
        },
      });
    },
    [],
  );

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
