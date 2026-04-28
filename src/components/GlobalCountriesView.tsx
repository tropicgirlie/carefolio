import { Country } from '../data/countries';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface GlobalCountriesViewProps {
  countries: Country[];
  onExploreCountry: () => void;
}

export function GlobalCountriesView({ countries, onExploreCountry }: GlobalCountriesViewProps) {
  return (
    <div className="space-y-6">
      {/* Global Countries Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline-h3 text-[var(--text-primary)]">Global Countries Care Index 2025</h2>
          <Badge variant="secondary" className="bg-[var(--care-emerald)] text-white">
            Live Data
          </Badge>
        </div>

        {/* Countries Table */}
        <div className="overflow-x-auto">
          <table className="dashboard-table w-full">
            <thead>
              <tr>
                <th className="text-left">Country</th>
                <th className="text-center">Care Score</th>
                <th className="text-center">Band</th>
                <th className="text-center">Parental Leave</th>
                <th className="text-center">Women in Parliament</th>
                <th className="text-center">Health Status</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country.id} className="hover:bg-[var(--bg-secondary)] cursor-pointer" onClick={onExploreCountry}>
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="body-data-medium text-[var(--text-primary)]">{country.name}</div>
                        <div className="body-small text-[var(--text-secondary)]">{country.region}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {country.careIndexScore}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      country.careIndexBand === 'A' ? 'bg-emerald-100 text-emerald-700' :
                      country.careIndexBand === 'B' ? 'bg-blue-100 text-blue-700' :
                      country.careIndexBand === 'C' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      Band {country.careIndexBand}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {country.pillars.parentalLeave.weeks}w
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {country.pillars.representation.parliamentWomen}%
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="flex items-center justify-center gap-2">
                      <span>{country.healthStatus === 'blooming' ? '🌸' : country.healthStatus === 'growing' ? '🌱' : country.healthStatus === 'needs-nurturing' ? '🛑' : '🔄'}</span>
                      <span className="capitalize text-sm">{country.healthStatus.replace('-', ' ')}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Call to Action */}
        <div className="text-center pt-6 border-t border-[var(--outline-variant)] mt-6">
          <p className="body-medium text-[var(--text-secondary)] mb-4">
            Ready to start tracking countries in your portfolio?
          </p>
          <Button
            onClick={onExploreCountry}
            className="md3-btn-filled text-white"
          >
            Sign Up to Start Tracking
          </Button>
        </div>
      </Card>
    </div>
  );
}