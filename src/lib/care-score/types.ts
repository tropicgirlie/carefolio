// Minimal input shape the scoring formula needs from any company.
// Both RemoteShe and Carefolio map their own company schemas to this.
//
// All fields optional so callers can pass partial data; missing fields
// score zero rather than throwing. Numeric fields use `null` to mean
// "we don't know" (vs `0` which means "we know it's zero").

export interface CareScoreInput {
  // Reproductive & women's health
  ivf_coverage?: boolean;
  fertility_support?: boolean;
  menopause_support?: boolean;
  period_leave?: boolean;

  // Family & care
  maternity_leave_weeks?: number | null;
  paternity_leave_weeks?: number | null;
  childcare_support?: boolean;
  caregiver_leave?: boolean;
  adoption_support?: boolean;
  return_to_work_program?: boolean;

  // Equity & transparency
  women_leadership_percent?: number | null;
  equal_pay_audited?: boolean;
  pay_transparency?: boolean;

  // Health & wellbeing
  health_insurance?: boolean;
  mental_health_budget?: boolean;

  // Growth
  learning_budget?: boolean;

  // Optional editorially-assigned displayed score (overrides computed in
  // breakdown output). Use this when a human auditor has reviewed the
  // company and assigned a final score that differs from the raw computed.
  carefolio_score?: number;
}

export type SignalGroup =
  | "Reproductive & women's health"
  | "Family & care"
  | "Equity & transparency"
  | "Health & wellbeing"
  | "Growth";

export interface Signal {
  key: string;
  group: SignalGroup;
  label: string;
  weight: number;
  earned: number;
  evidence?: string;
}

export interface ScoreBreakdown {
  signals: Signal[];
  rawTotal: number;       // sum of `earned`, capped at maxTotal
  maxTotal: number;       // sum of weights (the perfect score in raw points)
  computed: number;       // 0–100 normalized from raw
  displayed: number;      // editorially set Carefolio Score, or `computed` if none provided
  delta: number;          // displayed - computed (positive = editorial bump)
}

export type Tier = {
  key: "gold" | "rising-star" | "listed" | "not-listed";
  label: string;
  /** Inclusive lower bound. Gold = 90+, Rising Star = 75-89, etc. */
  min: number;
  description: string;
};
