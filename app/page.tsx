import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { OrbStage } from "@/components/three/OrbStage";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Tools } from "@/components/sections/Tools";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Clients } from "@/components/sections/Clients";
import { ResponsibleAI } from "@/components/sections/ResponsibleAI";
import { Journey } from "@/components/sections/Journey";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-[200] -translate-y-20 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <OrbStage />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Tools />
        <Services />
        <Projects />
        <Clients />
        <ResponsibleAI />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
