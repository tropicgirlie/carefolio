import { motion } from 'motion/react';
import { Shield, FileText, BarChart3, Database, Globe, CheckCircle2, Users } from 'lucide-react';

const DATA_SOURCES = [
  {
    icon: FileText,
    name: 'SEC EDGAR',
    desc: 'Annual reports & proxy filings',
    color: '#2BAE66',
  },
  {
    icon: Users,
    name: 'EEO-1 Reports',
    desc: 'Federal workforce diversity data',
    color: '#6B3FA0',
  },
  {
    icon: BarChart3,
    name: 'Glassdoor',
    desc: 'Aggregated employee sentiment',
    color: '#F25C05',
  },
  {
    icon: Globe,
    name: 'EU Transparency Reg.',
    desc: 'Mandatory pay equity disclosures',
    color: '#2BAE66',
  },
  {
    icon: Database,
    name: 'Company CSR Reports',
    desc: 'Self-reported benefit data',
    color: '#6B3FA0',
  },
  {
    icon: Shield,
    name: 'Third-Party Audits',
    desc: 'Independent verification partners',
    color: '#F25C05',
  },
];

const TRUST_BADGES = [
  { label: 'WCAG AAA', desc: 'Accessibility' },
  { label: 'GDPR', desc: 'Compliant' },
  { label: 'Open Data', desc: 'Methodology' },
  { label: 'Verified', desc: 'Sources' },
];

export function TrustSignalsSection() {
  return (
    <section
      className="py-16 lg:py-20 border-t"
      style={{ borderColor: 'rgba(0,0,0,0.05)' }}
      aria-labelledby="trust-signals-heading"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-6"
            style={{
              background: 'rgba(43,174,102,0.06)',
              border: '1px solid rgba(43,174,102,0.12)',
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6B3FA0' }} />
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                color: '#6B3FA0',
              }}
            >
              DATA PROVENANCE · FULLY TRANSPARENT
            </span>
          </div>

          <h2
            id="trust-signals-heading"
            style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: 'var(--bg-deep-navy)',
              marginBottom: '12px',
            }}
          >
            Scores you can actually trust
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '15px',
              color: 'var(--text-secondary)',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Unlike vague ESG ratings, every Care Score is traceable to publicly
            available, legally mandated data sources.
          </p>
        </motion.div>

        {/* Data source grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {DATA_SOURCES.map((source, i) => {
            const Icon = source.icon;
            return (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                className="flex items-center gap-4 rounded-xl p-4 transition-all duration-200"
                style={{
                  border: '1px solid rgba(0,0,0,0.05)',
                  background: 'rgba(255,255,255,0.8)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${source.color}30`;
                  e.currentTarget.style.boxShadow = `0 4px 16px ${source.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${source.color}12` }}
                >
                  <Icon className="w-5 h-5" style={{ color: source.color }} />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--bg-deep-navy)',
                    }}
                  >
                    {source.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {source.desc}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {TRUST_BADGES.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full px-4 py-2"
              style={{
                background: 'rgba(43,174,102,0.06)',
                border: '1px solid rgba(43,174,102,0.12)',
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5" style={{ color: '#2BAE66' }} />
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#2BAE66',
                  letterSpacing: '0.04em',
                }}
              >
                {badge.label}
              </span>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '11px',
                  color: 'var(--text-secondary)',
                }}
              >
                {badge.desc}
              </span>
            </div>
          ))}
          <a
            href="/methodology"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 500,
              color: '#6B3FA0',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = 'none'; }}
          >
            View full methodology →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
