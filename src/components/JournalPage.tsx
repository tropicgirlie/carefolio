// Journal page: list of carefolio entries from the WordPress blog.
//
// Data is fetched at build time by scripts/sync-journal.mjs into
// src/data/journal.json. To add a new entry, publish a post in the
// "carefolio" category at blog.luana.systems and redeploy.
//
// Cards link out to the canonical post on the blog. We deliberately
// don't render WordPress HTML inside Carefolio. The blog already has
// good UX, and rendering foreign HTML safely is a fragile commitment.
//
// Refactored to shadcn primitives + typography primitives + design tokens.

import { motion } from "motion/react";
import { ArrowUpRight, Mail, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import journalEntries from "../data/journal.json";
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

export function JournalPage() {
  const handleNewsletter = () => window.open(NEWSLETTER_URL, "_blank");

  return (
    <div className="bg-cream text-ink">
      {/* Hero */}
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>The journal</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              Receipts, in{" "}
              <span className="italic text-wine">public</span>
              .
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              One Sunday a week. What I bought, what I read, what I changed my
              mind about. Each entry lives on the blog; the cards below take you
              there directly.
            </ProseLead>
          </motion.div>
        </div>
      </section>

      {/* Entries */}
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

      {/* CTA */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            One Sunday a week, in your inbox.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Same content, lower friction. Subscribe and the latest entry lands
            on a Sunday morning.
          </ProseLead>
          <Button
            size="lg"
            className="mt-9 h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
            onClick={handleNewsletter}
          >
            <Mail className="size-4" />
            Join the Sunday letter
          </Button>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

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
      className="group block overflow-hidden rounded-2xl border border-border-warm bg-white transition-shadow hover:shadow-sm"
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
            className="hidden bg-cream-deep sm:flex sm:items-center sm:justify-center"
            aria-hidden="true"
          >
            <BookOpen className="size-8 text-muted-warm" />
          </div>
        )}

        <div className="flex flex-col justify-center p-6 sm:p-7">
          <div
            className="text-xs uppercase text-muted-warm"
            style={{ letterSpacing: "0.14em" }}
          >
            {formatDate(entry.date)} · {entry.readingTimeMinutes} min read
          </div>
          <h3
            className="mt-3 text-xl text-ink sm:text-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.015em",
            }}
          >
            {entry.title}
          </h3>
          {entry.excerpt && (
            <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
              {entry.excerpt}
            </p>
          )}
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-wine">
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
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-10 text-center">
        <BookOpen className="mx-auto size-9 text-wine" />
        <DisplayHeading level={2} size="sm" className="mt-5">
          The first entry is on its way.
        </DisplayHeading>
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-soft sm:text-base">
          Nothing's been published in the journal yet. The first Sunday letter
          lands soon. Drop your email and you'll be the first to read it.
        </p>
        <Button
          size="lg"
          className="mt-7 h-11 rounded-full bg-ink px-6 text-sm font-medium text-white hover:bg-black"
          onClick={onNewsletter}
        >
          <Mail className="size-4" />
          Join the Sunday letter
        </Button>
      </CardContent>
    </Card>
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
