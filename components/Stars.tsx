"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export function Stars({ count = 60 }: { count?: number }) {
  const stars = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const hash = Math.sin(i * 127.1 + i * 311.7) * 43758.5453;
      const frac = hash - Math.floor(hash);
      const hash2 = Math.sin(i * 269.5 + i * 183.3) * 43758.5453;
      const frac2 = hash2 - Math.floor(hash2);
      const hash3 = Math.sin(i * 419.2 + i * 371.9) * 43758.5453;
      const frac3 = hash3 - Math.floor(hash3);

      return {
        left: frac * 100,
        top: frac2 * 55,
        size: 0.5 + frac3 * 1.5,
        duration: 3 + frac3 * 5,
        delay: frac * 3,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{
            repeat: Infinity,
            duration: star.duration,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
