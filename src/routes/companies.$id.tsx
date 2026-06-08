import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  displayValue,
  FINANCIAL_KPI_FIELDS,
  formatKpiValue,
  formatListedStatus,
  formatLocation,
  formatUpdatedAt,
  hasDetailQualifications,
  hasFinancialData,
  isYes,
} from "@/lib/companyDisplay";
import { getCompanyById } from "@/services/companyService";
import type { Company } from "@/types/company";

export const Route = createFileRoute("/companies/$id")({
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.company?.company_name ?? "企业详情"} · 工作台` },
      {
        name: "description",
        content: loaderData?.company?.short_intro ?? "企业营销作战指南",
      },
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
      <div className="p-5 text-sm leading-relaxed text-foreground">{children}</div>
    </section>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <div className="text-sm text-foreground">{value}</div>
    </div>
  );
}

function QualificationBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="outline"
      className="rounded-sm border-border bg-muted/30 px-2.5 py-0.5 text-[11px] font-normal"
    >
      {children}
    </Badge>
  );
}

function DetailQualifications({ company }: { company: Company }) {
  if (!hasDetailQualifications(company)) {
    return <span className="text-sm text-muted-foreground">重点资质待补充</span>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {isYes(company.listed_status) && (
        <QualificationBadge>
          上市公司
          {company.listed_code?.trim() ? ` · ${company.listed_code.trim()}` : ""}
        </QualificationBadge>
      )}
      {isYes(company.pre_listed_status) && (
        <QualificationBadge>拟上市公司</QualificationBadge>
      )}
      {isYes(company.national_zjtx_status) && (
        <QualificationBadge>国家级专精特新</QualificationBadge>
      )}
      {isYes(company.provincial_zjtx_status) && (
        <QualificationBadge>省级专精特新</QualificationBadge>
      )}
      {isYes(company.capital_market_financing_status) && (
        <QualificationBadge>PE/VC投资企业</QualificationBadge>
      )}
      {isYes(company.dengling_status) && (
        <QualificationBadge>瞪羚企业</QualificationBadge>
      )}
      {company.industry_specific_competitive_tag?.trim() && (
        <QualificationBadge>
          行业专属竞争力标签 · {company.industry_specific_competitive_tag.trim()}
        </QualificationBadge>
      )}
    </div>
  );
}

function StrategyCard({
  title,
  content,
  placeholder,
}: {
  title: string;
  content: string | null;
  placeholder: string;
}) {
  return (
    <Card className="rounded-none border-border">
      <CardContent className="space-y-3 p-5">
        <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </div>
        <p className="text-sm leading-relaxed text-foreground/90">
          {content?.trim() ? content.trim() : placeholder}
        </p>
      </CardContent>
    </Card>
  );
}

function CompanyDetail() {
  const { company, loadFailed, errorMessage } = Route.useLoaderData();

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

      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          客群经营 · 企业营销
        </div>
        <p className="text-sm font-medium text-muted-foreground">企业营销作战指南</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {displayValue(company.company_name)}
        </h1>
      </header>

      <Section no="A" title="企业名片">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="企业名称" value={displayValue(company.company_name)} />
          <InfoItem label="统一社会信用代码" value={displayValue(company.uni_credit_id)} />
          <InfoItem
            label="所在地"
            value={formatLocation(company.province, company.city)}
          />
          <InfoItem label="所属集团" value={displayValue(company.group_name)} />
          <InfoItem
            label="上市状态"
            value={formatListedStatus(company.listed_status, company.listed_code)}
          />
          <InfoItem label="企业规模" value={displayValue(company.corp_scale)} />
          <InfoItem label="授信潜力" value={displayValue(company.credit_cat)} />
        </div>
      </Section>

      <Section no="B" title="产业链定位">
        <div className="grid gap-4 md:grid-cols-2">
          <InfoItem label="一级客群分类" value={displayValue(company.sector_cat_i)} />
          <InfoItem label="二级客群分类" value={displayValue(company.sector_cat_ii)} />
          <InfoItem label="三级客群分类" value={displayValue(company.sector_cat_iii)} />
          <InfoItem label="主营产品" value={displayValue(company.main_product)} />
          <InfoItem
            label="赛道吸引力"
            value={displayValue(company.sector_attractiveness_status)}
          />
        </div>
      </Section>

      <Section no="C" title="企业资质及竞争力点评">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              企业资质
            </div>
            <DetailQualifications company={company} />
          </div>
          <div className="space-y-3 border-t border-border pt-5">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              竞争力点评
            </div>
            <p className="text-sm leading-relaxed text-foreground/90">
              {company.short_intro?.trim() || "竞争力点评待补充"}
            </p>
          </div>
        </div>
      </Section>

      <Section no="D" title="经营与财务概览">
        {hasFinancialData(company) ? (
          <div className="grid gap-px overflow-hidden bg-border sm:grid-cols-2 lg:grid-cols-3">
            {FINANCIAL_KPI_FIELDS.map(({ key, label, suffix }) => (
              <div key={key} className="bg-card p-4">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {label}
                </div>
                <div className="mt-2 text-lg font-semibold tracking-tight text-foreground">
                  {formatKpiValue(company[key] as string | null, suffix)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">财务数据待补充</p>
        )}
      </Section>

      <Section no="E" title="经营策略一览">
        <div className="grid gap-4 md:grid-cols-3">
          <StrategyCard
            title="营销策略"
            content={company.marketing_strategy}
            placeholder="营销策略待生成：后续将基于该企业所属客群自动匹配客户经理营销手册。"
          />
          <StrategyCard
            title="风控策略"
            content={company.risk_strategy}
            placeholder="风控策略待生成：后续将基于该企业所属客群自动匹配信审评估框架。"
          />
          <StrategyCard
            title="产品推荐"
            content={company.product_recommend}
            placeholder="产品推荐待生成：后续将基于该企业所属客群自动匹配产品服务策略。"
          />
        </div>
      </Section>

      <footer className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <p>
          信息来源：{displayValue(company.source_note)}
          <span className="mx-2 text-border">|</span>
          更新时间：{formatUpdatedAt(company.updated_at)}
        </p>
      </footer>
    </div>
  );
}
