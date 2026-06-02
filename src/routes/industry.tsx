import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { industryOverview } from "@/data/industryData";

export const Route = createFileRoute("/industry")({
  head: () => ({
    meta: [
      { title: "行业概览 · 汽车零部件" },
      {
        name: "description",
        content: "汽车零部件行业趋势、产业链、重点区域与银行机会概览。",
      },
    ],
  }),
  component: IndustryPage,
});

function SectionTitle({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-baseline gap-3">
        <span className="text-xs font-mono text-muted-foreground">{num}</span>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      </div>
      {desc && (
        <p className="mt-1 pl-8 text-sm text-muted-foreground">{desc}</p>
      )}
    </div>
  );
}

function IndustryPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">
      <header className="space-y-2 border-b pb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          行业概览
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          {industryOverview.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          基于咨询项目积累的行业研究成果，呈现行业趋势、产业链、重点区域与银行机会的全景视图。
        </p>
      </header>

      <section>
        <SectionTitle num="01" title="行业趋势" />
        <div className="grid gap-4 md:grid-cols-2">
          {industryOverview.trends.map((t) => (
            <Card key={t.title} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle num="02" title="产业链环节" desc="从原材料到后市场的完整产业链结构" />
        <div className="overflow-x-auto">
          <div className="flex min-w-fit items-stretch gap-2">
            {industryOverview.chain.map((c, idx) => (
              <div key={c.stage} className="flex items-stretch gap-2">
                <Card className="w-52 border-border/70">
                  <CardHeader className="pb-2">
                    <CardDescription className="text-xs">
                      环节 {idx + 1}
                    </CardDescription>
                    <CardTitle className="text-sm">{c.stage}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-1.5">
                    {c.items.map((i) => (
                      <Badge key={i} variant="secondary" className="font-normal">
                        {i}
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
                {idx < industryOverview.chain.length - 1 && (
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionTitle num="03" title="重点区域" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {industryOverview.regions.map((r) => (
            <Card key={r.name} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{r.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{r.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle num="04" title="银行机会" />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {industryOverview.bankOpportunities.map((b) => (
            <Card key={b.title} className="border-border/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-primary">
                  {b.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
