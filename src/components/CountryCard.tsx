import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Globe, Users, Heart, Scale } from 'lucide-react';
import type { Country } from '../data/countries';
import { getCountryBandColor, getCountryHealthStatusColor, getCountryHealthStatusEmoji } from '../data/countries';

interface CountryCardProps {
  country: Country;
  onClick?: (country: Country) => void;
  isSelected?: boolean;
  className?: string;
}

export function CountryCard({ country, onClick, isSelected = false, className = '' }: CountryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClick) {
      onClick(country);
    }
  };

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleStoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsStoryExpanded(!isStoryExpanded);
  };

  const bandColor = getCountryBandColor(country.careIndexBand);
  const healthColor = getCountryHealthStatusColor(country.healthStatus);
  const healthEmoji = getCountryHealthStatusEmoji(country.healthStatus);

  // Calculate average pillar score
  const avgPillarScore = Math.round(
    (country.pillars.parentalLeave.score + 
     country.pillars.childcare.score + 
     country.pillars.womensHealth.score + 
     country.pillars.representation.score) / 4
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className={`
        carefolio-card-clean cursor-pointer
        ${isSelected ? 'selected' : ''}
        ${className}
      `}
      onClick={handleCardClick}
      style={{
        borderColor: isSelected ? bandColor : undefined,
        boxShadow: isSelected ? 
          `var(--elevation-strong), 0 0 0 2px ${bandColor}` : 
          undefined
      }}
    >
      {/* Header with Flag, Name, and Care Index */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl" role="img" aria-label={`${country.name} flag`}>
            {country.flag}
          </div>
          <div>
            <h3 className="headline-h3 text-[var(--text-primary)] mb-1">
              {country.name}
            </h3>
            <div className="flex items-center gap-2">
              <span className="body-small text-[var(--text-secondary)]">
                {country.region}
              </span>
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: healthColor }}
                title={country.healthStatus}
              />
            </div>
          </div>
        </div>
        
        {/* Care Index Score */}
        <div className="text-center">
          <div 
            className="care-score text-4xl font-bold mb-1"
            style={{ color: bandColor }}
          >
            {country.careIndexScore}
          </div>
          <div 
            className="px-3 py-1 rounded-full text-white text-sm font-medium"
            style={{ backgroundColor: bandColor }}
          >
            Band {country.careIndexBand}
          </div>
        </div>
      </div>

      {/* Key Metrics Row */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-[var(--care-emerald)]" />
          </div>
          <div className="data-medium font-bold text-[var(--text-primary)]">
            {country.pillars.parentalLeave.weeks}w
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Parental Leave
          </div>
        </div>
        
        <div className="text-center p-3 bg-[var(--bg-secondary)] rounded-xl">
          <div className="flex items-center justify-center mb-2">
            <Heart className="w-5 h-5 text-[var(--fintech-feminine-coral)]" />
          </div>
          <div className="data-medium font-bold text-[var(--text-primary)]">
            {country.pillars.representation.parliamentWomen}%
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Women in Parliament
          </div>
        </div>
      </div>

      {/* Health Status Indicator */}
      <div className="flex items-center justify-between mb-4 p-3 bg-[var(--bg-secondary)] rounded-xl">
        <div className="flex items-center gap-2">
          <span className="text-xl" role="img">
            {healthEmoji}
          </span>
          <div>
            <div className="body-small-medium text-[var(--text-primary)] capitalize">
              {country.healthStatus.replace('-', ' ')}
            </div>
            <div className="body-small text-[var(--text-secondary)]">
              Care Status
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="data-medium font-bold" style={{ color: healthColor }}>
            {avgPillarScore}
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Avg Pillars
          </div>
        </div>
      </div>

      {/* Care Story Preview */}
      <div className="mb-4">
        <button
          onClick={handleStoryClick}
          className="w-full text-left p-3 bg-[var(--fintech-feminine-bg-lavender)] rounded-xl border border-[var(--fintech-feminine-purple)]/20 hover:border-[var(--fintech-feminine-purple)]/40 transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="body-small-medium text-[var(--fintech-feminine-purple)]">
              Care Story
            </div>
            {isStoryExpanded ? (
              <ChevronUp className="w-4 h-4 text-[var(--fintech-feminine-purple)]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[var(--fintech-feminine-purple)]" />
            )}
          </div>
          <AnimatePresence>
            {isStoryExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2"
              >
                <p className="body-small text-[var(--text-primary)] leading-relaxed">
                  {country.careStory}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Expand/Collapse Button */}
      <button
        onClick={handleExpandClick}
        className="w-full flex items-center justify-center gap-2 p-2 text-[var(--care-emerald)] hover:text-[var(--care-vibrant-mint)] hover:bg-[var(--bg-secondary)] rounded-lg transition-all duration-200"
      >
        <span className="body-small-medium">
          {isExpanded ? 'Show Less' : 'Show Details'}
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 pt-4 border-t border-[var(--outline-variant)]"
          >
            {/* Detailed Pillars */}
            <div className="space-y-4">
              <h4 className="headline-h3 text-[var(--text-primary)] mb-3">
                Care Pillars
              </h4>
              
              {/* Parental Leave */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[var(--care-emerald)]" />
                    <span className="body-small-medium text-[var(--text-primary)]">
                      Parental Leave
                    </span>
                  </div>
                  <span className="data-small font-bold text-[var(--care-emerald)]">
                    {country.pillars.parentalLeave.score}
                  </span>
                </div>
                <p className="body-small text-[var(--text-secondary)] leading-relaxed">
                  {country.pillars.parentalLeave.description}
                </p>
              </div>

              {/* Childcare */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[var(--fintech-feminine-coral)]" />
                    <span className="body-small-medium text-[var(--text-primary)]">
                      Childcare
                    </span>
                  </div>
                  <span className="data-small font-bold text-[var(--fintech-feminine-coral)]">
                    {country.pillars.childcare.score}
                  </span>
                </div>
                <p className="body-small text-[var(--text-secondary)] leading-relaxed">
                  {country.pillars.childcare.description}
                </p>
              </div>

              {/* Women's Health */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[var(--fintech-feminine-purple)]" />
                    <span className="body-small-medium text-[var(--text-primary)]">
                      Women's Health
                    </span>
                  </div>
                  <span className="data-small font-bold text-[var(--fintech-feminine-purple)]">
                    {country.pillars.womensHealth.score}
                  </span>
                </div>
                <p className="body-small text-[var(--text-secondary)] leading-relaxed">
                  {country.pillars.womensHealth.description}
                </p>
              </div>

              {/* Representation */}
              <div className="p-4 bg-[var(--bg-secondary)] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-[var(--care-vibrant-mint)]" />
                    <span className="body-small-medium text-[var(--text-primary)]">
                      Representation
                    </span>
                  </div>
                  <span className="data-small font-bold text-[var(--care-vibrant-mint)]">
                    {country.pillars.representation.score}
                  </span>
                </div>
                <p className="body-small text-[var(--text-secondary)] leading-relaxed">
                  {country.pillars.representation.description}
                </p>
              </div>

              {/* Harm Offsets */}
              <h4 className="headline-h3 text-[var(--text-primary)] mb-3 mt-6">
                Areas for Growth
              </h4>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <span className="body-small text-[var(--text-primary)]">
                    Pay Gap
                  </span>
                  <span className="data-small font-bold text-[var(--harm-coral)]">
                    {country.harmOffsets.payGap.gapPercentage}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
                  <span className="body-small text-[var(--text-primary)]">
                    Child Poverty
                  </span>
                  <span className="data-small font-bold text-[var(--harm-coral)]">
                    {country.harmOffsets.childPoverty.rate}%
                  </span>
                </div>
              </div>

              {/* Key Insights */}
              {country.keyInsights.length > 0 && (
                <div className="mt-4">
                  <h4 className="body-small-medium text-[var(--text-primary)] mb-2">
                    Key Insights
                  </h4>
                  <ul className="space-y-1">
                    {country.keyInsights.slice(0, 3).map((insight, index) => (
                      <li key={index} className="body-small text-[var(--text-secondary)] flex items-start gap-2">
                        <span className="text-[var(--care-emerald)] mt-1">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}