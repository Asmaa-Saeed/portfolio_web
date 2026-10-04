"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { CONTACT_CTA, NAV_LINKS } from "./nav";
import { buttonClass } from "@/components/ui/Button";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { lockScroll, scrollToId, unlockScroll } from "@/lib/lenis";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 40,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => self.isActive && setActive(id),
        onLeaveBack: () => id === NAV_LINKS[0].id && setActive(""),
      });
    });
  });

  useEffect(() => {
    if (!open) return;
    lockScroll();
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const trigger = menuButton.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
      trigger?.focus();
    };
  }, [open]);

  const go = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOpen(false);
    // Let the mobile menu release the scroll lock before scrolling.
    requestAnimationFrame(() => scrollToId(id));
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || open ? "border-b border-line/70 bg-bg/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#hero" onClick={go("hero")} aria-label="Asmaa Sakr, back to top" className="rounded-lg">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={go(id)}
                aria-current={active === id ? "true" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === id ? "text-text" : "text-muted hover:text-text"
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href="#contact" onClick={go("contact")} className={buttonClass("outline", "max-sm:!hidden !px-5 !py-2")}>
            {CONTACT_CTA}
          </a>
          <button
            ref={menuButton}
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line text-text lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="h-[calc(100dvh-68px)] overflow-y-auto border-t border-line/70 bg-bg/95 px-5 pb-10 pt-6 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ id, label }, i) => (
                <li key={id} className="border-b border-line/60">
                  <a
                    ref={i === 0 ? firstLink : undefined}
                    href={`#${id}`}
                    onClick={go(id)}
                    className="flex items-center justify-between py-4 font-display text-2xl font-medium text-text"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={go("contact")} className={buttonClass("primary", "mt-8 w-full")}>
              {CONTACT_CTA}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
