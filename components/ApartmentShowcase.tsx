"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { ProjectUnit } from "./ProjectUnit";

interface ApartmentShowcaseProps {
  projects: Project[];
}

export function ApartmentShowcase({ projects }: ApartmentShowcaseProps) {
  // Group by floor
  const floors = new Map<number, Project[]>();
  projects.forEach((p) => {
    const existing = floors.get(p.floor) ?? [];
    floors.set(p.floor, [...existing, p]);
  });

  const sortedFloors = Array.from(floors.entries()).sort(([a], [b]) => b - a);
  const totalFloors = sortedFloors.length;

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Building frame */}
      <div className="relative">
        {/* Rooftop */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-3"
        >
          <div className="relative">
            <div className="w-24 h-4 bg-villa-dark rounded-t-md border-t border-x border-villa-steel/30" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-4 bg-villa-mid rounded-t-sm border-t border-x border-villa-steel/20" />
            {/* Antenna */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-4 bg-villa-steel/40" />
            <motion.div
              className="absolute -top-7 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500/60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          </div>
        </motion.div>

        {/* Floor labels + grid */}
        <div className="relative border-x-2 border-villa-steel/15 px-3 sm:px-6 space-y-1">
          {sortedFloors.map(([floor, floorProjects], floorIndex) => (
            <div key={floor} className="relative">
              {/* Floor label */}
              <div className="absolute -left-8 sm:-left-12 top-1/2 -translate-y-1/2 font-mono text-[10px] text-villa-steel/40 tracking-wider">
                {floor + 1}F
              </div>

              {/* Floor divider */}
              {floorIndex < totalFloors - 1 && (
                <div className="absolute -bottom-0.5 left-0 right-0 h-px bg-villa-steel/10" />
              )}

              {/* Project units */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 py-1">
                {floorProjects.map((project, i) => (
                  <ProjectUnit
                    key={project.id}
                    project={project}
                    index={floorIndex * 3 + i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Foundation */}
        <div className="mt-2">
          <div className="h-3 bg-gradient-to-b from-villa-dark to-villa-void rounded-b-md border-b-2 border-x-2 border-villa-steel/15" />
          <div className="flex justify-center mt-2">
            <div className="h-1 w-3/4 bg-gradient-to-r from-transparent via-villa-steel/10 to-transparent rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
