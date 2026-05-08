// Care Score v1.0 specification.
// Lifted verbatim from RemoteShe's original src/lib/careScore.ts.
// Any change here must bump CARE_SCORE_VERSION in src/index.ts according
// to the SemVer policy in METHODOLOGY.md.

import type { CareScoreInput, SignalGroup, Tier } from "./types.js";

export type SignalDef = {
  key: string;
  group: SignalGroup;
  label: string;
  weight: number;
  /** Returns earned points (0..weight) and a human-readable evidence string when earned. */
  score: (c: CareScoreInput) => { earned: number; evidence?: string };
};

export const SIGNALS: SignalDef[] = [
  // ── Reproductive & women's health ────────────────────────────────────────
  {
    key: "ivf",
    group: "Reproductive & women's health",
    label: "IVF coverage",
    weight: 9,
    score: c => c.ivf_coverage
      ? { earned: 9, evidence: "IVF treatment covered by company health plan" }
      : { earned: 0 },
  },
  {
    key: "fertility",
    group: "Reproductive & women's health",
    label: "Broader fertility support",
    weight: 6,
    score: c => c.fertility_support
      ? { earned: 6, evidence: "Fertility benefits beyond IVF (egg freezing, hormone treatment, etc.)" }
      : { earned: 0 },
  },
  {
    key: "menopause",
    group: "Reproductive & women's health",
    label: "Menopause support",
    weight: 5,
    score: c => c.menopause_support
      ? { earned: 5, evidence: "Menopause-friendly accreditation or stated policy" }
      : { earned: 0 },
  },
  {
    key: "period",
    group: "Reproductive & women's health",
    label: "Period / menstrual leave",
    weight: 3,
    score: c => c.period_leave
      ? { earned: 3, evidence: "Documented period leave policy" }
      : { earned: 0 },
  },

  // ── Family & care ────────────────────────────────────────────────────────
  {
    key: "maternity",
    group: "Family & care",
    label: "Maternity leave (weeks paid)",
    weight: 12,
    score: c => {
      const w = c.maternity_leave_weeks ?? 0;
      const earned = w >= 26 ? 12 : w >= 16 ? 9 : w >= 12 ? 6 : w > 0 ? 3 : 0;
      return earned ? { earned, evidence: `${w} weeks paid maternity leave` } : { earned: 0 };
    },
  },
  {
    key: "paternity",
    group: "Family & care",
    label: "Paternity leave (weeks paid)",
    weight: 8,
    score: c => {
      const w = c.paternity_leave_weeks ?? 0;
      const earned = w >= 16 ? 8 : w >= 8 ? 6 : w >= 4 ? 4 : w > 0 ? 2 : 0;
      return earned ? { earned, evidence: `${w} weeks paid paternity leave` } : { earned: 0 };
    },
  },
  {
    key: "childcare",
    group: "Family & care",
    label: "Childcare / creche",
    weight: 7,
    score: c => c.childcare_support
      ? { earned: 7, evidence: "On-site or subsidised childcare" }
      : { earned: 0 },
  },
  {
    key: "caregiver",
    group: "Family & care",
    label: "Caregiver leave",
    weight: 5,
    score: c => c.caregiver_leave
      ? { earned: 5, evidence: "Paid leave for caring for a family member" }
      : { earned: 0 },
  },
  {
    key: "adoption",
    group: "Family & care",
    label: "Adoption support",
    weight: 5,
    score: c => c.adoption_support
      ? { earned: 5, evidence: "Financial support for adoption" }
      : { earned: 0 },
  },
  {
    key: "rtw",
    group: "Family & care",
    label: "Return-to-work program",
    weight: 5,
    score: c => c.return_to_work_program
      ? { earned: 5, evidence: "Formal returnship program for re-entering professionals" }
      : { earned: 0 },
  },

  // ── Equity & transparency ────────────────────────────────────────────────
  {
    key: "women_leaders",
    group: "Equity & transparency",
    label: "Women in leadership",
    weight: 8,
    score: c => {
      const p = c.women_leadership_percent ?? 0;
      const earned = p >= 50 ? 8 : p >= 40 ? 6 : p >= 30 ? 4 : p > 0 ? 2 : 0;
      return earned ? { earned, evidence: `${p}% women at VP level or above` } : { earned: 0 };
    },
  },
  {
    key: "equal_pay",
    group: "Equity & transparency",
    label: "Equal pay audited",
    weight: 7,
    score: c => c.equal_pay_audited
      ? { earned: 7, evidence: "Publishes audited gender pay gap report" }
      : { earned: 0 },
  },
  {
    key: "pay_transparency",
    group: "Equity & transparency",
    label: "Pay transparency",
    weight: 6,
    score: c => c.pay_transparency
      ? { earned: 6, evidence: "Publishes salary bands publicly" }
      : { earned: 0 },
  },

  // ── Health & wellbeing ───────────────────────────────────────────────────
  {
    key: "health",
    group: "Health & wellbeing",
    label: "Health insurance",
    weight: 5,
    score: c => c.health_insurance
      ? { earned: 5, evidence: "Comprehensive health coverage" }
      : { earned: 0 },
  },
  {
    key: "mental_health",
    group: "Health & wellbeing",
    label: "Mental health budget",
    weight: 5,
    score: c => c.mental_health_budget
      ? { earned: 5, evidence: "Therapy / coaching stipend or EAP+" }
      : { earned: 0 },
  },

  // ── Growth ───────────────────────────────────────────────────────────────
  {
    key: "learning",
    group: "Growth",
    label: "Learning / L&D budget",
    weight: 4,
    score: c => c.learning_budget
      ? { earned: 4, evidence: "Annual learning budget or tuition reimbursement" }
      : { earned: 0 },
  },
];

/** All five signal groups in display order. */
export const GROUPS: SignalGroup[] = [
  "Reproductive & women's health",
  "Family & care",
  "Equity & transparency",
  "Health & wellbeing",
  "Growth",
];

/** Tier bands keyed by minimum score. Higher tier first. */
export const TIERS: Tier[] = [
  { key: "gold",        label: "Gold Tier",   min: 90, description: "Best-in-class care infrastructure across nearly every signal. Rare." },
  { key: "rising-star", label: "Rising Star", min: 75, description: "Strong on parental leave plus at least three other categories." },
  { key: "listed",      label: "Listed",      min: 60, description: "Above the bar that gets a company onto the directory in the first place." },
  { key: "not-listed",  label: "Not listed",  min: 0,  description: "Below the floor (60). Not surfaced in the directory to keep signal-to-noise high." },
];

export function tierFor(score: number): Tier {
  return TIERS.find(t => score >= t.min) ?? TIERS[TIERS.length - 1]!;
}

/** Maximum raw score (sum of weights). Always 100 by design but computed for safety. */
export const MAX_RAW_TOTAL = SIGNALS.reduce((sum, s) => sum + s.weight, 0);
