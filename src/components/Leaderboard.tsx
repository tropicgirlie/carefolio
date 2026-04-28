import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Eye, ArrowUpDown, ArrowUp, ArrowDown, LogOut, BarChart3, Filter, MoreHorizontal, ExternalLink, Users, Shield, Sparkles, Settings, X, TrendingUp, Award, Briefcase, ChevronDown, Loader2, LayoutGrid, Lightbulb, Info, Mail, Lock } from 'lucide-react';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from './ui/drawer';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Label } from './ui/label';
import { Company } from '../data/companies';
import { generateInterestingFacts, getRandomFact, getFactIcon, getFactColor, InterestingFact } from '../utils/interestingFacts';
import { CarefolioCardView } from './CarefolioCardView';

interface LeaderboardProps {
  companies: Company[];
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onNavigateToCompanyProfile: (company: Company) => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

// Redesigned Company Details Drawer - Clean Professional Layout
const CompanyDetailsDrawer = ({ 
  isOpen, 
  onClose, 
  company 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  company: Company | null; 
}) => {
  if (!company) return null;
  
  const score = company.care_index?.score || 0;
  const band = score >= 85 ? 'A' : score >= 75 ? 'B' : score >= 65 ? 'C' : 'D';
  const getBandColor = (band: string) => {
    switch (band) {
      case 'A': return '#2BAE66';
      case 'B': return '#009688';
      case 'C': return '#F59E0B';
      case 'D': return '#EF4444';
      default: return '#6B7280';
    }
  };
  const bandColor = getBandColor(band);
  const getBandLabel = (band: string) => {
    switch (band) {
      case 'A': return 'Blooming';
      case 'B': return 'Strong';
      case 'C': return 'Moderate';
      case 'D': return 'At Risk';
      default: return 'Unknown';
    }
  };
  const bandLabel = getBandLabel(band);
  const getBandIcon = (band: string) => {
    switch (band) {
      case 'A': return '🌸';
      case 'B': return '💎';
      case 'C': return '🟡';
      case 'D': return '🔴';
      default: return '❓';
    }
  };
  const bandIcon = getBandIcon(band);

  // Get interesting facts for this company
  const interestingFacts = generateInterestingFacts(company);
  
  return (
    <Drawer open={isOpen} onOpenChange={onClose} direction="right">
      <DrawerContent className="h-full w-[480px] max-w-[90vw] bg-surface border-l border-outline">
        {/* Header: Logo left, Badge right, Company info below, Divider */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            {/* Left: Logo initials in circle */}
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: bandColor }}
            >
              {company.symbol ? company.symbol.substring(0, 2) : company.name ? company.name.substring(0, 2).toUpperCase() : '??'}
            </div>
            
            {/* Right: Blooming badge (chip style, soft background) */}
            <div className="flex items-center gap-3">
              <div 
                className="px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5"
                style={{ 
                  backgroundColor: band === 'A' ? 'rgba(43, 174, 102, 0.1)' : 'rgba(107, 114, 128, 0.1)',
                  color: bandColor,
                  border: `1px solid ${bandColor}20`
                }}
              >
                <span>{bandIcon}</span>
                <span>{bandLabel}</span>
              </div>
              <DrawerClose asChild>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
                  <X className="w-4 h-4" />
                </Button>
              </DrawerClose>
            </div>
          </div>
          
          {/* Below: Company name bold, sector + geography muted */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-on-surface mb-1">
              {company.name || 'Unknown Company'}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {company.sector || 'Unknown Sector'} • {company.country || 'Unknown Country'}
            </p>
          </div>
          
          {/* Divider line */}
          <div className="border-b border-outline-variant"></div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6">
          {/* Care Score: Large IBM Plex Mono number, sub-label, pale green background for Blooming */}
          <div 
            className="text-center py-6 rounded-xl"
            style={{ 
              backgroundColor: band === 'A' ? 'rgba(43, 174, 102, 0.05)' : 'transparent'
            }}
          >
            <div 
              className="font-bold mb-2"
              style={{ 
                color: bandColor,
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '64px',
                lineHeight: '1',
                fontWeight: '700'
              }}
            >
              {score}
            </div>
            <p className="text-sm text-on-surface-variant">
              Care Score - Band {band}
            </p>
          </div>
          
          {/* Metrics Grid (2x2): Card style with icon + metric */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-container rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🍼</div>
              <div className="text-lg font-bold text-on-surface mb-1 font-mono">
                {company.care_metrics?.parental_leave?.weeks || 0}w
              </div>
              <div className="text-xs text-on-surface-variant">
                Parental Leave
              </div>
            </div>
            <div className="bg-surface-container rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">👩‍💼</div>
              <div className="text-lg font-bold text-on-surface mb-1 font-mono">
                {company.care_metrics?.women_leadership?.percentage || 0}%
              </div>
              <div className="text-xs text-on-surface-variant">
                Women Leadership
              </div>
            </div>
            <div className="bg-surface-container rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div className="text-lg font-bold text-on-surface mb-1 font-mono">
                {company.care_metrics?.pay_equity?.score || 0}
              </div>
              <div className="text-xs text-on-surface-variant">
                Transparency
              </div>
            </div>
            <div className="bg-surface-container rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💹</div>
              <div className="text-lg font-bold text-on-surface mb-1 font-mono">
                {typeof company.market_cap === 'string' ? company.market_cap : `${(company.market_cap || 0)}B`}
              </div>
              <div className="text-xs text-on-surface-variant">
                Market Cap
              </div>
            </div>
          </div>
          
          {/* Pillar Row: Four tabs with mini icon + label, hover tooltips */}
          <div className="flex items-center justify-between border-b border-outline-variant">
            {[
              { 
                icon: '🌱', 
                name: 'Nurture', 
                strong: (company.care_metrics?.parental_leave?.weeks || 0) >= 12,
                tooltip: `${company.care_metrics?.parental_leave?.weeks || 0} weeks parental leave policy`
              },
              { 
                icon: '🧱', 
                name: 'Resilience', 
                strong: (company.care_metrics?.women_leadership?.percentage || 0) >= 30,
                tooltip: `${company.care_metrics?.women_leadership?.percentage || 0}% women in leadership positions`
              },
              { 
                icon: '🧭', 
                name: 'Stability', 
                strong: score >= 70,
                tooltip: `Overall care score of ${score} indicates ${score >= 70 ? 'stable' : 'developing'} care practices`
              },
              { 
                icon: '♻️', 
                name: 'Sustainability', 
                strong: (company.care_metrics?.pay_equity?.score || 0) >= 70,
                tooltip: `Pay equity transparency score: ${company.care_metrics?.pay_equity?.score || 0}/100`
              }
            ].map((pillar, index) => (
              <Tooltip key={`pillar-${pillar.name}-${index}`}>
                <TooltipTrigger asChild>
                  <div 
                    className={`flex flex-col items-center py-3 px-2 border-b-2 transition-colors cursor-pointer ${
                      pillar.strong 
                        ? 'border-care-emerald text-care-emerald' 
                        : 'border-transparent text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="text-lg mb-1">{pillar.icon}</span>
                    <span className="text-xs font-medium">{pillar.name}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{pillar.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          
          {/* Did You Know? Card: Light yellow background, rounded corners */}
          <div 
            className="rounded-lg p-4"
            style={{ backgroundColor: '#FEF3C7' }}
          >
            <h4 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              💡 Did you know?
            </h4>
            <div className="space-y-3">
              {interestingFacts.length > 0 ? (
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                    {interestingFacts[0].text}
                  </p>
                  <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                    <span>{interestingFacts[0].source}</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-800 leading-relaxed mb-2">
                    {company.name} offers {company.care_metrics?.parental_leave?.weeks || 0} weeks parental leave vs. S&P 500 median of 10 weeks.
                  </p>
                  <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium">
                    <span>Company policy documents, S&P 500 analysis</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Simple Verification */}
          <div className="flex items-center gap-2 justify-center py-2">
            <Shield className="w-4 h-4 text-care-emerald" />
            <span className="text-xs text-on-surface-variant">Verified from 3 trusted sources</span>
          </div>
          
          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              disabled
              className="w-full h-10 text-sm bg-surface-container text-on-surface-variant rounded-lg cursor-not-allowed flex items-center justify-center gap-2 border border-outline-variant"
            >
              <Users className="w-4 h-4" />
              Compare to Peers (Coming Soon)
            </button>
            <button className="w-full h-10 bg-transparent border-2 border-care-emerald text-care-emerald rounded-lg flex items-center justify-center gap-2 hover:bg-care-emerald hover:text-white transition-colors text-sm font-medium">
              <ExternalLink className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export function Leaderboard({ 
  companies, 
  onNavigateToLanding, 
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToDashboard,
  onNavigateToTechDocs,
  onNavigateToCompanyProfile,
  onLogoClick,
  onLogout,
  isAuthenticated 
}: LeaderboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const [careBandFilter, setCareBandFilter] = useState('all');
  const [sortField, setSortField] = useState<string>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showInterestingFacts, setShowInterestingFacts] = useState(false);
  
  // Show More state - starts with 20 companies, loads 20 more each time
  const [visibleCount, setVisibleCount] = useState(20);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  // Login modal state
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Ensure companies is always an array
  const safeCompanies = companies || [];

  // Calculate portfolio metrics for compact overview strip
  const bloomingCount = safeCompanies.filter(c => c?.care_index?.score >= 85).length;
  const strongCount = safeCompanies.filter(c => (c?.care_index?.score >= 75 && c?.care_index?.score < 85)).length;
  const moderateCount = safeCompanies.filter(c => (c?.care_index?.score >= 65 && c?.care_index?.score < 75)).length;
  const atRiskCount = safeCompanies.filter(c => (c?.care_index?.score || 0) < 65).length;
  const totalInvestments = bloomingCount + strongCount + moderateCount + atRiskCount;

  // Filter and sort companies - using useMemo for performance
  const filteredAndSortedCompanies = useMemo(() => {
    // First filter
    const filteredCompanies = safeCompanies.filter(company => {
      if (!company || !company.name) return false;
      
      // Search only company names now
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
      
      const matchesCountry = countryFilter === 'all' || company.country === countryFilter;
      
      const matchesBand = careBandFilter === 'all' || (() => {
        const score = company.care_index?.score || 0;
        if (careBandFilter === 'A') return score >= 85;
        if (careBandFilter === 'B') return score >= 75 && score < 85;
        if (careBandFilter === 'C') return score >= 65 && score < 75;
        if (careBandFilter === 'D') return score < 65;
        return true;
      })();

      return matchesSearch && matchesSector && matchesCountry && matchesBand;
    });

    // Then sort
    const sortedCompanies = [...filteredCompanies].sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortField) {
        case 'score':
          aValue = a.care_index?.score || 0;
          bValue = b.care_index?.score || 0;
          break;
        case 'name':
          aValue = (a.name || '').toLowerCase();
          bValue = (b.name || '').toLowerCase();
          break;
        case 'sector':
          aValue = (a.sector || '').toLowerCase();
          bValue = (b.sector || '').toLowerCase();
          break;
        case 'country':
          aValue = (a.country || '').toLowerCase();
          bValue = (b.country || '').toLowerCase();
          break;
        case 'parental':
          aValue = a.care_metrics?.parental_leave?.weeks || 0;
          bValue = b.care_metrics?.parental_leave?.weeks || 0;
          break;
        case 'women':
          aValue = a.care_metrics?.women_leadership?.percentage || 0;
          bValue = b.care_metrics?.women_leadership?.percentage || 0;
          break;
        case 'transparency':
          aValue = a.care_metrics?.pay_equity?.score || 0;
          bValue = b.care_metrics?.pay_equity?.score || 0;
          break;
        default:
          aValue = a.care_index?.score || 0;
          bValue = b.care_index?.score || 0;
      }
      
      if (typeof aValue === 'string') {
        return sortDirection === 'desc' ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
      } else {
        return sortDirection === 'desc' ? bValue - aValue : aValue - bValue;
      }
    });

    return sortedCompanies;
  }, [safeCompanies, searchTerm, sectorFilter, countryFilter, careBandFilter, sortField, sortDirection]);

  // Get currently visible companies
  const visibleCompanies = filteredAndSortedCompanies.slice(0, visibleCount);
  const hasMoreCompanies = visibleCount < filteredAndSortedCompanies.length;
  const remainingCount = filteredAndSortedCompanies.length - visibleCount;

  // Get unique sectors and countries
  const uniqueSectors = [...new Set(safeCompanies.map(c => c.sector).filter(Boolean))].sort();
  const uniqueCountries = [...new Set(safeCompanies.map(c => c.country).filter(Boolean))].sort();

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
    // Reset visible count when sorting changes
    setVisibleCount(20);
  };

  // Get sort icon - Material 3 styling
  const getSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="w-5 h-5 text-on-surface-variant ml-2" />;
    return sortDirection === 'desc' ? 
      <ArrowDown className="w-5 h-5 text-primary ml-2" /> : 
      <ArrowUp className="w-5 h-5 text-primary ml-2" />;
  };

  // Handle row click
  const handleRowClick = (company: Company) => {
    setSelectedCompany(company);
    setShowDetails(true);
  };

  // Handle Show More
  const handleShowMore = () => {
    setIsLoadingMore(true);
    // Simulate loading delay for better UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 20, filteredAndSortedCompanies.length));
      setIsLoadingMore(false);
    }, 500);
  };

  // Handle Show All
  const handleShowAll = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(filteredAndSortedCompanies.length);
      setIsLoadingMore(false);
    }, 800);
  };

  // Reset visible count when filters change
  const handleFilterChange = (filterType: string, value: string) => {
    setVisibleCount(20);
    if (filterType === 'search') setSearchTerm(value);
    if (filterType === 'sector') setSectorFilter(value);
    if (filterType === 'country') setCountryFilter(value);
    if (filterType === 'band') setCareBandFilter(value);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-surface">
        {/* Enhanced Material 3 Header - Grid-aligned Navigation */}
        <header className="navbar-container">
          <div className="container">
            <div className="navbar-content">
              {/* Enhanced Logo - Larger Size */}
              <div className="navbar-left">
                <div 
                  className="flex items-center gap-5 cursor-pointer state-layer rounded-xl px-3 py-3 transition-all duration-200"
                  onClick={onLogoClick}
                  title="Triple-click for developer access"
                >
                  <img src={carefolioLogo} alt="Carefolio" className="w-12 h-12" />
                  <span className="headline-h3 text-primary">Carefolio</span>
                </div>
              </div>

              {/* Enhanced Navigation - Grid-aligned center */}
              <nav className="navbar-center hidden md:flex">
                <button 
                  onClick={onNavigateToLanding}
                  className="nav-link"
                >
                  Home
                </button>
                <button 
                  onClick={onNavigateToAbout}
                  className="nav-link"
                >
                  About
                </button>
                <span className="nav-link active">Dashboard</span>
                <button 
                  onClick={onNavigateToInsights}
                  className="nav-link"
                >
                  Insights
                </button>
              </nav>

              {/* Enhanced Actions - Grid-aligned right */}
              <div className="navbar-right flex items-center gap-4">
                {/* Join Waitlist Button */}
                <button 
                  className="nav-cta-button"
                  onClick={() => window.open('https://carefolio.beehiiv.com/', '_blank')}
                >
                  <Mail className="w-4 h-4" />
                  Join Waitlist
                </button>
                
                <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
                  <DialogTrigger asChild>
                    <button className="nav-cta-button">
                      <Lock className="w-4 h-4" />
                      Login
                    </button>
                  </DialogTrigger>
                  
                  {/* Clean Login Modal */}
                  <DialogContent className="sm:max-w-md bg-white border-0 rounded-xl shadow-xl">
                    <div className="px-6 py-6">
                      <DialogHeader className="text-center mb-6">
                        <DialogTitle className="headline-h3 text-[var(--text-primary)] mb-2">
                          Enter the Carefolio Demo
                        </DialogTitle>
                        <DialogDescription className="body-medium text-[var(--text-secondary)]">
                          Preview 25 companies and their care scores.
                        </DialogDescription>
                      </DialogHeader>

                      <form className="space-y-4">
                        {/* Demo Credentials */}
                        <div className="bg-[var(--bg-mint-surface)] border border-[var(--care-emerald)]/20 rounded-lg p-4 mb-4">
                          <p className="body-small text-[var(--text-on-mint)]">
                            Demo credentials: <span className="data-small">admin / pitombeira</span>
                          </p>
                        </div>

                        <div>
                          <Label htmlFor="username" className="body-small-medium text-[var(--text-primary)]">
                            Username
                          </Label>
                          <Input
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="admin"
                            className="mt-1 h-12 border-[var(--outline-variant)] focus:border-[var(--care-emerald)] rounded-lg"
                          />
                        </div>

                        <div>
                          <Label htmlFor="password" className="body-small-medium text-[var(--text-primary)]">
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="pitombeira"
                            className="mt-1 h-12 border-[var(--outline-variant)] focus:border-[var(--care-emerald)] rounded-lg"
                          />
                        </div>

                        <Button 
                          type="button"
                          onClick={() => setIsLoginOpen(false)}
                          className="w-full h-12 bg-[var(--cta-orange)] hover:bg-[var(--cta-orange-light)] text-white rounded-full font-medium transition-all duration-200"
                        >
                          Login (Demo Only)
                        </Button>
                      </form>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="flex items-center bg-surface-container border border-outline rounded-full p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className={`px-6 py-3 rounded-full body-medium h-12 ${
                      viewMode === 'table' 
                        ? 'bg-primary text-on-primary hover:bg-primary/90' 
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Table
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    className={`px-6 py-3 rounded-full body-medium h-12 ${
                      viewMode === 'cards' 
                        ? 'bg-primary text-on-primary hover:bg-primary/90' 
                        : 'text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <LayoutGrid className="w-5 h-5 mr-2" />
                    Cards
                  </Button>
                </div>
                <button 
                  onClick={onLogout}
                  className="md3-btn-outlined flex items-center gap-3 px-8 py-4 min-h-14 body-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Enhanced Material 3 Main container - Grid-aligned Layout */}
        <div className="container py-8">
          {/* Enhanced Material 3 Portfolio Overview Card - Larger */}
          {totalInvestments > 0 && (
            <div className="portfolio-composition-chip mb-8">
              <div className="portfolio-composition-content">
                <div className="portfolio-composition-badge">
                  <span className="badge-icon text-2xl">🌸</span>
                  <span className="body-data">Blooming</span>
                  <span className="badge-number data-medium">{bloomingCount}</span>
                </div>
                <div className="portfolio-composition-badge">
                  <span className="badge-icon text-xl">💎</span>
                  <span className="body-data">Strong</span>
                  <span className="badge-number data-medium">{strongCount}</span>
                </div>
                <div className="portfolio-composition-badge">
                  <span className="badge-icon text-xl">🟡</span>
                  <span className="body-data">Moderate</span>
                  <span className="badge-number data-medium">{moderateCount}</span>
                </div>
                <div className="portfolio-composition-badge">
                  <span className="badge-icon text-xl">🔴</span>
                  <span className="body-data">At Risk</span>
                  <span className="badge-number data-medium">{atRiskCount}</span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="md3-btn-text text-primary hover:text-primary/80 body-data-medium"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Care Distribution
              </Button>
            </div>
          )}

          {/* Enhanced Material 3 Filter Toolbar - Larger Components with Country Filter */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 mb-8 elevation-1">
            <div className="flex items-center gap-6 flex-wrap">
              {/* Enhanced Search Input - Material 3 with 16px font */}
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="carefolio-search-input pl-12 pr-4 h-14 text-base"
                    style={{ fontSize: '16px' }}
                  />
                </div>
              </div>

              {/* Enhanced Material 3 Select Components - Larger */}
              <Select value={sectorFilter} onValueChange={(value) => handleFilterChange('sector', value)}>
                <SelectTrigger className="carefolio-select w-40 h-14 body-medium">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent className="carefolio-select-content">
                  <SelectItem value="all">All Sectors</SelectItem>
                  {uniqueSectors.map(sector => (
                    <SelectItem key={`sector-filter-${sector}`} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Country Filter */}
              <Select value={countryFilter} onValueChange={(value) => handleFilterChange('country', value)}>
                <SelectTrigger className="carefolio-select w-40 h-14 body-medium">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="carefolio-select-content">
                  <SelectItem value="all">All Countries</SelectItem>
                  {uniqueCountries.map(country => (
                    <SelectItem key={`country-filter-${country}`} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={careBandFilter} onValueChange={(value) => handleFilterChange('band', value)}>
                <SelectTrigger className="carefolio-select w-36 h-14 body-medium">
                  <SelectValue placeholder="Band" />
                </SelectTrigger>
                <SelectContent className="carefolio-select-content">
                  <SelectItem value="all">All Bands</SelectItem>
                  <SelectItem value="A">Band A</SelectItem>
                  <SelectItem value="B">Band B</SelectItem>
                  <SelectItem value="C">Band C</SelectItem>
                  <SelectItem value="D">Band D</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortField} onValueChange={(value) => {
                setSortField(value);
                setSortDirection('desc');
                setVisibleCount(20);
              }}>
                <SelectTrigger className="carefolio-select w-44 h-14 body-medium">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent className="carefolio-select-content">
                  <SelectItem value="score">Care Score</SelectItem>
                  <SelectItem value="name">Company</SelectItem>
                  <SelectItem value="parental">Parental Leave</SelectItem>
                  <SelectItem value="women">Women Leadership</SelectItem>
                  <SelectItem value="transparency">Transparency</SelectItem>
                </SelectContent>
              </Select>

              {/* Interesting Facts Toggle - Only show in table view */}
              {viewMode === 'table' && (
                <div className="flex items-center gap-3 px-4 py-2 bg-surface-container rounded-xl border border-outline-variant">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-cta-orange" />
                        <span className="body-medium text-on-surface">Facts</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Show interesting facts below company names</p>
                    </TooltipContent>
                  </Tooltip>
                  <Switch
                    checked={showInterestingFacts}
                    onCheckedChange={setShowInterestingFacts}
                    className="data-[state=checked]:bg-cta-orange"
                  />
                </div>
              )}

              {/* Enhanced Results Badge - Material 3 */}
              <Badge className="bg-secondary-container text-on-secondary-container body-medium px-4 py-2 ml-auto rounded-xl">
                {filteredAndSortedCompanies.length} companies
              </Badge>
            </div>
          </div>

          {/* Conditional View Rendering */}
          {viewMode === 'table' ? (
            /* Table View */
            <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl overflow-hidden elevation-2">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-surface-container border-b-2 border-outline-variant h-14">
                      <th className="text-left px-6 py-4 body-medium-medium text-on-surface">Rank</th>
                      <th className="text-left px-6 py-4 body-medium-medium text-on-surface">
                        <button
                          onClick={() => handleSort('name')}
                          className="flex items-center hover:text-primary transition-colors"
                        >
                          Company {getSortIcon('name')}
                        </button>
                      </th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">
                        <button
                          onClick={() => handleSort('score')}
                          className="flex items-center justify-center hover:text-primary transition-colors w-full"
                        >
                          Score {getSortIcon('score')}
                        </button>
                      </th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">Band</th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">
                        <button
                          onClick={() => handleSort('parental')}
                          className="flex items-center justify-center hover:text-primary transition-colors w-full"
                        >
                          Parental {getSortIcon('parental')}
                        </button>
                      </th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">
                        <button
                          onClick={() => handleSort('women')}
                          className="flex items-center justify-center hover:text-primary transition-colors w-full"
                        >
                          Women {getSortIcon('women')}
                        </button>
                      </th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">
                        <button
                          onClick={() => handleSort('transparency')}
                          className="flex items-center justify-center hover:text-primary transition-colors w-full"
                        >
                          Transparency {getSortIcon('transparency')}
                        </button>
                      </th>
                      <th className="text-center px-6 py-4 body-medium-medium text-on-surface">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {visibleCompanies.map((company, index) => {
                        if (!company) return null;
                        
                        const rank = index + 1;
                        const score = company.care_index?.score || 0;
                        const band = score >= 85 ? 'A' : score >= 75 ? 'B' : score >= 65 ? 'C' : 'D';
                        
                        const getBandColor = (band: string) => {
                          switch (band) {
                            case 'A': return '#2BAE66';
                            case 'B': return '#009688';
                            case 'C': return '#F59E0B';
                            case 'D': return '#EF4444';
                            default: return '#6B7280';
                          }
                        };
                        const bandColor = getBandColor(band);
                        
                        const getBandIcon = (band: string) => {
                          switch (band) {
                            case 'A': return '🌸';
                            case 'B': return '💎';
                            case 'C': return '🟡';
                            case 'D': return '🔴';
                            default: return '❓';
                          }
                        };
                        const bandIcon = getBandIcon(band);

                        // Get random interesting fact for this company
                        const randomFact = showInterestingFacts ? getRandomFact(company) : null;

                        return (
                          <motion.tr
                            key={company.id || company.symbol || `company-${index}`}
                            className={`h-11 border-b border-outline-variant hover:bg-surface-container-high transition-all duration-200 cursor-pointer ${
                              index % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'
                            }`}
                            onClick={() => handleRowClick(company)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2, delay: index * 0.005 }}
                          >
                            <td className="px-6 py-3 body-medium-medium text-on-surface-variant">
                              #{rank}
                            </td>
                            <td className="px-6 py-3">
                              <div className="flex items-center gap-3">
                                <div 
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white body-small-medium flex-shrink-0 elevation-1"
                                  style={{ backgroundColor: bandColor }}
                                >
                                  {company.symbol ? company.symbol.substring(0, 2) : company.name ? company.name.substring(0, 2).toUpperCase() : '??'}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="body-medium-medium text-on-surface leading-tight truncate">
                                    {company.name || 'Unknown Company'}
                                  </h4>
                                  <p className="body-small text-on-surface-variant truncate">
                                    {company.sector || 'Unknown Sector'} • {company.country || 'Unknown'}
                                  </p>
                                  {/* Interesting Fact Display */}
                                  {showInterestingFacts && randomFact && (
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <div 
                                          className="inline-flex items-center gap-2 mt-1 px-3 py-1 rounded-full text-xs cursor-pointer transition-all duration-200 hover:shadow-sm"
                                          style={{ 
                                            backgroundColor: '#F3F4F6',
                                            color: getFactColor(randomFact),
                                            border: `1px solid ${getFactColor(randomFact)}20`
                                          }}
                                        >
                                          <span>{getFactIcon(randomFact)}</span>
                                          <span className="truncate max-w-[280px]">
                                            {randomFact.text.length > 80 ? `${randomFact.text.substring(0, 80)}...` : randomFact.text}
                                          </span>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-sm">
                                        <div className="space-y-2">
                                          <p className="text-sm">{randomFact.text}</p>
                                          <p className="text-xs text-gray-500">
                                            Source: {randomFact.source}
                                          </p>
                                        </div>
                                      </TooltipContent>
                                    </Tooltip>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="data-medium-bold" style={{ color: bandColor }}>
                                {score}
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div 
                                className="inline-flex items-center gap-1 px-2 py-1 rounded-lg body-small-medium elevation-1"
                                style={{ 
                                  backgroundColor: `${bandColor}15`,
                                  color: bandColor,
                                  border: `1px solid ${bandColor}30`
                                }}
                              >
                                <span className="text-sm">{bandIcon}</span>
                                <span>{band}</span>
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="data-medium text-primary">
                                {company.care_metrics?.parental_leave?.weeks || 0}w
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="data-medium text-primary">
                                {company.care_metrics?.women_leadership?.percentage || 0}%
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <div className="data-medium text-primary">
                                {company.care_metrics?.pay_equity?.score || 0}
                              </div>
                            </td>
                            <td className="px-6 py-3 text-center">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-8 h-8 p-0 rounded-full state-layer hover:bg-primary/10"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRowClick(company);
                                }}
                              >
                                <Eye className="w-4 h-4 text-primary" />
                              </Button>
                            </td>
                          </motion.tr>
                        );
                      })}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* Card View */
            <CarefolioCardView 
              companies={visibleCompanies} 
              onCompanyClick={handleRowClick}
            />
          )}

          {/* Show More / Show All Controls */}
          <div className="mt-8 flex items-center justify-between">
            <div className="text-left">
              <p className="body-large text-on-surface-variant">
                Showing <span className="body-large-medium text-primary">{visibleCompanies.length}</span> of <span className="body-large-medium text-primary">{filteredAndSortedCompanies.length}</span> companies
                {filteredAndSortedCompanies.length !== safeCompanies.length && (
                  <span> (filtered from <span className="body-large-medium text-primary">{safeCompanies.length}</span> total)</span>
                )}
              </p>
            </div>
            
            {hasMoreCompanies && (
              <div className="flex items-center gap-4">
                <Button
                  onClick={handleShowMore}
                  disabled={isLoadingMore}
                  className="md3-btn-outlined h-12 px-6"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-5 h-5 mr-2" />
                      Show 20 More ({remainingCount} remaining)
                    </>
                  )}
                </Button>
                
                {remainingCount > 20 && (
                  <Button
                    onClick={handleShowAll}
                    disabled={isLoadingMore}
                    className="md3-btn-filled h-12 px-6"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Loading All...
                      </>
                    ) : (
                      <>
                        Show All ({remainingCount} remaining)
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Company Details Drawer */}
        <CompanyDetailsDrawer 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
          company={selectedCompany}
        />
      </div>
    </TooltipProvider>
  );
}