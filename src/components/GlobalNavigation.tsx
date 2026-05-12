import { motion, AnimatePresence } from 'motion/react';
import { Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { CarefolioMark } from './branding/CarefolioMark';

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

export type NavCurrentPage =
  | 'landing'
  | 'journal'
  | 'method'
  | 'brokers'
  | 'research'
  | 'about'
  | 'other';

interface NavItem {
  key: NavCurrentPage;
  label: string;
  onClick: () => void;
  show: boolean;
}

interface GlobalNavigationProps {
  currentPage: NavCurrentPage;
  onNavigateToLanding: () => void;
  onNavigateToJournal: () => void;
  onNavigateToMethod: () => void;
  onNavigateToBrokers: () => void;
  onNavigateToResearch: () => void;
  onNavigateToAbout: () => void;
  onLogoClick: () => void;
}

export function GlobalNavigation({
  currentPage,
  onNavigateToLanding,
  onNavigateToJournal,
  onNavigateToMethod,
  onNavigateToBrokers,
  onNavigateToResearch,
  onNavigateToAbout,
  onLogoClick,
}: GlobalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const items: NavItem[] = [
    { key: 'landing', label: 'Home', onClick: onNavigateToLanding, show: true },
    { key: 'journal', label: 'Journal', onClick: onNavigateToJournal, show: true },
    { key: 'method', label: 'Method', onClick: onNavigateToMethod, show: true },
    { key: 'brokers', label: 'Brokers', onClick: onNavigateToBrokers, show: true },
    { key: 'research', label: 'Research', onClick: onNavigateToResearch, show: true },
    { key: 'about', label: 'About', onClick: onNavigateToAbout, show: true },
  ];

  const handleNavClick = (action: () => void) => {
    action();
    setIsMobileMenuOpen(false);
  };

  const handleNewsletter = () => {
    window.open('https://carefolio.beehiiv.com/', '_blank');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="navbar-container sticky top-0 z-50" style={{ borderBottom: '1px solid #E1D5BF', backgroundColor: 'rgba(248, 243, 234, 0.92)', backdropFilter: 'saturate(180%) blur(8px)', WebkitBackdropFilter: 'saturate(180%) blur(8px)' }}>
      <div className="container">
        <div className="navbar-content" style={{ minHeight: '64px' }}>
          {/* Left: Logo */}
          <div className="navbar-left">
            <motion.div
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={onLogoClick}
              title="Triple-click for developer access"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CarefolioMark size={32} />
              <span
                style={{
                  color: '#1A1410',
                  fontFamily: SERIF,
                  fontSize: '22px',
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
            {items.filter(i => i.show).map(item => (
              <button
                key={item.key}
                onClick={item.onClick}
                className={`nav-link ${currentPage === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right: Newsletter CTA */}
          <div className="navbar-right hidden md:flex">
            <button
              onClick={handleNewsletter}
              className="nav-cta-button"
              style={{
                backgroundColor: '#1A1410',
                color: 'white',
                borderColor: '#1A1410',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1A1410';
              }}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden lg:inline">Sunday letter</span>
              <span className="lg:hidden">Subscribe</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: '#1A1410' }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="md:hidden overflow-hidden"
            style={{ borderTop: '1px solid #E1D5BF', backgroundColor: '#F8F3EA' }}
          >
            <nav className="container py-4 space-y-1">
              {items.filter(i => i.show).map(item => (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.onClick)}
                  className="w-full text-left px-4 py-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: currentPage === item.key ? '#EFE5D0' : 'transparent',
                    color: '#1A1410',
                    fontWeight: currentPage === item.key ? 600 : 400,
                  }}
                >
                  {item.label}
                </button>
              ))}

              {/* Mobile CTA */}
              <div className="pt-3 mt-2" style={{ borderTop: '1px solid #E1D5BF' }}>
                <button
                  onClick={handleNewsletter}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#1A1410', color: 'white' }}
                >
                  <Mail className="w-4 h-4" />
                  Sunday letter
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
