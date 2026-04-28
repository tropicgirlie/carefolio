import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Skeleton } from './ui/skeleton';
import { Search, Filter, Grid, Table, Heart, TrendingUp, Users, Loader2, Eye, X, ArrowDown, ChevronDown, Sliders, BarChart3, Star, Flower2, Shield, AlertCircle, AlertTriangle } from 'lucide-react';
import { TopNavigation } from './TopNavigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { CompanyDetailsDrawer } from './CompanyDetailsDrawer';
import { Company } from '../data/companies';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

interface DashboardProps {
  companies: Company[];
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToLeaderboard: () => void;
  onNavigateToTechDocs: () => void;
  onNavigateToCompanyProfile: (company: Company) => void;
  onNavigateToDataQuality?: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
  isPortfolioOverviewExpanded: boolean;
  onTogglePortfolioOverview: () => void;
}

export function Dashboard({ 
  companies, 
  onNavigateToLanding, 
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToLeaderboard,
  onNavigateToTechDocs,
  onNavigateToCompanyProfile,
  onNavigateToDataQuality,
  onLogoClick,
  onLogout,
  isAuthenticated,
  isPortfolioOverviewExpanded,
  onTogglePortfolioOverview
}: DashboardProps) {
  console.log('Dashboard rendering with', companies?.length || 0, 'companies');
  
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Progressive loading states
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isPortfolioStatsLoading, setIsPortfolioStatsLoading] = useState(true);
  
  // Enhanced filter states
  const [selectedSector, setSelectedSector] = useState<string>('all-sectors');
  const [selectedCountry, setSelectedCountry] = useState<string>('all-countries');
  const [selectedCareBand, setSelectedCareBand] = useState<string>('all-bands');
  const [selectedMarketCap, setSelectedMarketCap] = useState<string>('all-sizes');
  const [scoreRange, setScoreRange] = useState<number[]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Favorites state
  const [favoriteCompanies, setFavoriteCompanies] = useState<Set<string>>(new Set());
  
  // Pagination state
  const [paginationOffset, setPaginationOffset] = useState(0);
  const [paginationLimit] = useState(50);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Company Details Drawer state
  const [drawerCompany, setDrawerCompany] = useState<Company | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Refs for accessibility
  const showMoreButtonRef = useRef<HTMLButtonElement>(null);
  const ariaLiveRef = useRef<HTMLDivElement>(null);

  // Ensure companies is always an array
  const safeCompanies = companies || [];

  // Safe data access helper function
  const safeDataAccess = (company: Company) => {
    const careScore = company.care_index?.score || 0;
    const careBand = company.care_index?.band || (
      careScore >= 85 ? 'A' : 
      careScore >= 70 ? 'B' :
      careScore >= 55 ? 'C' :
      careScore >= 40 ? 'D' : 'E'
    );
    
    const parentalWeeks = 
      company.care_metrics?.parental_leave?.weeks_paid ||
      company.care_metrics?.parental_leave?.weeks ||
      0;
      
    const womenLeadership = 
      company.care_metrics?.women_leadership?.board_percentage ||
      company.care_metrics?.women_leadership?.percentage ||
      0;

    return {
      careScore,
      careBand,
      parentalWeeks,
      womenLeadership,
      companyId: company.company_id || company.id || company.symbol || Math.random().toString(),
      name: company.name || 'Unknown Company',
      symbol: company.symbol || 'N/A',
      sector: company.sector || 'Unknown Sector',
      marketCap: company.market_cap || 0,
      country: company.country || 'Unknown'
    };
  };

  // Get unique filter options
  const getFilterOptions = () => {
    const sectors = [...new Set(safeCompanies.map(c => safeDataAccess(c).sector))].sort();
    const countries = [...new Set(safeCompanies.map(c => safeDataAccess(c).country))].sort();
    const careBands = ['A', 'B', 'C', 'D', 'E'];
    const marketCapSizes = ['Mega Cap', 'Large Cap', 'Mid Cap', 'Small Cap'];
    
    return { sectors, countries, careBands, marketCapSizes };
  };

  const { sectors, countries, careBands, marketCapSizes } = getFilterOptions();

  // Enhanced filter companies function
  const filteredCompanies = safeCompanies.filter(company => {
    const safeData = safeDataAccess(company);
    
    // Search filter
    const matchesSearch = safeData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           safeData.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
           safeData.sector.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Sector filter
    const matchesSector = selectedSector === 'all-sectors' || safeData.sector === selectedSector;
    
    // Country filter
    const matchesCountry = selectedCountry === 'all-countries' || safeData.country === selectedCountry;
    
    // Care Band filter
    const matchesCareBand = selectedCareBand === 'all-bands' || safeData.careBand === selectedCareBand;
    
    // Score Range filter
    const matchesScoreRange = safeData.careScore >= scoreRange[0] && safeData.careScore <= scoreRange[1];
    
    // Market Cap filter (simplified)
    const matchesMarketCap = selectedMarketCap === 'all-sizes' || true; // Simplified for now
    
    return matchesSearch && matchesSector && matchesCountry && matchesCareBand && matchesScoreRange && matchesMarketCap;
  });

  // Apply pagination
  const paginatedCompanies = filteredCompanies.slice(0, paginationOffset + paginationLimit);
  
  // Calculate pagination values
  const totalCompanies = filteredCompanies.length;
  const shownCompanies = paginatedCompanies.length;
  const hasMoreCompanies = shownCompanies < totalCompanies;

  // Calculate portfolio health statistics
  const portfolioHealthStats = {
    blooming: filteredCompanies.filter(c => safeDataAccess(c).careBand === 'A').length,
    strong: filteredCompanies.filter(c => safeDataAccess(c).careBand === 'B').length,
    moderate: filteredCompanies.filter(c => safeDataAccess(c).careBand === 'C').length,
    atRisk: filteredCompanies.filter(c => ['D', 'E'].includes(safeDataAccess(c).careBand)).length,
    totalCompanies: filteredCompanies.length,
    averageScore: filteredCompanies.length > 0 ? 
      Math.round(filteredCompanies.reduce((sum, c) => sum + (safeDataAccess(c).careScore || 0), 0) / filteredCompanies.length) : 0,
  };

  // Progressive loading simulation for better UX
  useEffect(() => {
    // Simulate portfolio stats loading
    const portfolioStatsTimer = setTimeout(() => {
      setIsPortfolioStatsLoading(false);
    }, 300);

    // Simulate data loading
    const dataTimer = setTimeout(() => {
      setIsDataLoading(false);
    }, 600);

    return () => {
      clearTimeout(portfolioStatsTimer);
      clearTimeout(dataTimer);
    };
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setPaginationOffset(0);
  }, [searchTerm, selectedSector, selectedCountry, selectedCareBand, selectedMarketCap, scoreRange]);

  // Keyboard shortcuts for drawer close (Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        handleDrawerClose();
      }
    };

    if (isDrawerOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Handle favorite toggle
  const handleToggleFavorite = (company: Company) => {
    const safeData = safeDataAccess(company);
    const companyId = safeData.companyId;
    
    setFavoriteCompanies(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(companyId)) {
        newFavorites.delete(companyId);
      } else {
        newFavorites.add(companyId);
      }
      return newFavorites;
    });
  };

  // Handle "Show more" button click
  const handleShowMore = async () => {
    if (isLoadingMore) return;

    setIsLoadingMore(true);
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const nextOffset = paginationOffset + paginationLimit;
    setPaginationOffset(nextOffset);
    
    setIsLoadingMore(false);
    
    setTimeout(() => {
      showMoreButtonRef.current?.focus();
    }, 100);
  };

  // Format market cap helper
  const formatMarketCap = (marketCap: number | string) => {
    let numValue: number;
    
    if (typeof marketCap === 'string') {
      if (marketCap.includes('B')) {
        numValue = parseFloat(marketCap.replace(/[^0-9.]/g, '')) * 1000000000;
      } else if (marketCap.includes('M')) {
        numValue = parseFloat(marketCap.replace(/[^0-9.]/g, '')) * 1000000;
      } else if (marketCap.includes('T')) {
        numValue = parseFloat(marketCap.replace(/[^0-9.]/g, '')) * 1000000000000;
      } else {
        numValue = parseFloat(marketCap.replace(/[^0-9.]/g, '')) || 0;
      }
    } else {
      numValue = marketCap || 0;
    }
    
    if (numValue >= 1000000000000) {
      return `$${(numValue / 1000000000000).toFixed(1)}T`;
    } else if (numValue >= 1000000000) {
      return `$${(numValue / 1000000000).toFixed(0)}B`;
    } else if (numValue >= 1000000) {
      return `$${(numValue / 1000000).toFixed(0)}M`;
    }
    return `$${numValue.toLocaleString()}`;
  };

  // Handle company detail view
  const handleCompanyDetail = (company: Company) => {
    setDrawerCompany(company);
    setIsDrawerOpen(true);
  };

  // Handle drawer close
  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setDrawerCompany(null);
    }, 200);
  };

  // Helper functions
  const getBandColors = (band: string) => {
    switch (band) {
      case 'A': return { bg: '#E6F6EF', text: '#2BAE66', border: '#2BAE66' };
      case 'B': return { bg: '#E0F5F3', text: '#009688', border: '#009688' };
      case 'C': return { bg: '#FFF3E0', text: '#F6A623', border: '#F6A623' };
      case 'D': return { bg: '#FDECEA', text: '#C62828', border: '#C62828' };
      case 'E': return { bg: '#FDECEA', text: '#C62828', border: '#C62828' };
      default: return { bg: '#F5F5F7', text: '#6B7280', border: '#6B7280' };
    }
  };

  const getCareBandLabel = (band: string) => {
    switch (band) {
      case 'A': return 'Band A';
      case 'B': return 'Band B';
      case 'C': return 'Band C';
      case 'D': return 'Band D';
      case 'E': return 'Band E';
      default: return band;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <TopNavigation 
        currentPage="dashboard"
        onNavigateToLanding={onNavigateToLanding}
        onNavigateToInsights={onNavigateToInsights}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToDashboard={() => {}}
        onLogoClick={onLogoClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />

      <main className="container py-6">
        {/* Enhanced Header with Progressive Loading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between gap-8 mb-6">
            {/* Left: Title with Inline Stats */}
            <div className="flex items-center gap-6">
              <h1 className="headline-subpage text-[var(--text-primary)] whitespace-nowrap">Care Index Dashboard</h1>
              <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="body-data">{portfolioHealthStats.totalCompanies} companies</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span className="body-data">Avg:</span>
                  <span className="text-[var(--care-emerald)] body-data-medium" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                    {portfolioHealthStats.averageScore}
                  </span>
                  <span className="body-data">
                    ({getCareBandLabel(portfolioHealthStats.averageScore >= 85 ? 'A' : portfolioHealthStats.averageScore >= 70 ? 'B' : portfolioHealthStats.averageScore >= 55 ? 'C' : portfolioHealthStats.averageScore >= 40 ? 'D' : 'E')})
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right: Enhanced Controls */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--outline-variant)] hover:bg-white hover:border-[var(--fintech-feminine-purple)] hover:text-[var(--fintech-feminine-purple)] transition-all duration-200"
              >
                <Filter className="w-4 h-4" />
                <span className="body-data">Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <div className="bg-[var(--bg-secondary)] border border-[var(--outline-variant)] p-1 rounded-lg">
                <ToggleGroup 
                  type="single" 
                  value={viewMode} 
                  onValueChange={(value) => value && setViewMode(value as 'table' | 'cards')}
                  className="gap-1"
                >
                  <ToggleGroupItem 
                    value="table" 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md data-[state=on]:bg-white data-[state=on]:text-[var(--text-primary)] hover:bg-white transition-all text-[var(--text-secondary)] data-[state=on]:shadow-sm"
                  >
                    <Table className="w-4 h-4" />
                    <span className="body-data">Table</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="cards" 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md data-[state=on]:bg-white data-[state=on]:text-[var(--text-primary)] hover:bg-white transition-all text-[var(--text-secondary)] data-[state=on]:shadow-sm"
                  >
                    <Grid className="w-4 h-4" />
                    <span className="body-data">Cards</span>
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          {/* Enhanced Portfolio Stats Row with Progressive Loading */}
          <AnimatePresence mode="wait">
            {isPortfolioStatsLoading ? (
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-100 rounded-2xl p-4 text-center animate-pulse"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                    <Skeleton className="h-8 w-12 mx-auto mb-1" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white border border-[var(--outline-variant)] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="data-large text-[var(--text-primary)] mb-1">
                        {portfolioHealthStats.blooming}
                      </div>
                      <div className="body-small text-[var(--text-secondary)]">Band A</div>
                    </div>
                    <div className="w-3 h-3 bg-[var(--care-emerald)] rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--outline-variant)] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="data-large text-[var(--text-primary)] mb-1">
                        {portfolioHealthStats.strong}
                      </div>
                      <div className="body-small text-[var(--text-secondary)]">Band B</div>
                    </div>
                    <div className="w-3 h-3 bg-[var(--care-teal)] rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--outline-variant)] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="data-large text-[var(--text-primary)] mb-1">
                        {portfolioHealthStats.moderate}
                      </div>
                      <div className="body-small text-[var(--text-secondary)]">Band C</div>
                    </div>
                    <div className="w-3 h-3 bg-[var(--neutral-lilac)] rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white border border-[var(--outline-variant)] rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="data-large text-[var(--text-primary)] mb-1">
                        {portfolioHealthStats.atRisk}
                      </div>
                      <div className="body-small text-[var(--text-secondary)]">Band D-E</div>
                    </div>
                    <div className="w-3 h-3 bg-[var(--harm-coral)] rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Enhanced Data View with Progressive Loading */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white rounded-2xl border border-[var(--outline-variant)] shadow-sm overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isDataLoading ? (
                <div className="overflow-x-auto">
                  <table className="dashboard-table w-full">
                    <thead>
                      <tr>
                        <th style={{ width: '35%' }}>Company</th>
                        <th style={{ width: '15%' }} className="text-center">Care Score</th>
                        <th style={{ width: '15%' }} className="text-center">Parental Leave</th>
                        <th style={{ width: '15%' }} className="text-center">Women Leadership</th>
                        <th style={{ width: '12%' }} className="text-right">Market Cap</th>
                        <th style={{ width: '8%' }} className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...Array(10)].map((_, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="animate-pulse"
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <Skeleton className="w-8 h-8 rounded-full" />
                              <div>
                                <Skeleton className="h-4 w-24 mb-1" />
                                <Skeleton className="h-3 w-16" />
                              </div>
                            </div>
                          </td>
                          <td className="text-center">
                            <Skeleton className="h-4 w-12 mx-auto" />
                          </td>
                          <td className="text-center">
                            <Skeleton className="h-4 w-16 mx-auto" />
                          </td>
                          <td className="text-center">
                            <Skeleton className="h-4 w-14 mx-auto" />
                          </td>
                          <td className="text-right">
                            <Skeleton className="h-4 w-20 ml-auto" />
                          </td>
                          <td>
                            <div className="action-buttons">
                              <Skeleton className="w-8 h-8 rounded" />
                              <Skeleton className="w-8 h-8 rounded" />
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Search and Filters */}
                  {showFilters && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-[var(--outline-variant)] p-6 bg-[var(--bg-secondary)]/30"
                    >
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">Search</label>
                          <Input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="carefolio-search-input"
                          />
                        </div>
                        
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">Sector</label>
                          <Select value={selectedSector} onValueChange={setSelectedSector}>
                            <SelectTrigger className="carefolio-select">
                              <SelectValue placeholder="All Sectors" />
                            </SelectTrigger>
                            <SelectContent className="carefolio-select-content">
                              <SelectItem value="all-sectors">All Sectors</SelectItem>
                              {sectors.map(sector => (
                                <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">Country</label>
                          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                            <SelectTrigger className="carefolio-select">
                              <SelectValue placeholder="All Countries" />
                            </SelectTrigger>
                            <SelectContent className="carefolio-select-content">
                              <SelectItem value="all-countries">All Countries</SelectItem>
                              {countries.map(country => (
                                <SelectItem key={country} value={country}>{country}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">Care Band</label>
                          <Select value={selectedCareBand} onValueChange={setSelectedCareBand}>
                            <SelectTrigger className="carefolio-select">
                              <SelectValue placeholder="All Bands" />
                            </SelectTrigger>
                            <SelectContent className="carefolio-select-content">
                              <SelectItem value="all-bands">All Bands</SelectItem>
                              {careBands.map(band => (
                                <SelectItem key={band} value={band}>Band {band}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div>
                          <label className="body-small text-[var(--text-secondary)] mb-2 block">
                            Care Score Range: {scoreRange[0]} - {scoreRange[1]}
                          </label>
                          <Slider
                            value={scoreRange}
                            onValueChange={setScoreRange}
                            max={100}
                            min={0}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="flex items-end gap-2">
                          <Button 
                            onClick={() => {
                              setSearchTerm('');
                              setSelectedSector('all-sectors');
                              setSelectedCountry('all-countries');
                              setSelectedCareBand('all-bands');
                              setScoreRange([0, 100]);
                            }}
                            variant="outline"
                            className="flex-1"
                          >
                            Clear Filters
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Table/Cards View */}
                  <div className="p-0">
                    {viewMode === 'table' ? (
                      /* Table View */
                      <div className="overflow-x-auto">
                        <table className="dashboard-table w-full">
                          <thead>
                            <tr>
                              <th style={{ width: '35%' }}>Company</th>
                              <th style={{ width: '15%' }} className="text-center">Care Score</th>
                              <th style={{ width: '15%' }} className="text-center">Parental Leave</th>
                              <th style={{ width: '15%' }} className="text-center">Women Leadership</th>
                              <th style={{ width: '12%' }} className="text-right">Market Cap</th>
                              <th style={{ width: '8%' }} className="text-center">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedCompanies.map((company, index) => {
                              const safeData = safeDataAccess(company);
                              const bandColors = getBandColors(safeData.careBand);
                              const isFavorite = favoriteCompanies.has(safeData.companyId);
                              
                              return (
                                <motion.tr
                                  key={safeData.companyId}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.2, delay: index * 0.02 }}
                                  className="dashboard-table-row cursor-pointer"
                                  onClick={() => handleCompanyDetail(company)}
                                >
                                  <td>
                                    <div className="flex items-center gap-3">
                                      <div 
                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white data-medium"
                                        style={{ backgroundColor: bandColors.bg, color: bandColors.text }}
                                      >
                                        {safeData.careBand}
                                      </div>
                                      <div>
                                        <div className="body-data-medium text-[var(--text-primary)]">
                                          {safeData.name}
                                        </div>
                                        <div className="body-small text-[var(--text-secondary)]">
                                          {safeData.symbol} • {safeData.sector}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <div 
                                      className="inline-flex items-center px-3 py-1 rounded-full data-medium"
                                      style={{ 
                                        backgroundColor: bandColors.bg, 
                                        color: bandColors.text,
                                        fontFamily: "'IBM Plex Mono', monospace"
                                      }}
                                    >
                                      {safeData.careScore}
                                    </div>
                                  </td>
                                  <td className="text-center">
                                    <span className="body-data text-[var(--text-primary)]">
                                      {safeData.parentalWeeks} weeks
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    <span className="body-data text-[var(--text-primary)]">
                                      {safeData.womenLeadership}%
                                    </span>
                                  </td>
                                  <td className="text-right">
                                    <span className="body-data text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {formatMarketCap(safeData.marketCap)}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="action-buttons">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleToggleFavorite(company);
                                        }}
                                        className={`action-button ${isFavorite ? 'favorite-active' : ''}`}
                                        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                      >
                                        <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCompanyDetail(company);
                                        }}
                                        className="action-button"
                                        title="View details"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </motion.tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      /* Cards View */
                      <div className="p-6">
                        <div className="carefolio-card-grid">
                          {paginatedCompanies.map((company, index) => {
                            const safeData = safeDataAccess(company);
                            const bandColors = getBandColors(safeData.careBand);
                            const isFavorite = favoriteCompanies.has(safeData.companyId);
                            
                            return (
                              <motion.div
                                key={safeData.companyId}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className="carefolio-card-clean cursor-pointer"
                                onClick={() => handleCompanyDetail(company)}
                              >
                                <div className="flex items-start justify-between mb-4">
                                  <div 
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white headline-h3"
                                    style={{ backgroundColor: bandColors.bg, color: bandColors.text }}
                                  >
                                    {safeData.careBand}
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleFavorite(company);
                                    }}
                                    className={`p-2 rounded-lg transition-colors ${isFavorite ? 'text-red-500' : 'text-[var(--text-secondary)] hover:text-red-500'}`}
                                  >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
                                
                                <div className="mb-4">
                                  <h3 className="headline-h3 text-[var(--text-primary)] mb-1">
                                    {safeData.name}
                                  </h3>
                                  <p className="body-small text-[var(--text-secondary)]">
                                    {safeData.symbol} • {safeData.sector}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                  <div className="text-center">
                                    <div 
                                      className="text-2xl font-bold mb-1"
                                      style={{ 
                                        color: bandColors.text,
                                        fontFamily: "'IBM Plex Mono', monospace"
                                      }}
                                    >
                                      {safeData.careScore}
                                    </div>
                                    <div className="body-small text-[var(--text-secondary)]">Care Score</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {safeData.parentalWeeks}
                                    </div>
                                    <div className="body-small text-[var(--text-secondary)]">Parental Weeks</div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-[var(--outline-variant)]">
                                  <div>
                                    <div className="body-small text-[var(--text-secondary)]">Women Leadership</div>
                                    <div className="body-data-medium text-[var(--text-primary)]">{safeData.womenLeadership}%</div>
                                  </div>
                                  <div className="text-right">
                                    <div className="body-small text-[var(--text-secondary)]">Market Cap</div>
                                    <div className="body-data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                                      {formatMarketCap(safeData.marketCap)}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Pagination */}
                    {hasMoreCompanies && (
                      <div className="p-6 text-center border-t border-[var(--outline-variant)]">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="body-small text-[var(--text-secondary)] mb-4">
                            Showing {shownCompanies} of {totalCompanies} companies
                          </p>
                          <Button
                            ref={showMoreButtonRef}
                            onClick={handleShowMore}
                            disabled={isLoadingMore}
                            className="md3-btn-outlined"
                          >
                            {isLoadingMore ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Loading...
                              </>
                            ) : (
                              <>
                                <ArrowDown className="w-4 h-4 mr-2" />
                                Show More Companies
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Accessibility live region */}
        <div 
          ref={ariaLiveRef}
          className="sr-only" 
          aria-live="polite" 
          aria-atomic="true"
        >
          {isLoadingMore && "Loading more companies..."}
          {hasMoreCompanies && `Showing ${shownCompanies} of ${totalCompanies} companies`}
        </div>
      </main>

      {/* Company Details Drawer */}
      <CompanyDetailsDrawer
        company={drawerCompany}
        isOpen={isDrawerOpen}
        onClose={handleDrawerClose}
        onCompareToPeers={onNavigateToCompanyProfile}
      />
    </div>
  );
}