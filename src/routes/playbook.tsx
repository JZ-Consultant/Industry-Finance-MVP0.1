import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { playbookSegments } from "@/data/industryData";

export const Route = createFileRoute("/playbook")({
  head: () => ({
    meta: [
      { title: "客户经理营销手册 · 汽车零部件" },
      {
        name: "description",
        content: "按细分客群组织的营销话术、产品组合与交叉销售机会。",
      },
    ],
  }),
  component: PlaybookPage,
});

function PlaybookPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <header className="space-y-2 border-b pb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          营销手册
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          客户经理营销手册
        </h1>
        <p className="text-sm text-muted-foreground">
          按细分客群组织的客户画像、典型需求、推荐话术、产品组合与交叉销售机会，供客户经理直接调用。
        </p>
      </header>

      <div className="space-y-6">
        {playbookSegments.map((s, idx) => (
          <Card key={s.segment} className="border-border/70">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-lg">{s.segment}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <Block label="客群特征">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.profile}
                </p>
              </Block>

              <Block label="典型融资需求">
                <div className="flex flex-wrap gap-1.5">
                  {s.needs.map((n) => (
                    <Badge key={n} variant="secondary" className="font-normal">
                      {n}
                    </Badge>
                  ))}
                </div>
              </Block>

              <Block label="客户经理营销话术">
                <blockquote className="rounded-md border-l-2 border-primary bg-muted/40 px-4 py-3 text-sm italic leading-relaxed text-foreground">
                  “{s.pitch}”
                </blockquote>
              </Block>

              <Block label="推荐产品组合">
                <div className="flex flex-wrap gap-1.5">
                  {s.products.map((p) => (
                    <Badge key={p} className="font-normal">
                      {p}
                    </Badge>
                  ))}
                </div>
              </Block>

              <Block label="交叉销售机会">
                <div className="flex flex-wrap gap-1.5">
                  {s.crossSell.map((c) => (
                    <Badge key={c} variant="outline" className="font-normal">
                      {c}
                    </Badge>
                  ))}
                </div>
              </Block>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}
