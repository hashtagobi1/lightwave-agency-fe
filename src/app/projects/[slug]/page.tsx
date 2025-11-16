// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery, projectBySlugQuery } from "@/lib/sanity.queries";

export const runtime = "nodejs";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [project, all] = await Promise.all([
    sanityClient.fetch(projectBySlugQuery, { slug }),
    sanityClient.fetch(allProjectsQuery),
  ]);

  if (!project) return notFound();
  console.log({ project });

  const index = all.findIndex((p: any) => p.slug === slug);
  if (index === -1) return notFound();

  const prevIndex = (index - 1 + all.length) % all.length;
  const nextIndex = (index + 1) % all.length;
  const prevSlug = all[prevIndex].slug;
  const nextSlug = all[nextIndex].slug;

  const others = all.filter((p: any) => p.slug !== slug);
  const rotated = others
    .slice(index % others.length)
    .concat(others.slice(0, index % others.length));
  const recommendations = rotated.slice(0, 3);

  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <Link href="/projects" className="text-sm underline">
          ← All projects
        </Link>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          {project.title}
        </h1>
        {project.note ? (
          <p className="text-black/70 mt-1">{project.note}</p>
        ) : null}

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* Media with Prev/Next arrows */}
            <div className="relative">
              {project.videoUrl ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                  <iframe
                    title={project.title}
                    className="w-full h-full"
                    src={project.videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {(project.images || []).length ? (
                    (project.images || []).map((img: any, i: number) => (
                      <div
                        key={i}
                        className="aspect-video rounded-xl bg-black/5 border border-black/10 overflow-hidden"
                      >
                        {/* later swap to next/image + urlFor(img) */}
                      </div>
                    ))
                  ) : (
                    <div className="aspect-video rounded-xl bg-black/5 border border-black/10 grid place-items-center text-black/40 text-xs">
                      Media placeholder
                    </div>
                  )}
                </div>
              )}

              {/* Prev/Next arrows */}
              <Link
                href={`/projects/${prevSlug}`}
                aria-label="Previous project"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
              >
                ←
              </Link>
              <Link
                href={`/projects/${nextSlug}`}
                aria-label="Next project"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
              >
                →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-xl border border-black/10 p-4">
              <div className="uppercase tracking-widest text-xs text-black/60">
                Case study
              </div>
              <div className="mt-3 space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Problem:</span>{" "}
                  {project.problem}
                </p>
                <p>
                  <span className="font-semibold">Approach:</span>{" "}
                  {project.description}
                </p>
                <p>
                  <span className="font-semibold">Result:</span>{" "}
                  {project.result}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link href="/projects" className="underline text-sm">
                  ← Back
                </Link>
                <Link href="/#contact" className="underline text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="pt-10">
          <h3 className="text-xl font-semibold">More projects</h3>
          <p className="text-black/60 text-sm">Hand-picked for you</p>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((c: any) => (
              <Link
                key={c.slug}
                href={`/projects/${c.slug}`}
                className="text-left rounded-xl border border-black/10 p-4 hover:bg-black/5"
                aria-label={`Open ${c.title}`}
              >
                <div className="aspect-video rounded-md bg-black/5 border border-black/10 mb-3" />
                <div className="font-medium leading-snug">{c.title}</div>
                {c.note ? (
                  <div className="text-xs text-black/60 mt-1">{c.note}</div>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
