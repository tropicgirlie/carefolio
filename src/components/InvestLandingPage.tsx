// Carefolio landing page.
//
// Now positioned as the documented-personal-journey product (was the
// 'AI portfolio simulator' framing earlier). Refactored to use the
// codified design tokens (bg-cream, text-wine, font-display) and shadcn
// primitives (Button, Card) on top of the shared typography components.
// No more const C palette and no more inline-styled <button>.

import { motion } from "motion/react";
import {
  ArrowRight,
  Receipt,
  Sparkles,
  Compass,
  ShieldCheck,
  BadgeCheck,
  Award,
  Heart,
  Users,
  Mail,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { GROUPS, MAX_RAW_TOTAL, SIGNALS } from "../lib/careScore";
import {
  Eyebrow,
  DisplayHeading,
  ProseLead,
} from "./branding/typography";

const NEWSLETTER_URL = "https://carefolio.beehiiv.com/";

interface InvestLandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDashboard: () => void;
  onLogoClick: () => void;
}

export function InvestLandingPage(_props: InvestLandingPageProps) {
  const handleNewsletter = () => window.open(NEWSLETTER_URL, "_blank");

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(245, 217, 200, 0.35) 0%, var(--carefolio-cream) 60%)",
          }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-peach-soft px-4 py-1.5 text-xs font-medium text-wine">
              <Sparkles className="size-3.5" />
              A documented journey, in public, with receipts
            </div>

            <DisplayHeading level={1} size="xl" className="mt-7">
              Care is{" "}
              <span
                className="italic"
                style={{
                  background:
                    "linear-gradient(120deg, var(--carefolio-wine) 0%, var(--carefolio-wine-soft) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 500,
                  display: "inline-block",
                  paddingRight: "0.12em",
                  marginRight: "-0.04em",
                }}
              >
                Capital
              </span>
              .
            </DisplayHeading>

            <ProseLead className="mt-6 max-w-2xl">
              An immigrant journey to a private portfolio, written week by
              week. The journal, the research, and the brokers that actually
              work in Europe. From a forty-something woman in Dublin who was
              never taught any of this.
            </ProseLead>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
                asChild
              >
                <a href="/journal">
                  Read the journal
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream"
                asChild
              >
                <a href="/method">Read the methodology</a>
              </Button>
            </div>

            <p className="mt-5 text-xs text-muted-warm">
              I am not a regulated financial adviser. This is a personal
              account, not investment advice.
            </p>
          </motion.div>

          {/* Floating trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl border border-border-warm bg-white p-6 shadow-sm sm:grid-cols-4"
          >
            <Stat label="Brokers compared" value="14" />
            <Stat label="Care Score signals" value="16" />
            <Stat label="Sunday letter" value="Weekly" />
            <Stat label="Affiliate links" value="None yet" />
          </motion.div>
        </div>
      </section>

      {/* What this site is */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>What this is</Eyebrow>
            <DisplayHeading level={2} size="md" className="mt-4">
              Three things, one place.
            </DisplayHeading>
            <ProseLead className="mt-5 max-w-2xl">
              Carefolio does three jobs. Personal first, useful second.
            </ProseLead>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <Pillar
              n={1}
              icon={<Receipt className="size-5" />}
              title="A diary"
              body="What I bought, what I sold, what it cost, what I read this week, what I got wrong. One Sunday a week."
              href="/journal"
              cta="Read the journal"
            />
            <Pillar
              n={2}
              icon={<BookOpen className="size-5" />}
              title="A research site"
              body="The gender investing gap, the immigrant women angle, the pension gap. Every figure cited, every source linked."
              href="/research"
              cta="See the data"
            />
            <Pillar
              n={3}
              icon={<Compass className="size-5" />}
              title="A practical guide"
              body="The brokers that work in Europe, the wrappers, the taxes. Sortable, filterable, no marketing copy."
              href="/brokers"
              cta="Open the comparison"
            />
          </div>
        </div>
      </section>

      {/* Why Care Score */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <Eyebrow>How I screen</Eyebrow>
              <DisplayHeading level={2} size="md" className="mt-4">
                A scoring framework you can actually defend.
              </DisplayHeading>
              <ProseLead className="mt-5">
                The Care Score grades companies on 16 publicly verifiable
                signals across 5 categories. Every signal must be backed by an
                audited report, official benefits page, or signed commitment.
                Conservative by design.
              </ProseLead>

              <ul className="mt-8 space-y-3 text-sm text-ink-soft sm:text-base">
                <Feature>16 signals, 100 raw points, normalised to 0 to 100</Feature>
                <Feature>4 tiers: Gold, Rising Star, Listed, Not listed</Feature>
                <Feature>Versioned per SemVer so a 2026 score and a 2030 score are comparable</Feature>
                <Feature>Editorial override exposed transparently on every audit trail</Feature>
              </ul>

              <Button
                variant="outline"
                size="lg"
                className="mt-9 h-11 rounded-full border-2 border-ink bg-transparent px-6 font-medium text-ink hover:bg-cream"
                asChild
              >
                <a href="/method">
                  Full methodology
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>

            {/* Signals grid (lives in a Card now) */}
            <Card className="border-border-warm bg-white">
              <CardContent className="px-6 py-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-xs font-medium uppercase tracking-wider text-wine">
                    Care Score v1.0
                  </div>
                  <div className="font-mono text-xs text-muted-warm">
                    {SIGNALS.length} signals · {MAX_RAW_TOTAL} pts
                  </div>
                </div>

                <div className="space-y-6">
                  {GROUPS.map((group) => {
                    const signals = SIGNALS.filter((s) => s.group === group);
                    const groupTotal = signals.reduce((acc, s) => acc + s.weight, 0);
                    return (
                      <div key={group}>
                        <div className="flex items-center justify-between">
                          <div
                            className="text-sm font-medium text-ink"
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 600,
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {group}
                          </div>
                          <div className="text-xs text-muted-warm">{groupTotal} pts</div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {signals.map((s) => (
                            <span
                              key={s.key}
                              className="inline-flex items-center gap-2 rounded-full border border-border-warm bg-cream px-3 py-1.5 text-sm text-ink"
                            >
                              <span className="size-1.5 rounded-full bg-wine/70" />
                              {s.label}
                              <span className="text-muted-warm">{s.weight}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tier preview */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Four tiers, one decision</Eyebrow>
            <DisplayHeading level={2} size="md" className="mt-4">
              A tier band tells you what kind of company you are buying.
            </DisplayHeading>
            <ProseLead className="mt-5 max-w-2xl">
              Tier bands turn a number into a decision. The top two tiers are
              where the actual money goes.
            </ProseLead>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            <TierCard
              tier="Gold"
              range="90+"
              icon={<Award className="size-4" />}
              copy="Best in class across nearly every signal. Rare."
              accentClass="bg-wine text-white"
            />
            <TierCard
              tier="Rising Star"
              range="75 to 89"
              icon={<Heart className="size-4" />}
              copy="Strong on parental leave plus three other categories."
              accentClass="bg-peach text-ink"
            />
            <TierCard
              tier="Listed"
              range="60 to 74"
              icon={<BadgeCheck className="size-4" />}
              copy="Above the floor that earns a place in the directory."
              accentClass="bg-cream-deep text-ink-soft"
            />
            <TierCard
              tier="Not listed"
              range="below 60"
              icon={<Users className="size-4 opacity-50" />}
              copy="Below the floor. Not surfaced. Signal over noise."
              accentClass="bg-white text-muted-warm border border-border-warm"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Mail className="mx-auto size-9 text-wine" />
            <DisplayHeading level={2} size="md" className="mt-6">
              One Sunday a week.{" "}
              <span className="italic text-wine">Receipts</span> included.
            </DisplayHeading>
            <ProseLead className="mt-5">
              A short journal entry every Sunday morning. What I did, what I
              learned, what I am reading. No spam, no AI-generated nonsense, no
              "you should buy" anywhere on it.
            </ProseLead>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
                onClick={handleNewsletter}
              >
                <Mail className="size-4" />
                Sunday letter
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream"
                asChild
              >
                <a href="/about">
                  About me
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust footer strip */}
      <section className="border-t border-border-warm">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-warm sm:flex-row">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Built on the open Care Score methodology, version 1.0.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tropicgirlie/care-score"
                target="_blank"
                rel="noreferrer"
                className="text-ink-soft hover:underline"
              >
                Methodology source
              </a>
              <span style={{ color: "var(--carefolio-border)" }}>·</span>
              <a
                href="/method"
                className="text-ink-soft hover:underline"
              >
                Methodology page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl tracking-tight text-ink sm:text-3xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 600,
          letterSpacing: "-0.015em",
        }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-warm">
        {label}
      </div>
    </div>
  );
}

function Pillar({
  n,
  icon,
  title,
  body,
  href,
  cta,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: n * 0.05 }}
    >
      <Card className="relative h-full border-border-warm bg-white">
        <CardContent className="px-7 py-7">
          <div className="absolute -top-3 left-7 inline-flex size-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
            {n}
          </div>
          <div className="inline-flex size-9 items-center justify-center rounded-lg bg-peach-soft text-wine">
            {icon}
          </div>
          <div
            className="mt-5 text-lg font-medium text-ink"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </div>
          <p className="mt-2 text-sm text-ink-soft">{body}</p>
          <a
            href={href}
            className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-wine hover:underline"
          >
            {cta}
            <ArrowRight className="size-3.5" />
          </a>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-wine" />
      <span>{children}</span>
    </li>
  );
}

function TierCard({
  tier,
  range,
  icon,
  copy,
  accentClass,
}: {
  tier: string;
  range: string;
  icon: React.ReactNode;
  copy: string;
  accentClass: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-6">
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${accentClass}`}
        >
          {icon}
          {tier}
        </div>
        <div
          className="mt-4 text-2xl tracking-tight text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "-0.015em",
          }}
        >
          {range}
        </div>
        <p className="mt-2 text-sm text-ink-soft">{copy}</p>
      </CardContent>
    </Card>
  );
}
