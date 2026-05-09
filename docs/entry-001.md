# Entry 001: From dashboard to field notes

*How a Care Index dashboard became a working notebook for learning to invest in public.*

---

A short version, for anyone who lands here cold: Carefolio is now my public lab notebook for learning to invest. One Sunday entry a week. Sources cited. The brokers I would actually use. The screen I run companies through. The research that says my cohort is mostly missing from the data.

It got there in one day. Some of that day was useful, most of it was the work I do for a living, applied to a domain I am deliberately new to. I want to write down how it shifted, because I have already forgotten most of why we made each turn, and the rule of the site is that anything I cannot explain by Sunday is something I do not yet understand.

## I had a dashboard

The morning of, I had a working application called Care Index Dashboard. Emerald and purple. A bullseye logo. It tracked S&P 500 companies on a 0-to-100 score across sixteen signals: IVF coverage, paid maternity, women in leadership, equal pay audits, things like that. It was a real product with a real methodology.

The methodology was the strongest piece. I had spent the previous weeks turning it into a versioned package called `@luana/care-score`, with a SemVer policy and a public methodology PDF. Every signal had to be backed by a publicly verifiable document. Conservative by design. The kind of thing a journalist could cite.

So I pushed Care Index Dashboard to GitHub, at `tropicgirlie/carefolio`. Wrote a `vercel.json`. Wired up Beehiiv for the newsletter. Looked at the result.

It was a dashboard. It was the same kind of object as fifty other YC-funded SaaS products. The Care Score methodology was the only thing that distinguished it from those, and it was buried two clicks deep.

## False start: the simulator

The first pivot was wrong, but it taught me something. I tried to reframe the product as an AI-powered portfolio simulator. Pick a goal, see a shortlist of high-Care-Score companies, run a backtest, project twenty years out. There is a real product in that direction (it is broadly what Female Invest is doing in their UK arm), but it is also a regulated product. The line between *simulation* and *investment advice* is the line between "you can ship this from your kitchen table" and "you need a Central Bank of Ireland authorisation, which costs months and money."

I caught myself before writing too much of the wrong code. The product was wrong because the protagonist was wrong. The simulator framing made Carefolio the protagonist and me the operator. That is not the company I want to be running.

## The right answer

The reframe came from a sentence I have used in every product design role I have held: *writing in public is the cheapest way to find out what you actually understand.* I read a lot. Most of it falls out of my head within a week if I do not write it down. I have been notebooking my way through investing for months in private. The product was already there: it was the notebook.

So Carefolio became what it is now. A documented personal journey. An immigrant woman in her forties, in Dublin, learning to invest in public. Editorial publication first, research site second, practical guide third. The Care Score is no longer the product. It is my personal filter. The brokers page is no longer the product. It is the methods section of the lab.

That reframe also fixed the regulatory question. Documenting what I bought, in the past tense, in the first person, with sources, is not regulated activity in Ireland. The Central Bank of Ireland Consumer Protection Code 2025 has plenty to say about finfluencers; almost none of it touches a person who writes "I bought X on this date, here is what I read about it."

## The design moves that mattered

A few decisions worth recording, since they are the kind I will reach for again.

**The metaphor came from product design, not finance.** Once Carefolio was a working notebook, the four pages laid themselves out: `/journal` is the field notes, `/method` is the screening rules, `/brokers` is the methods section, `/research` is the literature review. Designers will recognise that structure. I picked it because it works.

**The visual language is editorial, not SaaS.** The default 2026 fintech look is what shadcn out-of-the-box gives you: neutral grays, blue accent, Inter, soft shadows, white cards on white. Perfectly adequate, perfectly forgettable. I went the other direction: warm cream backgrounds, deep wine accents, Fraunces serif on display headings, a peach pill, near-black buttons with white text. Closer to Female Invest meets Daye than to Linear. Every shadcn primitive (Button, Card, Table, Separator) still does the work underneath; the brand is the coat on top.

**The lab notebook is the product, not the dashboard.** The home page used to lead with a stocks ticker. I cut the ticker. It now leads with a manifesto and three pillar cards pointing at the journal, the research, and the brokers. The journal page itself is redesigned as a field notebook: monospace metadata for entry numbers and dates, Fraunces serif for titles, dotted hairlines between entries, a sidebar with "currently reading" and "open questions" so the page has presence even before the first entry lands.

**The infrastructure for monetisation is built but switched off.** Affiliate links to brokers can earn the site real money. They also require disclosure, both legally and ethically. So the `<BrokerLink>` component ships with affiliate URLs empty by default. When I want to flip that on, it is one environment variable and a few URLs, and the disclosure block at the top of `/brokers` rewrites itself automatically. None of the editorial selection of brokers is downstream of any commercial relationship.

**The numbers are flagged as provisional until I verify them.** I quote three statistics on the site: 57% of European women invest versus 71% of men (BlackRock, 2023), the EU gender pension gap of 26.1% (Eurostat, 2022 data), and women in Europe start investing four years later than men on average (BlackRock, 2023). All three are from credible primary sources. None has been cross-checked against the original PDF in this session. Every page that quotes them carries a *working draft* banner. This will be the first real research task in the journal.

## What is on the site right now

[carefolio.io](https://carefolio.io) is live. The newsletter is on Beehiiv. The methodology is open source on GitHub at `tropicgirlie/care-score`. The journal page (this page, ultimately) is hooked into this blog through the `carefolio` category. When this post goes live and the site rebuilds, it shows up at `carefolio.io/journal` as Entry 001.

## What I am working on next

A few things I want to write through, in roughly this order:

1. The PRSA comparison nobody walks you through. Davy plus an EU broker for non-pension money, versus a default workplace PRSA. The fee differential compounded over twenty-five years.
2. Verifying the three hero statistics against their primary PDFs, with the source links and exact data years recorded.
3. A first real screen pass: take the S&P 500, run the Care Score against publicly available benefits data, surface the top twenty companies. Build out the worksheet.
4. The brokers page deserves a deeper "how I picked these" entry. Why DEGIRO is on the shortlist for an Ireland-based starter. Why I would not be using Plus500 for any of this. Why Trade Republic is a frustrating gap for Irish residents.

If you are reading this from the Sunday letter, thank you. If you are reading it on the blog and you are not subscribed, the form is on every page on Carefolio. One Sunday entry a week. No spam, no AI-generated nonsense, no "you should buy" anywhere on it.
