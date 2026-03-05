# Builder's Lounge (빌라) 랜딩페이지 구현 계획

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 빌라→아파트 건축 메타포 기반의 인터랙티브 랜딩페이지 구축 (프로젝트 쇼케이스 + 오픈카톡 CTA)

**Architecture:** Next.js App Router 기반 싱글 페이지. 3개 섹션(히어로, 쇼케이스, CTA)이 스크롤로 연결. Supabase에서 프로젝트 데이터를 서버 컴포넌트로 fetch. Framer Motion으로 스크롤 기반 건축 애니메이션.

**Tech Stack:** Next.js 15 (App Router), Tailwind CSS v4, Framer Motion, Supabase JS Client, Vercel

---

## Task 1: Next.js 프로젝트 초기 설정

**Files:**
- Create: 프로젝트 루트 (create-next-app으로 생성)
- Modify: `tailwind.config.ts` (커스텀 컬러 추가)
- Modify: `app/globals.css` (기본 스타일)
- Modify: `app/layout.tsx` (한국어 lang, 폰트)
- Modify: `app/page.tsx` (빈 랜딩 구조)

**Step 1: Next.js 프로젝트 생성**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --turbopack
```

**Step 2: 추가 패키지 설치**

```bash
npm install framer-motion @supabase/supabase-js
```

**Step 3: Tailwind 커스텀 테마 설정**

`tailwind.config.ts` 에 빌라 컬러 팔레트 추가:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        villa: {
          navy: "#0a0e27",
          dark: "#111436",
          glow: "#f5a623",
          warm: "#ff6b35",
          neon: "#00d4ff",
          window: "#ffd700",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 4: 글로벌 스타일 설정**

`app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css");

html {
  scroll-behavior: smooth;
}

body {
  background-color: #0a0e27;
  color: white;
}
```

**Step 5: 레이아웃 설정**

`app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "빌라 | Builder's Lounge",
  description: "Build in Public 하는 한국 쓰레더들의 모임. 함께 짓고, 함께 올라갑니다.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
```

**Step 6: 페이지 기본 구조**

`app/page.tsx`:

```tsx
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <Showcase />
      <CTA />
    </main>
  );
}
```

**Step 7: 플레이스홀더 컴포넌트 생성**

`components/Hero.tsx`, `components/Showcase.tsx`, `components/CTA.tsx` 각각 빈 섹션 컴포넌트:

```tsx
// components/Hero.tsx
export function Hero() {
  return <section id="hero" className="min-h-screen" />;
}

// components/Showcase.tsx
export function Showcase() {
  return <section id="showcase" className="min-h-screen" />;
}

// components/CTA.tsx
export function CTA() {
  return <section id="cta" className="min-h-screen" />;
}
```

**Step 8: 개발 서버 실행 확인**

Run: `npm run dev`
Expected: localhost:3000에서 다크 네이비 배경의 빈 페이지 표시

**Step 9: 커밋**

```bash
git init && git add -A && git commit -m "feat: init Next.js project with Tailwind and base structure"
```

---

## Task 2: SVG 건물 컴포넌트 시스템

**Files:**
- Create: `components/buildings/Villa.tsx`
- Create: `components/buildings/Apartment.tsx`
- Create: `components/buildings/Crane.tsx`
- Create: `components/buildings/Window.tsx`

**Step 1: Window 컴포넌트 (재사용 단위)**

`components/buildings/Window.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

interface WindowProps {
  x: number;
  y: number;
  lit?: boolean;
  delay?: number;
}

