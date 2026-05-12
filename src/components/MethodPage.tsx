// Method page: the Care Score reframed as my personal screening filter.
//
// Reads from the vendored @luana/care-score package so the page can never
// drift from the canonical methodology. If you change a signal weight in
// src/lib/care-score/spec.ts, this page updates automatically.
//
// Tone: first-person, no marketing language, honest about trade-offs.
// Refactored to shadcn primitives + typography primitives + design tokens.

import { motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Award,
  BadgeCheck,
  Users,
  ExternalLink,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  GROUPS,
  MAX_RAW_TOTAL,
  SIGNALS,
  TIERS,
  CARE_SCORE_VERSION,
} from "../lib/careScore";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

const TIER_ICONS: Record<string, React.ReactNode> = {
  gold: <Award className="size-4" />,
  "rising-star": <Heart className="size-4" />,
  listed: <BadgeCheck className="size-4" />,
  "not-listed": <Users className="size-4 opacity-60" />,
};

const TIER_BADGE_CLASS: Record<string, string> = {
  gold: "bg-wine text-white",
  "rising-star": "bg-peach text-ink",
  listed: "bg-cream-deep text-ink-soft",
  "not-listed": "bg-white text-muted-warm border border-border-warm",
};

export function MethodPage() {
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
            <Eyebrow>The method</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              How I{" "}
              <span className="italic text-wine">screen</span>{" "}
              the companies I'd actually own.
            </DisplayHeading>
            <ProseLead className="mt-7 max-w-3xl">
              Sixteen signals, five categories, one hundred raw points,
              normalised to a number between zero and one hundred. Public
              evidence required for every signal. Conservative by design. Not
              ESG, not a fund, not a product. Just my filter.
            </ProseLead>
            <p
              className="mt-5 text-xs uppercase text-muted-warm"
              style={{ letterSpacing: "0.18em" }}
            >
              Care Score, version {CARE_SCORE_VERSION} · {SIGNALS.length} signals · {MAX_RAW_TOTAL} pts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why I have a screen */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Why bother screening</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            One sentence I keep coming back to.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              I want to own pieces of companies I would have wanted to work for.
              That is the entire premise. Not values investing as a movement,
              not anti-anything, not a political statement that gets quoted in
              someone else's manifesto. Just a personal filter that catches the
              companies I would rather not put my pension money into.
            </p>
            <p>
              The screen below is the sieve. The journal is what falls through it.
            </p>
          </Prose>
        </div>
      </section>

      {/* The signals */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>The signals</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Sixteen things I want to see, weighted.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Each signal must be backed by a publicly available document:
            official benefits page, careers page, audited report, signed
            commitment. If I can't verify it, it scores zero, even if I suspect
            the company offers it. Conservative on purpose.
          </ProseLead>

          <div className="mt-12 space-y-6">
            {GROUPS.map((group) => {
              const signals = SIGNALS.filter((s) => s.group === group);
              const groupTotal = signals.reduce((acc, s) => acc + s.weight, 0);
              return (
                <Card key={group} className="border-border-warm bg-white">
                  <CardContent className="px-6 py-6 sm:px-7 sm:py-7">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3
                        className="text-xl text-ink sm:text-2xl"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 600,
                          letterSpacing: "-0.015em",
                        }}
                      >
                        {group}
                      </h3>
                      <div className="font-mono text-sm text-muted-warm">
                        {groupTotal} pts · {Math.round((groupTotal / MAX_RAW_TOTAL) * 100)}% of total
                      </div>
                    </div>

                    <ul className="mt-5 space-y-2.5">
                      {signals.map((s) => (
                        <li
                          key={s.key}
                          className="flex items-baseline gap-3 text-sm text-ink-soft sm:text-base"
                        >
                          <span className="inline-flex min-w-[2.5rem] justify-end font-mono text-xs text-wine">
                            {s.weight} pt{s.weight === 1 ? "" : "s"}
                          </span>
                          <span className="text-ink">{s.label}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tier bands */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Tier bands</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Four buckets. Two of them go in.
          </DisplayHeading>
          <ProseLead className="mt-5">
            A score on its own does not buy a stock. The bucket does. Anything
            below sixty is not in my universe. Anything in the middle goes on a
            watchlist. The top two tiers are where the actual money goes.
          </ProseLead>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {TIERS.map((tier) => (
              <Card key={tier.key} className="border-border-warm bg-white">
                <CardContent className="px-6 py-6">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TIER_BADGE_CLASS[tier.key] || ""}`}
                  >
                    {TIER_ICONS[tier.key] ?? null}
                    {tier.label}
                  </div>
                  <div
                    className="mt-4 text-3xl text-ink"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 500,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {rangeFor(tier.key, tier.min)}
                  </div>
                  <p className="mt-2 text-sm text-ink-soft">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* How I use it */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>How I use it</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            One screen, one watchlist, one portfolio.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              I run the screen across the S&amp;P 500, the FTSE 350, and the
              EuroStoxx universe. Anything scoring 75 or above goes onto the
              shortlist. Anything between 60 and 74 goes on the watchlist,
              checked twice a year, not bought today. Anything below 60 I do not
              think about.
            </p>
            <p>
              Inside the shortlist I weight by sector first, then by company
              size. The aim is to avoid an accidental concentration in one kind
              of business simply because it's easier to find published benefits
              data for, say, US tech companies than European industrials.
            </p>
            <p>
              The journal is where the actual decisions happen. The screen
              tells me which companies are eligible. The journal tells me which
              ones I bought, when, why, and what I would do differently.
            </p>
          </Prose>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* Honest caveats */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>What this is not</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Three things I want to be clear about.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              <strong className="text-ink">This is a values screen first. The returns case is real but secondary.</strong>{" "}
              The Care Score filters for companies I would want to own. It does
              not predict that they will outperform the market in any given
              year. The honest read of the literature is that values-aligned
              investing does not systematically cost you returns and may help
              on the margin (see <a href="/research#values-and-returns" className="text-wine underline-offset-2 hover:underline">the research page</a>{" "}
              for the studies and their caveats). I accept that asymmetry on
              purpose: I would rather own companies I would want to work for,
              and the data says I am not paying much, if anything, for the
              preference.
            </p>
            <p>
              <strong className="text-ink">The methodology is versioned, not perfect.</strong>{" "}
              Right now the score is at version {CARE_SCORE_VERSION}. The
              SemVer policy in the source repo means a major bump is required
              if any signal change moves real-world scores by more than five
              points. So a 2026 score and a 2030 score remain comparable. They
              will not always be perfect.
            </p>
            <p>
              <strong className="text-ink">This is my filter, not a recommendation.</strong>{" "}
              I am not a regulated financial adviser. The screen above is what I
              use to decide what I myself will own. You are not me. Whether the
              same filter is right for your portfolio is a question your
              actual financial adviser can answer.
            </p>
          </Prose>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>Open source</Eyebrow>
          <DisplayHeading level={2} size="lg" className="mt-5">
            The methodology lives in public.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Every signal, every weight, every tier band lives in a versioned
            package on GitHub. Read the source, file an issue, send a pull
            request. If I change something, the changelog says why.
          </ProseLead>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
              asChild
            >
              <a
                href="https://github.com/tropicgirlie/care-score"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the source
                <ExternalLink className="size-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream"
              asChild
            >
              <a href="/journal">
                Read the journal
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function rangeFor(key: string, min: number): string {
  switch (key) {
    case "gold":
      return "90 and above";
    case "rising-star":
      return "75 to 89";
    case "listed":
      return "60 to 74";
    case "not-listed":
    default:
      return `below 60 (${min})`;
  }
}
