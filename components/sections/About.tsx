import { Robot, GlobeHemisphereEast, GraduationCap, Trophy, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import { CountUp } from "@/components/ui/CountUp";
import { WordLight } from "./WordLight";

type Stat = {
  Icon: typeof Robot;
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** Shows a trophy in front of the number. */
  trophy?: boolean;
};

const STATS: Stat[] = [
  { Icon: Robot, value: 25, suffix: "+", label: "AI agent & automation projects" },
  { Icon: GlobeHemisphereEast, value: 7, suffix: "+", label: "Countries served" },
  { Icon: GraduationCap, value: 1, trophy: true, label: "of 12 universities, national software engineering competition" },
  { Icon: RocketLaunch, value: 2026, from: 2020, label: "Founded Rovia AI" },
];

const STATEMENT =
  "I architect AI agents and multi-agent systems that reason, decide and act for real businesses, and the guardrails that keep them accountable.";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {STATS.map(({ Icon, value, from, prefix, suffix, label, trophy }) => (
            <li
              key={label}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-surface/80 p-4 backdrop-blur-sm sm:flex-row sm:items-center sm:p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
                <Icon size={22} />
              </span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 font-display text-2xl font-semibold text-text sm:text-[1.7rem]">
                  {trophy && <Trophy size={26} weight="fill" className="text-[#f5c451]" aria-label="First place" />}
                  <CountUp to={value} from={from} prefix={prefix} suffix={suffix} />
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-muted">{label}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-24 grid gap-10 sm:mt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)] lg:gap-16">
          <div>
            <h2 id="about-title" className="mb-6 text-sm font-medium text-accent-soft">
              About me
            </h2>
            <WordLight
              text={STATEMENT}
              className="font-display text-[1.7rem] font-medium leading-[1.25] tracking-tight sm:text-4xl lg:text-[2.8rem]"
            />
          </div>
          <div className="flex flex-col justify-end gap-6 border-t border-line pt-6 text-base leading-relaxed text-muted lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <p>
              I work at the point where automation meets accountability: agents that do real work, wired into the tools
              a business already uses, with people kept in the loop where the stakes are high.
            </p>
            <dl className="grid gap-4 text-sm">
              <div>
                <dt className="text-faint">Currently</dt>
                <dd className="mt-1 text-text">Freelance AI Automation Engineer</dd>
              </div>
              <div>
                <dt className="text-faint">Building</dt>
                <dd className="mt-1 text-text">Rovia AI, trust-first AI services for real estate</dd>
              </div>
              <div>
                <dt className="text-faint">Studied</dt>
                <dd className="mt-1 text-text">Business Information Systems, Assiut University</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
