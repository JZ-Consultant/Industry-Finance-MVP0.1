export type EvaluationItem = {
  dimension: string;
  key_points: string;
};

export type CreditStandard = {
  id: string;
  sector_cat_i: string;
  sector_cat_ii: string;
  sector_cat_iii: string;
  standard_title: string;
  customer_intro?: string | null;
  evaluation_items?: EvaluationItem[] | string | null;
  source_doc?: string | null;
  source_pages?: string | null;
  status?: string | null;
  updated_at?: string | null;
};

export const getEvaluationItems = (items: unknown): EvaluationItem[] => {
  if (!items) return [];

  if (Array.isArray(items)) {
    return items.filter((item) => item && typeof item === "object") as EvaluationItem[];
  }

  if (typeof items === "string") {
    try {
      const parsed = JSON.parse(items);
      return Array.isArray(parsed) ? (parsed as EvaluationItem[]) : [];
    } catch {
      return [];
    }
  }

  return [];
};
