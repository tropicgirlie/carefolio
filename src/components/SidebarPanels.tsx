import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Sparkles, Star, Award, AlertTriangle } from 'lucide-react';
import { Company } from '../data/companies';
import { PlantIcon } from './PlantIcon';
import { Badge } from './ui/badge';

interface SidebarPanelsProps {
  companies: Company[];
  onSelectCompany: (company: Company) => void;
}

export function SidebarPanels({ companies, onSelectCompany }: SidebarPanelsProps) {
  // Calculate care insights
  const bloomingPlants = companies
    .filter(c => c.care_index.score >= 80)
    .sort((a, b) => b.care_index.score - a.care_index.score)
    .slice(0, 5);

  const needsNurturing = companies
    .filter(c => c.harm_index.score >= 70)
    .sort((a, b) => b.harm_index.score - a.harm_index.score)
    .slice(0, 3);

  const growingStrong = companies
    .filter(c => c.net_integrity.score >= 60)
    .sort((a, b) => b.net_integrity.score - a.net_integrity.score)
    .slice(0, 4);

  const averageCareIndex = Math.round(
    companies.reduce((sum, c) => sum + c.care_index.score, 0) / companies.length
  );

  const bloomingCount = companies.filter(c => c.health_status === 'blooming').length;
  const growingCount = companies.filter(c => c.health_status === 'healthy').length;
  const needsNurturingCount = companies.filter(c => c.health_status === 'wilting' || c.health_status === 'dying').length;

  const getCareScoreColor = (score: number) => {
    if (score >= 85) return 'care-score-excellent';
    if (score >= 70) return 'care-score-good';
    if (score >= 50) return 'care-score-fair';
    if (score >= 30) return 'care-score-poor';
    return 'care-score-critical';
  };

  const getCareBadgeColor = (score: number) => {
    if (score >= 85) return 'care-badge-excellent';
    if (score >= 70) return 'care-badge-good';
    if (score >= 50) return 'care-badge-fair';
    if (score >= 30) return 'care-badge-poor';
    return 'care-badge-critical';
  };

  return (
    <div className="space-y-6">
      {/* Garden Health Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="company-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-care-turquoise to-neutral-lilac rounded-2xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h2 className="headline-h3 text-text-primary">Garden Health</h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-bg-secondary rounded-2xl p-4">
              <div className="data-medium care-score-good">{averageCareIndex}</div>
              <div className="body-small text-text-secondary">Garden Average</div>
            </div>
            <div className="bg-bg-secondary rounded-2xl p-4">
              <div className="data-medium care-score-excellent">{companies.length}</div>
              <div className="body-small text-text-secondary">Total Plants</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-care-mint rounded-full"></div>
                <span className="body-data text-text-primary">Blooming</span>
              </div>
              <span className="data-small care-score-excellent">{bloomingCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-care-turquoise rounded-full"></div>
                <span className="body-data text-text-primary">Growing</span>
              </div>
              <span className="data-small care-score-good">{growingCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-harm-coral rounded-full"></div>
                <span className="body-data text-text-primary">Needs Nurturing</span>
              </div>
              <span className="data-small care-score-poor">{needsNurturingCount}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blooming Leaders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="company-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-tertiary-container rounded-2xl">
            <Award className="w-5 h-5 text-care-mint" />
          </div>
          <h2 className="headline-h3 text-text-primary">Blooming Leaders</h2>
        </div>

        <div className="space-y-3">
          {bloomingPlants.map((company, index) => (
            <motion.div
              key={company.company_id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.3, ease: [0.2, 0, 0, 1] }}
              onClick={() => onSelectCompany(company)}
              className="flex items-center gap-3 p-3 bg-bg-secondary rounded-2xl cursor-pointer hover:bg-bg-table-alt transition-all duration-200 state-layer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-bg-card flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <PlantIcon 
                  plantType={company.plant_type}
                  healthStatus={company.health_status}
                  size="sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="body-data text-text-primary truncate">
                  {company.name}
                </div>
                <div className="body-small text-text-secondary">
                  {company.symbol}
                </div>
              </div>
              <div className={`score-badge ${getCareBadgeColor(company.care_index.score)}`}>
                <span className="data-small">{company.care_index.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Growing Strong */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="company-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-secondary-container rounded-2xl">
            <TrendingUp className="w-5 h-5 text-care-turquoise" />
          </div>
          <h2 className="headline-h3 text-text-primary">Growing Strong</h2>
        </div>

        <div className="space-y-3">
          {growingStrong.map((company, index) => (
            <motion.div
              key={company.company_id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05, duration: 0.3, ease: [0.2, 0, 0, 1] }}
              onClick={() => onSelectCompany(company)}
              className="flex items-center gap-3 p-3 bg-bg-secondary rounded-2xl cursor-pointer hover:bg-bg-table-alt transition-all duration-200 state-layer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-bg-card flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <PlantIcon 
                  plantType={company.plant_type}
                  healthStatus={company.health_status}
                  size="sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="body-data text-text-primary truncate">
                  {company.name}
                </div>
                <div className="body-small text-text-secondary">
                  {company.sector.split(' ')[0]}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-care-turquoise" />
                <span className="body-small text-care-turquoise">
                  +{Math.abs(company.net_integrity.score - 50).toFixed(1)}%
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Needs Nurturing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="company-card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-error-container rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-harm-coral" />
          </div>
          <h2 className="headline-h3 text-text-primary">Needs Nurturing</h2>
        </div>

        <div className="space-y-3">
          {needsNurturing.map((company, index) => (
            <motion.div
              key={company.company_id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.3, ease: [0.2, 0, 0, 1] }}
              onClick={() => onSelectCompany(company)}
              className="flex items-center gap-3 p-3 bg-bg-secondary rounded-2xl cursor-pointer hover:bg-bg-table-alt transition-all duration-200 state-layer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-bg-card flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <PlantIcon 
                  plantType={company.plant_type}
                  healthStatus={company.health_status}
                  size="sm"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="body-data text-text-primary truncate">
                  {company.name}
                </div>
                <div className="body-small text-text-secondary">
                  Requires attention
                </div>
              </div>
              <Badge className="care-badge-poor body-small px-2 py-1">
                Risk {company.harm_index.score}
              </Badge>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Sector Care Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className="company-card p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-primary-container rounded-2xl">
            <Star className="w-5 h-5 text-care-turquoise" />
          </div>
          <h2 className="headline-h3 text-text-primary">Sector Care Health</h2>
        </div>

        <div className="space-y-2">
          {Array.from(new Set(companies.map(c => c.sector))).slice(0, 6).map((sector, index) => {
            const sectorCompanies = companies.filter(c => c.sector === sector);
            const avgScore = Math.round(
              sectorCompanies.reduce((sum, c) => sum + c.care_index.score, 0) / sectorCompanies.length
            );
            
            return (
              <motion.div
                key={sector}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.05, duration: 0.3, ease: [0.2, 0, 0, 1] }}
                className="flex items-center justify-between p-3 bg-bg-secondary rounded-2xl"
              >
                <div>
                  <div className="body-data text-text-primary">
                    {sector.split(' ')[0]}
                  </div>
                  <div className="body-small text-text-secondary">
                    {sectorCompanies.length} companies growing
                  </div>
                </div>
                <div className={`score-badge ${getCareBadgeColor(avgScore)}`}>
                  <span className="data-small">{avgScore}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}