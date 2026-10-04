export const SITE = {
  name: "Asmaa Sakr",
  title: "AI Automation Engineer & Web Developer",
  description:
    "Asmaa Sakr designs AI agents and multi-agent systems that reason, decide and act for real businesses, with the guardrails that keep them accountable.",
  email: "asmaasaeed.dev@gmail.com",
  linkedin: "https://www.linkedin.com/in/asmaa-sakr-%E2%9C%AA-20a5a8274/",
  github: "https://github.com/Asmaa-Saeed",
  url: process.env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
} as const;
