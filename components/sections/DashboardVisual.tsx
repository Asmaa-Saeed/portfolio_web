"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const BARS = [38, 52, 44, 63, 58, 71, 66, 84, 77, 92];
const SOURCES = ["n8n workflows", "AI agents", "CRM", "WhatsApp"];
const LINE = "M0 70 C 40 66, 60 52, 100 50 S 170 58, 210 40 S 280 30, 320 22 S 380 12, 400 8";

/**
 * Illustrative live dashboard fed by the automations it monitors: bars grow,
 * the trend line draws in and the sources light up.
 */
export function DashboardVisual() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      tl.from(root.querySelectorAll("[data-bar]"), { scaleY: 0, transformOrigin: "bottom", duration: 0.9, ease: "power3.out", stagger: 0.05 })
        .fromTo(
          root.querySelectorAll("[data-line]"),
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power2.inOut" },
          0.2,
        )
        .from(root.querySelectorAll("[data-kpi]"), { y: 12, opacity: 0, stagger: 0.1, duration: 0.6 }, 0.4)
        .from(root.querySelectorAll("[data-source]"), { opacity: 0, x: -8, stagger: 0.08, duration: 0.4 }, 0.9);
    },
    [],
  );

  return (
    <div ref={ref} aria-hidden="true" className="mt-8 rounded-xl border border-line bg-bg/60 p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between text-[11px] text-faint">
        <span className="flex items-center gap-2 text-muted">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative size-2 rounded-full bg-emerald-400" />
          </span>
          Live · Automation overview
        </span>
        <span>Sample data</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Runs today", "1,284"],
          ["Automated", "71.6%"],
          ["Needs review", "18"],
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
        <svg
          data-line
          viewBox="0 0 400 80"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path d={LINE} fill="none" stroke="#e9d5ff" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line/80 pt-3 text-[11px]">
        <span className="text-faint">Synced from</span>
        {SOURCES.map((s) => (
          <span key={s} data-source className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-accent-soft">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
