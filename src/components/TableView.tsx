import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpDown, TrendingUp, TrendingDown, Sparkles, Filter, MoreHorizontal } from 'lucide-react';
import { Company } from '../data/companies';
import { PlantIcon } from './PlantIcon';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface TableViewProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
  sectorFilter: string;
  onSectorFilterChange: (sector: string) => void;
  healthFilter: string;
  onHealthFilterChange: (health: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  rowCount: number;
  onRowCountChange: (count: number) => void;
}

export function TableView({
  companies,
  onSelectCompany,
  sectorFilter,
  onSectorFilterChange,
  healthFilter,
  onHealthFilterChange,
  sortBy,
  onSortChange,
  rowCount,
  onRowCountChange
}: TableViewProps) {
  const sectors = Array.from(new Set(companies.map(c => c.sector)));
  const healthStatuses = ['blooming', 'healthy', 'wilting', 'dying'];

  const filteredCompanies = companies.filter(company => {
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    const matchesHealth = healthFilter === 'all' || company.health_status === healthFilter;
    return matchesSector && matchesHealth;
  });

  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    switch (sortBy) {
      case 'care':
        return b.care_index.score - a.care_index.score;
      case 'harm':
        return a.harm_index.score - b.harm_index.score;
      case 'integrity':
        return b.net_integrity.score - a.net_integrity.score;
      case 'market_cap':
        return b.market_cap - a.market_cap;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return b.net_integrity.score - a.net_integrity.score;
    }
  });

  const displayedCompanies = sortedCompanies.slice(0, rowCount);

  const formatMarketCap = (marketCap: number) => {
    const trillion = marketCap / 1000000000000;
    if (trillion >= 1) return `$${trillion.toFixed(1)}T`;
    const billion = marketCap / 1000000000;
    return `$${billion.toFixed(0)}B`;
  };

  // Care Score Color Logic
  const getCareScoreColor = (score: number) => {
    if (score >= 85) return 'care-score-excellent';
    if (score >= 70) return 'care-score-good';
    if (score >= 50) return 'care-score-fair';
    if (score >= 30) return 'care-score-poor';
    return 'care-score-critical';
  };

  const getCareBadgeColor = (score: number) => {
    if (score >= 85) return 'care-badge-excellent';
    if (score >= 70) return 'care-badge-good';
    if (score >= 50) return 'care-badge-fair';
    if (score >= 30) return 'care-badge-poor';
    return 'care-badge-critical';
  };

  const getChangeIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="w-4 h-4 text-care-mint" />;
    if (score >= 40) return <TrendingUp className="w-4 h-4 text-care-turquoise" />;
    return <TrendingDown className="w-4 h-4 text-harm-coral" />;
  };

  const getSectorBadgeColor = (sector: string) => {
    const colors: Record<string, string> = {
      'Technology': 'bg-bg-secondary text-care-turquoise border-care-turquoise/20',
      'Healthcare': 'bg-tertiary-container text-care-mint border-care-mint/20',
      'Financial Services': 'bg-neutral-blush text-neutral-lilac border-neutral-lilac/20',
      'Consumer Discretionary': 'bg-bg-secondary text-text-secondary border-outline-variant',
      'Consumer Staples': 'bg-bg-secondary text-text-secondary border-outline-variant',
      'Energy': 'bg-error-container text-harm-coral border-harm-coral/20',
      'Industrials': 'bg-bg-secondary text-text-secondary border-outline-variant',
      'Communication Services': 'bg-bg-secondary text-text-secondary border-outline-variant'
    };
    return colors[sector] || 'bg-bg-secondary text-text-secondary border-outline-variant';
  };

  const getHealthDisplayName = (status: string) => {
    switch (status) {
      case 'blooming': return 'Blooming';
      case 'healthy': return 'Growing';
      case 'wilting': return 'Needs Nurturing';
      case 'dying': return 'Needs Nurturing';
      default: return status;
    }
  };

  // Grid Template
  const gridTemplate = "grid-cols-[2.5fr_1.2fr_1fr_1.2fr_1fr_1fr_0.5fr]";

  // Scroll state management for smooth scroll UX
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopFade(scrollTop > 8);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 8);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    // Initial check
    const timer = setTimeout(updateScrollIndicators, 100);
    el.addEventListener('scroll', updateScrollIndicators, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollIndicators);
    resizeObserver.observe(el);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', updateScrollIndicators);
      resizeObserver.disconnect();
    };
  }, [updateScrollIndicators, displayedCompanies.length]);

  return (
    <div className="space-y-6 w-full">
      {/* Garden Overview Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="section-header">
              Garden Overview
            </h1>
            <p className="body-text text-text-secondary mt-2">
              Nurturing growth across {companies.length} companies • Where values meet value
            </p>
          </div>
          
          <div className="flex items-center gap-3 p-4 company-card">
            <Sparkles className="w-5 h-5 text-care-turquoise" />
            <div>
              <div className="body-text text-text-primary">Live Garden Data</div>
              <div className="caption text-text-secondary">Updated 2h ago</div>
            </div>
          </div>
        </div>
        
        {/* Filter Garden Card */}
        <div className="company-card p-6">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
            <div className="flex items-center gap-3 shrink-0">
              <Filter className="w-5 h-5 text-care-turquoise" />
              <span className="card-title text-text-primary">Filter Garden</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Select value={sectorFilter} onValueChange={onSectorFilterChange}>
                <SelectTrigger className="w-48 h-10 bg-bg-card border-outline-variant rounded-2xl body-text">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent className="bg-bg-card elevation-3 rounded-2xl border-outline-variant">
                  <SelectItem value="all">All Sectors</SelectItem>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector.split(' ')[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={healthFilter} onValueChange={onHealthFilterChange}>
                <SelectTrigger className="w-40 h-10 bg-bg-card border-outline-variant rounded-2xl body-text">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="bg-bg-card elevation-3 rounded-2xl border-outline-variant">
                  <SelectItem value="all">All Status</SelectItem>
                  {healthStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      <span className="capitalize">{getHealthDisplayName(status)}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="w-px h-6 bg-outline-variant" />

              <div className="flex items-center gap-3">
                <span className="caption text-text-secondary">Show:</span>
                <Select value={rowCount.toString()} onValueChange={(value) => onRowCountChange(parseInt(value))}>
                  <SelectTrigger className="w-20 h-10 bg-bg-card border-outline-variant rounded-2xl body-text">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-bg-card elevation-3 rounded-2xl border-outline-variant">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Garden Data Table */}
      <div className="company-card overflow-hidden relative">
        {/* Table Header - Desktop Only (Sticky) */}
        <div className={`hidden lg:grid ${gridTemplate} gap-6 px-6 py-4 bg-bg-table-alt border-b border-outline-variant sticky top-0 z-10`}>
          <div 
            className="label-text text-text-secondary cursor-pointer hover:text-text-primary flex items-center gap-2 transition-colors duration-200 state-layer rounded-lg p-2 -m-2"
            onClick={() => onSortChange('name')}
          >
            Company
            {sortBy === 'name' && <ArrowUpDown className="w-4 h-4" />}
          </div>
          
          <div 
            className="label-text text-text-secondary cursor-pointer hover:text-text-primary flex items-center gap-2 transition-colors duration-200 state-layer rounded-lg p-2 -m-2"
            onClick={() => onSortChange('care')}
          >
            Care Score
            {sortBy === 'care' && <ArrowUpDown className="w-4 h-4" />}
          </div>
          
          <div className="label-text text-text-secondary">
            Growth Trend
          </div>
          
          <div 
            className="label-text text-text-secondary cursor-pointer hover:text-text-primary flex items-center gap-2 transition-colors duration-200 state-layer rounded-lg p-2 -m-2"
            onClick={() => onSortChange('integrity')}
          >
            Performance
            {sortBy === 'integrity' && <ArrowUpDown className="w-4 h-4" />}
          </div>
          
          <div 
            className="label-text text-text-secondary cursor-pointer hover:text-text-primary flex items-center gap-2 transition-colors duration-200 state-layer rounded-lg p-2 -m-2"
            onClick={() => onSortChange('market_cap')}
          >
            Market Cap
            {sortBy === 'market_cap' && <ArrowUpDown className="w-4 h-4" />}
          </div>
          
          <div 
            className="label-text text-text-secondary cursor-pointer hover:text-text-primary flex items-center gap-2 transition-colors duration-200 state-layer rounded-lg p-2 -m-2"
            onClick={() => onSortChange('harm')}
          >
            Risk Score
            {sortBy === 'harm' && <ArrowUpDown className="w-4 h-4" />}
          </div>
          
          <div className="label-text text-text-secondary">
            {/* Actions column */}
          </div>
        </div>

        {/* Scroll fade indicators */}
        <div 
          className={`table-scroll-fade-top ${showTopFade ? 'visible' : ''}`}
          style={{ position: 'sticky', top: 0, height: 24, marginBottom: -24, zIndex: 5 }}
        />

        {/* Table Rows - Smooth scrollable area */}
        <div 
          ref={scrollContainerRef}
          className="divide-y divide-outline-variant table-scroll-container overflow-y-auto"
          style={{ maxHeight: displayedCompanies.length > 10 ? '680px' : 'none' }}
        >
          {displayedCompanies.map((company, index) => (
            <motion.div
              key={company.company_id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03, duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="px-4 py-4 lg:px-6 hover:bg-bg-table-alt transition-all duration-200 cursor-pointer group state-layer"
              onClick={() => onSelectCompany(company)}
            >
              {/* Mobile Card Layout */}
              <div className="block lg:hidden">
                <div className="company-card p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-bg-secondary flex items-center justify-center">
                        <PlantIcon 
                          plantType={company.plant_type}
                          healthStatus={company.health_status}
                          size="md"
                        />
                      </div>
                      <div>
                        <div className="card-title text-text-primary">
                          {company.name}
                        </div>
                        <div className="caption text-text-secondary">{company.symbol}</div>
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-10 w-10 p-0 rounded-full state-layer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCompany(company);
                      }}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="caption text-text-secondary mb-2">Care Score</div>
                      <div className={`score-badge ${getCareBadgeColor(company.care_index.score)}`}>
                        <span className="care-score">
                          {company.care_index.score}
                        </span>
                        <span className="caption ml-2">
                          {company.care_index.band}
                        </span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="caption text-text-secondary mb-2">Market Cap</div>
                      <div className="body-text text-text-primary">
                        {formatMarketCap(company.market_cap)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Badge 
                      className={`caption px-3 py-1.5 border rounded-2xl ${getSectorBadgeColor(company.sector)}`}
                    >
                      {company.sector.split(' ')[0]}
                    </Badge>
                    
                    <div className="flex items-center gap-2">
                      {getChangeIcon(company.net_integrity.score)}
                      <span className={`caption ${getCareScoreColor(company.net_integrity.score)}`}>
                        {company.net_integrity.score >= 70 ? '+' : company.net_integrity.score >= 40 ? '' : '-'}
                        {Math.abs(company.net_integrity.score - 50).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Table Layout */}
              <div className={`hidden lg:grid ${gridTemplate} gap-6 items-center`}>
                {/* Company - 2.5fr */}
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
                    <PlantIcon 
                      plantType={company.plant_type}
                      healthStatus={company.health_status}
                      size="md"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="body-text text-text-primary truncate group-hover:text-care-turquoise transition-colors duration-200">
                      {company.name}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="caption text-text-secondary">{company.symbol}</span>
                      <Badge className={`caption px-2 py-1 border rounded-xl flex-shrink-0 ${getSectorBadgeColor(company.sector)}`}>
                        {company.sector.split(' ')[0]}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Care Score - 1.2fr */}
                <div className="flex items-center">
                  <div className={`score-badge ${getCareBadgeColor(company.care_index.score)}`}>
                    <span className="care-score">
                      {company.care_index.score}
                    </span>
                    <span className="caption ml-2">
                      {company.care_index.band}
                    </span>
                  </div>
                </div>

                {/* Growth Trend Chart - 1fr */}
                <div className="flex items-center">
                  <div className="w-20 h-8 flex items-end gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 rounded-sm transition-all duration-300 group-hover:opacity-80 ${
                          company.health_status === 'blooming' ? 'bg-care-mint' :
                          company.health_status === 'healthy' ? 'bg-care-turquoise' :
                          company.health_status === 'wilting' ? 'bg-neutral-lilac' :
                          'bg-harm-coral'
                        }`}
                        style={{ 
                          height: `${Math.random() * 20 + 8}px`,
                          opacity: 0.6 + Math.random() * 0.4
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Performance - 1.2fr */}
                <div className="flex items-center gap-2">
                  {getChangeIcon(company.net_integrity.score)}
                  <span className={`body-text ${getCareScoreColor(company.net_integrity.score)}`}>
                    {company.net_integrity.score >= 70 ? '+' : company.net_integrity.score >= 40 ? '' : '-'}
                    {Math.abs(company.net_integrity.score - 50).toFixed(1)}%
                  </span>
                </div>

                {/* Market Cap - 1fr */}
                <div className="flex items-center">
                  <span className="body-text text-text-primary">
                    {formatMarketCap(company.market_cap)}
                  </span>
                </div>

                {/* Risk Score - 1fr */}
                <div className="flex items-center">
                  <div className={`score-badge ${getCareBadgeColor(100 - company.harm_index.score)}`}>
                    <span className="care-score">
                      {company.harm_index.score}
                    </span>
                  </div>
                </div>

                {/* Actions - 0.5fr */}
                <div className="flex items-center justify-center">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    className="
                      h-10 w-10 p-0 rounded-full
                      opacity-0 group-hover:opacity-100 transition-all duration-200
                      state-layer
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCompany(company);
                    }}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom scroll fade indicator */}
        <div 
          className={`table-scroll-fade-bottom ${showBottomFade ? 'visible' : ''}`}
          style={{ position: 'sticky', bottom: 0, height: 24, marginTop: -24, zIndex: 5 }}
        />
      </div>

      {/* Garden Summary Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 company-card">
        <div className="body-text text-text-secondary">
          Nurturing {displayedCompanies.length} of {filteredCompanies.length} companies in your garden
        </div>
        <div className="flex items-center gap-6">
          <span className="body-text text-text-secondary">Real-time care data</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-care-mint rounded-full animate-pulse"></div>
            <span className="caption text-care-mint">Growing</span>
          </div>
        </div>
      </div>
    </div>
  );
}