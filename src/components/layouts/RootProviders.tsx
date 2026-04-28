import { Outlet } from 'react-router';
import { TooltipProvider } from '../ui/tooltip';
import { Toaster } from '../ui/sonner';
import { AuthProvider } from '../../contexts/AuthContext';

/**
 * Root-level provider wrapper for the entire route tree.
 * Ensures AuthContext, TooltipProvider, and Toaster are available to all routes.
 */
export function RootProviders() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <Outlet />
        <Toaster position="top-right" richColors />
      </TooltipProvider>
    </AuthProvider>
  );
}
