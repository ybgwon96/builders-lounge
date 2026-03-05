import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Showcase } from "@/components/Showcase";
import { CTA } from "@/components/CTA";
import { Curtain } from "@/components/Curtain";

export default function Home() {
  return (
    <>
      <Curtain />
      <main className="relative">
        <Hero />
        <Marquee />
        <Showcase />
        <CTA />
      </main>
    </>
  );
}
