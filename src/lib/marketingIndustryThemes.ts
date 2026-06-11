import { INDUSTRY_THEMES, type IndustryTheme } from "@/config/industryThemes";
import type { MarketingPlaybook } from "@/types/marketingPlaybook";

const THEME_MATCHERS: Record<string, (sectorCatI: string) => boolean> = {
  auto: (value) => value.includes("汽车") || value === "汽车及零部件",
  electronics: (value) => value.includes("电子") || value.includes("半导体"),
  materials: (value) => value.includes("材料"),
  equipment: (value) => value.includes("装备"),
  healthcare: (value) => value.includes("医疗") || value.includes("医药"),
  energy: (value) =>
    value.includes("能源") || value.includes("光伏") || value.includes("储能"),
};

function normalizeSectorCatI(value: string | null): string {
  return value?.trim() ?? "";
}

export function getIndustryThemeById(themeId: string): IndustryTheme | undefined {
  return INDUSTRY_THEMES.find((theme) => theme.id === themeId);
}

export function playbookMatchesTheme(
  playbook: MarketingPlaybook,
  theme: IndustryTheme,
): boolean {
  const sectorCatI = normalizeSectorCatI(playbook.sector_cat_i);
  if (!sectorCatI) return false;

  const matcher = THEME_MATCHERS[theme.id];
  return matcher ? matcher(sectorCatI) : false;
}

export function filterPlaybooksByTheme(
  playbooks: MarketingPlaybook[],
  theme: IndustryTheme,
): MarketingPlaybook[] {
  return playbooks.filter((playbook) => playbookMatchesTheme(playbook, theme));
}

export type IndustryThemeStats = {
  count: number;
  statusLabel: "已录入" | "建设中";
  tags: { label: string; enrolled: boolean }[];
};

function uniqueEnrolledTags(playbooks: MarketingPlaybook[], limit = 6): string[] {
  const tags: string[] = [];

  for (const playbook of playbooks) {
    const label =
      playbook.sector_cat_iii?.trim() ||
      playbook.sector_cat_ii?.trim() ||
      playbook.playbook_title?.trim();

    if (!label || tags.includes(label)) continue;
    tags.push(label);
    if (tags.length >= limit) break;
  }

  return tags;
}

export function getIndustryThemeStats(
  playbooks: MarketingPlaybook[],
  theme: IndustryTheme,
): IndustryThemeStats {
  const enrolled = filterPlaybooksByTheme(playbooks, theme);
  const count = enrolled.length;

  if (count > 0) {
    return {
      count,
      statusLabel: "已录入",
      tags: uniqueEnrolledTags(enrolled).map((label) => ({
        label,
        enrolled: true,
      })),
    };
  }

  return {
    count: 0,
    statusLabel: "建设中",
    tags: theme.segments.slice(0, 6).map((label) => ({
      label,
      enrolled: false,
    })),
  };
}
