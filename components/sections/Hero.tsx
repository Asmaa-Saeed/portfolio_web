import { ArrowRight, ArrowDown } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT_CTA } from "@/components/layout/nav";
import { WordRotator } from "./WordRotator";

const TAGLINE_WORDS = ["reasons", "decides", "acts", "we can trust"];

export function Hero() {
  return (
    <section
      id="hero"
      data-orb-palette="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-end pb-16 pt-28 lg:items-center lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-7xl px-5 sm:px-8 lg:grid-cols-2">
        <div className="max-w-[40rem]">
          <div className="rise-in" style={{ ["--delay" as string]: "50ms" }}>
            <Badge>AI Automation Engineer &amp; Web Developer</Badge>
          </div>
          <h1
            id="hero-title"
            className="rise-in mt-5 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-[3.7rem]"
            style={{ ["--delay" as string]: "150ms" }}
          >
            Hi, I&rsquo;m Asmaa Sakr
            <span className="mt-3 block text-[0.56em] font-medium leading-[1.15] text-muted">
              <span className="sr-only">Building AI that reasons, decides, acts, and that we can trust.</span>
              <span aria-hidden="true">
                Building AI that <WordRotator words={TAGLINE_WORDS} />
              </span>
            </span>
          </h1>
          <p
            className="rise-in mt-6 max-w-[46ch] text-base leading-relaxed text-muted sm:text-lg"
            style={{ ["--delay" as string]: "260ms" }}
          >
            AI agents, multi-agent systems and automations for real businesses, designed with the guardrails that
            keep them accountable.
          </p>
          <div className="rise-in mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "360ms" }}>
            <ButtonLink href="#projects">
              View projects
              <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline">
              {CONTACT_CTA}
            </ButtonLink>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs text-faint transition-colors hover:text-muted lg:flex"
      >
        <ArrowDown size={14} className="animate-bounce" />
        Scroll
      </a>
    </section>
  );
}
