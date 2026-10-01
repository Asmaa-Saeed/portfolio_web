"use client";

import { Fragment, useRef } from "react";
import { Robot, ShieldCheck, UserCheck, Lightning } from "@phosphor-icons/react/dist/ssr";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

const STEPS = [
  { Icon: Robot, title: "Agent proposes", body: "Drafts a reply, decision or action from the context it has." },
  { Icon: ShieldCheck, title: "Guardrails check", body: "Policy, safety and confidence checks run automatically." },
  { Icon: UserCheck, title: "Human reviews", body: "Sensitive or low-confidence cases go to a person to approve or edit." },
  { Icon: Lightning, title: "Action executes", body: "Only approved actions reach customers or connected systems." },
];

/** Animated agent → guardrails → human → action flow, looping while in view. */
export function HitlPipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const nodes = gsap.utils.toArray<HTMLElement>("[data-node]");
      const links = gsap.utils.toArray<HTMLElement>("[data-link]");
      if (reduced) {
        gsap.set(nodes, { "--on": 1 });
        gsap.set(links, { "--p": 1 });
        return;
      }
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.2,
        paused: true,
        defaults: { ease: "power2.inOut" },
      });
      tl.set(nodes, { "--on": 0 }).set(links, { "--p": 0 });
      nodes.forEach((node, i) => {
        tl.to(node, { "--on": 1, duration: 0.45 });
        if (links[i]) tl.to(links[i], { "--p": 1, duration: 0.7 });
      });
      tl.to({}, { duration: 1.4 }).to([...nodes, ...links], { "--on": 0, "--p": 0, duration: 0.5 });

      gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 10%",
          onToggle: (self) => (self.isActive ? tl.play() : tl.pause()),
        },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <ol
      ref={ref}
      aria-label="Human-in-the-loop pipeline"
      className="mx-auto mt-16 flex max-w-6xl flex-col items-stretch lg:mt-20 lg:flex-row lg:items-start"
    >
      {STEPS.map(({ Icon, title, body }, i) => (
        <Fragment key={title}>
          <li data-node className="group/node relative flex gap-4 lg:w-56 lg:flex-col lg:items-center lg:text-center" style={{ ["--on" as string]: 0 }}>
            <span
              className="relative grid size-14 shrink-0 place-items-center rounded-2xl border text-accent-soft transition-none"
              style={{
                borderColor: "color-mix(in oklab, var(--accent) calc(25% + var(--on) * 60%), transparent)",
                background: "color-mix(in oklab, var(--accent) calc(8% + var(--on) * 30%), var(--surface))",
                boxShadow: "0 0 calc(var(--on) * 40px) calc(var(--on) * -6px) rgba(139, 92, 246, 0.7)",
                color: "color-mix(in oklab, #ffffff calc(var(--on) * 100%), var(--accent-soft))",
              }}
            >
              <Icon size={26} />
            </span>
            <span className="pb-2 lg:pb-0">
              <span className="block text-xs text-faint">Step {i + 1}</span>
              <span className="mt-1 block font-display text-lg font-semibold text-text">{title}</span>
              <span className="mt-1.5 block text-sm leading-relaxed text-muted">{body}</span>
            </span>
          </li>
          {i < STEPS.length - 1 && (
            <li aria-hidden="true" className="ml-7 flex h-10 w-px lg:ml-0 lg:mt-7 lg:h-px lg:w-auto lg:flex-1">
              <span className="relative block h-full w-full bg-line-strong">
                <span
                  data-link
                  className="absolute inset-0 origin-top bg-gradient-to-b from-accent-soft to-accent [transform:scaleY(var(--p))] lg:origin-left lg:bg-gradient-to-r lg:[transform:scaleX(var(--p))]"
                  style={{ ["--p" as string]: 0 }}
                />
              </span>
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  );
}
