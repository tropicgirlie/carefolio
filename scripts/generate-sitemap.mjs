import { readFile, writeFile } from 'node:fs/promises';

const origin = 'https://www.carefolio.io';
const feed = JSON.parse(await readFile(new URL('../public/carefolio-index-feed.json', import.meta.url), 'utf8'));
const companyIds = feed.companies.map((company) => company.id);
const publicRoutes = ['', '/directory', '/methodology', '/corrections'];
const urls = [...publicRoutes, ...companyIds.map((id) => `/companies/${id}`)];
const entries = urls.map((path) => `  <url>\n    <loc>${origin}${path}</loc>\n  </url>`).join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap);
