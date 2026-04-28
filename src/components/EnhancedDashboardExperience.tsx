import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OnboardingWizard } from './OnboardingWizard';
import { GlobalIndexChip } from './GlobalIndexChip';
import { EmptyState, EmptyPortfolioState } from './EmptyState';
import { NudgeManager } from './ProgressiveNudges';
import { Dashboard } from './Dashboard';
import { ViewToggle } from './ViewToggle';

import { GlobalCountriesView } from './GlobalCountriesView';
import { GlobalCompaniesView } from './GlobalCompaniesView';
import { DemoPortfolioView } from './DemoPortfolioView';
import { DemoCountriesView } from './DemoCountriesView';
import { Company } from '../data/companies';
import { Country, mockCountries } from '../data/countries';
import { demoCompanies, globalIndexStats, calculateDemoPortfolioMetrics } from '../data/demoData';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Building2 } from 'lucide-react';

interface OnboardingPreferences {
  focus: 'companies' | 'countries' | 'agencies';
  sectors: string[];
  regions: string[];
  metrics: string[];
}

type ViewType = 'companies' | 'countries' | 'agencies';
type IndexViewType = 'global' | 'personal';

interface EnhancedDashboardExperienceProps {
  companies: Company[];
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToTechDocs: () => void;
  onNavigateToCompanyProfile: (company: Company) => void;
  onNavigateToDataQuality?: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  isPortfolioOverviewExpanded: boolean;
  onTogglePortfolioOverview: () => void;
}

