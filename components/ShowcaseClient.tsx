"use client";

import { motion } from "framer-motion";
import { useRef, useMemo, useState, useCallback, useEffect } from "react";
import type { Project } from "@/lib/types";
import { BuildingWindow } from "./ProjectUnit";

interface ShowcaseClientProps {
  projects: Project[];
}

const DONG_NAMES = ["AI", "Marketing", "Small Biz", "B2B", "Utility", "Contents", "Platform", "Game"];
function useBuildingsPerPage() {
  const [perPage, setPerPage] = useState(2);
  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 640 ? 1 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return perPage;
}


function Building({
  name,
  displayFloors,
  projects,
  index,
  showFloorLabels = false,
}: {
  name: string;
  displayFloors: number;
  projects: Project[];
  index: number;
  showFloorLabels?: boolean;
}) {
  const byFloor = new Map<number, Project[]>();
  for (const p of projects) {
    const arr = byFloor.get(p.floor);
    if (arr) arr.push(p);
    else byFloor.set(p.floor, [p]);
  }

  const floors: { num: number; windows: (Project | null)[] }[] = [];
  for (let f = displayFloors - 1; f >= 0; f--) {
    const fp = byFloor.get(f);
    floors.push({
      num: f,
      windows: [fp?.[0] ?? null, fp?.[1] ?? null],
    });
  }

  return (
    <div
      className="flex flex-col flex-1 min-w-0"
      style={{ maxWidth: 420 }}
    >
      {/* Building name */}
      <div className="text-center mb-3">
        <span
          className="text-[11px] sm:text-[13px] tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-serif-en)", color: "#71717A" }}
        >
          {name}
        </span>
      </div>

      {/* Rooftop structures */}
      <div className="flex items-end justify-center gap-3 px-8 mb-px">
        <div className="w-4 sm:w-5 h-2 sm:h-3 rounded-t-sm" style={{ backgroundColor: "#C4A882", border: "1px solid #B89B74", borderBottom: "none" }} />
        <div className="flex flex-col items-center">
          <div className="w-px h-4 sm:h-6" style={{ backgroundColor: "#B89B74" }} />
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#C4713B", boxShadow: "0 0 8px rgba(196,113,59,0.5)" }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <div className="w-3 sm:w-4 h-1.5 sm:h-2 rounded-t-sm" style={{ backgroundColor: "#B89B74", border: "1px solid #C4A882", borderBottom: "none" }} />
      </div>

      {/* Roof — terracotta tile feel */}
      <div className="relative">
        <div className="h-1.5 rounded-t-[4px] mx-[-2px]" style={{ backgroundColor: "#C4875A" }} />
        <div className="h-2 sm:h-2.5" style={{ backgroundColor: "#D49B6E", borderBottom: "2px solid #B87D50" }} />
      </div>

      {/* Floors — warm villa wall */}
      <div
        style={{
          backgroundColor: "#F5F0E8",
          borderLeft: "3px solid #E8DFD2",
          borderRight: "3px solid #E8DFD2",
          boxShadow: "inset 2px 0 0 rgba(0,0,0,0.02), inset -2px 0 0 rgba(0,0,0,0.02)",
        }}
      >
        {floors.map(({ num, windows }, fi) => (
          <div key={num}>
            {fi > 0 && (
              <div className="mx-1 sm:mx-2" style={{ height: 2, backgroundColor: "#E0D6C8", borderRadius: 1 }} />
            )}
            <div className="relative">
              {showFloorLabels && (
                <div className="absolute right-full top-1/2 -translate-y-1/2 pr-2 sm:pr-3">
                  <span className="text-[10px] sm:text-[13px] whitespace-nowrap" style={{ fontFamily: "var(--font-serif-en)", color: "#71717A" }}>
                    {num + 1}F
                  </span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-1.5 sm:gap-2 px-2 sm:px-2.5 py-2 sm:py-2.5">
                {windows.map((proj, wi) => (
                  <BuildingWindow key={proj?.id ?? `e-${index}-${num}-${wi}`} project={proj} />
                ))}
              </div>
              {/* Balcony ledge */}
              <div className="mx-1" style={{ height: 3, backgroundColor: "#E0D6C8", borderRadius: "0 0 2px 2px", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }} />
            </div>
          </div>
        ))}
      </div>

      {/* Entrance */}
      <div style={{
        backgroundColor: "#F5F0E8",
        borderLeft: "3px solid #E8DFD2",
        borderRight: "3px solid #E8DFD2",
        borderBottom: "none",
      }}>
        <div className="h-px" style={{ backgroundColor: "#E0D6C8" }} />
        <div className="flex items-end h-12 sm:h-16">
          <div className="flex-1 h-full" style={{ backgroundColor: "#F5F0E8" }} />
          <div className="w-14 sm:w-18 h-full flex flex-col">
            <div className="h-2.5 mx-[-6px] rounded-t-[3px] relative" style={{ backgroundColor: "#C4875A" }}>
              <div className="absolute inset-x-0 bottom-0 h-px" style={{ backgroundColor: "#B87D50" }} />
            </div>
            <div className="flex-1 flex gap-[1px]" style={{ backgroundColor: "#D4C4B0" }}>
              {[0, 1].map((d) => (
                <div key={d} className="flex-1 relative" style={{
                  backgroundColor: "#5C4A3A",
                  backgroundImage: "linear-gradient(180deg, rgba(255,200,120,0.03) 0%, rgba(255,200,120,0.1) 100%)",
                }}>
                  <div className={`absolute top-1/2 -translate-y-1/2 ${d === 0 ? "right-1" : "left-1"}`}>
                    <div className="w-[2px] h-2.5 sm:h-3.5 rounded-full" style={{ backgroundColor: "#C4A872", boxShadow: "0 0 4px rgba(196,168,114,0.4)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 h-full" style={{ backgroundColor: "#F5F0E8" }} />
        </div>
      </div>
    </div>
  );
}


/* ── Background City Skyline — full-width, realistic proportions ── */
type BuildingTuple = [number, number, number, number, number];

const FAR_BUILDINGS: BuildingTuple[] = [
  [0,   50, 65, 150, 0.06], [70,  25, 50, 175, 0.07], [125, 60, 65, 140, 0.055],
  [195, 15, 45, 185, 0.08], [245, 45, 55, 155, 0.065], [305, 35, 48, 165, 0.07],
  [370, 75, 50, 125, 0.045], [425, 55, 45, 145, 0.05], [475, 85, 55, 115, 0.04],
  [535, 65, 45, 135, 0.05], [585, 80, 50, 120, 0.045], [640, 60, 40, 140, 0.05],
  [685, 75, 50, 125, 0.045], [740, 65, 45, 135, 0.05], [790, 80, 55, 120, 0.04],
  [870, 40, 55, 160, 0.065], [930, 20, 50, 180, 0.08], [985, 50, 60, 150, 0.06],
  [1050,10, 45, 190, 0.075], [1100,35, 55, 165, 0.065], [1160,25, 40, 175, 0.07],
];

const NEAR_BUILDINGS: BuildingTuple[] = [
  [5,   70, 55, 130, 0.09], [65,  45, 45, 155, 0.10], [115, 75, 58, 125, 0.08],
  [178, 35, 48, 165, 0.11], [230, 60, 60, 140, 0.09], [295, 50, 42, 150, 0.10],
  [360, 95, 45, 105, 0.06], [410, 80, 50, 120, 0.065], [465, 100, 42, 100, 0.055],
  [515, 85, 50, 115, 0.06], [570, 95, 42, 105, 0.055], [620, 78, 48, 122, 0.065],
  [675, 90, 45, 110, 0.06], [725, 82, 50, 118, 0.065], [780, 95, 42, 105, 0.055],
  [860, 60, 58, 140, 0.09], [923, 40, 48, 160, 0.11], [975, 65, 55, 135, 0.09],
  [1035,30, 45, 170, 0.10], [1085,55, 58, 145, 0.09], [1148,42, 52, 158, 0.10],
];

const SKYLINE_LIGHTS: [number, number][] = [
  [25,100],[25,125],[65,70],[65,100],[65,130],[110,105],[110,130],
  [155,60],[155,90],[155,130],[195,90],[195,120],[250,80],[250,110],
  [355,120],[355,140],[400,105],[400,130],[495,110],[495,135],
  [550,120],[600,100],[600,125],[645,115],[645,138],[690,105],[690,130],
  [790,108],[790,132],[840,100],
  [915,90],[915,120],[915,150],[960,65],[960,100],[960,140],
  [1010,95],[1010,125],[1055,55],[1055,90],[1055,130],
  [1100,80],[1100,115],[1150,70],[1150,105],[1150,140],
];

function BackgroundSkyline() {
  return (
    <svg
      viewBox="0 0 1200 200"
      preserveAspectRatio="none"
      className="absolute bottom-0 left-0 w-full h-full"
    >
      {FAR_BUILDINGS.map(([x, y, w, h, o], i) => (
        <rect key={`f${i}`} x={x} y={y} width={w} height={h}
          fill={`rgba(190,180,168,${o})`} />
      ))}
      {NEAR_BUILDINGS.map(([x, y, w, h, o], i) => (
        <rect key={`n${i}`} x={x} y={y} width={w} height={h}
          fill={`rgba(175,168,155,${o})`} />
      ))}
      {SKYLINE_LIGHTS.map(([x, y], i) => (
        <rect key={`l${i}`} x={x} y={y} width="2.5" height="2" rx="0.5"
          fill={i % 4 === 0 ? "rgba(255,215,140,0.22)" : "rgba(255,235,190,0.12)"} />
      ))}
    </svg>
  );
}


export function ShowcaseClient({ projects }: ShowcaseClientProps) {
  const { buildings, globalMaxFloors, totalProjects } = useMemo(() => {
    const b = DONG_NAMES.map((name, i) => {
      const dongProjects = projects.filter((p) => p.unit === i);
      const maxFloorInDong = Math.max(...dongProjects.map((p) => p.floor), -1);
      return { name, totalFloors: maxFloorInDong + 1, projects: dongProjects };
    });
    return {
      buildings: b,
      globalMaxFloors: Math.max(...b.map((x) => x.totalFloors), 4),
      totalProjects: projects.length,
    };
  }, [projects]);

  const perPage = useBuildingsPerPage();
  const totalPages = Math.ceil(buildings.length / perPage);
  const [page, setPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cooldown = useRef(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((p: number) => {
    setPage(Math.max(0, Math.min(p, totalPages - 1)));
  }, [totalPages]);

  // 트랙패드 좌우 스와이프
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) < 20 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (cooldown.current) return;
      cooldown.current = true;
      setTimeout(() => { cooldown.current = false; }, 400);
      if (e.deltaX > 0) setPage((p) => Math.min(p + 1, totalPages - 1));
      else setPage((p) => Math.max(p - 1, 0));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [totalPages]);

  // 터치 스와이프
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) < 50) return;
    if (dx < 0) goTo(page + 1);
    else goTo(page - 1);
  }, [goTo, page]);

  return (
    <section id="showcase" className="relative overflow-hidden" style={{ backgroundColor: "#FAFAFA" }}>
      {/* ── Top fade ── */}
      <div className="relative" style={{
        height: 120,
        background: "linear-gradient(180deg, #F5F3F0 0%, #FAFAFA 100%)",
      }} />

      {/* Main content area with padding */}
      <div className="relative py-24 sm:py-36">
        {/* ── Layer 0: Light sky gradient ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(180deg, #F0EBE4 0%, #F3EEE8 35%, #F6F2ED 55%, #FAFAFA 100%)",
      }} />

      {/* ── Layer 3: Background city skyline — behind buildings ── */}
      <div className="absolute inset-x-0 pointer-events-none" style={{ bottom: "22%", height: "45%" }}>
        <BackgroundSkyline />
      </div>


      {/* ── Content ── */}
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
            <div className="h-px w-10" style={{ backgroundColor: "#D8D4CE" }} />
            <span className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#71717A" }}>
              Our Complex
            </span>
            <div className="h-px w-10" style={{ backgroundColor: "#D8D4CE" }} />
          </div>
          <h2 className="text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] font-bold mb-5">
            <span style={{ color: "#18181B" }}>불 켜진 </span>
            <span style={{ color: "#D4925E" }}>창문</span>
            <span style={{ color: "#18181B" }}>들</span>
          </h2>
          <p className="text-[14px] leading-[1.85]" style={{ color: "#71717A" }}>
            불 켜진 창문에 마우스를 올려보세요.
          </p>
        </motion.div>

        {/* ── Scene: Building carousel ── */}
        <div className="relative z-10">
          {/* 좌우 화살표 */}
          {page > 0 && (
            <button
              onClick={() => goTo(page - 1)}
              className="absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-70"
              style={{ backgroundColor: "rgba(196,113,59,0.12)", backdropFilter: "blur(4px)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M12 4L6 10L12 16" stroke="#18181B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          {page < totalPages - 1 && (
            <button
              onClick={() => goTo(page + 1)}
              className="absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-100 opacity-70"
              style={{ backgroundColor: "rgba(196,113,59,0.12)", backdropFilter: "blur(4px)" }}
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M8 4L14 10L8 16" stroke="#18181B" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          <div
            ref={containerRef}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="overflow-hidden"
          >
            <motion.div
              animate={{ x: `-${page * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
            {Array.from({ length: totalPages }, (_, pageIdx) => {
              const pair = buildings.slice(
                pageIdx * perPage,
                pageIdx * perPage + perPage,
              );
              return (
                <div
                  key={pageIdx}
                  className="flex items-end justify-center gap-4 sm:gap-8 flex-shrink-0 w-full"
                >
                  {pair.map((b, i) => (
                    <Building
                      key={b.name}
                      name={b.name}
                      displayFloors={globalMaxFloors}
                      projects={b.projects}
                      index={i}
                      showFloorLabels={i === 0}
                    />
                  ))}
                </div>
              );
            })}
          </motion.div>
          </div>

          {/* Dot indicators */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className="w-2 h-2 rounded-full transition-colors"
                  style={{
                    backgroundColor: i === page ? "#C4713B" : "#D8D4CE",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-4 pt-4"
          style={{ borderTop: "1px solid rgba(196,113,59,0.15)" }}
        >
          <div className="text-center">
            <span className="text-3xl sm:text-5xl block mb-2" style={{ fontFamily: "var(--font-serif-en)", color: "#18181B" }}>{totalProjects}</span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase" style={{ color: "#71717A" }}>프로젝트</span>
          </div>
        </motion.div>
      </div>

      </div>

      {/* ── Bottom fade ── */}
      <div className="relative" style={{
        height: 120,
        background: "linear-gradient(180deg, #FAFAFA 0%, #F5F3F0 100%)",
      }} />
    </section>
  );
}
