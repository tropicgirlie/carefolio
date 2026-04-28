import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutGrid, List, ChevronDown, Eye, EyeOff, ArrowUpRight, Send, Cpu } from 'lucide-react';
import { RemoteSheIntegration } from './RemoteSheIntegration';

// ─── Types ───
interface CompanyData {
  name: string;
  ticker: string;
  sector: string;
  leaveWeeks: string;
  leaveNum: number;
  perks: string[];
  deiStatus: 'Maintained' | 'Strengthened' | 'Rolled back';
  price: string;
  range52: [number, number, number]; // [low, current, high]
  note: string;
  careersUrl: string;
  reskilling: boolean;
}

// ─── Data ───
const COMPANIES: CompanyData[] = [
  { name: 'Netflix', ticker: 'NFLX', sector: 'Entertainment/Tech', leaveWeeks: '52', leaveNum: 52, perks: ['Equal paternity', 'Flexible usage', 'Mental health days'], deiStatus: 'Maintained', price: '~$97', range52: [65, 97, 120], note: 'Most generous in the industry. Most take 4–8 months in practice.', careersUrl: 'https://jobs.netflix.com', reskilling: false },
  { name: 'Spotify', ticker: 'SPOT', sector: 'Tech/Media', leaveWeeks: '24', leaveNum: 24, perks: ['Childcare stipend', 'Remote-first', 'Parenting support'], deiStatus: 'Maintained', price: '~$540', range52: [380, 540, 620], note: 'Work From Anywhere. Swedish-culture roots. Eligible from day one.', careersUrl: 'https://www.lifeatspotify.com/jobs', reskilling: false },
  { name: 'Shopify', ticker: 'SHOP', sector: 'Tech/E-commerce', leaveWeeks: '26', leaveNum: 26, perks: ['Remote-first', 'Usable until child age 3'], deiStatus: 'Maintained', price: '~$97', range52: [52, 97, 115], note: "Can take leave any time until child's 3rd birthday.", careersUrl: 'https://www.shopify.com/careers', reskilling: false },
  { name: 'Salesforce', ticker: 'CRM', sector: 'Enterprise Software', leaveWeeks: '16–26', leaveNum: 21, perks: ['Fertility benefits', 'Adoption aid', 'Ohana culture'], deiStatus: 'Maintained', price: '~$199', range52: [155, 199, 260], note: 'Policy varies by role and region. Confirm scope before applying.', careersUrl: 'https://www.salesforce.com/company/careers', reskilling: true },
  { name: 'Microsoft', ticker: 'MSFT', sector: 'Tech/Cloud/AI', leaveWeeks: '20', leaveNum: 20, perks: ['Gender pay audit', 'Equal paternity'], deiStatus: 'Maintained', price: '~$404', range52: [310, 404, 460], note: 'Non-birth parent gets 12 weeks. Consistent inclusion reporting.', careersUrl: 'https://careers.microsoft.com', reskilling: true },
  { name: 'Cisco', ticker: 'CSCO', sector: 'Networking/AI Infra', leaveWeeks: '26+', leaveNum: 26, perks: ['Day care support', 'Phased return', "Mothers' rooms"], deiStatus: 'Maintained', price: '~$75', range52: [52, 75, 82], note: '#1 Best Workplace for Parents (Fortune) every year since 2020.', careersUrl: 'https://jobs.cisco.com', reskilling: true },
  { name: 'Adobe', ticker: 'ADBE', sector: 'Creative Software', leaveWeeks: '16', leaveNum: 16, perks: ['Gender pay audit', 'PTO top score'], deiStatus: 'Maintained', price: '~$387', range52: [340, 387, 490], note: 'Solid but less generous than peers on leave duration.', careersUrl: 'https://www.adobe.com/careers.html', reskilling: true },
  { name: 'NVIDIA', ticker: 'NVDA', sector: 'Semiconductors', leaveWeeks: '22', leaveNum: 22, perks: ['Concierge caregiver', 'Return flex-time', "Mothers' rooms"], deiStatus: 'Maintained', price: '~$176', range52: [108, 176, 210], note: "Non-birth parent: 12 weeks + 8 weeks flex. Strong operational support.", careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers', reskilling: true },
  { name: 'Etsy', ticker: 'ETSY', sector: 'E-commerce', leaveWeeks: '26', leaveNum: 26, perks: ['All family structures included'], deiStatus: 'Maintained', price: '~$55', range52: [42, 55, 78], note: 'Explicit inclusion for all parenting arrangements.', careersUrl: 'https://www.etsy.com/careers', reskilling: false },
  { name: 'KPMG', ticker: 'Private', sector: 'Professional Services', leaveWeeks: '52', leaveNum: 52, perks: ['Fertility leave', 'Miscarriage leave', 'Fertility appts paid'], deiStatus: 'Maintained', price: 'N/A', range52: [0, 0, 0], note: 'Matches Netflix. Private company, no stock data. Gold standard.', careersUrl: 'https://kpmg.com/careers', reskilling: true },
  { name: 'HPE', ticker: 'HPE', sector: 'Tech Infrastructure', leaveWeeks: '26', leaveNum: 26, perks: ['Flexible work', 'Inclusion programs'], deiStatus: 'Maintained', price: '~$20', range52: [15, 20, 24], note: 'Steady performer on policy; quieter on DEI communications.', careersUrl: 'https://careers.hpe.com', reskilling: false },
];

const SECTORS = ['All', 'Tech', 'Enterprise Software', 'Media', 'Services'];

const SORT_OPTIONS = [
  { value: 'leave', label: 'Leave weeks' },
  { value: 'dei', label: 'DEI strength' },
  { value: 'stock', label: 'Stock momentum' },
] as const;

type SortOption = typeof SORT_OPTIONS[number]['value'];

const ETF_DATA = [
  { name: 'SPDR MSCI USA Gender Diversity ETF', ticker: 'SHE', desc: 'Tracks US companies with gender-diverse leadership.', note: 'AUM ~$300M. Holds ~170 names.', url: 'https://www.ssga.com/us/en/intermediary/etfs/state-street-spdr-msci-usa-gender-diversity-etf-she' },
  { name: 'MSCI World Women\'s Leadership Index', ticker: 'INDEX', desc: 'Benchmark for companies meeting gender diversity criteria.', note: 'Not directly investable - reference only.', url: 'https://www.msci.com/indexes/index/710363' },
  { name: 'Mackenzie Global Women\'s Leadership ETF', ticker: 'MWMN', desc: 'TSX-listed ETF focused on global female leadership.', note: 'Canadian-listed. ~0.6% MER.', url: 'https://www.barchart.com/etfs-funds/quotes/MWMN.NE/profile' },
];

// ─── Helpers ───
function leaveColor(weeks: number): string {
  if (weeks >= 24) return '#2BAE66';
  if (weeks >= 16) return '#D4A017';
  return '#B84040';
}

function leaveBg(weeks: number): string {
  if (weeks >= 24) return 'rgba(43,174,102,0.1)';
  if (weeks >= 16) return 'rgba(212,160,23,0.1)';
  return 'rgba(184,64,64,0.1)';
}

function deiBadgeStyle(status: string) {
  if (status === 'Strengthened') return { bg: 'rgba(43,174,102,0.1)', color: '#2BAE66', dot: '#2BAE66' };
  if (status === 'Rolled back') return { bg: 'rgba(184,64,64,0.1)', color: '#B84040', dot: '#B84040' };
  return { bg: 'rgba(107,63,160,0.08)', color: '#6B3FA0', dot: '#6B3FA0' };
}

function matchesSector(company: CompanyData, sector: string): boolean {
  if (sector === 'All') return true;
  const s = company.sector.toLowerCase();
  if (sector === 'Tech') return s.includes('tech') || s.includes('software') || s.includes('semi') || s.includes('cloud');
  if (sector === 'Enterprise Software') return s.includes('enterprise') || s.includes('software');
  if (sector === 'Media') return s.includes('media') || s.includes('entertainment');
  if (sector === 'Services') return s.includes('services') || s.includes('infrastructure') || s.includes('networking');
  return false;
}

// ─── Component ───
export function WorkThatWorksForYou() {
  const [activeSector, setActiveSector] = useState('All');
  const [showStock, setShowStock] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('leave');
  // Default to cards on mobile, table on desktop
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) setViewMode('cards');
  }, []);

  const filtered = useMemo(() => {
    let list = COMPANIES.filter(c => matchesSector(c, activeSector));
    list.sort((a, b) => {
      if (sortBy === 'leave') return b.leaveNum - a.leaveNum;
      if (sortBy === 'stock') {
        const aPrice = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 0;
        const bPrice = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 0;
        return bPrice - aPrice;
      }
      return 0; // dei — all maintained currently
    });
    return list;
  }, [activeSector, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden pt-20 pb-14 lg:pt-24 lg:pb-16">
        {/* Background mesh — same style as landing */}
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,63,160,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(43,174,102,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(107,63,160,0.04) 0%, transparent 50%)'
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(107,63,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,63,160,1) 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />
        </div>

        <div className="mx-auto max-w-[1200px] px-6">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="mb-6"
            >
              <div
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 backdrop-blur-sm"
                style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.12)' }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2BAE66' }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: '#6B3FA0' }}>
                  CAREER INTELLIGENCE · MARCH 2026
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--bg-deep-navy)',
              }}
              className="mb-5"
            >
              Work That Works{' '}
              <span style={{ color: 'var(--fintech-feminine-purple)' }}>For&nbsp;You</span>.
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(0.938rem, 1.3vw, 1.125rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '580px',
              }}
              className="mb-4"
            >
              The companies worth your expertise are the ones that designed for your whole life. We track parental leave, fertility support, DEI commitments, and remote flexibility so you don't have to dig through HR FAQs.
            </motion.p>

            {/* Contextual note */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.6 }}
            >
              Data compiled March 2026. Not investment advice. Verify policies before applying.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── Filter Bar ─── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-lg border-b" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Sector chips */}
            <div className="flex items-center gap-2 flex-wrap">
              {SECTORS.map(sector => (
                <button
                  key={sector}
                  onClick={() => setActiveSector(sector)}
                  className="rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200 border-0"
                  style={{
                    background: activeSector === sector ? '#6B3FA0' : 'rgba(0,0,0,0.04)',
                    color: activeSector === sector ? 'white' : 'var(--text-secondary)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                  }}
                >
                  {sector}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              {/* Stock toggle */}
              <button
                onClick={() => setShowStock(!showStock)}
                className="flex items-center gap-1.5 rounded-full px-3 py-1.5 cursor-pointer transition-all duration-200 border-0"
                style={{
                  background: showStock ? 'rgba(43,174,102,0.08)' : 'rgba(0,0,0,0.04)',
                  color: showStock ? '#2BAE66' : 'var(--text-secondary)',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              >
                {showStock ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden xs:inline sm:inline">Stock data</span>
              </button>

              {/* Sort */}
              <div className="relative flex items-center gap-1.5">
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)' }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="rounded-lg px-2 py-1 cursor-pointer border-0 appearance-none pr-6"
                  style={{
                    background: 'rgba(0,0,0,0.04)',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    fontWeight: 500,
                    color: 'var(--bg-deep-navy)',
                  }}
                >
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="w-3 h-3 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>

              {/* View toggle */}
              <div className="flex items-center rounded-lg overflow-hidden" style={{ background: 'rgba(0,0,0,0.04)' }}>
                <button
                  onClick={() => setViewMode('table')}
                  className="p-2 cursor-pointer border-0 transition-all duration-200"
                  style={{ background: viewMode === 'table' ? '#6B3FA0' : 'transparent', color: viewMode === 'table' ? 'white' : 'var(--text-secondary)' }}
                  aria-label="Table view"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className="p-2 cursor-pointer border-0 transition-all duration-200"
                  style={{ background: viewMode === 'cards' ? '#6B3FA0' : 'transparent', color: viewMode === 'cards' ? 'white' : 'var(--text-secondary)' }}
                  aria-label="Card view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Data Grid ─── */}
      <section className="mx-auto max-w-[1200px] px-6 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px', color: 'var(--text-secondary)' }}>
              Nothing here matches your filters. That's actually useful data.
            </p>
          </div>
        ) : viewMode === 'table' ? (
          <TableView companies={filtered} showStock={showStock} hoveredRow={hoveredRow} setHoveredRow={setHoveredRow} />
        ) : (
          <CardGrid companies={filtered} showStock={showStock} />
        )}

        {/* RemoteShe Integration - Company Ranking */}
        {filtered.length > 0 && (
          <RemoteSheIntegration variant="company-ranking" className="mt-10" />
        )}
      </section>

      {/* ─── ETF / Investor View ─── */}
      <section className="border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-4"
                style={{ background: 'rgba(107,63,160,0.06)', border: '1px solid rgba(107,63,160,0.12)' }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: '#6B3FA0' }}>
                  ALIGNED INVESTING
                </span>
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: 'var(--bg-deep-navy)',
              }}
              className="mb-2"
            >
              If You're Also Investing In Alignment
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '520px', lineHeight: 1.6 }} className="mb-8">
              ETFs and indices that centre gender diversity and women's leadership.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            {ETF_DATA.map((etf, i) => (
              <motion.div
                key={etf.ticker}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl p-5 transition-all duration-200 cursor-default"
                style={{
                  background: 'rgba(0,0,0,0.02)',
                  border: '1px solid rgba(0,0,0,0.05)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,63,160,0.2)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(107,63,160,0.06)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: '#6B3FA0' }}>
                    {etf.ticker}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: 'var(--bg-deep-navy)', lineHeight: 1.4 }} className="mb-2">
                  {etf.name}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }} className="mb-3">
                  {etf.desc}
                </p>
                <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: 'var(--text-secondary)', opacity: 0.7 }}>
                  {etf.note}
                </p>
                <a
                  href={etf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 no-underline transition-opacity duration-200 hover:opacity-80"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#6B3FA0' }}
                >
                  Learn more <ArrowUpRight className="w-3 h-3" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
            <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.5 }}>
              This is not investment advice. Past performance does not predict future returns.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <section className="border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
        <div className="mx-auto max-w-[1200px] px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.7 }}>
            Policies change. DEI commitments get rolled back. Check current HR documentation and Glassdoor reviews before accepting an offer. Use this as a starting point, not a final answer.
          </p>
          <button
            className="flex items-center gap-2 rounded-full px-5 py-2.5 cursor-pointer transition-all duration-200 border hover:scale-[1.02]"
            style={{ borderColor: 'rgba(107,63,160,0.2)', color: '#6B3FA0', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(107,63,160,0.04)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <Send className="w-3.5 h-3.5" />
            Submit a company
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── Table View ───
function TableView({ companies, showStock, hoveredRow, setHoveredRow }: {
  companies: CompanyData[];
  showStock: boolean;
  hoveredRow: string | null;
  setHoveredRow: (v: string | null) => void;
}) {
  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
        <thead>
          <tr>
            {['Company', 'Sector', 'Leave', 'Key Perks', 'DEI', ...(showStock ? ['Price', '52w Range'] : []), 'Notes'].map(h => (
              <th
                key={h}
                className="text-left py-3 px-3 border-b"
                style={{ borderColor: 'rgba(0,0,0,0.06)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text-secondary)', textTransform: 'uppercase' as const }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {companies.map((c, i) => {
              const isHovered = hoveredRow === c.ticker;
              const dei = deiBadgeStyle(c.deiStatus);
              return (
                <motion.tr
                  key={c.ticker}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="transition-colors duration-150 group"
                  style={{ background: isHovered ? 'rgba(107,63,160,0.03)' : 'transparent' }}
                  onMouseEnter={() => setHoveredRow(c.ticker)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  {/* Company */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(107,63,160,0.08)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', fontWeight: 700, color: '#6B3FA0' }}
                      >
                        {c.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--bg-deep-navy)' }}>
                          {c.name}
                        </div>
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)' }}>
                          {c.ticker}
                        </div>
                      </div>
                      {/* Always visible CTA */}
                      <motion.a
                        href={c.careersUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 1 }}
                        className="ml-auto flex items-center gap-1 rounded-full px-2.5 py-1 no-underline"
                        style={{ background: '#2BAE66', color: 'white', fontSize: '11px', fontWeight: 500, fontFamily: "'Inter', sans-serif", whiteSpace: 'nowrap' as const }}
                      >
                        View roles <ArrowUpRight className="w-3 h-3" />
                      </motion.a>
                    </div>
                    {/* Reskilling badge */}
                    {c.reskilling && (
                      <div className="mt-1.5 flex items-center gap-1" style={{ paddingLeft: '44px' }}>
                        <Cpu className="w-3 h-3" style={{ color: '#6B3FA0' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 500, color: '#6B3FA0' }}>
                          Reskilling / upskilling programs
                        </span>
                      </div>
                    )}
                  </td>

                  {/* Sector */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {c.sector}
                    </span>
                  </td>

                  {/* Leave weeks */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    <span
                      className="inline-flex items-center rounded-lg px-3 py-1"
                      style={{ background: leaveBg(c.leaveNum), fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', fontWeight: 600, color: leaveColor(c.leaveNum), fontFeatureSettings: "'tnum' 1" }}
                    >
                      {c.leaveWeeks}
                      <span style={{ fontSize: '11px', fontWeight: 400, marginLeft: '4px', opacity: 0.7 }}>wk</span>
                    </span>
                  </td>

                  {/* Perks */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    <div className="flex flex-wrap gap-1.5">
                      {c.perks.slice(0, 2).map(p => (
                        <span
                          key={p}
                          className="inline-block rounded-full px-2.5 py-0.5"
                          style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' as const }}
                        >
                          {p}
                        </span>
                      ))}
                      {c.perks.length > 2 && (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.5 }}>
                          +{c.perks.length - 2}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* DEI */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1"
                      style={{ background: dei.bg, fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: dei.color }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: dei.dot }} />
                      {c.deiStatus}
                    </span>
                  </td>

                  {/* Stock columns */}
                  {showStock && (
                    <>
                      <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: c.price === 'N/A' ? 'var(--text-secondary)' : 'var(--bg-deep-navy)', fontWeight: 500, fontFeatureSettings: "'tnum' 1", opacity: c.price === 'N/A' ? 0.4 : 1 }}>
                          {c.price}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                        {c.range52[2] > 0 ? <RangeBar low={c.range52[0]} current={c.range52[1]} high={c.range52[2]} /> : (
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.4 }}>n/a</span>
                        )}
                      </td>
                    </>
                  )}

                  {/* Notes */}
                  <td className="py-3.5 px-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.04)', maxWidth: '200px' }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5, display: 'block' }}>
                      {c.note}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}

// ─── Range Bar ───
function RangeBar({ low, current, high }: { low: number; current: number; high: number }) {
  const pct = ((current - low) / (high - low)) * 100;
  return (
    <div className="flex items-center gap-2" style={{ minWidth: '100px' }}>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text-secondary)' }}>{low}</span>
      <div className="flex-1 h-1.5 rounded-full bg-gray-100 relative">
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
          style={{ left: `${pct}%`, transform: `translateX(-50%) translateY(-50%)`, background: '#6B3FA0' }}
        />
      </div>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '10px', color: 'var(--text-secondary)' }}>{high}</span>
    </div>
  );
}

// ─── Card Grid ───
function CardGrid({ companies, showStock }: { companies: CompanyData[]; showStock: boolean }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((c, i) => {
        const dei = deiBadgeStyle(c.deiStatus);
        return (
          <motion.div
            key={c.ticker}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-xl p-5 transition-all duration-200 group cursor-default"
            style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(107,63,160,0.2)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(107,63,160,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(107,63,160,0.08)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 700, color: '#6B3FA0' }}
                >
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, color: 'var(--bg-deep-navy)' }}>
                    {c.name}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {c.ticker} · {c.sector}
                  </div>
                </div>
              </div>
              {/* Leave badge */}
              <span
                className="rounded-lg px-3 py-1.5"
                style={{ background: leaveBg(c.leaveNum), fontFamily: "'IBM Plex Mono', monospace", fontSize: '18px', fontWeight: 600, color: leaveColor(c.leaveNum), fontFeatureSettings: "'tnum' 1" }}
              >
                {c.leaveWeeks}
                <span style={{ fontSize: '11px', fontWeight: 400, marginLeft: '2px', opacity: 0.7 }}>wk</span>
              </span>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {c.perks.map(p => (
                <span key={p} className="inline-block rounded-full px-2.5 py-0.5" style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>
                  {p}
                </span>
              ))}
            </div>

            {/* DEI + Stock */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ background: dei.bg, fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: dei.color }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: dei.dot }} />
                {c.deiStatus}
              </span>
              {showStock && (
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: c.price === 'N/A' ? 'var(--text-secondary)' : 'var(--bg-deep-navy)', fontWeight: 500, fontFeatureSettings: "'tnum' 1", opacity: c.price === 'N/A' ? 0.4 : 1 }}>
                  {c.price}
                </span>
              )}
            </div>

            {/* Note */}
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6 }} className="mb-3">
              {c.note}
            </p>

            {/* Hover CTA */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <a
                href={c.careersUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 no-underline transition-all duration-200"
                style={{ background: '#2BAE66', color: 'white', fontSize: '12px', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}
              >
                View open roles <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}