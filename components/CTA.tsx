"use client";

import { motion } from "framer-motion";
import { Apartment } from "./buildings/Apartment";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/YOUR_LINK";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-villa-glow/[0.03] blur-[120px] pointer-events-none" />

      {/* Apartment with blinking vacant unit */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="mb-12 sm:mb-16"
      >
        <Apartment floors={12} width={170} blinkUnit={{ floor: 9, unit: 2 }} />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="font-display font-800 text-3xl sm:text-4xl md:text-6xl leading-tight mb-5">
          당신의 호수가
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-villa-amber via-villa-glow to-villa-warm">
              비어 있습니다
            </span>
            <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-villa-amber via-villa-glow to-villa-warm blur-2xl opacity-30">
              비어 있습니다
            </span>
          </span>
        </h2>

        <p className="text-lg sm:text-xl text-villa-muted mb-10 leading-relaxed">
          빌라에서 시작해, 함께 아파트를 지어봅시다
        </p>

        <motion.a
          href={KAKAO_OPEN_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-display font-700 text-lg overflow-hidden transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Button background */}
          <span className="absolute inset-0 bg-gradient-to-r from-villa-glow via-villa-warm to-villa-glow bg-[length:200%_100%] group-hover:animate-[shimmer_2s_linear_infinite]" />
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-villa-glow to-villa-warm blur-xl" />

          {/* Button content */}
          <span className="relative text-villa-void">입주 신청하기</span>
          <span className="relative text-villa-void/70 text-sm">→</span>
        </motion.a>

        {/* Social proof hint */}
        <motion.p
          className="mt-6 text-sm text-villa-steel"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          현재 80+ 빌더가 함께하고 있습니다
        </motion.p>
      </motion.div>
    </section>
  );
}
