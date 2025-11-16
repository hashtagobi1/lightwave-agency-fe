import Link from "next/link";
import { Project } from "../../../types/project";

export function Recommendations({ items }: { items: Project[] }) {
  return (
    <div className="pt-10">
      <h3 className="text-xl font-semibold">More projects</h3>
      <p className="text-black/60 text-sm">Hand-picked for you</p>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((c) => (
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
  );
}
