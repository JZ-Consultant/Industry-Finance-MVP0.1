import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { displayValue, formatUpdatedAt } from "@/lib/companyDisplay";
import {
  formatSectorPath,
} from "@/lib/marketingPlaybookDisplay";
import { getMarketingPlaybookById } from "@/services/marketingPlaybookService";

export const Route = createFileRoute("/marketing/$id")({
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.playbook?.playbook_title ?? "客群营销指引详情"} · 工作台`,
      },
      {
        name: "description",
        content: loaderData?.playbook?.marketing_strategy ?? "客群营销指引详情",
      },
    ],
  }),
  loader: async ({ params }) => {
    const result = await getMarketingPlaybookById(params.id);
    if (!result.playbook) throw notFound();
    return result;
  },
  pendingComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      正在加载客群营销指引...
    </div>
  ),
  notFoundComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      未找到对应客群营销指引。
      <Link to="/marketing" className="ml-2 text-[var(--primary)] hover:underline">
        返回列表
      </Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-10 text-sm text-destructive">
      加载失败：{error.message}
    </div>
  ),
  component: MarketingPlaybookDetailPage,
});

function ContentSection({ title, content }: { title: string; content: string | null }) {
  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="space-y-3 p-5">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
          {content?.trim() ? content.trim() : "待补充"}
        </p>
      </CardContent>
    </Card>
  );
}

function MarketingPlaybookDetailPage() {
  const { playbook, loadFailed, errorMessage } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
      <Link
        to="/marketing"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> 返回客群营销指引
      </Link>

      {loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          客群营销指引加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          客群经营 · 营销指引
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {displayValue(playbook.playbook_title)}
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatSectorPath(
            playbook.sector_cat_i,
            playbook.sector_cat_ii,
            playbook.sector_cat_iii,
          )}
        </p>
      </header>

      <div className="grid gap-4">
        <ContentSection title="客群基础画像" content={playbook.customer_profile} />
        <ContentSection title="关键趋势和特点" content={playbook.key_trends} />
        <ContentSection
          title="市场竞争格局及客群分层"
          content={playbook.competition_landscape}
        />
        <ContentSection
          title="企业竞争力关注要点"
          content={playbook.competitiveness_focus}
        />
        <ContentSection title="客群经营策略" content={playbook.marketing_strategy} />
        <ContentSection title="产品和业务机会" content={playbook.product_opportunities} />
        <ContentSection title="客户拜访问题" content={playbook.visit_questions} />
        <ContentSection title="风险关注点" content={playbook.risk_notes} />
      </div>

      <footer className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <p>更新时间：{formatUpdatedAt(playbook.updated_at)}</p>
      </footer>
    </div>
  );
}
