export interface DemoCompany {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  careScore: number;
  careBand: 'A' | 'B' | 'C' | 'D' | 'E';
  parentalLeave: number;
  womenLeadership: number;
  marketCap: string;
  country: string;
  isDemo?: boolean;
}

export const demoCompanies: DemoCompany[] = [
  {
    id: 'demo-aapl',
    name: 'Apple Inc.',
    symbol: 'AAPL',
    sector: 'Technology',
    careScore: 82,
    careBand: 'A',
    parentalLeave: 16,
    womenLeadership: 32,
    marketCap: '$2.8T',
    country: 'United States',
    isDemo: true
  },
  {
    id: 'demo-msft',
    name: 'Microsoft Corporation',
    symbol: 'MSFT',
    sector: 'Technology',
    careScore: 78,
    careBand: 'B',
    parentalLeave: 20,
    womenLeadership: 29,
    marketCap: '$2.5T',
    country: 'United States',
    isDemo: true
  },
  {
    id: 'demo-jnj',
    name: 'Johnson & Johnson',
    symbol: 'JNJ',
    sector: 'Healthcare',
    careScore: 85,
    careBand: 'A',
    parentalLeave: 17,
    womenLeadership: 45,
    marketCap: '$445B',
    country: 'United States',
    isDemo: true
  },
  {
    id: 'demo-pg',
    name: 'Procter & Gamble',
    symbol: 'PG',
    sector: 'Consumer Goods',
    careScore: 74,
    careBand: 'B',
    parentalLeave: 12,
    womenLeadership: 41,
    marketCap: '$385B',
    country: 'United States',
    isDemo: true
  },
  {
    id: 'demo-unilever',
    name: 'Unilever PLC',
    symbol: 'UL',
    sector: 'Consumer Goods',
    careScore: 79,
    careBand: 'B',
    parentalLeave: 18,
    womenLeadership: 52,
    marketCap: '$135B',
    country: 'United Kingdom',
    isDemo: true
  },
  {
    id: 'demo-nestle',
    name: 'Nestlé S.A.',
    symbol: 'NSRGY',
    sector: 'Consumer Goods',
    careScore: 71,
    careBand: 'C',
    parentalLeave: 14,
    womenLeadership: 38,
    marketCap: '$325B',
    country: 'Switzerland',
    isDemo: true
  }
];

export const globalIndexStats = {
  globalIndex2025: 77,
  averageCareScore: 74,
  topPerformers: demoCompanies.filter(c => c.careBand === 'A').length,
  totalCompanies: demoCompanies.length,
  sectorLeaders: [
    { sector: 'Healthcare', leader: 'Johnson & Johnson', score: 85 },
    { sector: 'Technology', leader: 'Apple Inc.', score: 82 },
    { sector: 'Consumer Goods', leader: 'Unilever PLC', score: 79 }
  ]
};

export const demoPortfolioStats = {
  totalHoldings: 6,
  averageScore: 78,
  distribution: {
    A: 2, // 33%
    B: 3, // 50%
    C: 1, // 17%
    D: 0,
    E: 0
  },
  sectorBreakdown: {
    'Technology': 2,
    'Healthcare': 1,
    'Consumer Goods': 3
  },
  regionBreakdown: {
    'United States': 4,
    'Europe': 2
  }
};

export const careMetricDefinitions = {
  parentalLeave: {
    name: 'Parental Leave',
    description: 'Weeks of paid parental leave offered',
    unit: 'weeks',
    benchmark: 16
  },
  womenLeadership: {
    name: 'Women Leadership',
    description: 'Percentage of women in leadership positions',
    unit: '%',
    benchmark: 40
  },
  careScore: {
    name: 'Care Score',
    description: 'Composite score of care investment practices',
    unit: 'points',
    benchmark: 75
  }
};

export const demoInsights = [
  {
    id: 'sector-leader',
    type: 'achievement',
    title: 'Healthcare Leading Care Investment',
    description: 'Your healthcare holdings show 15% higher care scores than sector average.',
    metric: '+15%',
    trend: 'positive'
  },
  {
    id: 'geographic-spread',
    type: 'optimization',
    title: 'Geographic Diversification Opportunity',
    description: 'Consider adding Nordic companies known for progressive care policies.',
    metric: '67% US',
    trend: 'neutral'
  },
  {
    id: 'resilience-premium',
    type: 'performance',
    title: 'Resilience Premium Detected',
    description: 'Your care-focused portfolio shows 8% lower volatility than market average.',
    metric: '-8% vol',
    trend: 'positive'
  }
];

// Demo user journey states
export const demoUserActions = [
  'first-visit',
  'onboarding-started',
  'focus-selected',
  'filters-applied',
  'first-save',
  'portfolio-created',
  'first-comparison',
  'report-viewed'
];

export const demoNotifications = [
  {
    id: 'welcome',
    type: 'info',
    title: 'Welcome to Carefolio!',
    message: 'Your demo portfolio is ready. Explore care investment insights.',
    timestamp: new Date().toISOString(),
    read: false
  },
  {
    id: 'market-update',
    type: 'market',
    title: 'Global Care Index Update',
    message: 'Q4 2024 scores are now available. See how your holdings performed.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: false
  }
];

// Helper functions for demo data
export const getDemoCompanyById = (id: string): DemoCompany | undefined => {
  return demoCompanies.find(company => company.id === id);
};

export const getDemoCompaniesByBand = (band: 'A' | 'B' | 'C' | 'D' | 'E'): DemoCompany[] => {
  return demoCompanies.filter(company => company.careBand === band);
};

export const getDemoCompaniesBySector = (sector: string): DemoCompany[] => {
  return demoCompanies.filter(company => company.sector === sector);
};

export const calculateDemoPortfolioMetrics = (selectedCompanies: string[]) => {
  const selected = demoCompanies.filter(c => selectedCompanies.includes(c.id));
  
  if (selected.length === 0) return null;

  const avgScore = Math.round(
    selected.reduce((sum, c) => sum + c.careScore, 0) / selected.length
  );

  const distribution = selected.reduce((acc, c) => {
    acc[c.careBand] = (acc[c.careBand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalHoldings: selected.length,
    averageScore: avgScore,
    distribution,
    vsGlobalIndex: avgScore - globalIndexStats.globalIndex2025,
    topPerformer: selected.sort((a, b) => b.careScore - a.careScore)[0]
  };
};