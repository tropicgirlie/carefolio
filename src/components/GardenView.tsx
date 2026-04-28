import { motion } from 'motion/react';
import { Search, Filter, Leaf, BarChart3 } from 'lucide-react';
import { Company } from '../data/companies';
import { Plant } from './Plant';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';

interface GardenViewProps {
  companies: Company[];
  selectedCompany: Company | null;
  onSelectCompany: (company: Company) => void;
  searchTerm: string;
  onSearchChange: (search: string) => void;
  sectorFilter: string;
  onSectorFilterChange: (sector: string) => void;
  healthFilter: string;
  onHealthFilterChange: (health: string) => void;
}

export function GardenView({
  companies,
  selectedCompany,
  onSelectCompany,
  searchTerm,
  onSearchChange,
  sectorFilter,
  onSectorFilterChange,
  healthFilter,
  onHealthFilterChange
}: GardenViewProps) {
  // Group companies by sector
  const groupedCompanies = companies.reduce((acc, company) => {
    if (!acc[company.sector]) {
      acc[company.sector] = [];
    }
    acc[company.sector].push(company);
    return acc;
  }, {} as Record<string, Company[]>);

  // Get unique sectors for filter
  const sectors = Array.from(new Set(companies.map(c => c.sector)));
  const healthStatuses = ['blooming', 'healthy', 'wilting', 'dying'];

  // Filter companies
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = sectorFilter === 'all' || company.sector === sectorFilter;
    const matchesHealth = healthFilter === 'all' || company.health_status === healthFilter;
    return matchesSearch && matchesSector && matchesHealth;
  });

  // Group filtered companies by sector
  const filteredGroupedCompanies = filteredCompanies.reduce((acc, company) => {
    if (!acc[company.sector]) {
      acc[company.sector] = [];
    }
    acc[company.sector].push(company);
    return acc;
  }, {} as Record<string, Company[]>);

  const getSectorEmoji = (sector: string): string => {
    const sectorEmojis: Record<string, string> = {
      'Technology': '💻',
      'Healthcare': '🏥',
      'Financial Services': '🏦',
      'Consumer Discretionary': '🛍️',
      'Consumer Staples': '🛒',
      'Energy': '🔋',
      'Industrials': '🏭',
      'Communication Services': '📡'
    };
    return sectorEmojis[sector] || '🏢';
  };

  const getSectorDescription = (sector: string): string => {
    const descriptions: Record<string, string> = {
      'Technology': 'Digital Innovation Grove',
      'Healthcare': 'Wellness Meadow',
      'Financial Services': 'Capital Gardens',
      'Consumer Discretionary': 'Lifestyle Orchard',
      'Consumer Staples': 'Essential Crops',
      'Energy': 'Power Fields',
      'Industrials': 'Manufacturing Forest',
      'Communication Services': 'Connection Valley'
    };
    return descriptions[sector] || 'Corporate Garden';
  };

  return (
    <div className="w-full space-y-6">
      {/* Garden Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Leaf className="h-10 w-10 text-green-600" />
            Care Index Garden
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch companies bloom based on their care investment and environmental impact
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <span>Blooming: {companies.filter(c => c.health_status === 'blooming').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <span>Healthy: {companies.filter(c => c.health_status === 'healthy').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <span>Wilting: {companies.filter(c => c.health_status === 'wilting').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <span>Dying: {companies.filter(c => c.health_status === 'dying').length}</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-lg p-4 shadow-sm border"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-gray-600" />
          <Select value={sectorFilter} onValueChange={onSectorFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map(sector => (
                <SelectItem key={sector} value={sector}>
                  {getSectorEmoji(sector)} {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={healthFilter} onValueChange={onHealthFilterChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Health" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Health</SelectItem>
              {healthStatuses.map(status => (
                <SelectItem key={status} value={status}>
                  <span className="capitalize">{status}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Garden Sections */}
      <div className="space-y-8">
        {Object.entries(filteredGroupedCompanies).length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No plants found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => {
                onSearchChange('');
                onSectorFilterChange('all');
                onHealthFilterChange('all');
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </motion.div>
        ) : (
          Object.entries(filteredGroupedCompanies).map(([sector, sectorCompanies], sectorIndex) => (
            <motion.div
              key={sector}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectorIndex * 0.1 }}
              className="space-y-4"
            >
              {/* Sector Header */}
              <div className="flex items-center gap-3">
                <div className="text-2xl">{getSectorEmoji(sector)}</div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {getSectorDescription(sector)}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {sectorCompanies.length} companies in {sector}
                  </p>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {sectorCompanies.length}
                </Badge>
              </div>

              {/* Plants Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-100">
                {sectorCompanies.map((company, companyIndex) => (
                  <motion.div
                    key={company.company_id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4 + sectorIndex * 0.1 + companyIndex * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 30
                    }}
                  >
                    <Plant
                      company={company}
                      onClick={onSelectCompany}
                      isSelected={selectedCompany?.company_id === company.company_id}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}