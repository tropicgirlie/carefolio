import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router';
import {
  Heart,
  Briefcase,
  Bell,
  BarChart3,
  Plus,
  X,
  Download,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Star,
  Lock,
  CheckCircle,
  AlertTriangle,
  Info,
  Mail
} from 'lucide-react';
import { mockCompanies, Company } from '../data/companies';

// ─── Types ───
type TabId = 'watchlist' | 'portfolio' | 'alerts' | 'data';

interface WatchlistItem {
  companyId: string;
  addedAt: string;
}

interface PortfolioItem {
  companyId: string;
  weight: number;
}

interface AlertConfig {
  id: string;
  companyId: string;
  type: 'leave-drop' | 'score-change' | 'dei-update' | 'policy-change';
  threshold?: number;
  enabled: boolean;
}

// ─── Mock Historical Data ───
function generateHistoricalData(company: Company) {
  const base = company.care_index.score;
  const quarters = ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'];
  return quarters.map((q, i) => ({
    quarter: q,
    score: Math.max(20, Math.min(100, base + Math.round((Math.random() - 0.45) * 8 * (i + 1) / 3))),
    leaveWeeks: Math.max(4, company.care_metrics.parental_leave.weeks + Math.round((Math.random() - 0.5) * 4)),
    womenLeadership: Math.max(10, Math.min(60, company.care_metrics.women_leadership.percentage + Math.round((Math.random() - 0.5) * 6))),
  }));
}

// ─── Feature Badge ───
function FeatureBadge({ label = 'Feature Preview' }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-[#F5ECFA] text-[#6B3FA0] border border-[#6B3FA0]/20"
      style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 400 }}>
      <Sparkles className="w-3 h-3" />
      {label}
    </span>
  );
}

// ─── Coming Soon Overlay ───
function ComingSoonOverlay({ feature }: { feature: string }) {
  return (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center z-10 p-6">
      <Lock className="w-8 h-8 text-[#6B3FA0] mb-3" />
      <p className="text-[var(--text-primary)] mb-1" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px' }}>
        Coming Soon
      </p>
      <p className="text-[var(--text-secondary)] text-center max-w-xs" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
        {feature} will be available when we launch. Join the waitlist to be first.
      </p>
      <button
        onClick={() => window.open('https://carefolio.beehiiv.com/', '_blank')}
        className="mt-4 flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-200"
        style={{ backgroundColor: '#6B3FA0', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500 }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#5A3188'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#6B3FA0'; }}
      >
        <Mail className="w-4 h-4" />
        Join Waitlist
      </button>
    </div>
  );
}

// ─── Care Score Badge ───
function CareScoreBadge({ score, band }: { score: number; band: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    A: { bg: '#E9F7EF', text: '#2BAE66', border: '#2BAE66' },
    B: { bg: '#E8F5E9', text: '#43A047', border: '#43A047' },
    C: { bg: '#FFF8E1', text: '#F9A825', border: '#F9A825' },
    D: { bg: '#FFF3E0', text: '#EF6C00', border: '#EF6C00' },
    E: { bg: '#FFEBEE', text: '#E53935', border: '#E53935' },
  };
  const c = colors[band] || colors.C;
  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs"
        style={{ backgroundColor: c.bg, color: c.text, border: `1px solid ${c.border}30`, fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, fontSize: '13px' }}>
        {band}
      </span>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 400, fontSize: '14px', fontFeatureSettings: "'tnum' 1", color: c.text }}>
        {score}
      </span>
    </div>
  );
}

// ─── Trend Icon ───
function TrendIcon({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'up') return <TrendingUp className="w-4 h-4 text-[#2BAE66]" />;
  if (trend === 'down') return <TrendingDown className="w-4 h-4 text-[#FF6B6B]" />;
  return <Minus className="w-4 h-4 text-[var(--text-secondary)]" />;
}

