// Carefolio Care Index Constants

export const CARE_BANDS = {
  A: { label: 'A', range: '85-100', description: 'Nurture Excellence' },
  B: { label: 'B', range: '70-84', description: 'Strong Care' },
  C: { label: 'C', range: '55-69', description: 'Moderate Care' },
  D: { label: 'D', range: '40-54', description: 'Needs Nurturing' },
  E: { label: 'E', range: '<40', description: 'Critical Attention' }
} as const;

export const SECTORS = {
  Technology: 'Technology',
  Healthcare: 'Healthcare',
  FinancialServices: 'Financial Services',
  Financial: 'Financial Services',
  ConsumerGoods: 'Consumer Goods',
  Energy: 'Energy',
  Industrial: 'Industrial',
  Automotive: 'Automotive'
} as const;

export const REGIONS = {
  NorthAmerica: 'North America',
  Europe: 'Europe',
  AsiaPacific: 'Asia-Pacific',
  LatinAmerica: 'Latin America',
  Other: 'Other'
} as const;

export const COUNTRIES = {
  US: 'United States',
  UK: 'United Kingdom',
  Germany: 'Germany',
  France: 'France',
  Netherlands: 'Netherlands',
  Japan: 'Japan',
  SouthKorea: 'South Korea',
  Taiwan: 'Taiwan',
  Australia: 'Australia',
  Canada: 'Canada',
  Brazil: 'Brazil',
  Mexico: 'Mexico',
  SouthAfrica: 'South Africa',
  Israel: 'Israel'
} as const;

export const CARE_SCORE_DISTRIBUTION = {
  A_BAND: { min: 85, max: 100, percentage: 12 },
  B_BAND: { min: 70, max: 84, percentage: 38 },
  C_BAND: { min: 55, max: 69, percentage: 35 },
  D_BAND: { min: 40, max: 54, percentage: 13 },
  E_BAND: { min: 0, max: 39, percentage: 2 }
} as const;

export const GEOGRAPHIC_AVERAGES = {
  NORDIC: 80.1,
  US_TECH: 76.4,
  EU_HEALTHCARE_CONSUMER: 74.8,
  TRADITIONAL_INDUSTRIES: 61.2
} as const;

// NEW: API Configuration for External Data Sources
export const API_CONFIG = {
  financial: {
    alpha_vantage: {
      base_url: "https://www.alphavantage.co/query",
      api_key_param: "apikey",
      functions: {
        company_overview: "OVERVIEW",
        income_statement: "INCOME_STATEMENT",
        balance_sheet: "BALANCE_SHEET"
      }
    },
    yahoo_finance: {
      base_url: "https://query1.finance.yahoo.com/v8/finance/chart",
      endpoints: {
        quote: "/quote",
        financials: "/financials", 
        statistics: "/defaultKeyStatistics"
      }
    },
    polygon: {
      base_url: "https://api.polygon.io",
      endpoints: {
        ticker_details: "/v3/reference/tickers",
        financials: "/vX/reference/financials"
      }
    }
  },
  esg: {
    msci: {
      base_url: "https://api.msci.com/esg",
      endpoints: {
        ratings: "/ratings",
        scores: "/scores"
      }
    },
    sustainalytics: {
      base_url: "https://api.sustainalytics.com",
      endpoints: {
        esg_scores: "/esg-scores",
        company_data: "/company"
      }
    },
    refinitiv: {
      base_url: "https://api.refinitiv.com/data/environmental-social-governance",
      endpoints: {
        scores: "/v1/views/scores-full",
        company: "/v1/views/basic-company-data"
      }
    }
  },
  company_data: {
    clearbit: {
      base_url: "https://company.clearbit.com/v1/domains",
      endpoints: {
        find: "/find"
      }
    },
    glassdoor: {
      base_url: "https://api.glassdoor.com/api/api.htm",
      version: "1.1"
    },
    linkedin: {
      base_url: "https://api.linkedin.com/v2",
      endpoints: {
        organizations: "/organizations",
        people: "/people"
      }
    }
  }
} as const;

// NEW: Data Quality Thresholds and Requirements
export const DATA_QUALITY = {
  completeness: {
    excellent: 95,
    good: 85,
    fair: 70,
    poor: 50
  },
  freshness: {
    financial_data_days: 90,    // Financial data should be < 90 days old
    esg_data_days: 180,         // ESG data should be < 180 days old  
    care_metrics_days: 365      // Care metrics should be < 1 year old
  },
  required_fields: [
    "name",
    "symbol", 
    "sector",
    "market_cap",
    "care_index.score",
    "care_metrics.parental_leave.weeks",
    "care_metrics.women_leadership.percentage"
  ],
  optional_fields: [
    "enhanced_financial.pe_ratio",
    "care_metrics.pay_equity.certification",
    "story.maternal_voice",
    "enhanced_financial.dividend_yield"
  ],
  data_sources: {
    preferred: ["financial_api", "esg_api", "company_reports"],
    fallback: ["manual", "glassdoor", "linkedin"],
    avoid: ["social_media", "unverified_sources"]
  }
} as const;

// NEW: Care Index Calculation Weights
export const CARE_INDEX_WEIGHTS = {
  parental_leave: 0.25,        // 25% - Parental leave weeks and policies
  women_leadership: 0.20,      // 20% - Women in leadership positions
  pay_equity: 0.20,           // 20% - Pay equity and transparency
  childcare_support: 0.15,    // 15% - Childcare and family support
  family_benefits: 0.10,      // 10% - Additional family benefits
  esg_alignment: 0.10         // 10% - ESG score alignment
} as const;

// NEW: Symbol Mapping for Different Exchanges
export const SYMBOL_MAPPINGS = {
  "ERF.PA": {
    name: "Eurofins Scientific",
    yahoo_symbol: "ERF.PA",
    alpha_vantage_symbol: "ERF",
    bloomberg_symbol: "ERF:FP",
    reuters_symbol: "ERF.PA",
    exchange: "Euronext Paris",
    currency: "EUR"
  },
  // Add more mappings as needed
} as const;