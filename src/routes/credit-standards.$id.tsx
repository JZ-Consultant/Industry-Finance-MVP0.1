import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { displayValue, formatUpdatedAt } from "@/lib/companyDisplay";
import { formatSectorPath } from "@/lib/marketingPlaybookDisplay";
import { getCreditStandardById } from "@/services/creditStandardService";
import { getEvaluationItems } from "@/types/creditStandard";

export const Route = createFileRoute("/credit-standards/$id")({
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.standard?.standard_title ?? "信审评估要点详情"} · 工作台`,
      },
      {
        name: "description",
        content: loaderData?.standard?.customer_intro ?? "信审评估要点详情",
      },
    ],
  }),
  loader: async ({ params }) => {
    const result = await getCreditStandardById(params.id);
    if (result.loadFailed) return result;
    if (!result.standard) throw notFound();
    return result;
  },
  pendingComponent: () => (
    <div className="px-8 py-10 text-sm text-muted-foreground">
      正在加载信审评估要点...
    </div>
  ),
  notFoundComponent: () => (
    <div className="space-y-4 px-8 py-10">
      <p className="text-sm text-muted-foreground">未找到该信审评估要点</p>
      <Button asChild variant="outline" size="sm" className="rounded-sm">
        <Link to="/credit-standards">返回信审评估要点</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="px-8 py-10 text-sm text-destructive">
      加载失败：{error.message}
    </div>
  ),
  component: CreditStandardDetailPage,
});

function CreditStandardDetailPage() {
  const { standard, loadFailed, errorMessage } = Route.useLoaderData();

  if (loadFailed || !standard) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
        <Link
          to="/credit-standards"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> 返回信审评估要点
        </Link>
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          信审评估要点加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      </div>
    );
  }

  const evaluationItems = getEvaluationItems(standard.evaluation_items);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-8 py-10">
      <Link
        to="/credit-standards"
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> 返回信审评估要点
      </Link>

      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          授信准入 · 评估要点
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          {displayValue(standard.standard_title)}
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatSectorPath(
            standard.sector_cat_i,
            standard.sector_cat_ii,
            standard.sector_cat_iii,
          )}
        </p>
      </header>

      <div className="grid gap-4">
        <Card className="rounded-sm border-border shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">客群简介</h2>
            <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/90">
              {standard.customer_intro?.trim() ? standard.customer_intro.trim() : "待补充"}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-border shadow-none">
          <CardContent className="space-y-3 p-5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              客群评估维度及评估要点
            </h2>
            {evaluationItems.length > 0 ? (
              <div className="overflow-x-auto rounded-sm border border-border">
                <Table className="min-w-[640px] table-fixed border-collapse">
                  <TableHeader>
                    <TableRow className="border-border bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[25%] border border-border px-4 py-3 text-xs font-semibold text-foreground">
                        评估维度
                      </TableHead>
                      <TableHead className="w-[75%] border border-border px-4 py-3 text-xs font-semibold text-foreground">
                        评估要点
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {evaluationItems.map((item, index) => (
                      <TableRow key={`${item.dimension}-${index}`} className="border-border">
                        <TableCell className="border border-border px-4 py-3 align-top text-sm font-semibold text-foreground">
                          {displayValue(item.dimension)}
                        </TableCell>
                        <TableCell className="border border-border px-4 py-3 align-top text-sm leading-relaxed text-foreground/90">
                          <div className="whitespace-pre-line">
                            {item.key_points?.trim() ? item.key_points.trim() : "待补充"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">暂无评估维度数据</p>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        <p>更新时间：{formatUpdatedAt(standard.updated_at ?? null)}</p>
      </footer>
    </div>
  );
}
