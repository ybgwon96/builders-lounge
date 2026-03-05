"use client";

import { motion } from "framer-motion";

interface CraneProps {
  height?: number;
  delay?: number;
  flip?: boolean;
}

export function Crane({ height = 200, delay = 0, flip = false }: CraneProps) {
  const armLength = 50;

  return (
    <motion.svg
      width={70}
      height={height}
      viewBox={`0 0 70 ${height}`}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 0.6, y: 0 }}
      transition={{ duration: 1.2, delay }}
    >
      {/* Tower (lattice structure) */}
      <rect x={32} y={20} width={6} height={height - 24} fill="#1e2456" />
      <rect x={30} y={20} width={2} height={height - 24} fill="#161b45" />
      <rect x={38} y={20} width={2} height={height - 24} fill="#161b45" />

      {/* Cross bracing */}
      {Array.from({ length: Math.floor((height - 40) / 20) }).map((_, i) => (
        <g key={i}>
          <line
            x1={30}
            y1={24 + i * 20}
            x2={40}
            y2={44 + i * 20}
            stroke="#1e2456"
            strokeWidth={0.5}
          />
          <line
            x1={40}
            y1={24 + i * 20}
            x2={30}
            y2={44 + i * 20}
            stroke="#1e2456"
            strokeWidth={0.5}
          />
        </g>
      ))}

      {/* Operator cab */}
      <rect x={28} y={18} width={14} height={8} fill="#161b45" stroke="#1e2456" strokeWidth={0.5} rx={1} />
      <rect x={30} y={20} width={4} height={4} fill="#0ef6cc" opacity={0.15} rx={0.5} />

      {/* Arm */}
      <rect x={15} y={16} width={armLength} height={3} fill="#1e2456" rx={0.5} />

      {/* Counter-arm */}
      <rect x={5} y={16} width={12} height={3} fill="#1e2456" rx={0.5} />
      <rect x={4} y={12} width={6} height={8} fill="#161b45" stroke="#1e2456" strokeWidth={0.5} />

      {/* Cable */}
      <line x1={58} y1={19} x2={58} y2={70} stroke="#f5a623" strokeWidth={0.5} opacity={0.6} />

      {/* Hook */}
      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: delay + 1,
        }}
      >
        <circle cx={58} cy={72} r={3} fill="none" stroke="#f5a623" strokeWidth={0.8} opacity={0.6} />
        <line x1={58} y1={69} x2={58} y2={72} stroke="#f5a623" strokeWidth={0.8} opacity={0.6} />
      </motion.g>

      {/* Warning light on top */}
      <motion.circle
        cx={35}
        cy={14}
        r={2}
        fill="#ff6b35"
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: delay + 0.5 }}
      />
    </motion.svg>
  );
}
