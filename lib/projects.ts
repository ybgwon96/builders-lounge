import { getSupabase } from "./supabase";
import type { Project } from "./types";

// Mock data for development when Supabase is not configured
const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    name: "AI 뉴스레터",
    builder_name: "이뿌뿌",
    description: "AI 트렌드를 매일 정리하는 뉴스레터",
    thread_url: "https://threads.net/@ee.yxx",
    floor: 0,
    unit: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "사이드 프로젝트 런처",
    builder_name: "빌더A",
    description: "사이드 프로젝트를 쉽게 런칭하는 도구",
    thread_url: "https://threads.net/",
    floor: 0,
    unit: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "쓰레드 분석기",
    builder_name: "빌더B",
    description: "내 쓰레드 성과를 분석하는 대시보드",
    thread_url: "https://threads.net/",
    floor: 0,
    unit: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "커뮤니티 봇",
    builder_name: "빌더C",
    description: "오픈카톡 커뮤니티 자동화 봇",
    thread_url: "https://threads.net/",
    floor: 1,
    unit: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "노코드 랜딩",
    builder_name: "빌더D",
    description: "3분 만에 랜딩페이지 만들기",
    thread_url: "https://threads.net/",
    floor: 1,
    unit: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "콘텐츠 캘린더",
    builder_name: "빌더E",
    description: "쓰레드 콘텐츠 일정 관리 도구",
    thread_url: "https://threads.net/",
    floor: 1,
    unit: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "AI 이미지 에디터",
    builder_name: "빌더F",
    description: "AI로 제품 사진을 자동 보정하는 앱",
    thread_url: "https://threads.net/",
    floor: 2,
    unit: 0,
    created_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "구독자 대시보드",
    builder_name: "빌더G",
    description: "뉴스레터 구독자 분석 & 세그먼트 도구",
    thread_url: "https://threads.net/",
    floor: 2,
    unit: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "마이크로 SaaS",
    builder_name: "빌더H",
    description: "한 달 만에 MRR 100만원 달성 도전기",
    thread_url: "https://threads.net/",
    floor: 2,
    unit: 2,
    created_at: new Date().toISOString(),
  },
];

export async function getProjects(): Promise<Project[]> {
  const supabase = getSupabase();
  if (!supabase) return MOCK_PROJECTS;

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("floor", { ascending: true })
    .order("unit", { ascending: true });

  if (error) {
    console.error("Failed to fetch projects:", error);
    return MOCK_PROJECTS;
  }

  return data ?? MOCK_PROJECTS;
}
