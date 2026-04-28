// Comprehensive Data Management System for Carefolio
// Handles API integration, data validation, and company updates

import { Company, FinancialApiData, ESGApiData, CareMetricsApiData, CompanyUpdateStatus, CompanyDataTemplate } from '../data/types';
import { DATA_QUALITY, CARE_INDEX_WEIGHTS, API_CONFIG, SYMBOL_MAPPINGS } from '../data/constants';

// =============================================================================
// CORE DATA UTILITIES
// =============================================================================

/**
 * Calculate Care Index Score from metrics
 */
export const calculateCareIndexScore = (metrics: Company['care_metrics'], esgScore?: number): number => {
  const weights = CARE_INDEX_WEIGHTS;
  
  // Normalize parental leave (max 52 weeks = 100 points)
  const parentalLeaveScore = Math.min((metrics.parental_leave.weeks / 52) * 100, 100);
  
  // Women leadership percentage is already 0-100
  const womenLeadershipScore = metrics.women_leadership.percentage;
  
  // Pay equity score is already 0-100
  const payEquityScore = metrics.pay_equity.score;
  
  // Childcare support score is already 0-100
  const childcareSupportScore = metrics.childcare_support.score;
  
  // Family benefits score is already 0-100
  const familyBenefitsScore = metrics.family_benefits.score;
  
  // ESG alignment (convert ESG rating to score if available)
  const esgAlignmentScore = esgScore || 75; // Default if no ESG score
  
  // Calculate weighted average
  const careScore = (
    parentalLeaveScore * weights.parental_leave +
    womenLeadershipScore * weights.women_leadership +
    payEquityScore * weights.pay_equity +
    childcareSupportScore * weights.childcare_support +
    familyBenefitsScore * weights.family_benefits +
    esgAlignmentScore * weights.esg_alignment
  );
  
  return Math.round(careScore);
};

/**
 * Determine care band from score
 */
export const determineCareBand = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'E';
};

/**
 * Check if data is fresh based on type
 */
export const isDataFresh = (lastUpdated: string, dataType: 'financial' | 'esg' | 'care_metrics'): boolean => {
  const thresholds = DATA_QUALITY.freshness;
  const lastUpdateDate = new Date(lastUpdated);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24));
  
  switch (dataType) {
    case 'financial':
      return daysDiff <= thresholds.financial_data_days;
    case 'esg':
      return daysDiff <= thresholds.esg_data_days;
    case 'care_metrics':
      return daysDiff <= thresholds.care_metrics_days;
    default:
      return false;
  }
};

/**
 * Calculate data completeness percentage
 */
export const calculateDataCompleteness = (company: Company): number => {
  const allFields = [...DATA_QUALITY.required_fields, ...DATA_QUALITY.optional_fields];
  let completedFields = 0;
  
  allFields.forEach(field => {
    const fieldParts = field.split('.');
    let current: any = company;
    let isComplete = true;
    
    for (const part of fieldParts) {
      if (current[part] === undefined || current[part] === null || current[part] === '') {
        isComplete = false;
        break;
      }
      current = current[part];
    }
    
    if (isComplete) completedFields++;
  });
  
  return Math.round((completedFields / allFields.length) * 100);
};

/**
 * Validate company data completeness
 */
