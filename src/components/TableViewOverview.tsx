import { Sparkles, TreePine, AlertTriangle, BarChart3 } from 'lucide-react';

interface TableViewOverviewProps {
  bloomingCompanies: number;
  growingCompanies: number;
  needsNurturingCompanies: number;
  averageNurtureScore: number;
}

export function TableViewOverview({
  bloomingCompanies,
  growingCompanies,
  needsNurturingCompanies,
  averageNurtureScore
}: TableViewOverviewProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 company-card">
            <div className="garden-health-icon blooming">
              <Sparkles className="w-4 h-4 stroke-current" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="data-medium text-[var(--care-vibrant-mint)]">
                {bloomingCompanies}
              </div>
              <div className="caption">
                🌸 Blooming
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 company-card">
            <div className="garden-health-icon growing">
              <TreePine className="w-4 h-4 stroke-current" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="data-medium text-[var(--care-emerald)]">
                {growingCompanies}
              </div>
              <div className="caption">
                🌱 Growing
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 company-card">
            <div className="garden-health-icon needs-nurturing">
              <AlertTriangle className="w-4 h-4 stroke-current" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="data-medium text-[var(--care-emerald)]">
                {needsNurturingCompanies}
              </div>
              <div className="caption">
                🛑 Need Nurturing
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 company-card">
            <div className="garden-health-icon transforming">
              <BarChart3 className="w-4 h-4 stroke-current" strokeWidth={2} />
            </div>
            <div className="text-left">
              <div className="data-medium text-[var(--care-emerald)]">
                {averageNurtureScore}
              </div>
              <div className="caption">
                Portfolio Average
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}