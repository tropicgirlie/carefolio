import { useState } from 'react';
import { motion } from 'motion/react';
import { CoinbaseStyleNavigation } from './CoinbaseStyleNavigation';
import { CoinbaseIcon } from './icons/CoinbaseStyleIcons';

interface Company {
  id: string;
  name: string;
  symbol: string;
  careScore: number;
  sector: string;
  marketCap: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
}

interface CoinbaseStyleDemoProps {
  companies: Company[];
}

export function CoinbaseStyleDemo({ companies }: CoinbaseStyleDemoProps) {
  const [currentPage, setCurrentPage] = useState<'landing' | 'about' | 'insights' | 'dashboard'>('dashboard');
  const [isAuthenticated] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [sortField, setSortField] = useState<'name' | 'careScore' | 'marketCap'>('careScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data for demo
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      careScore: 87,
      sector: 'Technology',
      marketCap: 2800000000000,
      trend: 'up',
      change: 2.4
    },
    {
      id: '2',
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      careScore: 84,
      sector: 'Technology',
      marketCap: 2400000000000,
      trend: 'up',
      change: 1.8
    },
    {
      id: '3',
      name: 'Johnson & Johnson',
      symbol: 'JNJ',
      careScore: 82,
      sector: 'Healthcare',
      marketCap: 450000000000,
      trend: 'stable',
      change: 0.2
    },
    {
      id: '4',
      name: 'Patagonia Inc.',
      symbol: 'PTGA',
      careScore: 91,
      sector: 'Consumer Goods',
      marketCap: 8000000000,
      trend: 'up',
      change: 4.2
    }
  ];

  const displayCompanies = companies.length > 0 ? companies : mockCompanies;

  // Filter and sort logic
  const filteredCompanies = displayCompanies
    .filter(company => {
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'all' || company.sector === selectedSector;
      return matchesSearch && matchesSector;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      return (Number(aValue) - Number(bValue)) * multiplier;
    });

  const sectors = ['all', ...Array.from(new Set(displayCompanies.map(c => c.sector)))];

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const getCareScoreColor = (score: number) => {
    if (score >= 85) return 'var(--care-emerald)';
    if (score >= 75) return 'var(--care-vibrant-mint)';
    if (score >= 65) return 'var(--care-teal)';
    return 'var(--harm-coral)';
  };

  const avgCareScore = Math.round(displayCompanies.reduce((sum, c) => sum + c.careScore, 0) / displayCompanies.length);
  const topPerformers = displayCompanies.filter(c => c.careScore >= 85).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Coinbase-Style Navigation */}
      <CoinbaseStyleNavigation 
        currentPage={currentPage}
        isAuthenticated={isAuthenticated}
        onNavigateToLanding={() => setCurrentPage('landing')}
        onNavigateToAbout={() => setCurrentPage('about')}
        onNavigateToInsights={() => setCurrentPage('insights')}
        onNavigateToDashboard={() => setCurrentPage('dashboard')}
        onNavigateToLogin={() => {}}
        onLogout={() => {}}
        onLogoClick={() => {}}
      />

      {/* Main Content */}
      <main className="container coinbase-section">
        {/* Header Section */}
        <div className="coinbase-stack-large">
          <div>
            <h1 className="coinbase-card-title" style={{ fontSize: '32px', marginBottom: '8px' }}>
              Care Index Dashboard
            </h1>
            <p className="coinbase-card-description" style={{ fontSize: '16px' }}>
              Professional view of corporate care metrics across {displayCompanies.length} companies
            </p>
          </div>

          {/* Key Metrics - Coinbase Style */}
          <div className="coinbase-grid coinbase-grid-cols-3">
            <div className="coinbase-card">
              <div className="coinbase-metric">
                <div className="coinbase-metric-value">{avgCareScore}</div>
                <div className="coinbase-metric-label">Average Care Score</div>
                <div className="coinbase-metric-change positive">
                  <CoinbaseIcon name="trend" size={12} />
                  +2.4% this month
                </div>
              </div>
            </div>
            
            <div className="coinbase-card">
              <div className="coinbase-metric">
                <div className="coinbase-metric-value">{topPerformers}</div>
                <div className="coinbase-metric-label">Top Performers</div>
                <div className="coinbase-metric-change positive">
                  <CoinbaseIcon name="care" size={12} />
                  Score ≥ 85
                </div>
              </div>
            </div>
            
            <div className="coinbase-card">
              <div className="coinbase-metric">
                <div className="coinbase-metric-value">{displayCompanies.length}</div>
                <div className="coinbase-metric-label">Total Companies</div>
                <div className="coinbase-metric-change">
                  <CoinbaseIcon name="company" size={12} />
                  Tracked
                </div>
              </div>
            </div>
          </div>

          {/* Filters - Coinbase Style */}
          <div className="coinbase-card">
            <div className="coinbase-card-header">
              <div className="coinbase-card-title">Company Analysis</div>
              <div className="coinbase-card-description">
                Filter and analyze care performance across sectors
              </div>
            </div>
            
            <div className="coinbase-card-content">
              <div className="coinbase-grid coinbase-grid-cols-3" style={{ gap: '16px' }}>
                {/* Search */}
                <div style={{ position: 'relative' }}>
                  <CoinbaseIcon 
                    name="search" 
                    size={16} 
                    color="var(--text-secondary)"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="coinbase-input"
                    style={{ paddingLeft: '40px' }}
                  />
                </div>
                
                {/* Sector Filter */}
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="coinbase-input"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </option>
                  ))}
                </select>
                
                {/* Sort */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as any)}
                    className="coinbase-input"
                  >
                    <option value="careScore">Care Score</option>
                    <option value="name">Name</option>
                    <option value="marketCap">Market Cap</option>
                  </select>
                  <button
                    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                    className="coinbase-btn-ghost"
                    style={{ width: '44px', flexShrink: 0 }}
                  >
                    <CoinbaseIcon 
                      name={sortDirection === 'asc' ? 'chevronUp' : 'chevronDown'} 
                      size={16} 
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Showing {filteredCompanies.length} of {displayCompanies.length} companies
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div className="coinbase-status-online"></div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                Data updated 2 hours ago
              </span>
            </div>
          </div>

          {/* Companies Table - Coinbase Style */}
          <div className="coinbase-card" style={{ padding: '0', overflow: 'hidden' }}>
            <table className="coinbase-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Care Score</th>
                  <th>Sector</th>
                  <th>Market Cap</th>
                  <th>Trend</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, index) => (
                  <motion.tr
                    key={company.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="coinbase-interactive"
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div 
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '8px',
                            background: 'var(--bg-secondary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'var(--care-emerald)'
                          }}
                        >
                          {company.symbol.substring(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontWeight: '500', fontSize: '14px' }}>
                            {company.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                            {company.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span 
                          style={{
                            fontFamily: 'IBM Plex Mono, monospace',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: getCareScoreColor(company.careScore)
                          }}
                        >
                          {company.careScore}
                        </span>
                        {company.careScore >= 85 && (
                          <span className="coinbase-badge success">Top</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '14px' }}>{company.sector}</span>
                    </td>
                    <td>
                      <span 
                        style={{
                          fontFamily: 'IBM Plex Mono, monospace',
                          fontSize: '14px',
                          fontFeatureSettings: '"tnum" 1'
                        }}
                      >
                        {formatMarketCap(company.marketCap)}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CoinbaseIcon 
                          name="trend" 
                          size={14} 
                          color={company.trend === 'up' ? 'var(--success-600)' : 
                                 company.trend === 'down' ? 'var(--error-600)' : 
                                 'var(--text-secondary)'}
                        />
                        <span 
                          style={{
                            fontSize: '12px',
                            color: company.trend === 'up' ? 'var(--success-600)' : 
                                   company.trend === 'down' ? 'var(--error-600)' : 
                                   'var(--text-secondary)'
                          }}
                        >
                          {company.change > 0 ? '+' : ''}{company.change}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button className="coinbase-btn-ghost" style={{ padding: '0', width: '32px', height: '32px' }}>
                          <CoinbaseIcon name="insights" size={14} />
                        </button>
                        <button className="coinbase-btn-ghost" style={{ padding: '0', width: '32px', height: '32px' }}>
                          <CoinbaseIcon name="settings" size={14} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredCompanies.length === 0 && (
            <div className="coinbase-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <CoinbaseIcon name="search" size={20} color="var(--text-secondary)" />
              </div>
              <div className="coinbase-card-title" style={{ marginBottom: '8px' }}>
                No companies found
              </div>
              <div className="coinbase-card-description" style={{ marginBottom: '24px' }}>
                Try adjusting your search terms or filters
              </div>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSector('all');
                }}
                className="coinbase-btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer Note */}
      <div className="container" style={{ paddingBottom: '48px' }}>
        <div 
          className="coinbase-card"
          style={{
            background: 'var(--bg-mint-surface)',
            border: '1px solid rgba(43, 174, 102, 0.2)',
            textAlign: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <CoinbaseIcon name="carefolio" size={20} color="var(--care-emerald)" />
            <span style={{ color: 'var(--text-on-mint)', fontWeight: '500' }}>
              Coinbase-Level Professional Design Applied to Carefolio
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}