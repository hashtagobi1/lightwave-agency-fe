// src/components/site/SelectedWork.tsx
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import type { Project } from "../../../types/index";



export function SelectedWork({ projects }: { projects: Project[] }) {
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
          {projects.map((p) => {
            console.log({ p });
            const videoFiles = p.videoFiles ?? [];
            const images = p.images ?? [];

            const hasEmbed = Boolean(p.videoUrl);
            const hasUploadedVideos = videoFiles.length > 0;
            const hasImages = images.length > 0;

            const heroVideoEmbed = hasEmbed ? p.videoUrl : null;
            const heroVideoFile =
              !heroVideoEmbed && hasUploadedVideos ? videoFiles[0] : null;
            const heroImage =
              !heroVideoEmbed && !heroVideoFile && hasImages ? images[0] : null;

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
                  <div className="aspect-video rounded-xl bg-black/5 border border-black/10 mb-3 overflow-hidden">
                    {heroVideoEmbed ? (
                      <iframe
                        title={p.title}
                        className="w-full h-full"
                        src={heroVideoEmbed}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : heroVideoFile ? (
                      <video
                        className="w-full h-full"
                        src={heroVideoFile}
                        controls
                        preload="metadata"
                        playsInline
                      />
                    ) : heroImage ? (
                      <div className="w-full h-full bg-black/10">
                        {/* later: replace with next/image + urlFor(heroImage) */}
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                        Media coming soon
                      </div>
                    )}
                  </div>

                  {p.note && (
                    <p className="mt-2 text-sm text-black/60">{p.note}</p>
                  )}

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
