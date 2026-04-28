import { motion } from 'motion/react';
import { Company } from '../data/companies';
import { CarefolioCard } from './CarefolioCard';

interface CarefolioCardViewProps {
  companies: Company[];
  onCompanyClick: (company: Company) => void;
}

export function CarefolioCardView({
  companies,
  onCompanyClick
}: CarefolioCardViewProps) {
  // Calculate collection stats for overview
  const collectionStats = {
    total: companies.length,
    blooming: companies.filter(c => (c.care_index?.score || 0) >= 85).length, // A-band
    strong: companies.filter(c => {
      const score = c.care_index?.score || 0;
      return score >= 75 && score < 85;
    }).length, // B-band
    moderate: companies.filter(c => {
      const score = c.care_index?.score || 0;
      return score >= 65 && score < 75;
    }).length, // C-band
    atRisk: companies.filter(c => (c.care_index?.score || 0) < 65).length // D-band
  };

  return (
    <div className="space-y-8">
      {/* Collection Stats Bar */}
      <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-6 elevation-1">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-on-surface mb-2 font-mono">
              {collectionStats.total}
            </div>
            <div className="text-sm text-on-surface-variant">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-care-emerald mb-2 font-mono">
              {collectionStats.blooming}
            </div>
            <div className="text-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span>🌸</span> Blooming
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-care-teal mb-2 font-mono">
              {collectionStats.strong}
            </div>
            <div className="text-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span>💎</span> Strong
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-neutral-lilac mb-2 font-mono">
              {collectionStats.moderate}
            </div>
            <div className="text-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span>🟡</span> Moderate
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-harm-coral mb-2 font-mono">
              {collectionStats.atRisk}
            </div>
            <div className="text-sm text-on-surface-variant flex items-center justify-center gap-1">
              <span>🔴</span> At Risk
            </div>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div className="carefolio-card-grid">
        {companies.map((company, index) => (
          <motion.div
            key={company.id || company.symbol || `company-${index}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              delay: index * 0.02, 
              duration: 0.3, 
              ease: [0.2, 0, 0, 1] 
            }}
          >
            <CarefolioCard
              company={company}
              isSelected={false}
              onSelect={() => onCompanyClick(company)}
              onDetail={() => onCompanyClick(company)}
              storyMode={false}
              selectedCompanies={[]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}