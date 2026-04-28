import { LandingPage } from '../components/LandingPage';
import { useAuth } from '../contexts/AuthContext';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { mockCompanies } from '../data/companies';

export function LandingRoute() {
  const { handleLogin, loginError } = useAuth();
  const nav = useAppNavigation();

  return (
    <LandingPage
      {...nav.pageProps}
      onLogin={handleLogin}
      loginError={loginError}
      companies={mockCompanies || []}
    />
  );
}
