"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/types";

function GlassPane() {
  return (
    <>
      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "#DDDDE2" }} />
      <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "#DDDDE2" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(238,238,245,0.3) 0%, transparent 50%)" }}
      />
    </>
  );
}

export function BuildingWindow({ project, floorNum, windowIndex }: { project: Project | null; floorNum: number; windowIndex: number }) {
  const [hovered, setHovered] = useState(false);
  const unit = `${floorNum + 1}0${windowIndex + 1}`;

  // Empty window — glass reflection
  if (!project) {
    return (
      <div className="relative">
        <div
          className="relative aspect-[5/3] rounded-[2px] overflow-hidden"
          style={{ border: "1.5px solid #D4D4D8" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(145deg, #EEEEF2 0%, #E6E6EA 40%, #EBEBEF 100%)" }}
          >
            <GlassPane />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] sm:text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(161,161,170,0.6)" }}>
                {unit}
              </span>
            </div>
          </div>
        </div>
        <div className="mx-[-1px]">
          <div className="h-[2px] rounded-b-sm" style={{ backgroundColor: "#A1A1AA" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.a
        href={project.thread_url}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[5/3] cursor-pointer overflow-hidden rounded-[2px]"
        animate={{ scale: hovered ? 1.12 : 1, zIndex: hovered ? 30 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div
          className="absolute inset-0"
          style={{
            border: hovered ? "2px solid #7C5AC9" : "1.5px solid #BBBBC5",
            borderRadius: 2,
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? "0 0 20px rgba(124,90,201,0.25), 0 6px 24px rgba(124,90,201,0.1)"
              : "0 0 8px rgba(154,139,126,0.08)",
          }}
        >
          {/* Dark interior — lit room visible from outside */}
          <div
            className="absolute inset-[1px] rounded-[1px] overflow-hidden"
            style={{ backgroundColor: "#18181B" }}
          >
            {/* Warm amber glow from interior light */}
            <div
              className="absolute inset-0"
              style={{
                background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(200,180,160,0.15), transparent 70%)",
              }}
            />
            {/* Subtle purple tint on hover */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(124,90,201,0.12), transparent 70%)",
                opacity: hovered ? 1 : 0,
              }}
            />
            {/* Window cross frame */}
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "rgba(161,161,170,0.15)" }} />
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "rgba(161,161,170,0.15)" }} />

            {/* Unit number overlay */}
            <AnimatePresence>
              {!hovered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-[10px] sm:text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(154,139,126,0.3)" }}>
                    {unit}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover: project info */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-between p-1.5 sm:p-2.5"
                  style={{
                    backgroundColor: "rgba(250,250,250,0.97)",
                    boxShadow: "inset 0 0 0 1px rgba(124,90,201,0.1)",
                  }}
                >
                  <div>
                    <p className="text-[8px] sm:text-[11px] font-bold leading-tight truncate" style={{ color: "#18181B" }}>
                      {project.name}
                    </p>
                    <p className="text-[6px] sm:text-[9px] mt-0.5 truncate" style={{ color: "#71717A" }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[6px] sm:text-[9px] font-medium" style={{ color: "#9A8B7E" }}>{project.builder_name}</span>
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="#7C5AC9" strokeWidth={1.5} />
                    </svg>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.a>

      {/* Window sill */}
      <div className="mx-[-1px]">
        <div className="h-[2px] rounded-b-sm" style={{ backgroundColor: "#A1A1AA" }} />
      </div>
    </div>
  );
}
