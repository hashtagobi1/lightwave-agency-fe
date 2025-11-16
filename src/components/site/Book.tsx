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
              <a href="#calendar">Open calendar</a>
            </Button>
          </div>
        </div>
        <div id="calendar" className="rounded-2xl border border-black/10 p-4">
          <div className="aspect-video w-full rounded-lg bg-black/5 border border-black/10 grid place-items-center text-black/50 text-sm">
            Calendly / Cal.com embed
          </div>
        </div>
      </div>
    </section>
  );
}