// ─── Main Component ───
export function FeaturePreviewDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabId>('watchlist');
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [alerts, setAlerts] = useState<AlertConfig[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddCompany, setShowAddCompany] = useState(false);
  const [selectedHistorical, setSelectedHistorical] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('carefolio-watchlist');
    if (saved) {
      try { setWatchlist(JSON.parse(saved)); } catch { /* ignore */ }
    }
    const savedPortfolio = localStorage.getItem('carefolio-portfolio');
    if (savedPortfolio) {
      try { setPortfolio(JSON.parse(savedPortfolio)); } catch { /* ignore */ }
    }
    // Seed demo alerts
    setAlerts([
      { id: 'a1', companyId: 'nflx', type: 'score-change', threshold: 5, enabled: true },
      { id: 'a2', companyId: 'crm', type: 'leave-drop', threshold: 12, enabled: true },
      { id: 'a3', companyId: 'googl', type: 'dei-update', enabled: false },
    ]);
  }, []);

  // Save watchlist
  useEffect(() => {
    localStorage.setItem('carefolio-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('carefolio-portfolio', JSON.stringify(portfolio));
  }, [portfolio]);

  const toggleWatchlist = (companyId: string) => {
    setWatchlist(prev => {
      const exists = prev.find(w => w.companyId === companyId);
      if (exists) return prev.filter(w => w.companyId !== companyId);
      return [...prev, { companyId, addedAt: new Date().toISOString() }];
    });
  };

  const isWatched = (companyId: string) => watchlist.some(w => w.companyId === companyId);

  const addToPortfolio = (companyId: string) => {
    if (portfolio.find(p => p.companyId === companyId)) return;
    const newWeight = Math.round(100 / (portfolio.length + 1));
    const updated = portfolio.map(p => ({ ...p, weight: newWeight }));
    setPortfolio([...updated, { companyId, weight: newWeight }]);
  };

  const removeFromPortfolio = (companyId: string) => {
    const filtered = portfolio.filter(p => p.companyId !== companyId);
    if (filtered.length === 0) { setPortfolio([]); return; }
    const newWeight = Math.round(100 / filtered.length);
    setPortfolio(filtered.map(p => ({ ...p, weight: newWeight })));
  };

  const isInPortfolio = (companyId: string) => portfolio.some(p => p.companyId === companyId);

  const watchedCompanies = useMemo(() =>
    watchlist.map(w => mockCompanies.find(c => c.id === w.companyId)).filter(Boolean) as Company[],
    [watchlist]
  );

  const portfolioCompanies = useMemo(() =>
    portfolio.map(p => ({ company: mockCompanies.find(c => c.id === p.companyId)!, weight: p.weight })).filter(p => p.company),
    [portfolio]
  );

  const portfolioScore = useMemo(() => {
    if (portfolioCompanies.length === 0) return 0;
    const total = portfolioCompanies.reduce((sum, p) => sum + p.company.care_index.score * (p.weight / 100), 0);
    return Math.round(total);
  }, [portfolioCompanies]);

  const filteredCompanies = useMemo(() => {
    if (!searchQuery) return mockCompanies.slice(0, 20);
    return mockCompanies.filter(c =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.sector.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 20);
  }, [searchQuery]);

  const tabs: { id: TabId; label: string; icon: React.ReactNode; description: string }[] = [
    { id: 'watchlist', label: 'Watchlist', icon: <Heart className="w-4 h-4" />, description: 'Track companies you care about' },
    { id: 'portfolio', label: 'Portfolio Builder', icon: <Briefcase className="w-4 h-4" />, description: 'Build your care portfolio' },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" />, description: 'Stay informed on changes' },
    { id: 'data', label: 'Deeper Data', icon: <BarChart3 className="w-4 h-4" />, description: 'Historical trends & exports' },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFA' }}>
      {/* Hero Header */}
      <div className="border-b border-[var(--outline-variant)]" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-8 lg:pt-28 lg:pb-10">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xs tracking-widest uppercase"
                style={{ color: '#6B3FA0', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 500, letterSpacing: '0.1em' }}>
                Your Dashboard
              </p>
              <FeatureBadge label="Validating Features" />
            </div>
            <h1 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '32px', color: 'var(--text-primary)', lineHeight: 1.2 }}>
              Your <span style={{ color: '#6B3FA0' }}>Care</span> Dashboard
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.6 }}>
              We&apos;re building these features based on what matters to you. Try them out and help us validate what to ship first.
            </p>
            {/* Explore Companies CTA */}
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <button
                onClick={() => navigate('/leaderboard')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #2BAE66 0%, #00C896 100%)',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  height: '44px',
                  boxShadow: '0 2px 8px rgba(43, 174, 102, 0.25)',
                }}
              >
                <Eye className="w-4 h-4" />
                Explore Companies
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/early-access')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all duration-200"
                style={{
                  border: '2px solid #6B3FA0',
                  color: '#6B3FA0',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  height: '44px',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#6B3FA0';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6B3FA0';
                }}
              >
                <Sparkles className="w-4 h-4" />
                Get Early Access
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--outline-variant)] sticky top-[64px] z-30" style={{ backgroundColor: 'white' }}>
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex items-center gap-2 px-4 py-4 whitespace-nowrap transition-colors duration-200"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? 500 : 400,
                  color: activeTab === tab.id ? '#6B3FA0' : 'var(--text-secondary)',
                  borderBottom: activeTab === tab.id ? '2px solid #6B3FA0' : '2px solid transparent',
                  minHeight: '48px'
                }}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.id === 'watchlist' && watchlist.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs text-white"
                    style={{ backgroundColor: '#6B3FA0', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }}>
                    {watchlist.length}
                  </span>
                )}
                {tab.id === 'portfolio' && portfolio.length > 0 && (
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-xs text-white"
                    style={{ backgroundColor: '#2BAE66', fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px' }}>
                    {portfolio.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
          >
            {activeTab === 'watchlist' && (
              <WatchlistTab
                watchedCompanies={watchedCompanies}
                filteredCompanies={filteredCompanies}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showAddCompany={showAddCompany}
                setShowAddCompany={setShowAddCompany}
                toggleWatchlist={toggleWatchlist}
                isWatched={isWatched}
              />
            )}
            {activeTab === 'portfolio' && (
              <PortfolioTab
                portfolioCompanies={portfolioCompanies}
                portfolioScore={portfolioScore}
                filteredCompanies={filteredCompanies}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showAddCompany={showAddCompany}
                setShowAddCompany={setShowAddCompany}
                addToPortfolio={addToPortfolio}
                removeFromPortfolio={removeFromPortfolio}
                isInPortfolio={isInPortfolio}
              />
            )}
            {activeTab === 'alerts' && (
              <AlertsTab alerts={alerts} setAlerts={setAlerts} />
            )}
            {activeTab === 'data' && (
              <DeeperDataTab
                selectedHistorical={selectedHistorical}
                setSelectedHistorical={setSelectedHistorical}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// WATCHLIST TAB
// ═══════════════════════════════════════════════
function WatchlistTab({
  watchedCompanies,
  filteredCompanies,
  searchQuery,
  setSearchQuery,
  showAddCompany,
  setShowAddCompany,
  toggleWatchlist,
  isWatched
}: {
  watchedCompanies: Company[];
  filteredCompanies: Company[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showAddCompany: boolean;
  setShowAddCompany: (v: boolean) => void;
  toggleWatchlist: (id: string) => void;
  isWatched: (id: string) => boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '22px', color: 'var(--text-primary)' }}>
              Your Watchlist
            </h2>
            <FeatureBadge />
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Track companies you care about. Saved locally in your browser.
          </p>
        </div>
        <button
          onClick={() => setShowAddCompany(!showAddCompany)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ backgroundColor: '#2BAE66', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, height: '40px' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#00C896'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#2BAE66'; }}
        >
          {showAddCompany ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddCompany ? 'Close' : 'Add Companies'}
        </button>
      </div>

      {/* Add Company Panel */}
      <AnimatePresence>
        {showAddCompany && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-4"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.08)' }}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search companies by name, ticker, or sector..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--outline-variant)] bg-[#FAFAFA] focus:outline-none focus:border-[#6B3FA0] transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {filteredCompanies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => toggleWatchlist(company.id)}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left"
                    style={{
                      borderColor: isWatched(company.id) ? '#6B3FA0' : 'var(--outline-variant)',
                      backgroundColor: isWatched(company.id) ? '#F5ECFA' : 'white',
                    }}
                  >
                    <Heart
                      className="w-4 h-4 shrink-0"
                      style={{ color: isWatched(company.id) ? '#6B3FA0' : 'var(--text-secondary)' }}
                      fill={isWatched(company.id) ? '#6B3FA0' : 'none'}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="truncate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {company.name}
                      </p>
                      <p className="truncate" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {company.symbol} · {company.sector}
                      </p>
                    </div>
                    <CareScoreBadge score={company.care_index.score} band={company.care_index.band} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Watchlist Content */}
      {watchedCompanies.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-12 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-[var(--text-secondary)] opacity-40" />
          <p style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
            No companies watched yet
          </p>
          <p className="mt-2 max-w-sm mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Click &quot;Add Companies&quot; above to start tracking companies that align with your values.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {watchedCompanies.map((company) => (
            <motion.div
              key={company.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-xl border border-[var(--outline-variant)] p-4 hover:border-[#6B3FA0]/30 transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-center gap-4 flex-wrap">
                <button onClick={() => toggleWatchlist(company.id)} className="shrink-0">
                  <Heart className="w-5 h-5" style={{ color: '#6B3FA0' }} fill="#6B3FA0" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {company.name}
                    </p>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {company.symbol}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {company.sector} · {company.country}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <CareScoreBadge score={company.care_index.score} band={company.care_index.band} />
                  <TrendIcon trend={company.care_index.trend} />
                  <div className="text-right hidden sm:block">
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: 'var(--text-primary)', fontFeatureSettings: "'tnum' 1" }}>
                      {company.care_metrics.parental_leave.weeks}w leave
                    </p>
                    <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', fontFeatureSettings: "'tnum' 1" }}>
                      {company.care_metrics.women_leadership.percentage}% women leaders
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// PORTFOLIO TAB
// ═══════════════════════════════════════════════
function PortfolioTab({
  portfolioCompanies,
  portfolioScore,
  filteredCompanies,
  searchQuery,
  setSearchQuery,
  showAddCompany,
  setShowAddCompany,
  addToPortfolio,
  removeFromPortfolio,
  isInPortfolio
}: {
  portfolioCompanies: { company: Company; weight: number }[];
  portfolioScore: number;
  filteredCompanies: Company[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  showAddCompany: boolean;
  setShowAddCompany: (v: boolean) => void;
  addToPortfolio: (id: string) => void;
  removeFromPortfolio: (id: string) => void;
  isInPortfolio: (id: string) => boolean;
}) {
  return (
    <div className="space-y-6">
      {/* Portfolio Score Card */}
      <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-6 relative overflow-hidden"
        style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.08)' }}>
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '22px', color: 'var(--text-primary)' }}>
                Care Portfolio
              </h2>
              <FeatureBadge />
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Build a portfolio based on care values and compare blended scores.
            </p>
          </div>
          <div className="text-right">
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
              BLENDED CARE SCORE
            </p>
            <p style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '36px',
              fontWeight: 500,
              color: portfolioScore >= 70 ? '#2BAE66' : portfolioScore >= 50 ? '#F9A825' : '#6B7280',
              fontFeatureSettings: "'tnum' 1",
              lineHeight: 1.2
            }}>
              {portfolioCompanies.length > 0 ? portfolioScore : '--'}
            </p>
            <p style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
              {portfolioCompanies.length} {portfolioCompanies.length === 1 ? 'company' : 'companies'}
            </p>
          </div>
        </div>

        {/* Sector breakdown */}
        {portfolioCompanies.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[var(--outline-variant)]">
            <p className="mb-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Sector Mix
            </p>
            <div className="flex gap-2 flex-wrap">
              {Array.from(new Set(portfolioCompanies.map(p => p.company.sector))).map(sector => {
                const count = portfolioCompanies.filter(p => p.company.sector === sector).length;
                return (
                  <span key={sector} className="px-3 py-1 rounded-full text-xs border border-[var(--outline-variant)]"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)', backgroundColor: '#FAFAFA' }}>
                    {sector} ({count})
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Add to portfolio */}
      <div className="flex items-center justify-between">
        <h3 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
          Companies
        </h3>
        <button
          onClick={() => setShowAddCompany(!showAddCompany)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors duration-200"
          style={{ backgroundColor: '#6B3FA0', fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, height: '40px' }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#5A3188'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#6B3FA0'; }}
        >
          {showAddCompany ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddCompany ? 'Close' : 'Add to Portfolio'}
        </button>
      </div>

      {/* Add Panel */}
      <AnimatePresence>
        {showAddCompany && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-4"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--outline-variant)] bg-[#FAFAFA] focus:outline-none focus:border-[#6B3FA0] transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px' }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[300px] overflow-y-auto pr-1">
                {filteredCompanies.map((company) => (
                  <button
                    key={company.id}
                    onClick={() => isInPortfolio(company.id) ? removeFromPortfolio(company.id) : addToPortfolio(company.id)}
                    className="flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 text-left"
                    style={{
                      borderColor: isInPortfolio(company.id) ? '#2BAE66' : 'var(--outline-variant)',
                      backgroundColor: isInPortfolio(company.id) ? '#E9F7EF' : 'white',
                    }}
                  >
                    {isInPortfolio(company.id) ? (
                      <CheckCircle className="w-4 h-4 shrink-0 text-[#2BAE66]" />
                    ) : (
                      <Plus className="w-4 h-4 shrink-0 text-[var(--text-secondary)]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="truncate" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {company.name}
                      </p>
                      <p className="truncate" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {company.symbol}
                      </p>
                    </div>
                    <CareScoreBadge score={company.care_index.score} band={company.care_index.band} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Companies */}
      {portfolioCompanies.length === 0 ? (
        <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-12 text-center">
          <Briefcase className="w-12 h-12 mx-auto mb-4 text-[var(--text-secondary)] opacity-40" />
          <p style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
            Your portfolio is empty
          </p>
          <p className="mt-2 max-w-sm mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
            Add companies to see how your portfolio scores on care metrics.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {portfolioCompanies.map(({ company, weight }) => (
            <div key={company.id} className="bg-white rounded-xl border border-[var(--outline-variant)] p-4"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {company.name}
                    </p>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {company.symbol}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {company.sector}
                    </span>
                    <span className="text-[var(--text-secondary)]">·</span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: '#6B3FA0', fontFeatureSettings: "'tnum' 1" }}>
                      {weight}% weight
                    </span>
                  </div>
                </div>
                <CareScoreBadge score={company.care_index.score} band={company.care_index.band} />
                <button
                  onClick={() => removeFromPortfolio(company.id)}
                  className="p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
                >
                  <X className="w-4 h-4 text-[var(--text-secondary)] hover:text-red-500" />
                </button>
              </div>
              {/* Mini bar */}
              <div className="mt-3 h-2 rounded-full bg-[#F5ECFA] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: '#2BAE66' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${company.care_index.score}%` }}
                  transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// ALERTS TAB
// ═══════════════════════════════════════════════
function AlertsTab({ alerts, setAlerts }: { alerts: AlertConfig[]; setAlerts: (a: AlertConfig[]) => void }) {
  const alertTypes: Record<string, { label: string; description: string; icon: React.ReactNode }> = {
    'score-change': { label: 'Score Change', description: 'When care score changes by more than threshold', icon: <TrendingUp className="w-4 h-4" /> },
    'leave-drop': { label: 'Leave Policy Drop', description: 'When parental leave drops below threshold weeks', icon: <AlertTriangle className="w-4 h-4" /> },
    'dei-update': { label: 'DEI Update', description: 'When diversity metrics are updated', icon: <Star className="w-4 h-4" /> },
    'policy-change': { label: 'Policy Change', description: 'When any family policy is modified', icon: <Info className="w-4 h-4" /> },
  };

  const toggleAlert = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, enabled: !a.enabled } : a));
  };

  // Mock notification feed
  const mockNotifications = [
    { company: 'Netflix', message: 'Care score increased to 94 (+2)', time: '2 hours ago', type: 'positive' as const },
    { company: 'Salesforce', message: 'Updated parental leave policy: 26 weeks', time: '1 day ago', type: 'positive' as const },
    { company: 'Meta', message: 'Women in leadership dropped to 33%', time: '3 days ago', type: 'warning' as const },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '22px', color: 'var(--text-primary)' }}>
          Alerts & Notifications
        </h2>
        <FeatureBadge label="Coming Soon" />
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Get notified when companies change their care policies. This is a preview of what alerts will look like.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alert Configuration */}
        <div className="relative">
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
              Your Alert Rules
            </h3>
            <div className="space-y-3">
              {alerts.map((alert) => {
                const company = mockCompanies.find(c => c.id === alert.companyId);
                const typeInfo = alertTypes[alert.type];
                return (
                  <div key={alert.id} className="flex items-center gap-3 p-3 rounded-lg border border-[var(--outline-variant)]">
                    <div className="p-2 rounded-lg bg-[#F5ECFA] text-[#6B3FA0]">
                      {typeInfo?.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {company?.name || alert.companyId} — {typeInfo?.label}
                      </p>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {typeInfo?.description}
                        {alert.threshold && (
                          <span style={{ fontFamily: 'IBM Plex Mono, monospace' }}> (threshold: {alert.threshold})</span>
                        )}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleAlert(alert.id)}
                      className="relative w-10 h-6 rounded-full transition-colors duration-200"
                      style={{ backgroundColor: alert.enabled ? '#2BAE66' : '#E5E7EB' }}
                    >
                      <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                        style={{ left: alert.enabled ? '22px' : '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <ComingSoonOverlay feature="Real-time alerts with email notifications" />
        </div>

        {/* Notification Feed Preview */}
        <div className="relative">
          <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <h3 className="mb-4" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
              Recent Notifications
            </h3>
            <div className="space-y-3">
              {mockNotifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[#FAFAFA]">
                  <div className={`p-1.5 rounded-full mt-0.5 ${notif.type === 'positive' ? 'bg-[#E9F7EF] text-[#2BAE66]' : 'bg-[#FFF3E0] text-[#EF6C00]'}`}>
                    {notif.type === 'positive' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                  </div>
                  <div className="flex-1">
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {notif.company}
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {notif.message}
                    </p>
                    <p className="mt-1" style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      {notif.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <ComingSoonOverlay feature="Live notification feed with email digests" />
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// DEEPER DATA TAB
// ═══════════════════════════════════════════════
function DeeperDataTab({
  selectedHistorical,
  setSelectedHistorical
}: {
  selectedHistorical: string | null;
  setSelectedHistorical: (id: string | null) => void;
}) {
  const featuredCompanies = mockCompanies.slice(0, 6);
  const selectedCompany = selectedHistorical ? mockCompanies.find(c => c.id === selectedHistorical) : featuredCompanies[0];
  const historicalData = selectedCompany ? generateHistoricalData(selectedCompany) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <h2 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '22px', color: 'var(--text-primary)' }}>
          Deeper Data & Exports
        </h2>
        <FeatureBadge label="Coming Soon" />
      </div>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--text-secondary)' }}>
        Access historical trends, detailed breakdowns, and export data for your research.
      </p>

      {/* Company Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {featuredCompanies.map((company) => (
          <button
            key={company.id}
            onClick={() => setSelectedHistorical(company.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all duration-200"
            style={{
              borderColor: (selectedHistorical || featuredCompanies[0].id) === company.id ? '#6B3FA0' : 'var(--outline-variant)',
              backgroundColor: (selectedHistorical || featuredCompanies[0].id) === company.id ? '#F5ECFA' : 'white',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: (selectedHistorical || featuredCompanies[0].id) === company.id ? 500 : 400,
              color: (selectedHistorical || featuredCompanies[0].id) === company.id ? '#6B3FA0' : 'var(--text-secondary)',
              minHeight: '40px'
            }}
          >
            {company.symbol}
          </button>
        ))}
      </div>

      {selectedCompany && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Historical Chart Simulation */}
          <div className="lg:col-span-2 relative">
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
                  {selectedCompany.name} — Care Score Trend
                </h3>
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--outline-variant)] text-[var(--text-secondary)] hover:border-[#6B3FA0] transition-colors duration-200"
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px' }}>
                  <Download className="w-3.5 h-3.5" />
                  Export CSV
                </button>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end gap-3 h-48 px-2">
                {historicalData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-primary)', fontFeatureSettings: "'tnum' 1" }}>
                      {d.score}
                    </span>
                    <motion.div
                      className="w-full rounded-t-md"
                      style={{
                        backgroundColor: d.score >= 70 ? '#2BAE66' : d.score >= 50 ? '#F9A825' : '#FF6B6B',
                        opacity: 0.85,
                      }}
                      initial={{ height: 0 }}
                      animate={{ height: `${(d.score / 100) * 140}px` }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0, 0, 1] }}
                    />
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '10px', color: 'var(--text-secondary)' }}>
                      {d.quarter.replace('20', "'")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <ComingSoonOverlay feature="Real historical data with interactive charts" />
          </div>

          {/* Metrics Breakdown */}
          <div className="relative">
            <div className="bg-white rounded-xl border border-[var(--outline-variant)] p-5"
              style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
              <h3 className="mb-4" style={{ fontFamily: 'Figtree, sans-serif', fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)' }}>
                Detailed Breakdown
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Parental Leave', value: `${selectedCompany.care_metrics.parental_leave.weeks} weeks`, score: selectedCompany.care_metrics.parental_leave.flexibility_score },
                  { label: 'Childcare Support', value: `${selectedCompany.care_metrics.childcare_support.programs.length} programs`, score: selectedCompany.care_metrics.childcare_support.score },
                  { label: 'Women Leadership', value: `${selectedCompany.care_metrics.women_leadership.percentage}%`, score: selectedCompany.care_metrics.women_leadership.score },
                  { label: 'Pay Equity', value: selectedCompany.care_metrics.pay_equity.certification ? 'Certified' : 'Not certified', score: selectedCompany.care_metrics.pay_equity.score },
                  { label: 'Family Benefits', value: `${selectedCompany.care_metrics.family_benefits.features.length} features`, score: selectedCompany.care_metrics.family_benefits.score },
                ].map((metric, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                        {metric.label}
                      </span>
                      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)', fontFeatureSettings: "'tnum' 1" }}>
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#F5ECFA] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: metric.score >= 80 ? '#2BAE66' : metric.score >= 60 ? '#F9A825' : '#FF6B6B' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score}%` }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.2, 0, 0, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Options */}
              <div className="mt-6 pt-4 border-t border-[var(--outline-variant)] space-y-2">
                <p className="mb-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                  EXPORT OPTIONS
                </p>
                {['Full Company Report (PDF)', 'Care Metrics (CSV)', 'Historical Data (JSON)'].map((opt, i) => (
                  <button key={i} className="w-full flex items-center gap-2 p-2 rounded-lg text-left hover:bg-[#FAFAFA] transition-colors duration-200"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <Download className="w-3.5 h-3.5" />
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <ComingSoonOverlay feature="Detailed breakdowns with data exports" />
          </div>
        </div>
      )}
    </div>
  );
}