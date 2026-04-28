// TopNavigation component - Navigation functionality moved to GlobalNavigation

interface TopNavigationProps {
  currentPage: 'landing' | 'about' | 'dashboard' | 'insights' | 'login';
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onLogoClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function TopNavigation({
  currentPage,
  onNavigateToLanding,
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToDashboard,
  onLogoClick,
  isAuthenticated,
  onLogout
}: TopNavigationProps) {
  // Navigation functionality removed - using GlobalNavigation component instead
  // This component is kept for compatibility but renders nothing
  
  return (
    <div className="w-full h-0">
      {/* Navigation removed - using GlobalNavigation component instead */}
    </div>
  );
}