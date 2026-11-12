import reviews from '../data/company-research.json';
import { breakdown } from './careScore';
import type { Company } from '../data/carefolio-companies';

type Finding = { status: string; value: boolean | number | null; note: string; source_urls: string[]; value_basis?: string };
type Review = { id: string; reviewed_at: string; summary: string; signals: Record<string, Finding> };
const byId = new Map((reviews as Review[]).map(review => [review.id, review]));

const numericSignals = new Set([
  'maternity_leave_weeks',
  'paternity_leave_weeks',
  'women_leadership_percent',
]);

function neutralValue(field: string) {
  return numericSignals.has(field) ? null : false;
}

/**
 * Build the score from reviewed evidence only.
 *
 * Unknown is still distinct from an explicit absence in `benefit_evidence`, but
 * neither state earns employer points. This prevents statutory entitlements or
 * legacy defaults from being misrepresented as employer-provided benefits.
 */
export function applyCompanyResearch(company: Company): Company {
  const review = byId.get(company.id);
  if (!review) return company;
  const updated = { ...company, evidence: { ...company.evidence }, evidence_notes: { ...company.evidence_notes } };
  const supported: Record<string, boolean | number> = {};
  const employeeReported: Record<string, boolean | number> = {};
  const evidenceBacked: Record<string, boolean | number> = {};
  const benefit_evidence: NonNullable<Company['benefit_evidence']> = {};
  let unresolved = 0;
  for (const [field, finding] of Object.entries(review.signals)) {
    const confirmed = ['confirmed', 'contradicted'].includes(finding.status) && finding.value !== null;
    const reported = finding.status === 'employee_report' && finding.value !== null;
    const scoreable = confirmed || reported;
    const component = finding.value_basis === 'minimum';
    if (!confirmed || component) unresolved++;
    (updated as unknown as Record<string, unknown>)[field] = neutralValue(field);
    if (scoreable) {
      (updated as unknown as Record<string, unknown>)[field] = finding.value;
      evidenceBacked[field] = finding.value!;
      if (confirmed) supported[field] = finding.value!;
      if (reported) employeeReported[field] = finding.value!;
    }
    const url = finding.source_urls[0];
    if (url) updated.evidence[field] = url;
    const prefix = finding.status === 'employee_report' ? 'Employee reported; policy verification pending. '
      : !confirmed ? 'Unresolved; not evidence of absence. '
      : component ? 'Confirmed component; full entitlement remains unresolved. ' : '';
    updated.evidence_notes[field] = prefix + finding.note;
    benefit_evidence[field] = {
      status: confirmed && !component ? (finding.value === false ? 'unavailable' : 'confirmed') : 'unknown',
      ...(url ? { source_url: url } : {}),
      locations: [field === 'women_leadership_percent' && company.id === 'eurofins-ireland' ? 'Global group' : company.country],
      employment_types: ['See source and eligibility note'],
      verified_at: review.reviewed_at,
      ...(confirmed && typeof finding.value === 'number' ? { value: finding.value } : {}),
      note: (prefix + finding.note).slice(0, 1000),
    };
  }
  const score = breakdown(updated).computed;
  const sourcePoints = breakdown(supported).computed;
  const employeeReportedPoints = breakdown(employeeReported).computed;
  const evidenceBackedPoints = breakdown(evidenceBacked).computed;
  const evidenceCoveragePercent = score > 0 ? Math.round((sourcePoints / score) * 100) : 0;
  // These newly scored employers have scoped evidence for every awarded point.
  const newlyReviewed = ['payroc-ireland', 'coalition-technologies'].includes(company.id) && score > 0 && score === sourcePoints;
  return {
    ...updated,
    verification_status: newlyReviewed ? 'verified' : company.verification_status,
    last_reviewed: review.reviewed_at,
    benefit_evidence,
    research_review: {
      reviewed_at: review.reviewed_at,
      summary: review.summary,
      source_supported_points: sourcePoints,
      employee_reported_points: employeeReportedPoints,
      evidence_backed_points: evidenceBackedPoints,
      evidence_coverage_percent: evidenceCoveragePercent,
      unresolved_signals: unresolved,
    },
  };
}
