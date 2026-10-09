"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { OrbFallback } from "./OrbFallback";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { orbState, type OrbPaletteName } from "@/lib/orbState";

const OrbCanvas = dynamic(() => import("./OrbCanvas"), { ssr: false });

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Fixed layer behind the page that hosts the neural orb. Owns everything
 * around the canvas: lazy mounting, WebGL fallback, pointer tracking, the
 * scroll-driven drift/shrink/dim, and per-section palette changes.
 */
export function OrbStage() {
  const moverRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Defer the 3D bundle so it never competes with first paint: load it on the
  // first interaction, or once the page has been idle for a few seconds.
  // The CSS orb stands in until then and cross-fades out.
  useEffect(() => {
    let done = false;
    const events = ["pointermove", "pointerdown", "wheel", "touchstart", "keydown", "scroll"] as const;
    const start = () => {
      if (done) return;
      done = true;
      cleanup();
      if (supportsWebGL()) setMount(true);
      else setFailed(true);
    };
    const timer = window.setTimeout(start, 6000);
    const cleanup = () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, start));
    };
    events.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    return cleanup;
  }, []);

  // Pointer position relative to the orb's on-screen centre.
  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      const el = moverRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const radius = Math.min(r.width, r.height) * 0.42;
      orbState.pointer.x = (e.clientX - (r.left + r.width / 2)) / radius;
      orbState.pointer.y = -(e.clientY - (r.top + r.height / 2)) / radius;
      orbState.pointer.active = true;
    };
    const onLeave = () => {
      orbState.pointer.active = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  useGSAP(
    () => {
      const mover = moverRef.current;
      const hero = document.getElementById("hero");
      if (!mover || !hero) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const start = desktop
            ? { xPercent: 22, yPercent: 0, scale: 1, opacity: 1 }
            : { xPercent: 0, yPercent: -17, scale: 0.92, opacity: 1 };
          const end = desktop
            ? { xPercent: 42, yPercent: 4, scale: 0.5, opacity: 0.2 }
            : { xPercent: 32, yPercent: 0, scale: 0.5, opacity: 0.2 };

          gsap.set(mover, start);

          if (reduced) {
            ScrollTrigger.create({
              trigger: hero,
              start: "bottom 60%",
              onToggle: (self) => gsap.set(mover, self.isActive ? end : start),
            });
            return;
          }

          gsap.to(mover, {
            ...end,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom 15%",
              scrub: 0.8,
            },
          });
        },
      );

      document.querySelectorAll<HTMLElement>("[data-orb-palette]").forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (!self.isActive) return;
            orbState.palette = section.dataset.orbPalette as OrbPaletteName;
            orbState.invalidate();
          },
        });
      });

      return () => mm.revert();
    },
    { dependencies: [reduced] },
  );

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div ref={moverRef} className="absolute inset-0 will-change-transform">
        <div className="absolute left-1/2 top-1/2 aspect-square w-[min(60vh,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(138,99,167,0.3)_0%,rgba(106,70,153,0.08)_45%,transparent_70%)]" />
        <OrbFallback visible={!ready || failed} />
        {mount && !failed && (
          <OrbCanvas still={reduced} onReady={() => setReady(true)} onFail={() => setFailed(true)} />
        )}
      </div>
    </div>
  );
}
