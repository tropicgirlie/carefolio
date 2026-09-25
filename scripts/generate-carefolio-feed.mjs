import { build } from 'esbuild';
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

async function loadModule(relativePath) {
  const result = await build({
    entryPoints: [fileURLToPath(new URL(relativePath, import.meta.url))],
    bundle: true,
    format: 'esm',
    platform: 'node',
    target: 'node20',
    write: false,
    logLevel: 'silent',
  });
  const encoded = Buffer.from(result.outputFiles[0].text).toString('base64');
  return import(`data:text/javascript;base64,${encoded}`);
}

const [{ scoredIndexRecords, pendingResearchCompanies }, { CARE_SCORE_VERSION }] = await Promise.all([
  loadModule('../src/data/index-records.ts'),
  loadModule('../src/lib/careScore.ts'),
]);

const feed = {
  schema_version: 'carefolio-index-feed/v1',
  care_score_version: CARE_SCORE_VERSION,
  generated_at: new Date().toISOString(),
  companies: scoredIndexRecords.map((record, index) => ({
    ...record.inputs,
    carefolio_score: record.score,
    rank: index + 1,
    evidence_status: record.status,
    last_reviewed: record.lastReviewed,
  })),
};

await writeFile(
  new URL('../public/carefolio-index-feed.json', import.meta.url),
  `${JSON.stringify(feed, null, 2)}\n`,
);

// Research queue stays outside public assets: these are not scored results.
await mkdir(new URL('../docs/', import.meta.url), { recursive: true });
await writeFile(new URL('../docs/company-research-queue.json', import.meta.url),
  `${JSON.stringify({ companies: pendingResearchCompanies }, null, 2)}\n`);
