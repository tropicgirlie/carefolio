import { CareIndexPortfolio } from '../components/CareIndexPortfolio';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { mockCompanies } from '../data/companies';

export function CareIndexRoute() {
  const nav = useAppNavigation();

  return (
    <CareIndexPortfolio
      companies={mockCompanies || []}
      onNavigateToCompanyProfile={nav.onNavigateToCompanyProfile}
      onNavigateToLanding={nav.onNavigateToLanding}
      onNavigateToDashboard={nav.onNavigateToDashboard}
    />
  );
}
