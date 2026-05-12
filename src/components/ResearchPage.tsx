// Research page: the data behind the journey.
//
// Editorial surface that compiles the gender investing gap, pension gap,
// and immigrant women angle into one place. Every figure is sourced. The
// "verify before publishing" callout at the top is intentional: numbers
// here came from research that did not have live web access, so the
// primary sources still need to be cross-checked before this page is
// promoted publicly.
//
// Built using shadcn primitives (Button, Card, Badge, Separator) on top
// of the codified design tokens. Reference implementation for the rest
// of the journey pages to refactor toward.

import { motion } from "motion/react";
import {
  ArrowRight,
  Mail,
  Info,
  ExternalLink,
  TrendingDown,
  Clock,
  BookOpen,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Eyebrow,
  DisplayHeading,
  Prose,
  ProseLead,
} from "./branding/typography";

const NEWSLETTER_URL = "https://carefolio.beehiiv.com/";

export function ResearchPage() {
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
            <Eyebrow>Research</Eyebrow>
            <DisplayHeading level={1} size="xl" className="mt-5">
              What the{" "}
              <span className="italic text-wine">data</span> says, and what it
              does not.
            </DisplayHeading>
            <ProseLead className="mt-6 max-w-3xl">
              The gender investing gap is real, the pension gap is wider, and
              the data on immigrant women specifically is mostly missing. Here
              is what is published, with sources, and where the holes still are.
            </ProseLead>
          </motion.div>
        </div>
      </section>

      {/* Verify callout */}
      <section className="border-b border-[#E8D8B6] bg-[#FAF1E0]">
        <div className="mx-auto flex max-w-3xl items-start gap-3 px-6 py-5 text-sm text-[#5C4715]">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            <strong>Working draft.</strong> Every figure on this page is from
            research published by the named source, but several were compiled
            without live access to the original PDFs. Treat each as a research
            pointer until the citation has been re-verified against the primary
            document.
          </p>
        </div>
      </section>

      {/* The investment gap */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>The investment gap</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Women in Europe invest less, and start later.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              In Europe, around 57 percent of women hold investments versus 71
              percent of men. That is a fourteen-point participation gap, and it
              has barely moved since the previous wave. The same study found
              that the average woman starts investing at 32, the average man at
              28. Four years of compounding, lost to whatever was in those four
              years (BlackRock, People &amp; Money: Women &amp; Investing in
              Europe, 2023).
            </p>
            <p>
              Ireland-specific: the Bank of Ireland Financial Wellbeing Index
              (2023) puts the figure at 39 percent of Irish women holding
              investments outside their pension, versus 54 percent of Irish men.
            </p>
          </Prose>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <StatCard
              icon={<TrendingDown className="size-5" />}
              value="14 pts"
              label="Investment participation gap, Europe"
              source="BlackRock, 2023"
            />
            <StatCard
              icon={<Clock className="size-5" />}
              value="4 years"
              label="Average lag between when men and women start investing"
              source="BlackRock, 2023"
            />
          </div>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* The pension gap */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>The pension gap</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            The wider problem nobody talks about over coffee.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              The EU gender pension gap was 26.1 percent in 2022 (Eurostat
              indicator ILC_PNP13, EIGE Gender Equality Index 2024). That is the
              percentage less in retirement income that women receive on average
              compared to men. Ireland sits slightly worse than the EU average,
              at around 27 to 28 percent. The UK figure is materially larger,
              at roughly 35 percent of private pension wealth (PPI, 2024).
            </p>
            <p>
              The drivers are well-rehearsed: lower lifetime earnings, career
              breaks around children, more part-time work, more care
              responsibilities for elderly parents, and pension systems that
              were not designed for any of the above. Nothing here is a
              surprise. None of it is moving fast.
            </p>
          </Prose>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <StatCard value="26.1%" label="EU pension gap" source="Eurostat, 2022 data" />
            <StatCard value="~28%" label="Ireland pension gap" source="Eurostat, 2022 data" />
            <StatCard value="~35%" label="UK private pension wealth gap" source="PPI, 2024" />
          </div>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* Financial literacy gap */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Financial literacy</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            It is not that women understand less. It is that fewer of us are
            asked.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              The OECD/INFE 2023 International Survey of Adult Financial
              Literacy reports a small but persistent gender gap in the
              combined knowledge, behaviour, and attitude score: men averaged
              63 out of 100, women 60. The knowledge sub-score was wider, at
              roughly 5.4 out of 7 for men versus 4.9 for women. The older S&amp;P
              Global FinLit Survey, the one cited everywhere despite being
              from 2014, put global financial literacy at 35 percent of men
              and 30 percent of women. Treat that figure as historical.
            </p>
            <p>
              The behavioural finding that matters more, in my reading, is not
              that women know less. It is that women report lower confidence
              even when they score the same as men. Confidence dropped at
              twenty-two does not come back at forty without intervention.
            </p>
          </Prose>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* Immigrant women */}
      <section className="bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Immigrant women</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            The data nobody is collecting carefully.
          </DisplayHeading>
          <Prose className="mt-7">
            <p>
              There is no systematic, EU-wide statistic on foreign-born
              women's investment account ownership. None of the major
              published datasets, including BlackRock, Female Invest's
              annual report, and the ECB Household Finance and Consumption
              Survey, break down by migrant status and gender simultaneously.
            </p>
            <p>
              The closest available proxies are: Eurostat Labour Force Survey
              (2023) putting non-EU-born women's employment rate in the EU at
              55.5 percent versus 73.5 percent for native-born women. The ECB
              HFCS (2021 wave) showing migrant households across the eurozone
              hold roughly half the median net wealth of native-born
              households. Both numbers gesture at the gap. Neither is a clean
              statistic on the question we actually want to answer.
            </p>
            <p>
              That absence is itself a finding. If you cannot find numbers on
              your cohort, you are probably under-served by everything that
              is built using those numbers.
            </p>
          </Prose>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* Values and returns */}
      <section id="values-and-returns">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Values and returns</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Does caring about diversity cost you returns?
          </DisplayHeading>
          <ProseLead className="mt-5">
            The short answer is no, mostly, with caveats. Six bodies of work
            below. Effect sizes are modest, the causal direction is debated,
            but the case that values-aligned investing systematically loses
            money is not supported by the evidence.
          </ProseLead>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <StatCard
              value="+25%"
              label="more likely to outperform peers on EBIT"
              source="McKinsey, Diversity Matters Even More, 2023. Top-quartile gender diversity vs bottom quartile, 1,265 companies, 23 countries."
            />
            <StatCard
              value="+3.1 pts"
              label="annual stock returns, 20%+ women in management"
              source="Credit Suisse Gender 3000, 2021. ~3,000 companies tracked globally."
            />
            <StatCard
              value="+15%"
              label="higher net margin, 30%+ female executives"
              source="Peterson Institute for International Economics, Noland et al., 2016. 21,980 firms, 91 countries."
            />
            <StatCard
              value="+19%"
              label="higher innovation revenue, above-average leadership diversity"
              source="BCG, How Diverse Leadership Teams Boost Innovation, 2018."
            />
          </div>

          <Prose className="mt-12">
            <H3>The full evidence base</H3>
            <p>
              <strong className="text-ink">McKinsey, Diversity Matters series (2015, 2018, 2020, 2023).</strong>{" "}
              Across four waves over a decade, top-quartile gender diversity on
              executive teams has correlated with EBIT outperformance against
              bottom-quartile peers. The 2023 wave found the gap had widened.
              The series is the most-cited in this literature, and the one with
              the most replication scrutiny.
            </p>
            <p>
              <strong className="text-ink">Credit Suisse, Gender 3000 (annual since 2014).</strong>{" "}
              Tracks roughly 3,000 listed companies globally. Companies with
              20%+ women in management have outperformed their lower-diversity
              peers on average return on equity and average annual share price
              return. The 2021 edition reported a 3.1 percentage point
              annualised stock return premium.
            </p>
            <p>
              <strong className="text-ink">Peterson Institute, Noland and Moran (2016).</strong>{" "}
              The largest single-paper sample in this literature: 21,980
              companies across 91 countries. Firms with 30%+ female executives
              showed 15% higher net margin compared to firms with no women in
              senior leadership.
            </p>
            <p>
              <strong className="text-ink">Goldman Sachs, Womenomics (2005 onwards).</strong>{" "}
              Original 2005 paper plus several updates. Notable finding: US
              IPOs with all-male boards have systematically underperformed
              those with at least one woman, over rolling 3-year windows. The
              effect has persisted across updates.
            </p>
            <p>
              <strong className="text-ink">BCG, How Diverse Leadership Teams Boost Innovation (2018).</strong>{" "}
              Companies with above-average diversity in leadership reported 19%
              higher innovation revenue. The mechanism is plausible (more
              perspectives in the room produce more product ideas) but harder
              to attribute cleanly than headline financials.
            </p>
            <p>
              <strong className="text-ink">Bloomberg Gender-Equality Index (GEI).</strong>{" "}
              An index of 400+ public companies that pass criteria on pay,
              leadership representation, recruiting, retention, and sexual
              harassment policy. Over its lifetime the GEI has approximately
              tracked the MSCI ACWI: no systematic return penalty for the
              inclusion screen, no dramatic outperformance either.
            </p>

            <H3>What the literature does not say</H3>
            <p>
              Three caveats that any honest reading has to include.
            </p>
            <p>
              <strong className="text-ink">The McKinsey series has been challenged on replication.</strong>{" "}
              Green and Hand (Tel Aviv University, 2021) attempted to reproduce
              the findings on the same dataset and could not. Their critique
              focuses on methodology around the EBIT outperformance metric.
              Treat the 25% figure as suggestive rather than definitive.
            </p>
            <p>
              <strong className="text-ink">Correlation is not causation.</strong>{" "}
              The most plausible alternative explanation is that companies
              that already perform well (better governance, more resources,
              better culture) both attract more diverse leadership and produce
              better financials. Diversity might be a marker of those
              underlying qualities rather than the engine.
            </p>
            <p>
              <strong className="text-ink">Effect sizes are bigger for innovation, retention, and recruiting than for stock returns.</strong>{" "}
              The financial-returns channel is real but modest, and harder to
              attribute. The operational channels (lower turnover, faster
              recruiting, more innovation) are better-documented and matter
              more to the long-term health of the business than to next year's
              share price.
            </p>

            <H3>The honest synthesis</H3>
            <p>
              Values-aligned investing does not appear to cost you on average,
              and may help on the margin. The effect sizes are modest. The
              causal direction is debated. The case for the Care Score is
              primarily about owning what you would want to own, with the
              additional finding that the data does not punish you for the
              preference.
            </p>
            <p>
              That asymmetry is why I run the screen. If the evidence said
              "values investing reliably costs you two percentage points a
              year," that would be a more interesting trade-off to argue with
              yourself about. It does not say that. The penalty story is
              mostly wrong.
            </p>
          </Prose>
        </div>
      </section>

      <Separator className="bg-border-warm" />

      {/* Sources */}
      <section>
        <div className="mx-auto max-w-3xl px-6 py-20">
          <Eyebrow>Sources</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Read the originals.
          </DisplayHeading>
          <ProseLead className="mt-5">
            Every figure above traces back to one of these. Where the
            organisation makes the report freely downloadable, the link is
            direct. Where it sits behind a press summary, follow the link to
            the press page and click through.
          </ProseLead>

          <div className="mt-10 space-y-4">
            <SourceCard
              name="BlackRock"
              report="People &amp; Money / Women &amp; Investing in Europe, 2023"
              href="https://www.blackrock.com/corporate"
              note="The 57 percent / 71 percent participation figure and the four-year start-age gap. Verify wave year before quoting."
            />
            <SourceCard
              name="Eurostat"
              report="Gender pension gap indicator (ILC_PNP13)"
              href="https://ec.europa.eu/eurostat"
              note="Annual data going back to 2010. Latest published year is 2022. Filter to Ireland for the 28 percent figure."
            />
            <SourceCard
              name="EIGE"
              report="Gender Equality Index 2024, Money domain"
              href="https://eige.europa.eu/gender-equality-index"
              note="Aggregates Eurostat plus EU-SILC into a single accessible dashboard."
            />
            <SourceCard
              name="OECD/INFE"
              report="International Survey of Adult Financial Literacy 2023"
              href="https://www.oecd.org/finance/financial-education"
              note="Updated triennial. Covers participating OECD countries. Knowledge, behaviour, and attitude sub-scores broken out."
            />
            <SourceCard
              name="ECB"
              report="Household Finance and Consumption Survey, 2021 wave"
              href="https://www.ecb.europa.eu/pub/economic-research/research-networks/html/researcher_hfcn.en.html"
              note="The richest source on eurozone wealth by household type. Migrant household wealth gap comes from this dataset."
            />
            <SourceCard
              name="Bank of Ireland"
              report="Financial Wellbeing Index 2023"
              href="https://www.bankofireland.com"
              note="Ireland-specific gender split on investment ownership."
            />
            <SourceCard
              name="Pensions Policy Institute / Now:Pensions"
              report="UK Gender Pensions Gap Report 2024"
              href="https://www.pensionspolicyinstitute.org.uk"
              note="The cleanest source for UK figures, updated annually."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border-warm bg-cream-deep">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <Eyebrow>Where this lives in practice</Eyebrow>
          <DisplayHeading level={2} size="md" className="mt-5">
            Numbers are background. The journal is the foreground.
          </DisplayHeading>
          <ProseLead className="mt-5">
            The research above is what makes this site more than one woman's
            preferences. The journal is where it gets put to work, week by
            week, in actual decisions.
          </ProseLead>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-full bg-ink px-7 text-base font-medium text-white hover:bg-black"
              onClick={() => window.open(NEWSLETTER_URL, "_blank")}
            >
              <Mail className="size-4" />
              Sunday letter
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

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="mt-10 text-xl text-ink sm:text-2xl"
      style={{
        fontFamily: "var(--font-display)",
        fontWeight: 600,
        letterSpacing: "-0.015em",
      }}
    >
      {children}
    </h3>
  );
}

