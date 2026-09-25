import assert from 'node:assert/strict';
import { build } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
}
const euro = COMPANIES.find(c => c.id === 'eurofins-ireland');
assert.equal(euro.carefolio_score, 23);
assert.equal(euro.maternity_leave_weeks, 12);
assert(euro.employee_report);
assert.equal(COMPANIES.find(c => c.id === 'payroc-ireland').carefolio_score, 5);

if (process.argv[2]) {
  const remoteRoot = process.argv[2];
  const [{ COMPANIES: remote }, { getCarefolioIndex, applyCarefolioIndex }] = await Promise.all([
    load(resolve(remoteRoot, 'worker/src/companies.ts')), load(resolve(remoteRoot, 'worker/src/carefolio-index.ts')),
  ]);
  for (const company of COMPANIES) {
    const counterpart = remote.find(c => c.id === company.id);
    assert(counterpart, company.id);
    assert.equal(counterpart.carefolio_score, company.carefolio_score, `Fallback parity: ${company.id}`);
    assert.deepEqual(counterpart.research_review, company.research_review);
    assert.deepEqual(counterpart.benefit_evidence, company.benefit_evidence);
  }
  // Old-but-freshly-fetched KV entries cannot undo the current bundled audit.
  const cache = new Map([['carefolio-index:feed:v1', { ...feed, generated_at: '2020-01-01T00:00:00Z', fetched_at: Date.now(), companies: [{ ...euro, carefolio_score: 4 }] }]]);
  const env = { REMOTESHE: { get: async key => cache.get(key) ?? null, put: async (key, value) => cache.set(key, JSON.parse(value)), list: async () => ({ keys: [], list_complete: true }) } };
  const originalFetch = globalThis.fetch;
  let fetched = 0;
  globalThis.fetch = async () => { fetched++; return new Response(JSON.stringify(feed)); };
  const index = await getCarefolioIndex(env);
  assert.equal(fetched, 1, 'Stale audit cache must refresh');
  for (const company of COMPANIES) {
    const merged = applyCarefolioIndex({ ...remote.find(c => c.id === company.id), open_job_count: 17 }, index);
    assert.equal(merged.carefolio_score, company.carefolio_score, `Live-feed parity: ${company.id}`);
    assert.equal(merged.open_job_count, 17, 'Job data preserved');
  }
  await getCarefolioIndex(env);
  assert.equal(fetched, 1, 'Current cache reused');
  globalThis.fetch = originalFetch;
  console.log(`RemoteShe fallback and feed parity passed for ${COMPANIES.length} companies.`);
}
console.log(`Research provenance, inputs and formula checks passed for ${COMPANIES.length} companies.`);
