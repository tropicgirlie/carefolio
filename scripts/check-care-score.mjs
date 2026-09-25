import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

async function loadModule(path) {
  const result = await build({ entryPoints: [path], bundle: true, format: 'esm', platform: 'node', write: false, logLevel: 'silent' });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
}

const root = fileURLToPath(new URL('../', import.meta.url));
const [score, { scoredIndexRecords, pendingResearchCompanies }, feed] = await Promise.all([
  loadModule(resolve(root, 'src/lib/careScore.ts')),
  loadModule(resolve(root, 'src/data/index-records.ts')),
  readFile(resolve(root, 'public/carefolio-index-feed.json'), 'utf8').then(JSON.parse),
]);
const { publicationStatus } = await loadModule(resolve(root, 'src/lib/company-publication.ts'));
assert.equal(publicationStatus({ verification_status: 'verified', carefolio_score: 99 }), 'research_pending');
assert.equal(publicationStatus({ verification_status: 'auto', learning_budget: true }), 'research_pending');
assert.equal(publicationStatus({ verification_status: 'verified', learning_budget: true }), 'published');
const queue = JSON.parse(await readFile(resolve(root, 'docs/company-research-queue.json'), 'utf8'));
assert.deepEqual(queue.companies, pendingResearchCompanies);
const publishedIds = new Set(feed.companies.map(c => c.id));
assert.ok(pendingResearchCompanies.every(c => !publishedIds.has(c.id)));
assert.equal(score.MAX_RAW_TOTAL, 100);
assert.equal(score.SIGNALS.length, 16);
assert.equal(score.breakdown({}).computed, 0);
assert.equal(score.breakdown({ carefolio_score: 100 }).displayed, 0, 'Manual scores must not override the formula');
const fixtures = [{}];
for (const [field, boundaries] of Object.entries({
  maternity_leave_weeks: [[0, 0], [1, 3], [11, 3], [12, 6], [15, 6], [16, 9], [25, 9], [26, 12]],
  paternity_leave_weeks: [[0, 0], [1, 2], [3, 2], [4, 4], [7, 4], [8, 6], [15, 6], [16, 8]],
  women_leadership_percent: [[0, 0], [1, 2], [29, 2], [30, 4], [39, 4], [40, 6], [49, 6], [50, 8]],
})) {
  for (const [value, expected] of boundaries) {
    const input = { [field]: value };
    assert.equal(score.breakdown(input).computed, expected, `${field}=${value}`);
    fixtures.push(input);
  }
}
assert.equal(feed.schema_version, 'carefolio-index-feed/v1');
assert.equal(feed.care_score_version, score.CARE_SCORE_VERSION);
assert.equal(feed.companies.length, scoredIndexRecords.length);
assert.ok(feed.companies.length > 0);
assert.equal(new Set(feed.companies.map(c => c.id)).size, feed.companies.length, 'Duplicate company IDs');
for (const [index, company] of feed.companies.entries()) {
  assert.ok(company.carefolio_score > 0, `Zero score must stay unpublished: ${company.id}`);
  const record = scoredIndexRecords[index];
  assert.deepEqual(company, { ...record.inputs, carefolio_score: record.score, rank: index + 1, evidence_status: record.status, last_reviewed: record.lastReviewed }, `Stale feed record: ${company.id}`);
  assert.equal(company.carefolio_score, score.breakdown(company).computed);
  fixtures.push(company);
}

// Explicit paths keep deployment independent of sibling checkouts. Pass both
// the RemoteShe and canonical package entry points to verify a release locally.
for (const path of process.argv.slice(2)) {
  const consumer = await loadModule(resolve(path));
  assert.equal(consumer.CARE_SCORE_VERSION, score.CARE_SCORE_VERSION, `Version mismatch: ${path}`);
  assert.deepEqual(consumer.TIERS, score.TIERS);
  for (const fixture of fixtures) {
    assert.deepEqual(consumer.breakdown(fixture), score.breakdown(fixture), `Formula mismatch: ${path}, ${fixture.id ?? JSON.stringify(fixture)}`);
  }
  console.log(`Formula parity passed: ${path}`);
}
console.log(`Care Score ${score.CARE_SCORE_VERSION}: ${feed.companies.length} feed records and numeric thresholds passed.`);
