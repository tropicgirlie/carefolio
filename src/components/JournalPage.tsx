// Journal page: list of carefolio entries from the WordPress blog.
//
// Data is fetched at build time by scripts/sync-journal.mjs into
// src/data/journal.json. To add a new entry, publish a post in the
// "carefolio" category at blog.luana.systems and redeploy.
//
// Cards link out to the canonical post on the blog. We deliberately
// don't render WordPress HTML inside Carefolio. The blog already has
// good UX, and rendering foreign HTML safely is a fragile commitment.

import { motion } from "motion/react";
import { ArrowUpRight, Mail, BookOpen } from "lucide-react";
import journalEntries from "../data/journal.json";

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

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";
const C = {
  cream: "#F8F3EA",
  creamDeep: "#EFE5D0",
  ink: "#1A1410",
  inkSoft: "#3F352D",
  muted: "#7A6B5C",
  border: "#E1D5BF",
  wine: "#4A1F30",
  wineSoft: "#7A3447",
  rose: "#E2A48C",
  roseSoft: "#F5D9C8",
} as const;

export function JournalPage() {
  const handleNewsletter = () => {
    window.open("https://carefolio.beehiiv.com/", "_blank");
  };

  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* ─────────  Hero  ─────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: C.border }}>
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-16 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>The journal</Eyebrow>
            <h1
              className="mt-5 text-3xl tracking-tight sm:text-5xl md:text-[3.5rem] md:leading-[1.05]"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Receipts, in{" "}
              <span className="italic" style={{ color: C.wine }}>
                public
              </span>
              .
            </h1>
            <p className="mt-6 text-base sm:text-lg" style={{ color: C.inkSoft }}>
              One Sunday a week. What I bought, what I read, what I changed my
              mind about. Each entry lives on the blog; the cards below take you
              there directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────  Entries  ─────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          {entries.length === 0 ? (
            <EmptyState onNewsletter={handleNewsletter} />
          ) : (
            <div className="grid gap-6">
              {entries.map((entry, idx) => (
                <EntryCard key={entry.id} entry={entry} index={idx} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────  CTA  ─────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            One Sunday a week, in your inbox.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            Same content, lower friction. Subscribe and the latest entry lands
            on a Sunday morning.
          </p>
          <button
            onClick={handleNewsletter}
            className="mt-9 inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: C.ink, color: "white" }}
          >
            <Mail className="size-4" />
            Join the Sunday letter
          </button>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  Internal helpers  ─────────────────────────── */

function EntryCard({ entry, index }: { entry: JournalEntry; index: number }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.04 }}
      href={entry.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-2xl"
      style={{
        backgroundColor: "white",
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="grid gap-0 sm:grid-cols-[1fr_2fr]">
        {entry.image ? (
          <div
            className="aspect-[4/3] sm:aspect-auto"
            style={{
              backgroundImage: `url(${entry.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "10rem",
            }}
            aria-hidden="true"
          />
        ) : (
          <div
            className="hidden sm:flex sm:items-center sm:justify-center"
            style={{ backgroundColor: C.creamDeep }}
            aria-hidden="true"
          >
            <BookOpen className="size-8" style={{ color: C.muted }} />
          </div>
        )}

        <div className="flex flex-col justify-center p-6 sm:p-7">
          <div
            className="text-xs uppercase"
            style={{ color: C.muted, letterSpacing: "0.14em" }}
          >
            {formatDate(entry.date)} · {entry.readingTimeMinutes} min read
          </div>
          <h3
            className="mt-3 text-xl tracking-tight sm:text-2xl"
            style={{
              fontFamily: SERIF,
              fontWeight: 600,
              letterSpacing: "-0.015em",
              color: C.ink,
            }}
          >
            {entry.title}
          </h3>
          {entry.excerpt && (
            <p className="mt-3 text-sm leading-relaxed sm:text-base" style={{ color: C.inkSoft }}>
              {entry.excerpt}
            </p>
          )}
          <div
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: C.wine }}
          >
            Read on the blog
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

function EmptyState({ onNewsletter }: { onNewsletter: () => void }) {
  return (
    <div
      className="rounded-2xl p-10 text-center"
      style={{ backgroundColor: "white", border: `1px solid ${C.border}` }}
    >
      <BookOpen className="mx-auto size-9" style={{ color: C.wine }} />
      <h2
        className="mt-5 text-2xl tracking-tight sm:text-3xl"
        style={{
          fontFamily: SERIF,
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        The first entry is on its way.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-sm sm:text-base" style={{ color: C.inkSoft }}>
        Nothing's been published in the journal yet. The first Sunday letter
        lands soon. Drop your email and you'll be the first to read it.
      </p>
      <button
        onClick={onNewsletter}
        className="mt-7 inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-medium transition-opacity hover:opacity-90"
        style={{ backgroundColor: C.ink, color: "white" }}
      >
        <Mail className="size-4" />
        Join the Sunday letter
      </button>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-medium uppercase"
      style={{ color: C.wine, letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}
