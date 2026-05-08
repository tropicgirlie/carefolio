// Carefolio investment-companion landing page.
//
// This is the public marketing surface for the Carefolio simulator. It does
// not move money, it does not provide investment advice. It explains the
// product, shows how the Care Score screening works, and routes the user to
// the simulator.
//
// Pure simulation positioning. The disclaimer block near the CTA is doing
// real legal work: keep it visible and unambiguous.

import { motion } from "motion/react";
import {
  ArrowRight,
  Target,
  Sparkles,
  LineChart,
  ShieldCheck,
  BadgeCheck,
  Award,
  AlertTriangle,
  Heart,
  Users,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { CareMarketTicker } from "./CareMarketTicker";
import { GROUPS, MAX_RAW_TOTAL, SIGNALS } from "../lib/careScore";

interface InvestLandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDashboard: () => void;
  onLogoClick: () => void;
}

export function InvestLandingPage({
  onNavigateToLogin,
  onNavigateToInsights,
  onNavigateToDashboard,
}: InvestLandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ─────────────────────────  Live ticker  ───────────────────────── */}
      <CareMarketTicker />

      {/* ─────────────────────────  Hero  ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
              <Sparkles className="size-3.5" />
              AI portfolio simulator, no account required
            </div>

            <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
              Care is{" "}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Capital
              </span>
              .
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Build a long-term portfolio out of companies that actually invest
              in their people. Set a goal, see how it would have performed over
              the last 10 years, and project what the next 20 could look like.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={onNavigateToDashboard}
                className="h-12 rounded-full px-7 text-base"
              >
                Open the simulator
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onNavigateToInsights}
                className="h-12 rounded-full px-7 text-base"
              >
                Read the methodology
              </Button>
            </div>

            <p className="mt-5 text-xs text-muted-foreground">
              No account, no money, no email. Just the numbers.
            </p>
          </motion.div>

          {/* Floating trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl border bg-card/60 p-6 shadow-sm backdrop-blur-sm sm:grid-cols-4"
          >
            <Stat label="Companies screened" value="200+" />
            <Stat label="Signals per company" value="16" />
            <Stat label="Years of backtest data" value="10" />
            <Stat label="Cost to try" value="€0" />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────  How it works  ──────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps. Ten minutes. No spreadsheets."
            subtitle="The whole flow runs in your browser. We never see your money because we never touch it."
          />

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <StepCard
              n={1}
              icon={<Target className="size-5" />}
              title="Set your goal"
              body="Retirement, a house deposit, financial independence. Pick a timeline and a monthly contribution. We'll tune the rest."
            />
            <StepCard
              n={2}
              icon={<Sparkles className="size-5" />}
              title="See your shortlist"
              body="Carefolio screens the S&P 500, FTSE 350, and EuroStoxx down to companies that score 75+ on our 16-signal Care Score. You pick from there."
            />
            <StepCard
              n={3}
              icon={<LineChart className="size-5" />}
              title="Run the numbers"
              body="Backtest your portfolio against 10 years of real market data. Project 5 to 20 years out using historical volatility ranges, not promises."
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────  Why Care Score  ────────────────────── */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-center">
            <div>
              <SectionHeader
                eyebrow="The screening engine"
                title="A scoring framework you can actually defend."
                subtitle="The Care Score grades companies on 16 publicly verifiable signals across 5 categories. Every signal must be backed by an audited report, official benefits page, or signed commitment. Conservative by design."
                align="left"
              />

              <ul className="mt-8 space-y-3 text-sm">
                <Feature>16 signals, 100 raw points, normalized to 0 to 100</Feature>
                <Feature>4 tiers: Gold, Rising Star, Listed, Not listed</Feature>
                <Feature>Versioned per SemVer so a 2026 score and a 2030 score are comparable</Feature>
                <Feature>Editorial override exposed transparently on every audit trail</Feature>
              </ul>

              <Button
                variant="outline"
                className="mt-8 rounded-full"
                onClick={onNavigateToInsights}
              >
                Full methodology
                <ArrowRight className="size-4" />
              </Button>
            </div>

            {/* Signals grid */}
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Care Score v1.0
                </div>
                <div className="text-xs font-mono text-muted-foreground">
                  {SIGNALS.length} signals · {MAX_RAW_TOTAL} pts
                </div>
              </div>

              <div className="space-y-4">
                {GROUPS.map((group) => {
                  const signals = SIGNALS.filter((s) => s.group === group);
                  const groupTotal = signals.reduce(
                    (acc, s) => acc + s.weight,
                    0,
                  );
                  return (
                    <div key={group}>
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{group}</div>
                        <div className="text-xs text-muted-foreground">
                          {groupTotal} pts
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {signals.map((s) => (
                          <span
                            key={s.key}
                            className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-xs"
                          >
                            <span className="size-1.5 rounded-full bg-primary/70" />
                            {s.label}
                            <span className="text-muted-foreground">
                              {s.weight}
                            </span>
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  Tier preview  ─────────────────────── */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader
            eyebrow="Four tiers, one decision"
            title="A tier band tells you what kind of company you're buying."
            subtitle="Tier bands turn a number into a decision. Carefolio defaults to the top two tiers because those are the companies the framework actually trusts."
          />

          <div className="mt-14 grid gap-4 md:grid-cols-4">
            <TierCard
              tier="Gold"
              range="90+"
              icon={<Award className="size-4" />}
              copy="Best in class across nearly every signal. Rare."
              accent="bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-100"
            />
            <TierCard
              tier="Rising Star"
              range="75 to 89"
              icon={<Heart className="size-4" />}
              copy="Strong on parental leave plus three other categories."
              accent="bg-pink-100 text-pink-900 dark:bg-pink-900/30 dark:text-pink-100"
            />
            <TierCard
              tier="Listed"
              range="60 to 74"
              icon={<BadgeCheck className="size-4" />}
              copy="Above the floor that earns a place in the directory."
              accent="bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
            />
            <TierCard
              tier="Not listed"
              range="below 60"
              icon={<Users className="size-4 opacity-50" />}
              copy="Below the floor. Not surfaced. Signal over noise."
              accent="bg-muted text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────  Disclaimer  ────────────────────────── */}
      <section className="border-y bg-amber-50 dark:bg-amber-950/20">
        <div className="mx-auto flex max-w-6xl items-start gap-4 px-6 py-8">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-400" />
          <div className="space-y-1 text-sm">
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Carefolio is a simulation tool, not a financial advisor.
            </p>
            <p className="text-amber-800 dark:text-amber-200/90">
              We do not hold or trade money, and we do not provide personalized
              investment advice. Past performance does not predict future
              returns. Backtests use historical price data, projections use
              historical volatility ranges. Consult a qualified financial
              professional before making any investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────  CTA  ───────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Wallet className="mx-auto size-9 text-primary" />
            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              See what €250 a month could look like.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Open the simulator and build a portfolio in under five minutes.
              Nothing to install, nothing to sign up for, nothing at stake.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={onNavigateToDashboard}
                className="h-12 rounded-full px-7 text-base"
              >
                Open the simulator
                <ArrowRight className="size-4" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                onClick={onNavigateToLogin}
                className="h-12 rounded-full px-7 text-base"
              >
                Save your scenarios (early access)
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────  Trust footer strip  ───────────────── */}
      <section className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Built on the open Care Score methodology, version 1.0.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tropicgirlie/care-score"
                className="hover:text-foreground"
                target="_blank"
                rel="noreferrer"
              >
                Methodology source
              </a>
              <span className="text-border">·</span>
              <button
                onClick={onNavigateToInsights}
                className="hover:text-foreground"
              >
                Methodology page
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  Internal helpers  ──────────────────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const wrapperAlign = align === "center" ? "items-center text-center" : "items-start text-left";
  const subtitleWidth = align === "center" ? "max-w-2xl" : "max-w-xl";
  return (
    <div className={`flex flex-col ${wrapperAlign}`}>
      <div className="text-xs font-medium uppercase tracking-wider text-primary">
        {eyebrow}
      </div>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-muted-foreground ${subtitleWidth}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function StepCard({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: n * 0.05 }}
      className="relative rounded-2xl border bg-card p-7 shadow-sm"
    >
      <div className="absolute -top-3 left-7 inline-flex size-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {n}
      </div>
      <div className="inline-flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
        {icon}
      </div>
      <div className="mt-5 text-lg font-medium">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </motion.div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
      <span>{children}</span>
    </li>
  );
}

function TierCard({
  tier,
  range,
  icon,
  copy,
  accent,
}: {
  tier: string;
  range: string;
  icon: React.ReactNode;
  copy: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${accent}`}
      >
        {icon}
        {tier}
      </div>
      <div className="mt-4 text-2xl font-semibold tracking-tight">{range}</div>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}
