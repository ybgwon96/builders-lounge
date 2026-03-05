"use client";

import { motion } from "framer-motion";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/YOUR_LINK";

export function CTA() {
  return (
    <section id="cta" className="relative" style={{ backgroundColor: "#FAF8F4" }}>
      {/* Top divider */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto">
        <div className="h-px" style={{ backgroundColor: "rgba(124, 90, 201, 0.2)" }} />
      </div>

      {/* CTA Content */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto py-28 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] tracking-[-0.02em] font-bold mb-8">
            <span style={{ color: "#1C1917" }}>당신의</span>
            <br />
            <span style={{ color: "#1C1917" }}>호수가 </span>
            <span style={{ color: "#7C5AC9" }}>비어 있습니다</span>
          </h2>

          <p className="text-[15px] leading-[1.85] mb-12 max-w-md" style={{ color: "#6B6356" }}>
            빌라에서 시작해, 함께 아파트를 지어봅시다.
            <br />
            지금 입주하세요.
          </p>

          <a
            href={KAKAO_OPEN_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-4 text-white text-[13px] font-medium tracking-[0.05em] overflow-hidden"
            style={{ backgroundColor: "#7C5AC9" }}
          >
            <span className="relative z-10">입주 신청하기</span>
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
            <div
              className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundColor: "#6344A8" }}
            />
          </a>

          <p className="mt-8 text-[12px] tracking-wide" style={{ color: "#C8C1B4" }}>
            현재 80+ 빌더가 함께하고 있습니다
          </p>
        </motion.div>

        {/* Nakgwan seal decoration */}
        <div className="mt-16 flex items-center gap-4">
          <div className="w-2 h-2 rounded-[1px]" style={{ backgroundColor: "#7C5AC9" }} />
          <div className="h-px flex-1" style={{ backgroundColor: "#DDD8CE" }} />
        </div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #DDD8CE" }}>
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 max-w-[1200px] mx-auto">
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#C8C1B4" }}>
            &copy; 2026 Builder&apos;s Lounge
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#C8C1B4" }}>
            빌라 for Threaders
          </span>
        </div>
      </div>
    </section>
  );
}
