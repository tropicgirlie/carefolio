// Data governance.
//
// What data Carefolio uses, where it comes from, how it is updated, and the
// ground rules that govern any change to the methodology.

import { motion } from "motion/react";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

interface DataGovernancePageProps {
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function DataGovernancePage(_props: DataGovernancePageProps) {
  return (
    <div className="bg-cream text-ink">
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-5xl px-6 pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>Data governance</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              How the numbers on this site are produced.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              Every figure on Carefolio is sourced. Every methodology is
              versioned. Every change has a date. This page is the rulebook.
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
            <H2>Sources of fact</H2>
            <p>
              Statistics quoted on the site come from named primary sources:
              BlackRock, Eurostat, EIGE, OECD, ECB, Bank of Ireland,
              Pensions Policy Institute, CSO Ireland. Where a figure has not
              yet been verified against the primary PDF, the page carries a{" "}
              <em className="text-wine">working draft</em> banner and the
              figure is treated as a research pointer until confirmed.
            </p>

            <H2>The Care Score methodology</H2>
            <p>
              The 16-signal Care Score lives in a public, versioned package on
              GitHub at{" "}
              <a
                href="https://github.com/tropicgirlie/care-score"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wine underline-offset-2 hover:underline"
              >
                tropicgirlie/care-score
              </a>
              . Every signal definition, weight, and tier band is stored in
              source. The repo follows Semantic Versioning with policy
              specific to scoring: a major bump is required if any company's
              normalised score moves by more than five points. Every release
              exports a CARE_SCORE_VERSION constant so a 2026 score and a
              2030 score can always be told apart.
            </p>

            <H2>How company data is collected</H2>
            <p>
              For each company on the site, every signal must be backed by a
              publicly available document: an official benefits page, a
              careers page, an audited report, or a signed commitment. If a
              signal cannot be verified from public sources, it scores zero,
              even when the company is suspected to offer it. Conservative is
              the design intent.
            </p>
            <p>
              Self-reported data must be cross-checked. A company claiming a
              benefit must also have it on a public source. Audited Care
              Scores expire after 12 months; companies are required to
              re-confirm or the score reverts to "auto-listed" defaults.
            </p>

            <H2>Editorial adjustment</H2>
            <p>
              The displayed score may differ from the computed score when an
              auditor has reviewed a company manually. The breakdown output
              exposes both the computed value and the displayed value, plus
              the delta between them, so any editorial adjustment is visible
              and explained.
            </p>

            <H2>Corrections policy</H2>
            <p>
              If you find an error, email me at the address on the About page
              or open an issue in the GitHub repo. Corrections are made within
              the same week and noted in the changelog. Significant corrections
              are also flagged in the Sunday letter.
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