function StatCard({
  icon,
  value,
  label,
  source,
}: {
  icon?: React.ReactNode;
  value: string;
  label: string;
  source: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-6">
        {icon ? (
          <div className="inline-flex size-9 items-center justify-center rounded-lg bg-peach-soft text-wine">
            {icon}
          </div>
        ) : null}
        <div
          className="mt-3 text-4xl text-wine sm:text-5xl"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          {value}
        </div>
        <div className="mt-2 text-sm font-medium text-ink">{label}</div>
        <div className="mt-1 text-xs text-muted-warm">{source}</div>
      </CardContent>
    </Card>
  );
}

function SourceCard({
  name,
  report,
  href,
  note,
}: {
  name: string;
  report: string;
  href: string;
  note: string;
}) {
  return (
    <Card className="border-border-warm bg-white">
      <CardContent className="px-6 py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <div
            className="text-base font-medium text-ink sm:text-lg"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </div>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-wine hover:underline"
          >
            Open
            <ExternalLink className="size-3.5" />
          </a>
        </div>
        <div
          className="mt-1 text-sm text-ink-soft"
          dangerouslySetInnerHTML={{ __html: report }}
        />
        <div className="mt-3 flex items-start gap-2 text-sm text-ink-soft">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-wine" />
          <span>{note}</span>
        </div>
      </CardContent>
    </Card>
  );
}
