// app/projects/page.tsx
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsIndex() {
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
            {/* Thumb / placeholder */}
            <div className="aspect-video rounded-lg bg-black/5 border border-black/10 mb-3" />

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
