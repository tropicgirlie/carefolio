// Brokers page: how to actually start in Europe.
//
// Editorial wrapper around the BrokersTable comparison tool. The table is
// the working surface (sortable, filterable, expandable rows). The page
// around it carries the narrative + disclosure + the explicit-avoid callout.
//
// Tone: first-person, factual, no inducement language. The disclosure block
// is required for compliance once affiliate links go on (CBI Consumer
// Protection Code 2025 + CCPC influencer guidelines 2023).

import { motion } from "motion/react";
import { Info, AlertTriangle } from "lucide-react";
import { BROKERS } from "../data/brokers";
import { BrokersTable } from "./BrokersTable";
import { affiliatesEnabled } from "./branding/BrokerLink";

export function BrokersPage() {
  const avoid = BROKERS.filter((b) => b.tier === "avoid");

  return (
    <div className="bg-cream text-ink">
      {/* ─── Hero ────────────────────────────────────────────────── */}
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>The practical guide</Eyebrow>
            <h1
              className="mt-5 text-4xl tracking-tight sm:text-6xl md:text-[5rem] md:leading-[1.02]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              Where I{" "}
              <span className="italic text-wine">actually</span> put my money.
            </h1>
            <p className="mt-6 text-lg text-ink-soft sm:text-xl">
              The brokers a forty-something woman in Ireland would consider,
              with the footnotes nobody puts in the marketing copy. Sort,
              filter, expand a row to see what each one is best for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Disclosure ──────────────────────────────────────────── */}
      <section className="border-b border-[#E8D8B6] bg-[#FAF1E0]">
        <div className="mx-auto flex max-w-5xl items-start gap-3 px-6 py-5 text-sm text-[#5C4715]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong>How this page makes money.</strong>{" "}
            {affiliatesEnabled ? (
              <>
                Some links on this page are affiliate links. If you open an
                account after clicking one, the broker pays Carefolio a small
                referral fee at no cost to you. I only list brokers I would
                consider using myself. The editorial tier order is independent
                of whether a broker pays a referral. I am not a regulated
                financial adviser. This is a personal account of how I think
                about brokers, not investment advice.
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

      {/* ─── Table ───────────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <BrokersTable />
        </div>
      </section>

      {/* ─── Avoid callout ───────────────────────────────────────── */}
      <section className="border-t border-border-warm bg-[#FBE8E5]">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-peach px-3 py-1 text-xs font-medium text-[#5C1F0F]">
            <AlertTriangle className="size-3.5" />
            Avoid for a journey portfolio
          </div>
          <h2
            className="mt-5 text-3xl tracking-tight sm:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            What I would not touch with somebody else's money.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Listed so you can recognise these when an Instagram ad gets in front
            of you. They are not stockbrokers. They are leveraged-bet platforms
            with stockbroker aesthetics. Toggle the <strong>Avoid</strong>{" "}
            filter on in the table above to see the full reasoning.
          </p>
          {avoid.length > 0 && (
            <ul className="mt-6 space-y-2 text-sm text-ink-soft">
              {avoid.map((b) => (
                <li key={b.id} className="flex items-start gap-2">
                  <span className="mt-1.5 inline-block size-1.5 shrink-0 rounded-full bg-[#5C1F0F]" />
                  <span>
                    <strong className="text-ink">{b.name}:</strong> {b.watchOut}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* ─── PRSA bottom note ────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>One more thing</Eyebrow>
          <h2
            className="mt-5 text-3xl tracking-tight sm:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
            }}
          >
            The PRSA comparison nobody walks you through.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
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

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-medium uppercase text-wine"
      style={{ letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}
