import { Company } from '../data/companies';

export interface PortfolioChemistry {
  bonus: number;
  message: string;
}

// Calculate portfolio chemistry bonuses
export const getPortfolioChemistry = (companies: Company[]): PortfolioChemistry => {
  if (companies.length < 2) return { bonus: 0, message: '' };
  
  const parentalLeaveCount = companies.filter(c => c.care_index.score >= 85).length;
  const crossSectorDiversity = new Set(companies.map(c => c.sector)).size;
  const sustainabilityCount = companies.filter(c => c.harm_index.score < 40).length;
  
  let bonus = 0;
  let messages = [];
  
  if (parentalLeaveCount >= 3) {
    bonus += 25;
    messages.push(`+${25} Parental Leave Chemistry (${parentalLeaveCount} strong nurture companies)`);
  }
  
  if (crossSectorDiversity >= 4 && companies.length >= 4) {
    bonus += 30;
    messages.push(`+${30} Sector Diversity Bonus (${crossSectorDiversity} sectors represented)`);
  }
  
  if (sustainabilityCount >= 3) {
    bonus += 20;
    messages.push(`+${20} Sustainable Growth Chemistry (${sustainabilityCount} clean companies)`);
  }
  
  return { bonus, message: messages.join(' • ') };
};

// Enhanced portfolio analytics with maternal systems thinking
export const calculatePortfolioAnalytics = (companies: Company[]) => {
  const totalLegendaryCards = companies.filter(c => c.care_index.score >= 90).length;
  const averageNurtureScore = Math.round(companies.reduce((sum, c) => sum + c.care_index.score, 0) / companies.length);
  const bloomingCompanies = companies.filter(c => c.health_status === 'blooming').length;
  const growingCompanies = companies.filter(c => c.health_status === 'healthy').length;
  const needsNurturingCompanies = companies.filter(c => c.health_status === 'wilting' || c.health_status === 'dying').length;
  const highCareCompanies = companies.filter(c => c.care_index.score >= 80).length;
  
  return {
    totalLegendaryCards,
    averageNurtureScore,
    bloomingCompanies,
    growingCompanies,
    needsNurturingCompanies,
    highCareCompanies
  };
};

// Filter companies based on search and filters
export const filterCompanies = (
  companies: Company[],
  searchTerm: string,
  sectorFilter: string,
  healthFilter: string
): Company[] => {
  return companies.filter(company => {
    const matchesSearch = searchTerm === '' || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    const matchesHealth = healthFilter === 'all' || company.health_status === healthFilter;
    return matchesSearch && matchesSector && matchesHealth;
  });
};