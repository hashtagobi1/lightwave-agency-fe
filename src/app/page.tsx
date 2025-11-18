// src/app/page.tsx
import HomeClient from "@/components/site/HomeClient";
import { sanityClient } from "@/lib/sanity.client";
import {
  allProjectsQuery,
  allBrandsQuery,
  allTeamQuery,
} from "@/lib/sanity.queries";
import type { Brand, TeamMember, Project } from "../../types/index";

export const revalidate = 60;

export default async function Page() {
  const [projects, brands, team] = await Promise.all([
    sanityClient.fetch<Project[]>(allProjectsQuery),
    sanityClient.fetch<Brand[]>(allBrandsQuery),
    sanityClient.fetch<TeamMember[]>(allTeamQuery),
  ]);

  return <HomeClient projects={projects} brands={brands} team={team} />;
}
