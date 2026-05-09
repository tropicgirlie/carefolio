// Privacy policy.
//
// The journey site holds almost no personal data. The Sunday letter list runs
// on Beehiiv (separate processor). Affiliate clicks are tracked at the
// destination, not here. This page just states that plainly.
//
// Last reviewed: 2026-05-09. Update on any material change to data flows.

import { motion } from "motion/react";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

interface PrivacyPolicyPageProps {
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function PrivacyPolicyPage(_props: PrivacyPolicyPageProps) {
  return (
    <div className="bg-cream text-ink">
      <section className="border-b border-border-warm">
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-12 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>Privacy</Eyebrow>
            <DisplayHeading level={1} size="md" className="mt-5">
              Short version: I do not want your data.
            </DisplayHeading>
            <ProseLead className="mt-5">
              Carefolio holds the absolute minimum personal information it can
              get away with. The Sunday letter list is on Beehiiv, not on this
              site. Anything I add later will be listed below with a date.
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
            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              What this site collects
            </h2>
            <p>
              Carefolio is a static publishing site. It does not require an
              account. It does not have a database of users. When you read a
              page, basic anonymised analytics may be collected (page path,
              referrer, country) via the hosting platform's standard logs.
              Nothing about you personally.
            </p>

            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              The Sunday letter
            </h2>
            <p>
              The newsletter list runs on{" "}
              <a
                href="https://www.beehiiv.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wine underline-offset-2 hover:underline"
              >
                Beehiiv
              </a>
              . When you subscribe, your email address is processed by Beehiiv
              under their privacy policy. I see anonymised aggregate stats
              (open rate, click rate). I never sell, share, or hand over the
              list to third parties. You can unsubscribe with one click in any
              email. I will not chase you.
            </p>

            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              Outbound and affiliate links
            </h2>
            <p>
              Some pages link to external brokers or platforms. Where a link is
              an affiliate link, it is labelled as such on the page where it
              appears, per the Central Bank of Ireland Consumer Protection
              Code 2025 and the CCPC 2023 influencer guidelines. Once you
              click, you are on the broker's site and their privacy policy
              applies. Carefolio does not receive any personally identifying
              information about your activity on that site.
            </p>

            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              Cookies
            </h2>
            <p>
              Carefolio itself does not set tracking cookies. Embedded third
              parties (Beehiiv signup forms, the Vercel analytics layer if
              enabled) may set their own cookies under their respective
              policies.
            </p>

            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              Your rights
            </h2>
            <p>
              Under GDPR you have the right to access, correct, and delete any
              personal data held about you. Because Carefolio holds almost
              nothing, the practical answer is usually "ask Beehiiv." If you
              want to confirm whether I hold anything else, email me at the
              address listed on the About page and I will respond within 30
              days, which is the GDPR window.
            </p>

            <h2
              className="text-2xl text-ink sm:text-3xl"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                letterSpacing: "-0.015em",
              }}
            >
              Changes to this policy
            </h2>
            <p>
              I will date any changes at the top of this page. If I ever start
              processing more data (say, adding a comment system or a tools
              section that needs accounts), I will say so here clearly before
              switching it on.
            </p>
          </Prose>
        </div>
      </section>
    </div>
  );
}
