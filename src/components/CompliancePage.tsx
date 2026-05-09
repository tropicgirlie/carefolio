// Compliance.
//
// What rules Carefolio operates under, what it is not, and what to do if you
// believe something on the site crosses a line.

import { motion } from "motion/react";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

interface CompliancePageProps {
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function CompliancePage(_props: CompliancePageProps) {
  return (
    <div className="bg-cream text-ink">
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>Compliance</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              What this site is, and what it is not.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              Carefolio is a documented personal journey, an editorial
              publication, and a practical guide. It is not a regulated
              financial product, an investment adviser, or a custodian of
              anybody's money.
            </ProseLead>
            <p className="mt-4 text-xs text-muted-warm">
              Last reviewed 9 May 2026.
            </p>
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-3xl px-6 py-16">
          <Prose>
            <H2>Not a financial adviser</H2>
            <p>
              I am not authorised by the Central Bank of Ireland, the FCA, or
              any other competent authority to give investment advice. Nothing
              on Carefolio is a personal recommendation to buy, sell, or hold
              any specific security or financial product. Where I describe my
              own actions, that is a personal account. You are not me.
            </p>

            <H2>Not a brokerage</H2>
            <p>
              Carefolio does not custody money, place trades, or act as an
              intermediary in any transaction. The brokers page lists
              regulated firms that perform those roles; clicking through to
              one of them places you on their platform under their terms.
            </p>

            <H2>Affiliate links and disclosures</H2>
            <p>
              Where a link on the site is an affiliate link, the page where it
              appears carries a clear disclosure at the top, in line with the
              Central Bank of Ireland Consumer Protection Code 2025 and the
              CCPC 2023 influencer guidelines. The editorial selection of
              brokers is independent of any commercial relationship: brokers
              do not pay to be listed and do not pay to influence the order
              they appear in.
            </p>

            <H2>Backtests and projections</H2>
            <p>
              Where the site shows a backtest, that is the result of running
              a portfolio against historical market data for a stated period.
              It is not a guarantee. Where the site shows a projection, that
              is a scenario range based on historical volatility, not a
              forecast. Past performance does not predict future returns.
            </p>

            <H2>GDPR</H2>
            <p>
              See the privacy policy for full detail. In short: Carefolio holds
              the minimum personal information it can. The Sunday letter
              processor is Beehiiv, who acts as data processor under their own
              terms. You can unsubscribe with one click and your data will be
              removed.
            </p>

            <H2>If you think something is wrong</H2>
            <p>
              If you believe a page on this site crosses into regulated
              activity, makes a claim that should be taken down, or contains a
              factual error, email the address on the About page. Corrections
              and clarifications are made within the same week.
            </p>
          </Prose>
        </div>
      </section>
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl text-ink sm:text-3xl"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        letterSpacing: "-0.015em",
      }}
    >
      {children}
    </h2>
  );
}
