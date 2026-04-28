import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { TrendingUp, BarChart3, Globe, Building2 } from 'lucide-react';

interface DemoPortfolioViewProps {
  demoCompanies: any[];
  portfolioMetrics: any;
  onTransitionToReal: () => void;
}

export function DemoPortfolioView({ demoCompanies, portfolioMetrics, onTransitionToReal }: DemoPortfolioViewProps) {
  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline-h3 text-[var(--text-primary)]">Your Care Portfolio</h2>
          <Badge variant="secondary" className="bg-[var(--fintech-feminine-bg-lavender)] text-[var(--fintech-feminine-purple)]">
            Demo Mode
          </Badge>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--care-emerald)] flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {portfolioMetrics?.totalHoldings || 0}
            </div>
            <div className="body-small text-[var(--text-secondary)]">Holdings</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--fintech-feminine-purple)] flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              {portfolioMetrics?.averageScore || 0}
            </div>
            <div className="body-small text-[var(--text-secondary)]">Avg Score</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[var(--fintech-feminine-coral)] flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--care-emerald)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              +{portfolioMetrics?.vsGlobalIndex || 0}
            </div>
            <div className="body-small text-[var(--text-secondary)]">vs Global</div>
          </div>

          <div className="text-center p-4 bg-[var(--bg-secondary)] rounded-xl">
            <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-r from-emerald-500 to-purple-600 flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="data-large text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
              3
            </div>
            <div className="body-small text-[var(--text-secondary)]">Sectors</div>
          </div>
        </div>

        {/* Distribution Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="body-data-medium text-[var(--text-primary)]">Care Score Distribution</span>
            <span className="body-small text-[var(--text-secondary)]">
              {portfolioMetrics?.totalHoldings || 0} companies
            </span>
          </div>
          <div className="h-3 bg-[var(--bg-secondary)] rounded-full overflow-hidden flex">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 flex-grow" style={{ flexBasis: '33%' }} />
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 flex-grow" style={{ flexBasis: '50%' }} />
            <div className="bg-gradient-to-r from-coral-500 to-coral-600 flex-grow" style={{ flexBasis: '17%' }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-[var(--text-secondary)]">
            <span>A: 33%</span>
            <span>B: 50%</span>
            <span>C: 17%</span>
          </div>
        </div>

        {/* Action to Continue */}
        <div className="text-center pt-4 border-t border-[var(--outline-variant)]">
          <p className="body-medium text-[var(--text-secondary)] mb-4">
            Ready to start tracking real data?
          </p>
          <Button
            onClick={onTransitionToReal}
            className="md3-btn-filled"
          >
            Continue to My Dashboard
          </Button>
        </div>
      </Card>

      {/* Demo Companies List */}
      <Card className="p-6">
        <h3 className="headline-h3 text-[var(--text-primary)] mb-4">Sample Holdings</h3>
        <div className="space-y-3">
          {demoCompanies.map((company) => (
            <div key={company.id} className="flex items-center justify-between p-3 bg-[var(--bg-secondary)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  company.careBand === 'A' ? 'bg-emerald-500' : 
                  company.careBand === 'B' ? 'bg-blue-500' : 'bg-orange-500'
                }`}>
                  {company.careBand}
                </div>
                <div>
                  <div className="body-data-medium text-[var(--text-primary)]">{company.name}</div>
                  <div className="body-small text-[var(--text-secondary)]">{company.symbol} • {company.sector}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  {company.careScore}
                </div>
                <div className="body-small text-[var(--text-secondary)]">Care Score</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}