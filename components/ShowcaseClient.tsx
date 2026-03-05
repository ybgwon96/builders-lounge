"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";
import { ProjectUnit } from "./ProjectUnit";

interface ShowcaseClientProps {
  projects: Project[];
}

export function ShowcaseClient({ projects }: ShowcaseClientProps) {
  return (
    <section id="showcase" className="relative py-24 sm:py-36">
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto">
        {/* Header — asymmetric two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-20 mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim">
                Projects
              </span>
            </div>
            <h2 className="font-serif font-300 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.03em]">
              우리가 올리고 있는
              <br />
              <span className="italic text-gold">층수</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-end"
          >
            <p className="text-text-mid text-[14px] leading-[1.85]">
              각 호수를 클릭하면
              빌더의 쓰레드로 이동합니다.
            </p>
          </motion.div>
        </div>

        {/* Project list — editorial style */}
        <div className="border-t border-text">
          {projects.map((project, i) => (
            <ProjectUnit key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-8 mt-20 sm:mt-28 pt-8 border-t border-border"
        >
          {[
            { value: "80+", label: "빌더" },
            { value: "9", label: "프로젝트" },
            { value: "3F", label: "현재 층수" },
          ].map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <span className="font-serif text-4xl sm:text-5xl text-text font-300 block mb-1">
                {stat.value}
              </span>
              <span className="text-[11px] tracking-[0.2em] text-text-dim uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
