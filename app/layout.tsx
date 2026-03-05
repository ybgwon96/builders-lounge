import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "빌라 | Builder's Lounge",
  description:
    "Build in Public 하는 한국 쓰레더들의 모임. 함께 짓고, 함께 올라갑니다.",
  openGraph: {
    title: "빌라 | Builder's Lounge",
    description: "Build in Public 하는 한국 쓰레더들의 모임",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
