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
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';

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
      <footer className="bg-[var(--bg-secondary)] border-t border-[var(--outline-variant)]">
        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Carefolio Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={carefolioLogo} alt="Carefolio" className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    <span style={{ color: '#6B3FA0' }}>Care</span>
                    <span className="text-care-emerald">folio</span>
                  </h3>
                </div>
              </div>
              
              <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                The first portfolio where care counts as capital. Track how companies nurture women, families, and futures.
              </p>
              
              <p className="text-xs text-[var(--text-secondary)] mb-6">
                Carefolio is a result of research from{' '}
                <a 
                  href="https://momops.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--fintech-feminine-purple)] hover:underline"
                >
                  MomOps
                </a>
                , a post-automation organisational framework.
              </p>
              
              <button 
                onClick={handleJoinWaitlistClick}
                className="md3-btn-filled"
              >
                Join Waitlist
              </button>
            </div>

            {/* Platform Section */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Platform</h4>
              <nav className="space-y-3">
                <button 
                  onClick={onNavigateToAbout}
                  className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200"
                >
                  About
                </button>
                <button 
                  onClick={onNavigateToInsights}
                  className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200"
                >
                  Insights
                </button>
                {onNavigateToWorkThatWorks && (
                  <button 
                    onClick={onNavigateToWorkThatWorks}
                    className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200"
                  >
                    Work That Works
                  </button>
                )}
                <button 
                  onClick={onNavigateToDashboard}
                  className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200"
                >
                  Dashboard
                </button>
                <a
                  href="/compare"
                  className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200 no-underline"
                >
                  Compare Companies
                </a>
                <a
                  href="/portfolio-score"
                  className="block text-[var(--text-secondary)] hover:text-[var(--care-emerald)] transition-colors duration-200 no-underline"
                >
                  Portfolio Care Score
                </a>
              </nav>
            </div>

            {/* Connect Section */}
            <div className="lg:col-span-1">
              <h4 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">Connect</h4>
              <nav className="space-y-3">
                <button 
                  onClick={onNavigateToLogin}
                  className="block text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200"
                >
                  Early Access
                </button>
                <button 
                  onClick={handleContactClick}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </button>
                
                {/* System Access - Moved under Connect */}
                <button 
                  onClick={() => setShowDataDocs(true)}
                  className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200 group"
                >
                  <Database className="w-4 h-4" />
                  <span>Documentation</span>
                  <Shield className="w-3 h-3 opacity-60" />
                </button>
              </nav>
            </div>
          </div>

          {/* Bottom Disclaimer Section */}
          <div className="mt-10 pt-6 border-t border-[var(--outline-variant)]">
            <div className="text-center">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <span style={{ color: '#6B3FA0' }}>Care</span><span className="text-care-emerald">folio</span> provides analytics and does not offer financial advice. © <span style={{ color: '#6B3FA0' }}>Care</span><span className="text-care-emerald">folio</span> 2025. All rights reserved.
              </p>
              <div className="flex items-center justify-center gap-4 text-sm mt-4 flex-wrap">
                <button 
                  onClick={onNavigateToPrivacyPolicy}
                  className="text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                >
                  Privacy Policy
                </button>
                <span className="text-[var(--text-secondary)] opacity-50">|</span>
                <button 
                  onClick={onNavigateToDataGovernance}
                  className="text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                >
                  Data Governance
                </button>
                <span className="text-[var(--text-secondary)] opacity-50">|</span>
                <button 
                  onClick={onNavigateToCompliance}
                  className="text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200 underline underline-offset-2 bg-transparent border-none cursor-pointer"
                >
                  Compliance (GDPR, SOC 2)
                </button>
              </div>
              
              {/* New GDPR Disclaimer */}
              <div className="mt-6 pt-4 border-t border-[var(--outline-variant)]">
                <p className="text-xs text-[var(--text-secondary)] text-center">
                  Carefolio complies with GDPR, prioritizes data ethics, and is committed to transparent governance.
                </p>
              </div>
              
              {/* MomOps Ecosystem */}
              <div className="mt-6 pt-4 border-t border-[var(--outline-variant)]">
                <RemoteSheIntegration variant="footer-ecosystem" />
              </div>
              
              {/* Made by attribution */}
              <div className="mt-4 pt-2">
                <a 
                  href="https://luana.systems" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--text-secondary)] hover:text-[var(--fintech-feminine-purple)] transition-colors duration-200 flex items-center justify-center gap-1"
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