export function Window({ x, y, lit = false, delay = 0 }: WindowProps) {
  return (
    <motion.rect
      x={x}
      y={y}
      width={12}
      height={16}
      rx={2}
      fill={lit ? "#ffd700" : "#1a1f4e"}
      initial={{ opacity: lit ? 0 : 1 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    />
  );
}
```

**Step 2: Villa 컴포넌트 (작은 건물)**

`components/buildings/Villa.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Window } from "./Window";

export function Villa() {
  return (
    <motion.svg
      width={80}
      height={100}
      viewBox="0 0 80 100"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 지붕 */}
      <polygon points="40,10 5,40 75,40" fill="#1e2456" />
      {/* 건물 몸체 */}
      <rect x={10} y={40} width={60} height={55} fill="#151a42" />
      {/* 창문 2x2 */}
      <Window x={18} y={48} lit />
      <Window x={50} y={48} delay={0.3} />
      <Window x={18} y={72} delay={0.5} />
      <Window x={50} y={72} lit delay={0.7} />
      {/* 문 */}
      <rect x={30} y={75} width={20} height={20} rx={2} fill="#f5a623" opacity={0.8} />
    </motion.svg>
  );
}
```

**Step 3: Apartment 컴포넌트 (고층 건물)**

`components/buildings/Apartment.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Window } from "./Window";

interface ApartmentProps {
  floors: number;
  width?: number;
  highlightFloor?: number;
  blinkUnit?: { floor: number; unit: number };
}

export function Apartment({ floors, width = 120, highlightFloor, blinkUnit }: ApartmentProps) {
  const floorHeight = 28;
  const height = floors * floorHeight + 20;
  const unitsPerFloor = 4;
  const windowWidth = 12;
  const windowGap = (width - 20 - unitsPerFloor * windowWidth) / (unitsPerFloor + 1);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* 건물 몸체 */}
      <motion.rect
        x={5}
        y={10}
        width={width - 10}
        height={height - 10}
        fill="#151a42"
        rx={4}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ originY: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      {/* 옥상 */}
      <rect x={width / 2 - 10} y={5} width={20} height={10} fill="#1e2456" rx={2} />

      {/* 층별 창문 */}
      {Array.from({ length: floors }).map((_, floor) => {
        const floorY = height - (floor + 1) * floorHeight;
        return Array.from({ length: unitsPerFloor }).map((_, unit) => {
          const windowX = 10 + windowGap + unit * (windowWidth + windowGap);
          const isBlink = blinkUnit?.floor === floor && blinkUnit?.unit === unit;
          const isLit = Math.random() > 0.4;

          return isBlink ? (
            <motion.rect
              key={`${floor}-${unit}`}
              x={windowX}
              y={floorY + 6}
              width={windowWidth}
              height={16}
              rx={2}
              fill="#ffd700"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          ) : (
            <Window
              key={`${floor}-${unit}`}
              x={windowX}
              y={floorY + 6}
              lit={isLit}
              delay={floor * 0.1 + unit * 0.05}
            />
          );
        });
      })}
    </svg>
  );
}
```

**Step 4: Crane 컴포넌트**

`components/buildings/Crane.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

export function Crane({ height = 200 }: { height?: number }) {
  return (
    <motion.svg
      width={60}
      height={height}
      viewBox={`0 0 60 ${height}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      {/* 기둥 */}
      <rect x={27} y={20} width={6} height={height - 20} fill="#2a3070" />
      {/* 팔 */}
      <rect x={10} y={18} width={45} height={4} fill="#2a3070" />
      {/* 줄 */}
      <line x1={50} y1={22} x2={50} y2={80} stroke="#f5a623" strokeWidth={1} />
      {/* 훅 */}
      <motion.circle
        cx={50}
        cy={82}
        r={4}
        fill="#f5a623"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
```

**Step 5: 커밋**

```bash
git add components/buildings/ && git commit -m "feat: add SVG building component system (Villa, Apartment, Crane, Window)"
```

---

## Task 3: 히어로 섹션

**Files:**
- Modify: `components/Hero.tsx`
- Create: `components/Skyline.tsx`

**Step 1: Skyline 배경 컴포넌트**

`components/Skyline.tsx`:

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Villa } from "./buildings/Villa";
import { Apartment } from "./buildings/Apartment";
import { Crane } from "./buildings/Crane";

export function Skyline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const villaOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const apartmentScale = useTransform(scrollYProgress, [0.1, 0.6], [0.3, 1]);
  const craneY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div ref={ref} className="relative w-full h-full flex items-end justify-center gap-4 pb-8">
      {/* 빌라 (왼쪽, 작게) */}
      <motion.div style={{ opacity: villaOpacity }} className="self-end">
        <Villa />
      </motion.div>

      {/* 크레인 */}
      <motion.div style={{ y: craneY }}>
        <Crane height={250} />
      </motion.div>

      {/* 아파트 (중앙, 성장) */}
      <motion.div style={{ scale: apartmentScale }} className="origin-bottom">
        <Apartment floors={8} width={140} />
      </motion.div>

      {/* 크레인 */}
      <motion.div style={{ y: craneY }}>
        <Crane height={200} />
      </motion.div>

      {/* 빌라 (오른쪽, 작게) */}
      <motion.div style={{ opacity: villaOpacity }} className="self-end">
        <Villa />
      </motion.div>
    </div>
  );
}
```

**Step 2: 히어로 섹션 완성**

`components/Hero.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Skyline } from "./Skyline";

