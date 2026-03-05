"use client";

import { motion } from "framer-motion";

interface WindowProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  lit?: boolean;
  delay?: number;
  blink?: boolean;
}

export function Window({
  x,
  y,
  width = 10,
  height = 14,
  lit = false,
  delay = 0,
  blink = false,
}: WindowProps) {
  if (blink) {
    return (
      <>
        <defs>
          <filter id={`glow-${x}-${y}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <motion.rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={1.5}
          fill="#ffd700"
          filter={`url(#glow-${x}-${y})`}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      </>
    );
  }

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={1.5}
      fill={lit ? "#ffd700" : "#0f1333"}
      stroke={lit ? "#f5a623" : "#1e2456"}
      strokeWidth={0.5}
      initial={{ opacity: 0 }}
      animate={{ opacity: lit ? [0.6, 1] : 1 }}
      transition={{
        delay,
        duration: lit ? 2 : 0.3,
        repeat: lit ? Infinity : 0,
        repeatType: "reverse",
      }}
    />
  );
}
