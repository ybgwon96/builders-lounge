"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/YOUR_LINK";

// Premium interior — luxury lobby feel
const CTA_IMAGE =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format&fit=crop";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section id="cta" ref={ref} className="relative">
      {/* Top divider */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto">
        <div className="h-px bg-border" />
      </div>

      {/* Two-column CTA: text left, image right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[70vh]">
        {/* Left — Content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-lg"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-gold" />
              <span className="text-[10px] tracking-[0.35em] uppercase text-text-dim">
                Join Us
              </span>
            </div>

            <h2 className="font-serif font-300 text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.92] tracking-[-0.03em] mb-8">
              당신의 호수가
              <br />
              <span className="italic text-gold">비어 있습니다</span>
            </h2>

            <p className="text-text-mid text-[15px] leading-[1.85] mb-12 max-w-md">
              빌라에서 시작해, 함께 아파트를 지어봅시다.
              <br />
              지금 입주하세요.
            </p>

            <a
              href={KAKAO_OPEN_CHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-text text-bg text-[13px] font-sans font-medium tracking-[0.05em] overflow-hidden"
            >
              <span className="relative z-10 group-hover:text-text transition-colors duration-500">
                입주 신청하기
              </span>
              <svg
                className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth={1.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute inset-0 bg-gold scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </a>

            <p className="mt-8 text-[12px] text-text-faint tracking-wide">
              현재 80+ 빌더가 함께하고 있습니다
            </p>
          </motion.div>
        </div>

        {/* Right — Image */}
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0">
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            <Image
              src={CTA_IMAGE}
              alt="Premium interior"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-border">
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 max-w-[1200px] mx-auto">
          <span className="text-[10px] text-text-faint tracking-[0.2em] uppercase">
            &copy; 2026 Builder&apos;s Lounge
          </span>
          <span className="text-[10px] text-text-faint tracking-[0.2em] uppercase">
            빌라 for Threaders
          </span>
        </div>
      </div>
    </section>
  );
}
