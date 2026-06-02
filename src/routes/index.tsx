import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Megaphone,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Landmark,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { industryOverview } from "@/data/industryData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "首页 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "面向商业银行客户经理的行业研究、目标客户筛选、营销策略与信审评估智能工作台",
      },
    ],
  }),
  component: Dashboard,
});

const features = [
  {
    title: "行业知识库",
    desc: "行业趋势、产业链结构、区域分布与银行机会全景。",
    url: "/industry",
    icon: BookOpen,
  },
  {
    title: "目标企业名单",
    desc: "结构化的目标客户清单，支持多维筛选与精准触达。",
    url: "/companies",
    icon: Building2,
  },
  {
    title: "客户经理营销手册",
    desc: "分客群的营销话术、产品组合与交叉销售路径。",
    url: "/playbook",
    icon: Megaphone,
  },
  {
    title: "信审评估框架",
    desc: "行业化信审维度、关键信号与负面预警清单。",
    url: "/credit",
    icon: ShieldCheck,
  },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-6 py-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          产业金融知识资产工作台
        </h1>
        <p className="text-sm text-muted-foreground">
          面向商业银行客户经理的行业研究、目标客户筛选、营销策略与信审评估智能工作台
        </p>
      </header>

      <section>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          核心模块
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <Link key={f.title} to={f.url} className="group">
              <Card className="h-full border-border/70 transition-colors hover:border-primary/40 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-md border bg-muted/40 p-2">
                        <f.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-base">{f.title}</CardTitle>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </div>
                  <CardDescription className="pt-2">{f.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              当前示例行业
            </h2>
            <p className="mt-1 text-xl font-semibold text-foreground">
              {industryOverview.name}
            </p>
          </div>
          <Link
            to="/industry"
            className="text-sm text-primary hover:underline"
          >
            查看行业概览 →
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            icon={<TrendingUp className="h-4 w-4" />}
            label="行业景气度"
            value={industryOverview.sentiment}
          />
          <SummaryCard
            icon={<MapPin className="h-4 w-4" />}
            label="重点区域"
            value={industryOverview.region}
          />
          <SummaryCard
            icon={<Landmark className="h-4 w-4" />}
            label="银行机会"
            value={industryOverview.bankOpportunity}
          />
        </div>
      </section>
    </div>
  );
}

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-border/70">
      <CardContent className="space-y-2 p-5">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {icon}
          <span>{label}</span>
        </div>
        <p className="text-sm font-medium leading-relaxed text-foreground">
          {value}
        </p>
      </CardContent>
    </Card>
  );
}
