import Link from "next/link";
import Image from "next/image";
import type { Project } from "../../../types/index";

type AnyProject = Project & {
  slug?: string | { current?: string };
  videoFileUrls?: string[];
  videoFiles?: string[];
  images?: { url?: string }[];
};

const getSlugValue = (item: AnyProject): string => {
  const slug = item.slug as any;
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  if (slug.current && typeof slug.current === "string") return slug.current;
  return "";
};

export function Recommendations({ items }: { items: AnyProject[] }) {
  return (
    <div className="pt-10">
      <h3 className="text-xl font-semibold">More projects</h3>
      <p className="text-black/60 text-sm">Hand-picked for you</p>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => {
          const slug = getSlugValue(c);
          const videoFiles: string[] =
            (c as any).videoFileUrls ?? (c as any).videoFiles ?? [];
          const images = c.images ?? [];

          const hasEmbed = Boolean(c.videoUrl);
          const hasUploadedVideos = videoFiles.length > 0;
          const hasImages = images.length > 0;

          const heroVideoEmbed = hasEmbed ? c.videoUrl : null;
          const heroVideoFile =
            !heroVideoEmbed && hasUploadedVideos ? videoFiles[0] : null;
          const heroImage =
            !heroVideoEmbed && !heroVideoFile && hasImages ? images[0] : null;

          return (
            <Link
              key={c._id}
              href={`/projects/${slug}`}
              className="text-left rounded-xl border border-black/10 p-4 hover:bg-black/5"
              aria-label={`Open ${c.title}`}
            >
              <div className="relative aspect-video rounded-md bg-black/5 border border-black/10 mb-3 overflow-hidden">
                {heroVideoEmbed ? (
                  <iframe
                    title={c.title ?? "Project video"}
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
                ) : heroImage?.url ? (
                  <Image
                    src={heroImage.url}
                    alt={c.title ?? "Project thumbnail"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-[11px] text-black/50 px-2 text-center">
                    Media coming soon
                  </div>
                )}
              </div>

              <div className="font-medium leading-snug">{c.title}</div>
              {c.note ? (
                <div className="text-xs text-black/60 mt-1">{c.note}</div>
              ) : null}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
