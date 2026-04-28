import { motion } from 'motion/react';
import { Search, Filter, Users, Zap, Heart } from 'lucide-react';
import { Company } from '../data/companies';
import { FIFACard } from './FIFACard';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FIFACardViewProps {
  companies: Company[];
  selectedCompanies: Company[];
  onSelectCompany: (company: Company) => void;
  onCompanyDetail: (company: Company) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sectorFilter: string;
  onSectorFilterChange: (sector: string) => void;
  healthFilter: string;
  onHealthFilterChange: (health: string) => void;
  storyMode?: boolean;
  squadSynergy?: { bonus: number; message: string };
}

export function FIFACardView({
  companies,
  selectedCompanies,
  onSelectCompany,
  onCompanyDetail,
  searchTerm,
  onSearchChange,
  sectorFilter,
  onSectorFilterChange,
  healthFilter,
  onHealthFilterChange,
  storyMode = false,
  squadSynergy = { bonus: 0, message: '' }
}: FIFACardViewProps) {
  const sectors = Array.from(new Set(companies.map(c => c.sector)));
  const healthStatuses = ['blooming', 'healthy', 'wilting', 'dying'];

  const getHealthDisplayName = (status: string) => {
    switch (status) {
      case 'blooming': return 'High Nurture';
      case 'healthy': return 'Growing Care';
      case 'wilting': return 'Needs Support';
      case 'dying': return 'At Risk';
      default: return status;
    }
  };

  // Calculate care stats for collection
  const careStats = {
    total: companies.length,
    highNurture: companies.filter(c => c.care_index.score >= 85).length,
    strongResilience: companies.filter(c => c.net_integrity.score >= 75).length,
    goodReturnStrength: companies.filter(c => c.care_index.score >= 70).length,
    sustainable: companies.filter(c => c.care_index.score >= 60 && c.harm_index.score < 50).length
  };

  return (
    <div className="careops-constellation-background min-h-[calc(100vh-88px)]">
      {/* CareOps Squad Header */}
      <div className="careops-header px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="section-header text-white">
                Build Your CareOps Squad
              </h1>
              <p className="body-text text-white/80 mt-2">
                Assemble companies that invest in care infrastructure • {companies.length} companies available
              </p>
            </div>

            {/* Squad Synergy Display */}
            {selectedCompanies.length > 0 && squadSynergy.bonus > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="careops-synergy-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-5 h-5 text-care-mint" />
                  <span className="card-title text-white">Squad Synergy</span>
                </div>
                <div className="care-score text-care-mint">+{squadSynergy.bonus}</div>
                <div className="caption text-white/70 mt-1">{squadSynergy.message}</div>
              </motion.div>
            )}
          </div>

          {/* CareOps Filters */}
          <div className="careops-filter-bar">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
              <div className="flex items-center gap-3 shrink-0">
                <Filter className="w-5 h-5 text-white" />
                <span className="card-title text-white">Squad Filters</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/60" />
                  <Input
                    placeholder="Search care leaders..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="careops-search-input pl-10 w-64"
                  />
                </div>

                {/* Sector Filter */}
                <Select value={sectorFilter} onValueChange={onSectorFilterChange}>
                  <SelectTrigger className="careops-select w-48">
                    <SelectValue placeholder="All Care Sectors" />
                  </SelectTrigger>
                  <SelectContent className="careops-select-content">
                    <SelectItem value="all">All Care Sectors</SelectItem>
                    {sectors.map(sector => (
                      <SelectItem key={sector} value={sector}>
                        {sector.split(' ')[0]} Sector
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Health Filter */}
                <Select value={healthFilter} onValueChange={onHealthFilterChange}>
                  <SelectTrigger className="careops-select w-40">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="careops-select-content">
                    <SelectItem value="all">All Care Levels</SelectItem>
                    {healthStatuses.map(status => (
                      <SelectItem key={status} value={status}>
                        {getHealthDisplayName(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CareOps Card Grid */}
      <div className="careops-card-grid">
        {companies.map((company, index) => (
          <motion.div
            key={company.company_id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.05, 
              duration: 0.4, 
              ease: [0.2, 0, 0, 1] 
            }}
          >
            <FIFACard
              company={company}
              isSelected={selectedCompanies.some(c => c.company_id === company.company_id)}
              onSelect={() => onSelectCompany(company)}
              onDetail={() => onCompanyDetail(company)}
              storyMode={storyMode}
            />
          </motion.div>
        ))}
      </div>

      {/* CareOps Collection Stats */}
      <div className="careops-collection-stats px-4 sm:px-6 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-white" />
            <h2 className="card-title text-white">Care Infrastructure Overview</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="careops-stat">
              <div className="careops-stat-number">{careStats.total}</div>
              <div className="careops-stat-label">Total Companies</div>
            </div>
            <div className="careops-stat">
              <div className="careops-stat-number">{careStats.highNurture}</div>
              <div className="careops-stat-label">High Nurture</div>
            </div>
            <div className="careops-stat">
              <div className="careops-stat-number">{careStats.strongResilience}</div>
              <div className="careops-stat-label">Strong Resilience</div>
            </div>
            <div className="careops-stat">
              <div className="careops-stat-number">{careStats.goodReturnStrength}</div>
              <div className="careops-stat-label">Good Return Support</div>
            </div>
            <div className="careops-stat">
              <div className="careops-stat-number">{careStats.sustainable}</div>
              <div className="careops-stat-label">Sustainable Growth</div>
            </div>
          </div>

          {/* Care Philosophy */}
          <div className="mt-8 text-center">
            <p className="body-text text-white/80 max-w-2xl mx-auto">
              Building a care-centered economy requires companies that invest in women's career resilience, 
              parental support systems, and sustainable growth practices. Select companies to build your ideal CareOps squad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}