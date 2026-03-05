"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { Window } from "./Window";

interface ApartmentProps {
  floors: number;
  width?: number;
  blinkUnit?: { floor: number; unit: number };
  delay?: number;
}

export function Apartment({
  floors,
  width = 120,
  blinkUnit,
  delay = 0,
}: ApartmentProps) {
  const floorHeight = 24;
  const roofHeight = 16;
  const height = floors * floorHeight + roofHeight + 10;
  const unitsPerFloor = 4;
  const windowW = 10;
  const windowH = 14;
  const padding = 12;
  const gap =
    (width - padding * 2 - unitsPerFloor * windowW) / (unitsPerFloor - 1);

  // Stable random pattern for lit windows
  const litPattern = useMemo(() => {
    const seed = floors * 100 + width;
    const pattern: boolean[][] = [];
    for (let f = 0; f < floors; f++) {
      const row: boolean[] = [];
      for (let u = 0; u < unitsPerFloor; u++) {
        const hash = Math.sin(seed + f * 13 + u * 7) * 10000;
        row.push(hash - Math.floor(hash) > 0.45);
      }
      pattern.push(row);
    }
    return pattern;
  }, [floors, width, unitsPerFloor]);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="filter drop-shadow-[0_0_40px_rgba(245,166,35,0.08)]"
    >
      <defs>
        <linearGradient id={`bldg-${floors}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#161b45" />
          <stop offset="100%" stopColor="#0a0e27" />
        </linearGradient>
        <filter id="windowGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Building body */}
      <motion.rect
        x={4}
        y={roofHeight}
        width={width - 8}
        height={height - roofHeight - 4}
        fill={`url(#bldg-${floors})`}
        stroke="#1e2456"
        strokeWidth={0.5}
        rx={2}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        style={{ originY: "100%" }}
        transition={{ duration: 1.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Roof structures */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 1.2, duration: 0.5 }}
      >
        <rect
          x={width / 2 - 12}
          y={4}
          width={24}
          height={roofHeight}
          fill="#161b45"
          stroke="#1e2456"
          strokeWidth={0.5}
          rx={1}
        />
        <rect
          x={width / 2 - 3}
          y={1}
          width={6}
          height={6}
          fill="#1e2456"
          rx={1}
        />
        {/* Antenna light */}
        <motion.circle
          cx={width / 2}
          cy={2}
          r={1.5}
          fill="#ff3333"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.g>

      {/* Floor dividers */}
      {Array.from({ length: floors - 1 }).map((_, i) => (
        <motion.line
          key={`divider-${i}`}
          x1={6}
          y1={roofHeight + (i + 1) * floorHeight}
          x2={width - 6}
          y2={roofHeight + (i + 1) * floorHeight}
          stroke="#1e2456"
          strokeWidth={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: delay + 0.8 + i * 0.05, duration: 0.3 }}
        />
      ))}

      {/* Windows per floor */}
      {Array.from({ length: floors }).map((_, floor) => {
        const floorY =
          height - 8 - (floor + 1) * floorHeight + (floorHeight - windowH) / 2;
        return Array.from({ length: unitsPerFloor }).map((_, unit) => {
          const windowX = padding + unit * (windowW + gap);
          const isBlink =
            blinkUnit?.floor === floor && blinkUnit?.unit === unit;
          const isLit = litPattern[floor]?.[unit] ?? false;

          return (
            <Window
              key={`${floor}-${unit}`}
              x={windowX}
              y={floorY}
              width={windowW}
              height={windowH}
              lit={isLit}
              blink={isBlink}
              delay={delay + 0.6 + floor * 0.08 + unit * 0.04}
            />
          );
        });
      })}

      {/* Ground shadow */}
      <ellipse
        cx={width / 2}
        cy={height - 2}
        rx={width / 2 - 2}
        ry={3}
        fill="#050816"
        opacity={0.5}
      />
    </svg>
  );
}
