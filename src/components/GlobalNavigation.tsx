import { motion, AnimatePresence } from 'motion/react';
import { Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CarefolioMark } from './branding/CarefolioMark';

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

interface GlobalNavigationProps {
  currentPage: 'landing' | 'about' | 'insights' | 'dashboard' | 'work-that-works';
  isAuthenticated: boolean;
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogout: () => void;
  onLogoClick: () => void;
  onNavigateToCarePortfolio?: () => void;
  onNavigateToWorkThatWorks?: () => void;
}

export function GlobalNavigation({
  currentPage,
  isAuthenticated,
  onNavigateToLanding,
  onNavigateToAbout,
  onNavigateToInsights,
  onNavigateToDashboard,
  onNavigateToLogin,
  onLogout,
  onLogoClick,
  onNavigateToCarePortfolio,
  onNavigateToWorkThatWorks
}: GlobalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container relative">
      <div className="container">
        <div className="navbar-content" style={{ minHeight: '64px' }}>
          {/* Left: Logo */}
          <div className="navbar-left">
            <motion.div 
              className="flex items-center gap-4 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
              title="Triple-click for developer access"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CarefolioMark size={36} />
              <span
                style={{
                  color: '#1A1410',
                  fontFamily: SERIF,
                  fontSize: '24px',
                  letterSpacing: '-0.015em',
                  lineHeight: 1,
                }}
              >
                <span style={{ fontWeight: 600 }}>Care</span>
                <span style={{ fontWeight: 400 }}>folio</span>
              </span>
            </motion.div>
          </div>

          {/* Center: Navigation Links */}
          <nav className="navbar-center hidden md:flex">
            <button 
              onClick={onNavigateToLanding} 
              className={`nav-link ${currentPage === 'landing' ? 'active' : ''}`}
            >
              Home
            </button>
            <button 
              onClick={onNavigateToAbout} 
              className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
            >
              About
            </button>
            <button 
              onClick={onNavigateToInsights} 
              className={`nav-link ${currentPage === 'insights' ? 'active' : ''}`}
            >
              Insights
            </button>
            {onNavigateToWorkThatWorks && (
              <button 
                onClick={onNavigateToWorkThatWorks} 
                className={`nav-link ${currentPage === 'work-that-works' ? 'active' : ''}`}
              >
                Work That Works
              </button>
            )}
            {onNavigateToCarePortfolio && (
              <button 
                onClick={onNavigateToCarePortfolio} 
                className="nav-link"
              >
                Care Index
              </button>
            )}
            <button 
              onClick={onNavigateToDashboard} 
              className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
            >
              Dashboard
            </button>
          </nav>

          {/* Right: CTA Actions */}
          <div className="navbar-right hidden md:flex">
            {/* Join Waitlist Button - Primary CTA */}
            <button 
              className="nav-cta-button"
              onClick={() => window.open('https://carefolio.beehiiv.com/', '_blank')}
              style={{
                backgroundColor: '#1A1410',
                color: 'white',
                borderColor: '#1A1410'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1410';
              }}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden lg:inline">Join Waitlist</span>
              <span className="lg:hidden">Join</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <nav className="container py-4 space-y-2">
              <button
                onClick={() => handleNavClick(onNavigateToLanding)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'landing'
                    ? 'bg-[#F2EBDB] text-[#1A1410] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick(onNavigateToAbout)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'about'
                    ? 'bg-[#F2EBDB] text-[#1A1410] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                About
              </button>
              <button
                onClick={() => handleNavClick(onNavigateToInsights)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'insights'
                    ? 'bg-[#F2EBDB] text-[#1A1410] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Insights
              </button>
              {onNavigateToWorkThatWorks && (
                <button
                  onClick={() => handleNavClick(onNavigateToWorkThatWorks)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === 'work-that-works'
                      ? 'bg-purple-50 text-[#6B3FA0] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Work That Works
                </button>
              )}
              {onNavigateToCarePortfolio && (
                <button
                  onClick={() => handleNavClick(onNavigateToCarePortfolio)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === 'carePortfolio'
                      ? 'bg-purple-50 text-[#6B3FA0] font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Care Index
                </button>
              )}
              <button
                onClick={() => handleNavClick(onNavigateToDashboard)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-[#F2EBDB] text-[#1A1410] font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Dashboard
              </button>
              
              {/* Mobile CTAs */}
              <div className="pt-4 space-y-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    window.open('https://carefolio.beehiiv.com/', '_blank');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1A1410] text-white font-medium hover:bg-black transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Join Waitlist
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}