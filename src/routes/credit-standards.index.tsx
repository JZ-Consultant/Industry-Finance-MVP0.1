import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CREDIT_INDUSTRY_THEMES,
  getCreditStandardsByTheme,
  getCreditThemeStats,
  type CreditIndustryTheme,
} from "@/lib/creditIndustryThemes";
import { formatSectorPath } from "@/lib/marketingPlaybookDisplay";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { getCreditStandards } from "@/services/creditStandardService";
import { getEvaluationItems, type CreditStandard } from "@/types/creditStandard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/credit-standards/")({
  head: () => ({
    meta: [
      { title: "信审评估标准 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "按产业主题与细分客群沉淀授信评估框架、竞争力分析要点和关键风险识别信号，辅助客户经理和信审人员开展产业化风险判断。",
      },
    ],
  }),
  component: CreditStandardsPage,
});

function getCreditThemeByKey(key: string): CreditIndustryTheme | undefined {
  return CREDIT_INDUSTRY_THEMES.find((theme) => theme.key === key);
}

function summarizeIntro(value: string | null | undefined, maxLength = 140): string {
  const text = value?.trim();
  if (!text) return "待补充";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}

function formatStandardSource(
  sourceDoc: string | null | undefined,
  sourcePages: string | null | undefined,
): string {
  const doc = sourceDoc?.trim();
  const pages = sourcePages?.trim();

  if (doc && pages) return `${doc} · 第 ${pages} 页`;
  if (doc) return doc;
  if (pages) return `第 ${pages} 页`;
  return "待补充";
}

function getEvaluationDimensions(standard: CreditStandard, limit = 5): string[] {
  const items = getEvaluationItems(standard.evaluation_items);
  const dimensions: string[] = [];

  for (const item of items) {
    const dimension = item.dimension?.trim();
    if (!dimension || dimensions.includes(dimension)) continue;
    dimensions.push(dimension);
    if (dimensions.length >= limit) break;
  }

  return dimensions;
}

function CreditStandardsPage() {
  const [selectedThemeKey, setSelectedThemeKey] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["credit-standards"],
    queryFn: getCreditStandards,
  });

  const standards = data?.standards ?? [];
  const loadFailed = data?.loadFailed ?? false;
  const errorMessage = data?.errorMessage;

  const selectedTheme = selectedThemeKey ? getCreditThemeByKey(selectedThemeKey) : undefined;
  const showListView = selectedThemeKey !== null;

  const filteredStandards = useMemo(() => {
    if (!selectedTheme) return [];
    return getCreditStandardsByTheme(standards, selectedTheme);
  }, [standards, selectedTheme]);

  const handleViewTheme = (themeKey: string) => {
    setSelectedThemeKey(themeKey);
  };

  const handleBackToThemes = () => {
    setSelectedThemeKey(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow="授信准入 · 评估标准"
        title="信审评估标准"
        subtitle="按产业主题与细分客群沉淀授信评估框架、竞争力分析要点和关键风险识别信号，辅助客户经理和信审人员开展产业化风险判断。"
      />

      <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        本模块内容用于客户经理营销、尽调和授信申报准备过程中的参考，不替代银行正式授信政策、审批规则及合规要求。
      </div>

      {isLoading && (
        <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          正在加载信审评估标准...
        </div>
      )}

      {!isLoading && loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          信审评估标准加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      {!isLoading && !showListView && (
        <IndustryThemeGrid standards={standards} onViewTheme={handleViewTheme} />
      )}

      {!isLoading && showListView && selectedTheme && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold tracking-tight text-foreground">
                {selectedTheme.title} · 信审评估标准
              </h2>
              <p className="text-xs text-muted-foreground">
                共 {filteredStandards.length} 条信审评估标准
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm"
              onClick={handleBackToThemes}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              返回全部产业主题
            </Button>
          </div>

          {filteredStandards.length === 0 ? (
            <div className="rounded-sm border border-border bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
              该产业主题下暂无信审评估标准
            </div>
          ) : (
            <StandardCardGrid standards={filteredStandards} />
          )}
        </div>
      )}
    </div>
  );
}

function IndustryThemeGrid({
  standards,
  onViewTheme,
}: {
  standards: CreditStandard[];
  onViewTheme: (themeKey: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {CREDIT_INDUSTRY_THEMES.map((theme) => {
        const stats = getCreditThemeStats(standards, theme);
        const isAvailable = stats.standardCount > 0;
        const displayTags = stats.customerTags.slice(0, 6);

        return (
          <Card key={theme.key} className="flex flex-col rounded-sm border-border shadow-none">
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {theme.title}
                  </h2>
                  <Badge
                    variant="outline"
                    className={
                      isAvailable
                        ? "rounded-sm border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[11px] font-normal text-foreground"
                        : "rounded-sm border-border bg-muted/40 text-[11px] font-normal text-muted-foreground"
                    }
                  >
                    {isAvailable ? "已录入" : "建设中"}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {theme.description}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                已录入标准：
                <span className="ml-1 font-semibold text-foreground">
                  {stats.standardCount}
                </span>{" "}
                个
              </div>

              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  已录入客群
                </div>
                {displayTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {displayTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-sm border-border bg-background px-2 py-0.5 text-[11px] font-normal text-foreground"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">暂无已录入客群</p>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-auto w-fit rounded-sm"
                onClick={() => onViewTheme(theme.key)}
              >
                查看标准
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function StandardCardGrid({ standards }: { standards: CreditStandard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {standards.map((standard) => (
        <StandardCard key={standard.id} standard={standard} />
      ))}
    </div>
  );
}

function StandardCard({ standard }: { standard: CreditStandard }) {
  const dimensions = getEvaluationDimensions(standard);

  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {standard.standard_title?.trim() || "待补充"}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatSectorPath(
              standard.sector_cat_i,
              standard.sector_cat_ii,
              standard.sector_cat_iii,
            )}
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <SummaryBlock
            label="客群简介"
            content={summarizeIntro(standard.customer_intro)}
          />
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              评估维度
            </div>
            {dimensions.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {dimensions.map((dimension) => (
                  <Badge
                    key={dimension}
                    variant="outline"
                    className="rounded-sm border-border bg-muted/20 px-2 py-0.5 text-[11px] font-normal text-foreground/80"
                  >
                    {dimension}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">待补充</p>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          来源：{formatStandardSource(standard.source_doc, standard.source_pages)}
        </div>

        <Link
          to="/credit-standards/$id"
          params={{ id: standard.id }}
          className={cn(
            "mt-auto inline-flex h-8 w-fit items-center rounded-sm border border-input bg-background px-3 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground",
          )}
        >
          查看详情
        </Link>
      </CardContent>
    </Card>
  );
}

function SummaryBlock({ label, content }: { label: string; content: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <p className="line-clamp-3 leading-relaxed text-foreground/90">{content}</p>
    </div>
  );
}
