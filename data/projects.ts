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
  /** A paragraph, or a list of steps shown as a numbered list. */
  solution: string | string[];
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
    cover: "/covers/rovia-ai-logo.jpg",
    poster: "/posters/rovia-ai-logo.jpg",
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
    slug: "aya-sofia-cafe-ai",
    title: "Aya Sofia Café AI Assistant",
    role: "Freelance AI Automation Engineer",
    cover: "/covers/aya-sofia-cafe-ai.jpg",
    poster: "/posters/aya-sofia-cafe-ai.jpg",
    video: { type: "file", src: "/videos/aya-sofia-cafe-ai.mp4" },
    summary:
      "An Instagram AI assistant for Aya Sofia Café. Customers order in DMs, the AI takes the full order, and the café runs everything from one live dashboard: orders, status updates, chats, analytics and the menu.",
    problem:
      "Instagram DMs are where the café's customers order, but answering every message, writing down orders and following up by hand does not scale at busy times.",
    solution: [
      "An AI agent in Instagram DMs that answers menu, delivery and pickup questions, takes the full order and confirms it with the customer's name, phone and total.",
      "New orders land on a live web dashboard instantly with a sound alert, so staff can accept and start preparing them.",
      "Automatic status updates: the customer is messaged on Instagram as the order moves from preparing to ready to delivered.",
      "Live chats with human takeover: complaints are flagged, staff can reply from the dashboard, and the bot pauses for a set time after a person steps in.",
      "Sales analytics and a customer CRM: revenue, order count, average order value, best-selling items and each customer's history.",
      "Menu and settings management: item availability, opening hours, and the bot's tone and reply style.",
    ],
    result:
      "Orders are taken in the channel customers already use, nothing gets lost at busy times, and staff stay in control from one dashboard.",
    tags: ["Instagram DM", "AI Agent", "Live Dashboard", "HITL", "CRM", "Analytics"],
  },
  {
    slug: "streak",
    title: "Streak",
    role: "Freelance AI Automation Engineer",
    date: "2025 – 2026",
    cover: "/covers/streak-logo.jpg",
    poster: "/posters/streak-logo.jpg",
    video: { type: "file", src: "/videos/streak.mp4" },
    summary:
      "A fully automated citizen news channel. People report local events through a Telegram bot, an admin approves each video, FFmpeg edits it in about 90 seconds, and the story is published automatically to the right governorate's page.",
    problem:
      "The client wanted a news channel fed by citizen reports, with a separate page for every governorate, while keeping AI API costs as close to zero as possible. That ruled out the usual approach of using AI for editing and captions.",
    solution: [
      "A Telegram bot where the reporter picks the governorate and area, describes the event and uploads the video. AI is used for one small step only: classifying the event.",
      "Admin review: every video goes to an admin who approves or rejects it, and the reporter is notified either way, with the reason when it is rejected.",
      "Automatic editing with free, open-source FFmpeg on a Hostinger server. In about 90 seconds the admin receives an edited video and caption, ready to publish.",
      "Automatic publishing to a large network of pages, one per governorate, plus a dashboard where the admin follows every submission and its statistics.",
    ],
    result:
      "A complete newsroom pipeline from a phone video to a published post, with almost no API cost, a human approving everything before it goes live, and one dashboard to run it all.",
    tags: ["Telegram Bot", "n8n", "FFmpeg", "PostgreSQL", "Python", "GPT-4.1-mini", "HITL"],
  },
  {
    slug: "omnichannel-ai-support",
    title: "Omnichannel AI Customer Support Platform",
    role: "AI Automation Engineer · Aatene",
    date: "2026",
    cover: "/covers/aatene-omnichannel.jpg",
    poster: "/posters/aatene-omnichannel.jpg",
    video: { type: "file", src: "/videos/omnichannel-ai-support.mp4" },
    summary:
      "The AI layer for an enterprise customer support platform. One AI assistant answers customers on the website, WhatsApp, Instagram, Facebook Messenger and the mobile app, and hands the conversation to a human when needed.",
    problem:
      "Customers reach the business on five different channels. Answering each one separately is slow and inconsistent, and some conversations still need a person to step in.",
    solution: [
      "Designed the AI automation layer behind a single assistant that serves the website, WhatsApp, Instagram, Facebook Messenger and the mobile app.",
      "Built Flask APIs that connect the platform's front ends to n8n automation workflows and OpenAI.",
      "Built RAG pipelines on Supabase Vector Store so answers come from the company's own knowledge base, plus automation that keeps that knowledge base trained.",
      "Built human handoff workflows that escalate a conversation to the support team whenever the assistant should not handle it alone.",
    ],
    result:
      "One assistant across every channel, answers grounded in company knowledge, and a clear path to a human when it matters.",
    tags: ["n8n", "Flask", "OpenAI", "RAG", "PostgreSQL", "Supabase", "HITL"],
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
      "n8n workflows that generate carousel copy and create or edit images with AI, then return the finished assets to the product backend.",
    problem:
      "Producing social carousels meant writing copy, designing slides and uploading assets by hand for every post.",
    solution:
      "Webhook-driven n8n workflows call OpenAI for text and image generation or editing, assemble the results and post them back to the product's API.",
    result:
      "Users go from a brief to ready-to-publish slides inside the product, with the AI work fully handled behind the API.",
    tags: ["n8n", "OpenAI", "Image generation"],
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
