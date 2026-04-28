// Care Index Global 100 - Main Company Dataset
// Combines all regional company data into unified export

import { Company } from './types';
import { usCompanies } from './companies-us';
import { europeCompanies } from './companies-europe';
import { restOfWorldCompanies } from './companies-row';

// Combine all regional datasets - exactly 100 companies
// US: 40 companies (with Palantir featured prominently)
// Europe: 40 companies  
// Rest of World: 20 companies
export const mockCompanies: Company[] = [
  ...usCompanies,        // 40 companies
  ...europeCompanies,    // 40 companies 
  ...restOfWorldCompanies // 20 companies
];

// Verify we have exactly 100 companies
console.log(`Total companies loaded: ${mockCompanies.length}`);
console.log(`US companies: ${usCompanies.length}`);
console.log(`Europe companies: ${europeCompanies.length}`);
console.log(`Rest of World companies: ${restOfWorldCompanies.length}`);

// Export individual regional datasets for specific use cases
export { usCompanies, europeCompanies, restOfWorldCompanies };

// Export types and constants for external use
export type { Company } from './types';
export { CARE_BANDS, SECTORS, REGIONS, COUNTRIES, CARE_SCORE_DISTRIBUTION, GEOGRAPHIC_AVERAGES } from './constants';

// Dataset statistics and utilities
export const getCompanyStats = () => {
  const total = mockCompanies.length;
  const byRegion = mockCompanies.reduce((acc, company) => {
    acc[company.region] = (acc[company.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byBand = mockCompanies.reduce((acc, company) => {
    acc[company.care_index.band] = (acc[company.care_index.band] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const averageScore = mockCompanies.reduce((sum, company) => sum + company.care_index.score, 0) / total;

  return {
    total,
    byRegion,
    byBand,
    averageScore: Math.round(averageScore * 10) / 10,
    regionalBreakdown: {
      us: usCompanies.length,
      europe: europeCompanies.length,
      restOfWorld: restOfWorldCompanies.length
    }
  };
};

// Care band distribution helper
export const getCareBandDistribution = () => {
  const distribution = mockCompanies.reduce((acc, company) => {
    const band = company.care_index.band;
    acc[band] = (acc[band] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const total = mockCompanies.length;
  return Object.entries(distribution).map(([band, count]) => ({
    band,
    count,
    percentage: Math.round((count / total) * 100)
  }));
};

// Top performers by care score
export const getTopPerformers = (limit: number = 10) => {
  return mockCompanies
    .sort((a, b) => b.care_index.score - a.care_index.score)
    .slice(0, limit);
};

// Companies by sector
export const getCompaniesBySector = (sector: string) => {
  return mockCompanies.filter(company => company.sector === sector);
};

// Companies by region
export const getCompaniesByRegion = (region: string) => {
  return mockCompanies.filter(company => company.region === region);
};

// Default export for compatibility
export default mockCompanies;