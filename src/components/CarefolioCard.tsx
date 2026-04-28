import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronRight, Shield, Heart, Leaf, Flame, Baby, Users, DollarSign, Plus, BarChart3, Eye, Trophy } from 'lucide-react';
import { Company } from '../data/companies';
import { useState } from 'react';

interface CarefolioCardProps {
  company: Company;
  isSelected?: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  onCompareToPeers?: (company: Company) => void;
  storyMode?: boolean;
  selectedCompanies?: Company[];
}

export function CarefolioCard({ 
  company, 
  isSelected = false, 
  onSelect, 
  onClick,
  onCompareToPeers,
  storyMode = false,
  selectedCompanies = []
}: CarefolioCardProps) {
  const [showExpandedStory, setShowExpandedStory] = useState(false);

  // Care Score Band Calculation (A-E)
  const getCareScoreBand = (score: number): 'A' | 'B' | 'C' | 'D' | 'E' => {
    if (score >= 85) return 'A';
    if (score >= 70) return 'B';
    if (score >= 55) return 'C';
    if (score >= 40) return 'D';
    return 'E';
  };

  // Color Coding Based on Care Score Tiers
  const getCareScoreColor = (score: number) => {
    if (score >= 80) return 'var(--care-emerald)';        // 80+ = green → strong/legendary
    if (score >= 70) return 'var(--care-teal)';           // 70–79 = teal → strong
    if (score >= 60) return 'var(--neutral-lilac)';       // 60–69 = amber → moderate
    return 'var(--harm-coral)';                           // below 60 = red → weak
  };

  // Band Colors
  const getBandColor = (band: string) => {
    switch (band) {
      case 'A': return 'var(--care-vibrant-mint)';    // Vibrant Mint - Nurture Excellence 🌟
      case 'B': return 'var(--care-emerald)';         // Emerald - Strong Care 💎
      case 'C': return 'var(--neutral-lilac)';        // Lavender - Moderate Care 🟡
      case 'D': return 'var(--harm-coral)';           // Coral - Needs Nurturing 🛑
      case 'E': return 'var(--bg-deep-navy)';         // Deep Navy - Critical Attention 🚨
      default: return 'var(--neutral-lilac)';
    }
  };

  // Band Icons & Labels
  const getBandInfo = (band: string) => {
    switch (band) {
      case 'A': return { icon: '🌸', name: 'Blooming', color: 'text-white' };
      case 'B': return { icon: '💎', name: 'Strong', color: 'text-white' };
      case 'C': return { icon: '🟡', name: 'Moderate', color: 'text-white' };
      case 'D': return { icon: '🔴', name: 'Needs Care', color: 'text-white' };
      case 'E': return { icon: '🚨', name: 'Critical', color: 'text-white' };
      default: return { icon: '🟡', name: 'Developing', color: 'text-white' };
    }
  };

  // Calculate scores and band info
  const nurtureScore = company.care_index.score;
  const careBand = getCareScoreBand(nurtureScore);
  const bandColor = getBandColor(careBand);
  const bandInfo = getBandInfo(careBand);
  const scoreColor = getCareScoreColor(nurtureScore);

  // Generate story content (120 chars max)
  const getStoryContent = () => {
    if (company.story?.maternal_voice) {
      return company.story.maternal_voice;
    }
    
    // Generate enhanced story based on Care Score and actual metrics
    const parentalWeeks = company.care_metrics.parental_leave.weeks_paid;
    const womenBoard = company.care_metrics.women_leadership.board_percentage;
    
    if (careBand === 'A') {
      return `${company.name} leads with exceptional care, offering ${parentalWeeks} weeks parental leave and ${womenBoard}% women board leadership.`;
    } else if (careBand === 'B') {
      return `${company.name} demonstrates strong care foundations with ${parentalWeeks} weeks leave and ${womenBoard}% board diversity.`;
    } else if (careBand === 'C') {
      return `${company.name} is developing care practices with ${parentalWeeks} weeks leave and growing leadership diversity.`;
    } else if (careBand === 'D') {
      return `${company.name} needs nurturing attention to develop comprehensive care systems for working families.`;
    } else {
      return `${company.name} requires urgent transformation to build care practices that support working families.`;
    }
  };

  // Truncate story to 120 characters
  const storyContent = getStoryContent();
  const truncatedStory = storyContent.length > 120 ? storyContent.substring(0, 117) + '...' : storyContent;

  // Format market cap for top meta area
  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1000000000000) {
      return `$${(marketCap / 1000000000000).toFixed(1)}T`;
    } else if (marketCap >= 1000000000) {
      return `$${(marketCap / 1000000000).toFixed(0)}B`;
    } else if (marketCap >= 1000000) {
      return `$${(marketCap / 1000000).toFixed(0)}M`;
    }
    return `$${marketCap}`;
  };

  const handleClick = () => {
    if (onClick) onClick();
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect();
  };

  const handleCompareToPeers = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Peer comparison clicked for:', company.name);
    if (onCompareToPeers) {
      onCompareToPeers(company);
    }
  };

  return (
    <motion.div
      className="w-full bg-[var(--bg-card)] border border-[var(--outline-variant)] rounded-2xl cursor-pointer relative transition-all duration-300 ease-out min-h-[460px] overflow-hidden flex flex-col group"
      onClick={handleClick}
      whileHover={{ 
        y: -4,
        boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
      }}
      whileTap={{ scale: 0.98 }}
      layout
      style={{
        boxShadow: isSelected ? '0 0 0 2px var(--care-vibrant-mint), 0 8px 24px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.06)'
      }}
    >
      {/* Top Meta Area - Market Cap + Sector */}
      <div className="flex items-center justify-between p-3 pb-2">
        <div className="flex flex-col">
          <span className="text-xs text-[var(--text-secondary)] font-medium">
            {formatMarketCap(company.market_cap)}
          </span>
          <span className="text-xs text-[var(--text-secondary)] mt-0.5 truncate max-w-[120px]">
            {company.sector}
          </span>
        </div>
        
        {/* Prominent Care Band Badge - Top Right */}
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg relative"
          style={{ backgroundColor: bandColor }}
        >
          <span className="text-base">{bandInfo.icon}</span>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-white flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: bandColor }}>{careBand}</span>
          </div>
        </div>
      </div>

      {/* Company Info - Improved Name Handling */}
      <div className="px-3 mb-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--outline-variant)]">
            <span className="text-xs font-bold text-[var(--care-emerald)]">
              {company.symbol.substring(0, 2)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            {/* Allow 2 lines for company name */}
            <h3 
              className="text-[var(--text-primary)] leading-tight mb-1"
              style={{ 
                fontFamily: 'Figtree, system-ui, sans-serif',
                fontSize: '16px',
                fontWeight: '600',
                lineHeight: '1.2',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
              title={company.name}
            >
              {company.name}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              {company.symbol}
            </p>
          </div>
        </div>
      </div>

      {/* Hero Care Score - Color Coded */}
      <div className="px-3 mb-4 text-center">
        <div className="text-xs text-[var(--text-secondary)] mb-1 font-medium tracking-wide uppercase">
          CARE SCORE
        </div>
        <div 
          className="text-3xl font-mono font-bold mb-1"
          style={{ 
            fontFamily: 'IBM Plex Mono, monospace',
            color: scoreColor,
            fontFeatureSettings: '"tnum" 1'
          }}
        >
          {nurtureScore}
        </div>
        <div className="text-sm text-[var(--text-secondary)]">{bandInfo.name}</div>
      </div>

      {/* MAIN CONTENT AREA - TRUE TOGGLE */}
      <div className="px-3 mb-4 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {storyMode ? (
            /* STORY MODE - Text Content */
            <motion.div
              key="story"
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 90 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
              className="text-center"
            >
              <div className="mb-3">
                <div className="text-sm text-[var(--text-secondary)] mb-2 font-medium tracking-wide uppercase">
                  CARE STORY
                </div>
                <p 
                  className="text-[var(--text-primary)] leading-relaxed"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '14px',
                    fontWeight: '400',
                    lineHeight: '1.4'
                  }}
                >
                  {truncatedStory}
                </p>
              </div>

              {/* Story Mode Icons - Limited to 2 per row */}
              <div className="grid grid-cols-2 gap-3 max-w-[120px] mx-auto">
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center mb-1 mx-auto">
                    <span className="text-base">👶</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Leave</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center mb-1 mx-auto">
                    <span className="text-base">👩‍💼</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)]">Leadership</div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* METRICS MODE - FIFA Style Data */
            <motion.div
              key="metrics"
              initial={{ opacity: 0, rotateX: 90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
            >
              <div className="grid grid-cols-3 gap-3">
                {/* Parental Leave */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center">
                      <Baby className="w-3 h-3" />
                    </div>
                  </div>
                  <div 
                    className="text-base font-bold mb-1"
                    style={{ 
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--care-emerald)',
                      fontFeatureSettings: '"tnum" 1'
                    }}
                  >
                    {company.care_metrics.parental_leave.weeks_paid}w
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-tight">
                    Parental<br />Leave
                  </div>
                </div>

                {/* Women Leadership */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center">
                      <Users className="w-3 h-3" />
                    </div>
                  </div>
                  <div 
                    className="text-base font-bold mb-1"
                    style={{ 
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--care-emerald)',
                      fontFeatureSettings: '"tnum" 1'
                    }}
                  >
                    {company.care_metrics.women_leadership.board_percentage}%
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-tight">
                    Women<br />Board
                  </div>
                </div>

                {/* Pay Transparency */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center">
                      <DollarSign className="w-3 h-3" />
                    </div>
                  </div>
                  <div 
                    className="text-base font-bold mb-1"
                    style={{ 
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--care-emerald)',
                      fontFeatureSettings: '"tnum" 1'
                    }}
                  >
                    {company.care_metrics.pay_transparency.transparency_score}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] leading-tight">
                    Pay<br />Transparency
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Insight with Peer Comparison */}
      <div className="mt-auto p-3 pt-0">
        <div className="bg-[var(--bg-secondary)] rounded-lg p-2 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm">{nurtureScore >= 80 ? '🌸' : nurtureScore >= 70 ? '💎' : nurtureScore >= 60 ? '🟡' : '🔴'}</span>
              <span className="text-xs font-medium text-[var(--text-primary)]">
                {nurtureScore >= 80 ? 'Legendary Care Leader' : 
                 nurtureScore >= 70 ? 'Strong Care Practices' :
                 nurtureScore >= 60 ? 'Moderate Care Focus' : 'Needs Nurturing'}
              </span>
            </div>
            
            {/* Compare to Peers Button - Simple implementation */}
            {onCompareToPeers && (
              <button
                onClick={handleCompareToPeers}
                className="w-6 h-6 rounded-full bg-[var(--care-emerald)] text-white flex items-center justify-center hover:bg-[var(--care-vibrant-mint)] transition-all duration-200 opacity-0 group-hover:opacity-100"
                title="Compare to peers"
              >
                <Trophy className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--care-vibrant-mint)] rounded-full flex items-center justify-center shadow-lg">
          <Star className="w-4 h-4 text-white fill-current" />
        </div>
      )}

      {/* Select Button - Floating */}
      <button
        onClick={handleSelect}
        className="absolute top-3 left-3 w-6 h-6 rounded-full bg-white border-2 border-[var(--outline-variant)] flex items-center justify-center shadow-sm hover:border-[var(--care-emerald)] hover:shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <Heart className={`w-3 h-3 ${isSelected ? 'text-[var(--care-emerald)] fill-current' : 'text-[var(--text-secondary)]'}`} />
      </button>
    </motion.div>
  );
}