export function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 별/파티클 배경 */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
            animate={{ opacity: [0.2, 0.8, 0.2] }}
            transition={{
              repeat: Infinity,
              duration: 2 + Math.random() * 3,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* 텍스트 */}
      <div className="relative z-10 text-center mb-12 px-4">
        <motion.p
          className="text-villa-neon text-sm tracking-widest mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          BUILDER&apos;S LOUNGE
        </motion.p>
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Build in Public 하는
          <br />
          <span className="text-villa-glow">한국 쓰레더들의 모임</span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          함께 짓고, 함께 올라갑니다
        </motion.p>
      </div>

      {/* 스카이라인 */}
      <div className="relative z-10 w-full max-w-4xl h-[300px]">
        <Skyline />
      </div>

      {/* 스크롤 가이드 */}
      <motion.div
        className="absolute bottom-8 text-gray-500 text-sm"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        scroll down
      </motion.div>
    </section>
  );
}
```

**Step 3: 브라우저에서 확인**

Run: `npm run dev`
Expected: 다크 네이비 배경에 별이 반짝이고, 빌라/아파트/크레인이 표시되는 히어로 섹션

**Step 4: 커밋**

```bash
git add components/Hero.tsx components/Skyline.tsx && git commit -m "feat: add Hero section with animated skyline"
```

---

## Task 4: Supabase 연동

**Files:**
- Create: `lib/supabase.ts`
- Create: `lib/types.ts`
- Create: `.env.local`

**Step 1: Supabase 클라이언트 설정**

`lib/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 2: 타입 정의**

`lib/types.ts`:

```typescript
export interface Project {
  id: string;
  name: string;
  builder_name: string;
  description: string;
  thread_url: string;
  image_url?: string;
  floor: number;
  unit: number;
  created_at: string;
}
```

**Step 3: 환경변수 파일 생성**

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Step 4: Supabase 대시보드에서 projects 테이블 생성**

SQL:

```sql
create table projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  builder_name text not null,
  description text not null,
  thread_url text not null,
  image_url text,
  floor int not null default 0,
  unit int not null default 0,
  created_at timestamptz default now()
);

alter table projects enable row level security;

create policy "Public read access" on projects
  for select using (true);
```

**Step 5: 시드 데이터 삽입**

```sql
insert into projects (name, builder_name, description, thread_url, floor, unit) values
  ('AI 뉴스레터', '이뿌뿌', 'AI 트렌드를 매일 정리하는 뉴스레터', 'https://threads.net/@ee.yxx', 0, 0),
  ('사이드 프로젝트 런처', '빌더A', '사이드 프로젝트를 쉽게 런칭하는 도구', 'https://threads.net/', 0, 1),
  ('쓰레드 분석기', '빌더B', '내 쓰레드 성과를 분석하는 대시보드', 'https://threads.net/', 0, 2),
  ('커뮤니티 봇', '빌더C', '오픈카톡 커뮤니티 자동화 봇', 'https://threads.net/', 1, 0),
  ('노코드 랜딩', '빌더D', '3분 만에 랜딩페이지 만들기', 'https://threads.net/', 1, 1),
  ('콘텐츠 캘린더', '빌더E', '쓰레드 콘텐츠 일정 관리 도구', 'https://threads.net/', 1, 2);
```

