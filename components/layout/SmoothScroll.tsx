"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { lenisStore } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

/** Lenis smooth scrolling, driven by GSAP's ticker so ScrollTrigger stays in sync. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: false });
    lenisStore.set(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Honour a #hash in the URL on first load.
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) requestAnimationFrame(() => lenis.scrollTo(el as HTMLElement, { offset: -72, immediate: true }));
    }

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisStore.set(null);
    };
  }, []);
  return null;
}
