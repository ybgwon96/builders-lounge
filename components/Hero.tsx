"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Abstract skyline buildings ── */
const SKYLINE = [
  { x: 1, w: 5, h: 24, wins: 3 },
  { x: 7.5, w: 3.5, h: 18, wins: 2 },
  { x: 12, w: 6, h: 38, wins: 5 },
  { x: 19.5, w: 4.5, h: 28, wins: 3 },
  { x: 25.5, w: 3, h: 20, wins: 2 },
  { x: 30, w: 7, h: 50, wins: 7, accent: true },
  { x: 38.5, w: 4, h: 32, wins: 4 },
  { x: 44, w: 5.5, h: 22, wins: 2 },
  { x: 51, w: 6.5, h: 56, wins: 8, accent: true },
  { x: 59, w: 4, h: 36, wins: 4 },
  { x: 64.5, w: 3.5, h: 26, wins: 3 },
  { x: 69.5, w: 7, h: 46, wins: 6, accent: true },
  { x: 78, w: 4.5, h: 30, wins: 3 },
  { x: 84, w: 5, h: 40, wins: 5 },
  { x: 90.5, w: 3.5, h: 22, wins: 2 },
  { x: 95, w: 4, h: 16, wins: 1 },
];

/* Deterministic "lit" pattern — no Math.random for SSR safety */
const LIT_PATTERN = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const skylineY = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ backgroundColor: "#FAFAFA" }}
    >
      {/* Sky gradient — soft morning tones matching Showcase */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #E8E8F2 0%, #EDEDF3 20%, #F2F2F6 45%, #F8F8FA 70%, #FAFAFA 100%)",
        }}
      />

      {/* Subtle warm radial from upper area */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 50% 40% at 65% 20%, rgba(154,139,126,0.04), transparent 60%)",
            "radial-gradient(ellipse 40% 35% at 30% 30%, rgba(124,90,201,0.02), transparent 50%)",
          ].join(", "),
        }}
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto text-center"
      >
        {/* Decorative line + tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3, ease }}
          className="flex items-center justify-center gap-4 mb-8 sm:mb-10"
        >
          <motion.div
            className="h-px w-8 sm:w-12"
            style={{ backgroundColor: "#D4D4D8" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
          />
          <span
            className="text-[clamp(0.75rem,1.4vw,1rem)] tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-serif-en)",
              fontStyle: "italic",
              color: "#71717A",
            }}
          >
            Where Builders Come Together
          </span>
          <motion.div
            className="h-px w-8 sm:w-12"
            style={{ backgroundColor: "#D4D4D8" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.4, ease }}
          />
        </motion.div>

        {/* Main heading */}
        <div className="overflow-hidden mb-4 sm:mb-5">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.5, ease }}
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[1.06] tracking-[-0.03em] font-bold"
            style={{ fontFamily: "var(--font-serif-kr)", color: "#18181B" }}
          >
            함께 짓는
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10 sm:mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.65, ease }}
            className="text-[clamp(3rem,8vw,6.5rem)] leading-[1.06] tracking-[-0.03em] font-bold"
            style={{ fontFamily: "var(--font-serif-kr)" }}
          >
            <span style={{ color: "#7C5AC9" }}>사람들</span>
            <span style={{ color: "#18181B" }}>의 공간</span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9, ease }}
          className="text-[14px] sm:text-[15px] leading-[1.85] mb-10 sm:mb-12 max-w-sm mx-auto"
          style={{ color: "#52525B" }}
        >
          한국 쓰레더들의 모임.
          <br />
          각자의 빌라에서 시작해, 함께 아파트를 올립니다.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1, ease }}
          className="flex items-center justify-center gap-5"
        >
          <a
            href="#showcase"
            className="group relative px-8 py-3.5 text-white text-[13px] font-medium tracking-[0.05em] overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_30px_rgba(124,90,201,0.2)]"
            style={{ backgroundColor: "#7C5AC9" }}
          >
            <span className="relative z-10">둘러보기</span>
            <div
              className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundColor: "#6344A8" }}
            />
          </a>
          <a
            href="#cta"
            className="group px-2 py-3.5 text-[13px] tracking-[0.05em] transition-all duration-300"
            style={{ color: "#52525B" }}
          >
            <span className="relative">
              입주 신청
              <span className="inline-block ml-1.5 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
              <span
                className="absolute left-0 -bottom-1 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: "rgba(124,90,201,0.4)" }}
              />
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Skyline silhouette ── */}
      <motion.div
        style={{ y: skylineY }}
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
      >
        <div className="relative h-[22vh] sm:h-[28vh]">
          {SKYLINE.map((b, bi) => (
            <motion.div
              key={bi}
              className="absolute bottom-0"
              style={{
                left: `${b.x}%`,
                width: `${b.w}%`,
                backgroundColor: b.accent ? "#DADAE2" : "#E2E2E8",
                borderLeft: "1px solid #D4D4DA",
                borderRight: "1px solid #D4D4DA",
                borderTop: "1.5px solid #CDCDD5",
              }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: `${b.h}%`, opacity: 1 }}
              transition={{
                duration: 1.4,
                delay: 1.2 + bi * 0.05,
                ease,
              }}
            >
              {/* Window grid */}
              <div className="absolute inset-x-[12%] top-[8%] bottom-[6%] flex flex-col justify-start gap-[3px] sm:gap-[4px]">
                {Array.from({ length: b.wins }).map((_, wi) => (
                  <div key={wi} className="grid grid-cols-2 gap-[2px] sm:gap-[3px]">
                    {[0, 1].map((col) => {
                      const lit = LIT_PATTERN[(bi * 3 + wi * 2 + col) % LIT_PATTERN.length];
                      return (
                        <div
                          key={col}
                          className="aspect-[1.3/1] rounded-[0.5px]"
                          style={{
                            backgroundColor: lit
                              ? "rgba(124,90,201,0.1)"
                              : "rgba(161,161,170,0.1)",
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Rooftop antenna for accent buildings */}
              {b.accent && (
                <>
                  <div
                    className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 w-px"
                    style={{
                      height: "12px",
                      backgroundColor: "#CDCDD5",
                    }}
                  />
                  <motion.div
                    className="absolute -top-[15px] sm:-top-[19px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: "#7C5AC9",
                      boxShadow: "0 0 6px rgba(124,90,201,0.3)",
                    }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{
                      duration: 2 + bi * 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </motion.div>
          ))}

          {/* Ground line */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              height: 3,
              backgroundColor: "#D4D4D8",
              borderTop: "1px solid #CDCDD5",
            }}
          />
        </div>
      </motion.div>

    </section>
  );
}
