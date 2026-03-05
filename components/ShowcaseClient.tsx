"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { BuildingWindow } from "./ProjectUnit";

interface ShowcaseClientProps {
  projects: Project[];
}

const DONG_NAMES = ["AI", "Marketing", "Small Biz"];

function Building({
  name,
  displayFloors,
  projects,
  index,
}: {
  name: string;
  displayFloors: number;
  projects: Project[];
  index: number;
}) {
  const sorted = [...projects].sort((a, b) => a.floor - b.floor);
  const floors: { num: number; windows: (Project | null)[] }[] = [];

  for (let f = displayFloors - 1; f >= 0; f--) {
    const floorProjects = sorted.filter((p) => p.floor === f);
    floors.push({
      num: f,
      windows: [floorProjects[0] ?? null, floorProjects[1] ?? null],
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1, delay: index * 0.18, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col flex-1 min-w-0"
      style={{ maxWidth: 320 }}
    >
      {/* Building name — above the roof */}
      <div className="text-center mb-3">
        <span
          className="text-[11px] sm:text-[13px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-serif-en)", color: "#71717A" }}
        >
          {name}
        </span>
      </div>

      {/* Rooftop structures — unified, symmetric */}
      <div className="flex items-end justify-center gap-3 px-8 mb-px">
        <div className="w-4 sm:w-5 h-2 sm:h-3 rounded-t-sm" style={{ backgroundColor: "#A1A1AA", border: "1px solid #BBBBC5", borderBottom: "none" }} />
        <div className="flex flex-col items-center">
          <div className="w-px h-4 sm:h-6" style={{ backgroundColor: "#D4D4D8" }} />
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#7C5AC9", boxShadow: "0 0 6px rgba(124,90,201,0.3)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="w-3 sm:w-4 h-1.5 sm:h-2 rounded-t-sm" style={{ backgroundColor: "#BBBBC5", border: "1px solid #A1A1AA", borderBottom: "none" }} />
      </div>

      {/* Roof — cornice detail */}
      <div className="relative">
        <div className="h-1 rounded-t-[3px] mx-[-1px]" style={{ backgroundColor: "#A1A1AA" }} />
        <div className="h-1.5 sm:h-2" style={{ backgroundColor: "#BBBBC5" }} />
      </div>

      {/* Floors */}
      <div
        style={{
          backgroundColor: "#E4E4EA",
          borderLeft: "2.5px solid #D4D4D8",
          borderRight: "2.5px solid #D4D4D8",
          boxShadow: "inset 2px 0 0 rgba(255,255,255,0.15), inset -2px 0 0 rgba(255,255,255,0.15)",
        }}
      >
        {floors.map(({ num, windows }, fi) => (
          <div key={num}>
            {fi > 0 && (
              <div className="mx-1 sm:mx-2" style={{ height: 2, backgroundColor: "#DDDDE2", borderRadius: 1 }} />
            )}
            <div className="relative">
              {/* Floor number — absolute so it doesn't shift the grid */}
              <div className="absolute left-1 sm:left-1.5 top-1/2 -translate-y-1/2 z-10">
                <span className="text-[7px] sm:text-[8px]" style={{ color: "#A1A1AA", fontFamily: "var(--font-serif-en)" }}>
                  {num + 1}F
                </span>
              </div>
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-2 sm:py-2.5">
                {windows.map((proj, wi) => (
                  <BuildingWindow key={proj?.id ?? `e-${index}-${num}-${wi}`} project={proj} floorNum={num} windowIndex={wi} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Entrance — refined proportions */}
      <div style={{
        backgroundColor: "#DDDDE2",
        borderLeft: "2.5px solid #D4D4D8",
        borderRight: "2.5px solid #D4D4D8",
        borderBottom: "3px solid #BBBBC5",
      }}>
        {/* Entrance floor line */}
        <div className="h-px" style={{ backgroundColor: "#D4D4D8" }} />
        <div className="flex items-end h-12 sm:h-16">
          {/* Left wall */}
          <div className="flex-1 h-full" style={{ backgroundColor: "#DDDDE2" }} />
          {/* Door frame */}
          <div className="w-14 sm:w-18 h-full flex flex-col">
            {/* Canopy */}
            <div className="h-2 mx-[-6px] rounded-t-sm relative" style={{ backgroundColor: "#BBBBC5" }}>
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "#A1A1AA" }} />
            </div>
            {/* Door panels */}
            <div className="flex-1 flex gap-[1px]" style={{ backgroundColor: "#A1A1AA" }}>
              {[0, 1].map((d) => (
                <div key={d} className="flex-1 relative" style={{
                  backgroundColor: "#18181B",
                  backgroundImage: "linear-gradient(180deg, rgba(255,200,120,0.02) 0%, rgba(255,200,120,0.06) 100%)",
                }}>
                  <div className={`absolute top-1/2 -translate-y-1/2 ${d === 0 ? "right-1" : "left-1"}`}>
                    <div className="w-[2px] h-2.5 sm:h-3.5 rounded-full" style={{ backgroundColor: "#9A8B7E", boxShadow: "0 0 3px rgba(196,149,106,0.25)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right wall */}
          <div className="flex-1 h-full" style={{ backgroundColor: "#DDDDE2" }} />
        </div>
      </div>
    </motion.div>
  );
}

export function ShowcaseClient({ projects }: ShowcaseClientProps) {
  const buildings = DONG_NAMES.map((name, i) => {
    const dongProjects = projects.filter((p) => p.unit === i);
    const maxFloorInDong = Math.max(...dongProjects.map((p) => p.floor), -1);
    return {
      name,
      totalFloors: maxFloorInDong + 1,
      projects: dongProjects,
    };
  });

  // All buildings render with the same height
  const globalMaxFloors = Math.max(...buildings.map((b) => b.totalFloors), 1);
  const totalProjects = projects.length;
  const maxFloor = Math.max(...projects.map((p) => p.floor), 0);

  return (
    <section id="showcase" className="relative py-24 sm:py-36 overflow-hidden" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Morning sky gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #EEEEF5 0%, #FAFAFA 45%)" }} />

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-10" style={{ backgroundColor: "#E4E4E7" }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#71717A" }}>
              Our Complex
            </span>
            <div className="h-px w-10" style={{ backgroundColor: "#E4E4E7" }} />
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] font-bold mb-5">
            <span style={{ color: "#18181B" }}>불 켜진 </span>
            <span style={{ color: "#7C5AC9" }}>창문</span>
            <span style={{ color: "#18181B" }}>들</span>
          </h2>
          <p className="text-[14px] leading-[1.85]" style={{ color: "#52525B" }}>
            불 켜진 창문에 마우스를 올려보세요.
          </p>
        </motion.div>

        {/* 3 Buildings — equal heights */}
        <div className="flex items-end justify-center gap-2 sm:gap-6 lg:gap-8">
          {buildings.map((b, i) => (
            <Building
              key={b.name}
              name={b.name}
              displayFloors={globalMaxFloors}
              projects={b.projects}
              index={i}
            />
          ))}
        </div>

        {/* Ground — paved strip */}
        <div>
          <div className="relative" style={{ height: 6, backgroundColor: "#D4D4D8", borderTop: "2px solid #BBBBC5" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 5%, rgba(124,90,201,0.05) 50%, transparent 95%)" }} />
          </div>
          {/* Sidewalk texture */}
          <div className="h-2" style={{ backgroundColor: "#DDDDE2" }} />
          <div className="text-center mt-6 sm:mt-8">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-6" style={{ backgroundColor: "#E4E4E7" }} />
              <span className="text-[8px] sm:text-[10px] tracking-[0.5em] uppercase" style={{ color: "#A1A1AA" }}>
                빌라 아파트 단지
              </span>
              <div className="h-px w-6" style={{ backgroundColor: "#E4E4E7" }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 mt-16 sm:mt-24 pt-8"
          style={{ borderTop: "1px solid rgba(124,90,201,0.12)" }}
        >
          {[
            { value: "80+", label: "빌더" },
            { value: String(totalProjects), label: "프로젝트" },
            { value: `${maxFloor + 1}F`, label: "현재 층수" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl sm:text-5xl block mb-2" style={{ fontFamily: "var(--font-serif-en)", color: "#18181B" }}>{stat.value}</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase" style={{ color: "#71717A" }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
