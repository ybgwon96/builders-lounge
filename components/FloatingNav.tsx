"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { LogoIcon } from "./LogoIcon";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/YOUR_LINK";

export function FloatingNav() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling past the hero (~90vh)
    setVisible(latest > window.innerHeight * 0.85);
  });

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -60, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -60, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="backdrop-blur-md"
        style={{
          backgroundColor: "rgba(250,250,250,0.85)",
          borderBottom: "1px solid rgba(228,228,231,0.6)",
        }}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-16 py-3 max-w-[1200px] mx-auto">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <LogoIcon size={26} />
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[17px] sm:text-[19px] font-bold tracking-tight"
                style={{ fontFamily: "var(--font-serif-kr)", color: "#18181B" }}
              >
                빌라
              </span>
              <span className="hidden sm:inline text-[11px] tracking-[0.06em]" style={{ color: "#A1A1AA" }}>
                Builder&apos;s Lounge
              </span>
            </div>
          </a>

          {/* CTA */}
          <a
            href={KAKAO_OPEN_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-5 py-2 text-white text-[11px] sm:text-[12px] font-medium tracking-[0.04em] overflow-hidden transition-shadow duration-400 hover:shadow-[0_0_20px_rgba(124,90,201,0.2)]"
            style={{ backgroundColor: "#7C5AC9", borderRadius: 2 }}
          >
            <span className="relative z-10">입주 신청</span>
            <div
              className="absolute inset-0 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ backgroundColor: "#6344A8" }}
            />
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
