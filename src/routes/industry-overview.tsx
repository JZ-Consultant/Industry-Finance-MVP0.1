import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { INDUSTRY_COVERAGE } from "@/data/industryCoverage";
import type { IndustryField } from "@/data/industryCoverage";
import {
  countSearchResults,
  getCoverageStats,
  getIndustryCoverageById,
  getIndustryCoverageStats,
  searchIndustryCoverage,
} from "@/lib/industryCoverageDisplay";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { getModuleById } from "@/config/workbenchModules";
import { cn } from "@/lib/utils";

const moduleDef = getModuleById("industry-overview")!;
const DEFAULT_INDUSTRY_ID = INDUSTRY_COVERAGE[0]?.id ?? "auto";

export const Route = createFileRoute("/industry-overview")({
  head: () => ({
    meta: [
      { title: "覆盖产业概览 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "围绕大汽车、大电子、大材料、大装备、大医疗、大能源六大产业，系统沉淀细分赛道客群，作为目标名单、营销指引、信审评估、尽调模板等模块的统一产业分类底座。",
      },
    ],
  }),
  component: IndustryOverviewPage,
});

type ConnectorPosition = {
  centerX: number;
  tabWidth: number;
};

function IndustryOverviewPage() {
  const [expandedIndustryId, setExpandedIndustryId] = useState<string | null>(
    DEFAULT_INDUSTRY_ID,
  );
  const [searchKeyword, setSearchKeyword] = useState("");

  const coverageStats = useMemo(() => getCoverageStats(), []);
  const expandedIndustry = expandedIndustryId
    ? getIndustryCoverageById(expandedIndustryId)
    : undefined;
  const expandedStats = expandedIndustry
    ? getIndustryCoverageStats(expandedIndustry)
    : null;
  const trimmedKeyword = searchKeyword.trim();
  const isSearching = trimmedKeyword.length > 0;
  const searchGroups = useMemo(
    () => searchIndustryCoverage(trimmedKeyword),
    [trimmedKeyword],
  );
  const searchResultCount = countSearchResults(searchGroups);

  const handleToggleIndustry = (industryId: string) => {
    setSearchKeyword("");
    setExpandedIndustryId((current) => (current === industryId ? null : industryId));
  };

  const handleSelectIndustry = (industryId: string) => {
    setSearchKeyword("");
    setExpandedIndustryId(industryId);
  };

  const clearSearch = () => {
    setSearchKeyword("");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow={moduleDef.eyebrow}
        title="覆盖产业概览"
        subtitle="围绕大汽车、大电子、大材料、大装备、大医疗、大能源六大产业，系统沉淀细分赛道客群，作为目标名单、营销指引、信审评估、尽调模板等模块的统一产业分类底座。"
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="覆盖产业主题" value={`${coverageStats.industryCount} 个`} />
        <StatCard label="细分领域" value={`${coverageStats.fieldCount} 个`} />
        <StatCard label="细分行业子客群" value={`${coverageStats.segmentCount} 个`} />
        <StatCard label="当前定位" value="产业金融知识资产分类底座" compact />
      </div>

      <div className="relative max-w-2xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchKeyword}
          onChange={(event) => setSearchKeyword(event.target.value)}
          placeholder="搜索细分行业子客群，例如：动力电池、光刻胶、医疗器械、工业机器人"
          className="h-10 rounded-sm border-border bg-background pl-9 pr-10 text-sm"
        />
        {isSearching && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground"
            onClick={clearSearch}
            aria-label="清除搜索"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isSearching ? (
        <SearchResultsPanel
          keyword={trimmedKeyword}
          groups={searchGroups}
          resultCount={searchResultCount}
          onClear={clearSearch}
          onSelectIndustry={handleSelectIndustry}
        />
      ) : (
        <IndustryMapPanel
          expandedIndustryId={expandedIndustryId}
          expandedIndustry={expandedIndustry}
          expandedStats={expandedStats}
          onToggleIndustry={handleToggleIndustry}
        />
      )}
    </div>
  );
}

