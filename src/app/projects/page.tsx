// app/projects/page.tsx
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/sanity.queries";
import type { Project } from "../../../types/index";
import { ProjectsPageClient } from "@/components/site/ProjectsPageClient";

export const revalidate = 60; // ISR

export default async function ProjectsIndex() {
  const projects = await sanityClient.fetch<Project[]>(allProjectsQuery);

  return <ProjectsPageClient projects={projects} />;
}
