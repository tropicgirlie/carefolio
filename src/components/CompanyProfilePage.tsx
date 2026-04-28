import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, BarChart3, Building, TrendingUp, Users, Heart, Shield, AlertTriangle, Star, Globe, Calendar, DollarSign, Award, Target, Briefcase, Baby, LineChart, PieChart, Activity, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import { TopNavigation } from './TopNavigation';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Company } from '../data/companies';

interface CompanyProfilePageProps {
  company: Company;
  allCompanies: Company[];
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function CompanyProfilePage({
  company,
  allCompanies,
  onNavigateToLanding,
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToDashboard,
  onNavigateToTechDocs,
  onLogoClick,
  onLogout,
  isAuthenticated
}: CompanyProfilePageProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showComparison, setShowComparison] = useState(false);

  // Safe data access helper
  const safeDataAccess = (comp: Company) => {
    const careScore = comp.care_index?.score || 0;
    const careBand = comp.care_index?.band || (
      careScore >= 85 ? 'A' : 
      careScore >= 70 ? 'B' :
      careScore >= 55 ? 'C' :
      careScore >= 40 ? 'D' : 'E'
    );
    
    const parentalWeeks = 
      comp.care_metrics?.parental_leave?.weeks_paid ||
      comp.care_metrics?.parental_leave?.weeks ||
      0;
      
    const womenLeadership = 
      comp.care_metrics?.women_leadership?.board_percentage ||
      comp.care_metrics?.women_leadership?.percentage ||
      0;

    return {
      careScore,
      careBand,
      parentalWeeks,
      womenLeadership,
      companyId: comp.company_id || comp.id || comp.symbol || Math.random().toString(),
      name: comp.name || 'Unknown Company',
      symbol: comp.symbol || 'N/A',
      sector: comp.sector || 'Unknown Sector',
      marketCap: comp.market_cap || 0,
      country: comp.country || 'Unknown'
    };
  };

  const companyData = safeDataAccess(company);

  // Calculate sector averages for benchmarking
  const sectorCompanies = allCompanies.filter(c => 
    safeDataAccess(c).sector === companyData.sector && 
    safeDataAccess(c).symbol !== companyData.symbol
  );

  const sectorAverages = {
    careScore: sectorCompanies.length > 0 ? 
      Math.round(sectorCompanies.reduce((sum, c) => sum + safeDataAccess(c).careScore, 0) / sectorCompanies.length) : 0,
    parentalWeeks: sectorCompanies.length > 0 ? 
      Math.round(sectorCompanies.reduce((sum, c) => sum + safeDataAccess(c).parentalWeeks, 0) / sectorCompanies.length) : 0,
    womenLeadership: sectorCompanies.length > 0 ? 
      Math.round(sectorCompanies.reduce((sum, c) => sum + safeDataAccess(c).womenLeadership, 0) / sectorCompanies.length) : 0,
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

  // Get band colors
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

  const getBandIcon = (band: string) => {
    switch (band) {
      case 'A': return '🌸';
      case 'B': return '💎';
      case 'C': return '🔶';
      case 'D': return '⚠️';
      case 'E': return '🔻';
      default: return '●';
    }
  };

  // Mock trend data (in real app, this would come from API)
  const trendData = [
    { quarter: 'Q1 2024', score: companyData.careScore - 8 },
    { quarter: 'Q2 2024', score: companyData.careScore - 4 },
    { quarter: 'Q3 2024', score: companyData.careScore - 2 },
    { quarter: 'Q4 2024', score: companyData.careScore },
  ];

  // Calculate percentile ranking
  const allScores = allCompanies.map(c => safeDataAccess(c).careScore).sort((a, b) => b - a);
  const companyRank = allScores.indexOf(companyData.careScore) + 1;
  const percentile = Math.round((1 - (companyRank / allScores.length)) * 100);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Navigation */}
      <TopNavigation 
        currentPage="dashboard"
        onNavigateToLanding={onNavigateToLanding}
        onNavigateToInsights={onNavigateToInsights}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToDashboard={onNavigateToDashboard}
        onLogoClick={onLogoClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="container py-6">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onNavigateToDashboard}
            className="h-10 px-3"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-[var(--outline-variant)]" />
          <Badge variant="secondary" className="text-xs">
            Company Profile
          </Badge>
        </div>

