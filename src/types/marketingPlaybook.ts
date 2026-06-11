export type MarketingPlaybook = {
  id: string;
  sector_cat_i: string | null;
  sector_cat_ii: string | null;
  sector_cat_iii: string | null;
  playbook_title: string;
  customer_profile: string | null;
  key_trends: string | null;
  competition_landscape: string | null;
  competitiveness_focus: string | null;
  marketing_strategy: string | null;
  product_opportunities: string | null;
  visit_questions: string | null;
  risk_notes: string | null;
  source_doc: string | null;
  source_pages: string | null;
  status: string | null;
  updated_at: string | null;
};

export type MarketingPlaybookRow = MarketingPlaybook;
