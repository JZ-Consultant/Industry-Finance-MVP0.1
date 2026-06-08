import { supabase } from "@/lib/supabase";
import type { Company, CompanyRow } from "@/types/company";

export type { Company } from "@/types/company";

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

function toNullableString(value: unknown): string | null {
  if (value == null) return null;
  const text = String(value).trim();
  return text === "" ? null : text;
}

function mapRowToCompany(row: CompanyRow): Company {
  return {
    id: row.id,
    company_name: toNullableString(row.company_name) ?? "",
    corp_id: toNullableString(row.corp_id),
    uni_credit_id: toNullableString(row.uni_credit_id),
    province: toNullableString(row.province),
    city: toNullableString(row.city),
    sector_cat_i: toNullableString(row.sector_cat_i),
    sector_cat_ii: toNullableString(row.sector_cat_ii),
    sector_cat_iii: toNullableString(row.sector_cat_iii),
    main_product: toNullableString(row.main_product),
    sector_attractiveness_status: toNullableString(row.sector_attractiveness_status),
    credit_cat: toNullableString(row.credit_cat),
    listed_status: toNullableString(row.listed_status),
    listed_code: toNullableString(row.listed_code),
    pre_listed_status: toNullableString(row.pre_listed_status),
    national_zjtx_status: toNullableString(row.national_zjtx_status),
    provincial_zjtx_status: toNullableString(row.provincial_zjtx_status),
    capital_market_financing_status: toNullableString(row.capital_market_financing_status),
    dengling_status: toNullableString(row.dengling_status),
    industry_specific_competitive_tag: toNullableString(row.industry_specific_competitive_tag),
    corp_scale: toNullableString(row.corp_scale),
    group_name: toNullableString(row.group_name),
    short_intro: toNullableString(row.short_intro),
    established_year: toNullableString(row.established_year),
    staff_number: toNullableString(row.staff_number),
    registered_capital_10k_rmb: toNullableString(row.registered_capital_10k_rmb),
    revenue_100mn_rmb: toNullableString(row.revenue_100mn_rmb),
    revenue_growth_rate: toNullableString(row.revenue_growth_rate),
    net_profit_100mn_rmb: toNullableString(row.net_profit_100mn_rmb),
    gpm: toNullableString(row.gpm),
    npm: toNullableString(row.npm),
    total_asset_100mn_rmb: toNullableString(row.total_asset_100mn_rmb),
    total_liability_100mn_rmb: toNullableString(row.total_liability_100mn_rmb),
    asset_liability_ratio: toNullableString(row.asset_liability_ratio),
    marketing_strategy: toNullableString(row.marketing_strategy),
    risk_strategy: toNullableString(row.risk_strategy),
    product_recommend: toNullableString(row.product_recommend),
    source_note: toNullableString(row.source_note),
    updated_at: toNullableString(row.updated_at),
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
      companies: [],
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
      company: null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}
