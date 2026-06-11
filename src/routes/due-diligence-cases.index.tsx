import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ModulePageHeader } from "@/components/workbench/ModulePageHeader";
import { uniqueFilterOptions } from "@/lib/companyDisplay";
import {
  DUE_DILIGENCE_INDUSTRY_THEMES,
  getDueDiligenceCasesByTheme,
  getDueDiligenceThemeStats,
  type DueDiligenceIndustryTheme,
} from "@/lib/dueDiligenceIndustryThemes";
import { cn } from "@/lib/utils";
import { getCompanies } from "@/services/companyService";
import { getCreditStandards } from "@/services/creditStandardService";
import { getDueDiligenceCases } from "@/services/dueDiligenceCaseService";
import type { Company } from "@/types/company";
import type { CreditStandard } from "@/types/creditStandard";
import {
  getCaseCategoryPath,
  getCaseReportTitle,
  type DueDiligenceCase,
} from "@/types/dueDiligenceCase";

export const Route = createFileRoute("/due-diligence-cases/")({
  head: () => ({
    meta: [
      { title: "尽调实战案例 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "沉淀过往针对具体企业开展的产业尽调分析报告，按产业主题、细分客群和企业名称组织案例内容。",
      },
    ],
  }),
  component: DueDiligenceCasesPage,
});

const ALL = "__all__";

