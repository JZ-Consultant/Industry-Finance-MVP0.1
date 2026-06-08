import type { Company } from "@/types/company";

export function isYes(value: string | null | undefined): boolean {
  return value?.trim() === "是";
}

export function displayValue(value: string | number | null | undefined): string {
  if (value == null || String(value).trim() === "") return "待补充";
  return String(value);
}

export function formatLocation(province: string | null, city: string | null): string {
  const parts = [province, city].map((item) => item?.trim()).filter(Boolean) as string[];
  if (parts.length === 0) return "待补充";
  return parts.join(" · ");
}

export function formatListedStatus(
  listedStatus: string | null,
  listedCode: string | null,
): string {
  if (isYes(listedStatus)) {
    return listedCode?.trim() ? `是 · ${listedCode.trim()}` : "是";
  }
  return displayValue(listedStatus);
}

export function getListQualificationTags(company: Company): string[] {
  const tags: string[] = [];
  if (isYes(company.national_zjtx_status)) tags.push("国家级专精特新");
  if (isYes(company.provincial_zjtx_status)) tags.push("省级专精特新");
  if (isYes(company.pre_listed_status)) tags.push("拟上市公司");
  if (isYes(company.dengling_status)) tags.push("瞪羚企业");
  if (isYes(company.capital_market_financing_status)) tags.push("PE/VC投资企业");
  return tags;
}

export function hasDetailQualifications(company: Company): boolean {
  return (
    isYes(company.listed_status) ||
    isYes(company.pre_listed_status) ||
    isYes(company.national_zjtx_status) ||
    isYes(company.provincial_zjtx_status) ||
    isYes(company.capital_market_financing_status) ||
    isYes(company.dengling_status) ||
    Boolean(company.industry_specific_competitive_tag?.trim())
  );
}

export function uniqueFilterOptions(values: Array<string | null | undefined>): string[] {
  return Array.from(
    new Set(values.map((value) => value?.trim()).filter(Boolean) as string[]),
  ).sort((a, b) => a.localeCompare(b, "zh-CN"));
}

export function formatUpdatedAt(value: string | null): string {
  if (!value?.trim()) return "待补充";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const FINANCIAL_KPI_FIELDS: Array<{
  key: keyof Company;
  label: string;
  suffix?: string;
}> = [
  { key: "established_year", label: "成立年份" },
  { key: "staff_number", label: "员工人数" },
  { key: "registered_capital_10k_rmb", label: "注册资本", suffix: "万元" },
  { key: "revenue_100mn_rmb", label: "营收", suffix: "亿元" },
  { key: "revenue_growth_rate", label: "营收增速" },
  { key: "net_profit_100mn_rmb", label: "净利润", suffix: "亿元" },
  { key: "gpm", label: "毛利率" },
  { key: "npm", label: "净利率" },
  { key: "total_asset_100mn_rmb", label: "总资产", suffix: "亿元" },
  { key: "total_liability_100mn_rmb", label: "总负债", suffix: "亿元" },
  { key: "asset_liability_ratio", label: "资产负债率" },
];

export function hasFinancialData(company: Company): boolean {
  return FINANCIAL_KPI_FIELDS.some(({ key }) => {
    const value = company[key];
    return value != null && String(value).trim() !== "";
  });
}

export function formatKpiValue(value: string | null, suffix?: string): string {
  const text = displayValue(value);
  if (text === "待补充" || !suffix) return text;
  return `${text}${suffix}`;
}
