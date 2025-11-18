import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";

type Item = { name: string; style: string; link: string };
export function Roster({ items }: { items: Item[] }) {
  return (
    <section id="roster" className="border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Directors</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((d) => (
            <Card key={d.name} className="bg-transparent border-black/10">
              <CardHeader>
                <CardTitle>{d.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-3/2 rounded-xl bg-black/5 border border-black/10" />
                <p className="mt-3 text-sm text-black/60">{d.style}</p>
                <Button variant="ghost" size="sm" asChild>
                  <a href={d.link} className="underline">
                    View work
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
