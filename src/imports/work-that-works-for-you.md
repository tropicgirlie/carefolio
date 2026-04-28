Build a web section/page called "Work That Works For You" for carefolio.io — a portfolio and career intelligence platform for women in tech.

---

CONTEXT & PURPOSE

This section helps women evaluate potential employers based on family-supportive policies — maternity/parental leave weeks, DEI commitments, fertility benefits, and remote flexibility. It's a research tool and a statement: the companies worth working for are the ones that designed for your whole life.

The tone is: intelligent, editorial, unapologetic. Not soft. Not corporate. Think The Economist meets a feminist design manifesto.

---

LAYOUT STRUCTURE

Page has three parts:

1. HERO HEADER (full-width)
- Title: "Work That Works For You"
- Subtitle: "The companies worth your expertise are the ones that designed for your whole life."
- A small contextual note: "Data compiled March 2026. Not investment advice. Verify policies before applying."
- Background: dark, textured — not black, something with depth (deep plum, forest, or near-black with subtle grain)

2. FILTER BAR (sticky, horizontal)
- Filter pills/chips: All | Tech | Enterprise Software | Media | Services
- Toggle: "Show stock data" (on/off)
- Small label: "Sort by: Leave weeks / DEI strength / Stock momentum"

3. DATA TABLE / CARD GRID (main content area)
- Two display modes: Table view and Card grid view (toggle button top-right)

TABLE COLUMNS:
- Company (logo placeholder + name + ticker)
- Sector
- Maternity/Parental Leave (weeks, bold number, colour-coded: green = 24+ weeks, amber = 16–23, red = under 16)
- Key Perks (tags: Fertility benefits / Remote-first / Equal paternity / Return-to-work support / Childcare stipend / Miscarriage leave)
- DEI Status (badge: Maintained / Strengthened / Rolled back — with colour coding)
- Stock Ticker + Approx. Price (greyed out when "Show stock data" is toggled off)
- 52-week range (sparkline or range bar)
- Honest Notes (short italicised editorial note, 1 line max)

DATA TO INCLUDE (pre-populate):

| Company | Ticker | Sector | Leave Weeks | Key Perks | DEI Status | Price | Note |
|---|---|---|---|---|---|---|---|
| Netflix | NFLX | Entertainment/Tech | 52 | Equal paternity, Flexible usage, Mental health days | Maintained | ~$97 | Most generous in the industry. Most take 4–8 months in practice. |
| Spotify | SPOT | Tech/Media | 24 | Childcare stipend, Remote-first, Parenting support | Maintained | ~$540 | Work From Anywhere. Swedish-culture roots. Eligible from day one. |
| Shopify | SHOP | Tech/E-commerce | 26 | Remote-first, Usable until child age 3 | Maintained | ~$97 | Can take leave any time until child's 3rd birthday. |
| Salesforce | CRM | Enterprise Software | 16–26 | Fertility benefits, Adoption aid, Ohana culture | Maintained | ~$199 | Policy varies by role and region. Confirm scope before applying. |
| Microsoft | MSFT | Tech/Cloud/AI | 20 | Gender pay audit (public), Equal paternity | Maintained | ~$404 | Non-birth parent gets 12 weeks. Consistent inclusion reporting. |
| Cisco | CSCO | Networking/AI Infra | 26+ | Day care support, Phased return, Mothers' rooms | Maintained | ~$75 | #1 Best Workplace for Parents (Fortune) every year since 2020. |
| Adobe | ADBE | Creative Software | 16 | Gender pay audit (public), PTO top score | Maintained | ~$387 | Solid but less generous than peers on leave duration. |
| NVIDIA | NVDA | Semiconductors | 22 | Concierge caregiver service, Return flex-time, Mothers' rooms | Maintained | ~$176 | Non-birth parent: 12 weeks + 8 weeks flex. Strong operational support. |
| Etsy | ETSY | E-commerce | 26 | All family structures included | Maintained | ~$55 | Explicit inclusion for all parenting arrangements. |
| KPMG | Private | Professional Services | 52 | Fertility leave, Miscarriage leave, Fertility appointments paid | Maintained | N/A | Matches Netflix. Private company — no stock data. Gold standard. |
| HPE | HPE | Tech Infrastructure | 26 | Flexible work, Inclusion programs | Maintained | ~$20 | Steady performer on policy; quieter on DEI communications. |

4. BOTTOM MODULE: ETF / INVESTOR VIEW
- Small sub-section titled "If You're Also Investing In Alignment"
- Cards for: SHE (SPDR MSCI USA Gender Diversity ETF), MSCI World Women's Leadership Index (not directly investable — label clearly), MWMN (Mackenzie Global Women's Leadership ETF, TSX)
- Each card: name, ticker, one-line description, note on recent performance
- Disclaimer bar at bottom: "This is not investment advice. Past performance does not predict future returns."

---

DESIGN DIRECTION

Aesthetic: editorial-dark, data-dense but breathable. Inspired by financial terminals with a feminist editorial overlay. Think: Bloomberg but designed by someone who reads Chimamanda and codes in Figma.

Colours:
- Background: near-black (#0f0e0d or deep plum)
- Primary accent: warm terracotta / deep coral (#C1604E or similar)
- Secondary: muted gold / warm cream for headings
- Data green: #4caf79 (good policy)
- Data amber: #d4a017 (moderate)
- Data red: #b84040 (weak)
- Text: off-white (#f5f0eb)

Typography:
- Heading: serif, editorial feel (Playfair Display, Cormorant, or similar)
- Body/data: clean mono or humanist sans (DM Mono or similar) for table data
- Labels/tags: all-caps, tracked, small

Components:
- Leave weeks: large bold number with coloured background chip
- Perk tags: pill-shaped, earthy tones, small
- DEI badge: coloured status indicator (dot + text)
- Stock price: subtle, secondary visual weight — not the star of the show
- Honest Notes column: italicised, slightly smaller, muted colour

HOVER STATE on each row/card: reveal a "View open roles" button (placeholder CTA) + expand perk tags

MOBILE: collapses to card stack with company name, leave weeks prominently displayed, perks as icon-only row

---

VOICE / MICROCOPY

Section intro paragraph (below hero title):
"Not all companies are equal when it counts. This isn't about perks as a recruitment gimmick — it's about whether the infrastructure was designed with your full life in mind. We track parental leave, fertility support, DEI commitments, and remote flexibility so you don't have to dig through HR FAQs to make an informed decision."

Empty state (if filter returns no results): "Nothing here matches your filters. That's actually useful data."

Footer note: "Policies change. DEI commitments get rolled back. Check current HR documentation and Glassdoor reviews before accepting an offer. Use this as a starting point, not a final answer."

---

OPTIONAL: Add a small "Submit a company" CTA at the bottom — ghost button, low visual weight. Label: "Know a company we should add? Submit it."