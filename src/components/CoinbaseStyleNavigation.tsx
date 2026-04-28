import { motion } from 'motion/react';

interface CoinbaseStyleNavigationProps {
  currentPage: 'landing' | 'about' | 'insights' | 'dashboard';
  isAuthenticated: boolean;
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;  
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogout: () => void;
  onLogoClick: () => void;
}

export function CoinbaseStyleNavigation({
  currentPage,
  isAuthenticated,
  onNavigateToLanding,
  onNavigateToAbout,
  onNavigateToInsights,
  onNavigateToDashboard,
  onNavigateToLogin,
  onLogout,
  onLogoClick
}: CoinbaseStyleNavigationProps) {
  return (
    <nav className="coinbase-nav">
      <div className="container">
        <div className="coinbase-nav-content">
          {/* Logo Section - Precise Spacing */}
          <div className="coinbase-nav-brand">
            <button
              onClick={onLogoClick}
              className="coinbase-logo-button"
              aria-label="Carefolio Home"
            >
              <div className="coinbase-logo-mark">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="16" cy="12" r="3" fill="var(--care-emerald)"/>
                  <circle cx="16" cy="20" r="2" fill="var(--care-vibrant-mint)"/>
                  <circle cx="12" cy="16" r="1.5" fill="var(--care-teal)"/>
                  <circle cx="20" cy="16" r="1.5" fill="var(--care-teal)"/>
                </svg>
              </div>
              <span className="coinbase-brand-text">Carefolio</span>
            </button>
          </div>

          {/* Navigation Links - Coinbase Style */}
          <div className="coinbase-nav-links">
            <button
              onClick={onNavigateToInsights}
              className={`coinbase-nav-link ${currentPage === 'insights' ? 'active' : ''}`}
            >
              <span>Insights</span>
              {currentPage === 'insights' && (
                <motion.div
                  className="coinbase-nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            
            <button
              onClick={onNavigateToAbout}
              className={`coinbase-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            >
              <span>About</span>
              {currentPage === 'about' && (
                <motion.div
                  className="coinbase-nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>

            {isAuthenticated && (
              <button
                onClick={onNavigateToDashboard}
                className={`coinbase-nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              >
                <span>Dashboard</span>
                {currentPage === 'dashboard' && (
                  <motion.div
                    className="coinbase-nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )}
          </div>

          {/* Action Section - Coinbase Style */}
          <div className="coinbase-nav-actions">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="coinbase-btn-secondary"
              >
                Sign out
              </button>
            ) : (
              <button
                onClick={onNavigateToLogin}
                className="coinbase-btn-primary"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}