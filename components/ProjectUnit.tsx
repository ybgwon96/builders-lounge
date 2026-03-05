"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/types";

export function BuildingWindow({ project }: { project: Project | null }) {
  const [hovered, setHovered] = useState(false);

  // Empty window — glass reflection (light blue-gray)
  if (!project) {
    return (
      <div className="relative">
        <div className="relative aspect-[5/3] rounded-[2px]" style={{ border: "1.5px solid #CCC5B9", backgroundColor: "#E8ECF0" }}>
          <div className="absolute inset-[2px] rounded-[1px]" style={{ backgroundColor: "#E8ECF0" }}>
            <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "#D4CEC3" }} />
            <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "#D4CEC3" }} />
          </div>
        </div>
        <div className="mt-0.5 mx-[-2px]">
          <div className="h-[2px]" style={{ backgroundColor: "#CCC5B9" }} />
          <div className="flex justify-between px-0.5 h-[4px]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-px h-full" style={{ backgroundColor: "#C8C1B4" }} />
            ))}
          </div>
          <div className="h-px" style={{ backgroundColor: "#CCC5B9" }} />
        </div>
      </div>
    );
  }

  const unit = `${project.floor + 1}0${project.unit + 1}`;

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
        className="block relative aspect-[5/3] cursor-pointer overflow-hidden"
        animate={{ scale: hovered ? 1.15 : 1, zIndex: hovered ? 30 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div
          className="absolute inset-0 rounded-[2px]"
          style={{
            border: hovered ? "2px solid #7C5AC9" : "1.5px solid #B8B0A2",
            backgroundColor: "#1A1612",
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? "0 0 25px rgba(124,90,201,0.25), 0 8px 30px rgba(124,90,201,0.1)"
              : "0 0 10px rgba(255,180,80,0.04)",
          }}
        >
          <div
            className="absolute inset-[2px] rounded-[1px] overflow-hidden"
            style={{
              background: hovered
                ? "linear-gradient(135deg, rgba(124,90,201,0.2) 0%, rgba(26,22,18,0.95) 60%, rgba(124,90,201,0.08) 100%)"
                : "linear-gradient(180deg, rgba(35,25,18,0.3) 0%, rgba(26,22,18,0.85) 70%, rgba(255,180,80,0.07) 100%)",
              transition: "background 0.5s",
            }}
          >
            {/* Cross frame */}
            <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: hovered ? 0.1 : 0.25 }}>
              <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "#3a3a3a" }} />
              <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "#3a3a3a" }} />
            </div>

            {/* Warm glow — interior light */}
            <div className="absolute inset-0 transition-opacity duration-700" style={{
              background: "radial-gradient(ellipse at 40% 70%, rgba(255,180,80,0.1), transparent 70%)",
              opacity: hovered ? 0 : 1,
            }} />

            {/* Default: unit number */}
            <AnimatePresence>
              {!hovered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-[10px] sm:text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(196,149,106,0.3)" }}>
                    {unit}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Hover: info — light popup */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex flex-col justify-between p-1.5 sm:p-2.5"
                  style={{ backgroundColor: "rgba(250,248,244,0.95)" }}
                >
                  <div>
                    <p className="text-[8px] sm:text-[11px] font-bold leading-tight truncate" style={{ color: "#1C1917" }}>
                      {project.name}
                    </p>
                    <p className="text-[6px] sm:text-[9px] mt-0.5 truncate" style={{ color: "#9A9286" }}>
                      {project.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[6px] sm:text-[9px]" style={{ color: "#C4956A" }}>{project.builder_name}</span>
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

      {/* Balcony railing */}
      <div className="mt-0.5 mx-[-2px]">
        <div className="h-[2px]" style={{ backgroundColor: "#CCC5B9" }} />
        <div className="flex justify-between px-0.5 h-[4px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-px h-full" style={{ backgroundColor: "#C8C1B4" }} />
          ))}
        </div>
        <div className="h-px" style={{ backgroundColor: "#CCC5B9" }} />
      </div>
    </div>
  );
}
