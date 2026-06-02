import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { companies } from "@/data/industryData";

export const Route = createFileRoute("/companies/$id")({
  head: ({ params }) => {
    const c = companies.find((x) => x.id === params.id);
    return {
      meta: [
        { title: `${c?.name ?? "企业详情"} · 工作台` },
        {
          name: "description",
          content: c?.intro ?? "企业详情页",
        },
      ],
    };
  },
  loader: ({ params }) => {
    const company = companies.find((c) => c.id === params.id);
    if (!company) throw notFound();
    return { company };
  },
  notFoundComponent: () => (
    <div className="px-6 py-10 text-sm text-muted-foreground">
      未找到企业。
      <Link to="/companies" className="ml-2 text-primary hover:underline">
        返回名单
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-6 py-10 text-sm text-destructive">
      加载失败：{error.message}
    </div>
  ),
  component: CompanyDetail,
});

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border/70">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-foreground">
        {children}
      </CardContent>
    </Card>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span className="text-muted-foreground">{i}</span>
        </li>
      ))}
    </ul>
  );
}

function CompanyDetail() {
  const { company } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">
      <Link
        to="/companies"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> 返回企业名单
      </Link>

      <header className="space-y-3 border-b pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">{company.city}</Badge>
          <Badge variant="secondary">{company.segment}</Badge>
          <Badge>推荐优先级：{company.priority}</Badge>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{company.name}</h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {company.intro}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title="01 · 企业基本信息">
          <dl className="grid grid-cols-3 gap-y-2 text-sm">
            <dt className="text-muted-foreground">所在城市</dt>
            <dd className="col-span-2">{company.city}</dd>
            <dt className="text-muted-foreground">细分赛道</dt>
            <dd className="col-span-2">{company.segment}</dd>
            <dt className="text-muted-foreground">推荐优先级</dt>
            <dd className="col-span-2">{company.priority}</dd>
            <dt className="text-muted-foreground">银行切入机会</dt>
            <dd className="col-span-2">{company.opportunity}</dd>
            <dt className="text-muted-foreground">风险关注点</dt>
            <dd className="col-span-2">{company.risk}</dd>
          </dl>
        </Section>

        <Section title="02 · 企业主营产品">
          <p>{company.products}</p>
        </Section>

        <Section title="03 · 推荐营销切入点">
          <BulletList items={company.marketingHooks} />
        </Section>

        <Section title="04 · 推荐银行产品方案">
          <BulletList items={company.productPlan} />
        </Section>

        <Section title="05 · 信审评估关注点">
          <BulletList items={company.creditFocus} />
        </Section>

        <Section title="06 · 客户经理拜访问题清单">
          <BulletList items={company.visitQuestions} />
        </Section>
      </div>
    </div>
  );
}
