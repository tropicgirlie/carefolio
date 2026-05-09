// Carefolio investment-companion landing page.
//
// Visual language inspired by Female Invest: warm cream backgrounds, deep
// wine accents, near-black buttons with white text, editorial typography.
// Colors are inlined here (Tailwind arbitrary values) so they do not
// override the global emerald primary used elsewhere in the app.
//
// Pure simulation positioning. The amber disclaimer block near the CTA is
// doing real legal work: keep it visible and unambiguous.

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
import { CareMarketTicker } from "./CareMarketTicker";
import { GROUPS, MAX_RAW_TOTAL, SIGNALS } from "../lib/careScore";

// ─── Palette (Female Invest inspired) ───────────────────────────────────
const C = {
  cream: "#F8F3EA",        // page background
  creamDeep: "#EFE5D0",    // alt section bg
  ink: "#1A1410",          // body text and primary buttons
  inkSoft: "#3F352D",      // softer body
  muted: "#7A6B5C",         // muted text
  border: "#E1D5BF",        // subtle borders
  wine: "#4A1F30",          // deep wine accent
  wineSoft: "#7A3447",      // gradient partner
  rose: "#E2A48C",          // warm peach (Daye warmth)
  roseSoft: "#F5D9C8",      // peach cream (chip / soft accent bg)
} as const;

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

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
    <div
      className="min-h-screen"
      style={{ backgroundColor: C.cream, color: C.ink }}
    >
      {/* ─────────────────────────  Live ticker  ───────────────────────── */}
      <CareMarketTicker />

      {/* ─────────────────────────  Hero  ──────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at top, ${C.roseSoft}55 0%, ${C.cream} 60%)`,
          }}
        />
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-24 sm:pt-28 sm:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: C.roseSoft,
                color: C.wine,
              }}
            >
              <Sparkles className="size-3.5" />
              AI portfolio simulator. No account, no money, no email.
            </div>

            <h1
              className="mt-7 text-5xl tracking-tight sm:text-6xl md:text-[5.75rem] md:leading-[0.98]"
              style={{
                color: C.ink,
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Care is{" "}
              <span
                className="italic"
                style={{
                  background: `linear-gradient(120deg, ${C.wine} 0%, ${C.wineSoft} 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontWeight: 500,
                }}
              >
                Capital
              </span>
              .
            </h1>

            <p
              className="mt-6 max-w-2xl text-lg sm:text-xl"
              style={{ color: C.inkSoft }}
            >
              Build a long-term portfolio out of companies that actually invest
              in their people. Set a goal, see how it would have performed over
              the last 10 years, and project what the next 20 could look like.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <PrimaryButton onClick={onNavigateToDashboard}>
                Open the simulator
                <ArrowRight className="size-4" />
              </PrimaryButton>
              <SecondaryButton onClick={onNavigateToInsights}>
                Read the methodology
              </SecondaryButton>
            </div>

            <p className="mt-5 text-xs" style={{ color: C.muted }}>
              Simulation only. Past performance does not predict future returns.
            </p>
          </motion.div>

          {/* Floating trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl p-6 sm:grid-cols-4"
            style={{
              backgroundColor: "white",
              border: `1px solid ${C.border}`,
              boxShadow: `0 1px 0 ${C.border}55`,
            }}
          >
            <Stat label="Companies screened" value="200+" />
            <Stat label="Signals per company" value="16" />
            <Stat label="Years of backtest data" value="10" />
            <Stat label="Cost to try" value="€0" />
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────  How it works  ──────────────────────── */}
      <section
        className="border-y"
        style={{
          backgroundColor: C.creamDeep,
          borderColor: C.border,
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeader
            eyebrow="How it works"
            title="Three steps. Ten minutes. No spreadsheets."
            subtitle="The whole flow runs in your browser. We never see your money because we never touch it."
          />

          <div className="mt-16 grid gap-6 md:grid-cols-3">
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

              <ul className="mt-8 space-y-3 text-sm" style={{ color: C.inkSoft }}>
                <Feature>16 signals, 100 raw points, normalized to 0 to 100</Feature>
                <Feature>4 tiers: Gold, Rising Star, Listed, Not listed</Feature>
                <Feature>Versioned per SemVer so a 2026 score and a 2030 score are comparable</Feature>
                <Feature>Editorial override exposed transparently on every audit trail</Feature>
              </ul>

              <div className="mt-8">
                <SecondaryButton onClick={onNavigateToInsights}>
                  Full methodology
                  <ArrowRight className="size-4" />
                </SecondaryButton>
              </div>
            </div>

            {/* Signals grid */}
            <div
              className="rounded-2xl p-6"
              style={{
                backgroundColor: "white",
                border: `1px solid ${C.border}`,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: C.wine }}
                >
                  Care Score v1.0
                </div>
                <div className="text-xs font-mono" style={{ color: C.muted }}>
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
                        <div className="text-xs" style={{ color: C.muted }}>
                          {groupTotal} pts
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {signals.map((s) => (
                          <span
                            key={s.key}
                            className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs"
                            style={{
                              backgroundColor: C.cream,
                              border: `1px solid ${C.border}`,
                              color: C.ink,
                            }}
                          >
                            <span
                              className="size-1.5 rounded-full"
                              style={{ backgroundColor: C.wine }}
                            />
                            {s.label}
                            <span style={{ color: C.muted }}>{s.weight}</span>
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
      <section
        className="border-y"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
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
              accentBg={C.wine}
              accentText="white"
            />
            <TierCard
              tier="Rising Star"
              range="75 to 89"
              icon={<Heart className="size-4" />}
              copy="Strong on parental leave plus three other categories."
              accentBg={C.rose}
              accentText={C.ink}
            />
            <TierCard
              tier="Listed"
              range="60 to 74"
              icon={<BadgeCheck className="size-4" />}
              copy="Above the floor that earns a place in the directory."
              accentBg={C.creamDeep}
              accentText={C.inkSoft}
            />
            <TierCard
              tier="Not listed"
              range="below 60"
              icon={<Users className="size-4 opacity-50" />}
              copy="Below the floor. Not surfaced. Signal over noise."
              accentBg="white"
              accentText={C.muted}
            />
          </div>
        </div>
      </section>

      {/* ─────────────────────────  Disclaimer  ────────────────────────── */}
      <section
        className="border-y"
        style={{
          backgroundColor: "#FAF1E0",
          borderColor: "#E8D8B6",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-start gap-4 px-6 py-8">
          <AlertTriangle
            className="mt-0.5 size-5 shrink-0"
            style={{ color: "#8A6B23" }}
          />
          <div className="space-y-1 text-sm">
            <p className="font-medium" style={{ color: "#5C4715" }}>
              Carefolio is a simulation tool, not a financial advisor.
            </p>
            <p style={{ color: "#7A5C1F" }}>
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
            <Wallet className="mx-auto size-9" style={{ color: C.wine }} />
            <h2
              className="mt-6 text-3xl tracking-tight sm:text-5xl"
              style={{
                color: C.ink,
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              See what{" "}
              <span className="italic" style={{ color: C.wine, fontWeight: 500 }}>
                €250 a month
              </span>{" "}
              could look like.
            </h2>
            <p className="mt-4" style={{ color: C.inkSoft }}>
              Open the simulator and build a portfolio in under five minutes.
              Nothing to install, nothing to sign up for, nothing at stake.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton onClick={onNavigateToDashboard}>
                Open the simulator
                <ArrowRight className="size-4" />
              </PrimaryButton>
              <button
                onClick={onNavigateToLogin}
                className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-sm font-medium underline-offset-4 hover:underline"
                style={{ color: C.inkSoft }}
              >
                Save your scenarios (early access)
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─────────────────────────  Trust footer strip  ───────────────── */}
      <section
        className="border-t"
        style={{ borderColor: C.border, backgroundColor: C.cream }}
      >
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div
            className="flex flex-col items-center justify-between gap-4 text-xs sm:flex-row"
            style={{ color: C.muted }}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Built on the open Care Score methodology, version 1.0.
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/tropicgirlie/care-score"
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
                style={{ color: C.inkSoft }}
              >
                Methodology source
              </a>
              <span style={{ color: C.border }}>·</span>
              <button
                onClick={onNavigateToInsights}
                className="hover:underline"
                style={{ color: C.inkSoft }}
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

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-all hover:opacity-90 active:scale-[0.98]"
      style={{
        backgroundColor: C.ink,
        color: "white",
      }}
    >
      {children}
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-all hover:opacity-80"
      style={{
        backgroundColor: "transparent",
        color: C.ink,
        border: `1.5px solid ${C.ink}`,
      }}
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div
        className="text-2xl font-semibold tracking-tight sm:text-3xl"
        style={{ color: C.ink }}
      >
        {value}
      </div>
      <div
        className="mt-1 text-xs uppercase tracking-wider"
        style={{ color: C.muted }}
      >
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
  const wrapperAlign =
    align === "center" ? "items-center text-center" : "items-start text-left";
  const subtitleWidth = align === "center" ? "max-w-2xl" : "max-w-xl";
  return (
    <div className={`flex flex-col ${wrapperAlign}`}>
      <div
        className="text-xs font-medium uppercase tracking-[0.18em]"
        style={{ color: C.wine }}
      >
        {eyebrow}
      </div>
      <h2
        className="mt-4 text-3xl tracking-tight sm:text-5xl"
        style={{
          color: C.ink,
          fontFamily: SERIF,
          fontWeight: 500,
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-5 text-base sm:text-lg ${subtitleWidth}`}
          style={{ color: C.inkSoft }}
        >
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
      className="relative rounded-2xl p-7"
      style={{
        backgroundColor: "white",
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        className="absolute -top-3 left-7 inline-flex size-7 items-center justify-center rounded-full text-xs font-semibold"
        style={{
          backgroundColor: C.ink,
          color: "white",
        }}
      >
        {n}
      </div>
      <div
        className="inline-flex size-9 items-center justify-center rounded-lg"
        style={{
          backgroundColor: C.roseSoft,
          color: C.wine,
        }}
      >
        {icon}
      </div>
      <div className="mt-5 text-lg font-medium" style={{ color: C.ink }}>
        {title}
      </div>
      <p className="mt-2 text-sm" style={{ color: C.inkSoft }}>
        {body}
      </p>
    </motion.div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <CheckCircle2
        className="mt-0.5 size-4 shrink-0"
        style={{ color: C.wine }}
      />
      <span>{children}</span>
    </li>
  );
}

function TierCard({
  tier,
  range,
  icon,
  copy,
  accentBg,
  accentText,
}: {
  tier: string;
  range: string;
  icon: React.ReactNode;
  copy: string;
  accentBg: string;
  accentText: string;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: "white",
        border: `1px solid ${C.border}`,
      }}
    >
      <div
        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
        style={{ backgroundColor: accentBg, color: accentText }}
      >
        {icon}
        {tier}
      </div>
      <div
        className="mt-4 text-2xl font-semibold tracking-tight"
        style={{ color: C.ink }}
      >
        {range}
      </div>
      <p className="mt-2 text-sm" style={{ color: C.inkSoft }}>
        {copy}
      </p>
    </div>
  );
}
