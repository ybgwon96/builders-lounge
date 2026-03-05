"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { BuildingWindow } from "./ProjectUnit";

interface ShowcaseClientProps {
  projects: Project[];
}

const DONG_NAMES = ["AI", "마케팅", "자영업"];

function Building({
  name,
  totalFloors,
  projects,
  index,
}: {
  name: string;
  totalFloors: number;
  projects: Project[];
  index: number;
}) {
  const sorted = [...projects].sort((a, b) => a.floor - b.floor);
  const floors: { num: number; windows: (Project | null)[] }[] = [];

  for (let f = totalFloors - 1; f >= 0; f--) {
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
      className="flex flex-col flex-1"
      style={{ maxWidth: 340 }}
    >
      {/* Rooftop structures */}
      <div className="flex items-end justify-center gap-2 px-6 mb-px">
        {index === 0 && (
          <div className="flex flex-col items-center">
            <div className="w-px h-5 sm:h-8" style={{ backgroundColor: "#CCC5B9" }} />
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "#7C5AC9", boxShadow: "0 0 6px rgba(124,90,201,0.35)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        )}
        <div className="w-4 sm:w-5 h-2 sm:h-3 rounded-t-sm" style={{ backgroundColor: "#C8C1B4", border: "1px solid #B8B0A2", borderBottom: "none" }} />
        {index !== 0 && (
          <div className="flex flex-col items-center">
            <div className="w-px h-3 sm:h-5" style={{ backgroundColor: "#CCC5B9" }} />
            <motion.div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: index === 1 ? "#7C5AC9" : "#C8C1B4", boxShadow: index === 1 ? "0 0 5px rgba(124,90,201,0.3)" : "none" }}
              {...(index === 1 ? { animate: { opacity: [0.5, 1, 0.5] }, transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } } : {})}
            />
          </div>
        )}
        <div className="w-3 sm:w-4 h-1.5 sm:h-2 rounded-t-sm" style={{ backgroundColor: "#B8B0A2", border: "1px solid #A8A095", borderBottom: "none" }} />
      </div>

      {/* Roof */}
      <div className="h-1.5 sm:h-2 rounded-t-[3px]" style={{ backgroundColor: "#B8B0A2" }} />

      {/* Building name plate */}
      <div
        className="text-center py-2 sm:py-2.5 relative"
        style={{ backgroundColor: "#E0DAD0", borderLeft: "2px solid #CCC5B9", borderRight: "2px solid #CCC5B9" }}
      >
        <div
          className="inline-block px-3 sm:px-4 py-0.5 sm:py-1 rounded-sm"
          style={{ backgroundColor: "#FAF8F4", border: "1px solid #7C5AC9", boxShadow: "0 0 10px rgba(124,90,201,0.06)" }}
        >
          <span className="text-[9px] sm:text-[11px] tracking-[0.25em] font-bold" style={{ color: "#7C5AC9" }}>
            {name}동
          </span>
        </div>
      </div>

      {/* Floors */}
      <div
        className="flex-1"
        style={{
          backgroundColor: "#E0DAD0",
          borderLeft: "2px solid #CCC5B9",
          borderRight: "2px solid #CCC5B9",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 3px)",
        }}
      >
        {floors.map(({ num, windows }, fi) => (
          <div key={num}>
            {fi > 0 && <div className="h-[3px] mx-[-2px]" style={{ backgroundColor: "#D4CEC3" }} />}
            <div className="flex">
              <div className="w-5 sm:w-7 flex items-center justify-center shrink-0" style={{ borderRight: "1px solid #D4CEC3" }}>
                <span className="text-[7px] sm:text-[8px]" style={{ color: "#C8C1B4", fontFamily: "var(--font-serif-en)" }}>
                  {num + 1}F
                </span>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-1 sm:gap-1.5 p-1.5 sm:p-2">
                {windows.map((proj, wi) => (
                  <BuildingWindow key={proj?.id ?? `e-${index}-${num}-${wi}`} project={proj} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Entrance */}
      <div style={{ backgroundColor: "#D4CEC3", borderLeft: "2px solid #CCC5B9", borderRight: "2px solid #CCC5B9", borderBottom: "3px solid #B8B0A2" }}>
        <div className="h-px" style={{ backgroundColor: "#CCC5B9" }} />
        <div className="flex items-end h-14 sm:h-18">
          <div className="flex-1 h-full" style={{ backgroundColor: "#D4CEC3" }} />
          <div className="w-16 sm:w-20 h-full flex flex-col">
            {/* Canopy */}
            <div className="h-1.5 mx-[-4px] rounded-t-sm" style={{ backgroundColor: "#B8B0A2" }} />
            {/* Door panels */}
            <div className="flex-1 flex gap-px" style={{ backgroundColor: "#CCC5B9" }}>
              {[0, 1].map((d) => (
                <div key={d} className="flex-1 relative" style={{
                  backgroundColor: "rgba(26,22,18,0.9)",
                  border: "1px solid #B8B0A2",
                  borderBottom: "none",
                  backgroundImage: "linear-gradient(180deg, rgba(255,200,120,0.03) 0%, rgba(255,200,120,0.08) 100%)",
                }}>
                  <div className={`absolute top-1/2 -translate-y-1/2 ${d === 0 ? "right-1" : "left-1"}`}>
                    <div className="w-[2px] h-3 sm:h-4 rounded-full" style={{ backgroundColor: "#C4956A", boxShadow: "0 0 4px rgba(196,149,106,0.3)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 h-full" style={{ backgroundColor: "#D4CEC3" }} />
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

  const totalProjects = projects.length;
  const maxFloor = Math.max(...projects.map((p) => p.floor), 0);

  return (
    <section id="showcase" className="relative py-24 sm:py-36 overflow-hidden" style={{ backgroundColor: "#FAF8F4" }}>
      {/* Morning sky gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #EDE8F5 0%, #FAF8F4 45%)" }} />

      <div className="relative z-10 px-4 sm:px-8 lg:px-16 max-w-[1100px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 sm:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ backgroundColor: "#7C5AC9" }} />
            <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: "#9A9286" }}>
              Our Complex
            </span>
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] font-bold mb-4">
            <span style={{ color: "#1C1917" }}>우리가 올리고 있는 </span>
            <span style={{ color: "#7C5AC9" }}>층수</span>
          </h2>
          <p className="text-[14px] leading-[1.85]" style={{ color: "#6B6356" }}>
            불 켜진 창문에 마우스를 올려보세요.
          </p>
        </motion.div>

        {/* 3 Buildings */}
        <div className="flex items-end justify-center gap-3 sm:gap-5 lg:gap-8">
          {buildings.map((b, i) => (
            <Building key={b.name} name={b.name} totalFloors={b.totalFloors} projects={b.projects} index={i} />
          ))}
        </div>

        {/* Ground */}
        <div>
          <div className="h-1.5 relative" style={{ backgroundColor: "#D4CEC3", borderTop: "2px solid #CCC5B9", boxShadow: "0 4px 20px rgba(124,90,201,0.06)" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(124,90,201,0.04) 50%, transparent 90%)" }} />
          </div>
          <div className="text-center mt-5 sm:mt-7">
            <div className="inline-block px-5 py-1" style={{ border: "1px solid #DDD8CE", borderRadius: 2 }}>
              <span className="text-[8px] sm:text-[10px] tracking-[0.5em] uppercase" style={{ color: "#C8C1B4" }}>
                빌라 아파트 단지
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-8 mt-16 sm:mt-24 pt-8"
          style={{ borderTop: "1px solid rgba(124,90,201,0.15)" }}
        >
          {[
            { value: "80+", label: "빌더" },
            { value: String(totalProjects), label: "프로젝트" },
            { value: `${maxFloor + 1}F`, label: "현재 층수" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <span className="text-3xl sm:text-5xl block mb-1" style={{ fontFamily: "var(--font-serif-en)", color: "#1C1917" }}>{stat.value}</span>
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase" style={{ color: "#9A9286" }}>{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
