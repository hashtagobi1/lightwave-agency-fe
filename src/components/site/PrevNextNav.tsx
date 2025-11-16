import Link from "next/link";

export function PrevNextNav({
  prevSlug,
  nextSlug,
}: {
  prevSlug: string;
  nextSlug: string;
}) {
  return (
    <>
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
    </>
  );
}
