import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
} from "@/components/ui";
import { Project } from "../../../types/project";

export function SelectedWork({ projects }: { projects: Project[] }) {
  console.log({ projects });
  return (
    <section id="work" className="border-y border-black/10">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">Selected Work</h2>
          <Link
            className="text-sm text-black/60 hover:text-black"
            href="/projects"
          >
            All projects →
          </Link>
        </div>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Card key={p.slug} className="bg-transparent border-black/10">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video rounded-xl bg-black/5 border border-black/10 grid place-items-center text-black/40 text-xs">
                  Video / Image placeholder
                </div>
                <p className="mt-2 text-sm text-black/60">{p.note}</p>
                <div className="mt-4 space-y-2 text-sm">
                  <p>
                    <span className="font-semibold">Problem:</span> {p.problem}
                  </p>
                  <p>
                    <span className="font-semibold">Result:</span> {p.result}
                  </p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/projects/${p.slug}`}>View case study</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
