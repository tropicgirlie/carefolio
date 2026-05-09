// Footer Component - Clean Template Design
// Three-column layout: Carefolio branding | Platform | Connect
// Updated with clean template styling matching overall design

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Database,
  Shield,
  ExternalLink,
  Mail
} from 'lucide-react';
import { DataManagementDocs } from './DataManagementDocs';
import { RemoteSheIntegration } from './RemoteSheIntegration';
import { CarefolioMark } from './branding/CarefolioMark';

const SERIF = "'Fraunces', Georgia, 'Times New Roman', serif";

// Carefolio wordmark in Fraunces serif, ink. Used for both the masthead
// and the inline copyright references at the bottom of the footer.
function CarefolioWordmark({ size = '20px' }: { size?: string }) {
  return (
    <span
      style={{
        color: '#1A1410',
        fontFamily: SERIF,
        fontSize: size,
        letterSpacing: '-0.015em',
        lineHeight: 1,
      }}
    >
      <span style={{ fontWeight: 600 }}>Care</span>
      <span style={{ fontWeight: 400 }}>folio</span>
    </span>
  );
}

interface FooterProps {
  onNavigateToAbout: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToInsights: () => void;
  onNavigateToLogin: () => void;
  onNavigateToPrivacyPolicy?: () => void;
  onNavigateToDataGovernance?: () => void;
  onNavigateToCompliance?: () => void;
  onNavigateToWorkThatWorks?: () => void;
}

export function Footer({ 
  onNavigateToAbout, 
  onNavigateToDashboard, 
  onNavigateToInsights, 
  onNavigateToLogin,
  onNavigateToPrivacyPolicy,
  onNavigateToDataGovernance,
  onNavigateToCompliance,
  onNavigateToWorkThatWorks
}: FooterProps) {
  const [showDataDocs, setShowDataDocs] = useState(false);

  const handleContactClick = () => {
    window.open('mailto:info@carefolio.io', '_blank');
  };

  const handleJoinWaitlistClick = () => {
    window.open('https://carefolio.beehiiv.com/', '_blank');
  };

  return (
    <>
      <footer style={{ backgroundColor: '#EFE5D0', borderTop: '1px solid #E1D5BF' }}>
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Carefolio Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <CarefolioMark size={32} />
                <CarefolioWordmark size="22px" />
              </div>

              <p className="leading-relaxed mb-4" style={{ color: '#3F352D' }}>
                A portfolio simulator for companies that actually invest in their people. Backed by the open Care Score methodology.
              </p>

              <p className="text-xs mb-6" style={{ color: '#7A6B5C' }}>
                Carefolio is a result of research from{' '}
                <a
                  href="https://momops.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: '#4A1F30' }}
                >
                  MomOps
                </a>
                , a post-automation organisational framework.
              </p>

              <button
                onClick={handleJoinWaitlistClick}
                className="inline-flex items-center gap-2 rounded-full px-6 h-11 text-sm font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#1A1410', color: 'white' }}
              >
                <Mail className="w-4 h-4" />
                Join Waitlist
              </button>
            </div>

            {/* Platform Section */}
            <div className="lg:col-span-1">
              <h4 className="text-lg mb-4" style={{ color: '#1A1410', fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.01em' }}>Platform</h4>
              <nav className="space-y-3">
                <button 
                  onClick={onNavigateToAbout}
                  className="block transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  About
                </button>
                <button 
                  onClick={onNavigateToInsights}
                  className="block transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Insights
                </button>
                {onNavigateToWorkThatWorks && (
                  <button 
                    onClick={onNavigateToWorkThatWorks}
                    className="block transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                  >
                    Work That Works
                  </button>
                )}
                <button 
                  onClick={onNavigateToDashboard}
                  className="block transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Dashboard
                </button>
                <a
                  href="/compare"
                  className="block transition-colors duration-200 no-underline"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Compare Companies
                </a>
                <a
                  href="/portfolio-score"
                  className="block transition-colors duration-200 no-underline"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Portfolio Care Score
                </a>
              </nav>
            </div>

            {/* Connect Section */}
            <div className="lg:col-span-1">
              <h4 className="text-lg mb-4" style={{ color: '#1A1410', fontFamily: SERIF, fontWeight: 600, letterSpacing: '-0.01em' }}>Connect</h4>
              <nav className="space-y-3">
                <button 
                  onClick={onNavigateToLogin}
                  className="block transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Early Access
                </button>
                <button 
                  onClick={handleContactClick}
                  className="flex items-center gap-2 transition-colors duration-200"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                
                {/* System Access - Moved under Connect */}
                <button 
                  onClick={() => setShowDataDocs(true)}
                  className="flex items-center gap-2 transition-colors duration-200 group"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  <Database className="w-4 h-4" />
                  <span>Documentation</span>
                  <Shield className="w-3 h-3 opacity-60" />
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Disclaimer Section */}
          <div className="mt-10 pt-6" style={{ borderTop: '1px solid #E1D5BF' }}>
            <div className="text-center">
              <p className="text-sm leading-relaxed" style={{ color: '#3F352D' }}>
                <CarefolioWordmark size="14px" /> is a simulation tool and does not provide financial advice. © <CarefolioWordmark size="14px" /> 2026. All rights reserved.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm mt-4 flex-wrap">
                <button 
                  onClick={onNavigateToPrivacyPolicy}
                  className="transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Privacy Policy
                </button>
                <span style={{ color: '#7A6B5C', opacity: 0.5 }}>|</span>
                <button 
                  onClick={onNavigateToDataGovernance}
                  className="transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Data Governance
                </button>
                <span style={{ color: '#7A6B5C', opacity: 0.5 }}>|</span>
                <button 
                  onClick={onNavigateToCompliance}
                  className="transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                  style={{ color: '#3F352D' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#3F352D')}
                >
                  Compliance (GDPR, SOC 2)
                </button>
              </div>
              
              {/* New GDPR Disclaimer */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E1D5BF' }}>
                <p className="text-xs text-center" style={{ color: '#7A6B5C' }}>
                  Carefolio complies with GDPR, prioritizes data ethics, and is committed to transparent governance.
                </p>
              </div>

              {/* MomOps Ecosystem */}
              <div className="mt-6 pt-4" style={{ borderTop: '1px solid #E1D5BF' }}>
                <RemoteSheIntegration variant="footer-ecosystem" />
              </div>
              
              {/* Made by attribution */}
              <div className="mt-4 pt-2">
                <a 
                  href="https://luana.systems" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs transition-colors duration-200 flex items-center justify-center gap-1"
                  style={{ color: '#7A6B5C' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#4A1F30')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#7A6B5C')}
                >
                  made by luana.systems
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Data Management Documentation Modal */}
      <AnimatePresence>
        {showDataDocs && (
          <DataManagementDocs onClose={() => setShowDataDocs(false)} />
        )}
      </AnimatePresence>
    </>
  );
}