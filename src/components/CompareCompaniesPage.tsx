import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowUpRight, Share2, BarChart3, Heart, Shield, Users, Baby, Leaf } from 'lucide-react';
import { CareEconomyReportBanner } from './CareEconomyReportBanner';

// ─── Types ───
interface CompanyProfile {
  symbol: string;
  name: string;
  sector: string;
  careScore: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  metrics: {
    parentalLeave: number;
    childcareSupport: number;
    womenLeadership: number;
    healthBenefits: number;
    harmOffset: number;
    payEquity: number;
  };
  leaveWeeks: string;
  deiStrength: 'Strong' | 'Moderate' | 'Weak';
  reskilling: boolean;
  color: string;
  careersUrl: string;
}

const COMPANIES: CompanyProfile[] = [
  {
    symbol: 'CRM', name: 'Salesforce', sector: 'Enterprise Software',
    careScore: 89, grade: 'A',
    metrics: { parentalLeave: 92, childcareSupport: 88, womenLeadership: 85, healthBenefits: 90, harmOffset: 5, payEquity: 88 },
    leaveWeeks: '16-26', deiStrength: 'Strong', reskilling: true,
    color: '#0176D3', careersUrl: 'https://www.salesforce.com/company/careers',
  },
  {
    symbol: 'MSFT', name: 'Microsoft', sector: 'Technology',
    careScore: 84, grade: 'A',
    metrics: { parentalLeave: 85, childcareSupport: 80, womenLeadership: 82, healthBenefits: 88, harmOffset: 8, payEquity: 84 },
    leaveWeeks: '20', deiStrength: 'Strong', reskilling: true,
    color: '#00A4EF', careersUrl: 'https://careers.microsoft.com',
  },
  {
    symbol: 'NFLX', name: 'Netflix', sector: 'Entertainment',
    careScore: 83, grade: 'A',
    metrics: { parentalLeave: 96, childcareSupport: 75, womenLeadership: 78, healthBenefits: 85, harmOffset: 6, payEquity: 80 },
    leaveWeeks: '52', deiStrength: 'Moderate', reskilling: false,
    color: '#E50914', careersUrl: 'https://jobs.netflix.com',
  },
  {
    symbol: 'CSCO', name: 'Cisco', sector: 'Networking',
    careScore: 82, grade: 'A',
    metrics: { parentalLeave: 88, childcareSupport: 85, womenLeadership: 80, healthBenefits: 84, harmOffset: 7, payEquity: 82 },
    leaveWeeks: '26+', deiStrength: 'Strong', reskilling: true,
    color: '#049FD9', careersUrl: 'https://jobs.cisco.com',
  },
  {
    symbol: 'SPOT', name: 'Spotify', sector: 'Tech/Media',
    careScore: 81, grade: 'A',
    metrics: { parentalLeave: 86, childcareSupport: 82, womenLeadership: 79, healthBenefits: 80, harmOffset: 6, payEquity: 78 },
    leaveWeeks: '24', deiStrength: 'Strong', reskilling: false,
    color: '#1DB954', careersUrl: 'https://www.lifeatspotify.com/jobs',
  },
  {
    symbol: 'ADBE', name: 'Adobe', sector: 'Creative Software',
    careScore: 78, grade: 'B',
    metrics: { parentalLeave: 78, childcareSupport: 74, womenLeadership: 80, healthBenefits: 82, harmOffset: 9, payEquity: 85 },
    leaveWeeks: '16', deiStrength: 'Strong', reskilling: true,
    color: '#FF0000', careersUrl: 'https://www.adobe.com/careers.html',
  },
  {
    symbol: 'NVDA', name: 'NVIDIA', sector: 'Semiconductors',
    careScore: 76, grade: 'B',
    metrics: { parentalLeave: 82, childcareSupport: 70, womenLeadership: 65, healthBenefits: 85, harmOffset: 10, payEquity: 72 },
    leaveWeeks: '22', deiStrength: 'Moderate', reskilling: true,
    color: '#76B900', careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers',
  },
  {
    symbol: 'SHOP', name: 'Shopify', sector: 'E-commerce',
    careScore: 74, grade: 'B',
    metrics: { parentalLeave: 80, childcareSupport: 72, womenLeadership: 70, healthBenefits: 76, harmOffset: 8, payEquity: 74 },
    leaveWeeks: '26', deiStrength: 'Moderate', reskilling: false,
    color: '#96BF48', careersUrl: 'https://www.shopify.com/careers',
  },
  {
    symbol: 'ETSY', name: 'Etsy', sector: 'E-commerce',
    careScore: 72, grade: 'B',
    metrics: { parentalLeave: 80, childcareSupport: 68, womenLeadership: 72, healthBenefits: 74, harmOffset: 9, payEquity: 70 },
    leaveWeeks: '26', deiStrength: 'Moderate', reskilling: false,
    color: '#F16521', careersUrl: 'https://www.etsy.com/careers',
  },
  {
    symbol: 'AAPL', name: 'Apple', sector: 'Technology',
    careScore: 65, grade: 'C',
    metrics: { parentalLeave: 70, childcareSupport: 62, womenLeadership: 60, healthBenefits: 78, harmOffset: 18, payEquity: 68 },
    leaveWeeks: '18', deiStrength: 'Moderate', reskilling: false,
    color: '#555555', careersUrl: 'https://www.apple.com/careers',
  },
  {
    symbol: 'AMZN', name: 'Amazon', sector: 'E-commerce/Cloud',
    careScore: 52, grade: 'C',
    metrics: { parentalLeave: 60, childcareSupport: 50, womenLeadership: 48, healthBenefits: 68, harmOffset: 28, payEquity: 55 },
    leaveWeeks: '20', deiStrength: 'Weak', reskilling: true,
    color: '#FF9900', careersUrl: 'https://www.amazon.jobs',
  },
  {
    symbol: 'META', name: 'Meta', sector: 'Social Media',
    careScore: 58, grade: 'C',
    metrics: { parentalLeave: 65, childcareSupport: 60, womenLeadership: 52, healthBenefits: 70, harmOffset: 30, payEquity: 58 },
    leaveWeeks: '20', deiStrength: 'Weak', reskilling: false,
    color: '#0866FF', careersUrl: 'https://www.metacareers.com',
  },
  {
    symbol: 'UBER', name: 'Uber', sector: 'Mobility',
    careScore: 41, grade: 'D',
    metrics: { parentalLeave: 45, childcareSupport: 38, womenLeadership: 42, healthBenefits: 55, harmOffset: 38, payEquity: 45 },
    leaveWeeks: '16', deiStrength: 'Weak', reskilling: false,
    color: '#000000', careersUrl: 'https://www.uber.com/us/en/careers',
  },
];

