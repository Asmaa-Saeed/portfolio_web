import { Marquee } from "@/components/ui/Marquee";

const TOOLS = [
  "n8n", "OpenAI", "Claude", "LangChain", "MCP", "Python", "Flask", "PostgreSQL", "RAG", "Docker",
  "Make", "FFmpeg", "Next.js", "React", "TypeScript", "Tailwind CSS",
];

export function Tools() {
  return (
    <section aria-label="Tools I work with" className="relative border-y border-line/60 bg-surface/40 py-7 backdrop-blur-sm">
      <Marquee duration={45}>
        {TOOLS.map((tool) => (
          <span key={tool} className="flex items-center gap-10 pr-10 font-display text-lg font-medium text-muted sm:text-xl">
            {tool}
            <span aria-hidden="true" className="size-1.5 rounded-full bg-accent/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
