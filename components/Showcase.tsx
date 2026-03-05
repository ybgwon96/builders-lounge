import { getProjects } from "@/lib/projects";
import { ApartmentShowcase } from "./ApartmentShowcase";

export async function Showcase() {
  const projects = await getProjects();

  return (
    <section id="showcase" className="relative min-h-screen py-24 sm:py-32 px-4">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-villa-neon/[0.015] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block font-mono text-[11px] tracking-[0.3em] uppercase text-villa-neon/60 mb-4">
            Our Projects
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-5xl mb-4">
            우리가 올리고 있는{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-villa-glow to-villa-warm">
              층수
            </span>
          </h2>
          <p className="text-villa-muted max-w-md mx-auto">
            각 호수를 클릭하면 빌더의 쓰레드로 이동합니다
          </p>
        </div>

        {/* Apartment showcase */}
        <ApartmentShowcase projects={projects} />
      </div>
    </section>
  );
}
