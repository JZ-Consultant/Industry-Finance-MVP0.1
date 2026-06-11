export type DueDiligenceCase = {
  id: string;
  company_name: string;
  report_title: string;
  sector_cat_i: string;
  sector_cat_ii?: string | null;
  sector_cat_iii?: string | null;
  case_summary?: string | null;
  company_background?: string | null;
  due_diligence_content?: string | null;
  key_risks?: string | null;
  credit_suggestions?: string | null;
  source_doc?: string | null;
  status?: string | null;
  updated_at?: string | null;
};

export const getCaseCategoryPath = (caseItem: DueDiligenceCase): string => {
  return [caseItem.sector_cat_i, caseItem.sector_cat_ii, caseItem.sector_cat_iii]
    .filter(Boolean)
    .join(" / ");
};

export const getCaseReportTitle = (caseItem: DueDiligenceCase): string => {
  return caseItem.report_title || `${caseItem.company_name}尽调分析报告`;
};
