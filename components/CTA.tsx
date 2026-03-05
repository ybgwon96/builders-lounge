"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const KAKAO_OPEN_CHAT_URL = "https://www.threads.com/@ee.yxx";
const EASE_DOOR = [0.4, 0, 0.15, 1] as [number, number, number, number];
const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ── Hairline stainless steel CSS ── */
const STEEL_BASE = [
  "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 3px)",
  "linear-gradient(180deg, #C8C8D0 0%, #BEBEC8 25%, #C4C4CC 50%, #B8B8C2 75%, #C0C0C8 100%)",
].join(", ");

const STEEL_LEFT = [
  "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 3px)",
  "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, transparent 30%)",
  "linear-gradient(180deg, #C8C8D0 0%, #BEBEC8 25%, #C4C4CC 50%, #B8B8C2 75%, #C0C0C8 100%)",
].join(", ");

const STEEL_RIGHT = [
  "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.04) 1px, transparent 2px, transparent 3px)",
  "linear-gradient(90deg, transparent 70%, rgba(255,255,255,0.06) 100%)",
  "linear-gradient(180deg, #C4C4CC 0%, #BEBEC8 25%, #C8C8D0 50%, #B8B8C2 75%, #C0C0C8 100%)",
].join(", ");

function FloorIndicator({ maxFloor }: { maxFloor: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [floor, setFloor] = useState(1);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setFloor((f) => (f >= maxFloor ? 1 : f + 1));
    }, 1400);
    return () => clearInterval(interval);
  }, [isInView, maxFloor]);

  return (
    <div ref={ref} className="flex items-center justify-center gap-2.5">
      <motion.div
        animate={{ opacity: [0.25, 0.9, 0.25] }}
        transition={{ duration: 1.4, repeat: Infinity }}
      >
        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
          <path d="M4 0L7.5 5.5H0.5L4 0Z" fill="#7C5AC9" />
        </svg>
      </motion.div>
      <div className="flex items-baseline gap-0">
        <div className="overflow-hidden text-center" style={{ height: 28, width: 16 }}>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={floor}
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.25 }}
              className="block text-[22px] tabular-nums leading-none"
              style={{
                fontFamily: "var(--font-serif-en)",
                color: "#7C5AC9",
                textShadow: "0 0 12px rgba(124,90,201,0.7)",
              }}
            >
              {floor}
            </motion.span>
          </AnimatePresence>
        </div>
        <span className="text-[13px]" style={{ fontFamily: "var(--font-serif-en)", color: "rgba(124,90,201,0.7)" }}>
          F
        </span>
      </div>
    </div>
  );
}

