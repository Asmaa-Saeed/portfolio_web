import { ArrowUpRight, GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/Badge";
import { CopyEmail } from "./CopyEmail";
import { SITE } from "@/lib/site";

const PROFILES = [
  { href: SITE.linkedin, label: "LinkedIn", handle: "Asmaa Sakr", Icon: LinkedinLogo },
  { href: SITE.github, label: "GitHub", handle: "Asmaa-Saeed", Icon: GithubLogo },
];

export function Contact() {
  return (
    <section id="contact" data-orb-palette="contact" aria-labelledby="contact-title" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-end lg:gap-16">
        <div>
          <Badge>Get in touch</Badge>
          <h2
            id="contact-title"
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-text text-balance sm:text-6xl"
          >
            Let&rsquo;s build AI <span className="text-accent-soft">we can trust.</span>
          </h2>
          <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-muted sm:text-lg">
            Have an agent, an automation or a dashboard in mind? Tell me what you are trying to get done and
            let&rsquo;s work out the right system for it.
          </p>
        </div>

        <div className="space-y-3">
          <CopyEmail email={SITE.email} />
          <div className="grid gap-3 sm:grid-cols-2">
            {PROFILES.map(({ href, label, handle, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/80 p-5 backdrop-blur-sm transition-colors hover:border-accent/50"
              >
                <span className="grid size-11 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-accent-soft">
                  <Icon size={22} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-text">{label}</span>
                  <span className="block truncate text-xs text-muted">{handle}</span>
                </span>
                <ArrowUpRight size={18} className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-text" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
