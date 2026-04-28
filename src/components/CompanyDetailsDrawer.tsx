import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Baby, Users, Search, TrendingUp, Heart, Shield, Target, RotateCcw, MapPin } from 'lucide-react';
import { Company } from '../data/companies';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface CompanyDetailsDrawerProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onCompareToPeers: (company: Company) => void;
}

export function CompanyDetailsDrawer({ 
  company, 
  isOpen, 
  onClose, 
  onCompareToPeers 
}: CompanyDetailsDrawerProps) {
  const [activeTab, setActiveTab] = useState('nurture');
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Handle URL query parameter for deep linking
  useEffect(() => {
    if (isOpen && company) {
      const url = new URL(window.location.href);
      url.searchParams.set('company', company.symbol);
      window.history.pushState({}, '', url.toString());
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete('company');
      window.history.pushState({}, '', url.toString());
    }
  }, [isOpen, company]);

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  // Focus management and focus trapping
  useEffect(() => {
    if (isOpen && drawerRef.current) {
      // Store the currently focused element
      triggerElementRef.current = document.activeElement as HTMLElement;
      
      // Focus the drawer immediately
      setTimeout(() => {
        drawerRef.current?.focus();
      }, 50);

      // Focus trap
      const focusableElements = drawerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement?.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement?.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKeyPress);
      return () => document.removeEventListener('keydown', handleTabKeyPress);
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    // Return focus to the triggering element
    setTimeout(() => {
      triggerElementRef.current?.focus();
    }, 100);
  };

  const handleCompareToPeers = () => {
    if (company) {
      onCompareToPeers(company);
      handleClose();
    }
  };

  // Tab configuration with icons and tooltips
  const tabConfig = {
    nurture: {
      label: 'Nurture',
      icon: Heart,
      tooltip: 'Policies that invest in people'
    },
    resilience: {
      label: 'Resilience', 
      icon: Shield,
      tooltip: 'Ability to withstand shocks'
    },
    stability: {
      label: 'Stability',
      icon: Target,
      tooltip: 'Consistency & governance'
    },
    sustainability: {
      label: 'Sustainability',
      icon: RotateCcw,
      tooltip: 'Long-term environmental practice'
    }
  };

  // Handle tab change
  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
  };

  if (!isOpen || !company) return null;

  // Safe data access helpers
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

    const payEquity = 
      company.care_metrics?.pay_transparency?.transparency_score ||
      85;

    const marketCap = company.market_cap || 0;

    return {
      careScore,
      careBand,
      parentalWeeks,
      womenLeadership,
      payEquity,
      marketCap,
      name: company.name || 'Unknown Company',
      symbol: company.symbol || 'N/A',
      sector: company.sector || 'Unknown Sector',
      country: company.country || 'US'
    };
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(1)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(0)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(0)}M`;
    }
    return `$${marketCap.toLocaleString()}`;
  };

  const getBandColor = (band: string) => {
    switch (band) {
      case 'A': return '#00C896'; // Vibrant Mint
      case 'B': return '#2BAE66'; // Emerald
      case 'C': return '#B8A9C9'; // Lavender
      case 'D': return '#E46C6C'; // Coral
      case 'E': return '#0D1B2A'; // Deep Navy
      default: return '#B8A9C9';
    }
  };

  const getBandInfo = (band: string) => {
    switch (band) {
      case 'A': return { name: 'Legendary Care', status: 'Blooming', emoji: '🌸' };
      case 'B': return { name: 'Strong Care', status: 'Growing', emoji: '💎' };
      case 'C': return { name: 'Moderate Care', status: 'Developing', emoji: '🟡' };
      case 'D': return { name: 'Needs Nurturing', status: 'Emerging', emoji: '🛑' };
      case 'E': return { name: 'Critical Attention', status: 'Seedling', emoji: '🚨' };
      default: return { name: 'Developing Care', status: 'Growing', emoji: '🟡' };
    }
  };

  const data = safeDataAccess(company);
  const bandColor = getBandColor(data.careBand);
  const bandInfo = getBandInfo(data.careBand);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
        {/* Desktop Drawer */}
        <motion.div
          ref={drawerRef}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
          className="hidden md:flex ml-auto h-full bg-white border-l border-outline-variant overflow-hidden flex-col"
          style={{ 
            boxShadow: '0 0 40px rgba(0,0,0,0.15), 0 0 20px rgba(0,0,0,0.10)',
            width: 'min(520px, 38vw)', 
            minWidth: '440px'
          }}
          tabIndex={-1}
        >
          {/* Sticky Header */}
          <div className="sticky top-0 z-10 bg-white border-b border-outline-variant">
            <div className="p-6">
              {/* Top Row: Company Info + Close */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Company Logo Circle */}
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                    style={{ backgroundColor: bandColor, fontSize: '14px' }}
                  >
                    {data.symbol.substring(0, 2)}
                  </div>
                  
                  {/* Company Name, Sector, Country */}
                  <div>
                    <h2 
                      id="drawer-title"
                      className="headline-h3 text-on-surface mb-1"
                      style={{ fontFamily: "'Figtree', system-ui, sans-serif" }}
                    >
                      {data.name}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span>{data.sector}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{data.country}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Care Band Chip + Close Button */}
                <div className="flex items-center gap-3">
                  <Badge 
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ 
                      backgroundColor: bandColor + '20',
                      color: bandColor,
                      border: 'none'
                    }}
                  >
                    {bandInfo.emoji} {bandInfo.status}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="h-8 w-8 p-0 rounded-full hover:bg-surface-container"
                    aria-label="Close drawer"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto">
            {/* Care Score Section */}
            <div className="p-6 text-center border-b border-outline-variant">
              <div 
                className="text-6xl font-bold mb-2"
                style={{ 
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: '#2BAE66',
                  fontFeatureSettings: "'tnum' 1"
                }}
              >
                {data.careScore}
              </div>
              <div className="text-sm text-on-surface-variant">
                Band {data.careBand} - {bandInfo.name}
              </div>
            </div>

            {/* KPI Grid - 2x2 Layout */}
            <div className="p-6 border-b border-outline-variant">
              <div className="grid grid-cols-2 gap-4">
                {/* Parental Leave Card - Mint tint */}
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: '#E6F6EF',
                    height: '100px'
                  }}
                >
                  <div className="flex flex-col h-full justify-center">
                    <Baby className="w-5 h-5 mx-auto mb-2" style={{ color: '#2BAE66' }} />
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{ 
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontFeatureSettings: "'tnum' 1",
                        color: '#1F2937'
                      }}
                    >
                      {data.parentalWeeks}w
                    </div>
                    <div className="text-xs text-gray-600">Parental Leave</div>
                  </div>
                </div>

                {/* Women Leadership Card - Teal tint */}
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: '#E0F5F3',
                    height: '100px'
                  }}
                >
                  <div className="flex flex-col h-full justify-center">
                    <Users className="w-5 h-5 mx-auto mb-2" style={{ color: '#009688' }} />
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{ 
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontFeatureSettings: "'tnum' 1",
                        color: '#1F2937'
                      }}
                    >
                      {data.womenLeadership}%
                    </div>
                    <div className="text-xs text-gray-600">Women Leadership</div>
                  </div>
                </div>

                {/* Pay Equity Card - Amber tint */}
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: '#FFF3E0',
                    height: '100px'
                  }}
                >
                  <div className="flex flex-col h-full justify-center">
                    <Search className="w-5 h-5 mx-auto mb-2" style={{ color: '#FF6B35' }} />
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{ 
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontFeatureSettings: "'tnum' 1",
                        color: '#1F2937'
                      }}
                    >
                      {data.payEquity}
                    </div>
                    <div className="text-xs text-gray-600">Pay Equity</div>
                  </div>
                </div>

                {/* Market Cap Card - Gray tint */}
                <div 
                  className="rounded-xl p-4 text-center"
                  style={{ 
                    backgroundColor: '#F2F4F7',
                    height: '100px'
                  }}
                >
                  <div className="flex flex-col h-full justify-center">
                    <TrendingUp className="w-5 h-5 mx-auto mb-2" style={{ color: '#374151' }} />
                    <div 
                      className="text-xl font-bold mb-1"
                      style={{ 
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontFeatureSettings: "'tnum' 1",
                        color: '#1F2937'
                      }}
                    >
                      {formatMarketCap(data.marketCap)}
                    </div>
                    <div className="text-xs text-gray-600">Market Cap</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pillars Tab Bar */}
            <div className="p-6 border-b border-outline-variant">
              <TooltipProvider delayDuration={150}>
                <div 
                  className="flex gap-2"
                  role="tablist"
                  aria-label="Company analysis pillars"
                >
                  {Object.entries(tabConfig).map(([key, config]) => {
                    const IconComponent = config.icon;
                    const isActive = activeTab === key;
                    
                    return (
                      <Tooltip key={key}>
                        <TooltipTrigger asChild>
                          <button
                            role="tab"
                            aria-selected={isActive}
                            aria-controls={`panel-${key}`}
                            id={`tab-${key}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => handleTabChange(key)}
                            className={`
                              flex-1 flex flex-col items-center gap-1 px-3 py-3 rounded-lg transition-all duration-200
                              text-xs font-medium relative
                              ${isActive 
                                ? 'bg-[#E6F6EF] text-[#2BAE66]' 
                                : 'bg-surface-container text-on-surface-variant hover:text-[#2BAE66]'
                              }
                              focus-visible:outline-2 focus-visible:outline-[#00C896] focus-visible:outline-offset-0
                            `}
                            style={{
                              borderBottom: isActive ? '2px solid #2BAE66' : '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.borderBottom = '2px solid #2BAE66';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.borderBottom = '2px solid transparent';
                              }
                            }}
                          >
                            <IconComponent className="w-4 h-4" />
                            {config.label}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-sm">
                          {config.tooltip}
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              </TooltipProvider>
            </div>

            {/* Care Practices Content */}
            <div className="p-6 border-b border-outline-variant">
              <h3 className="headline-h3 text-on-surface mb-4">Care Practices</h3>
              
              <div 
                role="tabpanel" 
                aria-labelledby={`tab-${activeTab}`}
                id={`panel-${activeTab}`}
              >
                {activeTab === 'nurture' && (
                  <div className="space-y-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {data.name} demonstrates commitment to employee wellbeing through comprehensive care policies that support life transitions and career growth.
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>{data.parentalWeeks} weeks paid parental leave policy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>{data.womenLeadership}% women in leadership positions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Pay transparency score of {data.payEquity}/100</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Comprehensive benefits and wellness programs</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'resilience' && (
                  <div className="space-y-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Analysis of {data.name}'s ability to adapt and thrive through challenges while maintaining care standards.
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Crisis management and business continuity planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Employee support during organizational changes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Financial stability and risk management</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'stability' && (
                  <div className="space-y-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {data.name}'s commitment to consistent policies and transparent governance practices.
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Board diversity and independent oversight</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Transparent reporting and stakeholder communication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Consistent policy implementation across regions</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'sustainability' && (
                  <div className="space-y-4">
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      Environmental and social sustainability practices that support {data.name}'s long-term viability.
                    </p>
                    <ul className="space-y-2 text-sm text-on-surface">
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Carbon neutrality and renewable energy initiatives</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Sustainable supply chain management</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#2BAE66] font-bold">•</span>
                        <span>Community investment and social impact programs</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky Actions Footer - Single Button Only */}
          <div 
            className="sticky bottom-0 bg-white border-t border-outline-variant z-10"
            style={{ 
              padding: '16px 16px 8px 16px',
              display: 'flex',
              gap: '12px',
              flexWrap: 'nowrap',
              overflow: 'visible'
            }}
          >
            {/* Compare to Peers Button - Secondary Emerald - Full Width */}
            <Button
              onClick={handleCompareToPeers}
              className="w-full h-12 bg-transparent border-2 border-[#2BAE66] text-[#2BAE66] hover:bg-[#2BAE66] hover:text-white rounded-lg font-medium transition-all duration-200"
            >
              <Users className="w-4 h-4 mr-2" />
              Compare to Peers
            </Button>
          </div>
        </motion.div>

        {/* Mobile Overlay - Full Screen */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 bg-background z-50 overflow-y-auto"
        >
          <div className="min-h-screen flex flex-col">
            {/* Mobile Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-outline-variant px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: bandColor }}
                  >
                    {data.symbol.substring(0, 2)}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-on-surface">
                      {data.name}
                    </h2>
                    <div className="text-sm text-on-surface-variant">
                      {data.sector}
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClose}
                  className="h-8 w-8 p-0 rounded-full"
                  aria-label="Close drawer"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="flex-1 p-4 space-y-6">
              {/* Care Score */}
              <div className="text-center">
                <div 
                  className="text-5xl font-bold mb-2"
                  style={{ 
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: '#2BAE66',
                    fontFeatureSettings: "'tnum' 1"
                  }}
                >
                  {data.careScore}
                </div>
                <div className="text-sm text-on-surface-variant">
                  Band {data.careBand} - {bandInfo.name}
                </div>
              </div>

              {/* Mobile Actions - Single Button */}
              <div 
                style={{ 
                  padding: '16px 16px 8px 16px',
                  display: 'flex',
                  gap: '12px',
                  flexWrap: 'nowrap',
                  overflow: 'visible'
                }}
              >
                <Button
                  onClick={handleCompareToPeers}
                  className="w-full h-12 bg-transparent border-2 border-[#2BAE66] text-[#2BAE66] hover:bg-[#2BAE66] hover:text-white rounded-lg font-medium"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Compare to Peers
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}