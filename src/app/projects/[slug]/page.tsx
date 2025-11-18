// app/projects/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery, projectBySlugQuery } from "@/lib/sanity.queries";

export const runtime = "nodejs";

// helper to safely get slug string from different shapes
const getSlugValue = (item: any): string => {
  if (!item) return "";
  const slug = item.slug;
  if (typeof slug === "string") return slug;
  if (slug && typeof slug.current === "string") return slug.current;
  return "";
};

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

  const currentSlug = getSlugValue(project);

  let index = all.findIndex((p: any) => getSlugValue(p) === currentSlug);
  if (index === -1) index = 0;

  const prevIndex = (index - 1 + all.length) % all.length;
  const nextIndex = (index + 1) % all.length;
  const prevSlug = getSlugValue(all[prevIndex]);
  const nextSlug = getSlugValue(all[nextIndex]);

  const others = all.filter((p: any) => getSlugValue(p) !== currentSlug);
  const rotated =
    others.length > 0
      ? others
          .slice(index % others.length)
          .concat(others.slice(0, index % others.length))
      : [];
  const recommendations = rotated.slice(0, 3);

  // ---- MEDIA ARRAYS FROM GROQ PROJECTIONS ----
  const videoFileUrls: string[] = project.videoFileUrls ?? [];

  const audioUrls: string[] = project.audioFileUrls ?? [];
  const audioLabels: (string | null | undefined)[] =
    project.audioFileLabels ?? [];

  const audioFiles = audioUrls.map((url, i) => ({
    url,
    label: audioLabels[i] || undefined,
  }));

  const images = project.images ?? [];

  const hasEmbed = Boolean(project.videoUrl);
  const hasUploadedVideos = videoFileUrls.length > 0;
  const hasImages = images.length > 0;

  // hero priority: embed > first uploaded video > first image
  const heroVideoEmbed = hasEmbed ? project.videoUrl : null;
  const heroVideoFile =
    !heroVideoEmbed && hasUploadedVideos ? videoFileUrls[0] : null;
  const heroImage =
    !heroVideoEmbed && !heroVideoFile && hasImages ? images[0] : null;

  // extras (non-hero)
  const extraVideoFiles =
    heroVideoFile && videoFileUrls.length > 1
      ? videoFileUrls.slice(1)
      : heroVideoFile
        ? []
        : videoFileUrls;

  const extraImages =
    heroImage && images.length > 1 ? images.slice(1) : heroImage ? [] : images;

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

        {/* Main layout: hero media + summary */}
        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            {/* HERO MEDIA */}
            <div className="relative">
              {heroVideoEmbed ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
                  <iframe
                    title={project.title}
                    className="w-full h-full"
                    src={heroVideoEmbed}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : heroVideoFile ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black">
                  <video
                    className="w-full h-full"
                    src={heroVideoFile}
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
              ) : heroImage ? (
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10 bg-black/5">
                  {/* later: next/image + urlFor(heroImage) */}
                </div>
              ) : (
                <div className="aspect-video rounded-xl bg-black/5 border border-black/10 grid place-items-center text-black/40 text-xs">
                  Media placeholder
                </div>
              )}

              {/* Prev/Next arrows */}
              {prevSlug && (
                <Link
                  href={`/projects/${prevSlug}`}
                  aria-label="Previous project"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                >
                  ←
                </Link>
              )}
              {nextSlug && (
                <Link
                  href={`/projects/${nextSlug}`}
                  aria-label="Next project"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-white/90 px-3 py-2 text-sm shadow hover:bg-white"
                >
                  →
                </Link>
              )}
            </div>

            {/* EXTRA MEDIA: more videos + images + audio */}
            {(extraVideoFiles.length > 0 ||
              extraImages.length > 0 ||
              audioFiles.length > 0) && (
              <div className="mt-6 space-y-4">
                {extraVideoFiles.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-black/70">
                      Additional videos
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {extraVideoFiles.map((url: string, i: number) => (
                        <div
                          key={i}
                          className="aspect-video rounded-xl border border-black/10 bg-black overflow-hidden"
                        >
                          <video
                            className="w-full h-full"
                            src={url}
                            controls
                            preload="metadata"
                            playsInline
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {extraImages.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-black/70">
                      Gallery
                    </h2>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {extraImages.map((img: any, i: number) => (
                        <div
                          key={i}
                          className="aspect-video rounded-xl bg-black/5 border border-black/10 overflow-hidden"
                        >
                          {/* later: next/image + urlFor(img) */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {audioFiles.length > 0 && (
                  <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-black/70">
                      Audio
                    </h2>
                    <div className="grid gap-3">
                      {audioFiles.map((file, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-black/10 p-3 bg-white"
                        >
                          {file.label && (
                            <div className="text-xs font-medium mb-1">
                              {file.label}
                            </div>
                          )}
                          <audio
                            src={file.url}
                            controls
                            className="w-full"
                            aria-label={
                              file.label
                                ? `Audio: ${file.label}`
                                : `Audio file ${i + 1}`
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Case study summary card */}
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-black/10 p-4">
              <div className="uppercase tracking-widest text-xs text-black/60">
                Case study
              </div>

              <div className="mt-3 space-y-1 text-xs text-black/70">
                {project.role && (
                  <p>
                    <span className="font-semibold">Role:</span> {project.role}
                  </p>
                )}
                {project.format && (
                  <p>
                    <span className="font-semibold">Format:</span>{" "}
                    {project.format}
                  </p>
                )}
                {project.location && (
                  <p>
                    <span className="font-semibold">Location:</span>{" "}
                    {project.location}
                  </p>
                )}
                {project.year && (
                  <p>
                    <span className="font-semibold">Year:</span> {project.year}
                  </p>
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm">
                {project.problem && (
                  <p className="line-clamp-3">
                    <span className="font-semibold">Problem:</span>{" "}
                    {project.problem}
                  </p>
                )}
                {project.result && (
                  <p className="line-clamp-3">
                    <span className="font-semibold">Result:</span>{" "}
                    {project.result}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width “Approach” */}
        {project.description && (
          <div className="mt-10 rounded-xl border border-black/10 p-6">
            <h2 className="text-lg font-semibold">Approach</h2>
            <p className="mt-3 text-sm leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        )}

        {/* Recommendations */}
        <div className="pt-10">
          <h3 className="text-xl font-semibold">More projects</h3>
          <p className="text-black/60 text-sm">Hand-picked for you</p>
          <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((c: any) => {
              const recSlug = getSlugValue(c);
              return (
                <Link
                  key={recSlug}
                  href={`/projects/${recSlug}`}
                  className="text-left rounded-xl border border-black/10 p-4 hover:bg-black/5"
                  aria-label={`Open ${c.title}`}
                >
                  <div className="aspect-video rounded-md bg-black/5 border border-black/10 mb-3" />
                  <div className="font-medium leading-snug">{c.title}</div>
                  {c.note ? (
                    <div className="text-xs text-black/60 mt-1">{c.note}</div>
                  ) : null}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
