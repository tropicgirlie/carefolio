import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface GlobalCompaniesViewProps {
  companies: any[];
  onExploreCompany: () => void;
}

export function GlobalCompaniesView({ companies, onExploreCompany }: GlobalCompaniesViewProps) {
  return (
    <div className="space-y-6">
      {/* Global Companies Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="headline-h3 text-[var(--text-primary)]">Global Companies Care Index 2025</h2>
          <Badge variant="secondary" className="bg-[var(--care-emerald)] text-white">
            Live Data
          </Badge>
        </div>

        {/* Companies Table */}
        <div className="overflow-x-auto">
          <table className="dashboard-table w-full">
            <thead>
              <tr>
                <th className="text-left">Company</th>
                <th className="text-center">Care Score</th>
                <th className="text-center">Band</th>
                <th className="text-center">Parental Leave</th>
                <th className="text-center">Women Leadership</th>
                <th className="text-right">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="hover:bg-[var(--bg-secondary)] cursor-pointer" onClick={onExploreCompany}>
                  <td>
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
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {company.careScore}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      company.careBand === 'A' ? 'bg-emerald-100 text-emerald-700' :
                      company.careBand === 'B' ? 'bg-blue-100 text-blue-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      Band {company.careBand}
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {company.parentalLeave}w
                    </span>
                  </td>
                  <td className="text-center">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {company.womenLeadership}%
                    </span>
                  </td>
                  <td className="text-right">
                    <span className="data-medium text-[var(--text-primary)]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                      {company.marketCap}
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
            Ready to start tracking companies in your portfolio?
          </p>
          <Button
            onClick={onExploreCompany}
            className="md3-btn-filled text-white"
          >
            Sign Up to Start Tracking
          </Button>
        </div>
      </Card>
    </div>
  );
}