import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import type { Company } from '../data/companies';

/**
 * Returns the same navigation callback props that all existing page components expect.
 * This bridges React Router's useNavigate with the legacy prop-based navigation pattern,
 * so we don't need to refactor every component at once.
 */
export function useAppNavigation() {
  const navigate = useNavigate();
  const { handleLogout, handleLogoClick, setShowTechDocs, isAuthenticated } = useAuth();

  const onNavigateToLanding = useCallback(() => navigate('/'), [navigate]);
  const onNavigateToLogin = useCallback(() => navigate('/login'), [navigate]);
  const onNavigateToInsights = useCallback(() => navigate('/insights'), [navigate]);
  const onNavigateToAbout = useCallback(() => navigate('/about'), [navigate]);
  const onNavigateToDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
  const onNavigateToLeaderboard = useCallback(() => navigate('/leaderboard'), [navigate]);
  const onNavigateToTechDocs = useCallback(() => setShowTechDocs(true), [setShowTechDocs]);
  const onNavigateToCompanyProfile = useCallback(
    (company: Company) => navigate(`/company/${company.symbol}`),
    [navigate]
  );
  const onNavigateToDataQuality = useCallback(() => navigate('/data-quality'), [navigate]);
  const onNavigateToValidation = useCallback(
    (companySymbol: string) => navigate(`/data-validation/${companySymbol}`),
    [navigate]
  );
  const onNavigateToCarePortfolio = useCallback(() => navigate('/care-index'), [navigate]);
  const onNavigateToPrivacyPolicy = useCallback(() => navigate('/privacy'), [navigate]);
  const onNavigateToDataGovernance = useCallback(() => navigate('/data-governance'), [navigate]);
  const onNavigateToCompliance = useCallback(() => navigate('/compliance'), [navigate]);
  const onNavigateToWorkThatWorks = useCallback(() => navigate('/work-that-works'), [navigate]);
  // Journey-pivot routes
  const onNavigateToJournal = useCallback(() => navigate('/journal'), [navigate]);
  const onNavigateToMethod = useCallback(() => navigate('/method'), [navigate]);
  const onNavigateToBrokers = useCallback(() => navigate('/brokers'), [navigate]);
  const onNavigateToResearch = useCallback(() => navigate('/research'), [navigate]);

  const onLogout = useCallback(async () => {
    await handleLogout();
    navigate('/');
  }, [handleLogout, navigate]);

  // Standard props bundle that most page components expect
  const pageProps = useMemo(() => ({
    onNavigateToLanding,
    onNavigateToLogin,
    onNavigateToInsights,
    onNavigateToAbout,
    onNavigateToDashboard,
    onNavigateToLeaderboard,
    onNavigateToTechDocs,
    onNavigateToCompanyProfile,
    onNavigateToDataQuality,
    onNavigateToCarePortfolio,
    onLogoClick: handleLogoClick,
    onLogout,
    isAuthenticated,
  }), [
    onNavigateToLanding, onNavigateToLogin, onNavigateToInsights, onNavigateToAbout,
    onNavigateToDashboard, onNavigateToLeaderboard, onNavigateToTechDocs,
    onNavigateToCompanyProfile, onNavigateToDataQuality, onNavigateToCarePortfolio,
    handleLogoClick, onLogout, isAuthenticated,
  ]);

  return {
    ...pageProps,
    onNavigateToValidation,
    onNavigateToPrivacyPolicy,
    onNavigateToDataGovernance,
    onNavigateToCompliance,
    onNavigateToWorkThatWorks,
    onNavigateToJournal,
    onNavigateToMethod,
    onNavigateToBrokers,
    onNavigateToResearch,
    pageProps,
  };
}