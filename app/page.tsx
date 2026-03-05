import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Showcase } from "@/components/Showcase";
import { CTA } from "@/components/CTA";
import { Curtain } from "@/components/Curtain";
import { FloatingNav } from "@/components/FloatingNav";

export default function Home() {
  return (
    <>
      <Curtain />
      <FloatingNav />
      <main className="relative">
        <Hero />
        <Marquee />
        <Showcase />
        <CTA />
      </main>
    </>
  );
}
