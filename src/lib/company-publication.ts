import { breakdown, type CareScoreInput } from './careScore';

type PublicationInput = CareScoreInput & {
  verification_status?: string;
  research_review?: { evidence_backed_points?: number };
};

/** Unknown benefits are research work, not a public zero-score verdict. */
export function publicationStatus(company: PublicationInput) {
  const score = breakdown(company).computed;
  const evidenceBackedPoints = company.research_review?.evidence_backed_points;
  const allAwardedPointsHaveEvidence = evidenceBackedPoints === undefined || evidenceBackedPoints === score;

  return company.verification_status === 'verified' && score > 0 && allAwardedPointsHaveEvidence
    ? 'published' as const
    : 'research_pending' as const;
}
