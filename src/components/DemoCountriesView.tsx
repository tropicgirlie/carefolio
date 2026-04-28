import { useState } from 'react';
import { Country } from '../data/countries';
import { CountryCard } from './CountryCard';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, Users, BarChart3, Globe } from 'lucide-react';

interface DemoCountriesViewProps {
  demoCountries: Country[];
  onTransitionToReal: () => void;
}

export function DemoCountriesView({ demoCountries, onTransitionToReal }: DemoCountriesViewProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Calculate demo metrics
  const avgCareScore = Math.round(
    demoCountries.reduce((sum, country) => sum + country.careIndexScore, 0) / demoCountries.length
  );

  const bandDistribution = demoCountries.reduce((acc, country) => {
    acc[country.careIndexBand] = (acc[country.careIndexBand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Countries Portfolio Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline-h3 text-[var(--text-primary)]">Your Country Portfolio</h2>
          <Badge variant="secondary" className="bg-[var(--fintech-feminine-bg-lavender)] text-[var(--fintech-feminine-purple)]">
            Demo Mode
          </Badge>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--care-emerald)] flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {demoCountries.length}
            </div>
            <div className="body-small text-[var(--text-secondary)]">Countries</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--fintech-feminine-purple)] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {avgCareScore}
            </div>
            <div className="body-small text-[var(--text-secondary)]">Avg Care Score</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--fintech-feminine-coral)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--care-emerald)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              +{avgCareScore - 65}
            </div>
            <div className="body-small text-[var(--text-secondary)]">vs Global Avg</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-emerald-500 to-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {new Set(demoCountries.map(c => c.region)).size}
            </div>
            <div className="body-small text-[var(--text-secondary)]">Regions</div>
          </div>
        </div>

        {/* Care Band Distribution */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="body-data-medium text-[var(--text-primary)]">Care Index Distribution</span>
            <span className="body-small text-[var(--text-secondary)]">
              {demoCountries.length} countries
            </span>
          </div>
          <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden flex">
            {Object.entries(bandDistribution).map(([band, count]) => (
              <div 
                key={band}
                className={`flex-grow ${
                  band === 'A' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' :
                  band === 'B' ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                  'bg-gradient-to-r from-orange-500 to-orange-600'
                }`}
                style={{ flexBasis: `${(count / demoCountries.length) * 100}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
            {Object.entries(bandDistribution).map(([band, count]) => (
              <span key={band}>
                {band}: {Math.round((count / demoCountries.length) * 100)}%
              </span>
            ))}
          </div>
        </div>

        {/* Action to Continue */}
        <div className="text-center pt-4 border-t border-[var(--outline-variant)]">
          <p className="body-medium text-[var(--text-secondary)] mb-4">
            Ready to start tracking real country data?
          </p>
          <Button
            onClick={onTransitionToReal}
            className="md3-btn-filled"
          >
            Continue to My Dashboard
          </Button>
        </div>
      </Card>

      {/* Demo Countries Grid */}
      <div className="carefolio-card-grid">
        {demoCountries.map((country) => (
          <CountryCard
            key={country.id}
            country={country}
            onClick={setSelectedCountry}
            isSelected={selectedCountry?.id === country.id}
          />
        ))}
      </div>
    </div>
  );
}