import { getSupabase } from "./supabase";
import type { Project } from "./types";

// Mock data for development when Supabase is not configured
// unit: 0=AI동, 1=마케팅동, 2=자영업동, 3=B2B동, 4=유틸리티동, 5=컨텐츠동, 6=플랫폼동, 7=게임동
// floor: 0부터 시작 (0=1층, 1=2층, ...)
// 각 동에 프로젝트가 순서대로 배치됨 (1층 왼쪽→오른쪽→2층 왼쪽→...)
const MOCK_PROJECTS: Project[] = [
  // === AI동 (unit: 0) ===
  { id: "1", name: "스타트업 만물상", builder_name: "Y", description: "스타트업 창업자들과 투자자들이 한 번쯤 필요로 할 무료 도구 모음 사이트", thread_url: "https://yoongjae.com/tools/", floor: 0, unit: 0, created_at: new Date().toISOString() },
  { id: "2", name: "티치링", builder_name: "김태경", description: "실시간 강의실 좌석 배치 및 학습 진도 관리 시스템", thread_url: "https://www.threads.net/@ktree_tgkim", threads_id: "ktree_tgkim", floor: 0, unit: 0, created_at: new Date().toISOString() },
  { id: "3", name: "Smooth AI", builder_name: "달곰바미", description: "영어 미팅을 위한 실시간 AI 미팅 비서", thread_url: "https://trysmooth.ai", floor: 1, unit: 0, created_at: new Date().toISOString() },
  { id: "5", name: "scenesteller", builder_name: "엉클잡스", description: "콘텐츠 크리에이터를 위한 이미지, 영상 생성기", thread_url: "https://scenesteller.com", threads_id: "unclejobs.ai", image_url: "/images/scenesteller-logo.svg", floor: 1, unit: 0, created_at: new Date().toISOString() },

  // === B2B동 (unit: 3) ===
  { id: "4", name: "Office Gatekeeper", builder_name: "Architect", description: "엑셀 파일의 SaveAs를 막는 솔루션", thread_url: "https://gatekeeper.heritage-labs.net", threads_id: "blck_met", image_url: "/images/office-gatekeeper-logo.png", floor: 0, unit: 3, created_at: new Date().toISOString() },
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
