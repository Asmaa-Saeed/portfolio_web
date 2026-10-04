"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowUpRight, Play } from "@phosphor-icons/react/dist/ssr";
import type { Project } from "@/data/projects";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/useReducedMotion";

type Props = { project: Project; index: number; onOpen: (p: Project, trigger: HTMLElement) => void };

export function ProjectRow({ project, index, onOpen }: Props) {
  const ref = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  useGSAP(
    () => {
      const root = ref.current;
      if (!root || prefersReducedMotion()) return;
      const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: "top 78%", once: true } });
      tl.from(root.querySelectorAll("[data-media]"), { x: flip ? 60 : -60, opacity: 0, duration: 1, ease: "power3.out" }).from(
        root.querySelectorAll("[data-copy] > *"),
        { y: 24, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.07 },
        0.15,
      );
    },
    { dependencies: [flip] },
  );

  const titleId = `project-${project.slug}`;
  const meta = [project.role, project.date].filter(Boolean).join(" · ");

  return (
    <article ref={ref} aria-labelledby={titleId} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div data-media className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <TiltCard className="group rounded-2xl" max={6}>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={(e) => onOpen(project, e.currentTarget)}
            className="relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <Image
              src={project.cover}
              alt=""
              fill
              sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
            <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-white/15 bg-bg/60 px-3.5 py-2 text-xs font-medium text-text backdrop-blur-md transition-colors group-hover:bg-accent">
              <Play size={12} weight="fill" />
              Watch demo
            </span>
          </button>
        </TiltCard>
      </div>

      <div data-copy className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <p className="text-sm text-accent-soft">{meta}</p>
        <h3 id={titleId} className="mt-3 font-display text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line bg-surface/80 px-3 py-1 text-xs text-muted">
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button onClick={(e) => onOpen(project, e.currentTarget)} aria-haspopup="dialog">
            <Play size={14} weight="fill" />
            View demo
          </Button>
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-text"
            >
              {link.label}
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
