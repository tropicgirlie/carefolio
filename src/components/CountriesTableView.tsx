import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';
import type { Country } from '../data/countries';
import { getCountryBandColor, getCountryHealthStatusColor, getCountryHealthStatusEmoji } from '../data/countries';

interface CountriesTableViewProps {
  countries: Country[];
  onCountryClick?: (country: Country) => void;
  className?: string;
}

type SortKey = 'name' | 'careIndexScore' | 'region' | 'careIndexBand';
type SortDirection = 'asc' | 'desc';

export function CountriesTableView({ countries, onCountryClick, className = '' }: CountriesTableViewProps) {
  const [sortKey, setSortKey] = useState<SortKey>('careIndexScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // Scroll state management
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);

  const updateScrollIndicators = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    setShowTopFade(scrollTop > 8);
    setShowBottomFade(scrollTop + clientHeight < scrollHeight - 8);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const timer = setTimeout(updateScrollIndicators, 100);
    el.addEventListener('scroll', updateScrollIndicators, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollIndicators);
    resizeObserver.observe(el);
    return () => {
      clearTimeout(timer);
      el.removeEventListener('scroll', updateScrollIndicators);
      resizeObserver.disconnect();
    };
  }, [updateScrollIndicators, countries.length]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('desc');
    }
  };

  const sortedCountries = [...countries].sort((a, b) => {
    let aValue: string | number = a[sortKey];
    let bValue: string | number = b[sortKey];

    // Handle special cases
    if (sortKey === 'careIndexBand') {
      const bandOrder = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1 };
      aValue = bandOrder[a.careIndexBand];
      bValue = bandOrder[b.careIndexBand];
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) {
      return <ChevronUp className="w-4 h-4 text-[var(--text-secondary)] opacity-0 group-hover:opacity-50" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-[var(--care-emerald)]" /> : 
      <ChevronDown className="w-4 h-4 text-[var(--care-emerald)]" />;
  };

  return (
    <div className={`bg-[var(--bg-card)] rounded-2xl border border-[var(--outline-variant)] overflow-hidden relative ${className}`}>
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto overflow-y-auto table-scroll-container"
        style={{ maxHeight: countries.length > 12 ? '680px' : 'none' }}
      >
        <table className="w-full">
          <thead className="sticky top-0 z-10">
            <tr className="bg-[var(--bg-secondary)] border-b border-[var(--outline-variant)]">
              <th 
                className="group px-6 py-4 text-left cursor-pointer hover:bg-[var(--bg-card)] transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center justify-between">
                  <span className="body-data-medium text-[var(--text-primary)]">Country</span>
                  <SortIcon column="name" />
                </div>
              </th>
              
              <th 
                className="group px-6 py-4 text-left cursor-pointer hover:bg-[var(--bg-card)] transition-colors"
                onClick={() => handleSort('region')}
              >
                <div className="flex items-center justify-between">
                  <span className="body-data-medium text-[var(--text-primary)]">Region</span>
                  <SortIcon column="region" />
                </div>
              </th>
              
              <th 
                className="group px-6 py-4 text-center cursor-pointer hover:bg-[var(--bg-card)] transition-colors"
                onClick={() => handleSort('careIndexScore')}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="body-data-medium text-[var(--text-primary)]">Care Index</span>
                  <SortIcon column="careIndexScore" />
                </div>
              </th>
              
              <th 
                className="group px-6 py-4 text-center cursor-pointer hover:bg-[var(--bg-card)] transition-colors"
                onClick={() => handleSort('careIndexBand')}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="body-data-medium text-[var(--text-primary)]">Band</span>
                  <SortIcon column="careIndexBand" />
                </div>
              </th>
              
              <th className="px-6 py-4 text-center">
                <span className="body-data-medium text-[var(--text-primary)]">Key Metrics</span>
              </th>
              
              <th className="px-6 py-4 text-center">
                <span className="body-data-medium text-[var(--text-primary)]">Status</span>
              </th>
              
              <th className="px-6 py-4 text-center w-16">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          
          <tbody>
            {sortedCountries.map((country, index) => {
              const bandColor = getCountryBandColor(country.careIndexBand);
              const healthColor = getCountryHealthStatusColor(country.healthStatus);
              const healthEmoji = getCountryHealthStatusEmoji(country.healthStatus);
              
              return (
                <motion.tr
                  key={country.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    border-b border-[var(--outline-variant)] hover:bg-[var(--bg-secondary)]/30 cursor-pointer transition-colors
                    ${index % 2 === 1 ? 'bg-[var(--fintech-feminine-bg-lavender)]/30' : ''}
                  `}
                  onClick={() => onCountryClick?.(country)}
                >
                  {/* Country */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={`${country.name} flag`}>
                        {country.flag}
                      </span>
                      <div>
                        <div className="body-data-medium text-[var(--text-primary)]">
                          {country.name}
                        </div>
                        <div className="body-small text-[var(--text-secondary)]">
                          {country.code} • {(country.population / 1000000).toFixed(1)}M people
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Region */}
                  <td className="px-6 py-4">
                    <span className="body-data text-[var(--text-primary)]">
                      {country.region}
                    </span>
                  </td>
                  
                  {/* Care Index Score */}
                  <td className="px-6 py-4 text-center">
                    <div className="data-medium font-bold" style={{ color: bandColor }}>
                      {country.careIndexScore}
                    </div>
                  </td>
                  
                  {/* Band */}
                  <td className="px-6 py-4 text-center">
                    <div 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: bandColor }}
                    >
                      {country.careIndexBand}
                    </div>
                  </td>
                  
                  {/* Key Metrics */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <div className="text-center">
                        <div className="data-small text-[var(--care-emerald)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {country.pillars.parentalLeave.weeks}w
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">Leave</div>
                      </div>
                      <div className="text-center">
                        <div className="data-small text-[var(--fintech-feminine-purple)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {country.pillars.representation.parliamentWomen}%
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">Women</div>
                      </div>
                      <div className="text-center">
                        <div className="data-small text-[var(--fintech-feminine-coral)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {country.harmOffsets.payGap.gapPercentage}%
                        </div>
                        <div className="text-xs text-[var(--text-secondary)]">Gap</div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-lg" role="img" aria-label={country.healthStatus}>
                        {healthEmoji}
                      </span>
                      <div>
                        <div className="body-small-medium capitalize" style={{ color: healthColor }}>
                          {country.healthStatus.replace('-', ' ')}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Actions */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onCountryClick?.(country);
                      }}
                      className="p-2 rounded-lg hover:bg-[var(--care-emerald)] hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                      title="View details"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Scroll fade indicators */}
      <div 
        className={`table-scroll-fade-top ${showTopFade ? 'visible' : ''}`}
        style={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      />
      <div 
        className={`table-scroll-fade-bottom ${showBottomFade ? 'visible' : ''}`}
        style={{ position: 'absolute', bottom: 48, left: 0, right: 0 }}
      />
      
      {/* Summary Footer */}
      <div className="px-6 py-4 bg-[var(--bg-secondary)] border-t border-[var(--outline-variant)]">
        <div className="flex items-center justify-between">
          <span className="body-small text-[var(--text-secondary)]">
            {countries.length} {countries.length === 1 ? 'country' : 'countries'} • 
            Avg Care Score: {Math.round(countries.reduce((sum, c) => sum + c.careIndexScore, 0) / countries.length)}
          </span>
          
          <div className="flex items-center gap-4">
            {(['A', 'B', 'C', 'D', 'E'] as const).map((band) => {
              const count = countries.filter(c => c.careIndexBand === band).length;
              if (count === 0) return null;
              
              return (
                <div key={band} className="flex items-center gap-1">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getCountryBandColor(band) }}
                  />
                  <span className="body-small text-[var(--text-secondary)]">
                    {band}: {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}