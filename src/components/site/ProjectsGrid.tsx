// src/components/site/ProjectsGrid.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "../../../types/index";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((p, index) => {
        const slug =
          typeof p.slug === "string" ? p.slug : (p as any).slug?.current;

        const hasVideo = Boolean(p.videoUrl);
        const hasImages = p.images && p.images.length > 0;

        const delay = 0.05 + index * 0.04;

        return (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.16, 1, 0.3, 1],
              delay,
            }}
            whileHover={{ y: -4, scale: 1.01 }}
            className="h-full"
          >
            <Link
              href={`/projects/${slug}`}
              className="group block h-full border border-black/10 rounded-xl p-4 hover:bg-black/[0.02] transition-colors"
            >
              {/* Media thumb */}
              <div className="aspect-video rounded-lg bg-black/5 border border-black/10 mb-3 overflow-hidden">
                {hasVideo ? (
                  <iframe
                    title={p.title}
                    className="w-full h-full"
                    src={p.videoUrl!}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : hasImages ? (
                  <div className="grid grid-cols-2 gap-1 w-full h-full">
                    {p.images!.slice(0, 2).map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-full rounded-md bg-black/10"
                      />
                    ))}
                  </div>
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
    </div>
  );
}
