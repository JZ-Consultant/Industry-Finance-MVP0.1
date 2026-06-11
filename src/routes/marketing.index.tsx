import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { INDUSTRY_THEMES } from "@/config/industryThemes";
import { uniqueFilterOptions } from "@/lib/companyDisplay";
import {
  filterPlaybooksByTheme,
  getIndustryThemeById,
  getIndustryThemeStats,
} from "@/lib/marketingIndustryThemes";
import {
  formatPlaybookSource,
  formatSectorPath,
  summarizeText,
} from "@/lib/marketingPlaybookDisplay";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { getMarketingPlaybooks } from "@/services/marketingPlaybookService";
import type { MarketingPlaybook } from "@/types/marketingPlaybook";

export const Route = createFileRoute("/marketing/")({
  head: () => ({
    meta: [
      { title: "客群营销指引 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "按产业主题与客群分类沉淀客户经理营销手册，支持快速定位细分赛道的客户痛点、融资需求、营销切入点与产品机会。",
      },
    ],
  }),
  component: MarketingPlaybookListPage,
});

const ALL = "__all__";

function MarketingPlaybookListPage() {
  const [sectorCatI, setSectorCatI] = useState<string>(ALL);
  const [sectorCatII, setSectorCatII] = useState<string>(ALL);
  const [sectorCatIII, setSectorCatIII] = useState<string>(ALL);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["marketing-playbooks"],
    queryFn: getMarketingPlaybooks,
  });

  const playbooks = data?.playbooks ?? [];
  const loadFailed = data?.loadFailed ?? false;
  const errorMessage = data?.errorMessage;

  const hasSectorFilters =
    sectorCatI !== ALL || sectorCatII !== ALL || sectorCatIII !== ALL;
  const showListView = hasSectorFilters || selectedThemeId !== null;
  const selectedTheme = selectedThemeId
    ? getIndustryThemeById(selectedThemeId)
    : undefined;

  const sectorCatIOptions = useMemo(
    () => uniqueFilterOptions(playbooks.map((item) => item.sector_cat_i)),
    [playbooks],
  );
  const sectorCatIIOptions = useMemo(
    () => uniqueFilterOptions(playbooks.map((item) => item.sector_cat_ii)),
    [playbooks],
  );
  const sectorCatIIIOptions = useMemo(
    () => uniqueFilterOptions(playbooks.map((item) => item.sector_cat_iii)),
    [playbooks],
  );

  const filtered = useMemo(() => {
    let result = playbooks;

    if (selectedTheme) {
      result = filterPlaybooksByTheme(result, selectedTheme);
    }

    if (sectorCatI !== ALL) {
      result = result.filter((item) => item.sector_cat_i === sectorCatI);
    }
    if (sectorCatII !== ALL) {
      result = result.filter((item) => item.sector_cat_ii === sectorCatII);
    }
    if (sectorCatIII !== ALL) {
      result = result.filter((item) => item.sector_cat_iii === sectorCatIII);
    }

    return result;
  }, [playbooks, selectedTheme, sectorCatI, sectorCatII, sectorCatIII]);

  const clearFilters = () => {
    setSectorCatI(ALL);
    setSectorCatII(ALL);
    setSectorCatIII(ALL);
    setSelectedThemeId(null);
  };

  const handleSectorFilterChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setSelectedThemeId(null);
  };

  const handleViewTheme = (themeId: string) => {
    setSectorCatI(ALL);
    setSectorCatII(ALL);
    setSectorCatIII(ALL);
    setSelectedThemeId(themeId);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow="客群经营 · 营销指引"
        title="客群营销指引"
        subtitle="按产业主题与客群分类沉淀客户经理营销手册，支持快速定位细分赛道的客户痛点、融资需求、营销切入点与产品机会。"
      />

      {isLoading && (
        <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          正在加载客群营销指引...
        </div>
      )}

      {!isLoading && loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          客群营销指引加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-2">
        <FilterSelect
          label="一级客群分类"
          value={sectorCatI}
          onChange={(value) => handleSectorFilterChange(setSectorCatI, value)}
          options={sectorCatIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="二级客群分类"
          value={sectorCatII}
          onChange={(value) => handleSectorFilterChange(setSectorCatII, value)}
          options={sectorCatIIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="三级客群分类"
          value={sectorCatIII}
          onChange={(value) => handleSectorFilterChange(setSectorCatIII, value)}
          options={sectorCatIIIOptions}
          disabled={isLoading}
        />

        {showListView && (
          <div className="ml-auto flex items-center gap-3 self-end">
            <div className="text-[11px] text-muted-foreground">
              已筛选{" "}
              <span className="font-semibold text-foreground">{filtered.length}</span> /{" "}
              {playbooks.length} 条
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 rounded-sm px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
            >
              清除筛选
            </Button>
          </div>
        )}
      </div>

      {!isLoading && !showListView && (
        <IndustryThemeGrid playbooks={playbooks} onViewTheme={handleViewTheme} />
      )}

      {!isLoading && showListView && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="space-y-1">
              {selectedTheme ? (
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {selectedTheme.name} · 客群营销指引
                </h2>
              ) : (
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  筛选结果
                </h2>
              )}
              <p className="text-xs text-muted-foreground">
                共 {filtered.length} 条客群营销指引
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-sm"
              onClick={clearFilters}
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              返回全部产业主题
            </Button>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-sm border border-border bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
              暂无符合条件的客群营销指引
            </div>
          ) : (
            <PlaybookCardGrid playbooks={filtered} />
          )}
        </div>
      )}
    </div>
  );
}

