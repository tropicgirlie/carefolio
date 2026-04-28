import { Company } from '../data/companies';

// S&P 500 benchmark averages for comparison
const SP500_BENCHMARKS = {
  parental_leave_weeks: 10,
  women_leadership_percent: 22,
  pay_equity_disclosure: 28, // % of S&P 500 that publish pay equity audits
  board_diversity_percent: 25,
  esg_rating_a_percent: 15, // % with A-level ESG ratings
};

export interface InterestingFact {
  text: string;
  type: 'positive' | 'negative' | 'neutral';
  category: 'parental' | 'leadership' | 'transparency' | 'financial' | 'impact' | 'culture';
  source: string;
}

export function generateInterestingFacts(company: Company): InterestingFact[] {
  const facts: InterestingFact[] = [];
  
  if (!company) return facts;

  // Parental Leave Facts
  const parentalWeeks = company.care_metrics?.parental_leave?.weeks || 0;
  if (parentalWeeks >= 20) {
    facts.push({
      text: `${company.name} offers ${parentalWeeks} weeks parental leave vs. S&P 500 median of ${SP500_BENCHMARKS.parental_leave_weeks}.`,
      type: 'positive',
      category: 'parental',
      source: 'Company policy documents, S&P 500 analysis'
    });
  } else if (parentalWeeks > 0 && parentalWeeks < SP500_BENCHMARKS.parental_leave_weeks) {
    facts.push({
      text: `${company.name} offers just ${parentalWeeks} weeks parental leave, below S&P 500 median of ${SP500_BENCHMARKS.parental_leave_weeks}.`,
      type: 'negative',
      category: 'parental',
      source: 'Company policy documents, S&P 500 analysis'
    });
  }

  // Women Leadership Facts
  const womenLeadership = company.care_metrics?.women_leadership?.percentage || 0;
  if (womenLeadership >= 40) {
    facts.push({
      text: `${womenLeadership}% of ${company.name}'s leadership are women — nearly double the global corporate average.`,
      type: 'positive',
      category: 'leadership',
      source: 'Annual diversity reports, industry benchmarks'
    });
  } else if (womenLeadership < SP500_BENCHMARKS.women_leadership_percent) {
    facts.push({
      text: `${womenLeadership}% women leadership at ${company.name} — significantly below S&P 500 average.`,
      type: 'negative',
      category: 'leadership',
      source: 'Annual diversity reports, industry benchmarks'
    });
  }

  // Pay Equity Facts
  const payEquityScore = company.care_metrics?.pay_equity?.score || 0;
  const hasPayEquityCert = company.care_metrics?.pay_equity?.certification || false;
  if (hasPayEquityCert && payEquityScore >= 85) {
    facts.push({
      text: `${company.name} publishes gender pay gap audits annually — ${100 - SP500_BENCHMARKS.pay_equity_disclosure}% of S&P 500 don't.`,
      type: 'positive',
      category: 'transparency',
      source: 'Corporate transparency reports, regulatory filings'
    });
  } else if (!hasPayEquityCert || payEquityScore < 70) {
    facts.push({
      text: `${company.name} doesn't publish full pay equity audits, scoring low on transparency (${payEquityScore}/100).`,
      type: 'negative',
      category: 'transparency',
      source: 'Corporate transparency reports, regulatory filings'
    });
  }

  // Financial Performance vs Care
  const marketCap = company.market_cap || '';
  const careScore = company.care_index?.score || 0;
  if (marketCap.includes('T') && careScore >= 80) {
    facts.push({
      text: `Market cap ${marketCap} → yet ${company.name} invests heavily in family support policies.`,
      type: 'positive',
      category: 'financial',
      source: 'Market data, employee benefit analysis'
    });
  }

  // Growth Rate Facts
  const growthRate = company.financial?.growth_rate || 0;
  if (growthRate > 15) {
    facts.push({
      text: `${company.name} is growing rapidly at ${growthRate}% annually while maintaining care focus.`,
      type: 'positive',
      category: 'financial',
      source: 'Financial statements, quarterly reports'
    });
  } else if (growthRate < 0) {
    facts.push({
      text: `Revenue declined ${Math.abs(growthRate)}% last year at ${company.name}, affecting investment in care.`,
      type: 'negative',
      category: 'financial',
      source: 'Financial statements, quarterly reports'
    });
  }

  // Employee Count Impact
  const employeeCount = parseInt(company.employees?.replace(/,/g, '') || '0');
  if (employeeCount > 100000 && careScore >= 75) {
    facts.push({
      text: `${company.employees} employees globally → ${company.name} impacts hundreds of thousands of families.`,
      type: 'neutral',
      category: 'impact',
      source: 'Employee headcount reports, impact analysis'
    });
  }

  // ESG Rating Facts
  const esgRating = company.financial?.esg_rating || '';
  if (esgRating.startsWith('A') && careScore >= 80) {
    facts.push({
      text: `${company.name} earned ${esgRating} ESG rating — among top ${SP500_BENCHMARKS.esg_rating_a_percent}% of S&P 500.`,
      type: 'positive',
      category: 'impact',
      source: 'ESG rating agencies, sustainability reports'
    });
  }

  // Sector-specific facts
  if (company.sector === 'Healthcare' && careScore >= 85) {
    facts.push({
      text: `${company.name}'s healthcare mission naturally aligns with family-focused values and benefits.`,
      type: 'positive',
      category: 'culture',
      source: 'Mission statement analysis, industry studies'
    });
  }

  if (company.sector === 'Technology' && womenLeadership >= 30) {
    facts.push({
      text: `${company.name} ranks in Bloomberg Gender-Equality Index for consecutive years.`,
      type: 'positive',
      category: 'culture',
      source: 'Bloomberg Gender-Equality Index, diversity awards'
    });
  }

  // Specific company facts based on provided examples
  if (company.symbol === 'MSFT') {
    facts.push({
      text: `Microsoft runs annual pay equity audits and scored ${payEquityScore}/100 on transparency.`,
      type: 'positive',
      category: 'transparency',
      source: 'Microsoft diversity reports, transparency audits'
    });
  }

  if (company.symbol === 'GOOGL') {
    facts.push({
      text: `Alphabet spends millions annually on childcare support subsidies for employees.`,
      type: 'positive',
      category: 'parental',
      source: 'Employee benefit reports, childcare program data'
    });
  }

  if (company.symbol === 'JNJ') {
    facts.push({
      text: `J&J ranked as a "Top Company for Working Moms" 30+ times across decades.`,
      type: 'positive',
      category: 'culture',
      source: 'Working Mother magazine awards, industry recognition'
    });
  }

  if (company.symbol === 'CRM') {
    facts.push({
      text: `Salesforce pioneered company-wide pay equity audits since 2015 across the industry.`,
      type: 'positive',
      category: 'culture',
      source: 'Salesforce equality reports, industry leadership analysis'
    });
  }

  if (company.symbol === 'TSLA') {
    facts.push({
      text: `Tesla is the only auto company in this sample still rated "Moderate Care" despite clean-tech mission.`,
      type: 'negative',
      category: 'culture',
      source: 'Industry comparison analysis, care index methodology'
    });
  }

  if (company.symbol === 'PLTR') {
    facts.push({
      text: `Palantir's warfare data mining contracts conflict with family privacy and safety values.`,
      type: 'negative',
      category: 'impact',
      source: 'Government contract analysis, privacy advocacy reports'
    });
  }

  // Return top 3 most relevant facts, prioritizing diversity
  const categoryPriority = ['parental', 'leadership', 'transparency', 'culture', 'impact', 'financial'];
  const sortedFacts = facts.sort((a, b) => {
    const aPriority = categoryPriority.indexOf(a.category);
    const bPriority = categoryPriority.indexOf(b.category);
    return aPriority - bPriority;
  });

  // Ensure variety in fact types and categories
  const diverseFacts: InterestingFact[] = [];
  const usedCategories = new Set<string>();
  
  for (const fact of sortedFacts) {
    if (diverseFacts.length >= 3) break;
    if (!usedCategories.has(fact.category)) {
      diverseFacts.push(fact);
      usedCategories.add(fact.category);
    }
  }
  
  // Fill remaining slots if needed
  for (const fact of sortedFacts) {
    if (diverseFacts.length >= 3) break;
    if (!diverseFacts.includes(fact)) {
      diverseFacts.push(fact);
    }
  }

  return diverseFacts.slice(0, 3);
}

export function getRandomFact(company: Company): InterestingFact | null {
  const facts = generateInterestingFacts(company);
  if (facts.length === 0) return null;
  return facts[Math.floor(Math.random() * facts.length)];
}

export function getFactIcon(fact: InterestingFact): string {
  switch (fact.type) {
    case 'positive': return '💡';
    case 'negative': return '📊';
    case 'neutral': return '🔍';
    default: return '💡';
  }
}

export function getFactColor(fact: InterestingFact): string {
  switch (fact.type) {
    case 'positive': return '#2BAE66'; // care-emerald
    case 'negative': return '#E46C6C'; // harm-coral
    case 'neutral': return '#6B7280'; // text-secondary
    default: return '#6B7280';
  }
}