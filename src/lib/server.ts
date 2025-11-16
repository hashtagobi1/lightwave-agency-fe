import { projects } from "@/lib/projects";

export function getProjectBySlug(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  return { project: projects[index], index };
}

export function getAdjacentSlugs(index: number) {
  const prevIndex = (index - 1 + projects.length) % projects.length;
  const nextIndex = (index + 1) % projects.length;
  return {
    prevSlug: projects[prevIndex].slug,
    nextSlug: projects[nextIndex].slug,
  };
}

export function getRecommendations(index: number, count = 3) {
  const others = projects.filter((_, i) => i !== index);
  const rotated = others
    .slice(index % others.length)
    .concat(others.slice(0, index % others.length));
  return rotated.slice(0, Math.min(count, rotated.length));
}