function IndustryThemeGrid({
  playbooks,
  onViewTheme,
}: {
  playbooks: MarketingPlaybook[];
  onViewTheme: (themeId: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {INDUSTRY_THEMES.map((theme) => {
        const stats = getIndustryThemeStats(playbooks, theme);
        const isAvailable = stats.count > 0;

        return (
          <Card key={theme.id} className="flex flex-col rounded-sm border-border shadow-none">
            <CardContent className="flex h-full flex-col gap-4 p-5">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {theme.name}
                  </h2>
                  <Badge
                    variant="outline"
                    className={
                      isAvailable
                        ? "rounded-sm border-[var(--gold)]/40 bg-[var(--gold)]/10 text-[11px] font-normal text-foreground"
                        : "rounded-sm border-border bg-muted/40 text-[11px] font-normal text-muted-foreground"
                    }
                  >
                    {stats.statusLabel}
                  </Badge>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {theme.description}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                已录入客群：
                <span className="ml-1 font-semibold text-foreground">{stats.count}</span> 个
              </div>

              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {isAvailable ? "已录入客群" : "示例细分客群"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {stats.tags.map((tag) => (
                    <Badge
                      key={tag.label}
                      variant="outline"
                      className={
                        tag.enrolled
                          ? "rounded-sm border-border bg-background px-2 py-0.5 text-[11px] font-normal text-foreground"
                          : "rounded-sm border-dashed border-border/80 bg-muted/20 px-2 py-0.5 text-[11px] font-normal text-muted-foreground/70"
                      }
                    >
                      {tag.label}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-auto w-fit rounded-sm"
                onClick={() => onViewTheme(theme.id)}
              >
                查看客群
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function PlaybookCardGrid({ playbooks }: { playbooks: MarketingPlaybook[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {playbooks.map((playbook) => (
        <Card key={playbook.id} className="rounded-sm border-border shadow-none">
          <CardContent className="flex h-full flex-col gap-4 p-5">
            <div className="space-y-2">
              <h3 className="text-base font-semibold tracking-tight text-foreground">
                <Link
                  to="/marketing/$id"
                  params={{ id: playbook.id }}
                  className="hover:text-[var(--primary)] hover:underline"
                >
                  {summarizeText(playbook.playbook_title)}
                </Link>
              </h3>
              <p className="text-xs text-muted-foreground">
                {formatSectorPath(
                  playbook.sector_cat_i,
                  playbook.sector_cat_ii,
                  playbook.sector_cat_iii,
                )}
              </p>
            </div>

            <div className="space-y-3 text-sm">
              <SummaryBlock label="客群经营策略" content={playbook.marketing_strategy} />
              <SummaryBlock
                label="产品和业务机会"
                content={playbook.product_opportunities}
              />
            </div>

            <div className="text-xs text-muted-foreground">
              来源：{formatPlaybookSource(playbook.source_doc, playbook.source_pages)}
            </div>

            <Link
              to="/marketing/$id"
              params={{ id: playbook.id }}
              className="mt-auto inline-flex h-8 w-fit items-center rounded-sm border border-input bg-background px-3 text-xs font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
            >
              查看详情
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function SummaryBlock({ label, content }: { label: string; content: string | null }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <p className="line-clamp-3 leading-relaxed text-foreground/90">
        {summarizeText(content)}
      </p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1">
      <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger className="h-8 w-[7.5rem] rounded-sm text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ALL}>全部</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
