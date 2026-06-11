import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatUpdatedAt } from "@/lib/companyDisplay";
import { supabase } from "@/lib/supabase";
import { getCreditStandards } from "@/services/creditStandardService";
import { getDueDiligenceCaseById } from "@/services/dueDiligenceCaseService";
import type { CreditStandard } from "@/types/creditStandard";
import {
  getCaseCategoryPath,
  getCaseReportTitle,
} from "@/types/dueDiligenceCase";

export const Route = createFileRoute("/due-diligence-cases/$id")({
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${
          loaderData?.caseItem
            ? getCaseReportTitle(loaderData.caseItem)
            : "尽调实战案例详情"
        } · 工作台`,
      },
      {
        name: "description",
        content: loaderData?.caseItem?.case_summary ?? "尽调实战案例详情",
      },
    ],
  }),
  loader: async ({ params }) => {
    const result = await getDueDiligenceCaseById(params.id);

    if (result.loadFailed) {
      return {
        ...result,
        matchedCompanyId: null,
        matchedCreditStandard: null,
      };
    }

    if (!result.caseItem) {
      throw notFound();
    }

    const matchedCompanyId = await findMatchedCompanyId(result.caseItem.company_name);

    const creditStandardsResult = await getCreditStandards();
    const matchedCreditStandard = creditStandardsResult.loadFailed
      ? null
      : findCreditStandardBySector(
          creditStandardsResult.standards,
          result.caseItem.sector_cat_i,
          result.caseItem.sector_cat_ii,
          result.caseItem.sector_cat_iii,
        );

    return {
      ...result,
      matchedCompanyId,
      matchedCreditStandard,
    };
  },
  pendingComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      正在加载尽调实战案例...
    </div>
  ),
  notFoundComponent: () => (
    <div className="space-y-4 px-8 py-10">
      <p className="text-sm text-muted-foreground">未找到该尽调实战案例</p>
      <Button asChild variant="outline" size="sm" className="rounded-sm">
        <Link to="/due-diligence-cases">返回尽调实战案例</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-10 text-sm text-destructive">
      加载失败：{error.message}
    </div>
  ),
  component: DueDiligenceCaseDetailPage,
});

async function findMatchedCompanyId(companyName: string): Promise<string | null> {
  const trimmed = companyName.trim();
  if (!trimmed) return null;

  try {
    const escaped = escapePostgrestValue(trimmed);
    const { data: matchedRows, error } = await supabase
      .from("companies")
      .select("id, company_name, corp_name")
      .or(`company_name.eq.${escaped},corp_name.eq.${escaped}`);

    if (error) {
      console.error("Supabase find company for due diligence case error:", error);

      const { data: byCompanyName, error: companyNameError } = await supabase
        .from("companies")
        .select("id, company_name")
        .eq("company_name", trimmed)
        .maybeSingle();

      if (companyNameError) {
        console.error("Supabase find company by company_name error:", companyNameError);
        return null;
      }

      return byCompanyName?.id ?? null;
    }

    const companyNameMatch = matchedRows?.find(
      (row) => String(row.company_name ?? "").trim() === trimmed,
    );
    if (companyNameMatch?.id) {
      return companyNameMatch.id;
    }

    const corpNameMatch = matchedRows?.find(
      (row) => String(row.corp_name ?? "").trim() === trimmed,
    );
    return corpNameMatch?.id ?? null;
  } catch (error) {
    console.error("Failed to match company for due diligence case:", error);
    return null;
  }
}

function escapePostgrestValue(value: string): string {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

function findCreditStandardBySector(
  standards: CreditStandard[],
  sectorCatI: string | null | undefined,
  sectorCatII: string | null | undefined,
  sectorCatIII: string | null | undefined,
): CreditStandard | null {
  const normalizedI = sectorCatI?.trim();
  const normalizedII = sectorCatII?.trim();
  const normalizedIII = sectorCatIII?.trim();

  if (!normalizedI || !normalizedII || !normalizedIII) {
    return null;
  }

  return (
    standards.find(
      (standard) =>
        standard.sector_cat_i === normalizedI &&
        standard.sector_cat_ii === normalizedII &&
        standard.sector_cat_iii === normalizedIII,
    ) ?? null
  );
}

function ContentSection({ title, content }: { title: string; content: string | null | undefined }) {
  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="space-y-3 p-5">
        <h2 className="text-sm font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
          {content?.trim() ? content.trim() : "暂无内容"}
        </p>
      </CardContent>
    </Card>
  );
}

function DueDiligenceCaseDetailPage() {
  const { caseItem, loadFailed, errorMessage, matchedCompanyId, matchedCreditStandard } =
    Route.useLoaderData();

  if (loadFailed || !caseItem) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
        <Link
          to="/due-diligence-cases"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 返回尽调实战案例
        </Link>
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          尽调实战案例加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      </div>
    );
  }

  const categoryPath = getCaseCategoryPath(caseItem);
  const hasAssociationLinks = Boolean(matchedCompanyId || matchedCreditStandard);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
      <Link
        to="/due-diligence-cases"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> 返回尽调实战案例
      </Link>

      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          实战案例 · 企业尽调
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {getCaseReportTitle(caseItem)}
        </h1>
        <p className="text-sm text-muted-foreground">
          {categoryPath || "暂无内容"}
        </p>
      </header>

      <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        本案例内容用于产业研究、客户经营和授信申报准备过程中的参考，不替代银行正式授信审批意见。
      </div>

      <div className="grid gap-4">
        <Card className="rounded-sm border-border shadow-none">
          <CardContent className="space-y-4 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              企业基本信息
            </h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <InfoItem
                label="企业名称"
                value={caseItem.company_name?.trim() || "暂无内容"}
              />
              <InfoItem
                label="产业分类"
                value={categoryPath || "暂无内容"}
              />
              <InfoItem
                label="更新时间"
                value={
                  caseItem.updated_at?.trim()
                    ? formatUpdatedAt(caseItem.updated_at)
                    : "暂无内容"
                }
              />
            </dl>

            {hasAssociationLinks && (
              <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                {matchedCompanyId && (
                  <Link
                    to="/companies/$id"
                    params={{ id: matchedCompanyId }}
                    className="inline-flex h-8 w-fit items-center rounded-sm border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    查看目标企业详情
                  </Link>
                )}
                {matchedCreditStandard && (
                  <Link
                    to="/credit-standards/$id"
                    params={{ id: matchedCreditStandard.id }}
                    className="inline-flex h-8 w-fit items-center rounded-sm border border-input bg-background px-3 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    查看对应客群信审评估要点
                  </Link>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <ContentSection title="案例摘要" content={caseItem.case_summary} />
        <ContentSection title="企业与业务背景" content={caseItem.company_background} />
        <ContentSection title="尽调分析内容" content={caseItem.due_diligence_content} />
        <ContentSection title="风险提示" content={caseItem.key_risks} />
        <ContentSection title="策略建议" content={caseItem.credit_suggestions} />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <dt className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="leading-relaxed text-foreground/90">{value}</dd>
    </div>
  );
}