**Step 6: 데이터 fetch 함수 생성**

`lib/projects.ts`:

```typescript
import { supabase } from "./supabase";
import type { Project } from "./types";

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("floor", { ascending: true })
    .order("unit", { ascending: true });

  if (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }

  return data ?? [];
}
```

**Step 7: 커밋**

```bash
git add lib/ .env.local && git commit -m "feat: add Supabase client, types, and project fetch"
```

---

## Task 5: 프로젝트 쇼케이스 섹션

**Files:**
- Modify: `components/Showcase.tsx`
- Create: `components/ProjectUnit.tsx`
- Create: `components/ApartmentShowcase.tsx`

**Step 1: 프로젝트 유닛 (아파트 호수) 컴포넌트**

`components/ProjectUnit.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/types";

interface ProjectUnitProps {
  project: Project;
  index: number;
}

export function ProjectUnit({ project, index }: ProjectUnitProps) {
  return (
    <motion.a
      href={project.thread_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-villa-dark border border-villa-navy hover:border-villa-glow/50 rounded-lg p-4 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* 호수 번호 */}
      <div className="absolute top-2 right-2 text-xs text-villa-neon/50 font-mono">
        {project.floor + 1}0{project.unit + 1}호
      </div>

      {/* 창문 불빛 효과 */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-b from-villa-glow/5 to-transparent" />

      <h3 className="font-bold text-villa-glow mb-1">{project.name}</h3>
      <p className="text-sm text-gray-400 mb-2">{project.description}</p>
      <p className="text-xs text-villa-neon">{project.builder_name}</p>
    </motion.a>
  );
}
```

**Step 2: 아파트 쇼케이스 (건물 형태로 프로젝트 배치)**

`components/ApartmentShowcase.tsx`:

```tsx
"use client";

import type { Project } from "@/lib/types";
import { ProjectUnit } from "./ProjectUnit";

interface ApartmentShowcaseProps {
  projects: Project[];
}

export function ApartmentShowcase({ projects }: ApartmentShowcaseProps) {
  // 층별로 그룹핑
  const floors = new Map<number, Project[]>();
  projects.forEach((p) => {
    const existing = floors.get(p.floor) ?? [];
    floors.set(p.floor, [...existing, p]);
  });

  const sortedFloors = Array.from(floors.entries()).sort(([a], [b]) => b - a);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* 옥상 */}
      <div className="flex justify-center mb-2">
        <div className="w-20 h-3 bg-villa-dark rounded-t-lg border-t border-x border-villa-navy" />
      </div>

      {/* 층별 프로젝트 */}
      <div className="border-x-2 border-villa-navy/50 px-4 space-y-2">
        {sortedFloors.map(([floor, floorProjects]) => (
          <div key={floor} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {floorProjects.map((project, i) => (
              <ProjectUnit key={project.id} project={project} index={i + floor * 3} />
            ))}
          </div>
        ))}
      </div>

      {/* 기초 */}
      <div className="h-4 bg-gradient-to-b from-villa-dark to-villa-navy rounded-b-lg border-b-2 border-x-2 border-villa-navy/50" />
    </div>
  );
}
```

**Step 3: Showcase 섹션 완성**

`components/Showcase.tsx`:

