// Broker shortlist for Carefolio /brokers page.
//
// All facts here are sourced from the Carefolio research brief (April 2026).
// Verify against primary sources before publishing major changes:
//  - BlackRock Women & Investing in Europe 2023
//  - Central Bank of Ireland Consumer Protection Code 2025
//  - Each broker's own fee schedule and regulatory page
//
// Affiliate URLs are intentionally empty. When monetisation is switched
// on (VITE_CAREFOLIO_AFFILIATES_ENABLED=true), fill these in and the
// BrokerLink component routes traffic through them automatically.

export type BrokerTier = "primary" | "ireland" | "uk" | "honourable" | "avoid";

export interface Broker {
  id: string;
  name: string;
  tier: BrokerTier;
  regulator: string;            // who licenses them, e.g. "BaFin (Germany)"
  passport: string;             // jurisdictional reach
  accountTypes: string[];       // ["General investment", "ISA", "PRSA"]
  pricing: string;              // one-line pricing summary
  bestFor: string;              // who this suits in one phrase
  watchOut: string;             // one thing the user should know
  url: string;                  // direct (always-works) URL
  affiliateUrl?: string;        // optional, leave empty until monetisation
}

export const BROKERS: Broker[] = [
  // ─── Primary shortlist (the six that matter for an Ireland-based reader)
  {
    id: "degiro",
    name: "DEGIRO",
    tier: "primary",
    regulator: "flatexDEGIRO Bank, BaFin (Germany)",
    passport: "MiFID II passported across EU including Ireland",
    accountTypes: ["General investment"],
    pricing: "Low flat fees per trade, ~€1 + FX for US stocks",
    bestFor: "DIY ETF buyer who wants the cheapest EU-regulated broker",
    watchOut:
      "No PRSA or ISA wrapper. Default Basic profile uses securities lending; switch to Custody profile if you want your shares held in your name.",
    url: "https://www.degiro.ie/",
  },
  {
    id: "lightyear",
    name: "Lightyear",
    tier: "primary",
    regulator: "Lightyear Europe AS, Estonian FSA",
    passport: "MiFID II passported across EU",
    accountTypes: ["General investment"],
    pricing: "0.1% per stock trade (capped at €1), 0% on ETFs in plan",
    bestFor: "New investor who wants a clean, modern app instead of a 2008 trading screen",
    watchOut: "Smaller instrument list than DEGIRO or Interactive Brokers",
    url: "https://lightyear.com/",
  },
  {
    id: "trading212",
    name: "Trading 212",
    tier: "primary",
    regulator: "Trading 212 Markets Ltd (CySEC) for EU clients; Trading 212 UK Ltd (FCA) for UK",
    passport: "Available to Irish residents via the CySEC entity",
    accountTypes: ["Invest", "ISA (UK only)"],
    pricing: "0% commission on stocks and ETFs, fractional shares",
    bestFor: "First-time investor putting in small monthly amounts",
    watchOut:
      "0.15% FX fee on non-EUR purchases. Stock-lending opt-out exists but is on by default. No ISA in Ireland (UK residents only).",
    url: "https://www.trading212.com/",
  },
  {
    id: "ibkr",
    name: "Interactive Brokers (IBIE)",
    tier: "primary",
    regulator: "Interactive Brokers Ireland Ltd (IBIE), Central Bank of Ireland",
    passport: "Native Irish authorisation",
    accountTypes: ["General", "Margin", "Multi-currency cash"],
    pricing: "Tiered or fixed pricing per trade, lowest spreads, FX at near-interbank rates",
    bestFor: "The grown-up tier. Where you graduate when DEGIRO or Trading 212 starts to feel limiting.",
    watchOut:
      "The interface is genuinely hostile to beginners. Built for professionals. Plan to spend an evening watching tutorials.",
    url: "https://www.interactivebrokers.ie/",
  },
  {
    id: "davy",
    name: "Davy Select",
    tier: "ireland",
    regulator: "J&E Davy (Bank of Ireland group), Central Bank of Ireland",
    passport: "Ireland",
    accountTypes: ["General", "PRSA", "Self-Directed Pension", "ARF"],
    pricing: "~0.75% custody plus dealing fees, more expensive than EU brokers",
    bestFor:
      "Irish residents who want a PRSA wrapper and are willing to pay for the local pension licence.",
    watchOut:
      "You are paying for the wrapper, not the broker. For non-pension money, an EU broker is cheaper.",
    url: "https://www.davyselect.ie/",
  },
  {
    id: "irish-life-prsa",
    name: "Zurich Life / Irish Life",
    tier: "ireland",
    regulator: "Central Bank of Ireland",
    passport: "Ireland",
    accountTypes: ["PRSA (Personal Retirement Savings Account)"],
    pricing: "Annual management charge typically 0.75% to 1.5% on default funds",
    bestFor:
      "The PRSA comparator most Irish women actually face through their employer. Worth knowing what you're being defaulted into.",
    watchOut:
      "Not a broker. A pension provider. Listed here because the realistic comparison is 'workplace PRSA default' versus 'low-cost EU broker plus a smaller PRSA top-up'.",
    url: "https://www.zurich.ie/pensions/personal-retirement-savings-account/",
  },

  // ─── UK-specific (mention only)
  {
    id: "vanguard-uk",
    name: "Vanguard UK",
    tier: "uk",
    regulator: "Vanguard Asset Management Ltd, FCA (UK)",
    passport: "UK residents only",
    accountTypes: ["General", "Stocks & Shares ISA", "Junior ISA", "SIPP"],
    pricing: "0.15% platform fee (capped at £375/year). Fund OCFs from 0.06%.",
    bestFor: "UK residents committed to long-term Vanguard index investing",
    watchOut: "Vanguard funds only. Not available outside the UK.",
    url: "https://www.vanguardinvestor.co.uk/",
  },
  {
    id: "pensionbee",
    name: "PensionBee",
    tier: "uk",
    regulator: "PensionBee Ltd, FCA (UK)",
    passport: "UK residents only",
    accountTypes: ["UK personal pension only"],
    pricing: "0.50% to 0.95% all-in",
    bestFor: "UK residents consolidating multiple old workplace pensions",
    watchOut: "Pension only. UK only.",
    url: "https://www.pensionbee.com/",
  },
  {
    id: "moneybox",
    name: "Moneybox",
    tier: "uk",
    regulator: "Moneybox Ltd, FCA (UK)",
    passport: "UK residents only",
    accountTypes: ["S&S ISA", "LISA", "Junior ISA", "SIPP", "GIA"],
    pricing: "£1/month subscription plus 0.45% platform fee",
    bestFor: "UK beginner who wants a friendlier app and a Lifetime ISA",
    watchOut: "On small balances, the £1/month is a heavy fee in percentage terms.",
    url: "https://www.moneyboxapp.com/",
  },

  // ─── Honourable mentions (factual, brief)
  {
    id: "saxo",
    name: "Saxo Bank",
    tier: "honourable",
    regulator: "Saxo Bank A/S, Danish FSA",
    passport: "MiFID II passported across EU",
    accountTypes: ["General", "ISA (UK)", "SIPP via partners (UK)"],
    pricing: "Tiered percentage per trade, lower at Platinum and VIP tiers",
    bestFor: "Active multi-asset trader, larger accounts",
    watchOut: "Custody fee on some tiers. Excellent research, premium pricing.",
    url: "https://www.home.saxo/",
  },
  {
    id: "etoro",
    name: "eToro",
    tier: "honourable",
    regulator: "eToro (Europe) Ltd, CySEC; eToro UK, FCA",
    passport: "EU and UK",
    accountTypes: ["General investment", "Copy trading"],
    pricing: "0% commission on stocks, 1% on crypto, spread on CFDs",
    bestFor: "Curious about copy trading or crypto on a single platform",
    watchOut:
      "CFD-heavy product surface and FX conversion fees on deposits. Easy to drift from investing into trading without noticing.",
    url: "https://www.etoro.com/",
  },
  {
    id: "xtb",
    name: "XTB",
    tier: "honourable",
    regulator: "XTB SA, KNF (Poland)",
    passport: "MiFID II passported",
    accountTypes: ["General investment"],
    pricing: "0% commission on stocks and ETFs up to €100k turnover per month, then 0.2% (min €10)",
    bestFor: "Low-cost ETF buying across EU markets",
    watchOut: "Above the €100k monthly turnover threshold the pricing changes.",
    url: "https://www.xtb.com/",
  },
  {
    id: "revolut-invest",
    name: "Revolut Invest",
    tier: "honourable",
    regulator: "Revolut Securities Europe UAB, Bank of Lithuania",
    passport: "EU; separate UK entity for UK clients",
    accountTypes: ["General investment"],
    pricing: "Tiered: one free trade per month on Standard, then 0.25% (min €1)",
    bestFor: "Existing Revolut users wanting fractional shares without a second app",
    watchOut: "Held via Revolut as nominee. Limited instrument universe.",
    url: "https://www.revolut.com/en-IE/investments/stocks/",
  },

  // ─── Actively avoid
  {
    id: "plus500",
    name: "Plus500",
    tier: "avoid",
    regulator: "Plus500CY (CySEC), Plus500UK (FCA)",
    passport: "EU and UK",
    accountTypes: ["CFDs only, not stock ownership"],
    pricing: "Spread-based",
    bestFor:
      "Speculative short-term trading, NOT long-term portfolio building. Listed here so readers don't confuse it with a stockbroker.",
    watchOut:
      "Mandated regulatory disclosure: 80% or more of retail CFD accounts lose money. CFDs are leveraged bets, not ownership of the underlying asset. Wrong tool for a journey-style portfolio.",
    url: "https://www.plus500.com/",
  },
];
