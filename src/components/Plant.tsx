import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Company, getSectorColor } from '../data/companies';
import { PlantIcon } from './PlantIcon';

interface PlantProps {
  company: Company;
  onClick: (company: Company) => void;
  isSelected?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function Plant({ company, onClick, isSelected = false, size = 'medium' }: PlantProps) {
  const getPlantSize = () => {
    const marketCapTrillion = company.market_cap / 1000000000000;
    if (size === 'small') return 'w-20 h-24';
    if (size === 'large') return 'w-36 h-40';
    
    // Medium size with market cap scaling
    if (marketCapTrillion > 2) return 'w-32 h-36';
    if (marketCapTrillion > 1) return 'w-28 h-32';
    if (marketCapTrillion > 0.5) return 'w-24 h-28';
    return 'w-20 h-24';
  };

  const getPerformanceIcon = () => {
    if (company.net_integrity.score >= 75) {
      return <TrendingUp className="w-3 h-3 text-emerald-600" />;
    } else if (company.net_integrity.score >= 50) {
      return <Minus className="w-3 h-3 text-amber-600" />;
    } else {
      return <TrendingDown className="w-3 h-3 text-red-600" />;
    }
  };

  const getBorderStyling = () => {
    if (isSelected) return 'ring-2 ring-primary ring-offset-2 ring-offset-background';
    return '';
  };

  const getHoverEffect = () => {
    switch (company.health_status) {
      case 'blooming': return 'hover:shadow-lg hover:shadow-emerald-500/10';
      case 'healthy': return 'hover:shadow-lg hover:shadow-green-500/10';
      case 'wilting': return 'hover:shadow-lg hover:shadow-amber-500/10';
      case 'dying': return 'hover:shadow-lg hover:shadow-red-500/10';
      default: return 'hover:shadow-lg';
    }
  };

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (score >= 60) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 40) return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  return (
    <motion.div
      className={`
        ${getPlantSize()} 
        ${getSectorColor(company.sector)}
        ${getBorderStyling()}
        ${getHoverEffect()}
        rounded-xl p-4 cursor-pointer relative
        border border-border transition-all duration-300
        flex flex-col items-center justify-between
        group bg-card
      `}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(company)}
      layout
    >
      {/* Plant Visual */}
      <div className="flex-1 flex items-center justify-center w-full">
        <PlantIcon 
          plantType={company.plant_type}
          healthStatus={company.health_status}
          size="lg"
        />
      </div>
      
      {/* Company Info */}
      <div className="text-center mt-3 w-full space-y-2">
        <div className="text-sm font-medium text-card-foreground truncate w-full">
          {company.symbol}
        </div>
        
        {/* Score and Performance Row */}
        <div className="flex items-center justify-center gap-2">
          <div className={`
            inline-flex items-center justify-center px-2 py-1 rounded-md text-xs font-medium border
            ${getScoreBadgeColor(company.care_index.score)}
          `}>
            {company.care_index.band}
          </div>
          
          <div className="flex items-center gap-1">
            {getPerformanceIcon()}
          </div>
        </div>

        {/* Plant Type Label */}
        <div className="text-xs text-muted-foreground capitalize font-normal">
          {company.plant_type}
        </div>

        {/* Conflict Indicators */}
        {company.conflict_badges.length > 0 && (
          <div className="flex justify-center">
            <div className={`
              w-2 h-2 rounded-full
              ${company.conflict_badges[0].includes('🔴') ? 'bg-red-400' : 
                company.conflict_badges[0].includes('🟡') ? 'bg-amber-400' : 
                'bg-emerald-400'}
            `} />
          </div>
        )}
      </div>

      {/* Health Pulse Effect for High Performers */}
      {company.health_status === 'blooming' && (
        <motion.div
          className="absolute inset-0 rounded-xl border border-emerald-300/40"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 rounded-xl transition-colors duration-300" />
    </motion.div>
  );
}