import type Lenis from "lenis";

/** Module-level handle so the modal can pause smooth scrolling. */
let instance: Lenis | null = null;

export const lenisStore = {
  set(l: Lenis | null) {
    instance = l;
  },
  get() {
    return instance;
  },
};

export function lockScroll() {
  instance?.stop();
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
}

export function unlockScroll() {
  document.documentElement.style.overflow = "";
  document.body.style.paddingRight = "";
  instance?.start();
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) instance.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
