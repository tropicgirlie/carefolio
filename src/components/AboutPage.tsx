// About page: the personal-journey story.
//
// Tone: honest, dry-witty, sources cited inline, no jargon. First-person
// past tense. The standing 'I am not a regulated financial adviser' line
// is required on every page that touches money. Keep it visible.
//
// EDIT ME markers point at sentences you'll want to swap for your actual
// biography. Everything else is structural and can stay.
//
// Refactored to use shadcn primitives + typography primitives + design
// tokens. No const C palette, no inline buttons.

import { motion } from "motion/react";
import { ArrowRight, Mail, BookOpen, Compass, Receipt, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

const NEWSLETTER_URL = "https://carefolio.beehiiv.com/";

interface AboutPageProps {
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onLogoClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function AboutPage(_props: AboutPageProps) {
  const handleNewsletter = () => window.open(NEWSLETTER_URL, "_blank");

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
            <Eyebrow>About</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              I'm{" "}
              <span className="italic text-wine">Luana</span>
              . Forty-something, a woman in Dublin, and nobody ever taught me how to invest.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              So I'm learning in public, with receipts. An immigrant's journey
              to a private portfolio, written as I go. The journal, the
              research, and the practical guide I wish someone had handed me
              ten years ago.
            </ProseLead>
          </motion.div>
        </div>
      </section>

      {/* My story */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>The story</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            How I ended up writing this in my forties.
          </DisplayHeading>
          <Prose className="mt-7">
            {/* EDIT ME: swap in your real opening line */}
            <p>
              I came to Ireland for work and stayed for the rain. I built a
              career in technology, raised a family, paid taxes in two countries,
              and through all of it never once thought hard about pensions.
              Pensions were something other people had. People with longer
              tenure, more stable plans, a different accent.
            </p>
            {/* EDIT ME: your specific motherhood / career interruption story */}
            <p>
              By the time I started looking, I was forty. I'd missed the easy
              decade, the one all the books are written for. I'd taken a career
              break around motherhood, like most women I know. The default
              workplace pension I had been paying into was charging fees I now
              know are not normal.
            </p>
            <p>
              Nobody, in any of the rooms I had been in, had ever sat me down
              and said:{" "}
              <em className="text-wine">
                this is how compounding works, this is what a PRSA is, this is
                what you are paying for, this is what you can do about it
              </em>
              . Not a teacher, not a colleague, not a partner, not a friend.
              The closest I got was a Female Money Diaries article one Sunday
              morning. Then I went looking for the version of that for an
              immigrant woman in her forties in Ireland, and I could not find
              it. So I'm writing it.
            </p>
          </Prose>
        </div>
      </section>

      {/* The gap */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>What the data says</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            It's not just me.
          </DisplayHeading>
          <ProseLead className="mt-5">
            I started writing this from a personal place. The numbers below
            made it feel like a public one. All three are provisional until I
            cross-check them against primary sources for the first journal
            entry.
          </ProseLead>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <StatCard
              value="57%"
              label="of women in Europe invest"
              foot="vs 71% of men. BlackRock, 2023."
            />
            <StatCard
              value="26%"
              label="EU gender pension gap"
              foot="Roughly 28% in Ireland. Eurostat / EIGE, 2022 data."
            />
            <StatCard
              value="4"
              label="years later, on average"
              foot="When women start investing, vs men. BlackRock, 2023."
            />
          </div>

          <ProseLead className="mt-12">
            There's no clean published statistic on immigrant women
            specifically. What does exist: migrant households across the
            eurozone hold roughly half the median net wealth of native-born
            households (ECB Household Finance and Consumption Survey, 2021).
            Nobody is measuring my exact cohort carefully. That's part of why
            I'm writing this.
          </ProseLead>
        </div>
      </section>

      {/* What this site is */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>What this is</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Three things, one place.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Carefolio does three jobs. In this order.
          </ProseLead>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Pillar
              icon={<Receipt className="size-5" />}
              title="A diary"
              body="What I bought, what I sold, what it cost, what I read this week, what I got wrong. Personal first, useful second."
            />
            <Pillar
              icon={<BookOpen className="size-5" />}
              title="A research site"
              body="The gender investing gap, the immigrant women angle, the pension gap, the studies behind why this matters."
            />
            <Pillar
              icon={<Compass className="size-5" />}
              title="A practical guide"
              body="The brokers that work in Ireland and the EU, the wrappers, the taxes, the things I had to figure out the hard way."
            />
          </div>
        </div>
      </section>

      {/* What this is NOT */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>What this is not</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            A few things I want to be clear about.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              <strong className="text-ink">I am not a regulated financial adviser.</strong>{" "}
              Nothing on this site is investment advice for you. I am writing
              about what I do. You are not me, your tax situation is not mine,
              and I do not know what you should buy.
            </p>
            <p>
              <strong className="text-ink">Carefolio is not a robo-advisor or a brokerage.</strong>{" "}
              I do not hold money. I do not move money. I do not place trades on
              behalf of anyone. If you want a regulated firm to actually invest
              for you, the brokers page lists places that do exactly that.
            </p>
            <p>
              <strong className="text-ink">Past performance does not predict future returns.</strong>{" "}
              When I show what a portfolio would have done historically, that is
              a backtest. It is not a promise. It is barely an estimate. Markets
              are markets, and they are perfectly capable of doing the opposite
              of whatever I just published.
            </p>
          </Prose>
        </div>
      </section>

      {/* Who this is for */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Who this is for</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            If any of these sound like you.
          </DisplayHeading>
          <ul className="mt-8 space-y-3 text-base text-ink-soft sm:text-lg">
            <Bullet>
              You moved here from somewhere else, and the financial system
              reads like a foreign novel.
            </Bullet>
            <Bullet>
              You're starting after forty and you're tired of being told you
              should have started at twenty-two.
            </Bullet>
            <Bullet>
              You took a career break around children and the pension forecasts
              all assume you didn't.
            </Bullet>
            <Bullet>
              Your workplace pension default fund is charging more than 0.5% a
              year and nobody has ever explained why.
            </Bullet>
            <Bullet>
              You'd like to read about money in a tone that is neither
              patronising nor vaguely alarming, with the names of actual
              regulators in actual sentences.
            </Bullet>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <DisplayHeading level={2} size="lg" className="mt-5">
            One Sunday a week.
          </DisplayHeading>
          <ProseLead className="mt-5">
            A short journal entry every Sunday. What I did, what I learned,
            what I'm reading. No spam, no AI-generated nonsense, no "you
            should buy" anywhere on it.
          </ProseLead>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
              onClick={handleNewsletter}
            >
              <Mail className="size-4" />
              Join the Sunday letter
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-2 border-ink bg-transparent px-7 text-base font-medium text-ink hover:bg-cream"
              asChild
            >
              <a href="/journal">
                Read the journal
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ──────────────────────────────  Helpers  ──────────────────────────────── */

function StatCard({
  value,
  label,
  foot,
}: {
  value: string;
  label: string;
  foot: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-6">
        <div
          className="text-5xl text-wine sm:text-6xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
        <div className="mt-3 text-sm font-medium text-ink">{label}</div>
        <div className="mt-1.5 text-xs text-muted-warm">{foot}</div>
      </CardContent>
    </Card>
  );
}

function Pillar({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-6">
        <div className="inline-flex size-9 items-center justify-center rounded-lg bg-peach-soft text-wine">
          {icon}
        </div>
        <div
          className="mt-4 text-xl text-ink"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
          }}
        >
          {title}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{body}</p>
      </CardContent>
    </Card>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="mt-1 size-4 shrink-0 text-wine" />
      <span>{children}</span>
    </li>
  );
}
