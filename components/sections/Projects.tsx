"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectRow } from "@/components/projects/ProjectRow";
import { DemoModal } from "@/components/projects/DemoModal";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((p: Project, trigger: HTMLElement) => {
    returnFocus.current = trigger;
    setActive(p);
  }, []);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="projects" data-orb-palette="projects" aria-labelledby="projects-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="projects-title"
          badge="Selected work"
          title="AI systems doing real work"
          description="Agents, pipelines and infrastructure I have designed and shipped. Each demo is a short vertical walkthrough."
        />
        <div className="mt-16 space-y-24 sm:mt-20 sm:space-y-32">
          {projects.map((project, i) => (
            <ProjectRow key={project.slug} project={project} index={i} onOpen={open} />
          ))}
        </div>
      </div>

      <AnimatePresence
        onExitComplete={() => {
          // The image button is aria-hidden, so return focus to the row's "View demo" button instead.
          const el = returnFocus.current;
          const target = el?.getAttribute("aria-hidden") === "true"
            ? el.closest("article")?.querySelector<HTMLElement>("[aria-haspopup='dialog']")
            : el;
          target?.focus({ preventScroll: true });
        }}
      >
        {active && <DemoModal key={active.slug} project={active} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
