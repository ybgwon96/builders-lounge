"use client";

const items = [
  "BUILD IN PUBLIC",
  "빌라 FOR THREADERS",
  "함께 짓다",
  "SHARE YOUR JOURNEY",
  "각자의 빌라에서",
  "아파트로 올라가다",
  "BUILDERS LOUNGE",
  "인사이트를 나누다",
];

export function Marquee() {
  const content = items.map((t) => (
    <span key={t} className="flex items-center gap-6 sm:gap-8">
      <span className="text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-text-dim whitespace-nowrap">
        {t}
      </span>
      <span className="text-accent/30 text-[8px]">●</span>
    </span>
  ));

  return (
    <div className="relative py-5 sm:py-6 border-y border-border overflow-hidden bg-surface">
      <div
        className="flex gap-6 sm:gap-8"
        style={{
          animation: "marquee 50s linear infinite",
          width: "max-content",
        }}
      >
        {content}
        {content}
      </div>

      {/* Edge fade masks */}
      <div
        className="absolute inset-y-0 left-0 w-16 sm:w-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to right, var(--color-surface), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-16 sm:w-24 pointer-events-none z-10"
        style={{ background: "linear-gradient(to left, var(--color-surface), transparent)" }}
      />

      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(196,113,59,0.1) 50%, transparent)" }} />
    </div>
  );
}
