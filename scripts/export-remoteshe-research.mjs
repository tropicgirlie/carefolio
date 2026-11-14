import { readFile, writeFile } from 'node:fs/promises';

const destination = process.argv[2];
if (!destination) throw new Error('Pass the RemoteShe worker/src/carefolio-research-snapshot.json destination.');
const feed = JSON.parse(await readFile(new URL('../public/carefolio-index-feed.json', import.meta.url), 'utf8'));
await writeFile(destination, JSON.stringify({
  source: 'Carefolio — generated fallback snapshot; edit the Carefolio research data, not this file',
  schema_version: feed.schema_version,
  generated_at: feed.generated_at,
  care_score_version: feed.care_score_version,
  companies: feed.companies,
  pending_company_ids: feed.pending_company_ids,
}, null, 2) + '\n');
console.log(`Exported ${feed.companies.length} published and ${feed.pending_company_ids.length} pending IDs for RemoteShe.`);
