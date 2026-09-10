import { createBrowserRouter } from 'react-router';
import { RootProviders } from './components/layouts/RootProviders';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';
import { LoginRoute } from './pages/LoginRoute';
import { CompanyRoute, CorrectionsPage, EvidenceAdmin, IndexDirectory, IndexLanding, MethodologyPage } from './components/CarefolioIndexSite';

export const router = createBrowserRouter([
  {
    Component: RootProviders,
    children: [
      {
        path: '/',
        children: [
          { index: true, Component: IndexLanding },
          { path: 'directory', Component: IndexDirectory },
          { path: 'companies/:id', Component: CompanyRoute },
          { path: 'methodology', Component: MethodologyPage },
          { path: 'corrections', Component: CorrectionsPage },
          { path: 'login', Component: LoginRoute },
          { path: 'admin/evidence', element: <ProtectedRoute><EvidenceAdmin /></ProtectedRoute> },
          { path: '*', Component: IndexLanding },
        ],
      },
    ],
  },
]);
