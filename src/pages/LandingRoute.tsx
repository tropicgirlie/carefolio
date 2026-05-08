import { InvestLandingPage } from '../components/InvestLandingPage';
import { useAppNavigation } from '../hooks/useAppNavigation';

export function LandingRoute() {
  const nav = useAppNavigation();

  return (
    <InvestLandingPage
      onLogoClick={nav.pageProps.onLogoClick}
      onNavigateToLogin={nav.pageProps.onNavigateToLogin}
      onNavigateToInsights={nav.pageProps.onNavigateToInsights}
      onNavigateToAbout={nav.pageProps.onNavigateToAbout}
      onNavigateToDashboard={nav.pageProps.onNavigateToDashboard}
    />
  );
}
