import { AlertTriangle } from 'lucide-react';

interface GardenOverviewProps {
  bloomingCompanies: number;
  growingCompanies: number;
  needsNurturingCompanies: number;
  averageNurtureScore: number;
  vulnerableSectors: string[];
}

export function GardenOverview({
  bloomingCompanies,
  growingCompanies,
  needsNurturingCompanies,
  averageNurtureScore,
  vulnerableSectors
}: GardenOverviewProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="headline-momops text-[var(--highlight-orange)] mb-6">Garden Overview</h2>
        
        {/* Garden Health Status Grid - NEW GREEN Data Focus */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="maternal-narrative-card">
            <div className="narrative-label blooming">
              <span className="garden-health-icon blooming">🌸</span>
              Blooming
            </div>
            <div className="data-large text-[var(--care-vibrant-mint)] mt-2">
              {bloomingCompanies}
            </div>
            <p className="caption mt-1">Companies thriving with excellent care</p>
          </div>
          
          <div className="maternal-narrative-card">
            <div className="narrative-label growing">
              <span className="garden-health-icon growing">🌱</span>
              Growing
            </div>
            <div className="data-large text-[var(--care-emerald)] mt-2">
              {growingCompanies}
            </div>
            <p className="caption mt-1">Companies developing strong foundations</p>
          </div>
          
          <div className="maternal-narrative-card">
            <div className="narrative-label needs-nurturing">
              <span className="garden-health-icon needs-nurturing">🛑</span>
              Needs Nurturing
            </div>
            <div className="data-large text-[var(--care-emerald)] mt-2">
              {needsNurturingCompanies}
            </div>
            <p className="caption mt-1">Companies requiring attention & care</p>
          </div>
          
          <div className="maternal-narrative-card">
            <div className="narrative-label transforming">
              <span className="garden-health-icon transforming">🔄</span>
              Portfolio Wisdom
            </div>
            <div className="data-large text-[var(--care-emerald)] mt-2">
              {averageNurtureScore}
            </div>
            <p className="caption mt-1">Average nurture score</p>
          </div>
        </div>

        {/* Sector Resilience Insights */}
        {vulnerableSectors.length > 0 && (
          <div className="maternal-sentence">
            <AlertTriangle className="w-5 h-5 text-[var(--needs-nurturing)] stroke-current flex-shrink-0" strokeWidth={2} />
            <span>
              Attention needed: The {vulnerableSectors.join(' and ')} sectors show vulnerability patterns requiring systemic nurture.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}