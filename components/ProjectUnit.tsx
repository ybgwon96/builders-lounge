"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

interface ProjectUnitProps {
  project: Project;
  index: number;
}

export function ProjectUnit({ project, index }: ProjectUnitProps) {
  const unit = `${project.floor + 1}0${project.unit + 1}`;
  const displayNum = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      href={project.thread_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border-b border-border last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        delay: index * 0.04,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] sm:grid-cols-[60px_1fr_120px_auto] items-center gap-4 sm:gap-8 py-6 sm:py-8 px-1 transition-all duration-500 group-hover:px-3">
        {/* Number */}
        <span className="font-serif text-3xl sm:text-4xl text-text-faint group-hover:text-gold transition-colors duration-500 leading-none">
          {displayNum}
        </span>

        {/* Main content */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-3 mb-1">
            <h3 className="font-sans font-semibold text-base sm:text-lg text-text group-hover:text-gold-hover transition-colors duration-300 truncate">
              {project.name}
            </h3>
            <span className="text-[10px] tracking-[0.15em] text-text-faint uppercase shrink-0 hidden sm:inline">
              Unit {unit}
            </span>
          </div>
          <p className="text-[13px] text-text-dim leading-relaxed truncate">
            {project.description}
          </p>
        </div>

        {/* Builder name — hidden on mobile */}
        <span className="text-[12px] text-text-dim hidden sm:block text-right">
          {project.builder_name}
        </span>

        {/* Arrow */}
        <div className="flex items-center justify-center w-8 h-8">
          <svg
            className="w-4 h-4 text-text-faint group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth={1}
            />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
