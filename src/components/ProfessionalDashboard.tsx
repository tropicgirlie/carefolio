import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Icon, 
  DashboardIcon, 
  AnalyticsIcon, 
  CompaniesIcon, 
  FilterIcon, 
  SearchIcon, 
  TrendUpIcon,
  CareScoreIcon,
  TeamIcon,
  VerifiedIcon,
  ViewIcon,
  MoreIcon,
  ExportIcon
} from './icons/ProfessionalIcons';

interface Company {
  id: string;
  name: string;
  symbol: string;
  sector: string;
  careScore: number;
  marketCap: number;
  employees: number;
  trend: 'up' | 'down' | 'stable';
  verified: boolean;
  lastUpdated: string;
}

interface ProfessionalDashboardProps {
  companies: Company[];
  onCompanySelect?: (company: Company) => void;
}

export function ProfessionalDashboard({ companies, onCompanySelect }: ProfessionalDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [sortField, setSortField] = useState<'name' | 'careScore' | 'marketCap'>('careScore');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Scroll state management
  const proScrollRef = useRef<HTMLDivElement>(null);
  const [proShowTopFade, setProShowTopFade] = useState(false);
  const [proShowBottomFade, setProShowBottomFade] = useState(false);

  const updateProScrollIndicators = useCallback(() => {
    const el = proScrollRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setProShowTopFade(scrollTop > 8);
    setProShowBottomFade(scrollTop + clientHeight < scrollHeight - 8);
  }, []);

  useEffect(() => {
    const el = proScrollRef.current;
    if (!el) return;
    const timer = setTimeout(updateProScrollIndicators, 100);
    el.addEventListener('scroll', updateProScrollIndicators, { passive: true });
    const resizeObserver = new ResizeObserver(updateProScrollIndicators);
    resizeObserver.observe(el);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', updateProScrollIndicators);
      resizeObserver.disconnect();
    };
  }, [updateProScrollIndicators]);

  // Filter and sort companies
  const filteredCompanies = companies
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

  // Get unique sectors
  const sectors = ['all', ...Array.from(new Set(companies.map(c => c.sector)))];

  // Calculate summary metrics
  const avgCareScore = Math.round(companies.reduce((sum, c) => sum + c.careScore, 0) / companies.length);
  const topPerformers = companies.filter(c => c.careScore >= 80).length;
  const verifiedCount = companies.filter(c => c.verified).length;

  const formatMarketCap = (value: number) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toLocaleString()}`;
  };

  const getCareScoreColor = (score: number) => {
    if (score >= 80) return 'var(--success-600)';
    if (score >= 60) return 'var(--warning-600)';
    return 'var(--error-600)';
  };

  const handleSort = (field: 'name' | 'careScore' | 'marketCap') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="min-h-screen bg-professional">
      {/* Professional Navigation */}
      <nav className="nav-professional">
        <div className="nav-content">
          <div className="nav-logo">
            <Icon name="carefolio" size={28} color="var(--brand-primary)" />
            <span>Carefolio</span>
          </div>
          
          <div className="nav-links">
            <a href="#" className="nav-link active">
              <DashboardIcon size={16} />
              Dashboard
            </a>
            <a href="#" className="nav-link">
              <AnalyticsIcon size={16} />
              Analytics
            </a>
            <a href="#" className="nav-link">
              <CompaniesIcon size={16} />
              Companies
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="btn-ghost">
              <ExportIcon size={16} />
              Export
            </button>
            <button className="btn-secondary">
              <MoreIcon size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="grid-professional py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-display-md mb-2">Care Index Dashboard</h1>
            <p className="text-body-md text-secondary-professional">
              Track and analyze corporate care metrics across {companies.length} companies
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-caption">LAST UPDATED</span>
            <span className="text-body-sm">2 hours ago</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 mb-8">
          <div className="metric-card">
            <div className="metric-value">{avgCareScore}</div>
            <div className="metric-label">Average Care Score</div>
            <div className="flex items-center justify-center mt-3">
              <TrendUpIcon size={16} color="var(--success-600)" />
              <span className="text-body-sm text-secondary-professional ml-2">+2.4% this month</span>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{topPerformers}</div>
            <div className="metric-label">Top Performers</div>
            <div className="flex items-center justify-center mt-3">
              <CareScoreIcon size={16} color="var(--success-600)" />
              <span className="text-body-sm text-secondary-professional ml-2">Score ≥ 80</span>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-value">{verifiedCount}</div>
            <div className="metric-label">Verified Companies</div>
            <div className="flex items-center justify-center mt-3">
              <VerifiedIcon size={16} color="var(--brand-primary)" />
              <span className="text-body-sm text-secondary-professional ml-2">Data verified</span>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="card-professional mb-6">
          <div className="card-content">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row gap-4 flex-1">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <SearchIcon 
                    size={20} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-tertiary-professional" 
                  />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-professional pl-10"
                  />
                </div>
                
                {/* Sector Filter */}
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="input-professional w-48"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('table')}
                  className={`btn-ghost ${viewMode === 'table' ? 'bg-elevated' : ''}`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`btn-ghost ${viewMode === 'cards' ? 'bg-elevated' : ''}`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-body-sm text-secondary-professional">
            Showing {filteredCompanies.length} of {companies.length} companies
          </span>
          <span className="text-caption">
            SORT BY {sortField.toUpperCase()} {sortDirection.toUpperCase()}
          </span>
        </div>

        {/* Data Display */}
        {viewMode === 'table' ? (
          /* Table View */
          <div className="card-professional relative">
            <div
              ref={proScrollRef}
              className="table-scroll-container overflow-y-auto"
              style={{ maxHeight: filteredCompanies.length > 10 ? '680px' : 'none' }}
            >
            <table className="table-professional">
              <thead className="sticky top-0 z-10" style={{ background: 'var(--bg-secondary)' }}>
                <tr>
                  <th>
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-professional"
                    >
                      Company
                      {sortField === 'name' && (
                        <TrendUpIcon 
                          size={12} 
                          className={sortDirection === 'desc' ? 'rotate-180' : ''} 
                        />
                      )}
                    </button>
                  </th>
                  <th>
                    <button
                      onClick={() => handleSort('careScore')}
                      className="flex items-center gap-2 hover:text-professional"
                    >
                      Care Score
                      {sortField === 'careScore' && (
                        <TrendUpIcon 
                          size={12} 
                          className={sortDirection === 'desc' ? 'rotate-180' : ''} 
                        />
                      )}
                    </button>
                  </th>
                  <th>Sector</th>
                  <th>
                    <button
                      onClick={() => handleSort('marketCap')}
                      className="flex items-center gap-2 hover:text-professional"
                    >
                      Market Cap
                      {sortField === 'marketCap' && (
                        <TrendUpIcon 
                          size={12} 
                          className={sortDirection === 'desc' ? 'rotate-180' : ''} 
                        />
                      )}
                    </button>
                  </th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company, index) => (
                  <motion.tr
                    key={company.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:shadow-subtle cursor-pointer"
                    onClick={() => onCompanySelect?.(company)}
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-elevated flex items-center justify-center">
                          <span className="text-data-sm text-brand-primary font-semibold">
                            {company.symbol.substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="text-heading-sm">{company.name}</div>
                          <div className="text-body-sm text-secondary-professional">
                            {company.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <span 
                          className="text-data-md font-semibold"
                          style={{ color: getCareScoreColor(company.careScore) }}
                        >
                          {company.careScore}
                        </span>
                        {company.trend === 'up' && (
                          <TrendUpIcon size={12} color="var(--success-600)" />
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="text-body-sm">{company.sector}</span>
                    </td>
                    <td>
                      <span className="text-data-sm">{formatMarketCap(company.marketCap)}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {company.verified && (
                          <VerifiedIcon size={16} color="var(--brand-primary)" />
                        )}
                        <span className="status-positive">Active</span>
                      </div>
                    </td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onCompanySelect?.(company);
                        }}
                        className="btn-ghost"
                      >
                        <ViewIcon size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            </div>
            {/* Scroll fade indicators */}
            <div 
              className={`table-scroll-fade-top ${proShowTopFade ? 'visible' : ''}`}
              style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
            />
            <div 
              className={`table-scroll-fade-bottom ${proShowBottomFade ? 'visible' : ''}`}
              style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}
            />
          </div>
        ) : (
          /* Cards View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-professional hover-lift cursor-pointer"
                onClick={() => onCompanySelect?.(company)}
              >
                <div className="card-header">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-elevated flex items-center justify-center">
                      <span className="text-heading-sm text-brand-primary font-semibold">
                        {company.symbol.substring(0, 2)}
                      </span>
                    </div>
                    {company.verified && (
                      <VerifiedIcon size={20} color="var(--brand-primary)" />
                    )}
                  </div>
                  <div className="card-title">{company.name}</div>
                  <div className="card-description">{company.symbol} • {company.sector}</div>
                </div>
                
                <div className="card-content">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-caption">CARE SCORE</span>
                    <div className="flex items-center gap-2">
                      <span 
                        className="text-data-lg"
                        style={{ color: getCareScoreColor(company.careScore) }}
                      >
                        {company.careScore}
                      </span>
                      {company.trend === 'up' && (
                        <TrendUpIcon size={16} color="var(--success-600)" />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-body-sm text-secondary-professional">Market Cap</span>
                      <span className="text-data-sm">{formatMarketCap(company.marketCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body-sm text-secondary-professional">Employees</span>
                      <span className="text-data-sm">{company.employees.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-body-sm text-secondary-professional">Last Updated</span>
                      <span className="text-body-sm">{company.lastUpdated}</span>
                    </div>
                  </div>
                  
                  <button className="btn-primary w-full mt-4">
                    <ViewIcon size={16} />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="card-professional text-center py-12">
            <div className="w-16 h-16 rounded-full bg-elevated flex items-center justify-center mx-auto mb-4">
              <SearchIcon size={24} color="var(--text-tertiary)" />
            </div>
            <div className="text-heading-md mb-2">No companies found</div>
            <div className="text-body-md text-secondary-professional mb-6">
              Try adjusting your search terms or filters
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSector('all');
              }}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// Example usage with mock data
export function ProfessionalDashboardDemo() {
  const mockCompanies: Company[] = [
    {
      id: '1',
      name: 'Apple Inc.',
      symbol: 'AAPL',
      sector: 'Technology',
      careScore: 87,
      marketCap: 2800000000000,
      employees: 154000,
      trend: 'up',
      verified: true,
      lastUpdated: '2 hours ago'
    },
    {
      id: '2',
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      sector: 'Technology',
      careScore: 84,
      marketCap: 2400000000000,
      employees: 221000,
      trend: 'up',
      verified: true,
      lastUpdated: '1 hour ago'
    },
    {
      id: '3',
      name: 'Johnson & Johnson',
      symbol: 'JNJ',
      sector: 'Healthcare',
      careScore: 82,
      marketCap: 450000000000,
      employees: 144500,
      trend: 'stable',
      verified: true,
      lastUpdated: '3 hours ago'
    },
    {
      id: '4',
      name: 'Walmart Inc.',
      symbol: 'WMT',
      sector: 'Consumer Discretionary',
      careScore: 76,
      marketCap: 400000000000,
      employees: 2300000,
      trend: 'up',
      verified: true,
      lastUpdated: '1 hour ago'
    },
    {
      id: '5',
      name: 'ExxonMobil Corporation',
      symbol: 'XOM',
      sector: 'Energy',
      careScore: 58,
      marketCap: 250000000000,
      employees: 63000,
      trend: 'down',
      verified: false,
      lastUpdated: '4 hours ago'
    }
  ];

  return (
    <ProfessionalDashboard 
      companies={mockCompanies}
      onCompanySelect={(company) => console.log('Selected:', company.name)}
    />
  );
}