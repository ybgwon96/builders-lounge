import { getSupabase } from "./supabase";
import type { Project } from "./types";

// Mock data for development when Supabase is not configured
// unit: 0=AI동, 1=마케팅동, 2=자영업동
// floor: 0부터 시작 (0=1층, 1=2층, ...)
// 각 동에 프로젝트가 순서대로 배치됨 (1층 왼쪽→오른쪽→2층 왼쪽→...)
const MOCK_PROJECTS: Project[] = [
  // === AI동 (unit: 0) — 10개 프로젝트 (5층 × 2창문) ===
  { id: "1", name: "AI 뉴스레터", builder_name: "이뿌뿌", description: "AI 트렌드를 매일 정리하는 뉴스레터", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 0, created_at: new Date().toISOString() },
  { id: "2", name: "AI 요약 봇", builder_name: "빌더K", description: "긴 글을 3줄로 요약해주는 서비스", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 0, created_at: new Date().toISOString() },
  { id: "3", name: "커뮤니티 봇", builder_name: "빌더C", description: "오픈카톡 커뮤니티 자동화 봇", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 0, created_at: new Date().toISOString() },
  { id: "4", name: "AI 번역기", builder_name: "빌더I", description: "실시간 다국어 번역 Chrome 확장", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 0, created_at: new Date().toISOString() },
  { id: "5", name: "AI 이미지 에디터", builder_name: "빌더F", description: "AI로 제품 사진을 자동 보정하는 앱", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 0, created_at: new Date().toISOString() },
  { id: "6", name: "GPT 프롬프트 허브", builder_name: "빌더J", description: "업무별 최적 프롬프트 모음집", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 0, created_at: new Date().toISOString() },
  { id: "7", name: "코드 리뷰어", builder_name: "빌더L", description: "AI 기반 자동 코드 리뷰 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 0, created_at: new Date().toISOString() },
  { id: "8", name: "음성 메모 AI", builder_name: "빌더M", description: "음성을 텍스트+할일로 변환", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 0, created_at: new Date().toISOString() },
  { id: "9", name: "AI 작곡가", builder_name: "빌더U", description: "AI로 배경음악 자동 생성", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 0, created_at: new Date().toISOString() },
  { id: "10", name: "챗봇 빌더", builder_name: "빌더V", description: "노코드 AI 챗봇 제작 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 0, created_at: new Date().toISOString() },

  // === 마케팅동 (unit: 1) — 10개 프로젝트 (5층 × 2창문) ===
  { id: "11", name: "사이드 프로젝트 런처", builder_name: "빌더A", description: "사이드 프로젝트를 쉽게 런칭하는 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 1, created_at: new Date().toISOString() },
  { id: "12", name: "노코드 랜딩", builder_name: "빌더D", description: "3분 만에 랜딩페이지 만들기", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 1, created_at: new Date().toISOString() },
  { id: "13", name: "구독자 대시보드", builder_name: "빌더G", description: "뉴스레터 구독자 분석 & 세그먼트 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 1, created_at: new Date().toISOString() },
  { id: "14", name: "콘텐츠 캘린더", builder_name: "빌더E", description: "쓰레드 콘텐츠 일정 관리 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 1, created_at: new Date().toISOString() },
  { id: "15", name: "인스타 분석기", builder_name: "빌더N", description: "인스타그램 성과 분석 대시보드", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 1, created_at: new Date().toISOString() },
  { id: "16", name: "SEO 체커", builder_name: "빌더O", description: "웹사이트 SEO 점수 자동 분석", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 1, created_at: new Date().toISOString() },
  { id: "17", name: "바이럴 트래커", builder_name: "빌더P", description: "콘텐츠 바이럴 지수 실시간 추적", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 1, created_at: new Date().toISOString() },
  { id: "18", name: "이메일 마케터", builder_name: "빌더W", description: "자동 이메일 시퀀스 빌더", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 1, created_at: new Date().toISOString() },
  { id: "29", name: "광고 최적화", builder_name: "빌더AB", description: "메타/구글 광고 자동 최적화 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 1, created_at: new Date().toISOString() },
  { id: "30", name: "브랜드 키트", builder_name: "빌더AC", description: "소규모 브랜드 아이덴티티 자동 생성", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 1, created_at: new Date().toISOString() },

  // === 자영업동 (unit: 2) — 10개 프로젝트 (5층 × 2창문) ===
  { id: "19", name: "쓰레드 분석기", builder_name: "빌더B", description: "내 쓰레드 성과를 분석하는 대시보드", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 2, created_at: new Date().toISOString() },
  { id: "20", name: "마이크로 SaaS", builder_name: "빌더H", description: "한 달 만에 MRR 100만원 달성 도전기", thread_url: "https://www.threads.com/@ee.yxx", floor: 0, unit: 2, created_at: new Date().toISOString() },
  { id: "21", name: "배달 최적화", builder_name: "빌더Q", description: "자영업 배달 동선 최적화 앱", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 2, created_at: new Date().toISOString() },
  { id: "22", name: "매출 예측기", builder_name: "빌더R", description: "날씨+요일 기반 매출 예측 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 1, unit: 2, created_at: new Date().toISOString() },
  { id: "23", name: "리뷰 관리자", builder_name: "빌더S", description: "네이버/카카오 리뷰 통합 관리", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 2, created_at: new Date().toISOString() },
  { id: "24", name: "POS 연동기", builder_name: "빌더T", description: "POS 데이터를 자동 정산하는 서비스", thread_url: "https://www.threads.com/@ee.yxx", floor: 2, unit: 2, created_at: new Date().toISOString() },
  { id: "25", name: "재고 알리미", builder_name: "빌더X", description: "재고 부족 시 자동 발주 알림", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 2, created_at: new Date().toISOString() },
  { id: "26", name: "메뉴 디자이너", builder_name: "빌더Y", description: "AI로 메뉴판 자동 디자인", thread_url: "https://www.threads.com/@ee.yxx", floor: 3, unit: 2, created_at: new Date().toISOString() },
  { id: "27", name: "단골 관리", builder_name: "빌더Z", description: "단골 고객 CRM 간편 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 2, created_at: new Date().toISOString() },
  { id: "28", name: "가게 홍보봇", builder_name: "빌더AA", description: "SNS 자동 포스팅 & 홍보 도구", thread_url: "https://www.threads.com/@ee.yxx", floor: 4, unit: 2, created_at: new Date().toISOString() },
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
