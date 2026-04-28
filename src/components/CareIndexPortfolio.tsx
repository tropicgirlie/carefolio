import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ArrowUpDown, ArrowUp, ArrowDown, Heart, TrendingUp, 
  Baby, Shield, Leaf, Users, Building2, Globe,
  Sparkles, Award, X, Filter
} from 'lucide-react';
import { Company } from '../data/companies';

interface CareIndexPortfolioProps {
  companies: Company[];
  onNavigateToCompanyProfile: (company: Company) => void;
  onNavigateToLanding: () => void;
  onNavigateToDashboard: () => void;
}

type SortField = 'rank' | 'name' | 'score' | 'parental' | 'women' | 'sector';
type SortDirection = 'asc' | 'desc';

const BAND_CONFIG: Record<string, { label: string; color: string; bg: string; border: string; description: string }> = {
  A: { label: 'Blooming', color: '#2BAE66', bg: '#E6F6EF', border: '#2BAE66', description: '85–100' },
  B: { label: 'Strong', color: '#009688', bg: '#E0F5F3', border: '#009688', description: '70–84' },
  C: { label: 'Moderate', color: '#F6A623', bg: '#FFF3E0', border: '#F6A623', description: '55–69' },
  D: { label: 'Needs Care', color: '#E46C6C', bg: '#FDECEA', border: '#E46C6C', description: '40–54' },
  E: { label: 'Critical', color: '#C62828', bg: '#FDECEA', border: '#C62828', description: '<40' },
};

const SECTOR_ICONS: Record<string, any> = {
  'Technology': Building2,
  'Healthcare': Shield,
  'Financial Services': TrendingUp,
  'Consumer Goods': Heart,
  'Energy': Leaf,
  'Industrial': Building2,
  'Automotive': Building2,
};

