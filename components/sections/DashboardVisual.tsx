"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const BARS = [38, 52, 44, 63, 58, 71, 66, 84, 77, 92];
const LINE = "M0 70 C 40 66, 60 52, 100 50 S 170 58, 210 40 S 280 30, 320 22 S 380 12, 400 8";

/** Illustrative chart for the dashboards service: bars grow and the trend line draws in. */
export function DashboardVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.from(root.querySelectorAll("[data-bar]"), { scaleY: 0, transformOrigin: "bottom", duration: 0.9, ease: "power3.out", stagger: 0.05 })
        .from(root.querySelectorAll("[data-line]"), { strokeDashoffset: 600, duration: 1.4, ease: "power2.inOut" }, 0.2)
        .from(root.querySelectorAll("[data-kpi]"), { y: 12, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.4);
    },
    [],
  );

  return (
    <div ref={ref} aria-hidden="true" className="mt-8 rounded-xl border border-line bg-bg/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between text-[11px] text-faint">
        <span>Operations overview</span>
        <span>Sample data</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Leads handled", "1,284"],
          ["Auto-resolved", "71.6%"],
          ["Awaiting review", "18"],
        ].map(([k, v]) => (
          <div key={k} data-kpi className="rounded-lg border border-line/80 bg-surface px-3 py-2.5">
            <div className="text-[11px] text-faint">{k}</div>
            <div className="mt-1 font-display text-base font-semibold text-text sm:text-lg">{v}</div>
          </div>
        ))}
      </div>
      <div className="relative mt-4 h-36 sm:h-44">
        <div className="absolute inset-0 flex items-end gap-1.5 sm:gap-2.5">
          {BARS.map((h, i) => (
            <div
              key={i}
              data-bar
              className="flex-1 rounded-t-md bg-gradient-to-t from-accent/25 to-accent/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <svg viewBox="0 0 400 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path
            data-line
            d={LINE}
            fill="none"
            stroke="#e9d5ff"
            strokeWidth="2.5"
            strokeDasharray="600"
            strokeDashoffset="0"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
}
