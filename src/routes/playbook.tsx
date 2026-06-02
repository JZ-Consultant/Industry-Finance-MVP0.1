import { createFileRoute } from "@tanstack/react-router";

import { playbookSegments } from "@/data/industryData";

export const Route = createFileRoute("/playbook")({
  head: () => ({
    meta: [
      { title: "客户经理营销手册 · 汽车零部件" },
      {
        name: "description",
        content: "按客群组织的客群画像、融资需求、营销话术、产品适配与交叉经营机会。",
      },
    ],
  }),
  component: PlaybookPage,
});

function PlaybookPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          客群经营 · 营销手册
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          客户经理营销手册
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          按细分客群组织客群特征、典型融资需求、营销切入话术、产品适配方案与交叉经营机会，供客户经理在拜访与方案制订环节直接调用。
        </p>
      </header>

      <div className="space-y-6">
        {playbookSegments.map((s, idx) => (
          <article
            key={s.segment}
            className="border border-border bg-card"
          >
            <header className="flex items-center justify-between border-b border-border bg-muted/40 px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-muted-foreground">
                  S-{String(idx + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {s.segment}
                </h2>
              </div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                客群经营方案
              </span>
            </header>

            <div className="grid gap-px bg-border md:grid-cols-2">
              <Block label="客群特征">
                <p className="text-sm leading-relaxed text-foreground/90">
                  {s.profile}
                </p>
              </Block>

              <Block label="典型融资需求">
                <ul className="space-y-1.5">
                  {s.needs.map((n) => (
                    <li key={n} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--gold)]" />
                      {n}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block label="客户经理营销话术">
                <blockquote className="border-l-2 border-[var(--gold)] bg-muted/40 px-4 py-3 text-sm leading-relaxed text-foreground">
                  {s.pitch}
                </blockquote>
              </Block>

              <Block label="推荐产品适配">
                <ul className="space-y-1.5">
                  {s.products.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-[var(--primary)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block label="交叉经营机会" full>
                <ul className="grid gap-1.5 sm:grid-cols-3">
                  {s.crossSell.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 bg-muted-foreground" />
                      {c}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Block({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`space-y-2 bg-card p-5 ${full ? "md:col-span-2" : ""}`}>
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </div>
      {children}
    </div>
  );
}
