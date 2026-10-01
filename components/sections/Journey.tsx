"use client";

import { useRef } from "react";
import { Briefcase, GraduationCap, Trophy, Certificate } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

const KINDS = {
  work: { Icon: Briefcase, label: "Experience" },
  study: { Icon: GraduationCap, label: "Education" },
  award: { Icon: Trophy, label: "Award" },
  program: { Icon: Certificate, label: "Program" },
} as const;

type Entry = { kind: keyof typeof KINDS; date?: string; title: string; org?: string; note?: string };

const ENTRIES: Entry[] = [
  { kind: "work", date: "Mar 2026 – now", title: "AI Automation Engineer", org: "Aatene" },
  { kind: "work", date: "2026 – now", title: "Founder", org: "Rovia AI" },
  { kind: "work", date: "2025 – 2026", title: "Freelance AI Automation Engineer", org: "Clients in 7 countries" },
  {
    kind: "study",
    date: "2021 – 2025",
    title: "B.Sc. Business Information Systems",
    org: "Assiut University",
  },
  {
    kind: "award",
    title: "1st place among 12 universities",
    org: "National Software Engineering Competition",
    note: "Recognized by the President of Assiut Technological University and the Governor of Assiut.",
  },
  {
    kind: "award",
    title: "1st place, university level",
    org: "Central Bank of Egypt & Egyptian Banking Institute competition",
  },
  { kind: "award", title: "ICPC", org: "International Collegiate Programming Contest" },
  {
    kind: "program",
    date: "2023 – 2025",
    title: "Programs",
    org: "McKinsey Forward (2024) · ITIDA Gigs (2025) · ITIDA & TIEC Women Entrepreneurship (2023)",
  },
];

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-progress]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: "[data-timeline]", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((el) => {
        gsap.from(el, {
          x: 24,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section id="journey" aria-labelledby="journey-title" className="relative py-20 sm:py-28">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="journey-title"
            title="The journey so far"
            description="From a business information systems degree and competitive programming to founding a company around trustworthy AI."
          />
        </div>

        <div data-timeline className="relative">
          <span aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-line-strong" />
          <span
            aria-hidden="true"
            data-progress
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top bg-gradient-to-b from-accent-soft via-accent to-accent/30"
          />
          <ol className="space-y-5">
            {ENTRIES.map((e) => {
              const { Icon, label } = KINDS[e.kind];
              return (
                <li key={e.title + e.org} data-entry className="relative flex gap-5">
                  <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-accent/40 bg-surface text-accent-soft">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-line bg-surface/75 p-5 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                      <span className="text-accent-soft">{label}</span>
                      {e.date && <span className="text-faint">{e.date}</span>}
                    </div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-text">{e.title}</h3>
                    {e.org && <p className="mt-1 text-sm text-muted">{e.org}</p>}
                    {e.note && <p className="mt-2 text-sm leading-relaxed text-faint">{e.note}</p>}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
