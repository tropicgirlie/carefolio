// Company Data Types for Carefolio Care Index Global 100

export interface Company {
  id: string;
  symbol: string;
  name: string;
  sector: string;
  region: string;
  country: string;
  market_cap: string;
  employees: string;
  care_index: {
    score: number;
    band: 'A' | 'B' | 'C' | 'D' | 'E';
    trend: 'up' | 'down' | 'stable';
    trend_change: number;
  };
  harm_index: {
    score: number;
    factors: string[];
  };
  care_metrics: {
    parental_leave: {
      weeks: number;
      flexibility_score: number;
      coverage: string;
    };
    childcare_support: {
      score: number;
      programs: string[];
    };
    women_leadership: {
      score: number;
      percentage: number;
    };
    pay_equity: {
      score: number;
      certification: boolean;
    };
    family_benefits: {
      score: number;
      features: string[];
    };
  };
  story: {
    maternal_voice: string;
    investment_thesis: string;
    risk_factors: string[];
    care_innovations: string[];
  };
  financial: {
    revenue: string;
    growth_rate: number;
    esg_rating: string;
  };
  // NEW: Data source tracking
  data_sources?: {
    last_updated: string;
    financial_data_source?: string;
    esg_data_source?: string;
    care_metrics_source?: string;
    manual_overrides?: string[];
  };
  // NEW: Enhanced financial data
  enhanced_financial?: {
    market_cap_numeric: number;
    employees_numeric: number;
    revenue_numeric: number;
    currency: string;
    fiscal_year: string;
    last_price: number;
    pe_ratio?: number;
    dividend_yield?: number;
  };
}

// NEW: API Data Interfaces
export interface FinancialApiData {
  symbol: string;
  companyName: string;
  marketCap: number;
  employees?: number;
  revenue: number;
  peRatio?: number;
  dividendYield?: number;
  lastPrice: number;
  currency: string;
  fiscalYear: string;
}

export interface ESGApiData {
  symbol: string;
  esgScore: number;
  environmentScore: number;
  socialScore: number;
  governanceScore: number;
  esgRating: string;
  lastUpdated: string;
}

export interface CareMetricsApiData {
  symbol: string;
  parentalLeaveWeeks?: number;
  womenLeadershipPercentage?: number;
  payEquityScore?: number;
  childcareSupportScore?: number;
  familyBenefitsScore?: number;
  dataSource: string;
  lastUpdated: string;
}

// NEW: Company Data Template
export interface CompanyDataTemplate {
  basic_info: {
    name: string;
    symbol: string;
    sector: string;
    region: string;
    country: string;
  };
  api_mappings: {
    financial_api_symbol?: string;
    esg_api_symbol?: string;
    alternative_symbols?: string[];
  };
  manual_overrides: {
    care_metrics?: Partial<Company['care_metrics']>;
    story?: Partial<Company['story']>;
    harm_factors?: string[];
  };
}

export type CareBand = 'A' | 'B' | 'C' | 'D' | 'E';
export type TrendDirection = 'up' | 'down' | 'stable';
export type ESGRating = 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D';

// NEW: Data Source Types
export type DataSource = 'manual' | 'financial_api' | 'esg_api' | 'company_reports' | 'glassdoor' | 'linkedin';

// NEW: Company Update Status
export interface CompanyUpdateStatus {
  company_id: string;
  last_updated: string;
  data_completeness: number; // 0-100%
  missing_fields: string[];
  data_quality_score: number; // 0-100%
  needs_review: boolean;
  update_priority: 'high' | 'medium' | 'low';
}