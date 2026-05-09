// /login (and /early-access): newsletter signup page.
//
// The journey site doesn't have user accounts — the only thing to "sign up
// for" is the Sunday letter, which is hosted on Beehiiv. This page is a
// clean, on-brand surface that explains what you're subscribing to and
// hands off to Beehiiv's hosted form. No PII held on Carefolio.

import { motion } from "motion/react";
import {
  Mail,
  ArrowRight,
  CheckCircle2,
  CalendarClock,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Eyebrow,
  DisplayHeading,
  ProseLead,
} from "./branding/typography";

const NEWSLETTER_URL = "https://carefolio.beehiiv.com/";

interface LoginPageProps {
  onNavigateToLanding: () => void;
  onLogoClick: () => void;
}

export function LoginPage(_props: LoginPageProps) {
  const handleSubscribe = () => window.open(NEWSLETTER_URL, "_blank");

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
            <Eyebrow>The Sunday letter</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              One{" "}
              <span className="italic text-wine">Sunday</span>{" "}
              a week. Receipts included.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              A short journal entry every Sunday morning. What I bought, what I
              read, what I changed my mind about. No spam, no AI-generated
              nonsense, no "you should buy" anywhere on it.
            </ProseLead>
          </motion.div>
        </div>
      </section>

      {/* What you get */}
      <section>
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <Card className="border-border-warm bg-white">
            <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
              <div
                className="text-xs font-medium uppercase text-wine"
                style={{ letterSpacing: "0.18em" }}
              >
                What you get
              </div>
              <ul className="mt-5 space-y-4 text-base text-ink-soft sm:text-lg">
                <Item icon={<PenLine className="size-5" />}>
                  One short journal entry per week. What I did, what I learned,
                  what is on my watchlist.
                </Item>
                <Item icon={<CalendarClock className="size-5" />}>
                  Sunday mornings, Dublin time. Five-minute read. Easy to skip,
                  easier to come back to.
                </Item>
                <Item icon={<ShieldCheck className="size-5" />}>
                  No PII held on Carefolio. The list runs on Beehiiv. Unsubscribe
                  anywhere with one click. I will never sell your email.
                </Item>
                <Item icon={<CheckCircle2 className="size-5" />}>
                  Free. Always. The site might add an affiliate link to a broker
                  some day, with a clear label. The newsletter stays free.
                </Item>
              </ul>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black sm:w-auto"
                  onClick={handleSubscribe}
                >
                  <Mail className="size-4" />
                  Subscribe on Beehiiv
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream sm:w-auto"
                  asChild
                >
                  <a href="/journal">Read the journal first</a>
                </Button>
              </div>

              <p className="mt-5 text-center text-xs text-muted-warm">
                By subscribing you agree to receive the Sunday letter. The list
                is hosted on Beehiiv. See their{" "}
                <a
                  href="https://www.beehiiv.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-soft underline-offset-2 hover:underline"
                >
                  privacy policy
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Below the fold */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <Eyebrow>Not ready yet</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Read first, decide later.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Three of the most useful pages on the site, in case you want to know
            what you'd be subscribing to.
          </ProseLead>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="outline"
              className="h-11 rounded-full border-2 border-ink bg-transparent px-5 text-sm font-medium text-ink hover:bg-cream"
              asChild
            >
              <a href="/about">About me</a>
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-full border-2 border-ink bg-transparent px-5 text-sm font-medium text-ink hover:bg-cream"
              asChild
            >
              <a href="/method">How I screen</a>
            </Button>
            <Button
              variant="outline"
              className="h-11 rounded-full border-2 border-ink bg-transparent px-5 text-sm font-medium text-ink hover:bg-cream"
              asChild
            >
              <a href="/brokers">Brokers I would actually use</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Item({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-peach-soft text-wine">
        {icon}
      </span>
      <span className="pt-1.5">{children}</span>
    </li>
  );
}
