"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

interface ProjectUnitProps {
  project: Project;
  index: number;
}

export function ProjectUnit({ project, index }: ProjectUnitProps) {
  const unitNumber = `${project.floor + 1}0${project.unit + 1}`;

  return (
    <motion.a
      href={project.thread_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <div className="relative overflow-hidden rounded-lg border border-villa-steel/30 bg-gradient-to-b from-villa-dark/80 to-villa-navy/60 backdrop-blur-sm p-5 h-full transition-all duration-300 group-hover:border-villa-glow/40 group-hover:shadow-[0_0_30px_rgba(245,166,35,0.08)]">
        {/* Hover glow overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-villa-glow/[0.04] via-transparent to-transparent" />

        {/* Window light effect (top-right corner) */}
        <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-2 right-2 w-3 h-4 rounded-sm bg-villa-amber/20 shadow-[0_0_12px_rgba(255,215,0,0.3)]" />
        </div>

        {/* Unit number badge */}
        <div className="absolute top-3 right-3 font-mono text-[10px] tracking-wider text-villa-steel group-hover:text-villa-glow/60 transition-colors">
          {unitNumber}호
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="font-display font-700 text-base text-villa-light group-hover:text-white transition-colors mb-1.5 pr-12">
            {project.name}
          </h3>
          <p className="text-sm text-villa-muted/70 leading-relaxed mb-3 line-clamp-2">
            {project.description}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-villa-steel/40 flex items-center justify-center text-[9px] font-display font-600 text-villa-muted">
              {project.builder_name.charAt(0)}
            </div>
            <span className="text-xs font-display text-villa-neon/70 group-hover:text-villa-neon transition-colors">
              {project.builder_name}
            </span>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-villa-glow/0 to-transparent group-hover:via-villa-glow/30 transition-all duration-500" />
      </div>
    </motion.a>
  );
}
