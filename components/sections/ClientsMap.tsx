"use client";

import { useMemo, useRef } from "react";
import { MAP_DOTS, MAP_HEIGHT, MAP_MARKERS, MAP_WIDTH } from "@/data/mapDots";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const HOME = MAP_MARKERS.find((m) => m.code === "EG")!;
const TARGETS = MAP_MARKERS.filter((m) => m.code !== "EG");

// Neighbouring pins sit close together, so their labels fan out.
const LABEL_POS: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  EG: { dx: -14, dy: 24, anchor: "end" },
  PS: { dx: 14, dy: 22, anchor: "start" },
  SY: { dx: 14, dy: -6, anchor: "start" },
  SA: { dx: -14, dy: 5, anchor: "end" },
  AE: { dx: 0, dy: 28, anchor: "middle" },
};

/** Curved arc from Egypt to a client, bowed upward relative to its length. */
function arcPath(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  return `M${x1} ${y1} Q${mx} ${my - Math.max(40, dist * 0.45)} ${x2} ${y2}`;
}

export function ClientsMap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { base, client } = useMemo(() => {
    const base: string[] = [];
    const client: string[] = [];
    for (let i = 0; i < MAP_DOTS.length; i += 3) {
      // One compact path per layer instead of thousands of <circle> nodes.
      const seg = `M${MAP_DOTS[i]} ${MAP_DOTS[i + 1]}h0`;
      (MAP_DOTS[i + 2] ? client : base).push(seg);
    }
    return { base: base.join(""), client: client.join("") };
  }, []);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || reduced) return;
      const arcs = Array.from(root.querySelectorAll<SVGPathElement>("[data-arc]"));
      arcs.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 70%", once: true } });
      tl.from(root.querySelectorAll("[data-client-layer]"), { opacity: 0, duration: 0.8 })
        .to(arcs, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut", stagger: 0.18 }, 0.2)
        .from(root.querySelectorAll("[data-pin]"), { scale: 0, transformOrigin: "center", duration: 0.5, ease: "back.out(2)", stagger: 0.18 }, 0.9)
        .from(root.querySelectorAll("[data-label]"), { opacity: 0, y: 6, duration: 0.4, stagger: 0.18 }, 1.1);
    },
    { dependencies: [reduced] },
  );

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-2xl border border-line bg-surface/70 p-2 backdrop-blur-sm sm:p-4"
    >
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="h-auto w-full"
        role="img"
        aria-label="Map of client countries: Algeria, Palestine, Türkiye, Syria, Saudi Arabia and the UAE, connected by arcs to Egypt."
      >
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="pin-glow">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d={base} stroke="#353b6e" strokeWidth="5.5" strokeLinecap="round" />
        <path data-client-layer d={client} stroke="#9b7bf7" strokeOpacity="0.9" strokeWidth="5.5" strokeLinecap="round" />

        {TARGETS.map((m) => {
          const d = arcPath(HOME.x, HOME.y, m.x, m.y);
          return (
            <g key={m.code}>
              <path data-arc d={d} fill="none" stroke="url(#arc-grad)" strokeWidth="2" strokeLinecap="round" />
              {!reduced && (
                <circle r="3.5" fill="#ffffff">
                  <animateMotion dur="3.2s" repeatCount="indefinite" path={d} begin={`${1.6 + TARGETS.indexOf(m) * 0.4}s`} />
                  <animate attributeName="opacity" values="0;1;1;0" dur="3.2s" repeatCount="indefinite" begin={`${1.6 + TARGETS.indexOf(m) * 0.4}s`} />
                </circle>
              )}
            </g>
          );
        })}

        {MAP_MARKERS.map((m) => {
          const home = m.code === "EG";
          return (
            <g key={m.code} data-pin>
              <circle cx={m.x} cy={m.y} r={home ? 34 : 24} fill="url(#pin-glow)" />
              <circle cx={m.x} cy={m.y} r={home ? 7 : 5.5} fill={home ? "#ffffff" : "#c4b5fd"} stroke="#070912" strokeWidth="2" />
            </g>
          );
        })}

        {MAP_MARKERS.map((m) => {
          const pos = LABEL_POS[m.code] ?? { dx: 12, dy: 5, anchor: "start" as const };
          return (
            <text
              key={m.code}
              data-label
              x={m.x + pos.dx}
              y={m.y + pos.dy}
              textAnchor={pos.anchor}
              className="fill-text font-sans text-[17px] font-medium max-sm:hidden"
            >
              {m.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
