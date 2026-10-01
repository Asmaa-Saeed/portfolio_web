"use client";

import { useRef, type ReactNode } from "react";
import { Badge } from "./Badge";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Props = {
  id?: string;
  badge?: string;
  title: string;
  description?: ReactNode;
  align?: "start" | "center";
  className?: string;
};

/** Section title whose words slide up from behind a mask as it scrolls in. */
export function SectionHeading({ id, badge, title, description, align = "start", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const words = ref.current?.querySelectorAll("[data-word]");
      const extras = ref.current?.querySelectorAll("[data-fade]");
      if (!words?.length) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
      });
      tl.from(words, { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.06 });
      if (extras?.length) {
        tl.from(extras, { y: 16, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.08 }, 0.15);
      }
    },
    { scope: ref },
  );

  const centered = align === "center";
  return (
    <div ref={ref} className={`${centered ? "mx-auto text-center" : ""} ${className}`}>
      {badge && (
        <div data-fade className="mb-4">
          <Badge>{badge}</Badge>
        </div>
      )}
      <h2
        id={id}
        className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-text text-balance sm:text-4xl lg:text-5xl"
      >
        <span className="sr-only">{title}</span>
        <span aria-hidden="true">
          {title.split(" ").map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
              <span data-word className="inline-block">
                {word}
                {" "}
              </span>
            </span>
          ))}
        </span>
      </h2>
      {description && (
        <p
          data-fade
          className={`mt-4 max-w-[60ch] text-base leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
