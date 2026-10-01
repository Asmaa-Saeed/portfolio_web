import { GithubLogo, LinkedinLogo, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./Logo";
import { NAV_LINKS } from "./nav";
import { SITE } from "@/lib/site";

const SOCIALS = [
  { href: SITE.linkedin, label: "LinkedIn", Icon: LinkedinLogo },
  { href: SITE.github, label: "GitHub", Icon: GithubLogo },
  { href: `mailto:${SITE.email}`, label: "Email", Icon: EnvelopeSimple },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line/70 bg-bg/80 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-[34ch] font-display text-2xl font-medium leading-snug text-text text-balance sm:text-3xl">
              From building systems that can act, to building systems{" "}
              <span className="text-accent-soft">we can trust.</span>
            </p>
            <ul className="mt-8 flex gap-3">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent/60 hover:text-text"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h2 className="text-sm font-semibold text-text">Explore</h2>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map(({ id, label }) => (
                  <li key={id}>
                    <a href={`#${id}`} className="text-sm text-muted transition-colors hover:text-text">
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-text">Focus</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted">
                <li>AI agents</li>
                <li>Multi-agent systems</li>
                <li>Human-in-the-loop</li>
                <li>Workflow automation</li>
                <li>Project dashboards</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line/70 pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Asmaa Sakr. All rights reserved.</p>
          <p>Built with Next.js, Three.js and GSAP.</p>
        </div>
      </div>
    </footer>
  );
}
