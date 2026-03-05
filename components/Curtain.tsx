"use client";

import { motion } from "framer-motion";

const ease = [0.76, 0, 0.24, 1] as [number, number, number, number];

export function Curtain() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Purple curtain panel with circle clip reveal */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: "#7C5AC9" }}
        initial={{ clipPath: "circle(150% at 50% 50%)" }}
        animate={{ clipPath: "circle(0% at 50% 50%)" }}
        transition={{ duration: 1.2, delay: 0.8, ease }}
      />

      {/* Subtle lighter glow behind branding */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 1.2, times: [0, 0.15, 0.55, 1], ease: "easeInOut" }}
        style={{
          background: "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(255,255,255,0.12), transparent)",
        }}
      />

      {/* Center branding */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, times: [0, 0.15, 0.55, 1], ease: "easeInOut" }}
      >
        {/* Horizontal decorative lines */}
        <motion.div
          className="flex items-center gap-4 mb-2"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 1.2, times: [0, 0.2, 0.5, 1], ease: "easeInOut" }}
        >
          <div className="w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.55)" }} />
          <div className="w-12 h-px" style={{ backgroundColor: "rgba(255,255,255,0.35)" }} />
        </motion.div>

        <span
          className="text-5xl sm:text-7xl font-black tracking-tight"
          style={{ fontFamily: "var(--font-serif-kr)", color: "#FAF8F4" }}
        >
          빌라
        </span>
        <span
          className="text-sm sm:text-base tracking-[0.3em] italic"
          style={{ fontFamily: "var(--font-serif-en)", color: "rgba(250,248,244,0.6)" }}
        >
          Builder&apos;s Lounge
        </span>
      </motion.div>
    </div>
  );
}
