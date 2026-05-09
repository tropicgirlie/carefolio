import { useEffect, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { GlobalNavigation } from '../GlobalNavigation';
import { Footer } from '../Footer';
import { TechDocs } from '../TechDocs';
import { useAuth } from '../../contexts/AuthContext';
import { useAppNavigation } from '../../hooks/useAppNavigation';

import type { NavCurrentPage } from '../GlobalNavigation';

// Pages that get the GlobalNavigation bar
const NAV_PAGES = [
  '/', '/about', '/journal', '/method', '/brokers', '/research', '/insights',
  '/care-index', '/leaderboard', '/dashboard',
];
const NAV_PAGE_PREFIXES = ['/company/'];

// Pages that get the Footer
const FOOTER_PAGES = [
  '/', '/about', '/journal', '/method', '/brokers', '/research', '/insights',
  '/care-index', '/leaderboard', '/dashboard',
];

function getNavCurrentPage(pathname: string): NavCurrentPage {
  if (pathname === '/') return 'landing';
  if (pathname === '/about') return 'about';
  if (pathname === '/journal') return 'journal';
  if (pathname === '/method' || pathname === '/care-index') return 'method';
  if (pathname === '/brokers') return 'brokers';
  if (pathname === '/research' || pathname === '/insights') return 'research';
  return 'other';
}

export function MainLayout() {
  const location = useLocation();
  const { showTechDocs, setShowTechDocs } = useAuth();
  const nav = useAppNavigation();

  const showNav = useMemo(() => {
    return (
      NAV_PAGES.includes(location.pathname) ||
      NAV_PAGE_PREFIXES.some(prefix => location.pathname.startsWith(prefix))
    );
  }, [location.pathname]);

  const showFooter = useMemo(() => {
    return FOOTER_PAGES.includes(location.pathname) && !showTechDocs;
  }, [location.pathname, showTechDocs]);

  const currentPageForNav = useMemo(
    () => getNavCurrentPage(location.pathname),
    [location.pathname]
  );

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        setShowTechDocs(true);
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Q' && nav.isAuthenticated) {
        e.preventDefault();
        nav.onNavigateToDataQuality();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd' && nav.isAuthenticated) {
        e.preventDefault();
        nav.onNavigateToDashboard();
      }
      if (e.key === 'Escape' && showTechDocs) {
        setShowTechDocs(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nav.isAuthenticated, showTechDocs, setShowTechDocs, nav]);

  // Page background. New journey pages set their own cream backgrounds inline,
  // so we just give the rest of the app a light neutral that won't fight them.
  const getBg = () => 'bg-[#F8F3EA]';

  // TechDocs modal overlay - rendered as overlay instead of early return to preserve hook order
  if (showTechDocs) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        >
          <TechDocs onClose={() => setShowTechDocs(false)} />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className={`min-h-screen ${getBg()} text-gray-900`}>
        {showNav && (
          <GlobalNavigation
            currentPage={currentPageForNav}
            onNavigateToLanding={nav.onNavigateToLanding}
            onNavigateToJournal={nav.onNavigateToJournal}
            onNavigateToMethod={nav.onNavigateToMethod}
            onNavigateToBrokers={nav.onNavigateToBrokers}
            onNavigateToResearch={nav.onNavigateToResearch}
            onNavigateToAbout={nav.onNavigateToAbout}
            onLogoClick={nav.onLogoClick}
          />
        )}

        <Outlet />
      </div>

      {/* Footer */}
      <AnimatePresence>
        {showFooter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5 }}
          >
            <Footer
              onNavigateToAbout={nav.onNavigateToAbout}
              onNavigateToDashboard={nav.onNavigateToDashboard}
              onNavigateToInsights={nav.onNavigateToInsights}
              onNavigateToLogin={nav.onNavigateToLogin}
              onNavigateToPrivacyPolicy={nav.onNavigateToPrivacyPolicy}
              onNavigateToDataGovernance={nav.onNavigateToDataGovernance}
              onNavigateToCompliance={nav.onNavigateToCompliance}
              onNavigateToWorkThatWorks={nav.onNavigateToWorkThatWorks}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accessibility */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {nav.isAuthenticated && `Signed in`}
      </div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:bg-[var(--care-emerald)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:z-50 focus:shadow-xl transition-all duration-200"
      >
        Skip to main content
      </a>
    </div>
  );
}