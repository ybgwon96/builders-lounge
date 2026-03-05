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
      <span className="text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-text-dim font-sans whitespace-nowrap">
        {t}
      </span>
      <span className="text-gold/40 text-[8px]">◆</span>
    </span>
  ));

  return (
    <div className="relative py-5 sm:py-6 border-y border-border overflow-hidden bg-surface">
      <div
        className="flex gap-6 sm:gap-8"
        style={{
          animation: "marquee 40s linear infinite",
          width: "max-content",
        }}
      >
        {content}
        {content}
      </div>
    </div>
  );
}
