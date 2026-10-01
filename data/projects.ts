/**
 * All project content lives here. To add a project, copy an entry, give it a
 * unique slug, and drop its media into /public:
 *   cover  → /public/covers/<slug>.jpg   (landscape, ~1600×1000)
 *   poster → /public/posters/<slug>.jpg  (vertical 9:16, ~1080×1920)
 *   video  → /public/videos/<slug>.mp4   (vertical 9:16)
 * For a YouTube demo use `video: { type: "youtube", id: "<video id>" }`.
 */

export type ProjectVideo =
  | { type: "file"; src: string }
  | { type: "youtube"; id: string };

export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  role: string;
  /** Optional; omitted from the role line when empty. */
  date?: string;
  cover: string;
  poster: string;
  video: ProjectVideo;
  /** 2–3 lines shown in the project row. */
  summary: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  links?: ProjectLink[];
};

export const projects: Project[] = [
  {
    slug: "rovia-ai",
    title: "Rovia AI",
    role: "Founder & AI Product Builder",
    date: "2026 – now",
    cover: "/covers/rovia-ai.jpg",
    poster: "/posters/rovia-ai.jpg",
    video: { type: "file", src: "/videos/rovia-ai.mp4" },
    summary:
      "AI services for real estate. Agents handle lead qualification, viewing scheduling, follow-up and client reactivation, while agents and brokers stay in control of every sensitive decision.",
    problem:
      "Real estate teams lose buyers and tenants to slow replies and forgotten follow-ups, but the conversations involve prices, offers and personal details that cannot be left to an unsupervised bot.",
    solution:
      "A multi-agent platform that qualifies inbound leads, matches them to listings, books and reschedules viewings, runs follow-up sequences and reactivates past clients. Anything sensitive, such as pricing or offers, is routed to the team for approval before it reaches a client.",
    result:
      "Routine messaging runs on its own, and every sensitive reply passes a human first. That makes AI usable in a market where trust decides who signs.",
    tags: ["Real Estate", "AI Agents", "HITL"],
  },
  {
    slug: "streak",
    title: "Streak",
    role: "Freelance AI Automation Engineer",
    date: "2025 – 2026",
    cover: "/covers/streak.jpg",
    poster: "/posters/streak.jpg",
    video: { type: "file", src: "/videos/streak.mp4" },
    summary:
      "A citizen-journalism agent framework. It processes local video reports, routes them for human approval and prepares approved stories for news distribution.",
    problem:
      "Local reports arrive as raw phone videos with no structure. Editors need to verify each one quickly without publishing anything unchecked.",
    solution:
      "An n8n pipeline that ingests submissions, processes video with FFmpeg, transcribes and summarises with GPT-4.1-mini, and stores everything in PostgreSQL. Each report goes to an editor for approval, then becomes a distribution-ready package.",
    result:
      "Editors review a structured brief instead of raw footage, and nothing is published without an explicit human sign-off.",
    tags: ["n8n", "PostgreSQL", "GPT-4.1-mini", "Python", "FFmpeg"],
  },
  {
    slug: "business-operations-agents",
    title: "Business Operations Agents",
    role: "AI Automation Engineer · Aatene",
    date: "2026 – now",
    cover: "/covers/business-operations-agents.jpg",
    poster: "/posters/business-operations-agents.jpg",
    video: { type: "file", src: "/videos/business-operations-agents.mp4" },
    summary:
      "RAG and human-in-the-loop agents that answer questions from company knowledge and carry out day-to-day operational tasks, with approval checkpoints where they matter.",
    problem:
      "Operational knowledge was scattered across documents and people, and repetitive requests took up the team's time.",
    solution:
      "Retrieval-augmented agents served from a Python/Flask backend and orchestrated with n8n. They ground answers in internal documents and pause for human review before taking consequential actions.",
    result:
      "The team gets grounded answers and automated routine work, while keeping the final say on anything that affects customers or money.",
    tags: ["RAG", "HITL", "Python", "Flask", "n8n", "OpenAI"],
  },
  {
    slug: "carousel-maker",
    title: "Carousel Maker",
    role: "AI Automation Engineer · Aatene",
    date: "2026",
    cover: "/covers/carousel-maker.jpg",
    poster: "/posters/carousel-maker.jpg",
    video: { type: "file", src: "/videos/carousel-maker.mp4" },
    summary:
      "n8n workflows that generate carousel copy and create or edit images with AI, then return the finished assets to a Laravel backend.",
    problem:
      "Producing social carousels meant writing copy, designing slides and uploading assets by hand for every post.",
    solution:
      "Webhook-driven n8n workflows call OpenAI for text and image generation or editing, assemble the results and post them back to the product's Laravel API.",
    result:
      "Users go from a brief to ready-to-publish slides inside the product, with the AI work fully handled behind the API.",
    tags: ["n8n", "OpenAI", "Laravel"],
  },
  {
    slug: "self-hosted-n8n-mcp",
    title: "Self-Hosted n8n + MCP",
    role: "Personal project",
    cover: "/covers/self-hosted-n8n-mcp.jpg",
    poster: "/posters/self-hosted-n8n-mcp.jpg",
    video: { type: "file", src: "/videos/self-hosted-n8n-mcp.mp4" },
    summary:
      "n8n self-hosted with Docker on a VPS and connected to Claude through the Model Context Protocol, so an AI assistant can discover and run workflows directly.",
    problem:
      "Hosted automation plans get expensive and limiting, and AI assistants had no safe way to trigger real workflows.",
    solution:
      "A Dockerised n8n instance on a VPS, exposed to Claude through MCP with a scoped set of workflows the assistant is allowed to call.",
    result:
      "Workflows can be triggered from a conversation, on infrastructure that is fully owned and controlled.",
    tags: ["n8n", "Docker", "MCP"],
  },
  // Template for the next project: uncomment and fill in.
  // {
  //   slug: "next-project",
  //   title: "",
  //   role: "",
  //   date: "",
  //   cover: "/covers/next-project.jpg",
  //   poster: "/posters/next-project.jpg",
  //   video: { type: "file", src: "/videos/next-project.mp4" },
  //   summary: "",
  //   problem: "",
  //   solution: "",
  //   result: "",
  //   tags: [],
  //   links: [{ label: "Live site", href: "https://" }],
  // },
];
