import { Button } from "@/components/ui";

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
        <p className="text-black/70 mt-2">
          General enquiries, reels, and treatments.
        </p>
        <Button asChild className="mt-4">
          <a href="mailto:hello@lightwave.example">hello@lightwave.example</a>
        </Button>
      </div>
    </section>
  );
}