function IndustryMapPanel({
  expandedIndustryId,
  expandedIndustry,
  expandedStats,
  onToggleIndustry,
}: {
  expandedIndustryId: string | null;
  expandedIndustry: (typeof INDUSTRY_COVERAGE)[number] | undefined;
  expandedStats: ReturnType<typeof getIndustryCoverageStats> | null;
  onToggleIndustry: (industryId: string) => void;
}) {
  const tabsRef = useRef<HTMLDivElement>(null);
  const [connector, setConnector] = useState<ConnectorPosition | null>(null);

  const updateConnector = () => {
    if (!expandedIndustryId || !tabsRef.current) {
      setConnector(null);
      return;
    }

    const activeButton = tabsRef.current.querySelector<HTMLElement>(
      `[data-industry-id="${expandedIndustryId}"]`,
    );
    if (!activeButton) {
      setConnector(null);
      return;
    }

    const containerRect = tabsRef.current.getBoundingClientRect();
    const buttonRect = activeButton.getBoundingClientRect();

    setConnector({
      centerX: buttonRect.left - containerRect.left + buttonRect.width / 2,
      tabWidth: buttonRect.width,
    });
  };

  useLayoutEffect(() => {
    updateConnector();
  }, [expandedIndustryId]);

  useEffect(() => {
    const handleResize = () => updateConnector();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expandedIndustryId]);

  return (
    <div className="overflow-hidden rounded-sm border border-border bg-background shadow-none">
      <div className="border-b border-border bg-muted/20 px-5 py-3">
        <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          六大产业客群地图
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          点击产业主题展开细分客群；再次点击可收起。细分领域支持逐层展开。
        </p>
      </div>

      <div className="border-b border-border p-4">
        <div
          ref={tabsRef}
          className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          {INDUSTRY_COVERAGE.map((industry) => {
            const stats = getIndustryCoverageStats(industry);
            const isExpanded = expandedIndustryId === industry.id;

            return (
              <button
                key={industry.id}
                type="button"
                data-industry-id={industry.id}
                onClick={() => onToggleIndustry(industry.id)}
                aria-expanded={isExpanded}
                className={cn(
                  "group relative rounded-sm border px-3 py-3 text-left transition-all duration-200",
                  isExpanded
                    ? "z-10 border-[var(--gold)]/60 bg-[var(--gold)]/8 shadow-sm"
                    : "border-border bg-background hover:border-border/80 hover:bg-muted/20",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {industry.industryName}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300",
                      isExpanded && "rotate-180 text-[var(--gold)]",
                    )}
                  />
                </div>
                <div className="mt-1.5 text-[11px] text-muted-foreground">
                  {stats.fieldCount} 领域 · {stats.segmentCount} 子客群
                </div>
              </button>
            );
          })}
        </div>

        {connector && expandedIndustry && (
          <div className="relative mt-1 h-6 overflow-visible">
            <div
              className="pointer-events-none absolute top-0 h-5 w-px origin-top animate-in fade-in zoom-in-95 duration-300"
              style={{
                left: connector.centerX,
                background:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--gold) 70%, transparent), color-mix(in srgb, var(--gold) 30%, transparent))",
              }}
            />
            <div
              className="pointer-events-none absolute top-4 h-px origin-center animate-in fade-in duration-500"
              style={{
                left: Math.max(0, connector.centerX - connector.tabWidth / 2),
                width: connector.tabWidth,
                background:
                  "linear-gradient(to right, transparent, color-mix(in srgb, var(--gold) 55%, transparent), transparent)",
              }}
            />
            <div className="absolute inset-x-0 top-5 h-px bg-[var(--gold)]/20" />
          </div>
        )}
      </div>

      <div
        className={cn(
          "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
          expandedIndustry && expandedStats
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-70",
        )}
      >
        <div className="overflow-hidden">
          {expandedIndustry && expandedStats ? (
            <div
              key={expandedIndustry.id}
              className="animate-in fade-in-0 slide-in-from-top-2 duration-300"
            >
              <div className="border-t border-[var(--gold)]/25 bg-[var(--gold)]/5 px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {expandedIndustry.industryName}
                    </h2>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>
                        细分领域{" "}
                        <span className="font-semibold text-foreground">
                          {expandedStats.fieldCount}
                        </span>{" "}
                        个
                      </span>
                      <span>
                        细分行业子客群{" "}
                        <span className="font-semibold text-foreground">
                          {expandedStats.segmentCount}
                        </span>{" "}
                        个
                      </span>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="rounded-sm border-[var(--gold)]/40 bg-background text-[11px] font-normal"
                  >
                    已展开
                  </Badge>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {expandedIndustry.description}
                </p>
              </div>

              <div className="max-h-[min(58vh,640px)] overflow-y-auto p-4">
                <FieldAccordion
                  key={expandedIndustry.id}
                  fields={expandedIndustry.fields}
                  defaultOpen={expandedIndustry.fields[0]?.fieldName}
                />
              </div>
            </div>
          ) : (
            <div className="px-5 py-10 text-center text-sm text-muted-foreground">
              请选择上方产业主题，查看对应细分客群
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FieldAccordion({
  fields,
  defaultOpen,
}: {
  fields: IndustryField[];
  defaultOpen?: string;
}) {
  return (
    <Accordion
      type="multiple"
      defaultValue={defaultOpen ? [defaultOpen] : []}
      className="space-y-2"
    >
      {fields.map((field, index) => (
        <AccordionItem
          key={field.fieldName}
          value={field.fieldName}
          className="overflow-hidden rounded-sm border border-border bg-background px-0 last:border-b"
        >
          <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/20 [&[data-state=open]]:border-b [&[data-state=open]]:border-border [&[data-state=open]]:bg-muted/10">
            <div className="flex flex-1 items-center gap-3 pr-2 text-left">
              <span className="font-mono text-[10px] text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground">{field.fieldName}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">
                  {field.segments.length} 个细分行业子客群
                </div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-3">
            <div className="flex flex-wrap gap-1.5 border-l-2 border-[var(--gold)]/30 pl-3">
              {field.segments.map((segment) => (
                <Badge
                  key={segment}
                  variant="outline"
                  className="rounded-sm border-border bg-muted/20 px-2 py-0.5 text-[11px] font-normal leading-snug text-foreground/80"
                >
                  {segment}
                </Badge>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function StatCard({
  label,
  value,
  compact = false,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="p-3">
        <div className="text-[9px] uppercase leading-snug tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <div
          className={cn(
            "mt-1.5 font-semibold tracking-tight text-foreground",
            compact ? "text-sm leading-snug" : "text-lg",
          )}
        >
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function SearchResultsPanel({
  keyword,
  groups,
  resultCount,
  onClear,
  onSelectIndustry,
}: {
  keyword: string;
  groups: ReturnType<typeof searchIndustryCoverage>;
  resultCount: number;
  onClear: () => void;
  onSelectIndustry: (industryId: string) => void;
}) {
  return (
    <div className="space-y-4 rounded-sm border border-border bg-background p-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-muted/20 p-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold tracking-tight text-foreground">搜索结果</h2>
          <p className="text-sm text-muted-foreground">
            关键词「{keyword}」共匹配 {resultCount} 个细分行业子客群
          </p>
        </div>
        <Button type="button" variant="outline" size="sm" className="rounded-sm" onClick={onClear}>
          返回产业地图
        </Button>
      </div>

      {groups.length === 0 ? (
        <div className="rounded-sm border border-border bg-muted/10 px-4 py-10 text-center text-sm text-muted-foreground">
          未找到匹配的细分行业子客群
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => (
            <div key={group.industryId} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
                <h3 className="text-base font-semibold text-foreground">{group.industryName}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 rounded-sm px-2 text-xs text-muted-foreground"
                  onClick={() => onSelectIndustry(group.industryId)}
                >
                  展开该产业
                </Button>
              </div>
              <FieldAccordion
                fields={group.fields.map((field) => ({
                  fieldName: field.fieldName,
                  segments: field.segments,
                }))}
                defaultOpen={group.fields[0]?.fieldName}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
