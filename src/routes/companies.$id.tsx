import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { getCompanyById } from "@/services/companyService";

export const Route = createFileRoute("/companies/$id")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.company?.name ?? "企业详情"} · 工作台` },
      { name: "description", content: loaderData?.company?.intro ?? "企业详情页" },
    ],
  }),
  loader: async ({ params }) => {
    const result = await getCompanyById(params.id);
    if (!result.company) throw notFound();
    return result;
  },
  pendingComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      正在加载企业数据...
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      未找到企业。
      <Link to="/companies" className="ml-2 text-[var(--primary)] hover:underline">
        返回名单
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-10 text-sm text-destructive">
      加载失败：{error.message}
    </div>
  ),
  component: CompanyDetail,
});

function Section({
  no,
  title,
  children,
}: {
  no: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border border-border bg-card">
      <header className="flex items-center gap-3 border-b border-border bg-muted/40 px-5 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">{no}</span>
        <h2 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </header>
      <div className="p-5 text-sm leading-relaxed text-foreground">
        {children}
      </div>
    </section>
  );
}

function BulletList({ items, accent = "gold" }: { items: string[]; accent?: "gold" | "primary" }) {
  const color = accent === "gold" ? "bg-[var(--gold)]" : "bg-[var(--primary)]";
  return (
    <ul className="space-y-2">
      {items.map((i, idx) => (
        <li key={idx} className="flex gap-2">
          <span className={`mt-2 h-1 w-1 shrink-0 ${color}`} />
          <span className="text-foreground/90">{i}</span>
        </li>
      ))}
    </ul>
  );
}

function priorityLabel(p: string) {
  if (p === "高") return { color: "bg-[var(--gold)]", text: "高优先级" };
  if (p === "中") return { color: "bg-[var(--teal)]", text: "中优先级" };
  return { color: "bg-muted-foreground/50", text: "低优先级" };
}

function CompanyDetail() {
  const { company, loadFailed, errorMessage } = Route.useLoaderData();
  const pri = priorityLabel(company.priority);

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-8 py-10">
      <Link
        to="/companies"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> 返回目标企业名单
      </Link>

      {loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          企业数据加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      <header className="space-y-3 border-b border-border pb-6">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span>{company.city}</span>
          <span className="h-3 w-px bg-border" />
          <span>{company.segment}</span>
          <span className="h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-1.5 text-foreground">
            <span className={`h-1.5 w-1.5 rounded-full ${pri.color}`} />
            {pri.text}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {company.name}
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {company.intro}
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <Section no="01" title="企业基本信息">
          <dl className="grid grid-cols-3 gap-y-2.5 text-sm">
            <dt className="text-muted-foreground">所在城市</dt>
            <dd className="col-span-2 text-foreground">{company.city}</dd>
            <dt className="text-muted-foreground">细分赛道</dt>
            <dd className="col-span-2 text-foreground">{company.segment}</dd>
            <dt className="text-muted-foreground">营销优先级</dt>
            <dd className="col-span-2 text-foreground">{pri.text}</dd>
            <dt className="text-muted-foreground">营销切入</dt>
            <dd className="col-span-2 text-foreground">{company.opportunity}</dd>
            <dt className="text-muted-foreground">风险识别</dt>
            <dd className="col-span-2 text-foreground">{company.risk}</dd>
          </dl>
        </Section>

        <Section no="02" title="主营产品与业务">
          <p className="text-foreground/90">{company.products}</p>
        </Section>

        <Section no="03" title="营销切入路径">
          <BulletList items={company.marketingHooks} accent="gold" />
        </Section>

        <Section no="04" title="产品适配方案">
          <BulletList items={company.productPlan} accent="primary" />
        </Section>

        <Section no="05" title="授信准入关注点">
          <BulletList items={company.creditFocus} accent="primary" />
        </Section>

        <Section no="06" title="客户经理拜访清单">
          <BulletList items={company.visitQuestions} accent="gold" />
        </Section>
      </div>
    </div>
  );
}
