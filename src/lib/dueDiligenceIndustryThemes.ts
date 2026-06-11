import type { DueDiligenceCase } from "@/types/dueDiligenceCase";

export type DueDiligenceIndustryTheme = {
  key: string;
  title: string;
  description: string;
  sectorCatIValues: string[];
};

export const DUE_DILIGENCE_INDUSTRY_THEMES: DueDiligenceIndustryTheme[] = [
  {
    key: "auto",
    title: "大汽车",
    description:
      "覆盖整车制造、动力域、电子电气域、底盘车身内外饰域等汽车产业核心链条。",
    sectorCatIValues: ["汽车及零部件"],
  },
  {
    key: "electronics",
    title: "大电子",
    description:
      "覆盖集成电路、半导体设备材料、消费电子、新一代信息技术等关键赛道。",
    sectorCatIValues: ["电子信息", "大电子"],
  },
  {
    key: "materials",
    title: "大材料",
    description:
      "覆盖金属材料、有机化工材料、无机非金属材料、前沿新材料等方向。",
    sectorCatIValues: ["新材料", "大材料"],
  },
  {
    key: "equipment",
    title: "大装备",
    description:
      "覆盖工程机械、轨道交通、海工船舶、电网设备、智能制造设备等方向。",
    sectorCatIValues: ["高端装备", "大装备"],
  },
  {
    key: "healthcare",
    title: "大医疗",
    description:
      "覆盖制药及CXO、医疗器械、医疗设备、药械流通零售及终端机构等方向。",
    sectorCatIValues: ["医疗健康", "大医疗"],
  },
  {
    key: "energy",
    title: "大能源",
    description: "以新能源为主，覆盖光伏、风电、储能三大领域。",
    sectorCatIValues: ["新能源", "清洁能源", "大能源"],
  },
];

function normalizeSectorCatI(value: string | null | undefined): string {
  return value?.trim() ?? "";
}

export function getDueDiligenceThemeForCase(
  caseItem: DueDiligenceCase,
): DueDiligenceIndustryTheme | undefined {
  const sectorCatI = normalizeSectorCatI(caseItem.sector_cat_i);
  if (!sectorCatI) return undefined;

  return DUE_DILIGENCE_INDUSTRY_THEMES.find((theme) =>
    theme.sectorCatIValues.includes(sectorCatI),
  );
}

export function getDueDiligenceCasesByTheme(
  cases: DueDiligenceCase[],
  theme: DueDiligenceIndustryTheme,
): DueDiligenceCase[] {
  return cases.filter((caseItem) => {
    const sectorCatI = normalizeSectorCatI(caseItem.sector_cat_i);
    return theme.sectorCatIValues.includes(sectorCatI);
  });
}

export type DueDiligenceThemeStats = {
  caseCount: number;
  customerTags: string[];
  representativeCompanies: string[];
};

export function getDueDiligenceThemeStats(
  cases: DueDiligenceCase[],
  theme: DueDiligenceIndustryTheme,
): DueDiligenceThemeStats {
  const themeCases = getDueDiligenceCasesByTheme(cases, theme);

  const customerTags = [
    ...new Set(
      themeCases
        .map((caseItem) => caseItem.sector_cat_iii?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ];

  const representativeCompanies = [
    ...new Set(
      themeCases
        .map((caseItem) => caseItem.company_name?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  ].slice(0, 6);

  return {
    caseCount: themeCases.length,
    customerTags,
    representativeCompanies,
  };
}