export function CareIndexPortfolio({
  companies,
  onNavigateToCompanyProfile,
  onNavigateToLanding,
  onNavigateToDashboard,
}: CareIndexPortfolioProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedBands, setSelectedBands] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Derived data
  const sectors = useMemo(() => [...new Set(companies.map(c => c.sector))].sort(), [companies]);
  const regions = useMemo(() => [...new Set(companies.map(c => c.region))].sort(), [companies]);

  // Sort and filter
  const rankedCompanies = useMemo(() => {
    return [...companies].sort((a, b) => b.care_index.score - a.care_index.score);
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let result = rankedCompanies.filter(company => {
      const matchesSearch = !searchTerm || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.sector.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBand = selectedBands.length === 0 || selectedBands.includes(company.care_index.band);
      const matchesSector = selectedSectors.length === 0 || selectedSectors.includes(company.sector);
      const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(company.region);
      
      return matchesSearch && matchesBand && matchesSector && matchesRegion;
    });

    // Apply sorting
    if (sortField !== 'rank') {
      result = [...result].sort((a, b) => {
        let aVal: any, bVal: any;
        switch (sortField) {
          case 'name': aVal = a.name; bVal = b.name; break;
          case 'score': aVal = a.care_index.score; bVal = b.care_index.score; break;
          case 'parental': aVal = a.care_metrics.parental_leave.weeks; bVal = b.care_metrics.parental_leave.weeks; break;
          case 'women': aVal = a.care_metrics.women_leadership.percentage; bVal = b.care_metrics.women_leadership.percentage; break;
          case 'sector': aVal = a.sector; bVal = b.sector; break;
          default: aVal = 0; bVal = 0;
        }
        if (typeof aVal === 'string') {
          return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [rankedCompanies, searchTerm, selectedBands, selectedSectors, selectedRegions, sortField, sortDirection]);

  // Portfolio statistics
  const stats = useMemo(() => {
    const avgScore = companies.length > 0 
      ? Math.round(companies.reduce((sum, c) => sum + c.care_index.score, 0) / companies.length)
      : 0;
    const avgParental = companies.length > 0
      ? Math.round(companies.reduce((sum, c) => sum + c.care_metrics.parental_leave.weeks, 0) / companies.length)
      : 0;
    const avgWomen = companies.length > 0
      ? Math.round(companies.reduce((sum, c) => sum + c.care_metrics.women_leadership.percentage, 0) / companies.length)
      : 0;
    const bandA = companies.filter(c => c.care_index.band === 'A').length;
    const bandB = companies.filter(c => c.care_index.band === 'B').length;
    const improving = companies.filter(c => c.care_index.trend === 'up').length;

    return { avgScore, avgParental, avgWomen, bandA, bandB, improving, total: companies.length };
  }, [companies]);

  const activeFiltersCount = selectedBands.length + selectedSectors.length + selectedRegions.length;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection(field === 'name' || field === 'sector' ? 'asc' : 'desc');
    }
  };

  const toggleFilter = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setList(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const clearAllFilters = () => {
    setSelectedBands([]);
    setSelectedSectors([]);
    setSelectedRegions([]);
    setSearchTerm('');
  };

  const getRank = (company: Company) => {
    return rankedCompanies.findIndex(c => c.id === company.id) + 1;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3.5 h-3.5 opacity-40" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-3.5 h-3.5 text-[var(--care-emerald)]" />
      : <ArrowDown className="w-3.5 h-3.5 text-[var(--care-emerald)]" />;
  };

  const TrendIndicator = ({ trend, change }: { trend: string; change: number }) => {
    if (trend === 'up') return (
      <span className="inline-flex items-center gap-0.5 text-[var(--care-emerald)]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px' }}>
        <ArrowUp className="w-3 h-3" />+{change.toFixed(1)}
      </span>
    );
    if (trend === 'down') return (
      <span className="inline-flex items-center gap-0.5 text-[var(--harm-coral)]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px' }}>
        <ArrowDown className="w-3 h-3" />-{Math.abs(change).toFixed(1)}
      </span>
    );
    return (
      <span className="inline-flex items-center gap-0.5 text-[var(--text-secondary)]" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px' }}>
        -
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(43, 174, 102, 0.06) 30%, rgba(107, 63, 160, 0.04) 60%, #FFFFFF 100%)' }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, var(--care-emerald) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.03]" style={{ background: 'radial-gradient(circle, var(--fintech-feminine-purple) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Kicker */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[var(--care-emerald)] flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span 
                className="text-[var(--fintech-feminine-purple)] tracking-wide"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', letterSpacing: '0.05em', textTransform: 'uppercase' }}
              >
                The Care Index Portfolio
              </span>
            </div>

            {/* Headline */}
            <h1 
              className="text-[var(--text-primary)] mb-3 max-w-[700px]"
              style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 600, fontSize: '40px', lineHeight: 1.15 }}
            >
              Top {stats.total} companies that support families & caregivers
            </h1>

            {/* Sub-headline */}
            <p 
              className="text-[var(--text-secondary)] max-w-[560px] mb-8"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '18px', lineHeight: 1.5 }}
            >
              Ranked by care investment - parental leave, childcare support, pay equity, and women in leadership. Invest where values meet value.
            </p>

            {/* Stats Strip */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Avg Care Score', value: stats.avgScore, suffix: '/100', icon: Heart, color: 'var(--care-emerald)' },
                { label: 'Avg Parental Leave', value: stats.avgParental, suffix: ' wks', icon: Baby, color: 'var(--fintech-feminine-purple)' },
                { label: 'Women Leadership', value: stats.avgWomen, suffix: '%', icon: Users, color: 'var(--care-teal)' },
                { label: 'Improving YoY', value: stats.improving, suffix: `/${stats.total}`, icon: TrendingUp, color: 'var(--care-vibrant-mint)' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `color-mix(in srgb, ${stat.color} 12%, white)` }}
                  >
                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div 
                      className="text-[var(--text-primary)]"
                      style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: '20px', lineHeight: 1.2, fontFeatureSettings: "'tnum' 1" }}
                    >
                      {stat.value}<span className="text-[var(--text-secondary)]" style={{ fontSize: '14px', fontWeight: 300 }}>{stat.suffix}</span>
                    </div>
                    <div 
                      className="text-[var(--text-secondary)]"
                      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '13px' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Band Legend + Controls */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[var(--outline-variant)]" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div className="max-w-[1200px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Band chips */}
            <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
              <span className="text-[var(--text-secondary)] whitespace-nowrap" style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}>
                Bands:
              </span>
              {Object.entries(BAND_CONFIG).map(([band, config]) => {
                const count = companies.filter(c => c.care_index.band === band).length;
                const isActive = selectedBands.includes(band);
                return (
                  <button
                    key={band}
                    onClick={() => toggleFilter(selectedBands, setSelectedBands, band)}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap"
                    style={{
                      backgroundColor: isActive ? config.bg : 'transparent',
                      border: `1.5px solid ${isActive ? config.color : 'var(--outline-variant)'}`,
                      color: isActive ? config.color : 'var(--text-secondary)',
                    }}
                  >
                    <span 
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: config.color }}
                    />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}>
                      {band}
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 400, opacity: 0.7 }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Search + Filters */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
                <input
                  type="text"
                  placeholder="Search companies…"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--outline-variant)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-[var(--care-emerald)] focus:ring-1 focus:ring-[var(--care-emerald)] transition-all duration-200 w-[200px]"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px' }}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-200"
                style={{
                  borderColor: showFilters ? 'var(--care-emerald)' : 'var(--outline-variant)',
                  backgroundColor: showFilters ? 'var(--bg-secondary)' : 'transparent',
                  color: showFilters ? 'var(--care-emerald)' : 'var(--text-secondary)',
                }}
              >
                <Filter className="w-4 h-4" />
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}>Filters</span>
                {activeFiltersCount > 0 && (
                  <span 
                    className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: 'var(--care-emerald)', fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px' }}
                  >
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Expanded Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                key="filters-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1 border-t border-[var(--outline-variant)] mt-3">
                  <div className="grid grid-cols-2 gap-6">
                    {/* Sectors */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Sector
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {sectors.map(sector => (
                          <button
                            key={sector}
                            onClick={() => toggleFilter(selectedSectors, setSelectedSectors, sector)}
                            className="px-2.5 py-1 rounded-md transition-all duration-200"
                            style={{
                              backgroundColor: selectedSectors.includes(sector) ? 'color-mix(in srgb, var(--fintech-feminine-purple) 10%, white)' : 'var(--bg-secondary)',
                              border: `1px solid ${selectedSectors.includes(sector) ? 'var(--fintech-feminine-purple)' : 'var(--outline-variant)'}`,
                              color: selectedSectors.includes(sector) ? 'var(--fintech-feminine-purple)' : 'var(--text-secondary)',
                              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400,
                            }}
                          >
                            {sector}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Regions */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                          Region
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {regions.map(region => (
                          <button
                            key={region}
                            onClick={() => toggleFilter(selectedRegions, setSelectedRegions, region)}
                            className="px-2.5 py-1 rounded-md transition-all duration-200"
                            style={{
                              backgroundColor: selectedRegions.includes(region) ? 'color-mix(in srgb, var(--care-teal) 10%, white)' : 'var(--bg-secondary)',
                              border: `1px solid ${selectedRegions.includes(region) ? 'var(--care-teal)' : 'var(--outline-variant)'}`,
                              color: selectedRegions.includes(region) ? 'var(--care-teal)' : 'var(--text-secondary)',
                              fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400,
                            }}
                          >
                            {region}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {activeFiltersCount > 0 && (
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--outline-variant)]">
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', color: 'var(--text-secondary)' }}>
                        {filteredCompanies.length} of {companies.length} companies
                      </span>
                      <button
                        onClick={clearAllFilters}
                        className="text-[var(--fintech-feminine-coral)] hover:text-[var(--harm-rose)] transition-colors"
                        style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 500 }}
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Main Table */}
      <section className="max-w-[1200px] mx-auto px-6 py-6">
        <div 
          ref={tableRef}
          className="bg-white rounded-2xl border border-[var(--outline-variant)] overflow-hidden"
          style={{ boxShadow: 'var(--elevation-subtle)' }}
        >
          {/* Results count */}
          <div className="px-5 py-3 border-b border-[var(--outline-variant)] flex items-center justify-between bg-[var(--bg-secondary)]">
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}>
              Showing <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, color: 'var(--text-primary)' }}>{filteredCompanies.length}</span> companies
              {activeFiltersCount > 0 && (
                <> (filtered from {companies.length})</>
              )}
            </span>
            <div className="flex items-center gap-1.5 text-[var(--text-secondary)]" style={{ fontSize: '13px' }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span style={{ fontFamily: "'Inter', sans-serif" }}>Click any row to explore</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full" style={{ minWidth: '900px' }}>
              <thead>
                <tr className="border-b-2 border-[var(--outline-variant)]">
                  {[
                    { field: 'rank' as SortField, label: '#', width: '52px', align: 'center' as const },
                    { field: 'name' as SortField, label: 'Company', width: '28%', align: 'left' as const },
                    { field: 'sector' as SortField, label: 'Sector', width: '14%', align: 'left' as const },
                    { field: 'score' as SortField, label: 'Care Score', width: '14%', align: 'center' as const },
                    { field: 'parental' as SortField, label: 'Parental Leave', width: '13%', align: 'center' as const },
                    { field: 'women' as SortField, label: 'Women Leadership', width: '14%', align: 'center' as const },
                    { field: 'rank' as SortField, label: 'Trend', width: '10%', align: 'center' as const, noSort: true },
                  ].map((col, i) => (
                    <th
                      key={col.label}
                      className="px-4 py-3 select-none"
                      style={{ 
                        width: col.width, 
                        textAlign: col.align,
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {col.label === 'Trend' ? (
                        <span>{col.label}</span>
                      ) : (
                        <button
                          onClick={() => handleSort(col.field)}
                          className="inline-flex items-center gap-1 hover:text-[var(--text-primary)] transition-colors duration-200"
                        >
                          {col.label}
                          <SortIcon field={col.field} />
                        </button>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, index) => {
                  const rank = getRank(company);
                  const band = BAND_CONFIG[company.care_index.band] || BAND_CONFIG.C;
                  const isHovered = hoveredRow === company.id;
                  const isTop3 = rank <= 3;

                  return (
                    <motion.tr
                      key={company.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.5) }}
                      onClick={() => onNavigateToCompanyProfile(company)}
                      onMouseEnter={() => setHoveredRow(company.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                      className="border-b border-[var(--outline-variant)] cursor-pointer transition-colors duration-150 group"
                      style={{
                        backgroundColor: isHovered ? 'var(--bg-secondary)' : (index % 2 === 1 ? 'var(--bg-table-alt)' : 'white'),
                      }}
                    >
                      {/* Rank */}
                      <td className="px-4 py-3.5 text-center">
                        {isTop3 ? (
                          <div 
                            className="w-7 h-7 rounded-full flex items-center justify-center mx-auto"
                            style={{ 
                              background: rank === 1 ? 'linear-gradient(135deg, #FFD700, #FFA500)' : rank === 2 ? 'linear-gradient(135deg, #C0C0C0, #A0A0A0)' : 'linear-gradient(135deg, #CD7F32, #B06820)',
                            }}
                          >
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 700, color: 'white' }}>
                              {rank}
                            </span>
                          </div>
                        ) : (
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 400, color: 'var(--text-secondary)', fontFeatureSettings: "'tnum' 1" }}>
                            {rank}
                          </span>
                        )}
                      </td>

                      {/* Company Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                            style={{ 
                              backgroundColor: band.bg,
                              border: `1.5px solid ${band.border}`,
                            }}
                          >
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '13px', fontWeight: 700, color: band.color }}>
                              {company.care_index.band}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span 
                                className="truncate text-[var(--text-primary)]"
                                style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 500 }}
                              >
                                {company.name}
                              </span>
                              {isTop3 && (
                                <Award className="w-3.5 h-3.5 text-[var(--fintech-feminine-purple)] flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 400, color: 'var(--text-secondary)' }}>
                                {company.symbol}
                              </span>
                              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>·</span>
                              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: 'var(--text-secondary)' }}>
                                {company.country}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Sector */}
                      <td className="px-4 py-3.5">
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', fontWeight: 400, color: 'var(--text-secondary)' }}>
                          {company.sector}
                        </span>
                      </td>

                      {/* Care Score */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <div className="relative w-10">
                            {/* Score bar background */}
                            <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                              <div 
                                className="h-full rounded-full transition-all duration-500"
                                style={{ 
                                  width: `${company.care_index.score}%`,
                                  backgroundColor: band.color,
                                }}
                              />
                            </div>
                          </div>
                          <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '15px', fontWeight: 500, color: band.color, fontFeatureSettings: "'tnum' 1" }}>
                            {company.care_index.score}
                          </span>
                        </div>
                      </td>

                      {/* Parental Leave */}
                      <td className="px-4 py-3.5 text-center">
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 400, color: 'var(--text-primary)', fontFeatureSettings: "'tnum' 1" }}>
                          {company.care_metrics.parental_leave.weeks}
                          <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text-secondary)' }}> wks</span>
                        </span>
                      </td>

                      {/* Women Leadership */}
                      <td className="px-4 py-3.5 text-center">
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '14px', fontWeight: 400, color: 'var(--text-primary)', fontFeatureSettings: "'tnum' 1" }}>
                          {company.care_metrics.women_leadership.percentage}
                          <span style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text-secondary)' }}>%</span>
                        </span>
                      </td>

                      {/* Trend */}
                      <td className="px-4 py-3.5 text-center">
                        <TrendIndicator trend={company.care_index.trend} change={company.care_index.trend_change} />
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty state */}
          {filteredCompanies.length === 0 && (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-[var(--text-secondary)]" />
              </div>
              <p style={{ fontFamily: "'Figtree', sans-serif", fontWeight: 600, fontSize: '18px', color: 'var(--text-primary)', marginBottom: '8px' }}>
                No companies found
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 rounded-lg border border-[var(--care-emerald)] text-[var(--care-emerald)] hover:bg-[var(--care-emerald)] hover:text-white transition-all duration-200"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: 500 }}
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[var(--outline-variant)] bg-[var(--bg-secondary)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              {Object.entries(BAND_CONFIG).map(([band, config]) => (
                <div key={band} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {band}: {config.label} ({config.description})
                  </span>
                </div>
              ))}
            </div>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', color: 'var(--text-secondary)' }}>
              Updated Q1 2026
            </span>
          </div>
        </div>

        {/* Methodology note */}
        <div className="mt-6 text-center">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Care scores are calculated across five dimensions: parental leave, childcare support, women leadership, pay equity, and family benefits. 
            <br />
            <span style={{ color: 'var(--fintech-feminine-purple)', fontWeight: 500 }}>
              Every investment is a vote for the world you want to live in.
            </span>
          </p>
        </div>
      </section>
    </div>
  );
}