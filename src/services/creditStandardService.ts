import { supabase } from "@/lib/supabase";
import {
  getEvaluationItems,
  type CreditStandard,
  type EvaluationItem,
} from "@/types/creditStandard";

export type { CreditStandard } from "@/types/creditStandard";

type CreditStandardRow = CreditStandard;

export type CreditStandardQueryResult = {
  standards: CreditStandard[];
  loadFailed: boolean;
  errorMessage?: string;
};

export type CreditStandardDetailResult = {
  standard: CreditStandard | null;
  loadFailed: boolean;
  errorMessage?: string;
};

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

function toNullableString(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function mapEvaluationItems(items: unknown): EvaluationItem[] {
  return getEvaluationItems(items);
}

function mapRowToCreditStandard(row: CreditStandardRow): CreditStandard {
  return {
    id: row.id,
    sector_cat_i: toNullableString(row.sector_cat_i) ?? "",
    sector_cat_ii: toNullableString(row.sector_cat_ii) ?? "",
    sector_cat_iii: toNullableString(row.sector_cat_iii) ?? "",
    standard_title: toNullableString(row.standard_title) ?? "",
    customer_intro: toNullableString(row.customer_intro),
    evaluation_items: mapEvaluationItems(row.evaluation_items),
    source_doc: toNullableString(row.source_doc),
    source_pages: toNullableString(row.source_pages),
    status: toNullableString(row.status),
    updated_at: toNullableString(row.updated_at),
  };
}

export async function getCreditStandards(): Promise<CreditStandardQueryResult> {
  try {
    const { data, error } = await supabase
      .from("credit_standards")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getCreditStandards error:", error);
      throw error;
    }

    return {
      standards: (data ?? []).map((row) => mapRowToCreditStandard(row as CreditStandardRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error("Failed to load credit standards from Supabase:", error);
    return {
      standards: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getCreditStandardById(id: string): Promise<CreditStandardDetailResult> {
  try {
    const { data, error } = await supabase
      .from("credit_standards")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase getCreditStandardById error:", error);
      throw error;
    }
    if (!data) {
      return { standard: null, loadFailed: false };
    }

    return {
      standard: mapRowToCreditStandard(data as CreditStandardRow),
      loadFailed: false,
    };
  } catch (error) {
    console.error(`Failed to load credit standard ${id} from Supabase:`, error);
    return {
      standard: null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getCreditStandardsByIndustry(
  sectorCatI: string,
): Promise<CreditStandardQueryResult> {
  try {
    const { data, error } = await supabase
      .from("credit_standards")
      .select("*")
      .eq("sector_cat_i", sectorCatI.trim())
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getCreditStandardsByIndustry error:", error);
      throw error;
    }

    return {
      standards: (data ?? []).map((row) => mapRowToCreditStandard(row as CreditStandardRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error(
      `Failed to load credit standards for sector ${sectorCatI} from Supabase:`,
      error,
    );
    return {
      standards: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}
