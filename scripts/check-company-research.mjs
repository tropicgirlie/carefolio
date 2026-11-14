import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const load = async path => {
  const result = await build({ entryPoints: [resolve(path)], bundle: true, format: 'esm', platform: 'node', write: false });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
};
const [{ COMPANIES }, { breakdown }, reviews, feed] = await Promise.all([
  load('src/data/carefolio-companies.ts'), load('src/lib/careScore.ts'),
  readFile('src/data/company-research.json', 'utf8').then(JSON.parse),
  readFile('public/carefolio-index-feed.json', 'utf8').then(JSON.parse),
]);
assert.equal(COMPANIES.length, reviews.length);
assert.equal(new Set(reviews.map(r => r.id)).size, reviews.length);
for (const company of COMPANIES) {
  const review = reviews.find(r => r.id === company.id);
  assert(review?.searched, company.id);
  assert.equal(Object.keys(review.signals).length, 16);
  for (const [field, finding] of Object.entries(review.signals)) {
    if (['confirmed', 'contradicted'].includes(finding.status)) {
      assert(finding.source_urls.length, `${company.id}.${field}: source required`);
      if (finding.value_basis === 'minimum') assert(company[field] >= finding.value);
      else assert.equal(company[field], finding.value, `${company.id}.${field}`);
    }
    if (finding.status === 'unknown' || finding.status === 'employee_report') assert.equal(company.benefit_evidence[field].status, 'unknown');
  }
  assert.equal(company.carefolio_score, breakdown(company).computed);
  assert.equal(company.carefolio_score, company.research_review.evidence_backed_points, `${company.id}: every awarded point must have reviewed evidence`);
  assert.equal(
    company.research_review.evidence_coverage_percent,
    company.carefolio_score > 0 ? Math.round((company.research_review.source_supported_points / company.carefolio_score) * 100) : 0,
    `${company.id}: employer-source coverage`,
  );
}
const euro = COMPANIES.find(c => c.id === 'eurofins-ireland');
assert.equal(euro.carefolio_score, 23);
assert.equal(euro.maternity_leave_weeks, 12);
assert(euro.employee_report);
assert.equal(COMPANIES.find(c => c.id === 'payroc-ireland').carefolio_score, 5);
assert.equal(COMPANIES.find(c => c.id === 'simple-first-consulting-gmbh').carefolio_score, 6);
assert.equal(COMPANIES.find(c => c.id === 'wintama-it-solutions-gmbh').carefolio_score, 4);

if (process.argv[2]) {
  const remoteRoot = resolve(process.argv[2]);
  const output = execFileSync(process.execPath, ['scripts/tests/carefolio-sync.mjs', process.cwd()], {
    cwd: remoteRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'],
  });
  process.stdout.write(output);
}
console.log(`Research provenance, inputs and formula checks passed for ${COMPANIES.length} companies.`);
