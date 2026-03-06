import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "빌라 — Builder's Lounge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(170deg, #F7F3ED 0%, #F0EAE0 50%, #E8E0D4 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle warm radial accents */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at 30% 40%, rgba(196,113,59,0.06) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(212,146,94,0.04) 0%, transparent 50%)",
            display: "flex",
          }}
        />

        {/* Skyline — bottom strip */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 120,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {[100, 130, 85, 115, 95, 125, 105, 80, 120, 90, 110, 75, 100, 130, 88].map(
            (h, i) => (
              <div
                key={i}
                style={{
                  width: 48,
                  height: h,
                  background: i % 3 === 0 ? "rgba(196,113,59,0.05)" : "rgba(175,168,155,0.06)",
                  borderRadius: "2px 2px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingTop: 12,
                  gap: 8,
                }}
              >
                {Array.from({ length: Math.floor(h / 30) }).map((_, j) => (
                  <div key={j} style={{ display: "flex", gap: 5 }}>
                    <div
                      style={{
                        width: 10,
                        height: 8,
                        borderRadius: 1.5,
                        background:
                          (i + j) % 3 === 0 ? "rgba(255,216,138,0.35)" : "rgba(196,113,59,0.04)",
                      }}
                    />
                    <div
                      style={{
                        width: 10,
                        height: 8,
                        borderRadius: 1.5,
                        background:
                          (i + j) % 4 === 1 ? "rgba(255,216,138,0.28)" : "rgba(196,113,59,0.04)",
                      }}
                    />
                  </div>
                ))}
              </div>
            ),
          )}
        </div>

        {/* Main content — centered in upper region */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            zIndex: 10,
            paddingBottom: 80,
          }}
        >
          {/* Logo icon */}
          <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="7" fill="#C4713B" />
            <rect x="9" y="3.5" width="14" height="25" rx="1" fill="white" />
            <rect x="11.5" y="6" width="3.5" height="3" rx="0.5" fill="#FFD88A" />
            <rect x="17" y="6" width="3.5" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" />
            <rect x="11.5" y="11.5" width="3.5" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" />
            <rect x="17" y="11.5" width="3.5" height="3" rx="0.5" fill="#FFD88A" />
            <rect x="11.5" y="17" width="3.5" height="3" rx="0.5" fill="#FFD88A" />
            <rect x="17" y="17" width="3.5" height="3" rx="0.5" fill="rgba(255,255,255,0.3)" />
            <rect x="14" y="22.5" width="4" height="6" rx="1" fill="#A05A2C" />
            <circle cx="16.8" cy="25.5" r="0.4" fill="#FFD88A" />
          </svg>

          {/* Title row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginTop: 28,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: "#18181B",
                letterSpacing: "-0.02em",
                lineHeight: 1,
              }}
            >
              빌라
            </span>
            <span
              style={{
                fontSize: 28,
                color: "#71717A",
                letterSpacing: "0.1em",
              }}
            >
              BUILDER&apos;S LOUNGE
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              width: 48,
              height: 2,
              background: "#C4713B",
              marginTop: 28,
              borderRadius: 1,
              display: "flex",
            }}
          />

          {/* Description */}
          <span
            style={{
              fontSize: 22,
              color: "#71717A",
              marginTop: 22,
              letterSpacing: "0.04em",
            }}
          >
            Build in Public 하는 한국 쓰레더들의 모임
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
