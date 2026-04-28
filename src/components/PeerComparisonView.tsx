import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowLeft, Trophy, TrendingUp, Users, Baby, DollarSign, Star, Crown, Award, X, BarChart3 } from 'lucide-react';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Company } from '../data/companies';

interface PeerComparisonViewProps {
  selectedCompany: Company;
  allCompanies: Company[];
  onClose: () => void;
  onLogoClick: () => void;
}

// Safe data access helper function
function safeDataAccess(company: Company) {
  const careScore = company.care_index?.score || 0;
  const careBand = company.care_index?.band || (
    careScore >= 85 ? 'A' : 
    careScore >= 70 ? 'B' :
    careScore >= 55 ? 'C' :
    careScore >= 40 ? 'D' : 'E'
  );
  
  // Handle different data structure formats for parental leave
  const parentalWeeks = 
    company.care_metrics?.parental_leave?.weeks_paid ||
    company.care_metrics?.parental_leave?.weeks ||
    0;
    
  // Handle different data structure formats for women leadership
  const womenLeadership = 
    company.care_metrics?.women_leadership?.board_percentage ||
    company.care_metrics?.women_leadership?.percentage ||
    0;
    
  // Handle pay equity (not pay_transparency)
  const payEquityScore = company.care_metrics?.pay_equity?.score || 0;
  
  // Handle market cap safely
  const marketCap = typeof company.market_cap === 'string' ? 
    parseFloat(company.market_cap.replace(/[^0-9.-]+/g, '')) || 0 :
    company.market_cap || 0;

  return {
    careScore,
    careBand,
    parentalWeeks,
    womenLeadership,
    payEquityScore,
    marketCap,
    companyId: company.company_id || company.id || company.symbol || Math.random().toString(),
    name: company.name || 'Unknown Company',
    symbol: company.symbol || 'N/A',
    sector: company.sector || 'Unknown Sector'
  };
}

