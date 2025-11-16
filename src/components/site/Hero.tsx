"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section id="top" ref={ref} className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight">
            Creative agency for real-world visuals.
          </h1>
          <p className="mt-4 text-black/70 max-w-xl">
            Light Wave partners with brands to capture life as it’s lived —
            clean, social-first, and culture-tuned.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#book" className="flex items-center gap-2">
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#work">View work</Link>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <motion.div
            style={{ y: y1 }}
            className="h-72 sm:h-80 rounded-2xl border border-black/10 bg-gradient-to-b from-black/5 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
