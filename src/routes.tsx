import { createBrowserRouter } from 'react-router';
import { RootProviders } from './components/layouts/RootProviders';
import { MainLayout } from './components/layouts/MainLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

// Public page routes
import { LandingRoute } from './pages/LandingRoute';
import { LoginRoute } from './pages/LoginRoute';
import { InsightsRoute } from './pages/InsightsRoute';
import { AboutRoute } from './pages/AboutRoute';
import { CareIndexRoute } from './pages/CareIndexRoute';
import { PrivacyRoute } from './pages/PrivacyRoute';
import { WorkThatWorksRoute } from './pages/WorkThatWorksRoute';
import { DataGovernanceRoute } from './pages/DataGovernanceRoute';
import { ComplianceRoute } from './pages/ComplianceRoute';
import { CompareRoute } from './pages/CompareRoute';
import { PortfolioScoreRoute } from './pages/PortfolioScoreRoute';

// Dashboard - public feature preview
import { DashboardRoute } from './pages/DashboardRoute';

// Protected page routes
import { LeaderboardRoute } from './pages/LeaderboardRoute';
import { CompanyProfileRoute } from './pages/CompanyProfileRoute';
import { DataQualityRoute } from './pages/DataQualityRoute';
import { DataValidationRoute } from './pages/DataValidationRoute';

export const router = createBrowserRouter([
  {
    // Root: provides AuthContext, TooltipProvider, Toaster
    Component: RootProviders,
    children: [
      {
        // Main layout: GlobalNavigation, Footer, TechDocs modal
        path: '/',
        Component: MainLayout,
        children: [
          // Public pages
          { index: true, Component: LandingRoute },
          { path: 'login', Component: LoginRoute },
          { path: 'early-access', Component: LoginRoute },
          { path: 'insights', Component: InsightsRoute },
          { path: 'about', Component: AboutRoute },
          { path: 'care-index', Component: CareIndexRoute },
          { path: 'privacy', Component: PrivacyRoute },
          { path: 'work-that-works', Component: WorkThatWorksRoute },
          { path: 'data-governance', Component: DataGovernanceRoute },
          { path: 'compliance', Component: ComplianceRoute },
          { path: 'compare', Component: CompareRoute },
          { path: 'portfolio-score', Component: PortfolioScoreRoute },

          // Dashboard - public feature preview
          { path: 'dashboard', Component: DashboardRoute },

          // Public showcase pages (formerly protected)
          { path: 'leaderboard', Component: LeaderboardRoute },
          { path: 'company/:symbol', Component: CompanyProfileRoute },

          // Admin-only (accessed via triple-click logo system)
          {
            path: 'data-quality',
            element: (
              <ProtectedRoute>
                <DataQualityRoute />
              </ProtectedRoute>
            ),
          },
          {
            path: 'data-validation/:symbol',
            element: (
              <ProtectedRoute>
                <DataValidationRoute />
              </ProtectedRoute>
            ),
          },

          // Catch-all
          {
            path: '*',
            Component: LandingRoute,
          },
        ],
      },
    ],
  },
]);