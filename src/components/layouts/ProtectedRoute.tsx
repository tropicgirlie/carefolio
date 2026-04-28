import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Wraps a route's children and redirects to /login if unauthenticated.
 * Passes the attempted path as state so login can redirect back.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
}
