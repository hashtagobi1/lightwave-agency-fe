// src/components/site/SelectedWork.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import type { Project } from "../../../types";

export function SelectedWork({ projects }: { projects: Project[] }) {
  // Only featured projects should be shown
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="work" className="border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">Selected Work</h2>
          <Link
            className="text-sm text-black/60 hover:text-black"
            href="/projects"
          >
            All projects →
          </Link>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => {
            const videoFiles = (p as any).videoFileUrls ?? [];
            const audioFiles = (p as any).audioFiles ?? [];
            const images = (p as any).images ?? [];

            const heroVideoEmbed = p.videoUrl ?? null;
            const heroVideoFile =
              !heroVideoEmbed && videoFiles[0] ? videoFiles[0] : null;
            const heroImage =
              !heroVideoEmbed && !heroVideoFile && images[0] ? images[0] : null;
            const heroAudio =
              !heroVideoEmbed && !heroVideoFile && !heroImage && audioFiles[0]
                ? audioFiles[0]
                : null;

            // Safely resolve an image URL
            let heroImageUrl: string | null = null;
            if (heroImage) {
              if (typeof (heroImage as any).url === "string") {
                heroImageUrl = (heroImage as any).url;
              } else if ((heroImage as any).asset?.url) {
                heroImageUrl = (heroImage as any).asset.url;
              }
            }

            const slug =
              typeof p.slug === "string" ? p.slug : (p as any).slug?.current;

            return (
              <Card
                key={slug ?? p._id}
                className="bg-transparent border-black/10"
              >
                <CardHeader>
                  <CardTitle>{p.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  {/* HERO MEDIA */}
                  <div className="relative aspect-video rounded-xl bg-black/5 border border-black/10 mb-3 overflow-hidden">
                    {heroVideoEmbed ? (
                      <iframe
                        aria-label={`Video embed for ${p.title}`}
                        title={p.title}
                        className="w-full h-full"
                        src={heroVideoEmbed}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : heroVideoFile ? (
                      <video
                        aria-label={`Video file for ${p.title}`}
                        className="w-full h-full"
                        src={heroVideoFile}
                        controls
                        preload="metadata"
                        playsInline
                      />
                    ) : heroImageUrl ? (
                      <Image
                        src={heroImageUrl}
                        alt={p.title ?? "Project cover image"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : heroAudio ? (
                      <div className="flex flex-col items-center justify-center h-full p-3">
                        <span className="px-2 py-0.5 mb-2 text-[10px] font-semibold bg-blue-600 text-white rounded">
                          AUDIO
                        </span>
                        <audio
                          aria-label={`Audio for ${p.title}`}
                          controls
                          src={heroAudio.url}
                          className="w-full"
                        />
                        {heroAudio.label && (
                          <p className="text-[11px] mt-1 text-black/60 text-center">
                            {heroAudio.label}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                        Media coming soon
                      </div>
                    )}
                  </div>

                  {/* NOTE */}
                  {p.note && (
                    <p className="mt-2 text-sm text-black/60">{p.note}</p>
                  )}

                  {/* PROBLEM + RESULT */}
                  <div className="mt-4 space-y-2 text-sm">
                    {p.problem && (
                      <p className="line-clamp-3">
                        <span className="font-semibold">Problem:</span>{" "}
                        {p.problem}
                      </p>
                    )}
                    {p.result && (
                      <p className="line-clamp-3">
                        <span className="font-semibold">Result:</span>{" "}
                        {p.result}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/projects/${slug}`}>View case study</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
