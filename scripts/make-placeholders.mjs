// Renders on-brand placeholder covers (16:10) and posters (9:16) for every
// project in data/projects.ts. Replace the generated files with real media.
// Usage: node scripts/make-placeholders.mjs   (needs playwright-core + Chromium)
import { readFileSync } from "node:fs";
import { chromium } from "playwright-core";

const src = readFileSync(new URL("../data/projects.ts", import.meta.url), "utf8");
const projects = [...src.matchAll(/^\s{4}slug: "([^"]+)",\n\s{4}title: "([^"]+)",[\s\S]*?tags: \[([^\]]*)\]/gm)].map(
  ([, slug, title, tags]) => ({ slug, title, tags: [...tags.matchAll(/"([^"]+)"/g)].map((m) => m[1]) }),
);

const HUES = [265, 245, 285, 230, 300, 255];

function html({ title, tags }, i, w, h) {
  const hue = HUES[i % HUES.length];
  let seed = i * 9301 + 49297;
  const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  const cx = w * (h > w ? 0.5 : 0.68);
  const cy = h * (h > w ? 0.36 : 0.5);
  const R = Math.min(w, h) * (h > w ? 0.34 : 0.3);
  const nodes = Array.from({ length: 18 }, () => {
    const a = rnd() * Math.PI * 2;
    const r = R * (0.25 + rnd() * 0.85);
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * 0.9];
  });
  const edges = [];
  nodes.forEach((n, a) =>
    nodes.forEach((m, b) => {
      if (b > a && Math.hypot(n[0] - m[0], n[1] - m[1]) < R * 0.7) edges.push([n, m]);
    }),
  );
  const dots = Array.from({ length: 900 }, (_, k) => {
    const y = 1 - (k / 899) * 2;
    const rr = Math.sqrt(1 - y * y);
    const t = k * Math.PI * (3 - Math.sqrt(5));
    const z = Math.sin(t) * rr;
    return `<circle cx="${cx + Math.cos(t) * rr * R * 1.15}" cy="${cy + y * R * 1.15}" r="${1 + (z + 1) * 1.1}" fill="hsl(${hue} 90% 85%)" opacity="${0.08 + (z + 1) * 0.22}"/>`;
  }).join("");
  const portrait = h > w;
  return `<!doctype html><html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&display=swap');
  *{margin:0;box-sizing:border-box}
  body{width:${w}px;height:${h}px;overflow:hidden;font-family:Sora,system-ui,sans-serif;
    background:radial-gradient(circle at ${(cx / w) * 100}% ${(cy / h) * 100}%, hsl(${hue} 70% 26%) 0%, #0b0d1f 45%, #070912 80%);color:#eceaf7}
  svg{position:absolute;inset:0}
  .copy{position:absolute;left:${portrait ? 80 : 96}px;right:${portrait ? 80 : "auto"};bottom:${portrait ? 200 : 96}px;max-width:${portrait ? "none" : "52%"}}
  h1{font-size:${portrait ? 104 : 92}px;line-height:1.02;letter-spacing:-0.03em;font-weight:700}
  .tags{display:flex;flex-wrap:wrap;gap:12px;margin-top:32px}
  .tags span{border:1px solid hsl(${hue} 80% 70% / .35);background:hsl(${hue} 80% 60% / .14);color:hsl(${hue} 90% 85%);padding:10px 20px;border-radius:999px;font-size:${portrait ? 30 : 24}px}
  .note{position:absolute;top:${portrait ? 80 : 64}px;left:${portrait ? 80 : 96}px;font-size:${portrait ? 26 : 20}px;color:#9b9cb8;letter-spacing:.02em}
  </style></head><body>
  <svg width="${w}" height="${h}">${dots}
  ${edges.map(([a, b]) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="hsl(${hue} 90% 80%)" stroke-opacity=".22" stroke-width="2"/>`).join("")}
  ${nodes.map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="${k % 5 === 0 ? 10 : 5}" fill="${k % 5 === 0 ? "#fff" : `hsl(${hue} 90% 78%)`}"/>`).join("")}
  </svg>
  <div class="note">Placeholder · replace with project ${portrait ? "poster" : "cover"}</div>
  <div class="copy"><h1>${title}</h1><div class="tags">${tags.map((t) => `<span>${t}</span>`).join("")}</div></div>
  </body></html>`;
}

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage();
for (const [i, p] of projects.entries()) {
  for (const [dir, w, h] of [["covers", 1600, 1000], ["posters", 1080, 1920]]) {
    await page.setViewportSize({ width: w, height: h });
    await page.setContent(html(p, i, w, h), { waitUntil: "networkidle" });
    await page.screenshot({ path: `public/${dir}/${p.slug}.jpg`, type: "jpeg", quality: 82 });
  }
  console.log("rendered", p.slug);
}
await browser.close();
