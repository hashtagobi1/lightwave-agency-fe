import { MediaBlock } from "./MediaBlock";

export function CaseStudy({
  title,
  note,
  problem,
  result,
  approach,
  videoUrl,
  images = [],
  rightSlot,
}: {
  title: string;
  note?: string;
  problem: string;
  result: string;
  approach: string;
  videoUrl?: string;
  images?: string[];
  rightSlot?: React.ReactNode;
}) {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
          {title}
        </h1>
        {note ? <p className="text-black/70 mt-1">{note}</p> : null}

        <div className="mt-6 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <MediaBlock title={title} videoUrl={videoUrl} images={images} />
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-xl border border-black/10 p-4">
              <div className="uppercase tracking-widest text-xs text-black/60">
                Case study
              </div>
              <div className="mt-3 space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Problem:</span> {problem}
                </p>
                <p>
                  <span className="font-semibold">Approach:</span> {approach}
                </p>
                <p>
                  <span className="font-semibold">Result:</span> {result}
                </p>
              </div>
              {rightSlot}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
