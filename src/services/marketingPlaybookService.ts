import { supabase } from "@/lib/supabase";
import type { MarketingPlaybook, MarketingPlaybookRow } from "@/types/marketingPlaybook";

export type { MarketingPlaybook } from "@/types/marketingPlaybook";

export type MarketingPlaybookQueryResult = {
  playbooks: MarketingPlaybook[];
  loadFailed: boolean;
  errorMessage?: string;
};

export type MarketingPlaybookDetailResult = {
  playbook: MarketingPlaybook | null;
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

function mapRowToPlaybook(row: MarketingPlaybookRow): MarketingPlaybook {
  return {
    id: row.id,
    sector_cat_i: toNullableString(row.sector_cat_i),
    sector_cat_ii: toNullableString(row.sector_cat_ii),
    sector_cat_iii: toNullableString(row.sector_cat_iii),
    playbook_title: toNullableString(row.playbook_title) ?? "",
    customer_profile: toNullableString(row.customer_profile),
    key_trends: toNullableString(row.key_trends),
    competition_landscape: toNullableString(row.competition_landscape),
    competitiveness_focus: toNullableString(row.competitiveness_focus),
    marketing_strategy: toNullableString(row.marketing_strategy),
    product_opportunities: toNullableString(row.product_opportunities),
    visit_questions: toNullableString(row.visit_questions),
    risk_notes: toNullableString(row.risk_notes),
    source_doc: toNullableString(row.source_doc),
    source_pages: toNullableString(row.source_pages),
    status: toNullableString(row.status),
    updated_at: toNullableString(row.updated_at),
  };
}

function applySectorFilters(
  query: ReturnType<typeof supabase.from>,
  sectorCatI: string | null,
  sectorCatII: string | null,
  sectorCatIII: string | null,
) {
  let nextQuery = query;

  if (sectorCatI?.trim()) {
    nextQuery = nextQuery.eq("sector_cat_i", sectorCatI.trim());
  } else {
    nextQuery = nextQuery.is("sector_cat_i", null);
  }

  if (sectorCatII?.trim()) {
    nextQuery = nextQuery.eq("sector_cat_ii", sectorCatII.trim());
  } else {
    nextQuery = nextQuery.is("sector_cat_ii", null);
  }

  if (sectorCatIII?.trim()) {
    nextQuery = nextQuery.eq("sector_cat_iii", sectorCatIII.trim());
  } else {
    nextQuery = nextQuery.is("sector_cat_iii", null);
  }

  return nextQuery;
}

export async function getMarketingPlaybooks(): Promise<MarketingPlaybookQueryResult> {
  try {
    const { data, error } = await supabase
      .from("marketing_playbooks")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Supabase getMarketingPlaybooks error:", error);
      throw error;
    }

    return {
      playbooks: (data ?? []).map((row) => mapRowToPlaybook(row as MarketingPlaybookRow)),
      loadFailed: false,
    };
  } catch (error) {
    console.error("Failed to load marketing playbooks from Supabase:", error);
    return {
      playbooks: [],
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getMarketingPlaybookById(
  id: string,
): Promise<MarketingPlaybookDetailResult> {
  try {
    const { data, error } = await supabase
      .from("marketing_playbooks")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) {
      console.error("Supabase getMarketingPlaybookById error:", error);
      throw error;
    }
    if (!data) {
      return { playbook: null, loadFailed: false };
    }

    return {
      playbook: mapRowToPlaybook(data as MarketingPlaybookRow),
      loadFailed: false,
    };
  } catch (error) {
    console.error(`Failed to load marketing playbook ${id} from Supabase:`, error);
    return {
      playbook: null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}

export async function getMarketingPlaybookBySector(
  sectorCatI: string | null,
  sectorCatII: string | null,
  sectorCatIII: string | null,
): Promise<MarketingPlaybookDetailResult> {
  try {
    const query = applySectorFilters(
      supabase.from("marketing_playbooks").select("*"),
      sectorCatI,
      sectorCatII,
      sectorCatIII,
    );

    const { data, error } = await query.order("updated_at", { ascending: false }).limit(1);

    if (error) {
      console.error("Supabase getMarketingPlaybookBySector error:", error);
      throw error;
    }

    const row = data?.[0];
    if (!row) {
      return { playbook: null, loadFailed: false };
    }

    return {
      playbook: mapRowToPlaybook(row as MarketingPlaybookRow),
      loadFailed: false,
    };
  } catch (error) {
    console.error("Failed to load marketing playbook by sector from Supabase:", error);
    return {
      playbook: null,
      loadFailed: true,
      errorMessage: getErrorMessage(error),
    };
  }
}
