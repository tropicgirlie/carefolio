import { Company } from '../data/companies';

// Maternal narrative insights
export const getMaternalInsight = (
  bloomingCompanies: number,
  needsNurturingCompanies: number,
  highCareCompanies: number,
  vulnerableSectors: string[]
): string => {
  if (bloomingCompanies >= 8) {
    return `Your portfolio is blooming beautifully — ${bloomingCompanies} companies are thriving with strong care practices.`;
  } else if (needsNurturingCompanies >= 5) {
    return `Your garden shows promise, but ${needsNurturingCompanies} companies need nurturing attention to flourish.`;
  } else if (highCareCompanies >= 10) {
    return `Strong foundations are growing — ${highCareCompanies} companies demonstrate excellent care leadership.`;
  } else if (vulnerableSectors.length > 0) {
    return `Care is strong overall, but resilience is thinning in the ${vulnerableSectors.join(' and ')} sectors.`;
  } else {
    return `Your portfolio is developing its care infrastructure — seeds of transformation are taking root.`;
  }
};

export const getGardenHealthIcon = (status: string): string => {
  switch (status) {
    case 'blooming': return '🌸';
    case 'healthy': return '🌱';
    case 'wilting': return '🛑';
    case 'dying': return '🛑';
    default: return '🌱';
  }
};

// Health emoji function (alias for getGardenHealthIcon for compatibility)
export const getHealthEmoji = (status: string): string => {
  return getGardenHealthIcon(status);
};

export const getHealthStatusLabel = (status: string): string => {
  switch (status) {
    case 'blooming': return 'Blooming';
    case 'healthy': return 'Growing';
    case 'wilting': 
    case 'dying': return 'Needs Nurturing';
    default: return 'Growing';
  }
};

// Calculate vulnerable sectors
export const getVulnerableSectors = (companies: Company[]): string[] => {
  return ['Energy', 'Consumer Discretionary'].filter(sector => 
    companies.filter(c => c.sector === sector && c.care_index.score < 60).length > 1
  );
};