const METRICS = [
  { key: 'parentalLeave', label: 'Parental Leave', icon: Baby, color: '#2BAE66' },
  { key: 'childcareSupport', label: 'Childcare Support', icon: Heart, color: '#6B3FA0' },
  { key: 'womenLeadership', label: 'Women in Leadership', icon: Users, color: '#2BAE66' },
  { key: 'healthBenefits', label: 'Health Benefits', icon: Shield, color: '#6B3FA0' },
  { key: 'payEquity', label: 'Pay Equity', icon: BarChart3, color: '#2BAE66' },
  { key: 'harmOffset', label: 'Harm Offset (lower = better)', icon: Leaf, color: '#FF6B6B', invert: true },
] as const;

type MetricKey = typeof METRICS[number]['key'];

function gradeColor(grade: string) {
  const map: Record<string, string> = { A: '#2BAE66', B: '#6B3FA0', C: '#D4A017', D: '#FF6B6B', E: '#B84040' };
  return map[grade] || '#666';
}

function scoreColor(score: number) {
  if (score >= 80) return '#2BAE66';
  if (score >= 65) return '#6B3FA0';
  if (score >= 50) return '#D4A017';
  return '#FF6B6B';
}

export function CompareCompaniesPage() {
  const [selected, setSelected] = useState<string[]>(['CRM', 'MSFT']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const selectedCompanies = useMemo(
    () => selected.map(s => COMPANIES.find(c => c.symbol === s)!).filter(Boolean),
    [selected],
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return COMPANIES;
    const q = searchQuery.toLowerCase();
    return COMPANIES.filter(
      c => c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const addCompany = (symbol: string) => {
    if (selected.includes(symbol)) return;
    if (selected.length >= 3) {
      setSelected(prev => [...prev.slice(1), symbol]);
    } else {
      setSelected(prev => [...prev, symbol]);
    }
    setShowSearch(false);
    setSearchQuery('');
  };

  const removeCompany = (symbol: string) => {
    setSelected(prev => prev.filter(s => s !== symbol));
  };

  const handleShare = () => {
    const url = `${window.location.origin}/compare?companies=${selected.join(',')}`;
    navigator.clipboard.writeText(url).catch(() => {});
    alert('Comparison link copied to clipboard!');
  };

  const count = selectedCompanies.length;

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden pt-20 pb-10 lg:pt-24 lg:pb-14"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,63,160,0.07) 0%, transparent 60%)',
        }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mb-4">
            <div
              className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-5"
              style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.12)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2BAE66' }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: '#6B3FA0' }}>
                COMPANY COMPARISON TOOL
              </span>
            </div>

            <h1
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                color: 'var(--bg-deep-navy)',
                marginBottom: '10px',
              }}
            >
              Compare Care Scores{' '}
              <span style={{ color: '#6B3FA0' }}>side by side</span>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.65 }}>
              Stack up to 3 companies. Useful when you have an offer, or when you are deciding where to put your money.
            </p>
          </div>

          {/* Company selector */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            {selectedCompanies.map((company) => (
              <motion.div
                key={company.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 rounded-full pl-3 pr-2 py-2"
                style={{ background: 'white', border: `1.5px solid ${company.color}30`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
              >
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white flex-shrink-0"
                  style={{ background: company.color, fontSize: '9px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  {company.symbol.slice(0, 2)}
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--bg-deep-navy)' }}>
                  {company.name}
                </span>
                <button
                  onClick={() => removeCompany(company.symbol)}
                  className="w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-150 border-0 cursor-pointer"
                  style={{ background: 'rgba(0,0,0,0.06)', color: 'var(--text-secondary)' }}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}

            {selected.length < 3 && (
              <div className="relative">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 rounded-full px-4 py-2 cursor-pointer transition-all duration-200 border-0"
                  style={{ background: showSearch ? 'rgba(107,63,160,0.06)' : 'rgba(0,0,0,0.03)', border: '1.5px dashed rgba(107,63,160,0.3)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#6B3FA0' }}
                >
                  <Search className="w-3.5 h-3.5" />
                  Add company
                </button>

                <AnimatePresence>
                  {showSearch && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden z-30"
                      style={{ background: 'white', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)', width: 'min(280px, calc(100vw - 48px))' }}
                    >
                      <div className="p-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                        <input
                          autoFocus
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search company or ticker..."
                          className="w-full outline-none border-0 bg-transparent"
                          style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--bg-deep-navy)' }}
                        />
                      </div>
                      <div className="max-h-56 overflow-y-auto py-1">
                        {searchResults
                          .filter(c => !selected.includes(c.symbol))
                          .map((company) => (
                            <button
                              key={company.symbol}
                              onClick={() => addCompany(company.symbol)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 transition-colors duration-150 cursor-pointer border-0 text-left"
                              style={{ background: 'transparent' }}
                              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(107,63,160,0.04)'; }}
                              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                            >
                              <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                                style={{ background: company.color, fontSize: '9px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}
                              >
                                {company.symbol.slice(0, 2)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--bg-deep-navy)' }}>{company.name}</div>
                                <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)' }}>{company.symbol}</div>
                              </div>
                              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: scoreColor(company.careScore) }}>
                                {company.careScore}
                              </span>
                            </button>
                          ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {selected.length >= 2 && (
              <button
                onClick={handleShare}
                className="flex items-center gap-2 rounded-full px-4 py-2 transition-all duration-200 border-0 cursor-pointer"
                style={{ background: 'rgba(43,174,102,0.06)', border: '1px solid rgba(43,174,102,0.12)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: '#2BAE66' }}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share comparison</span>
                <span className="sm:hidden">Share</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ─── Comparison Content ─── */}
      {selectedCompanies.length >= 2 ? (
        <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-16">

          {/* Score overview — horizontal scroll on mobile, grid on md+ */}
          <div className="mb-8">
            {/* Mobile: horizontal scroll */}
            <div className="flex gap-4 overflow-x-auto pb-2 md:hidden snap-x snap-mandatory">
              {selectedCompanies.map((company, i) => (
                <ScoreCard key={company.symbol} company={company} i={i} />
              ))}
            </div>
            {/* md+: responsive grid */}
            <div
              className="hidden md:grid gap-4"
              style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
            >
              {selectedCompanies.map((company, i) => (
                <ScoreCard key={company.symbol} company={company} i={i} />
              ))}
            </div>
          </div>

          {/* Metric-by-metric breakdown */}
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
            <div
              className="px-4 sm:px-6 py-4 border-b"
              style={{ background: 'rgba(0,0,0,0.02)', borderColor: 'rgba(0,0,0,0.06)' }}
            >
              <h2 style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '18px', color: 'var(--bg-deep-navy)' }}>
                Metric breakdown
              </h2>
            </div>

            <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
              {METRICS.map((metric, mi) => {
                const Icon = metric.icon;
                const isInvert = 'invert' in metric && metric.invert;
                return (
                  <motion.div
                    key={metric.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + mi * 0.06 }}
                    className="px-4 sm:px-6 py-5"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-4 h-4" style={{ color: metric.color }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--bg-deep-navy)' }}>
                        {metric.label}
                      </span>
                    </div>

                    {/* Mobile: stacked per-company rows */}
                    <div className="flex flex-col gap-4 sm:hidden">
                      {selectedCompanies.map((company) => {
                        const raw = company.metrics[metric.key as MetricKey] as number;
                        const displayVal = isInvert ? 100 - raw : raw;
                        const barColor = isInvert
                          ? raw <= 10 ? '#2BAE66' : raw <= 20 ? '#D4A017' : '#FF6B6B'
                          : raw >= 80 ? '#2BAE66' : raw >= 65 ? '#6B3FA0' : '#D4A017';
                        return (
                          <div key={company.symbol}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 rounded flex items-center justify-center text-white" style={{ background: company.color, fontSize: '8px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}>
                                  {company.symbol.slice(0, 2)}
                                </div>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)' }}>{company.name}</span>
                              </div>
                              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: barColor, fontFeatureSettings: "'tnum' 1" }}>
                                {raw}
                              </span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: barColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${displayVal}%` }}
                                transition={{ duration: 0.8, delay: 0.5 + mi * 0.05 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* sm+: side-by-side columns */}
                    <div
                      className="hidden sm:grid gap-4"
                      style={{ gridTemplateColumns: `repeat(${count}, 1fr)` }}
                    >
                      {selectedCompanies.map((company) => {
                        const raw = company.metrics[metric.key as MetricKey] as number;
                        const displayVal = isInvert ? 100 - raw : raw;
                        const barColor = isInvert
                          ? raw <= 10 ? '#2BAE66' : raw <= 20 ? '#D4A017' : '#FF6B6B'
                          : raw >= 80 ? '#2BAE66' : raw >= 65 ? '#6B3FA0' : '#D4A017';
                        return (
                          <div key={company.symbol}>
                            <div className="flex items-center justify-between mb-2">
                              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text-secondary)' }}>{company.symbol}</span>
                              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', fontWeight: 600, color: barColor, fontFeatureSettings: "'tnum' 1" }}>{raw}</span>
                            </div>
                            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: barColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${displayVal}%` }}
                                transition={{ duration: 0.8, delay: 0.5 + mi * 0.05 }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <CareEconomyReportBanner variant="inline" />
          </div>
        </section>
      ) : (
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-20 text-center">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'var(--text-secondary)' }}>
            Select at least 2 companies above to start comparing.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Score Card (extracted for reuse in both mobile and desktop layouts) ───
function ScoreCard({ company, i }: { company: CompanyProfile; i: number }) {
  function gradeColor(grade: string) {
    const map: Record<string, string> = { A: '#2BAE66', B: '#6B3FA0', C: '#D4A017', D: '#FF6B6B', E: '#B84040' };
    return map[grade] || '#666';
  }
  function scoreColor(score: number) {
    if (score >= 80) return '#2BAE66';
    if (score >= 65) return '#6B3FA0';
    if (score >= 50) return '#D4A017';
    return '#FF6B6B';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="rounded-2xl p-5 sm:p-6 text-center flex-shrink-0 snap-start"
      style={{
        border: `2px solid ${company.color}20`,
        background: `${company.color}04`,
        // On mobile, fixed card width for horizontal scroll
        minWidth: '220px',
        width: '100%',
      }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-white mx-auto mb-3"
        style={{ background: company.color, fontSize: '11px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {company.symbol.slice(0, 2)}
      </div>
      <h3 style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '17px', color: 'var(--bg-deep-navy)', marginBottom: '2px' }}>
        {company.name}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
        {company.sector}
      </p>

      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '48px', fontWeight: 600, color: scoreColor(company.careScore), lineHeight: 1, fontFeatureSettings: "'tnum' 1", marginBottom: '8px' }}>
        {company.careScore}
      </div>
      <div
        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white mx-auto mb-4"
        style={{ background: gradeColor(company.grade), fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 700 }}
      >
        {company.grade}
      </div>

      <div className="flex justify-center gap-4 text-center mb-4">
        <div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 600, color: '#2BAE66' }}>{company.leaveWeeks}wk</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>Leave</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 600, color: company.deiStrength === 'Strong' ? '#2BAE66' : company.deiStrength === 'Moderate' ? '#D4A017' : '#FF6B6B' }}>
            {company.deiStrength}
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>DEI</div>
        </div>
      </div>

      <a
        href={company.careersUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 no-underline transition-all duration-200 hover:opacity-80"
        style={{ background: '#2BAE66', color: 'white', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500 }}
      >
        View roles <ArrowUpRight className="w-3 h-3" />
      </a>
    </motion.div>
  );
}