export function EnhancedDashboardExperience(props: EnhancedDashboardExperienceProps) {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingPreferences, setOnboardingPreferences] = useState<OnboardingPreferences | null>(null);
  const [isInDemoMode, setIsInDemoMode] = useState(true);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [userActions, setUserActions] = useState<string[]>(['first-visit']);
  const [currentIndexView, setCurrentIndexView] = useState<IndexViewType>('global');
  const [currentDataView, setCurrentDataView] = useState<ViewType>('companies');
  
  // Demo state
  const [portfolioMetrics, setPortfolioMetrics] = useState(calculateDemoPortfolioMetrics([]));

  useEffect(() => {
    // Check if user is new or returning
    const hasVisited = localStorage.getItem('carefolio-visited');
    const hasCompletedOnboarding = localStorage.getItem('carefolio-onboarded');
    
    if (!hasVisited) {
      setIsFirstVisit(true);
      setShowOnboarding(true);
      localStorage.setItem('carefolio-visited', 'true');
    } else if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    } else {
      setIsFirstVisit(false);
      setIsInDemoMode(false);
      // Load user preferences and actual data
    }
  }, []);

  const handleOnboardingComplete = (preferences: OnboardingPreferences) => {
    setOnboardingPreferences(preferences);
    setShowOnboarding(false);
    localStorage.setItem('carefolio-onboarded', 'true');
    localStorage.setItem('carefolio-preferences', JSON.stringify(preferences));
    
    // Set initial view based on preferences
    setCurrentDataView(preferences.focus);
    
    // Start demo with sample data based on preferences
    if (preferences.focus === 'companies') {
      const demoSelection = demoCompanies.slice(0, 4).map(c => c.id);
      setSelectedCompanies(demoSelection);
      setPortfolioMetrics(calculateDemoPortfolioMetrics(demoSelection));
    } else if (preferences.focus === 'countries') {
      const demoCountrySelection = mockCountries.slice(0, 3).map(c => c.id);
      setSelectedCountries(demoCountrySelection);
      // Calculate demo country metrics if needed
    }
    
    // Update user actions
    setUserActions(prev => [...prev, 'onboarding-completed', 'first-save']);
    
    // Animate transition from demo to "real" dashboard
    setTimeout(() => {
      setIsInDemoMode(false);
    }, 2000);
  };

  const handleSkipOnboarding = () => {
    setShowOnboarding(false);
    setIsInDemoMode(false);
    localStorage.setItem('carefolio-onboarded', 'skipped');
  };

  const handleAddData = () => {
    // Redirect to signup/onboarding instead of inline data addition
    console.log('Redirecting to signup for data addition...');
    props.onNavigateToLogin();
  };

  const handleAddCountry = () => {
    // Redirect to signup/onboarding instead of inline data addition
    console.log('Redirecting to signup for country addition...');
    props.onNavigateToLogin();
  };

  const handleExportReport = () => {
    console.log('Exporting report...');
    setUserActions(prev => [...prev, 'report-exported']);
  };

  const handleViewComparison = () => {
    console.log('Viewing comparison...');
    setUserActions(prev => [...prev, 'comparison-viewed']);
  };

  const handleViewTrends = () => {
    console.log('Viewing trends...');
    setUserActions(prev => [...prev, 'trends-viewed']);
  };

  // Determine what to show based on current view
  const hasCompanyData = !isInDemoMode && props.companies && props.companies.length > 0;
  const hasCountryData = !isInDemoMode && false; // No real country data yet
  const showCompanyDemo = isInDemoMode && selectedCompanies.length > 0 && currentDataView === 'companies';
  const showCountryDemo = isInDemoMode && selectedCountries.length > 0 && currentDataView === 'countries';
  const showEmpty = (currentDataView === 'companies' && !hasCompanyData && !showCompanyDemo) || 
                    (currentDataView === 'countries' && !hasCountryData && !showCountryDemo) ||
                    (currentDataView === 'agencies');

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Onboarding Wizard */}
      <OnboardingWizard
        isOpen={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleSkipOnboarding}
      />

      {/* Enhanced Header */}
      <div className="container py-6 bg-white">
        {/* Top Bar with View Toggle and Index Chips */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6 mb-8"
        >
          {/* View Toggle */}
          <ViewToggle
            currentView={currentDataView}
            onViewChange={setCurrentDataView}
          />

          {/* Global Index & Personal Dashboard Chips */}
          <div className="flex items-center gap-4">
            <GlobalIndexChip
              mode="global"
              value={currentDataView === 'countries' ? 
                Math.round(mockCountries.reduce((sum, c) => sum + c.careIndexScore, 0) / mockCountries.length) :
                globalIndexStats.globalIndex2025
              }
              isActive={currentIndexView === 'global'}
              onClick={() => setCurrentIndexView('global')}
            />
            {((hasCompanyData || showCompanyDemo || hasCountryData || showCountryDemo)) && (
              <GlobalIndexChip
                mode="personal"
                value={portfolioMetrics?.averageScore || 0}
                isActive={currentIndexView === 'personal'}
                onClick={() => setCurrentIndexView('personal')}
              />
            )}
          </div>
        </motion.div>



        {/* Progressive Nudges */}
        {((hasCompanyData || showCompanyDemo || hasCountryData || showCountryDemo)) && (
          <NudgeManager
            userActions={userActions}
            onExportReport={handleExportReport}
            onViewComparison={handleViewComparison}
            onViewTrends={handleViewTrends}
            showNudges={userActions.includes('first-save')}
          />
        )}

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {/* Empty States */}
          {showEmpty && currentDataView === 'companies' && (
            <motion.div
              key="empty-companies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <EmptyPortfolioState
                  onAddCompanies={handleAddData}
                  onAddCountries={() => setCurrentDataView('countries')}
                  onAddAgencies={() => setCurrentDataView('agencies')}
                />
              </Card>
            </motion.div>
          )}

          {showEmpty && currentDataView === 'countries' && (
            <motion.div
              key="empty-countries"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-[var(--care-emerald)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-3xl">🌍</div>
                  </div>
                  <h2 className="headline-h3 text-[var(--text-primary)] mb-4">
                    Countries Coming Soon
                  </h2>
                  <p className="body-medium text-[var(--text-secondary)] mb-6">
                    Country care tracking will be available soon. Start with companies to build your care portfolio.
                  </p>
                  <Button
                    onClick={() => props.onNavigateToLogin()}
                    className="md3-btn-outlined"
                  >
                    Sign Up to Start Tracking
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {showEmpty && currentDataView === 'agencies' && (
            <motion.div
              key="empty-agencies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-[var(--neutral-lilac)] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="headline-h3 text-[var(--text-primary)] mb-4">
                    Agencies Coming Soon
                  </h2>
                  <p className="body-medium text-[var(--text-secondary)] mb-6">
                    Government agency care tracking is in development. Stay tuned for updates.
                  </p>
                  <Button
                    onClick={() => props.onNavigateToLogin()}
                    className="md3-btn-outlined"
                  >
                    Sign Up to Start Tracking
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Demo Views */}
          {showCompanyDemo && (
            <motion.div
              key="demo-companies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DemoPortfolioView
                demoCompanies={demoCompanies.filter(c => selectedCompanies.includes(c.id))}
                portfolioMetrics={portfolioMetrics}
                onTransitionToReal={() => setIsInDemoMode(false)}
              />
            </motion.div>
          )}

          {showCountryDemo && (
            <motion.div
              key="demo-countries"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DemoCountriesView
                demoCountries={mockCountries.filter(c => selectedCountries.includes(c.id))}
                onTransitionToReal={() => setIsInDemoMode(false)}
              />
            </motion.div>
          )}

          {/* Real Data Views */}
          {hasCompanyData && currentDataView === 'companies' && (
            <motion.div
              key="real-companies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard
                {...props}
                companies={props.companies}
              />
            </motion.div>
          )}

          {/* Global Data Views - Show when no personal data */}
          {showEmpty && currentIndexView === 'global' && currentDataView === 'countries' && (
            <motion.div
              key="global-countries"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GlobalCountriesView
                countries={mockCountries}
                onExploreCountry={() => props.onNavigateToLogin()}
              />
            </motion.div>
          )}

          {showEmpty && currentIndexView === 'global' && currentDataView === 'companies' && (
            <motion.div
              key="global-companies"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <GlobalCompaniesView
                companies={demoCompanies}
                onExploreCompany={() => props.onNavigateToLogin()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

