// About page.
//
// Voice: senior product designer in Dublin, documenting her own learning
// in public. Confident, curious, reads a lot. The site is framed as a lab
// notebook: journal = field notes, method = screening rules, brokers =
// methods section, research = literature review. No 'nobody taught me'
// or self-pity register.
//
// Refactored to shadcn primitives + typography primitives + design tokens.

import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  PenLine,
  Compass,
  BookOpen,
  Beaker,
} from "lucide-react";
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
              I learn by{" "}
              <span className="italic text-wine">writing</span>{" "}
              things down.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              I'm Luana, a senior product designer in Dublin. This site is my
              lab notebook for learning to invest. Field notes from one woman
              doing the homework in public, with sources cited.
            </ProseLead>
          </motion.div>
        </div>
      </section>

      {/* Why the writing */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Why I write it down</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            A thing I cannot explain plainly is a thing I do not yet understand.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              I read a lot. Books, primary research, methodology PDFs, the
              occasional finance Twitter thread. Most of it falls out of my head
              within a week if I do not write it down. So I am writing it down
              here, where the discipline of writing for an audience keeps the
              thinking honest.
            </p>
            <p>
              That is the rule I learned in product design and applied to
              everything else: <em className="text-wine">writing in public is
              the cheapest way to find out what you actually understand.</em>{" "}
              The act of explaining is the act of learning. Carefolio is the
              long-form version of that practice, applied to a domain I am
              deliberately new to.
            </p>
            <p>
              I moved to Ireland years ago, and the financial system reads
              differently in a second language. The site documents that
              translation work too: PRSAs, AMRFs, BIK, USC, all the local
              acronyms that nobody bothers to spell out for a working immigrant.
              That is one bullet of why I write, not the headline.
            </p>
          </Prose>
        </div>
      </section>

      {/* The metaphor */}
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Eyebrow>How the site is laid out</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            A practitioner's working setup, in four pages.
          </DisplayHeading>
          <ProseLead className="mt-5 max-w-3xl">
            Designers will recognise the structure. I picked it because it
            works.
          </ProseLead>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Pillar
              icon={<PenLine className="size-5" />}
              label="/journal"
              title="Field notes"
              body="One entry a week. What I bought, what I read, what I changed my mind about. The lab notebook. Pulled from blog.luana.systems."
            />
            <Pillar
              icon={<Compass className="size-5" />}
              label="/method"
              title="Screening rules"
              body="The 16-signal Care Score, my filter for which companies are eligible to be in the portfolio. Versioned in public on GitHub."
            />
            <Pillar
              icon={<Beaker className="size-5" />}
              label="/brokers"
              title="Methods section"
              body="The specific platforms I would actually open an account with, the trade-offs, the things their marketing does not tell you."
            />
            <Pillar
              icon={<BookOpen className="size-5" />}
              label="/research"
              title="Literature review"
              body="The numbers behind why this matters: the gender investing gap, the pension gap, the data nobody is collecting on immigrant women."
            />
          </div>
        </div>
      </section>

      {/* What this is NOT */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>What this is not</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Three things I want to be clear about.
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
      <section className="border-y border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Who this is for</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            If any of these sound like you.
          </DisplayHeading>
          <ul className="mt-8 space-y-3 text-base text-ink-soft sm:text-lg">
            <Bullet>
              People who like reading other people's working notes.
            </Bullet>
            <Bullet>
              Late starters with high standards who do not want to be
              patronised.
            </Bullet>
            <Bullet>
              Designers and PMs who got curious about money and could not find
              a reading list that respected their time.
            </Bullet>
            <Bullet>
              Immigrants doing the translation work twice. Once for the
              language, once for the financial system.
            </Bullet>
            <Bullet>
              Anyone tired of personal-finance content that assumes the reader
              is an idiot.
            </Bullet>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <DisplayHeading level={2} size="lg" className="mt-5">
            One Sunday a week.
          </DisplayHeading>
          <ProseLead className="mt-5">
            A short field note every Sunday morning. What I did, what I read,
            what I changed my mind about. No spam, no AI-generated nonsense,
            no "you should buy" anywhere on it.
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
                Read the field notes
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

function Pillar({
  icon,
  label,
  title,
  body,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  body: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="inline-flex size-9 items-center justify-center rounded-lg bg-peach-soft text-wine">
            {icon}
          </div>
          <code
            className="rounded-md bg-cream px-2 py-0.5 text-xs text-wine"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {label}
          </code>
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
      <span
        className="mt-2.5 inline-block size-1.5 shrink-0 rounded-full bg-wine"
      />
      <span>{children}</span>
    </li>
  );
}
