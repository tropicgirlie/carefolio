import { build } from 'esbuild';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const destination = process.argv[2];
if (!destination) throw new Error('Pass the RemoteShe worker/src/carefolio-research-snapshot.json destination.');
const built = await build({ entryPoints: [fileURLToPath(new URL('../src/data/carefolio-companies.ts', import.meta.url))], bundle: true, format: 'esm', platform: 'node', write: false });
const { COMPANIES } = await import(`data:text/javascript;base64,${Buffer.from(built.outputFiles[0].text).toString('base64')}`);
const feed = JSON.parse(await readFile(new URL('../public/carefolio-index-feed.json', import.meta.url), 'utf8'));
const published = new Map(feed.companies.map(c => [c.id, c]));
await writeFile(destination, JSON.stringify({
  source: 'Carefolio — generated fallback snapshot; edit the Carefolio research data, not this file',
  generated_at: feed.generated_at,
  care_score_version: feed.care_score_version,
  companies: COMPANIES.map(company => ({ ...company, evidence_status: published.get(company.id)?.evidence_status ?? 'Research reviewed · pending publication' })),
}, null, 2) + '\n');
console.log(`Exported ${COMPANIES.length} canonical company records for RemoteShe.`);
