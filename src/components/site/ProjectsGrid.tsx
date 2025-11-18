// src/components/site/ProjectsGrid.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "../../../types/index";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {projects.map((p) => {
        const slug =
          typeof p.slug === "string" ? p.slug : (p as any).slug?.current;

        // from GROQ: "videoFileUrls": videoFiles[].asset->url
        const videoFiles: string[] = (p as any).videoFileUrls ?? [];
        // from GROQ: images[]{ ..., "url": asset->url }
        const images: { url?: string }[] = ((p as any).images ?? []) as any[];

        const hasEmbed = Boolean(p.videoUrl);
        const hasVideoFile = videoFiles.length > 0;
        const hasImage = images.length > 0;

        const heroVideoEmbed = hasEmbed ? p.videoUrl : null;
        const heroVideoFile =
          !heroVideoEmbed && hasVideoFile ? videoFiles[0] : null;
        const heroImage =
          !heroVideoEmbed && !heroVideoFile && hasImage ? images[0] : null;

        return (
          <motion.div
            key={p._id}
            variants={cardVariants}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-full"
          >
            <Link
              href={`/projects/${slug}`}
              className="group block h-full border border-black/10 rounded-xl p-4 hover:bg-black/[0.02] transition-colors"
            >
              {/* Media thumb */}
              <div className="aspect-video rounded-lg bg-black/5 border border-black/10 mb-3 overflow-hidden relative">
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
                    aria-label={`Video for ${p.title}`}
                  />
                ) : heroImage?.url ? (
                  <Image
                    src={heroImage.url}
                    alt={p.title ?? "Project image"}
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

              <h2 className="font-semibold leading-snug group-hover:underline">
                {p.title}
              </h2>

              {p.note && <p className="text-xs text-black/60 mt-1">{p.note}</p>}

              {(p.client || p.year) && (
                <p className="text-xs text-black/60 mt-1">
                  {p.client}
                  {p.client && p.year ? " • " : ""}
                  {p.year}
                </p>
              )}

              {p.result && (
                <p className="text-xs text-black/80 mt-2 line-clamp-2">
                  <span className="font-semibold">Result:</span> {p.result}
                </p>
              )}

              <span className="text-xs underline mt-3 inline-block">
                View case study →
              </span>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
