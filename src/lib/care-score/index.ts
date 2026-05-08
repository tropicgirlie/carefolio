// Public entry for @luana/care-score.
// Re-exports the spec + types + breakdown function.
//
// Usage:
//   import { breakdown, CARE_SCORE_VERSION } from "@luana/care-score";
//   const result = breakdown({ ivf_coverage: true, maternity_leave_weeks: 26, ... });

import type { CareScoreInput, Signal, ScoreBreakdown, SignalGroup } from "./types.js";
import { SIGNALS, GROUPS, TIERS, tierFor, MAX_RAW_TOTAL } from "./spec.js";

/**
 * Care Score methodology version.
 * Bumped per the SemVer policy in METHODOLOGY.md.
 */
export const CARE_SCORE_VERSION = "1.0.0" as const;

/**
 * Compute the Care Score breakdown for a single company.
 *
 * Returns the per-signal earned points (with evidence), the raw total,
 * the normalized 0–100 computed score, and the displayed score (the
 * editorially-set `carefolio_score` if present, otherwise the computed value).
 */
export function breakdown(input: CareScoreInput): ScoreBreakdown {
  const signals: Signal[] = SIGNALS.map(def => {
    const { earned, evidence } = def.score(input);
    return { key: def.key, group: def.group, label: def.label, weight: def.weight, earned, evidence };
  });
  const maxTotal = MAX_RAW_TOTAL;
  const rawTotal = signals.reduce((sum, s) => sum + s.earned, 0);
  const computed = Math.round((rawTotal / maxTotal) * 100);
  const displayed = input.carefolio_score ?? computed;
  return { signals, rawTotal, maxTotal, computed, displayed, delta: displayed - computed };
}

/** Group an existing breakdown's signals by category for grid rendering. */
export function signalsByGroup(b: ScoreBreakdown): Record<SignalGroup, Signal[]> {
  const groups: Record<SignalGroup, Signal[]> = {
    "Reproductive & women's health": [],
    "Family & care": [],
    "Equity & transparency": [],
    "Health & wellbeing": [],
    "Growth": [],
  };
  for (const s of b.signals) groups[s.group].push(s);
  return groups;
}

// Re-export types and spec for consumers that want to render methodology pages.
export type { CareScoreInput, Signal, ScoreBreakdown, SignalGroup, Tier } from "./types.js";
export { SIGNALS, GROUPS, TIERS, tierFor, MAX_RAW_TOTAL } from "./spec.js";
export type { SignalDef } from "./spec.js";
