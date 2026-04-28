import { motion } from 'motion/react';
import { Download, ArrowRight, FileBarChart } from 'lucide-react';

interface CareEconomyReportBannerProps {
  variant?: 'hero' | 'inline';
}

export function CareEconomyReportBanner({ variant = 'inline' }: CareEconomyReportBannerProps) {
  const handleDownload = () => {
    // Opens waitlist - report is delivered via newsletter
    window.open('https://carefolio.beehiiv.com/', '_blank');
  };

  if (variant === 'hero') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(107,63,160,0.92) 0%, rgba(43,174,102,0.85) 100%)',
        }}
      >
        <div className="px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.15)' }}
            >
              <FileBarChart className="w-7 h-7 text-white" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  color: 'rgba(255,255,255,0.7)',
                  marginBottom: '6px',
                }}
              >
                FREE DOWNLOAD · 2026
              </div>
              <h3
                style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  color: 'white',
                  lineHeight: 1.25,
                  marginBottom: '6px',
                }}
              >
                The 2026 Care Economy Report
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                  maxWidth: '420px',
                }}
              >
                Which S&P 500 companies are winning the care race, who's falling behind, 
                and what it means for your portfolio in 2026.
              </p>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center gap-2.5 rounded-full px-6 py-3 transition-all duration-200 hover:scale-[1.03] flex-shrink-0 border-0 cursor-pointer"
            style={{
              background: 'white',
              color: '#6B3FA0',
              fontFamily: "'Inter', sans-serif",
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <Download className="w-4 h-4" />
            Get the report
          </button>
        </div>
      </motion.div>
    );
  }

  // Inline variant — compact banner
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
      className="rounded-xl px-5 py-4 flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer"
      style={{
        background: 'rgba(107,63,160,0.05)',
        border: '1px solid rgba(107,63,160,0.15)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(107,63,160,0.08)';
        e.currentTarget.style.borderColor = 'rgba(107,63,160,0.25)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(107,63,160,0.05)';
        e.currentTarget.style.borderColor = 'rgba(107,63,160,0.15)';
      }}
      onClick={handleDownload}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(107,63,160,0.1)' }}
        >
          <FileBarChart className="w-4 h-4" style={{ color: '#6B3FA0' }} />
        </div>
        <div>
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#6B3FA0',
              display: 'block',
            }}
          >
            FREE · 2026 ANNUAL REPORT
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--bg-deep-navy)',
            }}
          >
            The Care Economy Report, download now
          </span>
        </div>
      </div>
      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: '#6B3FA0' }} />
    </motion.div>
  );
}