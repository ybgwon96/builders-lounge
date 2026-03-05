"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

// Looking up at modern glass tower — abstract, no city identity
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&q=85&auto=format&fit=crop";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
    >
      {/* LEFT — Typography */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col justify-between px-6 sm:px-10 lg:px-16 py-8 lg:py-12"
      >
        {/* Top nav */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex items-center justify-between"
        >
          <span className="text-[11px] tracking-[0.25em] uppercase text-text-mid font-sans">
            빌더 라운지
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-text-faint font-sans hidden sm:block">
            빌라 for Threaders
          </span>
        </motion.nav>

        {/* Center — headline */}
        <div className="py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
            className="flex items-center gap-3 mb-6 lg:mb-10"
          >
            <div className="h-px w-8 bg-gold" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim">
              Build in Public
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.4, ease }}
          >
            <span className="block font-serif font-300 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.035em] text-text">
              Where
            </span>
            <span className="block font-serif font-300 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.035em] text-text">
              Builders
            </span>
            <span className="block font-serif italic font-400 text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.88] tracking-[-0.035em] text-gold mt-2">
              Come Together
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease }}
            className="mt-8 lg:mt-12 text-text-mid text-[14px] sm:text-[15px] max-w-sm leading-[1.85]"
          >
            한국 쓰레더들의 모임.
            <br />
            각자의 빌라에서 시작해, 함께 아파트를 올립니다.
          </motion.p>
        </div>

        {/* Bottom — CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease }}
          className="flex items-center gap-4"
        >
          <a
            href="#showcase"
            className="group relative px-8 py-3.5 bg-text text-bg text-[13px] font-sans font-medium tracking-[0.05em] overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-text transition-colors duration-500">
              둘러보기
            </span>
            <div className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          </a>
          <a
            href="#cta"
            className="px-8 py-3.5 text-text-mid text-[13px] font-sans tracking-[0.05em] border-b border-transparent hover:border-text-dim transition-all duration-300"
          >
            입주 신청 →
          </a>
        </motion.div>
      </motion.div>

      {/* RIGHT — Image */}
      <div className="relative overflow-hidden lg:min-h-screen">
        <motion.div
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <motion.div style={{ y: imgY }} className="absolute inset-[-15%]">
            <Image
              src={HERO_IMAGE}
              alt="Modern architecture"
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </motion.div>

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/20 to-transparent lg:bg-gradient-to-r lg:from-bg/10 lg:to-transparent pointer-events-none" />

        {/* Image credit / detail line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-6 right-6 z-10"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 mix-blend-difference">
            Est. 2026
          </span>
        </motion.div>
      </div>

      {/* Vertical divider on desktop */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-border z-20" />
    </section>
  );
}
