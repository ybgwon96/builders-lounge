import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-en",
  display: "swap",
});

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://builderslounge.vercel.app",
);

export const metadata: Metadata = {
  title: "빌라 — Builder's Lounge",
  description:
    "Build in Public 하는 한국 쓰레더들의 모임. 함께 짓고, 함께 올라갑니다.",
  keywords: ["빌라", "Builder's Lounge", "Build in Public", "쓰레드", "Threads", "빌더", "사이드프로젝트"],
  openGraph: {
    title: "빌라 — Builder's Lounge",
    description: "Build in Public 하는 한국 쓰레더들의 모임. 함께 짓고, 함께 올라갑니다.",
    siteName: "빌라",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "빌라 — Builder's Lounge",
    description: "Build in Public 하는 한국 쓰레더들의 모임. 함께 짓고, 함께 올라갑니다.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={instrumentSerif.variable}>
      <body className="antialiased">
        {children}
        {/* Hanji grain texture SVG filter */}
        <svg aria-hidden="true" className="fixed w-0 h-0">
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        {/* Grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[200] opacity-[0.03]"
          style={{ filter: "url(#grain)" }}
        />
      </body>
    </html>
  );
}
