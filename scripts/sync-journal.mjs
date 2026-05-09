#!/usr/bin/env node
// Carefolio journal sync.
//
// Fetches posts from a WordPress REST API, filtered by category slug,
// and writes a clean JSON shape to src/data/journal.json so the React
// app can read it at build time.
//
// Runs automatically before `npm run dev` and `npm run build` via the
// predev / prebuild hooks in package.json.
//
// Configuration via env vars (with sensible defaults):
//   CAREFOLIO_BLOG_URL          default: https://blog.luana.systems
//   CAREFOLIO_BLOG_CATEGORY     default: carefolio
//   CAREFOLIO_BLOG_LIMIT        default: 30
//
// Failure modes are deliberately graceful: if the blog is unreachable,
// the category is empty, or the network is down, we keep whatever
// journal.json was last committed and exit 0 so builds don't break.

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const BLOG_URL = (process.env.CAREFOLIO_BLOG_URL || "https://blog.luana.systems").replace(/\/$/, "");
const CATEGORY_SLUG = process.env.CAREFOLIO_BLOG_CATEGORY || "carefolio";
const LIMIT = Number(process.env.CAREFOLIO_BLOG_LIMIT || 30);

const OUTPUT_PATH = resolve(ROOT, "src/data/journal.json");

async function main() {
  console.log(`[journal-sync] fetching category "${CATEGORY_SLUG}" from ${BLOG_URL}`);

  // 1. Resolve category slug → ID. WordPress REST API needs the numeric ID.
  const catUrl = `${BLOG_URL}/wp-json/wp/v2/categories?slug=${encodeURIComponent(CATEGORY_SLUG)}`;
  const catRes = await fetchWithTimeout(catUrl, 15000);
  if (!catRes.ok) {
    return softFail(`category lookup returned HTTP ${catRes.status}`);
  }
  const cats = await catRes.json();
  if (!Array.isArray(cats) || cats.length === 0) {
    return softFail(`no category found with slug "${CATEGORY_SLUG}". The journal page will render empty until a post is published in that category.`);
  }
  const categoryId = cats[0].id;

  // 2. Fetch posts in that category, with embedded featured media.
  const postsUrl = `${BLOG_URL}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=${LIMIT}&_embed=1&orderby=date&order=desc`;
  const postsRes = await fetchWithTimeout(postsUrl, 20000);
  if (!postsRes.ok) {
    return softFail(`posts fetch returned HTTP ${postsRes.status}`);
  }
  const posts = await postsRes.json();
  if (!Array.isArray(posts)) {
    return softFail(`posts response was not an array`);
  }

  // 3. Transform to a clean shape we control. The React app reads this.
  const entries = posts.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: decodeHtml(p.title?.rendered || ""),
    date: p.date,                    // ISO 8601, e.g. "2026-05-04T09:00:00"
    dateGmt: p.date_gmt,
    excerpt: stripHtml(p.excerpt?.rendered || ""),
    image: p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
    link: p.link,                    // canonical link on the blog, where the card goes
    author: p._embedded?.author?.[0]?.name || null,
    readingTimeMinutes: estimateReadingTime(p.content?.rendered || ""),
  }));

  // 4. Write the JSON file. Pretty print so diffs are readable.
  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, JSON.stringify(entries, null, 2) + "\n", "utf8");

  console.log(`[journal-sync] wrote ${entries.length} entries to src/data/journal.json`);
}

async function fetchWithTimeout(url, ms) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
  } finally {
    clearTimeout(timer);
  }
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(html) {
  return stripHtml(html);
}

function estimateReadingTime(html) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

async function softFail(reason) {
  console.warn(`[journal-sync] ${reason}`);
  // Ensure the file at least exists with an empty array so the import never breaks.
  try {
    await readFile(OUTPUT_PATH, "utf8");
    console.warn(`[journal-sync] keeping existing ${OUTPUT_PATH}`);
  } catch {
    await mkdir(dirname(OUTPUT_PATH), { recursive: true });
    await writeFile(OUTPUT_PATH, "[]\n", "utf8");
    console.warn(`[journal-sync] wrote empty ${OUTPUT_PATH}`);
  }
  process.exit(0);
}

main().catch((err) => softFail(`unexpected error: ${err?.message || err}`));
