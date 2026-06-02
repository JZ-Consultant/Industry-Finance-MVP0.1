import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Megaphone,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { companies, industryOverview, playbookSegments, creditFramework } from "@/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "首页 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "沉淀产业研究、目标客群、营销策略与信审框架，赋能商业银行产业金融经营。",
      },
    ],
  }),
  component: Dashboard,
});

const modules = [
  {
    no: "01",
    title: "行业知识库",
    desc: "行业趋势、产业链结构、区域产业集群与银行经营机会全景。",
    meta: "4 项行业趋势 · 5 段产业链 · 5 个重点区域",
    url: "/industry",
    icon: BookOpen,
  },
  {
    no: "02",
    title: "目标企业名单",
    desc: "结构化的目标客群清单，支持按城市、赛道、优先级筛选，定位营销切入点。",
    meta: "8 家重点企业 · 多维筛选",
    url: "/companies",
    icon: Building2,
  },
  {
    no: "03",
    title: "客户经理营销手册",
    desc: "按细分客群组织客群特征、典型需求、营销话术与产品适配方案。",
    meta: "4 类客群 · 营销话术 + 产品组合",
    url: "/playbook",
    icon: Megaphone,
  },
  {
    no: "04",
    title: "信审评估框架",
    desc: "覆盖授信准入到风险识别的 8 个行业化维度，统一前中后台评估口径。",
    meta: "8 个维度 · 关键信号清单",
    url: "/credit",
    icon: ShieldCheck,
  },
];

function Dashboard() {
  const highPriority = companies.filter((c) => c.priority === "高").length;

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="border-b border-border bg-[var(--primary)] text-primary-foreground">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/70">
            <span className="h-px w-8 bg-[var(--gold)]" />
            产业金融经营驾驶舱
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-[34px]">
            产业金融知识资产工作台
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-primary-foreground/75 md:text-[15px]">
            沉淀产业研究、目标客群、营销策略与信审框架，赋能商业银行产业金融经营。
            将咨询项目积累的行业洞察与方法论，转化为客户经理、产品经理与风险审批可直接调用的数字化资产。
          </p>

          <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-primary-foreground/15 md:grid-cols-3">
            <HeroStat
              label="已沉淀行业知识资产"
              value={industryOverview.name}
              detail={`${industryOverview.trends.length} 项趋势 · ${industryOverview.chain.length} 段产业链 · ${creditFramework.length} 维信审框架`}
            />
            <HeroStat
              label="重点目标客群"
              value={`${companies.length} 家重点企业`}
              detail={`高优先级 ${highPriority} 家 · 覆盖 ${new Set(companies.map((c) => c.segment)).size} 个细分赛道`}
            />
            <HeroStat
              label="银行经营机会"
              value={`${industryOverview.bankOpportunities.length} 类产品切入`}
              detail="设备更新 · 供应链金融 · 跨境与并购"
            />
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-7xl px-8 py-10">
        <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Section 01
            </div>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">
              知识资产模块
            </h2>
          </div>
          <div className="text-xs text-muted-foreground">
            点击任一模块进入详情
          </div>
        </div>

        <div className="grid gap-px overflow-hidden bg-border md:grid-cols-2">
          {modules.map((m) => (
            <Link key={m.title} to={m.url} className="group bg-card">
              <div className="flex h-full flex-col gap-3 p-6 transition-colors hover:bg-muted/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {m.no}
                    </span>
                    <m.icon className="h-4 w-4 text-[var(--primary)]" />
                    <h3 className="text-[15px] font-semibold tracking-tight text-foreground">
                      {m.title}
                    </h3>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-[var(--primary)]" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.desc}
                </p>
                <div className="mt-auto pt-3 text-[11px] uppercase tracking-wider text-muted-foreground/80">
                  {m.meta}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industry snapshot */}
      <section className="mx-auto max-w-7xl px-8 pb-14">
        <div className="mb-5 flex items-end justify-between border-b border-border pb-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Section 02
            </div>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">
              当前示例行业 · {industryOverview.name}
            </h2>
          </div>
          <Link
            to="/industry"
            className="text-xs text-[var(--primary)] hover:underline"
          >
            查看完整行业概览 →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SnapshotCard label="景气度判断" value={industryOverview.sentiment} />
          <SnapshotCard label="区域产业集群" value={industryOverview.region} />
          <SnapshotCard label="银行经营切入" value={industryOverview.bankOpportunity} />
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="p-5">
              <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                客群经营覆盖
              </div>
              <ul className="space-y-2 text-sm">
                {playbookSegments.map((s) => (
                  <li key={s.segment} className="flex items-start gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 bg-[var(--gold)]" />
                    <span className="text-foreground">{s.segment}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <div className="mb-3 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                授信准入 · 关键维度
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground">
                {creditFramework.map((c, i) => (
                  <div key={c.dim} className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{c.dim}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

function HeroStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="bg-[var(--primary)] p-6">
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">
        {label}
      </div>
      <div className="mt-3 text-xl font-semibold tracking-tight text-primary-foreground">
        {value}
      </div>
      <div className="mt-2 text-xs text-primary-foreground/65">{detail}</div>
    </div>
  );
}

function SnapshotCard({ label, value }: { label: string; value: string }) {
  return (
    <Card>
      <CardContent className="space-y-2 p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </div>
        <p className="text-sm font-medium leading-relaxed text-foreground">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
