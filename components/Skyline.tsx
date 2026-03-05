"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Villa } from "./buildings/Villa";
import { Apartment } from "./buildings/Apartment";
import { Crane } from "./buildings/Crane";

export function Skyline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const villaOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);
  const apartmentY = useTransform(scrollYProgress, [0, 0.5], [30, 0]);
  const craneY = useTransform(scrollYProgress, [0, 0.5], [0, -20]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full flex items-end justify-center"
    >
      {/* Ground line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-villa-steel/40 to-transparent" />

      {/* Ground glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[2px] bg-villa-glow/10 blur-sm" />

      <div className="flex items-end gap-1 sm:gap-3 pb-2">
        {/* Small villa left */}
        <motion.div style={{ opacity: villaOpacity }} className="hidden sm:block">
          <Villa scale={0.6} delay={1.2} />
        </motion.div>

        {/* Crane left */}
        <motion.div style={{ y: craneY }} className="hidden md:block">
          <Crane height={180} delay={0.8} />
        </motion.div>

        {/* Villa */}
        <motion.div style={{ opacity: villaOpacity }}>
          <Villa scale={0.8} delay={0.6} />
        </motion.div>

        {/* Main apartment */}
        <motion.div style={{ y: apartmentY }} className="relative">
          <Apartment floors={10} width={130} delay={0.2} />
        </motion.div>

        {/* Villa right */}
        <motion.div style={{ opacity: villaOpacity }}>
          <Villa scale={0.7} delay={0.9} />
        </motion.div>

        {/* Crane right */}
        <motion.div style={{ y: craneY }} className="hidden md:block">
          <Crane height={160} delay={1.0} flip />
        </motion.div>

        {/* Small villa right */}
        <motion.div style={{ opacity: villaOpacity }} className="hidden sm:block">
          <Villa scale={0.5} delay={1.4} />
        </motion.div>
      </div>
    </div>
  );
}
