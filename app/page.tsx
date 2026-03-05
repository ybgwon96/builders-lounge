import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-villa-neon/20 to-transparent" />
      <Showcase />
      <div className="h-px bg-gradient-to-r from-transparent via-villa-glow/20 to-transparent" />
      <CTA />
    </main>
  );
}
