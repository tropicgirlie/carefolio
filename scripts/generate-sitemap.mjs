import { readFile, writeFile } from 'node:fs/promises';

const origin = 'https://www.carefolio.io';
const source = await readFile(new URL('../src/data/carefolio-companies.ts', import.meta.url), 'utf8');
const companyIds = source
  .split('\n')
  .filter((line) => line.includes("verification_status: 'verified'"))
  .map((line) => line.match(/\bid:\s*'([^']+)'/)?.[1])
  .filter(Boolean);
const publicRoutes = ['', '/directory', '/methodology', '/corrections'];
const urls = [...publicRoutes, ...companyIds.map((id) => `/companies/${id}`)];
const entries = urls.map((path) => `  <url>\n    <loc>${origin}${path}</loc>\n  </url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
