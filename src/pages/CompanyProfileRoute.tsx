import { useParams, Navigate } from 'react-router';
import { CompanyProfilePage } from '../components/CompanyProfilePage';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { mockCompanies } from '../data/companies';

export function CompanyProfileRoute() {
  const { symbol } = useParams<{ symbol: string }>();
  const nav = useAppNavigation();

  const company = mockCompanies.find(c => c.symbol === symbol);

  if (!company) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <CompanyProfilePage
      company={company}
      allCompanies={mockCompanies}
      {...nav.pageProps}
    />
  );
}
