# Carefolio

[Carefolio](https://www.carefolio.io) is an independent research index and public investing journal focused on the conditions that shape life around work. It combines company benefit research, a versioned Care Score, evidence-led company profiles, and practical investing notes.

Carefolio is the canonical source for company evidence, Care Score inputs, calculated scores, and publication status. [RemoteShe](https://www.remoteshe.co) consumes the published Carefolio data to add care context to job discovery.

## Live links

- [Carefolio website](https://www.carefolio.io)
- [Company evidence directory](https://www.carefolio.io/directory)
- [Care Score methodology](https://www.carefolio.io/methodology)
- [Corrections and evidence submissions](https://www.carefolio.io/corrections)
- [RemoteShe](https://www.remoteshe.co)
- [GitHub repository](https://github.com/tropicgirlie/carefolio)

## What is in this repository

- The public Carefolio website and company evidence directory.
- The 16-signal Care Score v1.1.0 formula.
- Country- and employer-scoped benefit evidence.
- Research provenance, review dates, and unresolved claims.
- The versioned JSON feed consumed by RemoteShe.
- Journal, methodology, governance, and correction pages.

## Care Score

The Care Score is a deterministic 0–100 calculation across 16 weighted signals:

- Reproductive and women's health
- Family and care
- Equity and transparency
- Health and wellbeing
- Learning and development

```text
Care Score = round(earned evidence-backed points / 100 × 100)
```

Evidence review may change the inputs, but it never manually overrides the calculated result.

Points are awarded only when a reviewed source supports the relevant employer, country, eligibility group, and benefit. A clearly labelled employee report may contribute points while awaiting policy verification, with its provenance displayed separately.

The following earn zero employer points:

- Unknown or unresolved claims
- Statutory entitlements without an employer-funded enhancement
- Generic wellbeing or inclusion language
- Customer-facing products and services
- Policies from a different country, subsidiary, or group entity
- Legacy values without reviewed evidence

Unknown means **not yet established**; it is not presented as proof that a benefit is unavailable.

## Research and publication

The scheduled research workflow checks up to six companies per run, prioritising unpublished records and missing evidence. It uses primary employer sources where possible, records unresolved questions, and waits 30 days before repeating an unsuccessful search unless new evidence appears.

A company enters the public directory only when:

1. Its identity and evidence scope have been reviewed.
2. Its calculated score is above zero.
3. Every awarded point has reviewed evidence.
4. Its publication status is verified.

Research updates are prepared locally. They are not published automatically: a reviewed commit and deployment are required.

Important data files:

- `src/data/company-research.json` — canonical evidence ledger and signal status
- `src/data/carefolio-companies.ts` — company catalogue and verified score inputs
- `docs/company-research-log.md` — dated research findings and unresolved claims
- `docs/company-research-queue.json` — generated unpublished research queue
- `public/carefolio-index-feed.json` — generated public integration feed

## RemoteShe synchronization

The deployed feed is available at:

```text
https://www.carefolio.io/carefolio-index-feed.json
```

The feed uses schema `carefolio-index-feed/v2` and includes:

- Published companies with their stable ID, score inputs, calculated score, evidence metadata, evidence status, and review date
- `pending_company_ids` for companies still under research or withdrawn from publication
- The compatible Care Score version

RemoteShe matches companies by stable ID, refreshes the feed on its regular cache and daily-worker cycles, and preserves RemoteShe-only job data. A published Carefolio record replaces RemoteShe's score-related fields. A pending or withdrawn ID clears the public score and is labelled **Research pending**; it must not revive a bundled legacy score.

A bundled snapshot is only a temporary feed-outage fallback. It must never override a newer valid Carefolio feed or a pending/withdrawn decision.

## Local development

```sh
npm install
npm run dev
```

The development server normally starts on `http://localhost:3000`.

For a production build, use:

```sh
npm run build
```

The build workflow synchronizes journal content, regenerates the Carefolio feed and sitemap, validates Care Scores, and then builds the Vite application. Running `npx vite build` directly skips the publishing prechecks.

## Validation

Run the complete Carefolio release checks before publishing evidence or score changes:

```sh
node scripts/generate-carefolio-feed.mjs
node scripts/generate-sitemap.mjs
npm run test:care-score
node scripts/check-company-research.mjs
npx vite build
```

When a change affects the feed contract or RemoteShe consumption, validate both repositories before release. The cross-project checks must prove that published score changes propagate, pending IDs suppress fallback scores, incompatible versions fail safely, and RemoteShe job data remains intact.

## Corrections

Benefit policies change and public sources can be incomplete. Employers, employees, and researchers can submit better evidence through the [Carefolio corrections process](https://www.carefolio.io/corrections) or email `evidence@carefolio.io`.

A submitted correction does not change a score until the evidence is reviewed against the versioned methodology.

## Disclaimer

Care Scores are research aids based on available evidence. They are not endorsements, guarantees of an individual employee's experience, or investment advice.

The original interface concept began in [Figma](https://www.figma.com/design/f36sFarI1tLvsKL3woPbLs/Care-Index-Dashboard) and has since evolved into the current evidence and publishing system.
