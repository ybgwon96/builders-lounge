"use client";

import { motion, type Variants } from "framer-motion";
import { Skyline } from "./Skyline";
import { Stars } from "./Stars";

const textVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.15 * i,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden pt-20 pb-0"
    >
      {/* Gradient orbs */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-villa-neon/[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute top-[100px] right-[-200px] w-[400px] h-[400px] rounded-full bg-villa-glow/[0.02] blur-[100px] pointer-events-none" />

      {/* Stars */}
      <Stars />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex-1 flex flex-col justify-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-villa-steel/50 bg-villa-dark/50 backdrop-blur-sm text-xs tracking-[0.2em] text-villa-neon font-display uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-villa-cyan animate-pulse" />
            Builder&apos;s Lounge
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          custom={1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="font-display font-800 text-4xl sm:text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6"
        >
          <span className="text-villa-light">Build in Public</span>
          <br />
          <span className="text-villa-light">하는 </span>
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-villa-glow via-villa-warm to-villa-glow">
              한국 쓰레더들
            </span>
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-villa-glow via-villa-warm to-villa-glow blur-2xl opacity-40">
              한국 쓰레더들
            </span>
          </span>
          <span className="text-villa-light">의 모임</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-villa-muted font-body max-w-lg mx-auto mb-10 leading-relaxed"
        >
          함께 짓고, 함께 올라갑니다
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          custom={3}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href="#showcase"
            className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-display font-600 text-sm overflow-hidden transition-all"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-villa-glow to-villa-warm" />
            <span className="absolute inset-0 bg-gradient-to-r from-villa-glow to-villa-warm opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <span className="relative text-villa-void">프로젝트 둘러보기</span>
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg font-display font-600 text-sm border border-villa-steel/50 text-villa-muted hover:text-villa-light hover:border-villa-glow/30 transition-all backdrop-blur-sm"
          >
            입주 신청하기
          </a>
        </motion.div>
      </div>

      {/* Skyline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="relative z-10 w-full max-w-5xl h-[260px] sm:h-[320px] mx-auto"
      >
        <Skyline />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-villa-muted/50 font-display">
          Scroll
        </span>
        <motion.div
          className="w-px h-6 bg-gradient-to-b from-villa-muted/40 to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