function DueDiligenceCasesPage() {
  const [sectorCatI, setSectorCatI] = useState<string>(ALL);
  const [sectorCatII, setSectorCatII] = useState<string>(ALL);
  const [sectorCatIII, setSectorCatIII] = useState<string>(ALL);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedThemeKey, setSelectedThemeKey] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["due-diligence-cases"],
    queryFn: getDueDiligenceCases,
  });

  const { data: companiesData } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const { data: standardsData } = useQuery({
    queryKey: ["credit-standards"],
    queryFn: getCreditStandards,
  });

  const cases = data?.cases ?? [];
  const loadFailed = data?.loadFailed ?? false;
  const errorMessage = data?.errorMessage;
  const companies = companiesData?.loadFailed ? [] : (companiesData?.companies ?? []);
  const creditStandards = standardsData?.loadFailed ? [] : (standardsData?.standards ?? []);

  const trimmedSearch = searchQuery.trim();
  const hasSearch = trimmedSearch.length > 0;
  const hasSectorFilters =
    sectorCatI !== ALL || sectorCatII !== ALL || sectorCatIII !== ALL;
  const selectedTheme = selectedThemeKey
    ? getDueDiligenceThemeByKey(selectedThemeKey)
    : undefined;
  const showListView = hasSectorFilters || hasSearch || selectedThemeKey !== null;
  const isFilterResultView = hasSectorFilters || hasSearch;

  const sectorCatIOptions = useMemo(
    () => uniqueFilterOptions(cases.map((item) => item.sector_cat_i)),
    [cases],
  );

  const casesForLevelII = useMemo(() => {
    if (sectorCatI === ALL) return cases;
    return cases.filter((item) => item.sector_cat_i === sectorCatI);
  }, [cases, sectorCatI]);

  const sectorCatIIOptions = useMemo(
    () => uniqueFilterOptions(casesForLevelII.map((item) => item.sector_cat_ii)),
    [casesForLevelII],
  );

  const casesForLevelIII = useMemo(() => {
    if (sectorCatII === ALL) return casesForLevelII;
    return casesForLevelII.filter((item) => item.sector_cat_ii === sectorCatII);
  }, [casesForLevelII, sectorCatII]);

  const sectorCatIIIOptions = useMemo(
    () => uniqueFilterOptions(casesForLevelIII.map((item) => item.sector_cat_iii)),
    [casesForLevelIII],
  );

  const filteredCases = useMemo(() => {
    if (isFilterResultView) {
      const keyword = trimmedSearch.toLowerCase();
      return cases.filter((item) => {
        if (sectorCatI !== ALL && item.sector_cat_i !== sectorCatI) return false;
        if (sectorCatII !== ALL && item.sector_cat_ii !== sectorCatII) return false;
        if (sectorCatIII !== ALL && item.sector_cat_iii !== sectorCatIII) return false;
        if (hasSearch) {
          const companyName = item.company_name?.toLowerCase() ?? "";
          const reportTitle = item.report_title?.toLowerCase() ?? "";
          if (!companyName.includes(keyword) && !reportTitle.includes(keyword)) {
            return false;
          }
        }
        return true;
      });
    }

    if (selectedTheme) {
      return getDueDiligenceCasesByTheme(cases, selectedTheme);
    }

    return [];
  }, [
    cases,
    selectedTheme,
    isFilterResultView,
    sectorCatI,
    sectorCatII,
    sectorCatIII,
    hasSearch,
    trimmedSearch,
  ]);

  const clearFilters = () => {
    setSectorCatI(ALL);
    setSectorCatII(ALL);
    setSectorCatIII(ALL);
    setSearchQuery("");
    setSelectedThemeKey(null);
  };

  const handleSectorCatIChange = (value: string) => {
    setSectorCatI(value);
    setSectorCatII(ALL);
    setSectorCatIII(ALL);
    setSelectedThemeKey(null);
  };

  const handleSectorCatIIChange = (value: string) => {
    setSectorCatII(value);
    setSectorCatIII(ALL);
    setSelectedThemeKey(null);
  };

  const handleSectorCatIIIChange = (value: string) => {
    setSectorCatIII(value);
    setSelectedThemeKey(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSelectedThemeKey(null);
  };

  const handleViewTheme = (themeKey: string) => {
    setSectorCatI(ALL);
    setSectorCatII(ALL);
    setSectorCatIII(ALL);
    setSearchQuery("");
    setSelectedThemeKey(themeKey);
  };

  const handleBackToThemes = () => {
    setSelectedThemeKey(null);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <ModulePageHeader
        eyebrow="实战案例 · 企业尽调"
        title="尽调实战案例"
        subtitle="沉淀过往针对具体企业开展的产业尽调分析报告，按产业主题、细分客群和企业名称组织案例内容，支持客户经理和信审人员参考真实企业分析过程、风险判断和授信策略设计思路。"
      />

      <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        本模块内容用于产业研究、客户经营和授信申报准备过程中的参考，不替代银行正式授信审批意见。
      </div>

      {isLoading && (
        <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          正在加载尽调实战案例...
        </div>
      )}

      {!isLoading && loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          尽调实战案例加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      <div className="flex flex-wrap items-end gap-2">
        <FilterSelect
          label="一级客群分类"
          value={sectorCatI}
          onChange={handleSectorCatIChange}
          options={sectorCatIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="二级客群分类"
          value={sectorCatII}
          onChange={handleSectorCatIIChange}
          options={sectorCatIIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="三级客群分类"
          value={sectorCatIII}
          onChange={handleSectorCatIIIChange}
          options={sectorCatIIIOptions}
          disabled={isLoading}
        />
        <div className="space-y-1">
          <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
            企业名称 / 报告标题
          </div>
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="搜索企业或报告"
              disabled={isLoading}
              className="h-8 w-[11rem] rounded-sm pl-8 text-xs"
            />
          </div>
        </div>

        {showListView && (
          <div className="ml-auto flex items-center gap-3 self-end">
            <div className="text-[11px] text-muted-foreground">
              已筛选{" "}
              <span className="font-semibold text-foreground">{filteredCases.length}</span> /{" "}
              {cases.length} 条
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
        <IndustryThemeGrid cases={cases} onViewTheme={handleViewTheme} />
      )}

      {!isLoading && showListView && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
            <div className="space-y-1">
              {isFilterResultView ? (
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  筛选结果
                </h2>
              ) : (
                <h2 className="text-lg font-semibold tracking-tight text-foreground">
                  {selectedTheme?.title} · 尽调实战案例
                </h2>
              )}
              <p className="text-xs text-muted-foreground">
                共 {filteredCases.length} 条企业尽调案例
              </p>
            </div>
            {!isFilterResultView && selectedTheme && (
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
            )}
          </div>

          {filteredCases.length === 0 ? (
            <div className="rounded-sm border border-border bg-muted/20 px-4 py-10 text-center text-sm text-muted-foreground">
              {isFilterResultView
                ? "暂无匹配的企业尽调案例"
                : "该产业主题下暂无企业尽调案例"}
            </div>
          ) : (
            <CaseCardGrid
              cases={filteredCases}
              companies={companies}
              creditStandards={creditStandards}
            />
          )}
        </div>
      )}
    </div>
  );
}

function IndustryThemeGrid({
  cases,
  onViewTheme,
}: {
  cases: DueDiligenceCase[];
  onViewTheme: (themeKey: string) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {DUE_DILIGENCE_INDUSTRY_THEMES.map((theme) => {
        const stats = getDueDiligenceThemeStats(cases, theme);
        const isAvailable = stats.caseCount > 0;
        const displayTags = stats.customerTags.slice(0, 6);
        const displayCompanies = stats.representativeCompanies.slice(0, 6);

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
                已录入案例：
                <span className="ml-1 font-semibold text-foreground">{stats.caseCount}</span> 个
              </div>

              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  已覆盖客群
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

              <div className="space-y-2">
                <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  代表企业
                </div>
                {displayCompanies.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {displayCompanies.map((company) => (
                      <Badge
                        key={company}
                        variant="outline"
                        className="rounded-sm border-border bg-muted/20 px-2 py-0.5 text-[11px] font-normal text-foreground/80"
                      >
                        {company}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">暂无代表企业</p>
                )}
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-auto w-fit rounded-sm"
                onClick={() => onViewTheme(theme.key)}
              >
                查看案例
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function CaseCardGrid({
  cases,
  companies,
  creditStandards,
}: {
  cases: DueDiligenceCase[];
  companies: Company[];
  creditStandards: CreditStandard[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cases.map((caseItem) => (
        <CaseCard
          key={caseItem.id}
          caseItem={caseItem}
          isCompanyLinked={isCompanyLinked(caseItem, companies)}
          isCreditStandardLinked={isCreditStandardLinked(caseItem, creditStandards)}
        />
      ))}
    </div>
  );
}

function CaseCard({
  caseItem,
  isCompanyLinked,
  isCreditStandardLinked,
}: {
  caseItem: DueDiligenceCase;
  isCompanyLinked: boolean;
  isCreditStandardLinked: boolean;
}) {
  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="flex h-full flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">
            {getCaseReportTitle(caseItem)}
          </h3>
          <p className="text-xs text-muted-foreground">
            企业名称：{caseItem.company_name?.trim() || "待补充"}
          </p>
          <p className="text-xs text-muted-foreground">
            产业分类：{getCaseCategoryPath(caseItem) || "待补充"}
          </p>
        </div>

        <SummaryBlock label="案例摘要" content={summarizeCaseSummary(caseItem.case_summary)} />

        <div className="space-y-2 text-sm">
          <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            关联状态
          </div>
          <div className="space-y-1.5 text-xs text-muted-foreground">
            <p className="flex flex-wrap items-center gap-1">
              目标企业：
              <LinkStatus linked={isCompanyLinked} />
            </p>
            <p className="flex flex-wrap items-center gap-1">
              信审要点：
              <LinkStatus linked={isCreditStandardLinked} />
            </p>
          </div>
        </div>

        <Link
          to="/due-diligence-cases/$id"
          params={{ id: caseItem.id }}
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

function LinkStatus({ linked }: { linked: boolean }) {
  if (linked) {
    return (
      <Badge
        variant="outline"
        className="rounded-sm border-[var(--gold)]/40 bg-[var(--gold)]/10 px-1.5 py-0 text-[11px] font-medium text-foreground"
      >
        已关联
      </Badge>
    );
  }

  return <span className="text-muted-foreground">未关联</span>;
}

function SummaryBlock({ label, content }: { label: string; content: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      <p className="line-clamp-4 leading-relaxed text-foreground/90">{content}</p>
    </div>
  );
}

function getDueDiligenceThemeByKey(key: string): DueDiligenceIndustryTheme | undefined {
  return DUE_DILIGENCE_INDUSTRY_THEMES.find((theme) => theme.key === key);
}

function isCompanyLinked(caseItem: DueDiligenceCase, companies: Company[]): boolean {
  const trimmed = caseItem.company_name?.trim();
  if (!trimmed) return false;

  return companies.some((company) => company.company_name.trim() === trimmed);
}

function isCreditStandardLinked(
  caseItem: DueDiligenceCase,
  standards: CreditStandard[],
): boolean {
  const sectorCatI = caseItem.sector_cat_i?.trim();
  const sectorCatII = caseItem.sector_cat_ii?.trim();
  const sectorCatIII = caseItem.sector_cat_iii?.trim();

  if (!sectorCatI || !sectorCatII || !sectorCatIII) {
    return false;
  }

  return standards.some(
    (standard) =>
      standard.sector_cat_i?.trim() === sectorCatI &&
      standard.sector_cat_ii?.trim() === sectorCatII &&
      standard.sector_cat_iii?.trim() === sectorCatIII,
  );
}

function summarizeCaseSummary(
  value: string | null | undefined,
  minLength = 160,
  maxLength = 220,
): string {
  const text = value?.trim();
  if (!text) return "待补充";
  if (text.length <= maxLength) return text;
  const sliceLength = Math.max(minLength, maxLength);
  return `${text.slice(0, sliceLength).trim()}…`;
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
