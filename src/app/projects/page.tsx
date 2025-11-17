// app/projects/page.tsx
import Link from "next/link";
import { sanityClient } from "@/lib/sanity.client";
import { allProjectsQuery } from "@/lib/sanity.queries";
import type { Project } from "../../../types/project";
 // adjust if your path is different

export const revalidate = 60; // optional: ISR, revalidate every 60s

export default async function ProjectsIndex() {
  const projects = await sanityClient.fetch<Project[]>(allProjectsQuery);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">All projects</h1>
          <p className="text-sm text-black/60 mt-1">
            A selection of LightWave work across music, brands and live
            performance.
          </p>
        </div>
        <Link href="/" className="text-sm underline">
          ← Back home
        </Link>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="group border border-black/10 rounded-xl p-4 hover:bg-black/5 transition-colors"
          >
            {/* Media thumb */}
            <div className="aspect-video rounded-lg bg-black/5 border border-black/10 mb-3 overflow-hidden">
              {p.videoUrl ? (
                // 1) Prioritise video if present
                <iframe
                  title={p.title}
                  className="w-full h-full"
                  src={p.videoUrl}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : p.images && p.images.length ? (
                // 2) Else, simple image grid if we have images
                <div className="grid grid-cols-2 gap-1 w-full h-full">
                  {p.images.slice(0, 2).map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-full rounded-md bg-black/10"
                    />
                  ))}
                </div>
              ) : (
                // 3) Else, placeholder text
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
        ))}
      </div>
    </main>
  );
}
