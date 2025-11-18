"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Brand } from "../../../types/index";

export function Partners({ brands }: { brands: Brand[] }) {
  if (!brands || brands.length === 0) return null;

  const scrollingBrands = [...brands, ...brands];

  return (
    <section
      id="partners"
      className="border-y border-black/10 bg-white/90"
      aria-label="Selected partners"
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
              Partners
            </h2>
            <p className="text-lg sm:text-xl font-medium mt-1">
              Brands and organisations we’ve worked with
            </p>
          </div>
        </div>

        {/* Scrolling strip of logos */}
        <div className="mt-6 relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-6 sm:gap-10 items-center"
              // scroll from 0 to -50% so the duplicate list lines up
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              }}
            >
              {scrollingBrands.map((brand, index) => (
                <LogoPill key={`${brand._id}-${index}`} brand={brand} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoPill({ brand }: { brand: Brand }) {
  const content = (
    <div className="flex h-14 sm:h-16 items-center justify-center px-6 sm:px-8 rounded-xl border border-black/10 bg-white/80 backdrop-blur shadow-sm">
      {brand.logoUrl ? (
        <Image
          src={brand.logoUrl}
          alt={brand.name ?? "Brand logo"}
          width={140}
          height={40}
          className="max-h-8 sm:max-h-10 w-auto object-contain"
        />
      ) : (
        <span className="text-xs sm:text-sm text-black/60 text-center">
          {brand.name}
        </span>
      )}
    </div>
  );

  if (brand.url) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        aria-label={brand.name}
        className="shrink-0"
      >
        {content}
      </a>
    );
  }

  return <div className="shrink-0">{content}</div>;
}
