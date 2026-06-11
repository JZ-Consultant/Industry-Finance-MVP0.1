import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  displayValue,
  formatListedStatus,
  formatLocation,
  getListQualificationTags,
  isYes,
  uniqueFilterOptions,
} from "@/lib/companyDisplay";
import { getCompanies } from "@/services/companyService";

export const Route = createFileRoute("/companies/")({
  head: () => ({
    meta: [
      { title: "目标企业名单 · 产业金融知识资产工作台" },
      {
        name: "description",
        content:
          "基于客群分类、企业资质、授信潜力与竞争力标签，辅助客户经理识别重点营销对象。",
      },
    ],
  }),
  component: CompaniesPage,
});

const ALL = "__all__";

/** 横向滚动时固定「企业名称」列（背景须不透明，避免 hover 时其他列文字透出） */
const frozenCompanyNameHeadClass =
  "sticky left-0 z-30 min-w-[180px] bg-muted px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground shadow-[4px_0_6px_-4px_rgba(0,0,0,0.12)]";
const frozenCompanyNameCellClass =
  "sticky left-0 z-10 bg-card px-3 py-3 align-top shadow-[4px_0_6px_-4px_rgba(0,0,0,0.08)] group-hover:bg-[color-mix(in_oklch,var(--color-card)_70%,var(--color-muted)_30%)]";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Card className="rounded-sm border-border shadow-none">
      <CardContent className="p-3">
        <div className="text-[9px] uppercase leading-snug tracking-[0.14em] text-muted-foreground">
          {label}
        </div>
        <div className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function QualificationTags({ company }: { company: Parameters<typeof getListQualificationTags>[0] }) {
  const tags = getListQualificationTags(company);
  if (tags.length === 0) {
    return <span className="text-sm text-muted-foreground">待补充</span>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="outline"
          className="rounded-sm border-border bg-muted/30 px-2 py-0.5 text-[11px] font-normal"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function CompaniesPage() {
  const [province, setProvince] = useState<string>(ALL);
  const [city, setCity] = useState<string>(ALL);
  const [sectorCatI, setSectorCatI] = useState<string>(ALL);
  const [sectorCatII, setSectorCatII] = useState<string>(ALL);
  const [sectorCatIII, setSectorCatIII] = useState<string>(ALL);
  const [creditCat, setCreditCat] = useState<string>(ALL);
  const [listedStatus, setListedStatus] = useState<string>(ALL);

  const { data, isLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: getCompanies,
  });

  const companies = data?.companies ?? [];
  const loadFailed = data?.loadFailed ?? false;
  const errorMessage = data?.errorMessage;

  const provinces = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.province)),
    [companies],
  );

  const cities = useMemo(() => {
    const source =
      province === ALL
        ? companies
        : companies.filter((company) => company.province === province);
    return uniqueFilterOptions(source.map((company) => company.city));
  }, [companies, province]);

  const sectorCatIOptions = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.sector_cat_i)),
    [companies],
  );
  const sectorCatIIOptions = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.sector_cat_ii)),
    [companies],
  );
  const sectorCatIIIOptions = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.sector_cat_iii)),
    [companies],
  );
  const creditCatOptions = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.credit_cat)),
    [companies],
  );
  const listedStatusOptions = useMemo(
    () => uniqueFilterOptions(companies.map((company) => company.listed_status)),
    [companies],
  );

  const filtered = useMemo(
    () =>
      companies.filter((company) => {
        if (province !== ALL && company.province !== province) return false;
        if (city !== ALL && company.city !== city) return false;
        if (sectorCatI !== ALL && company.sector_cat_i !== sectorCatI) return false;
        if (sectorCatII !== ALL && company.sector_cat_ii !== sectorCatII) return false;
        if (sectorCatIII !== ALL && company.sector_cat_iii !== sectorCatIII) return false;
        if (creditCat !== ALL && company.credit_cat !== creditCat) return false;
        if (listedStatus !== ALL && company.listed_status !== listedStatus) return false;
        return true;
      }),
    [companies, province, city, sectorCatI, sectorCatII, sectorCatIII, creditCat, listedStatus],
  );

  const stats = useMemo(
    () => ({
      total: companies.length,
      listed: companies.filter((company) => isYes(company.listed_status)).length,
      nationalZjtx: companies.filter((company) => isYes(company.national_zjtx_status)).length,
      provincialZjtx: companies.filter((company) => isYes(company.provincial_zjtx_status)).length,
    }),
    [companies],
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-8 py-10">
      <header className="space-y-2 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-6 bg-[var(--gold)]" />
          客群经营 · 目标名单
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          目标企业名单
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          基于客群分类、企业资质、授信潜力与竞争力标签，辅助客户经理识别重点营销对象
        </p>
      </header>

      {isLoading && (
        <div className="rounded-sm border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          正在加载企业数据...
        </div>
      )}

      {!isLoading && loadFailed && (
        <div className="rounded-sm border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          企业数据加载失败，请稍后重试
          {errorMessage ? `：${errorMessage}` : ""}
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="目标企业数量" value={stats.total} />
        <StatCard label="上市公司数量" value={stats.listed} />
        <StatCard label="国家级专精特新企业数量" value={stats.nationalZjtx} />
        <StatCard label="省级专精特新企业数量" value={stats.provincialZjtx} />
      </div>

      <div className="flex flex-wrap items-end gap-2">
        <FilterSelect
          label="省份"
          value={province}
          onChange={(value) => {
            setProvince(value);
            setCity(ALL);
          }}
          options={provinces}
          disabled={isLoading}
        />
        <FilterSelect
          label="城市"
          value={city}
          onChange={setCity}
          options={cities}
          disabled={isLoading}
        />
        <FilterSelect
          label="一级客群分类"
          value={sectorCatI}
          onChange={setSectorCatI}
          options={sectorCatIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="二级客群分类"
          value={sectorCatII}
          onChange={setSectorCatII}
          options={sectorCatIIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="三级客群分类"
          value={sectorCatIII}
          onChange={setSectorCatIII}
          options={sectorCatIIIOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="授信潜力"
          value={creditCat}
          onChange={setCreditCat}
          options={creditCatOptions}
          disabled={isLoading}
        />
        <FilterSelect
          label="上市状态"
          value={listedStatus}
          onChange={setListedStatus}
          options={listedStatusOptions}
          disabled={isLoading}
        />
        <div className="ml-auto self-end text-[11px] text-muted-foreground">
          已筛选 <span className="font-semibold text-foreground">{filtered.length}</span> /{" "}
          {companies.length} 家
        </div>
      </div>

      <div className="border border-border bg-card">
        <div className="max-h-[min(520px,calc(100vh-22rem))] overflow-auto">
          <table className="w-full min-w-max caption-bottom text-sm">
            <TableHeader className="sticky top-0 z-10 bg-muted/95 backdrop-blur-sm [&_tr]:border-b">
              <TableRow className="border-b border-border bg-muted/40 hover:bg-muted/40">
              <TableHead className={frozenCompanyNameHeadClass}>
                企业名称
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                所在地
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                一级客群分类
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                二级客群分类
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                三级客群分类
              </TableHead>
              <TableHead className="min-w-[160px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                主营产品
              </TableHead>
              <TableHead className="min-w-[100px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                授信潜力
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                上市状态
              </TableHead>
              <TableHead className="min-w-[180px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                重点资质
              </TableHead>
              <TableHead className="min-w-[120px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                赛道吸引力
              </TableHead>
              <TableHead className="min-w-[160px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                行业专属竞争力标签
              </TableHead>
              <TableHead className="min-w-[88px] bg-muted/95 px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                操作
              </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={12} className="py-12 text-center text-sm text-muted-foreground">
                  正在加载企业数据...
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              filtered.map((company) => (
                <TableRow
                  key={company.id}
                  className="group border-b border-border/70 hover:bg-transparent"
                >
                  <TableCell className={frozenCompanyNameCellClass}>
                    <Link
                      to="/companies/$id"
                      params={{ id: company.id }}
                      className="font-medium text-foreground hover:text-[var(--primary)] hover:underline"
                    >
                      {displayValue(company.company_name)}
                    </Link>
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {formatLocation(company.province, company.city)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {displayValue(company.sector_cat_i)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {displayValue(company.sector_cat_ii)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {displayValue(company.sector_cat_iii)}
                  </TableCell>
                  <TableCell className="max-w-[220px] px-3 py-3 align-top text-sm text-muted-foreground group-hover:bg-muted/30">
                    {displayValue(company.main_product)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {displayValue(company.credit_cat)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {formatListedStatus(company.listed_status, company.listed_code)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top group-hover:bg-muted/30">
                    <QualificationTags company={company} />
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top text-sm text-foreground group-hover:bg-muted/30">
                    {displayValue(company.sector_attractiveness_status)}
                  </TableCell>
                  <TableCell className="max-w-[220px] px-3 py-3 align-top text-sm text-muted-foreground group-hover:bg-muted/30">
                    {displayValue(company.industry_specific_competitive_tag)}
                  </TableCell>
                  <TableCell className="px-3 py-3 align-top group-hover:bg-muted/30">
                    <Link
                      to="/companies/$id"
                      params={{ id: company.id }}
                      className="text-sm text-[var(--primary)] hover:underline"
                    >
                      查看详情
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {!isLoading && filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={12} className="py-12 text-center text-sm text-muted-foreground">
                  当前筛选条件下暂无目标企业
                </TableCell>
              </TableRow>
            )}
            </TableBody>
          </table>
        </div>
      </div>
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
