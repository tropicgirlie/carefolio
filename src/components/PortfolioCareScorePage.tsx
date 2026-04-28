import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, BarChart3, TrendingUp, TrendingDown, ArrowRight, RefreshCw, Share2 } from 'lucide-react';
import { CareEconomyReportBanner } from './CareEconomyReportBanner';

// ─── Company database ───
const COMPANY_DB: Record<string, { name: string; sector: string; careScore: number; grade: string; color: string }> = {
  CRM: { name: 'Salesforce', sector: 'Software', careScore: 89, grade: 'A', color: '#0176D3' },
  MSFT: { name: 'Microsoft', sector: 'Technology', careScore: 84, grade: 'A', color: '#00A4EF' },
  NFLX: { name: 'Netflix', sector: 'Entertainment', careScore: 83, grade: 'A', color: '#E50914' },
  CSCO: { name: 'Cisco', sector: 'Networking', careScore: 82, grade: 'A', color: '#049FD9' },
  SPOT: { name: 'Spotify', sector: 'Media', careScore: 81, grade: 'A', color: '#1DB954' },
  ADBE: { name: 'Adobe', sector: 'Software', careScore: 78, grade: 'B', color: '#FF0000' },
  NVDA: { name: 'NVIDIA', sector: 'Semiconductors', careScore: 76, grade: 'B', color: '#76B900' },
  JNJ: { name: 'Johnson & Johnson', sector: 'Healthcare', careScore: 74, grade: 'B', color: '#D51920' },
  SHOP: { name: 'Shopify', sector: 'E-commerce', careScore: 74, grade: 'B', color: '#96BF48' },
  ETSY: { name: 'Etsy', sector: 'E-commerce', careScore: 72, grade: 'B', color: '#F16521' },
  AAPL: { name: 'Apple', sector: 'Technology', careScore: 65, grade: 'C', color: '#555555' },
  GOOGL: { name: 'Alphabet', sector: 'Technology', careScore: 62, grade: 'C', color: '#4285F4' },
  META: { name: 'Meta', sector: 'Social Media', careScore: 58, grade: 'C', color: '#0866FF' },
  AMZN: { name: 'Amazon', sector: 'E-commerce', careScore: 52, grade: 'C', color: '#FF9900' },
  TSLA: { name: 'Tesla', sector: 'Automotive', careScore: 45, grade: 'D', color: '#CC0000' },
  UBER: { name: 'Uber', sector: 'Mobility', careScore: 41, grade: 'D', color: '#000000' },
  XOM: { name: 'ExxonMobil', sector: 'Energy', careScore: 28, grade: 'E', color: '#D4531A' },
  CVX: { name: 'Chevron', sector: 'Energy', careScore: 32, grade: 'E', color: '#0073CF' },
};

const PRESET_PORTFOLIOS = [
  {
    name: 'Tech Growth',
    tickers: [{ symbol: 'MSFT', weight: 35 }, { symbol: 'NVDA', weight: 30 }, { symbol: 'AAPL', weight: 20 }, { symbol: 'AMZN', weight: 15 }],
  },
  {
    name: 'Care Leaders',
    tickers: [{ symbol: 'CRM', weight: 30 }, { symbol: 'CSCO', weight: 25 }, { symbol: 'NFLX', weight: 25 }, { symbol: 'ADBE', weight: 20 }],
  },
  {
    name: 'Balanced',
    tickers: [{ symbol: 'MSFT', weight: 25 }, { symbol: 'AAPL', weight: 25 }, { symbol: 'GOOGL', weight: 25 }, { symbol: 'META', weight: 25 }],
  },
];

interface HoldingEntry {
  id: string;
  symbol: string;
  weight: number;
}

function gradeColor(grade: string) {
  const map: Record<string, string> = { A: '#2BAE66', B: '#6B3FA0', C: '#D4A017', D: '#FF6B6B', E: '#B84040' };
  return map[grade] || '#666';
}

function overallGrade(score: number): string {
  if (score >= 80) return 'A';
  if (score >= 65) return 'B';
  if (score >= 50) return 'C';
  if (score >= 35) return 'D';
  return 'E';
}

function scoreInterpretation(score: number): { label: string; desc: string; color: string } {
  if (score >= 80) return { label: 'Care Leader Portfolio', desc: 'Your portfolio heavily favors companies with strong care infrastructure. These companies show lower attrition and higher employee satisfaction in published research.', color: '#2BAE66' };
  if (score >= 65) return { label: 'Care Aware Portfolio', desc: 'A solid mix. You hold companies that take care policies seriously, with some exposure to lower-scoring names worth exploring further.', color: '#6B3FA0' };
  if (score >= 50) return { label: 'Mixed Care Portfolio', desc: 'Your portfolio has some care-positive names, alongside companies with weaker leave policies, DEI rollbacks, or higher harm scores.', color: '#D4A017' };
  return { label: 'Care Deficit Portfolio', desc: 'Most of your holdings show lower care scores across leave, pay equity, and DEI metrics. Use the comparison tool to explore higher-scoring alternatives.', color: '#FF6B6B' };
}

