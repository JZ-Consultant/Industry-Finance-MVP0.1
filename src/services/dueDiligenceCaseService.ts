import { supabase } from "@/lib/supabase";
import type { DueDiligenceCase } from "@/types/dueDiligenceCase";

export type { DueDiligenceCase } from "@/types/dueDiligenceCase";

type DueDiligenceCaseRow = DueDiligenceCase;

export type DueDiligenceCaseQueryResult = {
  cases: DueDiligenceCase[];
  loadFailed: boolean;
  errorMessage?: string;
};

export type DueDiligenceCaseDetailResult = {
  caseItem: DueDiligenceCase | null;
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

function mapRowToDueDiligenceCase(row: DueDiligenceCaseRow): DueDiligenceCase {
  return {
    id: row.id,
    company_name: toNullableString(row.company_name) ?? "",
    report_title: toNullableString(row.report_title) ?? "",
    sector_cat_i: toNullableString(row.sector_cat_i) ?? "",
    sector_cat_ii: toNullableString(row.sector_cat_ii),
    sector_cat_iii: toNullableString(row.sector_cat_iii),
    case_summary: toNullableString(row.case_summary),
    company_background: toNullableString(row.company_background),
    due_diligence_content: toNullableString(row.due_diligence_content),
    key_risks: toNullableString(row.key_risks),
    credit_suggestions: toNullableString(row.credit_suggestions),
    source_doc: toNullableString(row.source_doc),
    status: toNullableString(row.status),
    updated_at: toNullableString(row.updated_at),
  };
}

export async function getDueDiligenceCases(): Promise<DueDiligenceCaseQueryResult> {
  try {
    const { data, error } = await supabase
      .from("due_diligence_cases")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getDueDiligenceCases error:", error);
      throw error;
    }

    return {
      cases: (data ?? []).map((row) => mapRowToDueDiligenceCase(row as DueDiligenceCaseRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error("Failed to load due diligence cases from Supabase:", error);
    return {
      cases: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getDueDiligenceCaseById(
  id: string,
): Promise<DueDiligenceCaseDetailResult> {
  try {
    const { data, error } = await supabase
      .from("due_diligence_cases")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase getDueDiligenceCaseById error:", error);
      throw error;
    }
    if (!data) {
      return { caseItem: null, loadFailed: false };
    }

    return {
      caseItem: mapRowToDueDiligenceCase(data as DueDiligenceCaseRow),
      loadFailed: false,
    };
  } catch (error) {
    console.error(`Failed to load due diligence case ${id} from Supabase:`, error);
    return {
      caseItem: null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getDueDiligenceCasesByCompanyName(
  companyName: string,
): Promise<DueDiligenceCaseQueryResult> {
  try {
    const { data, error } = await supabase
      .from("due_diligence_cases")
      .select("*")
      .eq("company_name", companyName.trim())
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getDueDiligenceCasesByCompanyName error:", error);
      throw error;
    }

    return {
      cases: (data ?? []).map((row) => mapRowToDueDiligenceCase(row as DueDiligenceCaseRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error(
      `Failed to load due diligence cases for company ${companyName} from Supabase:`,
      error,
    );
    return {
      cases: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getDueDiligenceCasesByCategory(
  sectorCatI: string,
  sectorCatII: string,
  sectorCatIII: string,
): Promise<DueDiligenceCaseQueryResult> {
  try {
    const { data, error } = await supabase
      .from("due_diligence_cases")
      .select("*")
      .eq("sector_cat_i", sectorCatI.trim())
      .eq("sector_cat_ii", sectorCatII.trim())
      .eq("sector_cat_iii", sectorCatIII.trim())
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getDueDiligenceCasesByCategory error:", error);
      throw error;
    }

    return {
      cases: (data ?? []).map((row) => mapRowToDueDiligenceCase(row as DueDiligenceCaseRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error(
      "Failed to load due diligence cases by category from Supabase:",
      error,
    );
    return {
      cases: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}
