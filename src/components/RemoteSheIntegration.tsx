// RemoteShe Integration Component
// Subtle ecosystem link that positions RemoteShe as dependent on Carefolio data
// Carefolio = authority layer, RemoteShe = application layer

import { motion } from 'motion/react';
import { Briefcase, ArrowUpRight } from 'lucide-react';

interface RemoteSheIntegrationProps {
  variant: 'company-profile' | 'policy-analysis' | 'company-ranking' | 'footer-ecosystem';
  companyName?: string;
  className?: string;
}

export function RemoteSheIntegration({ variant, companyName, className = '' }: RemoteSheIntegrationProps) {
  const handleRemoteSheClick = () => {
    window.open('https://remoteshe.com', '_blank');
  };

  // Company Profile variant - "Work at this company"
  if (variant === 'company-profile') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl p-5 border ${className}`}
        style={{
          background: 'rgba(107,63,160,0.02)',
          borderColor: 'rgba(107,63,160,0.08)',
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(107,63,160,0.08)' }}
          >
            <Briefcase className="w-5 h-5" style={{ color: '#6B3FA0' }} />
          </div>
          <div className="flex-1">
            <h4
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: '15px',
                color: 'var(--bg-deep-navy)',
                marginBottom: '8px',
              }}
            >
              Work at {companyName || 'this company'}
            </h4>
            <button
              onClick={handleRemoteSheClick}
              className="flex items-center gap-1.5 no-underline transition-opacity duration-200 hover:opacity-80 cursor-pointer bg-transparent border-0 p-0"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 500,
                color: '#6B3FA0',
              }}
            >
              View open remote jobs at this company on RemoteShe
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '12px',
                color: 'var(--text-secondary)',
                marginTop: '8px',
                lineHeight: 1.5,
              }}
            >
              RemoteShe surfaces jobs at companies evaluated using Carefolio care infrastructure signals.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  // Policy Analysis variant - Inline card
  if (variant === 'policy-analysis') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl p-5 border ${className}`}
        style={{
          background: 'rgba(107,63,160,0.02)',
          borderColor: 'rgba(107,63,160,0.08)',
        }}
      >
        <h4
          style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '15px',
            color: 'var(--bg-deep-navy)',
            marginBottom: '8px',
          }}
        >
          Looking for companies with strong maternity and fertility support?
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            lineHeight: 1.6,
          }}
        >
          Explore remote roles at companies with high Carefolio scores.
        </p>
        <button
          onClick={handleRemoteSheClick}
          className="flex items-center gap-1.5 rounded-full px-4 py-2 cursor-pointer transition-all duration-200 border-0"
          style={{
            background: 'rgba(107,63,160,0.08)',
            color: '#6B3FA0',
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(107,63,160,0.12)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(107,63,160,0.08)';
          }}
        >
          Browse jobs on RemoteShe
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    );
  }

  // Company Ranking variant - CTA button
  if (variant === 'company-ranking') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`rounded-xl p-6 border ${className}`}
        style={{
          background: 'rgba(107,63,160,0.02)',
          borderColor: 'rgba(107,63,160,0.08)',
        }}
      >
        <h4
          style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            color: 'var(--bg-deep-navy)',
            marginBottom: '8px',
          }}
        >
          Explore jobs at companies with strong care infrastructure
        </h4>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            color: 'var(--text-secondary)',
            marginBottom: '16px',
            lineHeight: 1.6,
          }}
        >
          RemoteShe helps you find remote roles at companies evaluated through Carefolio.
        </p>
        <button
          onClick={handleRemoteSheClick}
          className="flex items-center gap-2 rounded-full px-5 py-2.5 cursor-pointer transition-all duration-200 border-0"
          style={{
            background: '#6B3FA0',
            color: 'white',
            fontFamily: "'Inter', sans-serif",
            fontSize: '14px',
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5a3385';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#6B3FA0';
          }}
        >
          Browse jobs
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  // Footer Ecosystem variant - Very subtle
  if (variant === 'footer-ecosystem') {
    return (
      <div
        className={`text-center ${className}`}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: 'var(--text-secondary)',
        }}
      >
        <p style={{ marginBottom: '8px', opacity: 0.8 }}>
          Carefolio is part of the{' '}
          <a
            href="https://momops.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#6B3FA0', textDecoration: 'none' }}
            className="hover:underline"
          >
            MomOps ecosystem
          </a>
          .
        </p>
        <div style={{ fontSize: '12px', opacity: 0.6 }}>
          <span style={{ fontWeight: 500 }}>Tools in this ecosystem:</span>
          <br />
          <a
            href="https://remoteshe.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
            className="hover:underline"
          >
            RemoteShe
          </a>
          {' – remote job discovery · '}
          <span style={{ color: '#6B3FA0' }}>Carefolio</span>
          {' – workplace care intelligence'}
        </div>
      </div>
    );
  }

  return null;
}
