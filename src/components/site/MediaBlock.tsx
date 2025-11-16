export function MediaBlock({
  title,
  videoUrl,
  images = [],
}: {
  title: string;
  videoUrl?: string;
  images?: string[];
}) {
  return videoUrl ? (
    <div className="aspect-video w-full overflow-hidden rounded-xl border border-black/10">
      <iframe
        title={title}
        className="w-full h-full"
        src={videoUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  ) : (
    <div className="grid sm:grid-cols-2 gap-3">
      {images.length ? (
        images.map((_, i) => (
          <div
            key={i}
            className="aspect-video rounded-xl bg-black/5 border border-black/10"
          />
        ))
      ) : (
        <div className="aspect-video rounded-xl bg-black/5 border border-black/10 grid place-items-center text-black/40 text-xs">
          Media placeholder
        </div>
      )}
    </div>
  );
}
