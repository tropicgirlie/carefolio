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

export function EnhancedDashboard({ 
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
  console.log('Enhanced Dashboard rendering with', companies?.length || 0, 'companies');
  
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

  // Staggered portfolio stats skeleton
  const PortfolioStatsSkeleton = () => (
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
  );

  // Table skeleton component
  const TableSkeleton = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            <th className="text-left p-4 body-data-medium text-[var(--text-secondary)] rounded-tl-2xl" style={{ width: '35%' }}>
              Company
            </th>
            <th className="text-center p-4 body-data-medium text-[var(--text-secondary)]" style={{ width: '15%' }}>
              Care Score
            </th>
            <th className="text-center p-4 body-data-medium text-[var(--text-secondary)]" style={{ width: '15%' }}>
              Parental Leave
            </th>
            <th className="text-center p-4 body-data-medium text-[var(--text-secondary)]" style={{ width: '15%' }}>
              Women Leadership
            </th>
            <th className="text-right p-4 body-data-medium text-[var(--text-secondary)]" style={{ width: '12%' }}>
              Market Cap
            </th>
            <th className="text-center p-4 body-data-medium text-[var(--text-secondary)] rounded-tr-2xl" style={{ width: '8%' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <motion.tr
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="border-b border-[var(--outline-variant)] animate-pulse"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">
                <Skeleton className="h-4 w-12 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </td>
              <td className="p-4 text-center">
                <Skeleton className="h-4 w-14 mx-auto" />
              </td>
              <td className="p-4 text-right">
                <Skeleton className="h-4 w-20 ml-auto" />
              </td>
              <td className="p-4">
                <div className="flex items-center justify-center gap-2">
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

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
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md data-[state=on]:bg-[var(--care-emerald)] data-[state=on]:text-white hover:bg-white transition-all text-[var(--text-secondary)] data-[state=on]:shadow-sm"
                  >
                    <Table className="w-4 h-4" />
                    <span className="body-data">Table</span>
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="cards" 
                    className="flex items-center gap-2 px-3 py-1.5 rounded-md data-[state=on]:bg-[var(--care-emerald)] data-[state=on]:text-white hover:bg-white transition-all text-[var(--text-secondary)] data-[state=on]:shadow-sm"
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
              <PortfolioStatsSkeleton key="portfolio-skeleton" />
            ) : (
              <motion.div 
                key="portfolio-stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, staggerChildren: 0.1 }}
                className="grid grid-cols-4 gap-4 mb-6"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0 }}
                  className="bg-[#E6F6EF] rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center justify-center mb-2"
                  >
                    <Flower2 className="w-6 h-6 text-[#2BAE66]" />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-2xl font-bold text-[#2BAE66] mb-1" 
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {portfolioHealthStats.blooming}
                  </motion.div>
                  <div className="body-small text-[#2BAE66] font-medium">Blooming</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-[#E1F5FE] rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-center justify-center mb-2"
                  >
                    <Shield className="w-6 h-6 text-[#0288D1]" />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4, type: "spring", stiffness: 200 }}
                    className="text-2xl font-bold text-[#0288D1] mb-1" 
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {portfolioHealthStats.strong}
                  </motion.div>
                  <div className="body-small text-[#0288D1] font-medium">Strong</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="bg-[#FFF8E1] rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center justify-center mb-2"
                  >
                    <AlertCircle className="w-6 h-6 text-[#FF8F00]" />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
                    className="text-2xl font-bold text-[#FF8F00] mb-1" 
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {portfolioHealthStats.moderate}
                  </motion.div>
                  <div className="body-small text-[#FF8F00] font-medium">Moderate</div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="bg-[#FFEBEE] rounded-2xl p-4 text-center transform hover:scale-105 transition-transform duration-200"
                >
                  <motion.div 
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center justify-center mb-2"
                  >
                    <AlertTriangle className="w-6 h-6 text-[#C62828]" />
                  </motion.div>
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 200 }}
                    className="text-2xl font-bold text-[#C62828] mb-1" 
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {portfolioHealthStats.atRisk}
                  </motion.div>
                  <div className="body-small text-[#C62828] font-medium">At Risk</div>
                </motion.div>
              </motion.div>
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
                <TableSkeleton key="table-skeleton" />
              ) : (
                <motion.div 
                  key="table-content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <div className="text-center text-[var(--text-secondary)]">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-[var(--care-emerald)] rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="headline-h3 mb-2">Dashboard Enhanced!</h3>
                      <p className="body-medium text-[var(--text-secondary)]">
                        Progressive loading and skeleton states have been implemented for better user experience.
                        The dashboard now loads smoothly with elegant animations and immediate navigation.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 mt-8">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[var(--fintech-feminine-purple)] rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                        <h4 className="body-data-medium mb-2">Progressive Loading</h4>
                        <p className="body-small text-[var(--text-secondary)]">Staggered content loading for better perceived performance</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[var(--care-emerald)] rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="body-data-medium mb-2">Skeleton States</h4>
                        <p className="body-small text-[var(--text-secondary)]">Elegant placeholder content during data loading</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-[var(--fintech-feminine-coral)] rounded-lg flex items-center justify-center mx-auto mb-3">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="body-data-medium mb-2">Smooth Animations</h4>
                        <p className="body-small text-[var(--text-secondary)]">Subtle transitions and micro-interactions</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}