"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const HERO_IMAGE = "/images/hero-seoul.jpg";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <motion.div style={{ y: imgY }} className="absolute inset-[-15%]">
          <Image
            src={HERO_IMAGE}
            alt="Seoul skyline"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </motion.div>

      {/* Overlay system — text readable left, photo vivid right */}
      {/* Bottom fade to page bg */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, #FAFAFA 0%, rgba(250,250,250,0.6) 20%, transparent 40%)" }} />
      {/* Left text shield — strong coverage for readability */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(250,250,250,0.95) 0%, rgba(250,250,250,0.8) 30%, rgba(250,250,250,0.15) 55%, transparent 70%)" }} />
      {/* Purple atmospheric tint — gives photo a cohesive cool-purple cast */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5, delay: 1.2 }}
        style={{
          background: [
            "radial-gradient(ellipse 70% 60% at 80% 30%, rgba(124,90,201,0.1), transparent 60%)",
            "linear-gradient(135deg, transparent 40%, rgba(124,90,201,0.04) 60%, rgba(124,90,201,0.08) 100%)",
          ].join(", "),
        }}
      />
      {/* Subtle top vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(24,24,27,0.08) 0%, transparent 25%)" }} />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto"
      >
        <div>
          {/* Decorative accent line */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease }}
            className="origin-left mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-px" style={{ backgroundColor: "#7C5AC9" }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "rgba(124,90,201,0.5)" }} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease }}
            className="flex flex-col gap-1"
          >
            <span
              className="block text-[clamp(1rem,1.8vw,1.4rem)] tracking-[0.15em] uppercase mb-3"
              style={{ fontFamily: "var(--font-serif-en)", fontStyle: "italic", color: "#52525B" }}
            >
              Where Builders Come Together
            </span>
            <span className="block text-[clamp(3rem,7vw,6rem)] leading-[1.08] tracking-[-0.02em] font-bold" style={{ color: "#18181B" }}>
              함께 짓는
            </span>
            <span className="block text-[clamp(3rem,7vw,6rem)] leading-[1.08] tracking-[-0.02em] font-bold" style={{ color: "#18181B" }}>
              <span style={{ color: "#7C5AC9" }}>사람들</span>의 공간
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease }}
            className="mt-10 lg:mt-14 text-[14px] sm:text-[15px] max-w-sm leading-[1.85]"
            style={{ color: "#52525B" }}
          >
            한국 쓰레더들의 모임.
            <br />
            각자의 빌라에서 시작해, 함께 아파트를 올립니다.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0, ease }}
            className="flex items-center gap-5 mt-10"
          >
            <a
              href="#showcase"
              className="group relative px-8 py-3.5 text-white text-[13px] font-medium tracking-[0.05em] overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(124,90,201,0.2)]"
              style={{ backgroundColor: "#7C5AC9" }}
            >
              <span className="relative z-10">둘러보기</span>
              <div className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" style={{ backgroundColor: "#6344A8" }} />
            </a>
            <a
              href="#cta"
              className="group px-2 py-3.5 text-[13px] tracking-[0.05em] transition-all duration-300"
              style={{ color: "#52525B" }}
            >
              <span className="relative">
                입주 신청
                <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute left-0 -bottom-1 w-0 h-px group-hover:w-full transition-all duration-300" style={{ backgroundColor: "rgba(124,90,201,0.4)" }} />
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          className="w-px h-6"
          style={{ backgroundColor: "rgba(124,90,201,0.3)" }}
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "#A1A1AA" }}>scroll</span>
      </motion.div>
    </section>
  );
}