        {/* Company Header */}
        <div className="bg-white rounded-xl p-8 border border-[var(--outline-variant)] shadow-sm mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--outline-variant)]">
                <span className="text-2xl font-bold text-[var(--care-emerald)]">
                  {companyData.symbol.substring(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{companyData.name}</h1>
                <div className="flex items-center gap-4 text-[var(--text-secondary)]">
                  <span className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    {companyData.sector}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {companyData.country}
                  </span>
                  <span className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    {formatMarketCap(companyData.marketCap)}
                  </span>
                </div>
              </div>
            </div>

            {/* Care Score Display */}
            <div className="text-center">
              <div 
                className="text-6xl font-bold text-[var(--care-emerald)] mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {companyData.careScore}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span 
                  className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium border"
                  style={{
                    backgroundColor: getBandColors(companyData.careBand).bg,
                    color: getBandColors(companyData.careBand).text,
                    borderColor: `${getBandColors(companyData.careBand).border}40`
                  }}
                >
                  {getBandIcon(companyData.careBand)} Band {companyData.careBand}
                </span>
              </div>
              <div className="text-sm text-[var(--text-secondary)]">
                {percentile}th percentile • #{companyRank} of {allScores.length}
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--care-emerald)] mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {companyData.parentalWeeks}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Parental Leave Weeks</div>
              <div className="text-xs text-[var(--text-secondary)] opacity-75">
                vs {sectorAverages.parentalWeeks} sector avg
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--care-teal)] mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {Math.round(companyData.womenLeadership)}%
              </div>
              <div className="text-sm text-[var(--text-secondary)]">Women Leadership</div>
              <div className="text-xs text-[var(--text-secondary)] opacity-75">
                vs {sectorAverages.womenLeadership}% sector avg
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                {companyData.careScore - sectorAverages.careScore > 0 ? '+' : ''}{companyData.careScore - sectorAverages.careScore}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">vs Sector Average</div>
              <div className="text-xs text-[var(--text-secondary)] opacity-75">
                sector avg: {sectorAverages.careScore}
              </div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--text-primary)] mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                +{Math.max(0, companyData.careScore - (trendData[0]?.score || companyData.careScore))}
              </div>
              <div className="text-sm text-[var(--text-secondary)]">YTD Growth</div>
              <div className="text-xs text-[var(--text-secondary)] opacity-75">
                since Q1 2024
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Analysis Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-[var(--bg-secondary)] p-2 rounded-xl border border-[var(--outline-variant)] h-auto gap-2">
            <TabsTrigger 
              value="overview" 
              className="flex items-center gap-3 px-6 py-4 rounded-lg text-left font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--care-emerald)] data-[state=active]:border data-[state=active]:border-[var(--outline-variant)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50"
            >
              <Star className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="metrics" 
              className="flex items-center gap-3 px-6 py-4 rounded-lg text-left font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--care-emerald)] data-[state=active]:border data-[state=active]:border-[var(--outline-variant)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50"
            >
              <BarChart3 className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">Care Metrics</span>
            </TabsTrigger>
            <TabsTrigger 
              value="benchmarks" 
              className="flex items-center gap-3 px-6 py-4 rounded-lg text-left font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--care-emerald)] data-[state=active]:border data-[state=active]:border-[var(--outline-variant)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50"
            >
              <TrendingUp className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">Benchmarks</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trends" 
              className="flex items-center gap-3 px-6 py-4 rounded-lg text-left font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--care-emerald)] data-[state=active]:border data-[state=active]:border-[var(--outline-variant)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/50"
            >
              <LineChart className="w-5 h-5 flex-shrink-0" />
              <span className="truncate">Trends</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Care Index Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/50 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Care Index Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Parental Leave</span>
                      <div className="flex items-center gap-2">
                        <Progress value={(companyData.parentalWeeks / 26) * 100} className="w-24" />
                        <span className="text-sm font-medium">{companyData.parentalWeeks}/26</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Women Leadership</span>
                      <div className="flex items-center gap-2">
                        <Progress value={companyData.womenLeadership} className="w-24" />
                        <span className="text-sm font-medium">{Math.round(companyData.womenLeadership)}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pay Transparency</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-24" />
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Childcare Support</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-24" />
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sector Context */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-teal)]/50 flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Sector Context</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
                    <div className="text-sm text-[var(--text-secondary)] mb-1">Sector Ranking</div>
                    <div className="text-2xl font-bold text-[var(--care-emerald)]">
                      #{sectorCompanies.filter(c => safeDataAccess(c).careScore > companyData.careScore).length + 1}
                    </div>
                    <div className="text-xs text-[var(--text-secondary)]">
                      of {sectorCompanies.length + 1} {companyData.sector} companies
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Top performer:</span>
                      <span className="font-medium">
                        {sectorCompanies.length > 0 ? 
                          safeDataAccess(sectorCompanies.reduce((best, current) => 
                            safeDataAccess(current).careScore > safeDataAccess(best).careScore ? current : best
                          )).name : 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sector median:</span>
                      <span className="font-medium">{sectorAverages.careScore}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Companies analyzed:</span>
                      <span className="font-medium">{sectorCompanies.length + 1}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Company Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/50 flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                  </div>
                  <span className="truncate">Care Practice Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {companyData.name} demonstrates {
                    companyData.careBand === 'A' ? 'exceptional care practices with industry-leading policies across all dimensions. The company shows strong commitment to employee wellbeing, particularly in parental support and leadership diversity. Their comprehensive approach to care infrastructure sets them apart as a model for sustainable business practices.' :
                    companyData.careBand === 'B' ? 'strong care practices with robust employee support systems and good sustainability efforts. While performing above sector averages in most areas, there are opportunities to enhance certain aspects of their care infrastructure to reach industry-leading status.' :
                    companyData.careBand === 'C' ? 'moderate care practices with room for improvement in key areas. The company has established basic support systems but could benefit from more comprehensive policies around parental leave, leadership diversity, and employee wellbeing.' :
                    companyData.careBand === 'D' ? 'developing care practices with significant opportunities to strengthen support systems. Investment in parental leave policies, childcare support, and leadership diversity would materially improve their care infrastructure.' :
                    'significant opportunities to enhance care practices across all dimensions. Substantial investment in employee support systems, parental policies, and leadership diversity is needed to meet modern standards for sustainable business practices.'
                  }
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Care Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nurture Pillars */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/50 flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Nurture Pillars</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Baby className="w-4 h-4 text-[var(--care-emerald)]" />
                          <span className="font-medium">Parental Leave</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-emerald)]">{companyData.parentalWeeks}</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        weeks paid leave • {companyData.parentalWeeks >= 16 ? 'Industry leading' : companyData.parentalWeeks >= 12 ? 'Above average' : 'Below average'}
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[var(--care-teal)]" />
                          <span className="font-medium">Women Leadership</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-teal)]">{Math.round(companyData.womenLeadership)}%</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        board representation • {companyData.womenLeadership >= 40 ? 'Excellent' : companyData.womenLeadership >= 30 ? 'Good' : 'Needs improvement'}
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-[var(--highlight-orange)]" />
                          <span className="font-medium">Pay Transparency</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--highlight-orange)]">75%</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        disclosure rating • Above industry standard
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-[var(--care-vibrant-mint)]" />
                          <span className="font-medium">Childcare Support</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-vibrant-mint)]">60%</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        support rating • Moderate investment
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Harm Offsets */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--harm-coral)]/50 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Risk Factors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[var(--care-emerald)]" />
                          <span className="font-medium">Environmental Impact</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-emerald)]">B+</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        ESG rating • Strong environmental practices
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-[var(--care-emerald)]" />
                          <span className="font-medium">Supply Chain Ethics</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-emerald)]">A-</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        compliance rating • Excellent standards
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-[var(--care-teal)]" />
                          <span className="font-medium">Labor Relations</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--care-teal)]">B</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        employee relations • Good track record
                      </div>
                    </div>

                    <div className="p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-[var(--highlight-orange)]" />
                          <span className="font-medium">Legal Compliance</span>
                        </div>
                        <span className="text-lg font-bold text-[var(--highlight-orange)]">B+</span>
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        regulatory compliance • Strong record
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Benchmarks Tab */}
          <TabsContent value="benchmarks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sector Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/50 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Sector Comparison</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Care Score</span>
                        <span className="text-sm font-medium">{companyData.careScore} vs {sectorAverages.careScore}</span>
                      </div>
                      <div className="relative">
                        <Progress value={(companyData.careScore / 100) * 100} className="h-2" />
                        <div 
                          className="absolute top-0 w-1 h-2 bg-[var(--harm-coral)]" 
                          style={{ left: `${sectorAverages.careScore}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                        <span>0</span>
                        <span>Sector Avg</span>
                        <span>100</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Parental Leave</span>
                        <span className="text-sm font-medium">{companyData.parentalWeeks} vs {sectorAverages.parentalWeeks}</span>
                      </div>
                      <div className="relative">
                        <Progress value={(companyData.parentalWeeks / 26) * 100} className="h-2" />
                        <div 
                          className="absolute top-0 w-1 h-2 bg-[var(--harm-coral)]" 
                          style={{ left: `${(sectorAverages.parentalWeeks / 26) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                        <span>0</span>
                        <span>Sector Avg</span>
                        <span>26 weeks</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm">Women Leadership</span>
                        <span className="text-sm font-medium">{Math.round(companyData.womenLeadership)}% vs {sectorAverages.womenLeadership}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={companyData.womenLeadership} className="h-2" />
                        <div 
                          className="absolute top-0 w-1 h-2 bg-[var(--harm-coral)]" 
                          style={{ left: `${sectorAverages.womenLeadership}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1">
                        <span>0%</span>
                        <span>Sector Avg</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Market Position */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 truncate">
                    <div className="w-10 h-10 rounded-lg bg-[var(--highlight-orange)]/50 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                    </div>
                    <span className="truncate">Market Position</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-lg">
                      <div className="text-3xl font-bold text-[var(--care-emerald)] mb-1">
                        {percentile}th
                      </div>
                      <div className="text-sm text-[var(--text-secondary)]">
                        Percentile ranking across all S&P 500 companies
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <div className="text-xl font-bold text-[var(--care-teal)] mb-1">
                          #{companyRank}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          Overall Rank
                        </div>
                      </div>
                      <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <div className="text-xl font-bold text-[var(--care-emerald)] mb-1">
                          #{sectorCompanies.filter(c => safeDataAccess(c).careScore > companyData.careScore).length + 1}
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">
                          Sector Rank
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Better than:</span>
                        <span className="font-medium text-[var(--care-emerald)]">
                          {Math.round((1 - (companyRank / allScores.length)) * 100)}% of companies
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Market cap rank:</span>
                        <span className="font-medium">Large Cap</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sector leaders ahead:</span>
                        <span className="font-medium">{sectorCompanies.filter(c => safeDataAccess(c).careScore > companyData.careScore).length}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 truncate">
                  <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/50 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }} />
                  </div>
                  <span className="truncate">Care Score Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">Year-to-Date Performance</span>
                    <span className="text-sm font-medium text-[var(--care-emerald)]">
                      +{Math.max(0, companyData.careScore - (trendData[0]?.score || companyData.careScore))} points
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {trendData.map((data, index) => (
                      <div key={data.quarter} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-[var(--text-secondary)]" />
                          <span className="font-medium">{data.quarter}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span 
                            className="text-lg font-bold"
                            style={{ 
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: index === trendData.length - 1 ? 'var(--care-emerald)' : 'var(--text-secondary)'
                            }}
                          >
                            {data.score}
                          </span>
                          {index > 0 && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              data.score > trendData[index - 1].score 
                                ? 'bg-[var(--care-emerald)] text-white' 
                                : 'bg-[var(--harm-coral)] text-white'
                            }`}>
                              {data.score > trendData[index - 1].score ? '+' : ''}{data.score - trendData[index - 1].score}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-[var(--bg-mint-surface)] rounded-lg border border-[var(--care-emerald)]/20">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[var(--care-emerald)] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-[var(--text-primary)] mb-1">Positive Trajectory</h4>
                        <p className="text-sm text-[var(--text-secondary)]">
                          {companyData.name} has shown consistent improvement in care practices over the past year, 
                          with particular gains in parental leave policies and leadership diversity initiatives.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={onNavigateToDashboard}
            className="h-12 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowComparison(!showComparison)}
              className="h-12 px-6"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Compare to Peers
            </Button>
            
            <Button
              className="h-12 px-6 bg-[var(--care-emerald)] hover:bg-[var(--care-emerald)]/90 text-white"
              onClick={() => window.open(`https://investor.${companyData.symbol.toLowerCase()}.com`, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Investor Relations
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}