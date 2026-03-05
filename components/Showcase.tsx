import { getProjects } from "@/lib/projects";
import { ShowcaseClient } from "./ShowcaseClient";

export async function Showcase() {
  const projects = await getProjects();

  return <ShowcaseClient projects={projects} />;
}
