import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

const display = Sora({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Geist({ variable: "--font-body", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | ${SITE.title}`,
  description: SITE.description,
  keywords: [
    "AI automation engineer",
    "AI agents",
    "multi-agent systems",
    "human-in-the-loop",
    "n8n",
    "responsible AI",
    "Egypt",
    "Asmaa Sakr",
  ],
  authors: [{ name: SITE.name, url: SITE.linkedin }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | ${SITE.title}`,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#070912",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.title,
  email: `mailto:${SITE.email}`,
  url: SITE.url,
  sameAs: [SITE.linkedin, SITE.github],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Assiut University" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
