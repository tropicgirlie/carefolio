// Care Score is vendored from @luana/care-score@1.0.0 into ./care-score/.
// This file is the public import surface so consumers don't need to know
// whether the spec lives locally or in a published package.
//
// To change the formula, edit ./care-score/spec.ts here AND in the canonical
// package at /Users/Dublin-Osx/code/care-score/src/spec.ts to keep RemoteShe
// and Carefolio in sync. Once @luana/care-score is published to npm, swap
// these exports back to the package and delete ./care-score/.
//
// Usage in any Carefolio component:
//   import { breakdown, tierFor } from "@/lib/careScore";
//   const result = breakdown(company);

export {
  breakdown,
  signalsByGroup,
  tierFor,
  CARE_SCORE_VERSION,
  SIGNALS,
  GROUPS,
  TIERS,
  MAX_RAW_TOTAL,
} from "./care-score";

export type {
  Signal,
  ScoreBreakdown,
  SignalGroup,
  CareScoreInput,
  Tier,
  SignalDef,
} from "./care-score";
