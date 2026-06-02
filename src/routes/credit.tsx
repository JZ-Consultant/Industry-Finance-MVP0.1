import { createFileRoute } from "@tanstack/react-router";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { creditFramework } from "@/data/industryData";

export const Route = createFileRoute("/credit")({
  head: () => ({
    meta: [
      { title: "信审评估框架 · 汽车零部件" },
      {
        name: "description",
        content: "汽车零部件行业信审维度、关键信号与负面预警清单。",
      },
    ],
  }),
  component: CreditPage,
});

function CreditPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <header className="space-y-2 border-b pb-6">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          信审框架
        </p>
        <h1 className="text-2xl font-semibold tracking-tight">
          汽车零部件行业信审评估框架
        </h1>
        <p className="text-sm text-muted-foreground">
          覆盖赛道景气度、技术壁垒、客户结构、订单稳定性、毛利率、产能、应收账款与负面信号共 8 个维度，供前中后台共同使用。
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {creditFramework.map((c, idx) => (
          <Card key={c.dim} className="border-border/70">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-muted-foreground">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <CardTitle className="text-base">{c.dim}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {c.desc}
              </p>
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
                  关键信号
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {c.signals.map((s) => (
                    <Badge key={s} variant="secondary" className="font-normal">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
