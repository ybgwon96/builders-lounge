"use client";

import { motion } from "framer-motion";
import { Window } from "./Window";

interface VillaProps {
  scale?: number;
  delay?: number;
}

export function Villa({ scale = 1, delay = 0 }: VillaProps) {
  return (
    <motion.svg
      width={70 * scale}
      height={90 * scale}
      viewBox="0 0 70 90"
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
    >
      {/* Shadow */}
      <ellipse cx={35} cy={88} rx={30} ry={3} fill="#050816" opacity={0.6} />

      {/* Roof */}
      <polygon points="35,8 2,36 68,36" fill="#161b45" stroke="#1e2456" strokeWidth={0.5} />
      <polygon points="35,8 2,36 68,36" fill="url(#roofGrad)" />
      <defs>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e2456" />
          <stop offset="100%" stopColor="#0f1333" />
        </linearGradient>
      </defs>

      {/* Body */}
      <rect x={8} y={36} width={54} height={50} fill="#0f1333" stroke="#1e2456" strokeWidth={0.5} rx={1} />

      {/* Ledge lines */}
      <line x1={8} y1={56} x2={62} y2={56} stroke="#1e2456" strokeWidth={0.3} />

      {/* Windows */}
      <Window x={15} y={42} lit delay={delay + 0.5} />
      <Window x={45} y={42} delay={delay + 0.8} />
      <Window x={15} y={64} delay={delay + 1} />
      <Window x={45} y={64} lit delay={delay + 1.3} />

      {/* Door */}
      <rect x={27} y={70} width={16} height={18} rx={8} ry={8} fill="#0a0e27" stroke="#1e2456" strokeWidth={0.5} />
      <motion.rect
        x={28}
        y={71}
        width={14}
        height={16}
        rx={7}
        ry={7}
        fill="#f5a623"
        opacity={0.15}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
      <circle cx={39} cy={79} r={1} fill="#f5a623" opacity={0.6} />
    </motion.svg>
  );
}
