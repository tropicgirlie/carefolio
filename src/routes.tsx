import { createBrowserRouter } from 'react-router';
import { RootProviders } from './components/layouts/RootProviders';
import { MainLayout } from './components/layouts/MainLayout';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';

// New journey-pivot pages
import { LandingRoute } from './pages/LandingRoute';
import { JournalRoute } from './pages/JournalRoute';
import { MethodRoute } from './pages/MethodRoute';
import { BrokersRoute } from './pages/BrokersRoute';
import { AboutRoute } from './pages/AboutRoute';

// Editorial / research surface
import { ResearchPage } from './components/ResearchPage';
import { InsightsRoute } from './pages/InsightsRoute';

// Universe + comparison pages (kept; restyle pending)
import { LeaderboardRoute } from './pages/LeaderboardRoute';
import { CompareRoute } from './pages/CompareRoute';
import { CompanyProfileRoute } from './pages/CompanyProfileRoute';
import { DashboardRoute } from './pages/DashboardRoute';

// Newsletter signup / waitlist (formerly /login)
import { LoginRoute } from './pages/LoginRoute';

// Legal / compliance (kept; restyle pending)
import { PrivacyRoute } from './pages/PrivacyRoute';
import { DataGovernanceRoute } from './pages/DataGovernanceRoute';
import { ComplianceRoute } from './pages/ComplianceRoute';

// Admin-only
import { DataQualityRoute } from './pages/DataQualityRoute';
import { DataValidationRoute } from './pages/DataValidationRoute';

// Retired:
//   /work-that-works   - off-brief for the journey pivot, components kept in repo
//   /portfolio-score   - subsumed into /method, components kept in repo

export const router = createBrowserRouter([
  {
    Component: RootProviders,
    children: [
      {
        path: '/',
        Component: MainLayout,
        children: [
          // Journey pivot — primary nav surface
          { index: true, Component: LandingRoute },
          { path: 'journal', Component: JournalRoute },
          { path: 'method', Component: MethodRoute },
          { path: 'brokers', Component: BrokersRoute },
          { path: 'research', Component: ResearchPage }, // canonical route for editorial
          { path: 'about', Component: AboutRoute },

          // Legacy URLs preserved so inbound links still resolve
          { path: 'care-index', Component: MethodRoute },
          { path: 'insights', Component: InsightsRoute },

          // Newsletter signup / waitlist
          { path: 'login', Component: LoginRoute },
          { path: 'early-access', Component: LoginRoute },

          // Universe + comparisons + dashboard preview (restyle pending)
          { path: 'leaderboard', Component: LeaderboardRoute },
          { path: 'compare', Component: CompareRoute },
          { path: 'company/:symbol', Component: CompanyProfileRoute },
          { path: 'dashboard', Component: DashboardRoute },

          // Legal pages (restyle pending)
          { path: 'privacy', Component: PrivacyRoute },
          { path: 'data-governance', Component: DataGovernanceRoute },
          { path: 'compliance', Component: ComplianceRoute },

          // Admin
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
          { path: '*', Component: LandingRoute },
        ],
      },
    ],
  },
]);
