import { createFileRoute } from "@tanstack/react-router";

import { creditFramework } from "@/data";

export const Route = createFileRoute("/credit")({
  head: () => ({
    meta: [
      { title: "信审评估框架 · 汽车零部件" },
      {
        name: "description",
        content: "汽车零部件行业授信准入与风险识别框架，覆盖 8 个核心评估维度。",
      },
    ],
  }),
  component: CreditPage,
});

function CreditPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          授信准入 · 风险识别
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          汽车零部件行业信审评估框架
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          覆盖赛道景气度、技术壁垒、客户结构、订单稳定性、毛利率与现金流、产能利用率、应收账款质量及负面风险信号共 8 个维度，统一前中后台评估口径，支撑授信准入与持续风险识别。
        </p>
      </header>

      <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2">
        {creditFramework.map((c, idx) => (
          <div key={c.dim} className="bg-card p-6">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">
                  D-{String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold text-foreground">
                  {c.dim}
                </h3>
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Dimension
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
            <div className="mt-4 space-y-2">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                关键风险信号
              </div>
              <ul className="space-y-1.5">
                {c.signals.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-foreground/90"
                  >
                    <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--gold)]" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
