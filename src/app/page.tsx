// src/app/page.tsx
import HomeClient from "@/components/site/HomeClient";
import { sanityClient } from "@/lib/sanity.client";
import {
  allProjectsQuery,
  allEventsQuery,
  allBrandsQuery,
  allTeamQuery,
} from "@/lib/sanity.queries";
import type { Brand, TeamMember, Project, Event } from "../../types/index";

export const revalidate = 60;

export default async function Page() {
  const [projects, events, brands, team] = await Promise.all([
    sanityClient.fetch<Project[]>(allProjectsQuery),
    sanityClient.fetch<Event[]>(allEventsQuery),
    sanityClient.fetch<Brand[]>(allBrandsQuery),
    sanityClient.fetch<TeamMember[]>(allTeamQuery),
  ]);

  return (
    <HomeClient projects={projects} events={events} brands={brands} team={team} />
  );
}