```tsx
import { getProjects } from "@/lib/projects";
import { ApartmentShowcase } from "./ApartmentShowcase";

export async function Showcase() {
  const projects = await getProjects();

  return (
    <section id="showcase" className="min-h-screen py-20 px-4">
      <div className="text-center mb-12">
        <p className="text-villa-neon text-sm tracking-widest mb-2">OUR PROJECTS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          우리가 올리고 있는 <span className="text-villa-glow">층수</span>
        </h2>
        <p className="text-gray-400">각 호수를 클릭하면 빌더의 쓰레드로 이동합니다</p>
      </div>

      <ApartmentShowcase projects={projects} />
    </section>
  );
}
```

**Step 4: 브라우저에서 확인**

Run: `npm run dev`
Expected: 아파트 형태로 프로젝트 카드가 층별 배치됨

**Step 5: 커밋**

```bash
git add components/Showcase.tsx components/ProjectUnit.tsx components/ApartmentShowcase.tsx && git commit -m "feat: add Showcase section with apartment-style project grid"
```

---

## Task 6: CTA 섹션

**Files:**
- Modify: `components/CTA.tsx`

**Step 1: CTA 섹션 완성**

`components/CTA.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { Apartment } from "./buildings/Apartment";

const KAKAO_OPEN_CHAT_URL = "https://open.kakao.com/o/YOUR_LINK";

export function CTA() {
  return (
    <section id="cta" className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* 완성된 아파트 + 깜빡이는 빈 호수 */}
      <div className="mb-12">
        <Apartment floors={10} width={160} blinkUnit={{ floor: 7, unit: 2 }} />
      </div>

      {/* 텍스트 */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          당신의 호수가 <span className="text-villa-glow">비어 있습니다</span>
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          빌라에서 시작해, 함께 아파트를 지어봅시다
        </p>
        <motion.a
          href={KAKAO_OPEN_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-villa-glow text-villa-navy font-bold px-8 py-4 rounded-lg text-lg hover:bg-villa-warm transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          입주 신청하기
        </motion.a>
      </motion.div>
    </section>
  );
}
```

**Step 2: 브라우저에서 확인**

Run: `npm run dev`
Expected: 10층 아파트 + 깜빡이는 빈 세대 + "입주 신청하기" 버튼

**Step 3: 커밋**

```bash
git add components/CTA.tsx && git commit -m "feat: add CTA section with blinking vacant unit"
```

---

## Task 7: 반응형 + 최종 점검

**Files:**
- Modify: 각 컴포넌트 (모바일 대응)
- Modify: `app/page.tsx` (섹션 간 트랜지션)

**Step 1: 모바일 반응형 점검 및 수정**

- 히어로: 텍스트 크기, 스카이라인 스케일 조정
- 쇼케이스: 1열 그리드 (모바일), 2-3열 (데스크탑)
- CTA: 아파트 크기 축소

**Step 2: 섹션 간 그라디언트 트랜지션**

`app/page.tsx`에 섹션 사이 구분선 추가:

```tsx
import { Hero } from "@/components/Hero";
import { Showcase } from "@/components/Showcase";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="h-px bg-gradient-to-r from-transparent via-villa-neon/20 to-transparent" />
      <Showcase />
      <div className="h-px bg-gradient-to-r from-transparent via-villa-glow/20 to-transparent" />
      <CTA />
    </main>
  );
}
```

**Step 3: 최종 브라우저 테스트**

- 데스크탑 (1440px): 전체 레이아웃 확인
- 태블릿 (768px): 그리드 2열 확인
- 모바일 (375px): 1열 + 텍스트 크기 확인
- 스크롤 애니메이션 동작 확인

**Step 4: 커밋**

```bash
git add -A && git commit -m "feat: add responsive layout and section transitions"
```

---

## Task 8: Vercel 배포

**Step 1: Vercel에 프로젝트 연결**

```bash
npx vercel --yes
```

**Step 2: 환경변수 설정**

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Step 3: 프로덕션 배포**

```bash
npx vercel --prod
```

**Step 4: 배포 URL 확인 후 커밋**

```bash
git add -A && git commit -m "chore: add Vercel deployment config"
```
