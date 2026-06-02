import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { industryOverview } from "@/data/industryData";

export const Route = createFileRoute("/industry")({
  head: () => ({
    meta: [
      { title: "行业概览 · 汽车零部件" },
      {
        name: "description",
        content: "汽车零部件产业链结构、区域集群、产业链机会与银行经营切入。",
      },
    ],
  }),
  component: IndustryPage,
});

function SectionHeader({
  num,
  title,
  desc,
}: {
  num: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-5 border-b border-border pb-3">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-muted-foreground">
          {num}
        </span>
        <h2 className="text-base font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      {desc && (
        <p className="mt-1 pl-8 text-xs text-muted-foreground">{desc}</p>
      )}
    </div>
  );
}

function IndustryPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-10 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          产业研究 · 行业概览
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {industryOverview.name}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          基于咨询项目积累的产业研究成果，呈现行业趋势、产业链结构、区域产业集群与银行经营机会的全景视图，支撑前台营销与中后台授信判断。
        </p>
      </header>

      <section>
        <SectionHeader num="01" title="行业趋势研判" desc="结构性增长动能与转型方向" />
        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2">
          {industryOverview.trends.map((t, i) => (
            <div key={t.title} className="bg-card p-5">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                  T-{String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {t.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          num="02"
          title="产业链结构"
          desc="从原材料到后市场的完整价值链与节点机会"
        />
        <div className="overflow-x-auto">
          <div className="flex min-w-fit items-stretch gap-2">
            {industryOverview.chain.map((c, idx) => (
              <div key={c.stage} className="flex items-stretch gap-2">
                <div className="flex w-52 flex-col border border-border bg-card">
                  <div className="border-b border-border bg-muted/40 px-3 py-2">
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      环节 {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-0.5 text-sm font-semibold text-foreground">
                      {c.stage}
                    </div>
                  </div>
                  <ul className="flex-1 space-y-1.5 p-3">
                    {c.items.map((i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-foreground">
                        <span className="h-1 w-1 bg-[var(--gold)]" />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
                {idx < industryOverview.chain.length - 1 && (
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground/60" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeader num="03" title="区域产业集群" />
        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2 lg:grid-cols-3">
          {industryOverview.regions.map((r) => (
            <div key={r.name} className="bg-card p-5">
              <div className="mb-1.5 flex items-baseline justify-between">
                <h3 className="text-sm font-semibold text-foreground">{r.name}</h3>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Cluster
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader num="04" title="银行经营切入机会" desc="产品适配与场景化方案" />
        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2 lg:grid-cols-3">
          {industryOverview.bankOpportunities.map((b, i) => (
            <Card key={b.title} className="rounded-none border-0 bg-card">
              <CardHeader className="border-b border-border bg-muted/30 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    B-{String(i + 1).padStart(2, "0")}
                  </span>
                  <CardTitle className="text-sm text-foreground">
                    {b.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {b.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
