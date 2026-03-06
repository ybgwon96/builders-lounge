"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/types";

export function BuildingWindow({ project }: { project: Project | null }) {
  const [hovered, setHovered] = useState(false);

  // Empty window — dark, no project
  if (!project) {
    return (
      <div className="relative">
        <div
          className="relative aspect-[5/3] rounded-[2px] overflow-hidden"
          style={{ border: "1.5px solid #3F3F46" }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "#09090B" }}
          >
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
      {/* Window — always white lit */}
      <div
        className="relative aspect-[5/3] rounded-[2px] overflow-hidden"
        style={{
          border: hovered ? "2px solid #7C5AC9" : "1.5px solid #D4D4D8",
          backgroundColor: "#FAFAFA",
          transition: "border-color 0.3s",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-1">
          <span className="text-[8px] sm:text-[11px] font-bold leading-tight truncate max-w-full text-center" style={{ color: "#18181B" }}>
            {project.name}
          </span>
          <span className="text-[6px] sm:text-[8px] truncate max-w-full" style={{ color: "#71717A" }}>
            {project.builder_name}
          </span>
        </div>
      </div>

      {/* Hover: popup card */}
      <AnimatePresence>
        {hovered && (
          <motion.a
            href={project.thread_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 w-52 sm:w-64 rounded-lg p-3 sm:p-4 cursor-pointer"
            style={{
              backgroundColor: "#FFFFFF",
              border: "1.5px solid #7C5AC9",
              boxShadow: "0 8px 32px rgba(124,90,201,0.18), 0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <p className="text-[11px] sm:text-[14px] font-bold leading-snug" style={{ color: "#18181B" }}>
              {project.name}
            </p>
            <p className="text-[9px] sm:text-[12px] mt-1.5 leading-relaxed" style={{ color: "#52525B" }}>
              {project.description}
            </p>
            <div className="flex items-center justify-between mt-3 pt-2" style={{ borderTop: "1px solid #E4E4E7" }}>
              <span className="text-[9px] sm:text-[12px] font-medium" style={{ color: "#9A8B7E" }}>{project.builder_name}</span>
              <div className="flex items-center gap-1">
                <span className="text-[8px] sm:text-[10px]" style={{ color: "#7C5AC9" }}>바로가기</span>
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="#7C5AC9" strokeWidth={1.5} />
                </svg>
              </div>
            </div>
          </motion.a>
        )}
      </AnimatePresence>

      {/* Window sill */}
      <div className="mx-[-1px]">
        <div className="h-[2px] rounded-b-sm" style={{ backgroundColor: "#A1A1AA" }} />
      </div>
    </div>
  );
}