let idCounter = 0;
const uid = () => `h-${++idCounter}`;

export function PortfolioCareScorePage() {
  const [holdings, setHoldings] = useState<HoldingEntry[]>([
    { id: uid(), symbol: 'MSFT', weight: 40 },
    { id: uid(), symbol: 'AAPL', weight: 35 },
    { id: uid(), symbol: 'AMZN', weight: 25 },
  ]);
  const [newSymbol, setNewSymbol] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [symbolError, setSymbolError] = useState('');

  const resolvedHoldings = useMemo(
    () =>
      holdings
        .map((h) => ({ ...h, company: COMPANY_DB[h.symbol.toUpperCase()] }))
        .filter((h) => h.company),
    [holdings],
  );

  const totalWeight = resolvedHoldings.reduce((sum, h) => sum + h.weight, 0);

  const portfolioCareScore = useMemo(() => {
    if (totalWeight === 0) return 0;
    const weighted = resolvedHoldings.reduce((sum, h) => sum + h.company.careScore * h.weight, 0);
    return Math.round(weighted / totalWeight);
  }, [resolvedHoldings, totalWeight]);

  const grade = overallGrade(portfolioCareScore);
  const interpretation = scoreInterpretation(portfolioCareScore);

  const addHolding = () => {
    const sym = newSymbol.toUpperCase().trim();
    if (!sym) { setSymbolError('Enter a ticker symbol'); return; }
    if (!COMPANY_DB[sym]) { setSymbolError(`"${sym}" not found in Care Index`); return; }
    if (holdings.some(h => h.symbol === sym)) { setSymbolError('Already in portfolio'); return; }
    const w = parseFloat(newWeight) || 10;
    setHoldings(prev => [...prev, { id: uid(), symbol: sym, weight: w }]);
    setNewSymbol('');
    setNewWeight('');
    setSymbolError('');
  };

  const removeHolding = (id: string) => setHoldings(prev => prev.filter(h => h.id !== id));

  const updateWeight = (id: string, val: string) =>
    setHoldings(prev => prev.map(h => h.id === id ? { ...h, weight: parseFloat(val) || 0 } : h));

  const loadPreset = (preset: typeof PRESET_PORTFOLIOS[number]) => {
    setHoldings(preset.tickers.map(t => ({ id: uid(), symbol: t.symbol, weight: t.weight })));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/portfolio-score`).catch(() => {});
    alert('Portfolio Score link copied!');
  };

  const sectorBreakdown = useMemo(() => {
    const map: Record<string, { weight: number; totalScore: number }> = {};
    resolvedHoldings.forEach(h => {
      const sec = h.company.sector;
      if (!map[sec]) map[sec] = { weight: 0, totalScore: 0 };
      map[sec].weight += h.weight;
      map[sec].totalScore += h.company.careScore * h.weight;
    });
    return Object.entries(map)
      .map(([sector, data]) => ({
        sector,
        weight: data.weight,
        avgScore: data.weight > 0 ? Math.round(data.totalScore / data.weight) : 0,
      }))
      .sort((a, b) => b.weight - a.weight);
  }, [resolvedHoldings]);

  const hasEnough = resolvedHoldings.length >= 2;

  // Sorted copies for top/bottom
  const sortedHoldings = [...resolvedHoldings].sort((a, b) => b.company.careScore - a.company.careScore);
  const topHolding = sortedHoldings[0];
  const botHolding = sortedHoldings[sortedHoldings.length - 1];

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden pt-20 pb-10 lg:pt-24 lg:pb-14"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(43,174,102,0.07) 0%, transparent 60%)' }}
      >
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-5"
            style={{ background: 'rgba(43,174,102,0.06)', border: '1px solid rgba(43,174,102,0.12)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6B3FA0' }} />
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: '#6B3FA0' }}>
              PORTFOLIO CARE SCORE · BETA
            </span>
          </div>
          <h1
            style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--bg-deep-navy)', marginBottom: '10px' }}
          >
            Score your{' '}
            <span style={{ color: '#2BAE66' }}>portfolio's care</span>
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.65 }}>
            Enter your current holdings, or load a preset, and we will calculate a weighted Care Score for your entire portfolio.
          </p>
        </div>
      </section>

      {/* ─── Main content ─── */}
      <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pb-16">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">

          {/* ─── Left: Input panel ─── */}
          <div>
            {/* Preset buttons */}
            <div className="mb-5">
              <p style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                QUICK LOAD A PRESET
              </p>
              <div className="flex flex-wrap gap-2">
                {PRESET_PORTFOLIOS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => loadPreset(preset)}
                    className="rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200 border-0"
                    style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(43,174,102,0.08)'; e.currentTarget.style.color = '#2BAE66'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.04)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                  >
                    {preset.name}
                  </button>
                ))}
                <button
                  onClick={() => setHoldings([])}
                  className="rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200 border-0 flex items-center gap-1.5"
                  style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}
                >
                  <RefreshCw className="w-3 h-3" /> Clear
                </button>
              </div>
            </div>

            {/* Holdings list */}
            <div className="rounded-2xl border overflow-hidden mb-4" style={{ borderColor: 'rgba(0,0,0,0.07)' }}>
              {/* Header */}
              <div
                className="px-4 py-3 border-b grid"
                style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)', gridTemplateColumns: '1fr auto' }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>TICKER</span>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>WEIGHT %</span>
              </div>

              <AnimatePresence>
                {holdings.length === 0 && (
                  <div className="px-4 py-8 text-center">
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-secondary)' }}>Add your holdings below</p>
                  </div>
                )}
                {holdings.map((holding) => {
                  const co = COMPANY_DB[holding.symbol.toUpperCase()];
                  return (
                    <motion.div
                      key={holding.id}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-3 px-4 py-3 border-b"
                      style={{ borderColor: 'rgba(0,0,0,0.04)' }}
                    >
                      {co && (
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                          style={{ background: co.color, fontSize: '9px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {holding.symbol.slice(0, 2)}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 600, color: 'var(--bg-deep-navy)' }}>
                          {holding.symbol}
                        </div>
                        {co ? (
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>
                            {co.name} · {co.careScore}
                          </div>
                        ) : (
                          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: '#FF6B6B' }}>Not in Care Index</div>
                        )}
                      </div>
                      {/* Weight input */}
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={holding.weight}
                        onChange={e => updateWeight(holding.id, e.target.value)}
                        className="w-14 text-center rounded-lg px-2 py-1.5 border-0 outline-none"
                        style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 600, color: 'var(--bg-deep-navy)' }}
                      />
                      <button
                        onClick={() => removeHolding(holding.id)}
                        className="w-7 h-7 rounded-full flex items-center justify-center cursor-pointer border-0 transition-colors duration-150 flex-shrink-0"
                        style={{ background: 'rgba(255,107,107,0.08)', color: '#FF6B6B' }}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Add row */}
              <div className="flex items-center gap-2 px-4 py-3 border-t" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                <input
                  value={newSymbol}
                  onChange={e => { setNewSymbol(e.target.value.toUpperCase()); setSymbolError(''); }}
                  onKeyDown={e => e.key === 'Enter' && addHolding()}
                  placeholder="Ticker"
                  className="flex-1 min-w-0 outline-none border-0 bg-transparent"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--bg-deep-navy)' }}
                />
                <input
                  type="number"
                  value={newWeight}
                  onChange={e => setNewWeight(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addHolding()}
                  placeholder="Wt%"
                  className="w-14 text-center outline-none border-0 bg-transparent"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--bg-deep-navy)' }}
                />
                <button
                  onClick={addHolding}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer border-0 transition-all duration-200 flex-shrink-0"
                  style={{ background: '#2BAE66', color: 'white' }}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {symbolError && (
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#FF6B6B', marginBottom: '10px' }}>
                {symbolError}
              </p>
            )}

            <button
              disabled={!hasEnough}
              className="w-full rounded-xl py-3.5 cursor-pointer border-0 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: hasEnough ? '#2BAE66' : 'rgba(0,0,0,0.08)',
                color: hasEnough ? 'white' : 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                boxShadow: hasEnough ? '0 4px 20px rgba(43,174,102,0.3)' : 'none',
              }}
            >
              <BarChart3 className="w-4 h-4" />
              Score my portfolio
            </button>
          </div>

          {/* ─── Right: Results panel ─── */}
          <div>
            {hasEnough ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                {/* Big score card */}
                <div
                  className="rounded-2xl p-6 sm:p-8 text-center"
                  style={{ border: `2px solid ${interpretation.color}25`, background: `${interpretation.color}06` }}
                >
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    PORTFOLIO CARE SCORE
                  </div>

                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(56px, 12vw, 80px)', fontWeight: 600, color: interpretation.color, lineHeight: 1, fontFeatureSettings: "'tnum' 1" }}
                  >
                    {portfolioCareScore}
                  </motion.div>

                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white my-3"
                    style={{ background: gradeColor(grade), fontFamily: "'IBM Plex Mono', monospace", fontSize: '18px', fontWeight: 700 }}
                  >
                    {grade}
                  </div>

                  <h3 style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '17px', color: interpretation.color, marginBottom: '8px' }}>
                    {interpretation.label}
                  </h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65, maxWidth: '360px', margin: '0 auto' }}>
                    {interpretation.desc}
                  </p>

                  <button
                    onClick={handleShare}
                    className="mt-5 flex items-center gap-2 rounded-full px-5 py-2 mx-auto cursor-pointer border-0 transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.04)', fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)' }}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share result
                  </button>
                </div>

                {/* Top / Bottom holdings */}
                <div className="grid grid-cols-2 gap-3">
                  {topHolding && (
                    <div className="rounded-xl p-4" style={{ background: 'rgba(43,174,102,0.05)', border: '1px solid rgba(43,174,102,0.12)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4" style={{ color: '#2BAE66' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#2BAE66' }}>Top care holding</span>
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', fontWeight: 700, color: '#2BAE66' }}>{topHolding.symbol}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>Score: {topHolding.company.careScore}</div>
                    </div>
                  )}
                  {botHolding && botHolding.symbol !== topHolding?.symbol && (
                    <div className="rounded-xl p-4" style={{ background: 'rgba(255,107,107,0.05)', border: '1px solid rgba(255,107,107,0.12)' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="w-4 h-4" style={{ color: '#FF6B6B' }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', fontWeight: 600, color: '#FF6B6B' }}>Lowest care holding</span>
                      </div>
                      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', fontWeight: 700, color: '#FF6B6B' }}>{botHolding.symbol}</div>
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>Score: {botHolding.company.careScore}</div>
                    </div>
                  )}
                </div>

                {/* Sector breakdown */}
                {sectorBreakdown.length > 0 && (
                  <div className="rounded-xl border overflow-hidden" style={{ borderColor: 'rgba(0,0,0,0.06)' }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.02)' }}>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, letterSpacing: '0.06em', color: 'var(--text-secondary)' }}>SECTOR BREAKDOWN</span>
                    </div>
                    <div className="divide-y" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
                      {sectorBreakdown.map(sec => (
                        <div key={sec.sector} className="px-4 py-3 flex items-center justify-between gap-3">
                          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--bg-deep-navy)', minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {sec.sector}
                          </span>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.06)' }}>
                              <motion.div
                                className="h-full rounded-full"
                                style={{ background: sec.avgScore >= 70 ? '#2BAE66' : sec.avgScore >= 55 ? '#D4A017' : '#FF6B6B' }}
                                initial={{ width: 0 }}
                                animate={{ width: `${sec.avgScore}%` }}
                                transition={{ duration: 0.6 }}
                              />
                            </div>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 600, color: sec.avgScore >= 70 ? '#2BAE66' : sec.avgScore >= 55 ? '#D4A017' : '#FF6B6B', minWidth: '28px', textAlign: 'right', fontFeatureSettings: "'tnum' 1" }}>
                              {sec.avgScore}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Explore nudge */}
                <div className="rounded-xl px-4 py-4 flex items-start gap-3" style={{ background: 'rgba(107,63,160,0.05)', border: '1px solid rgba(107,63,160,0.12)' }}>
                  <ArrowRight className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#6B3FA0' }} />
                  <div>
                    <p style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '14px', color: '#6B3FA0', marginBottom: '4px' }}>
                      Want to explore further?
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      Companies like Salesforce (89), Cisco (82) and Spotify (81) score higher on care metrics. Use the comparison tool to see where the differences are.
                    </p>
                    <a
                      href="/compare"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: '#6B3FA0', textDecoration: 'none', display: 'inline-block', marginTop: '6px' }}
                    >
                      Open comparison tool →
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div
                className="rounded-2xl border border-dashed flex items-center justify-center py-20"
                style={{ borderColor: 'rgba(0,0,0,0.1)' }}
              >
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', textAlign: 'center', padding: '0 24px' }}>
                  Add at least 2 holdings to see your portfolio score
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Report CTA */}
        <div className="mt-8">
          <CareEconomyReportBanner variant="hero" />
        </div>

        <p
          className="mt-6 text-center"
          style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)', opacity: 0.5 }}
        >
          Not investment advice. Care Scores are based on publicly available data.
          Verify with company disclosures before making investment decisions.
        </p>
      </section>
    </div>
  );
}
