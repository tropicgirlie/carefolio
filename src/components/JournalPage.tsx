// Journal page, redesigned as a lab notebook / field notes surface.
//
// Visual language: monospace metadata (entry numbers, dates, reading time,
// stats), Fraunces serif for titles, Inter for prose, dotted dividers, a
// 'on the desk' sidebar that gives the page presence even before the first
// entry ships. Subtle dot pattern on the body suggests notebook paper
// without becoming kitschy.
//
// Data is pulled at build time by scripts/sync-journal.mjs from the
// 'carefolio' category at blog.luana.systems. Cards link out to the
// canonical post on the blog.
//
// Two EDIT ME blocks at the bottom of this file (CURRENTLY_READING and
// OPEN_QUESTIONS) are the right place to swap in your real lab state.

import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  BookOpen,
  Beaker,
  HelpCircle,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import journalEntries from "../data/journal.json";
import { CarefolioMark } from "./branding/CarefolioMark";
import {
  Eyebrow,
  DisplayHeading,
  ProseLead,
} from "./branding/typography";

interface JournalEntry {
  id: number;
  slug: string;
  title: string;
  date: string;
  dateGmt?: string;
  excerpt: string;
  image: string | null;
  link: string;
  author: string | null;
  readingTimeMinutes: number;
}

const entries = journalEntries as JournalEntry[];
const NEWSLETTER_URL = "https://carefolio.beehiiv.com/";
const BLOG_CATEGORY_URL = "https://blog.luana.systems/category/carefolio/";

const MONO = { fontFamily: "var(--font-mono)" };
const DISPLAY = {
  fontFamily: "var(--font-display)",
  fontWeight: 600,
  letterSpacing: "-0.015em",
};

// Subtle dot grid for the notebook-paper effect on the body section
const NOTEBOOK_BG = {
  backgroundImage:
    "radial-gradient(circle, rgba(225, 213, 191, 0.5) 1px, transparent 1px)",
  backgroundSize: "20px 20px",
  backgroundPosition: "0 0",
} as const;

