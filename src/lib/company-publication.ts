import { breakdown, type CareScoreInput } from './careScore';

/** Unknown benefits are research work, not a public zero-score verdict. */
export function publicationStatus(company: CareScoreInput & { verification_status?: string }) {
  return company.verification_status === 'verified' && breakdown(company).computed > 0
    ? 'published' as const
    : 'research_pending' as const;
}
