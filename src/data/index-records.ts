import { breakdown, tierFor, SIGNALS, type CareScoreInput } from '../lib/careScore';
import { COMPANIES } from './carefolio-companies';

export type EvidenceStatus = 'Indexed' | 'Employer confirmed' | 'Evidence reviewed';

export type EvidenceSource = {
  label: string;
  url: string;
  note: string;
};

export type IndexRecord = {
  id: string;
  name: string;
  country: string;
  industry: string;
  remotePolicy: string;
  scope: string;
  status: EvidenceStatus;
  lastReviewed: string;
  inputs: CareScoreInput;
  sources: EvidenceSource[];
};

const signalLabels = new Map(SIGNALS.map((signal) => [signal.key, signal.label]));

function sourcesFor(company: (typeof COMPANIES)[number]): EvidenceSource[] {
  const entries = Object.entries(company.evidence ?? {});

  if (!entries.length) {
    return [{
      label: 'Employer public profile',
      url: company.website,
      note: 'This indexed record is part of the RemoteShe research snapshot. Signal-level public links are still being reconciled in Carefolio.',
    }];
  }

  return entries.map(([key, url]) => ({
    label: signalLabels.get(key) ?? key.replaceAll('_', ' '),
    url,
    note: `Public source linked to the ${signalLabels.get(key) ?? key} signal.`,
  }));
}

// Carefolio owns this public research dataset. RemoteShe consumes the
// generated Carefolio feed rather than acting as a second score authority.
// Every displayed score is recomputed below from the versioned formula.
export const indexRecords: IndexRecord[] = COMPANIES
  .filter((company) => company.verification_status === 'verified')
  .map((company) => ({
    id: company.id,
    name: company.name,
    country: company.country,
    industry: company.industry,
    remotePolicy: company.remote_policy,
    scope: `${company.remote_policy} · ${company.evidence ? `${Object.keys(company.evidence).length} signal sources linked` : 'signal sources being reconciled'}`,
    status: company.evidence ? 'Evidence reviewed' : 'Indexed',
    lastReviewed: company.last_reviewed ?? '24 August 2026',
    inputs: company,
    sources: sourcesFor(company),
  }));

export type ScoredIndexRecord = IndexRecord & {
  score: number;
  tier: ReturnType<typeof tierFor>;
  signals: ReturnType<typeof breakdown>['signals'];
};

export const scoredIndexRecords: ScoredIndexRecord[] = indexRecords
  .map((record) => {
    const result = breakdown(record.inputs);
    return { ...record, score: result.computed, tier: tierFor(result.computed), signals: result.signals };
  })
  .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

export const evidenceDisclaimer =
  'Care Scores are based on publicly available employer information and evidence submitted by companies. Scores are reviewed monthly and may change when benefits or policies change. A score is a research aid, not an endorsement or a guarantee of an individual employee’s experience.';
