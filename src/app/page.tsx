// app/page.tsx
import HomeClient from "@/components/site/HomeClient";
import { sanityClient } from "@/lib/sanity.client";
import { featuredProjectsQuery } from "@/lib/sanity.queries";

export const runtime = "nodejs";

export default async function Page() {
  const featured = await sanityClient.fetch(featuredProjectsQuery);
  return <HomeClient projects={featured} />;
}