export function JournalPage() {
  const stats = computeStats(entries);
  const handleNewsletter = () => window.open(NEWSLETTER_URL, "_blank");

  return (
    <div className="bg-cream text-ink">
      {/* ─── Masthead ─────────────────────────────────────────────────── */}
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex items-center gap-3">
              <CarefolioMark size={28} />
              <div
                className="text-xs uppercase text-wine"
                style={{ ...MONO, letterSpacing: "0.22em" }}
              >
                Field notes · Vol. I · Carefolio
              </div>
            </div>
            <DisplayHeading level={1} size="xl" className="mt-5">
              A working notebook for{" "}
              <span className="italic text-wine">learning to invest</span>
              .
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              One Sunday a week, in public, with sources. Entries live on{" "}
              <a
                href={BLOG_CATEGORY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wine underline-offset-2 hover:underline"
              >
                blog.luana.systems/category/carefolio
              </a>
              . Cards on this page link straight to the canonical post.
            </ProseLead>
          </motion.div>

          {/* Stats strip — the lab counter */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            <StatCell label="Entries" value={pad(stats.count, 3)} />
            <StatCell
              label="Days running"
              value={stats.daysRunning != null ? String(stats.daysRunning) : "—"}
            />
            <StatCell
              label="Reading time"
              value={
                stats.totalMinutes > 0 ? `${stats.totalMinutes} min` : "—"
              }
            />
            <StatCell
              label="Last updated"
              value={stats.lastUpdated || "—"}
            />
          </motion.dl>
        </div>
      </section>

      {/* ─── Body: entries + sidebar ──────────────────────────────────── */}
      <section className="relative" style={NOTEBOOK_BG}>
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* Main: entries */}
            <div>
              <Eyebrow>Latest entries</Eyebrow>
              {entries.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="mt-6">
                  {entries.map((e, i) => (
                    <Entry
                      key={e.id}
                      entry={e}
                      index={entries.length - i}
                      isFirst={i === 0}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar: on the desk */}
            <aside className="space-y-6">
              <DeskPanel
                eyebrow="On the desk"
                title="Currently reading"
                icon={<BookOpen className="size-4" />}
                items={CURRENTLY_READING}
              />
              <DeskPanel
                eyebrow="Working on"
                title="Open questions"
                icon={<HelpCircle className="size-4" />}
                items={OPEN_QUESTIONS}
              />
              <MethodNote />
            </aside>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            One Sunday a week, in your inbox.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Subscribe and the next field note lands on a Sunday morning. Same
            content as the blog, lower friction.
          </ProseLead>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
              onClick={handleNewsletter}
            >
              <Mail className="size-4" />
              Join the Sunday letter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream"
              asChild
            >
              <a
                href={BLOG_CATEGORY_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read on the blog
                <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────────────────────  Entry row (notebook-style)  ─────────────────── */

function Entry({
  entry,
  index,
  isFirst,
}: {
  entry: JournalEntry;
  index: number;
  isFirst: boolean;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`py-9 ${isFirst ? "" : "border-t border-dotted border-border-warm"}`}
    >
      <div
        className="text-xs uppercase text-muted-warm"
        style={{ ...MONO, letterSpacing: "0.18em" }}
      >
        Entry {pad(index, 3)} · {formatDate(entry.date)} ·{" "}
        {entry.readingTimeMinutes} min
      </div>

      <h3
        className="mt-4 text-2xl text-ink sm:text-3xl"
        style={{ ...DISPLAY, letterSpacing: "-0.02em" }}
      >
        {entry.title}
      </h3>

      {entry.excerpt && (
        <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
          {entry.excerpt}
        </p>
      )}

      <a
        href={entry.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-wine"
      >
        Read on the blog
        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
    </motion.article>
  );
}

/* ───────────────────────  Empty state  ────────────────────────────────── */

function EmptyState() {
  return (
    <div className="mt-6 rounded-2xl border border-dashed border-border-warm bg-white px-6 py-12 text-center">
      <Beaker className="mx-auto size-9 text-wine" />
      <h3
        className="mt-5 text-2xl text-ink sm:text-3xl"
        style={{ ...DISPLAY, letterSpacing: "-0.02em" }}
      >
        The lab is set up. Entry 001 is pending.
      </h3>
      <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft sm:text-base">
        Field notes will appear here as soon as a post lands in the{" "}
        <code
          className="rounded bg-cream px-1.5 py-0.5 text-xs text-wine"
          style={MONO}
        >
          carefolio
        </code>{" "}
        category at{" "}
        <a
          href={BLOG_CATEGORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-wine underline-offset-2 hover:underline"
        >
          blog.luana.systems
        </a>
        .
      </p>
      <p
        className="mt-6 text-xs text-muted-warm"
        style={{ ...MONO, letterSpacing: "0.1em" }}
      >
        $ npm run sync-journal
      </p>
      <p className="mt-1 text-xs text-muted-warm">
        Manual refresh, or trigger a Vercel redeploy after publishing.
      </p>
    </div>
  );
}

/* ───────────────────────  Sidebar panels  ─────────────────────────────── */

function DeskPanel({
  eyebrow,
  title,
  icon,
  items,
}: {
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-5 py-5">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-7 items-center justify-center rounded-md bg-peach-soft text-wine">
            {icon}
          </span>
          <div
            className="text-xs uppercase text-wine"
            style={{ ...MONO, letterSpacing: "0.18em" }}
          >
            {eyebrow}
          </div>
        </div>
        <div className="mt-3 text-base text-ink" style={DISPLAY}>
          {title}
        </div>
        <ol className="mt-4 space-y-3 text-sm text-ink-soft">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="pt-0.5 text-xs text-wine"
                style={{ ...MONO, letterSpacing: "0.05em" }}
              >
                {pad(i + 1, 2)}
              </span>
              <span className="leading-snug">{item}</span>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
}

function MethodNote() {
  return (
    <div className="rounded-xl border border-dashed border-border-warm px-5 py-4 text-xs leading-relaxed text-muted-warm">
      <span className="text-wine" style={{ ...MONO, letterSpacing: "0.18em" }}>
        METHOD
      </span>{" "}
      I write to learn. The Sunday entry is forced exposition: anything I
      cannot explain by Sunday morning is something I do not yet understand.
    </div>
  );
}

/* ───────────────────────  Stat cell (lab counter)  ────────────────────── */

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        className="text-xs uppercase text-muted-warm"
        style={{ ...MONO, letterSpacing: "0.18em" }}
      >
        {label}
      </dt>
      <dd
        className="mt-2 text-3xl text-ink sm:text-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {value}
      </dd>
    </div>
  );
}

/* ───────────────────────  Helpers  ─────────────────────────────────────── */

function computeStats(items: JournalEntry[]) {
  if (items.length === 0) {
    return {
      count: 0,
      daysRunning: null as number | null,
      totalMinutes: 0,
      lastUpdated: null as string | null,
    };
  }
  const sorted = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  const oldest = new Date(sorted[sorted.length - 1].date);
  const newest = new Date(sorted[0].date);
  const daysRunning = Math.max(
    1,
    Math.floor((Date.now() - oldest.getTime()) / 86_400_000),
  );
  const totalMinutes = items.reduce(
    (acc, e) => acc + (e.readingTimeMinutes || 0),
    0,
  );
  const lastUpdated = newest.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });
  return {
    count: items.length,
    daysRunning,
    totalMinutes,
    lastUpdated,
  };
}

function pad(n: number, width: number): string {
  return String(n).padStart(width, "0");
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth() + 1, 2);
    const dd = pad(d.getDate(), 2);
    return `${yyyy}.${mm}.${dd}`;
  } catch {
    return "";
  }
}

/* ───────────────────────  EDIT ME  ────────────────────────────────────── *
 * The two arrays below are hand-curated. Swap with your real lab state any
 * time. They show on the right rail of /journal regardless of whether any
 * journal entries exist, so the page always has presence.
 */

const CURRENTLY_READING: string[] = [
  "Girls Just Wanna Have Funds, by the Female Invest founders",
  "The Psychology of Money, by Morgan Housel",
  "Pensions Authority Trustee Handbook (Ireland)",
];

const OPEN_QUESTIONS: string[] = [
  "How do I optimise my pension. AVCs vs PRSA top-up vs a separate broker.",
  "Is the Davy PRSA fee differential worth the wrapper, or should I unbundle?",
  "How do I size positions when the screened universe is only around 200 names?",
];
