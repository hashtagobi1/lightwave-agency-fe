"use client";

import Script from "next/script";
import { Button } from "@/components/ui";

export function Book() {
  return (
    <section id="book" className="border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12 grid lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Book a meeting</h2>
          <p className="mt-2 text-black/70">
            15 minutes to scope: timings, deliverables, budget, references.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild>
              <a href="mailto:hello@lightwave.example?subject=Project%20Enquiry">
                hello@lightwave.example
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#calendar">{'->'}</a>
            </Button>
          </div>
        </div>

        <div
          id="calendar"
          className="rounded-2xl border border-black/10 p-4 overflow-hidden"
        >
          <div
            className="calendly-inline-widget"
            data-url="https://calendly.com/anokwuruobi/lightwave-discovery-call?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: "320px", height: "700px" }}
          ></div>
        </div>
      </div>

      {/* 👇 Drop the Script tag *right here* at the bottom of your markup */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