function DoorPanel({ side, isOpen }: { side: "left" | "right"; isOpen: boolean }) {
  const isLeft = side === "left";

  return (
    <motion.div
      className="absolute top-0 bottom-0"
      style={{ width: "50%", [isLeft ? "left" : "right"]: 0 }}
      animate={{ x: isOpen ? (isLeft ? "-92%" : "92%") : "0%" }}
      transition={{ duration: 1.1, ease: EASE_DOOR }}
    >
      <div
        className="w-full h-full relative overflow-hidden"
        style={{ background: isLeft ? STEEL_LEFT : STEEL_RIGHT }}
      >
        {/* Subtle edge shadow for depth */}
        <div
          className="absolute top-0 bottom-0 w-[6px]"
          style={{
            [isLeft ? "right" : "left"]: 0,
            background: isLeft
              ? "linear-gradient(90deg, transparent, rgba(0,0,0,0.04))"
              : "linear-gradient(90deg, rgba(0,0,0,0.04), transparent)",
          }}
        />

        {/* Vertical seam line — like a real panel seam */}
        <div
          className="absolute top-[8%] bottom-[8%] w-px"
          style={{
            [isLeft ? "right" : "left"]: "28%",
            backgroundColor: "rgba(0,0,0,0.04)",
          }}
        />

        {/* Top reflection highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-[2%]"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)" }}
        />
      </div>
    </motion.div>
  );
}

function CallButton({
  active,
  onHover,
  onLeave,
  onClick,
}: {
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      {/* Brushed metal plate */}
      <div
        className="relative px-2.5 py-3 sm:px-3 sm:py-4 rounded-[3px]"
        style={{
          background: STEEL_BASE,
          boxShadow: "0 1px 4px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <button
          className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-400"
          style={{
            background: active
              ? "radial-gradient(circle at 40% 35%, #9D7AED, #7C5AC9 60%)"
              : "radial-gradient(circle at 40% 35%, #D4D4D8, #C0C0C8 60%)",
            boxShadow: active
              ? "0 0 16px rgba(124,90,201,0.5), 0 0 4px rgba(124,90,201,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
              : "0 1px 3px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.05)",
          }}
          onMouseEnter={onHover}
          onMouseLeave={onLeave}
          onClick={onClick}
          aria-label="엘리베이터 호출"
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 19V5M5 12l7-7 7 7"
              stroke={active ? "#FAFAFA" : "#71717A"}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function CTA() {
  const [doorsOpen, setDoorsOpen] = useState(false);

  return (
    <section id="cta" className="relative overflow-hidden" style={{ backgroundColor: "#FAFAFA" }}>
      {/* Top divider */}
      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto">
        <div className="h-px" style={{ backgroundColor: "rgba(124, 90, 201, 0.15)" }} />
      </div>

      <div className="px-6 sm:px-10 lg:px-16 max-w-[1200px] mx-auto py-24 sm:py-36">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT }}
          className="flex flex-col items-center text-center"
        >
          {/* Heading */}
          <h2
            className="text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.35] tracking-[-0.01em] mb-3"
          >
            저희는 <span style={{ color: "#7C5AC9" }}>계속 올라가는 중</span>입니다
          </h2>
          <p className="text-[14px] sm:text-[15px] leading-[1.85] mb-14 sm:mb-20" style={{ color: "#52525B" }}>
            함께 타시겠습니까?
          </p>

          {/* ═══ Elevator Assembly ═══ */}
          <a
            href={KAKAO_OPEN_CHAT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative"
            onMouseEnter={() => setDoorsOpen(true)}
            onMouseLeave={() => setDoorsOpen(false)}
            onFocus={() => setDoorsOpen(true)}
            onBlur={() => setDoorsOpen(false)}
          >
            {/* Marble wall backdrop — full width */}
            <div
              className="relative pt-10 sm:pt-16 lg:pt-20 pb-0"
              style={{
                marginLeft: "calc(-50vw + 50%)",
                marginRight: "calc(-50vw + 50%)",
                background: [
                  "radial-gradient(ellipse 120% 80% at 30% 20%, rgba(235,235,240,0.6), transparent 50%)",
                  "radial-gradient(ellipse 100% 60% at 70% 80%, rgba(230,230,236,0.4), transparent 50%)",
                  "linear-gradient(170deg, #EDEDF0 0%, #E6E6EA 30%, #EBEBEE 60%, #E4E4E8 100%)",
                ].join(", "),
                boxShadow: "inset 0 1px 0 rgba(0,0,0,0.04), inset 0 -1px 0 rgba(0,0,0,0.04)",
              }}
            >
              {/* Subtle marble veining */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: [
                    "linear-gradient(135deg, transparent 40%, rgba(180,180,190,0.8) 41%, transparent 42%)",
                    "linear-gradient(115deg, transparent 55%, rgba(185,185,195,0.6) 56%, transparent 57%)",
                    "linear-gradient(155deg, transparent 70%, rgba(175,175,185,0.5) 71%, transparent 72%)",
                  ].join(", "),
                }}
              />

              {/* Inner layout: elevator + call panel */}
              <div className="flex items-end justify-center gap-4 sm:gap-6" style={{ position: "relative", left: "20px" }}>
                {/* Elevator column */}
                <div className="flex flex-col items-center" style={{ width: "min(380px, 68vw)" }}>

                  {/* Floor indicator — thin bar integrated into frame top */}
                  <div
                    className="w-[70%] py-2 sm:py-2.5 rounded-t-[3px] relative"
                    style={{
                      backgroundColor: "#141416",
                      boxShadow: "0 -1px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.02)",
                    }}
                  >
                    {/* Subtle top edge highlight */}
                    <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ backgroundColor: "rgba(255,255,255,0.04)" }} />
                    <FloorIndicator maxFloor={5} />
                  </div>

                  {/* Metal frame + doors */}
                  <div
                    className="relative w-full"
                    style={{
                      aspectRatio: "4 / 5",
                    }}
                  >
                    {/* Outer frame — brushed champagne metal */}
                    <div
                      className="absolute inset-0 rounded-b-[2px]"
                      style={{
                        background: "linear-gradient(180deg, #B0B0BA 0%, #A8A8B2 50%, #B0B0BA 100%)",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)",
                      }}
                    />

                    {/* Inner door area — recessed */}
                    <div
                      className="absolute overflow-hidden"
                      style={{
                        top: 4,
                        left: 4,
                        right: 4,
                        bottom: 5,
                        boxShadow: "inset 0 1px 4px rgba(0,0,0,0.15), inset 0 0 1px rgba(0,0,0,0.1)",
                      }}
                    >
                      {/* ── 3D Elevator Interior ── */}
                      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: "#1A1A1E" }}>

                        {/* Back wall — brushed stainless steel */}
                        <div
                          className="absolute"
                          style={{
                            top: "12%",
                            bottom: "10%",
                            left: "15%",
                            right: "15%",
                            background: [
                              "repeating-linear-gradient(90deg, transparent 0px, rgba(255,255,255,0.02) 1px, transparent 2px, transparent 3px)",
                              "linear-gradient(180deg, #C0C0C8 0%, #B8B8C2 20%, #BDBDC6 50%, #B8B8C2 80%, #B8B8C2 100%)",
                            ].join(", "),
                          }}
                        >
                          {/* Back wall vertical panel seams */}
                          <div className="absolute top-0 bottom-0 left-[33%] w-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />
                          <div className="absolute top-0 bottom-0 right-[33%] w-px" style={{ backgroundColor: "rgba(0,0,0,0.06)" }} />

                          {/* Handrail */}
                          <div
                            className="absolute left-[8%] right-[8%]"
                            style={{
                              top: "55%",
                              height: 3,
                              background: "linear-gradient(180deg, #CCCCDA, #A8A8B2, #BDBDC6)",
                              borderRadius: 1.5,
                              boxShadow: "0 1px 2px rgba(0,0,0,0.15), 0 -1px 0 rgba(255,255,255,0.1)",
                            }}
                          />
                          {/* Handrail brackets */}
                          {[15, 50, 85].map((pct) => (
                            <div
                              key={pct}
                              className="absolute w-[3px] h-[10px] rounded-sm"
                              style={{
                                top: "calc(55% - 3px)",
                                left: `${pct}%`,
                                background: "linear-gradient(180deg, #C4C4CC, #A8A8B2)",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                              }}
                            />
                          ))}

                          {/* Ceiling light reflection on back wall */}
                          <div
                            className="absolute top-0 left-[10%] right-[10%] h-[15%]"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent)" }}
                          />
                        </div>

                        {/* Left side wall — perspective trapezoid */}
                        <div
                          className="absolute top-0 bottom-0 left-0"
                          style={{
                            width: "15%",
                            background: "linear-gradient(90deg, #28282E 0%, #8A8A94 30%, #A8A8B2 100%)",
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.08) 100%)",
                            }}
                          />
                        </div>

                        {/* Right side wall — perspective trapezoid */}
                        <div
                          className="absolute top-0 bottom-0 right-0"
                          style={{
                            width: "15%",
                            background: "linear-gradient(90deg, #A8A8B2 0%, #8A8A94 70%, #28282E 100%)",
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.08) 100%)",
                            }}
                          />
                          {/* Interior button panel hint — small dark rectangle */}
                          <div
                            className="absolute rounded-[1px]"
                            style={{
                              top: "35%",
                              left: "25%",
                              width: "35%",
                              height: "25%",
                              backgroundColor: "#1A1A1E",
                              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
                            }}
                          >
                            {/* Button dots */}
                            {[20, 35, 50, 65, 80].map((t) => (
                              <div
                                key={t}
                                className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full"
                                style={{ top: `${t}%`, backgroundColor: "rgba(200,194,184,0.25)" }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Ceiling — perspective */}
                        <div
                          className="absolute top-0 left-0 right-0"
                          style={{
                            height: "12%",
                            background: "linear-gradient(180deg, #28282E 0%, #9A9AA4 60%, #B0B0BA 100%)",
                          }}
                        >
                          {/* Ceiling light strip */}
                          <div
                            className="absolute bottom-0 left-[20%] right-[20%] h-[30%]"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.7)",
                              boxShadow: "0 2px 12px rgba(255,255,255,0.3), 0 4px 24px rgba(255,255,255,0.15)",
                              borderRadius: 1,
                            }}
                          />
                        </div>

                        {/* Floor — polished dark stone */}
                        <div
                          className="absolute bottom-0 left-0 right-0"
                          style={{
                            height: "10%",
                            background: "linear-gradient(180deg, #7A7A84 0%, #4A4A50 40%, #28282E 100%)",
                          }}
                        >
                          {/* Floor reflection of ceiling light */}
                          <div
                            className="absolute top-0 left-[25%] right-[25%] h-[40%]"
                            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.08), transparent)" }}
                          />
                        </div>

                        {/* Ambient warm light wash from ceiling */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "radial-gradient(ellipse 60% 40% at 50% 8%, rgba(255,248,235,0.08), transparent 60%)",
                          }}
                        />

                      </div>

                      {/* Doors */}
                      <DoorPanel side="left" isOpen={doorsOpen} />
                      <DoorPanel side="right" isOpen={doorsOpen} />

                      {/* Center seam light */}
                      <motion.div
                        className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] pointer-events-none"
                        animate={{ opacity: doorsOpen ? 0 : 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          background:
                            "linear-gradient(180deg, transparent 2%, rgba(124,90,201,0.08) 15%, rgba(250,250,250,0.06) 50%, rgba(124,90,201,0.08) 85%, transparent 98%)",
                        }}
                      />
                    </div>

                    {/* Frame bottom edge — threshold */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[5px] rounded-b-[2px]"
                      style={{
                        background: "linear-gradient(180deg, #A8A8B2, #9A9AA4)",
                        boxShadow: "0 1px 0 rgba(255,255,255,0.1)",
                      }}
                    />
                  </div>

                </div>

                {/* Call button panel — wall-mounted, right side, vertically centered to elevator frame */}
                <div className="flex items-center self-stretch">
                  <CallButton
                    active={doorsOpen}
                    onHover={() => setDoorsOpen(true)}
                    onLeave={() => setDoorsOpen(false)}
                    onClick={() => window.open(KAKAO_OPEN_CHAT_URL, "_blank", "noopener,noreferrer")}
                  />
                </div>
              </div>

              {/* Lobby floor — directly under elevator, no gap */}
              <div>
                <div
                  className="h-[2px]"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 20%, rgba(0,0,0,0.08) 50%, rgba(0,0,0,0.06) 80%, transparent)",
                  }}
                />
                <div
                  className="h-8 sm:h-12"
                  style={{
                    background: "linear-gradient(180deg, #E4E4E7 0%, #E6E6EA 100%)",
                  }}
                />
              </div>
            </div>

          </a>
        </motion.div>
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #E4E4E7" }}>
        <div className="flex justify-between items-center px-6 sm:px-10 lg:px-16 py-6 max-w-[1200px] mx-auto">
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#A1A1AA" }}>
            &copy; 2026 Builder&apos;s Lounge
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: "#A1A1AA" }}>
            빌라 for Threaders
          </span>
        </div>
      </div>
    </section>
  );
}
