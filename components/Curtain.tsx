"use client";

import { motion } from "framer-motion";

export function Curtain() {
  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex">
      {/* Left panel */}
      <motion.div
        className="w-1/2 h-full bg-text"
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Branding on curtain */}
        <div className="h-full flex items-center justify-end pr-6">
          <span className="font-serif italic text-2xl text-gold/80 tracking-wider">
            B.L
          </span>
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div
        className="w-1/2 h-full bg-text"
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
      >
        <div className="h-full flex items-center justify-start pl-6">
          <span className="font-serif italic text-2xl text-gold/80 tracking-wider">
            빌라
          </span>
        </div>
      </motion.div>
    </div>
  );
}
