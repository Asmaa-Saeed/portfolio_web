import { Badge } from "@/components/ui/Badge";
import { HitlPipeline } from "./HitlPipeline";

export function ResponsibleAI() {
  return (
    <section
      id="responsible-ai"
      data-orb-palette="responsible"
      aria-labelledby="responsible-title"
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Badge>Responsible AI</Badge>
          <h2 id="responsible-title" className="sr-only">
            Responsible AI
          </h2>
          <blockquote className="mt-8">
            <p className="font-display text-3xl font-medium leading-[1.15] tracking-tight text-text text-balance sm:text-5xl lg:text-6xl">
              &ldquo;Who remains accountable when an AI system{" "}
              <span className="text-accent-soft">fails?</span>&rdquo;
            </p>
          </blockquote>
          <p className="mx-auto mt-8 max-w-[62ch] text-base leading-relaxed text-muted sm:text-lg">
            My focus has moved from building systems that can act to designing the guardrails and human-in-the-loop
            structures that keep AI accountable, especially for emerging markets in the Middle East.
          </p>
        </div>
        <HitlPipeline />
      </div>
    </section>
  );
}
