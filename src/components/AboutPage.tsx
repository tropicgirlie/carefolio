// About page: the personal-journey story.
//
// Tone: honest, dry-witty, sources cited inline, no jargon. First-person
// past tense. The standing 'I am not a regulated financial adviser' line
// is required on every page that touches money — keep it visible.
//
// EDIT ME markers point at sentences you'll want to swap for your actual
// biography. Everything else is structural and can stay.

import { motion } from "motion/react";
import { ArrowRight, Mail, BookOpen, Compass, Receipt } from "lucide-react";

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
  const handleNewsletter = () => {
    window.open("https://carefolio.beehiiv.com/", "_blank");
  };

  return (
    <div style={{ backgroundColor: C.cream, color: C.ink }}>
      {/* ─────────  Hero  ─────────────────────────────────────────────── */}
      <section className="border-b" style={{ borderColor: C.border }}>
        <div className="mx-auto max-w-3xl px-6 pt-20 pb-20 sm:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Eyebrow>About</Eyebrow>
            <h1
              className="mt-5 text-3xl tracking-tight sm:text-5xl md:text-[3.5rem] md:leading-[1.05]"
              style={{
                fontFamily: SERIF,
                fontWeight: 500,
                letterSpacing: "-0.02em",
              }}
            >
              I'm{" "}
              <span className="italic" style={{ color: C.wine }}>
                Luana
              </span>
              . Forty-something, a woman in Dublin, and nobody ever taught me how to invest.
            </h1>
            <p className="mt-6 text-base sm:text-lg" style={{ color: C.inkSoft }}>
              So I'm learning in public, with receipts. An immigrant's journey to a
              private portfolio, written as I go. The journal, the research, and the
              practical guide I wish someone had handed me ten years ago.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─────────  My story  ────────────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>The story</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl tracking-tight" style={headingStyle()}>
            How I ended up writing this in my forties.
          </h2>
          <Prose>
            {/* EDIT ME — swap in your real opening line */}
            <p>
              I came to Ireland for work and stayed for the rain. I built a
              career in technology, raised a family, paid taxes in two countries,
              and through all of it never once thought hard about pensions.
              Pensions were something other people had — people with longer
              tenure, more stable plans, a different accent.
            </p>
            {/* EDIT ME — your specific motherhood / career interruption story */}
            <p>
              By the time I started looking, I was forty. I'd missed the easy
              decade, the one all the books are written for. I'd taken a career
              break around motherhood, like most women I know. The default
              workplace pension I had been paying into was charging fees I now
              know are not normal.
            </p>
            <p>
              Nobody, in any of the rooms I had been in, had ever sat me down and
              said: <em style={{ color: C.wine }}>this is how compounding works,
              this is what a PRSA is, this is what you are paying for, this is
              what you can do about it</em>. Not a teacher, not a colleague, not
              a partner, not a friend. The closest I got was a Female Money
              Diaries article one Sunday morning. Then I went looking for the
              version of that for an immigrant woman in her forties in Ireland,
              and I could not find it. So I'm writing it.
            </p>
          </Prose>
        </div>
      </section>

      {/* ─────────  The gap  ─────────────────────────────────────────── */}
      <section
        className="border-y"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>What the data says</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl tracking-tight" style={headingStyle()}>
            It's not just me.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            I started writing this from a personal place. The numbers below made
            it feel like a public one. All three are provisional until I cross-check
            them against primary sources for the first journal entry.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Stat
              value="57%"
              label="of women in Europe invest"
              foot="vs 71% of men. BlackRock, 2023."
            />
            <Stat
              value="26%"
              label="EU gender pension gap"
              foot="Roughly 28% in Ireland. Eurostat / EIGE, 2022 data."
            />
            <Stat
              value="4"
              label="years later, on average"
              foot="When women start investing, vs men. BlackRock, 2023."
            />
          </div>

          <p className="mt-12 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            There's no clean published statistic on immigrant women specifically.
            What does exist: migrant households across the eurozone hold roughly
            half the median net wealth of native-born households (ECB Household
            Finance and Consumption Survey, 2021). Nobody is measuring my exact
            cohort carefully. That's part of why I'm writing this.
          </p>
        </div>
      </section>

      {/* ─────────  What this site is  ──────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>What this is</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl tracking-tight" style={headingStyle()}>
            Three things, one place.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            Carefolio does three jobs. In this order.
          </p>

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

      {/* ─────────  What this is NOT  ───────────────────────────────── */}
      <section
        className="border-y"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>What this is not</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl tracking-tight" style={headingStyle()}>
            A few things I want to be clear about.
          </h2>
          <Prose>
            <p>
              <strong style={{ color: C.ink }}>I am not a regulated financial adviser.</strong>{" "}
              Nothing on this site is investment advice for you. I am writing
              about what I do. You are not me, your tax situation is not mine,
              and I do not know what you should buy.
            </p>
            <p>
              <strong style={{ color: C.ink }}>Carefolio is not a robo-advisor or a brokerage.</strong>{" "}
              I do not hold money. I do not move money. I do not place trades on
              behalf of anyone. If you want a regulated firm to actually invest
              for you, the brokers page lists places that do exactly that.
            </p>
            <p>
              <strong style={{ color: C.ink }}>Past performance does not predict future returns.</strong>{" "}
              When I show what a portfolio would have done historically, that is
              a backtest. It is not a promise. It is barely an estimate. Markets
              are markets, and they are perfectly capable of doing the opposite
              of whatever I just published.
            </p>
          </Prose>
        </div>
      </section>

      {/* ─────────  Who this is for  ────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-2xl px-6 py-20">
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl tracking-tight" style={headingStyle()}>
            If any of these sound like you.
          </h2>
          <ul className="mt-8 space-y-3 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            <Bullet>
              You moved here from somewhere else, and the financial system reads
              like a foreign novel.
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

      {/* ─────────  CTA  ────────────────────────────────────────────── */}
      <section
        className="border-t"
        style={{ backgroundColor: C.creamDeep, borderColor: C.border }}
      >
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Eyebrow>How to follow along</Eyebrow>
          <h2
            className="mt-5 text-3xl sm:text-5xl tracking-tight"
            style={headingStyle()}
          >
            One Sunday a week.
          </h2>
          <p className="mt-5 text-base sm:text-lg" style={{ color: C.inkSoft }}>
            A short journal entry every Sunday. What I did, what I learned, what
            I'm reading. No spam, no AI-generated nonsense, no "you should buy"
            anywhere on it.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={handleNewsletter}
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-opacity hover:opacity-90"
              style={{ backgroundColor: C.ink, color: "white" }}
            >
              <Mail className="size-4" />
              Join the Sunday letter
            </button>
            <a
              href="/journal"
              className="inline-flex h-12 items-center gap-2 rounded-full px-7 text-base font-medium transition-opacity hover:opacity-80"
              style={{
                color: C.ink,
                border: `1.5px solid ${C.ink}`,
              }}
            >
              Read the journal
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ────────────────────────  Internal helpers  ─────────────────────────── */

function headingStyle() {
  return {
    fontFamily: SERIF,
    fontWeight: 500,
    letterSpacing: "-0.02em",
    color: C.ink,
  } as const;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="text-xs font-medium uppercase"
      style={{ color: C.wine, letterSpacing: "0.18em" }}
    >
      {children}
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-7 space-y-5 text-base leading-[1.7] sm:text-lg"
      style={{ color: C.inkSoft }}
    >
      {children}
    </div>
  );
}

function Stat({
  value,
  label,
  foot,
}: {
  value: string;
  label: string;
  foot: string;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: "white", border: `1px solid ${C.border}` }}
    >
      <div
        className="text-5xl tracking-tight sm:text-6xl"
        style={{ fontFamily: SERIF, fontWeight: 500, color: C.wine }}
      >
        {value}
      </div>
      <div className="mt-3 text-sm font-medium" style={{ color: C.ink }}>
        {label}
      </div>
      <div className="mt-1.5 text-xs" style={{ color: C.muted }}>
        {foot}
      </div>
    </div>
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
    <div
      className="rounded-2xl p-6"
      style={{ backgroundColor: "white", border: `1px solid ${C.border}` }}
    >
      <div
        className="inline-flex size-9 items-center justify-center rounded-lg"
        style={{ backgroundColor: C.roseSoft, color: C.wine }}
      >
        {icon}
      </div>
      <div
        className="mt-4 text-xl"
        style={{
          fontFamily: SERIF,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          color: C.ink,
        }}
      >
        {title}
      </div>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>
        {body}
      </p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span
        className="mt-2 inline-block size-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: C.wine }}
      />
      <span>{children}</span>
    </li>
  );
}
