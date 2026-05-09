// Brokers page: how to actually start in Europe.
//
// Editorial framing — first-person, factual, no inducement language. The
// disclosure block at the top is required for compliance once we turn on
// affiliate links (CBI Consumer Protection Code 2025 + CCPC influencer
// guidelines 2023). It's there from day one because the rules apply to
// any commercial relationship, present or future.

import { motion } from "motion/react";
import { ExternalLink, AlertTriangle, ArrowRight, Info } from "lucide-react";
import { BROKERS, type Broker } from "../data/brokers";
import { BrokerLink, affiliatesEnabled } from "./branding/BrokerLink";

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

export function BrokersPage() {
  const primary = BROKERS.filter((b) => b.tier === "primary");
  const ireland = BROKERS.filter((b) => b.tier === "ireland");
  const uk = BROKERS.filter((b) => b.tier === "uk");
  const honourable = BROKERS.filter((b) => b.tier === "honourable");
  const avoid = BROKERS.filter((b) => b.tier === "avoid");

  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* ─────────  Hero  ─────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: C.border }}>
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: C.roseSoft, color: C.wine }}
            >
              The practical guide
            </div>
            <h1
              className="mt-6 text-4xl tracking-tight sm:text-6xl md:text-7xl md:leading-[1.02]"
              style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              Where I{" "}
              <span className="italic" style={{ color: C.wine }}>
                actually
              </span>{" "}
              put my money.
            </h1>
            <p className="mt-6 text-lg sm:text-xl" style={{ color: C.inkSoft }}>
              The brokers a 40-something woman in Ireland would consider, ranked
              by how realistic they are for someone starting out, with the
              footnotes nobody puts in the marketing copy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────  Disclosure  ──────────────────────────────────────── */}
      <section
        className="border-b"
        style={{
          backgroundColor: "#FAF1E0",
          borderColor: "#E8D8B6",
          color: "#5C4715",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-start gap-3 px-6 py-5 text-sm">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong>How this page makes money.</strong>{" "}
            {affiliatesEnabled ? (
              <>
                Some links on this page are affiliate links. If you open an
                account after clicking one, the broker pays Carefolio a small
                referral fee at no cost to you. I only list brokers I would
                consider using myself, and the editorial tier order is
                independent of whether a broker pays a referral. I am not a
                regulated financial adviser. This is a personal account of how
                I think about brokers, not investment advice.
              </>
            ) : (
              <>
                None of the links on this page are affiliate links right now.
                Everything below is editorial. If that changes I will say so on
                this page and label every affiliate link clearly. I am not a
                regulated financial adviser. This is a personal account of how
                I think about brokers, not investment advice.
              </>
            )}
          </p>
        </div>
      </section>

      {/* ─────────  How to read this  ───────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <SectionEyebrow>How to read this page</SectionEyebrow>
          <p className="mt-6 text-base leading-relaxed" style={{ color: C.inkSoft }}>
            There is no single best broker. The right one depends on where you
            live, whether you want a pension wrapper, and how much you actually
            care about saving 0.05% on a trade. The list below is split into
            five tiers. The first tier is the realistic shortlist for an
            Ireland-based starter. The second is Ireland-specific because that
            is the only place in the EU you can buy a PRSA. The third is for UK
            readers. The fourth is brokers worth knowing about. The fifth is
            what to actively avoid for long-term portfolio building.
          </p>
        </div>
      </section>

      {/* ─────────  Primary shortlist  ──────────────────────────────── */}
      <BrokerSection
        eyebrow="The shortlist"
        title="The four I would seriously consider."
        intro="Cheap enough to use for a long time, regulated in jurisdictions you can complain to, and available to Irish residents today."
        brokers={primary}
        accentBg={C.cream}
      />

      {/* ─────────  Ireland-specific  ───────────────────────────────── */}
      <BrokerSection
        eyebrow="Ireland-specific"
        title="If you want a PRSA, you have to play here."
        intro="The PRSA wrapper is an Irish thing and it lives at Irish-licensed providers. They are more expensive than EU brokers. You pay for the wrapper, not the broker. Worth it for the pension money. Use a cheaper broker for everything else."
        brokers={ireland}
        accentBg={C.creamDeep}
      />

      {/* ─────────  UK-specific  ────────────────────────────────────── */}
      <BrokerSection
        eyebrow="UK only"
        title="If you live in the UK or have UK pensions to consolidate."
        intro="Including these for completeness. Each is UK-only, so for an Irish reader they are background, not options."
        brokers={uk}
        accentBg={C.cream}
      />

      {/* ─────────  Honourable mentions  ─────────────────────────────── */}
      <BrokerSection
        eyebrow="Honourable mentions"
        title="Worth knowing about, not currently on my shortlist."
        intro="Either too niche for a starter portfolio, more expensive than the shortlist, or specialised in a way that is not relevant unless you already know you need it."
        brokers={honourable}
        accentBg={C.creamDeep}
      />

      {/* ─────────  Avoid  ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: "#FBE8E5" }}>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: "#E2A48C", color: "#5C1F0F" }}
          >
            Avoid for a journey portfolio
          </div>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={{
              fontFamily: SERIF,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: C.ink,
            }}
          >
            What I would not touch with somebody else's money.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: C.inkSoft }}>
            Listed so you can recognise these when an Instagram ad gets in front
            of you. They are not stockbrokers. They are leveraged-bet platforms
            with stockbroker aesthetics.
          </p>
          <div className="mt-8 grid gap-4">
            {avoid.map((b) => (
              <BrokerCard key={b.id} broker={b} muted />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────  Bottom note  ────────────────────────────────────── */}
      <section style={{ backgroundColor: C.cream }}>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <SectionEyebrow>One more thing</SectionEyebrow>
          <h2
            className="mt-5 text-3xl sm:text-4xl tracking-tight"
            style={{ fontFamily: SERIF, fontWeight: 500, letterSpacing: "-0.02em" }}
          >
            The PRSA comparison nobody walks you through.
          </h2>
          <p className="mt-4 text-base leading-relaxed" style={{ color: C.inkSoft }}>
            For most Irish women, the realistic pension comparison is not
            "DEGIRO versus Trading 212." It is "the default workplace PRSA your
            employer set up versus an EU broker for non-pension money plus a
            smaller PRSA top-up." That comparison gets you 0.5 to 1 percent of
            annual fees back. Compounded over 25 years it is a serious number.
            More on this in the journal soon.
          </p>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  Section helpers  ─────────────────────────── */

function BrokerSection({
  eyebrow,
  title,
  intro,
  brokers,
  accentBg,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  brokers: Broker[];
  accentBg: string;
}) {
  return (
    <section style={{ backgroundColor: accentBg }}>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2
          className="mt-5 text-3xl sm:text-4xl tracking-tight"
          style={{
            fontFamily: SERIF,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            color: C.ink,
          }}
        >
          {title}
        </h2>
        <p className="mt-4 text-base leading-relaxed" style={{ color: C.inkSoft }}>
          {intro}
        </p>
        <div className="mt-10 grid gap-4">
          {brokers.map((b) => (
            <BrokerCard key={b.id} broker={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-medium uppercase"
      style={{ color: C.wine, letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

function BrokerCard({ broker, muted = false }: { broker: Broker; muted?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="rounded-2xl p-6 sm:p-7"
      style={{
        backgroundColor: "white",
        border: `1px solid ${C.border}`,
      }}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3
          className="text-2xl tracking-tight"
          style={{
            fontFamily: SERIF,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: muted ? C.muted : C.ink,
          }}
        >
          {broker.name}
        </h3>
        <BrokerLink
          href={broker.url}
          affiliateHref={broker.affiliateUrl}
          className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          style={{ color: C.wine }}
        >
          Visit site
          <ExternalLink className="size-3.5" />
        </BrokerLink>
      </div>

      <div
        className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2"
        style={{ color: C.inkSoft }}
      >
        <Field label="Regulator">{broker.regulator}</Field>
        <Field label="Available to">{broker.passport}</Field>
        <Field label="Account types">{broker.accountTypes.join(", ")}</Field>
        <Field label="Pricing">{broker.pricing}</Field>
      </div>

      <div className="mt-5 flex items-start gap-2 text-sm" style={{ color: C.inkSoft }}>
        <ArrowRight className="mt-0.5 size-4 shrink-0" style={{ color: C.wine }} />
        <span>
          <strong style={{ color: C.ink }}>Best for:</strong> {broker.bestFor}
        </span>
      </div>

      <div className="mt-2 flex items-start gap-2 text-sm" style={{ color: C.muted }}>
        <AlertTriangle className="mt-0.5 size-4 shrink-0" style={{ color: C.rose }} />
        <span>
          <strong style={{ color: C.inkSoft }}>Watch out:</strong> {broker.watchOut}
        </span>
      </div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div
        className="text-xs uppercase"
        style={{ color: C.muted, letterSpacing: "0.1em" }}
      >
        {label}
      </div>
      <div className="mt-0.5">{children}</div>
    </div>
  );
}