export function PeerComparisonView({ selectedCompany, allCompanies, onClose, onLogoClick }: PeerComparisonViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [careBandFilter, setCareBandFilter] = useState('all');
  const [selectedForDetail, setSelectedForDetail] = useState<Company>(selectedCompany);

  // Get companies in the same sector with safe data access
  const sectorCompanies = allCompanies.filter(company => {
    const companyData = safeDataAccess(company);
    const selectedData = safeDataAccess(selectedCompany);
    return companyData.sector === selectedData.sector;
  });

  // Apply filters with safe data access
  const filteredCompanies = sectorCompanies.filter(company => {
    const companyData = safeDataAccess(company);
    
    const matchesSearch = companyData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         companyData.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBand = careBandFilter === 'all' || (() => {
      const score = companyData.careScore;
      if (careBandFilter === 'A') return score >= 85;
      if (careBandFilter === 'B') return score >= 70 && score < 85;
      if (careBandFilter === 'C') return score >= 55 && score < 70;
      if (careBandFilter === 'D') return score >= 40 && score < 55;
      if (careBandFilter === 'E') return score < 40;
      return true;
    })();

    return matchesSearch && matchesBand;
  });

  // Sort by care score (highest first) and add ranking
  const rankedCompanies = filteredCompanies
    .sort((a, b) => safeDataAccess(b).careScore - safeDataAccess(a).careScore)
    .map((company, index) => ({ ...company, rank: index + 1 }));

  // Care band calculation
  const getCareScoreBand = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
  };

  // Band styling
  const getBandInfo = (band: string) => {
    switch (band) {
      case 'A': return { icon: '🌸', name: 'Legendary', color: 'var(--care-vibrant-mint)' };
      case 'B': return { icon: '💎', name: 'Strong', color: 'var(--care-emerald)' };
      case 'C': return { icon: '🟡', name: 'Moderate', color: 'var(--neutral-lilac)' };
      case 'D': return { icon: '🔴', name: 'Needs Care', color: 'var(--harm-coral)' };
      case 'E': return { icon: '🚨', name: 'Critical', color: 'var(--bg-deep-navy)' };
      default: return { icon: '🟡', name: 'Developing', color: 'var(--neutral-lilac)' };
    }
  };

  // Get ranking info for selected company
  const getCompanyRank = (company: Company) => {
    const companyData = safeDataAccess(company);
    const rank = rankedCompanies.findIndex(c => safeDataAccess(c).companyId === companyData.companyId) + 1;
    return rank || 'N/A';
  };

  // Format market cap
  const formatMarketCap = (marketCap: number | string) => {
    let numValue: number;
    
    if (typeof marketCap === 'string') {
      // Handle string format like "$789.3B"
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

  // Generate company narrative
  const getCompanyNarrative = (company: Company) => {
    const companyData = safeDataAccess(company);
    const careBand = getCareScoreBand(companyData.careScore);
    
    if (careBand === 'A') {
      return `When companies invest in the people who create life, they invest in the future of innovation itself.`;
    } else if (careBand === 'B') {
      return `Strong care foundations create environments where both families and businesses flourish together.`;
    } else if (careBand === 'C') {
      return `Growing care practices signal a company's commitment to supporting working families.`;
    } else {
      return `Every step toward better care practices strengthens the foundation for long-term success.`;
    }
  };

  // Get sector display name
  const getSectorDisplayName = (sector: string) => {
    return sector?.split(' ')[0] || 'Unknown'; // Take first word
  };

  const selectedCompanyData = safeDataAccess(selectedCompany);
  const selectedForDetailData = safeDataAccess(selectedForDetail);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="bg-[var(--bg-card)] border-b border-[var(--outline-variant)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div 
                className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity" 
                onClick={onLogoClick}
              >
                <img src={carefolioLogo} alt="Carefolio" className="w-6 h-6" />
                <span className="headline-h3 text-[var(--care-emerald)]">Carefolio</span>
              </div>
              
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-[var(--cta-orange)]" />
                <div>
                  <h1 className="headline-h3">{getSectorDisplayName(selectedCompanyData.sector)} Champions</h1>
                  <p className="body-small text-[var(--text-secondary)]">
                    {filteredCompanies.length} companies
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" onClick={onClose} className="md3-btn-outlined">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-4 bg-[var(--bg-secondary)]">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
              <Input
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="carefolio-search-input pl-10"
              />
            </div>
            
            <Select value="all">
              <SelectTrigger className="carefolio-select w-52">
                <SelectValue placeholder={`All Sectors`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{selectedCompanyData.sector}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={careBandFilter} onValueChange={setCareBandFilter}>
              <SelectTrigger className="carefolio-select w-56">
                <SelectValue placeholder="All Care Bands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Care Bands</SelectItem>
                <SelectItem value="A">🌟 A (85+) - Legendary</SelectItem>
                <SelectItem value="B">💎 B (70-84) - Strong</SelectItem>
                <SelectItem value="C">🟡 C (55-69) - Moderate</SelectItem>
                <SelectItem value="D">🛑 D (40-54) - Needs Care</SelectItem>
                <SelectItem value="E">🚨 E (&lt;40) - Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4">
            <span className="body-medium text-[var(--text-secondary)]">Nurture Score</span>
            <div className="data-large font-bold text-[var(--care-emerald)]">
              {selectedForDetailData.careScore}
            </div>
            <span className="body-medium text-[var(--text-secondary)]">
              of {rankedCompanies.length} companies
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Leaderboard Table */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--bg-card)] rounded-lg border border-[var(--outline-variant)] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[var(--bg-secondary)]">
                  <tr>
                    <th className="text-left p-3 body-small-medium">Rank</th>
                    <th className="text-left p-3 body-small-medium">Company</th>
                    <th className="text-center p-3 body-small-medium">Nurture Score</th>
                    <th className="text-center p-3 body-small-medium">Care Band</th>
                    <th className="text-center p-3 body-small-medium">Parental Leave</th>
                    <th className="text-center p-3 body-small-medium">Women Leadership</th>
                    <th className="text-center p-3 body-small-medium">Pay Equity</th>
                    <th className="text-center p-3 body-small-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {rankedCompanies.map((company) => {
                    const companyData = safeDataAccess(company);
                    const careBand = getCareScoreBand(companyData.careScore);
                    const bandInfo = getBandInfo(careBand);
                    const isOriginalSelected = companyData.companyId === selectedCompanyData.companyId;
                    const isCurrentlyViewed = companyData.companyId === selectedForDetailData.companyId;
                    
                    return (
                      <motion.tr 
                        key={companyData.companyId}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`border-b border-[var(--outline-variant)] cursor-pointer transition-all duration-200 ${
                          isOriginalSelected ? 
                          'bg-gradient-to-r from-[var(--care-emerald)]/15 to-[var(--care-vibrant-mint)]/15 border-[var(--care-emerald)]' : 
                          isCurrentlyViewed ?
                          'bg-[var(--bg-secondary)]' :
                          'hover:bg-[var(--bg-secondary)]'
                        }`}
                        onClick={() => setSelectedForDetail(company)}
                      >
                        {/* Rank */}
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {company.rank === 1 && <Crown className="w-4 h-4 text-[var(--cta-orange)]" />}
                            {company.rank === 2 && <Award className="w-4 h-4 text-[var(--neutral-lilac)]" />}
                            {company.rank === 3 && <Star className="w-4 h-4 text-[var(--harm-coral)]" />}
                            <span className="data-medium font-bold">#{company.rank}</span>
                            {isOriginalSelected && (
                              <Badge variant="default" className="bg-[var(--care-emerald)] text-white text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </td>

                        {/* Company */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--outline-variant)]">
                              <span className="text-xs font-bold text-[var(--care-emerald)]">
                                {companyData.symbol.substring(0, 2)}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="body-medium font-medium truncate">
                                {companyData.name.length > 20 ? `${companyData.name.substring(0, 20)}...` : companyData.name}
                              </div>
                              <div className="caption text-[var(--text-secondary)]">{companyData.sector}</div>
                            </div>
                          </div>
                        </td>

                        {/* Nurture Score */}
                        <td className="p-3 text-center">
                          <span 
                            className="data-medium font-bold"
                            style={{
                              color: companyData.careScore >= 80 ? 'var(--care-emerald)' :
                                     companyData.careScore >= 70 ? 'var(--care-teal)' :
                                     companyData.careScore >= 60 ? 'var(--neutral-lilac)' :
                                     'var(--harm-coral)'
                            }}
                          >
                            {companyData.careScore}
                          </span>
                        </td>

                        {/* Care Band */}
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <div 
                              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: bandInfo.color }}
                            >
                              {careBand}
                            </div>
                            <span className="text-sm">{bandInfo.icon}</span>
                          </div>
                        </td>

                        {/* Parental Leave */}
                        <td className="p-3 text-center">
                          <span className="data-medium">
                            {companyData.parentalWeeks}w
                          </span>
                        </td>

                        {/* Women Leadership */}
                        <td className="p-3 text-center">
                          <span className="data-medium">
                            {companyData.womenLeadership}%
                          </span>
                        </td>

                        {/* Pay Equity (fixed from Pay Transparency) */}
                        <td className="p-3 text-center">
                          <span className="data-medium">
                            {companyData.payEquityScore}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedForDetail(company);
                            }}
                            className={isCurrentlyViewed ? 
                              'bg-[var(--care-emerald)] text-white hover:bg-[var(--care-emerald)]' : 
                              'hover:bg-[var(--bg-secondary)]'
                            }
                          >
                            <BarChart3 className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Company Detail Card */}
          <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedForDetailData.companyId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[var(--bg-card)] rounded-lg border border-[var(--outline-variant)] p-6 sticky top-24"
              >
                {/* Company Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--outline-variant)]">
                      <span className="body-medium font-bold text-[var(--care-emerald)]">
                        {selectedForDetailData.symbol.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="headline-h3">{selectedForDetailData.name}</h3>
                      <p className="body-small text-[var(--text-secondary)]">{selectedForDetailData.sector}</p>
                    </div>
                  </div>
                  
                  {selectedForDetailData.companyId === selectedCompanyData.companyId && (
                    <Badge className="bg-[var(--care-emerald)] text-white">Selected</Badge>
                  )}
                </div>

                {/* Nurture Score - Large Display */}
                <div className="text-center mb-6">
                  <div className="text-xs text-[var(--text-secondary)] mb-1 font-medium tracking-wide uppercase">
                    NURTURE SCORE
                  </div>
                  <div 
                    className="text-5xl font-mono font-bold mb-2"
                    style={{ 
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: selectedForDetailData.careScore >= 80 ? 'var(--care-emerald)' :
                             selectedForDetailData.careScore >= 70 ? 'var(--care-teal)' :
                             selectedForDetailData.careScore >= 60 ? 'var(--neutral-lilac)' :
                             'var(--harm-coral)',
                      fontFeatureSettings: '"tnum" 1'
                    }}
                  >
                    {selectedForDetailData.careScore}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">
                    {getBandInfo(getCareScoreBand(selectedForDetailData.careScore)).name} Care
                  </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-xs text-[var(--text-secondary)] mb-1 uppercase tracking-wide">
                      Parental Leave
                    </div>
                    <div className="data-large font-bold text-[var(--care-emerald)]">
                      {selectedForDetailData.parentalWeeks}w
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-[var(--text-secondary)] mb-1 uppercase tracking-wide">
                      Women Board
                    </div>
                    <div className="data-large font-bold text-[var(--care-emerald)]">
                      {selectedForDetailData.womenLeadership}%
                    </div>
                  </div>
                </div>

                {/* Market Cap and Additional Info */}
                <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="body-small text-[var(--text-secondary)]">Market Cap</span>
                    <span className="data-medium font-bold text-[var(--care-emerald)]">
                      {formatMarketCap(selectedForDetail.market_cap)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="body-small text-[var(--text-secondary)]">Pay Equity</span>
                    <span className="data-medium font-bold">
                      {selectedForDetailData.payEquityScore}
                    </span>
                  </div>
                </div>

                {/* Performance Indicators */}
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[var(--care-emerald)] flex items-center justify-center">
                    <Baby className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--care-teal)] flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--care-vibrant-mint)] flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[var(--cta-orange)] flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Company Narrative */}
                <div className="bg-[var(--bg-secondary)] rounded-lg p-4 mb-6">
                  <p className="body-medium text-[var(--text-primary)] text-center leading-relaxed">
                    {getCompanyNarrative(selectedForDetail)}
                  </p>
                </div>

                {/* Compare to Peers Button */}
                <Button className="w-full md3-btn-filled">
                  <Trophy className="w-4 h-4" />
                  Compare to Peers →
                </Button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}