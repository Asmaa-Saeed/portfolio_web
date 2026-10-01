import { Robot, FlowArrow, ChartLineUp, Code } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DashboardVisual } from "./DashboardVisual";

const SERVICES = [
  {
    Icon: Robot,
    title: "AI Agents & Multi-Agent Systems",
    body: "Agents that reason over your data, call tools and hand work to each other, with clear limits on what they may do alone.",
  },
  {
    Icon: FlowArrow,
    title: "Workflow Automation",
    meta: "n8n · Make",
    body: "End-to-end automations across CRMs, messaging, spreadsheets and APIs, so repetitive work runs on its own.",
  },
  {
    Icon: Code,
    title: "Web Development",
    body: "Fast, accessible web apps and front ends built with Next.js, React and TypeScript.",
  },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="services-title"
          title="What I do"
          description="From a single automation to a team of cooperating agents, plus the dashboards that show you exactly what they are doing."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3 lg:grid-rows-3">
          <article className="group relative overflow-hidden rounded-2xl border border-accent/35 bg-gradient-to-br from-accent/[0.16] via-surface to-surface p-6 sm:p-8 md:col-span-3 lg:col-span-2 lg:row-span-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid size-12 place-items-center rounded-xl border border-accent/40 bg-accent/15 text-accent-soft">
                <ChartLineUp size={24} />
              </span>
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">Signature service</span>
            </div>
            <h3 className="mt-6 font-display text-2xl font-semibold text-text sm:text-3xl">Project Dashboards</h3>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-muted">
              Dashboards people actually open. Live KPIs, pipeline health and agent activity in one clear view, designed
              so a team can see what changed and decide what to do next.
            </p>
            <DashboardVisual />
          </article>

          {SERVICES.map(({ Icon, title, meta, body }) => (
            <article
              key={title}
              className="rounded-2xl border border-line bg-surface/80 p-6 backdrop-blur-sm transition-colors hover:border-accent/40 lg:col-start-3"
            >
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
                  <Icon size={22} />
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold leading-snug text-text">{title}</h3>
                  {meta && <p className="mt-0.5 text-xs text-accent-soft">{meta}</p>}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
