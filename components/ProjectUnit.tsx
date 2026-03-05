"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/types";

function GlassPane() {
  return (
    <>
      <div className="absolute top-1/2 left-0 right-0 h-px" style={{ backgroundColor: "#D4CEC3" }} />
      <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ backgroundColor: "#D4CEC3" }} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(237,232,245,0.3) 0%, transparent 50%)" }}
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
          style={{ border: "1.5px solid #CCC5B9" }}
        >
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(145deg, #E8ECF0 0%, #DEE3E8 40%, #E4E8ED 100%)" }}
          >
            <GlassPane />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] sm:text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(180,173,163,0.6)" }}>
                {unit}
              </span>
            </div>
          </div>
        </div>
        <div className="mx-[-1px]">
          <div className="h-[2px] rounded-b-sm" style={{ backgroundColor: "#C8C1B4" }} />
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
            border: hovered ? "2px solid #7C5AC9" : "1.5px solid #CCC5B9",
            borderRadius: 2,
            transition: "border-color 0.3s, box-shadow 0.3s",
            boxShadow: hovered
              ? "0 0 20px rgba(124,90,201,0.25), 0 6px 24px rgba(124,90,201,0.1)"
              : "none",
          }}
        >
          {/* Glass background — same as empty window */}
          <div
            className="absolute inset-[1px] rounded-[1px] overflow-hidden"
            style={{ background: "linear-gradient(145deg, #E8ECF0 0%, #DEE3E8 40%, #E4E8ED 100%)" }}
          >
            <GlassPane />

            {/* Unit number overlay */}
            <AnimatePresence>
              {!hovered && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <span className="text-[10px] sm:text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(180,173,163,0.6)" }}>
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
                    backgroundColor: "rgba(250,248,244,0.97)",
                    boxShadow: "inset 0 0 0 1px rgba(124,90,201,0.1)",
                  }}
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
                    <span className="text-[6px] sm:text-[9px] font-medium" style={{ color: "#C4956A" }}>{project.builder_name}</span>
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
        <div className="h-[2px] rounded-b-sm" style={{ backgroundColor: "#C8C1B4" }} />
      </div>
    </div>
  );
}