export const validateCompanyData = (company: Company): { isValid: boolean; missingFields: string[] } => {
  const requiredFields = DATA_QUALITY.required_fields;
  const missingFields: string[] = [];
  
  requiredFields.forEach(field => {
    const fieldParts = field.split('.');
    let current: any = company;
    
    for (const part of fieldParts) {
      if (current[part] === undefined || current[part] === null) {
        missingFields.push(field);
        break;
      }
      current = current[part];
    }
  });
  
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

/**
 * Generate comprehensive update status for a company
 */
export const generateUpdateStatus = (company: Company): CompanyUpdateStatus => {
  const validation = validateCompanyData(company);
  const completeness = calculateDataCompleteness(company);
  
  // Check data freshness
  const lastUpdated = company.data_sources?.last_updated || '2024-01-01';
  const financialFresh = isDataFresh(lastUpdated, 'financial');
  const esgFresh = isDataFresh(lastUpdated, 'esg');
  const careFresh = isDataFresh(lastUpdated, 'care_metrics');
  
  // Calculate data quality score
  let qualityScore = completeness;
  if (!financialFresh) qualityScore -= 10;
  if (!esgFresh) qualityScore -= 5;
  if (!careFresh) qualityScore -= 5;
  
  // Determine update priority
  let priority: 'high' | 'medium' | 'low' = 'low';
  if (!validation.isValid || qualityScore < 70) priority = 'high';
  else if (qualityScore < 85 || !financialFresh) priority = 'medium';
  
  return {
    company_id: company.id,
    last_updated: lastUpdated,
    data_completeness: completeness,
    missing_fields: validation.missingFields,
    data_quality_score: Math.max(0, qualityScore),
    needs_review: !validation.isValid || qualityScore < 70,
    update_priority: priority
  };
};

// =============================================================================
// API INTEGRATION UTILITIES
// =============================================================================

/**
 * Mock API response generators for development/testing
 */
export const createMockFinancialData = (symbol: string, companyName: string): FinancialApiData => ({
  symbol,
  companyName,
  marketCap: Math.floor(Math.random() * 500 + 10) * 1000000000, // 10B-510B
  employees: Math.floor(Math.random() * 200000 + 10000), // 10k-210k employees
  revenue: Math.floor(Math.random() * 100 + 5) * 1000000000, // 5B-105B revenue
  peRatio: Math.round((Math.random() * 30 + 10) * 10) / 10, // 10-40 P/E
  dividendYield: Math.round((Math.random() * 5) * 100) / 100, // 0-5% dividend
  lastPrice: Math.round((Math.random() * 200 + 20) * 100) / 100, // $20-220
  currency: symbol.includes('.') ? 'EUR' : 'USD',
  fiscalYear: '2023'
});

export const createMockESGData = (symbol: string): ESGApiData => ({
  symbol,
  esgScore: Math.floor(Math.random() * 40 + 50), // 50-90 ESG score
  environmentScore: Math.floor(Math.random() * 40 + 50),
  socialScore: Math.floor(Math.random() * 40 + 50),
  governanceScore: Math.floor(Math.random() * 40 + 50),
  esgRating: ['A+', 'A', 'A-', 'B+', 'B', 'B-'][Math.floor(Math.random() * 6)],
  lastUpdated: new Date().toISOString()
});

export const createMockCareMetrics = (symbol: string): CareMetricsApiData => ({
  symbol,
  parentalLeaveWeeks: Math.floor(Math.random() * 40 + 12), // 12-52 weeks
  womenLeadershipPercentage: Math.floor(Math.random() * 50 + 20), // 20-70%
  payEquityScore: Math.floor(Math.random() * 30 + 70), // 70-100 score
  childcareSupportScore: Math.floor(Math.random() * 40 + 60), // 60-100 score
  familyBenefitsScore: Math.floor(Math.random() * 30 + 70), // 70-100 score
  dataSource: 'mock_api',
  lastUpdated: new Date().toISOString()
});

/**
 * Fetch financial data from API (with fallback to mock data)
 */
export const fetchFinancialData = async (symbol: string): Promise<FinancialApiData> => {
  // In production, this would make real API calls
  // For now, we return mock data with realistic delays
  
  console.log(`Fetching financial data for ${symbol}...`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  // Check if we have symbol mapping
  const mapping = SYMBOL_MAPPINGS[symbol as keyof typeof SYMBOL_MAPPINGS];
  const apiSymbol = mapping?.yahoo_symbol || symbol;
  
  try {
    // In real implementation, you would:
    // const response = await fetch(`${API_CONFIG.financial.yahoo_finance.base_url}/${apiSymbol}`);
    // const data = await response.json();
    // return processFinancialApiResponse(data);
    
    // For demo, return enhanced mock data
    const companyName = mapping?.name || `Company ${symbol}`;
    return createMockFinancialData(symbol, companyName);
    
  } catch (error) {
    console.error(`Error fetching financial data for ${symbol}:`, error);
    throw new Error(`Failed to fetch financial data for ${symbol}`);
  }
};

/**
 * Fetch ESG data from API (with fallback to mock data)
 */
export const fetchESGData = async (symbol: string): Promise<ESGApiData> => {
  console.log(`Fetching ESG data for ${symbol}...`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2000));
  
  try {
    // In real implementation:
    // const response = await fetch(`${API_CONFIG.esg.msci.base_url}/ratings?symbol=${symbol}`);
    // const data = await response.json();
    // return processESGApiResponse(data);
    
    return createMockESGData(symbol);
    
  } catch (error) {
    console.error(`Error fetching ESG data for ${symbol}:`, error);
    throw new Error(`Failed to fetch ESG data for ${symbol}`);
  }
};

/**
 * Fetch care metrics from various sources
 */
export const fetchCareMetrics = async (symbol: string): Promise<CareMetricsApiData> => {
  console.log(`Fetching care metrics for ${symbol}...`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
  
  try {
    // In real implementation, you would combine data from:
    // - Glassdoor API for employee benefits
    // - LinkedIn API for leadership diversity
    // - Company annual reports
    // - Government databases for parental leave policies
    
    return createMockCareMetrics(symbol);
    
  } catch (error) {
    console.error(`Error fetching care metrics for ${symbol}:`, error);
    throw new Error(`Failed to fetch care metrics for ${symbol}`);
  }
};

// =============================================================================
// COMPANY DATA MANAGEMENT
// =============================================================================

/**
 * Create a new company from template with API data
 */
export const createCompanyFromTemplate = async (template: CompanyDataTemplate): Promise<Company> => {
  const { basic_info, api_mappings, manual_overrides } = template;
  
  try {
    // Fetch data from APIs
    const [financialData, esgData, careMetricsData] = await Promise.all([
      fetchFinancialData(api_mappings.financial_api_symbol || basic_info.symbol),
      fetchESGData(api_mappings.esg_api_symbol || basic_info.symbol),
      fetchCareMetrics(basic_info.symbol)
    ]);
    
    // Build care metrics with API data and manual overrides
    const care_metrics: Company['care_metrics'] = {
      parental_leave: {
        weeks: careMetricsData.parentalLeaveWeeks || 12,
        flexibility_score: 75,
        coverage: manual_overrides.care_metrics?.parental_leave?.coverage || "Standard policy"
      },
      childcare_support: {
        score: careMetricsData.childcareSupportScore || 60,
        programs: manual_overrides.care_metrics?.childcare_support?.programs || ["Basic support"]
      },
      women_leadership: {
        score: careMetricsData.womenLeadershipPercentage || 30,
        percentage: careMetricsData.womenLeadershipPercentage || 30
      },
      pay_equity: {
        score: careMetricsData.payEquityScore || 70,
        certification: manual_overrides.care_metrics?.pay_equity?.certification || false
      },
      family_benefits: {
        score: careMetricsData.familyBenefitsScore || 70,
        features: manual_overrides.care_metrics?.family_benefits?.features || ["Standard benefits"]
      }
    };
    
    // Calculate care index score
    const careScore = calculateCareIndexScore(care_metrics, esgData.esgScore);
    
    // Create the complete company object
    const company: Company = {
      id: basic_info.symbol.toLowerCase().replace(/[^a-z0-9]/g, ''),
      symbol: basic_info.symbol,
      name: basic_info.name,
      sector: basic_info.sector,
      region: basic_info.region,
      country: basic_info.country,
      market_cap: `$${(financialData.marketCap / 1000000000).toFixed(1)}B`,
      employees: financialData.employees.toLocaleString(),
      care_index: {
        score: careScore,
        band: determineCareBand(careScore),
        trend: 'stable',
        trend_change: 0
      },
      harm_index: {
        score: Math.max(0, 100 - esgData.esgScore),
        factors: manual_overrides.harm_factors || ["Limited harm factors identified"]
      },
      care_metrics,
      story: {
        maternal_voice: manual_overrides.story?.maternal_voice || 
          `${basic_info.name} demonstrates commitment to family-friendly practices and sustainable business operations.`,
        investment_thesis: manual_overrides.story?.investment_thesis || 
          `Strong fundamentals with improving care infrastructure and ESG alignment.`,
        risk_factors: manual_overrides.story?.risk_factors || 
          ["Market volatility", "Regulatory changes", "Competition"],
        care_innovations: manual_overrides.story?.care_innovations || 
          ["Employee benefits", "Diversity initiatives", "Sustainability focus"]
      },
      financial: {
        revenue: `$${(financialData.revenue / 1000000000).toFixed(1)}B`,
        growth_rate: Math.round((Math.random() * 20 - 5) * 10) / 10, // -5% to 15%
        esg_rating: esgData.esgRating
      },
      data_sources: {
        last_updated: new Date().toISOString(),
        financial_data_source: 'mock_financial_api',
        esg_data_source: 'mock_esg_api', 
        care_metrics_source: 'mock_care_api',
        manual_overrides: ['story', 'harm_factors']
      },
      enhanced_financial: {
        market_cap_numeric: financialData.marketCap,
        employees_numeric: financialData.employees,
        revenue_numeric: financialData.revenue,
        currency: financialData.currency,
        fiscal_year: financialData.fiscalYear,
        last_price: financialData.lastPrice,
        pe_ratio: financialData.peRatio,
        dividend_yield: financialData.dividendYield
      }
    };
    
    return company;
    
  } catch (error) {
    console.error('Error creating company from template:', error);
    throw new Error(`Failed to create company data for ${basic_info.name}`);
  }
};

/**
 * Update existing company with fresh API data
 */
export const updateCompanyData = async (company: Company): Promise<Company> => {
  console.log(`Updating data for ${company.name}...`);
  
  try {
    // Fetch fresh data
    const [financialData, esgData, careMetricsData] = await Promise.all([
      fetchFinancialData(company.symbol),
      fetchESGData(company.symbol),
      fetchCareMetrics(company.symbol)
    ]);
    
    // Update financial data
    const updatedCompany: Company = {
      ...company,
      market_cap: `$${(financialData.marketCap / 1000000000).toFixed(1)}B`,
      employees: financialData.employees.toLocaleString(),
      financial: {
        ...company.financial,
        revenue: `$${(financialData.revenue / 1000000000).toFixed(1)}B`,
        esg_rating: esgData.esgRating
      },
      data_sources: {
        ...company.data_sources,
        last_updated: new Date().toISOString(),
        financial_data_source: 'mock_financial_api',
        esg_data_source: 'mock_esg_api',
        care_metrics_source: 'mock_care_api'
      },
      enhanced_financial: {
        market_cap_numeric: financialData.marketCap,
        employees_numeric: financialData.employees,
        revenue_numeric: financialData.revenue,
        currency: financialData.currency,
        fiscal_year: financialData.fiscalYear,
        last_price: financialData.lastPrice,
        pe_ratio: financialData.peRatio,
        dividend_yield: financialData.dividendYield
      }
    };
    
    // Recalculate care index if metrics changed
    const newCareScore = calculateCareIndexScore(updatedCompany.care_metrics, esgData.esgScore);
    updatedCompany.care_index.score = newCareScore;
    updatedCompany.care_index.band = determineCareBand(newCareScore);
    
    return updatedCompany;
    
  } catch (error) {
    console.error(`Error updating company data for ${company.name}:`, error);
    throw error;
  }
};

// =============================================================================
// EUROFINS TEMPLATE
// =============================================================================

/**
 * Comprehensive Eurofins data template
 */
export const EUROFINS_TEMPLATE: CompanyDataTemplate = {
  basic_info: {
    name: "Eurofins Scientific",
    symbol: "ERF.PA",
    sector: "Healthcare",
    region: "Europe", 
    country: "France"
  },
  api_mappings: {
    financial_api_symbol: "ERF.PA",
    esg_api_symbol: "ERF",
    alternative_symbols: ["ERFSF", "ERF:FP"]
  },
  manual_overrides: {
    care_metrics: {
      parental_leave: {
        coverage: "French statutory plus company enhancements"
      },
      childcare_support: {
        programs: ["Childcare assistance", "Family health programs", "Scientific education", "Flexible work arrangements"]
      },
      family_benefits: {
        features: ["Health and safety focus", "Scientific education support", "Global career opportunities", "Wellness programs"]
      }
    },
    story: {
      maternal_voice: "Eurofins protects families through rigorous testing that ensures food safety, water quality, and pharmaceutical integrity - the invisible guardians that keep our children safe every day.",
      investment_thesis: "Global laboratory testing leader with essential safety mission and growing demand for quality assurance",
      risk_factors: ["Regulatory complexity", "Laboratory capacity constraints", "Scientific talent competition", "Economic sensitivity"]
    },
    harm_factors: ["Laboratory testing complexity", "Scientific validation challenges", "Regulatory compliance requirements"]
  }
};

// =============================================================================
// BATCH OPERATIONS
// =============================================================================

/**
 * Update multiple companies in batch
 */
export const batchUpdateCompanies = async (companies: Company[]): Promise<{ updated: Company[], errors: string[] }> => {
  const updated: Company[] = [];
  const errors: string[] = [];
  
  // Process in batches to avoid rate limiting
  const batchSize = 5;
  for (let i = 0; i < companies.length; i += batchSize) {
    const batch = companies.slice(i, i + batchSize);
    
    const batchPromises = batch.map(async (company) => {
      try {
        const updatedCompany = await updateCompanyData(company);
        updated.push(updatedCompany);
      } catch (error) {
        errors.push(`${company.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
    
    await Promise.all(batchPromises);
    
    // Add delay between batches
    if (i + batchSize < companies.length) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  return { updated, errors };
};

/**
 * Get update recommendations for all companies
 */
export const getUpdateRecommendations = (companies: Company[]): CompanyUpdateStatus[] => {
  return companies
    .map(generateUpdateStatus)
    .sort((a, b) => {
      // Sort by priority (high -> medium -> low) then by quality score (lowest first)
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      if (priorityOrder[a.update_priority] !== priorityOrder[b.update_priority]) {
        return priorityOrder[b.update_priority] - priorityOrder[a.update_priority];
      }
      return a.data_quality_score - b.data_quality_score;
    });
};