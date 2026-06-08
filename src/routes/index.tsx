import { createFileRoute } from "@tanstack/react-router";

import { HomeModuleCard } from "@/components/workbench/HomeModuleCard";
import { HOME_MODULE_GROUPS } from "@/config/workbenchModules";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "首页 · 产业金融“4C”知识资产工作台" },
      {
        name: "description",
        content:
          "10年产业金融研究洞察，6大新质生产力产业主题，300+产业细分客群，专业实战的产业客户营销、风控、产品策略。",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-border bg-[var(--primary)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/70">
            <span className="h-px w-8 bg-[var(--gold)]" />
            产业金融知识资产门户
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-[34px]">
            产业金融“4C”知识资产工作台
          </h1>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-primary-foreground/75 md:text-[15px]">
            10年产业金融研究洞察，6大新质生产力产业主题，300+产业细分客群，专业实战的产业客户营销、风控、产品策略，AI驱动全面支撑银行产业金融经营升级
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-10 px-8 py-10">
        {HOME_MODULE_GROUPS.map((group, groupIndex) => (
          <section key={group.id} className="space-y-4">
            <SectionHeading
              no={String(groupIndex + 1).padStart(2, "0")}
              title={group.label}
            />
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {group.modules.map((module) => (
                <HomeModuleCard key={module.id} module={module} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function SectionHeading({ no, title }: { no: string; title: string }) {
  return (
    <div className="border-b border-border pb-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Section {no}
      </div>
      <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>
    </div>
  );
}
