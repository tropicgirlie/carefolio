// Method page: the Care Score reframed as my personal screening filter.
//
// Reads from the vendored @luana/care-score package so the page can never
// drift from the canonical methodology. If you change a signal weight in
// src/lib/care-score/spec.ts, this page updates automatically.
//
// Tone: first-person, no marketing language, honest about trade-offs.

import { motion } from "motion/react";
import {
  ArrowRight,
  Heart,
  Award,
  BadgeCheck,
  Users,
  ExternalLink,
} from "lucide-react";
import {
  GROUPS,
  MAX_RAW_TOTAL,
  SIGNALS,
  TIERS,
  CARE_SCORE_VERSION,
} from "../lib/careScore";

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

const TIER_ICONS: Record<string, React.ReactNode> = {
  gold: <Award className="size-4" />,
  "rising-star": <Heart className="size-4" />,
  listed: <BadgeCheck className="size-4" />,
  "not-listed": <Users className="size-4 opacity-60" />,
};

export function MethodPage() {
  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* ─────────  Hero  ─────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: C.border }}>
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>The method</Eyebrow>
            <h1
              className="mt-5 text-4xl tracking-tight sm:text-6xl md:text-[5rem] md:leading-[1.02]"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              How I{" "}
              <span className="italic" style={{ color: C.wine }}>
                screen
              </span>{" "}
              the companies I'd actually own.
            </h1>
            <p className="mt-7 text-lg sm:text-xl" style={{ color: C.inkSoft }}>
              Sixteen signals, five categories, one hundred raw points,
              normalised to a number between zero and one hundred. Public
              evidence required for every signal. Conservative by design. Not
              ESG, not a fund, not a product. Just my filter.
            </p>
            <p
              className="mt-5 text-xs uppercase"
              style={{ color: C.muted, letterSpacing: "0.18em" }}
            >
              Care Score, version {CARE_SCORE_VERSION} · {SIGNALS.length} signals · {MAX_RAW_TOTAL} pts
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────  Why I have a screen  ────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Why bother screening</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={headingStyle()}
          >
            One sentence I keep coming back to.
          </h2>
          <Prose>
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

      {/* ─────────  The signals (live from the package)  ────────────── */}
      <section
        className="border-y"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>The signals</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={headingStyle()}
          >
            Sixteen things I want to see, weighted.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            Each signal must be backed by a publicly available document:
            official benefits page, careers page, audited report, signed
            commitment. If I can't verify it, it scores zero, even if I suspect
            the company offers it. Conservative on purpose.
          </p>

          <div className="mt-12 space-y-8">
            {GROUPS.map((group) => {
              const signals = SIGNALS.filter((s) => s.group === group);
              const groupTotal = signals.reduce((acc, s) => acc + s.weight, 0);
              return (
                <div
                  key={group}
                  className="rounded-2xl p-6 sm:p-7"
                  style={{
                    backgroundColor: "white",
                    border: `1px solid ${C.border}`,
                  }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3
                      className="text-xl tracking-tight sm:text-2xl"
                      style={{
                        fontFamily: SERIF,
                        fontWeight: 600,
                        letterSpacing: "-0.015em",
                        color: C.ink,
                      }}
                    >
                      {group}
                    </h3>
                    <div
                      className="text-sm font-mono"
                      style={{ color: C.muted }}
                    >
                      {groupTotal} pts · {Math.round((groupTotal / MAX_RAW_TOTAL) * 100)}% of total
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {signals.map((s) => (
                      <li
                        key={s.key}
                        className="flex items-baseline gap-3 text-sm sm:text-base"
                        style={{ color: C.inkSoft }}
                      >
                        <span
                          className="inline-flex min-w-[2.5rem] justify-end font-mono text-xs"
                          style={{ color: C.wine }}
                        >
                          {s.weight} pt{s.weight === 1 ? "" : "s"}
                        </span>
                        <span style={{ color: C.ink }}>{s.label}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────  Tier bands  ──────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Tier bands</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={headingStyle()}
          >
            Four buckets. Two of them go in.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            A score on its own does not buy a stock. The bucket does. Anything
            below sixty is not in my universe. Anything in the middle goes on a
            watchlist. The top two tiers are where the actual money goes.
          </p>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "white",
                  border: `1px solid ${C.border}`,
                }}
              >
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                  style={tierBadgeStyle(tier.key)}
                >
                  {TIER_ICONS[tier.key] ?? null}
                  {tier.label}
                </div>
                <div
                  className="mt-4 text-3xl"
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 500,
                    letterSpacing: "-0.015em",
                    color: C.ink,
                  }}
                >
                  {rangeFor(tier.key, tier.min)}
                </div>
                <p className="mt-2 text-sm" style={{ color: C.inkSoft }}>
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────  How I actually use this  ────────────────────────── */}
      <section
        className="border-y"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>How I use it</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={headingStyle()}
          >
            One screen, one watchlist, one portfolio.
          </h2>
          <Prose>
            <p>
              I run the screen across the S&amp;P 500, the FTSE 350, and the
              EuroStoxx universe. Anything scoring 75 or above goes onto the
              shortlist. Anything between 60 and 74 goes on the watchlist —
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

      {/* ─────────  Honest caveats  ─────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>What this is not</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={headingStyle()}
          >
            Three things I want to be clear about.
          </h2>
          <Prose>
            <p>
              <strong style={{ color: C.ink }}>This is a values screen, not a return signal.</strong>{" "}
              A company with a great Care Score may underperform the market.
              ESG and values-aligned funds have a well-documented history of
              trade-offs against pure index returns. I accept that. The point
              is to own things I want to own.
            </p>
            <p>
              <strong style={{ color: C.ink }}>The methodology is versioned, not perfect.</strong>{" "}
              Right now the score is at version {CARE_SCORE_VERSION}. The
              SemVer policy in the source repo means a major bump is required
              if any signal change moves real-world scores by more than five
              points. So a 2026 score and a 2030 score remain comparable. They
              will not always be perfect.
            </p>
            <p>
              <strong style={{ color: C.ink }}>This is my filter, not a recommendation.</strong>{" "}
              I am not a regulated financial adviser. The screen above is what I
              use to decide what I myself will own. You are not me. Whether the
              same filter is right for your portfolio is a question your
              actual financial adviser can answer.
            </p>
          </Prose>
        </div>
      </section>

      {/* ─────────  CTA  ────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>Open source</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-5xl tracking-tight"
            style={headingStyle()}
          >
            The methodology lives in public.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            Every signal, every weight, every tier band lives in a versioned
            package on GitHub. Read the source, file an issue, send a pull
            request. If I change something, the changelog says why.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://github.com/tropicgirlie/care-score"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.ink, color: "white" }}
            >
              View the source
              <ExternalLink className="size-4" />
            </a>
            <a
              href="/journal"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-opacity hover:opacity-80"
              style={{ color: C.ink, border: `1.5px solid ${C.ink}` }}
            >
              Read the journal
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  Internal helpers  ─────────────────────────── */

function headingStyle() {
  return {
    fontFamily: SERIF,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: C.ink,
  } as const;
}

function tierBadgeStyle(key: string): React.CSSProperties {
  switch (key) {
    case "gold":
      return { backgroundColor: C.wine, color: "white" };
    case "rising-star":
      return { backgroundColor: C.rose, color: C.ink };
    case "listed":
      return { backgroundColor: C.creamDeep, color: C.inkSoft };
    case "not-listed":
    default:
      return { backgroundColor: "white", color: C.muted, border: `1px solid ${C.border}` };
  }
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

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-7 space-y-5 text-base leading-[1.7] sm:text-lg"
      style={{ color: C.inkSoft }}
    >
      {children}
    </div>
  );
}
