import { companies as fallbackCompanies, type Company } from "@/data/companies";
import { supabase } from "@/lib/supabase";

export type CompanyQueryResult = {
  companies: Company[];
  loadFailed: boolean;
  errorMessage?: string;
};

export type CompanyDetailResult = {
  company: Company | null;
  loadFailed: boolean;
  errorMessage?: string;
};

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return String(error);
}

type CompanyRow = {
  id: string;
  company_name: string;
  province: string | null;
  city: string | null;
  industry: string | null;
  segment: string | null;
  main_products: string | null;
  priority_level: string | null;
  banking_opportunity: string | null;
  product_solutions: string | null;
  risk_focus: string | null;
  marketing_suggestion: string | null;
  credit_assessment: string | null;
  visit_questions: string | null;
  source_note: string | null;
  updated_at: string | null;
};

function parseTextList(value: unknown): string[] {
  if (value == null) return [];

  if (Array.isArray(value)) {
    return value.map(String).map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value !== "string") {
    return [String(value)].filter(Boolean);
  }

  const trimmed = value.trim();
  if (!trimmed) return [];

  if (trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map(String).map((item) => item.trim()).filter(Boolean);
      }
    } catch {
      // Fall through to delimiter-based parsing.
    }
  }

  return trimmed
    .split(/\r?\n|；|;|、/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizePriority(value: string | null | undefined): Company["priority"] {
  if (!value) return "低";

  const normalized = value.trim().toLowerCase();
  if (normalized === "高" || normalized === "high" || normalized === "h") {
    return "高";
  }
  if (normalized === "中" || normalized === "medium" || normalized === "m") {
    return "中";
  }
  if (normalized === "低" || normalized === "low" || normalized === "l") {
    return "低";
  }

  return "低";
}

function mapRowToCompany(row: CompanyRow): Company {
  const intro =
    row.source_note?.trim() ||
    [row.industry, row.main_products].filter(Boolean).join(" · ") ||
    "";

  return {
    id: row.id,
    name: row.company_name,
    city: row.city ?? "",
    segment: row.segment ?? "",
    products: row.main_products ?? "",
    priority: normalizePriority(row.priority_level),
    opportunity: row.banking_opportunity ?? "",
    risk: row.risk_focus ?? "",
    intro,
    marketingHooks: parseTextList(row.marketing_suggestion),
    productPlan: parseTextList(row.product_solutions),
    creditFocus: parseTextList(row.credit_assessment),
    visitQuestions: parseTextList(row.visit_questions),
  };
}

export async function getCompanies(): Promise<CompanyQueryResult> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getCompanies error:", error);
      throw error;
    }

    return {
      companies: (data ?? []).map((row) => mapRowToCompany(row as CompanyRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error("Failed to load companies from Supabase:", error);
    return {
      companies: fallbackCompanies,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getCompanyById(id: string): Promise<CompanyDetailResult> {
  try {
    const { data, error } = await supabase
      .from("companies")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase getCompanyById error:", error);
      throw error;
    }
    if (!data) {
      return { company: null, loadFailed: false };
    }

    return {
      company: mapRowToCompany(data as CompanyRow),
      loadFailed: false,
    };
  } catch (error) {
    console.error(`Failed to load company ${id} from Supabase:`, error);
    return {
      company: fallbackCompanies.find((company) => company.id === id) ?? null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}
