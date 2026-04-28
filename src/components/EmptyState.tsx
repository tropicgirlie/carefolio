import { motion } from 'motion/react';
import { Plus, TrendingUp, Globe, Building2, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

interface EmptyStateProps {
  onAddData: () => void;
  type?: 'dashboard' | 'portfolio' | 'comparison';
}

export function EmptyState({ onAddData, type = 'dashboard' }: EmptyStateProps) {
  const getContent = () => {
    switch (type) {
      case 'portfolio':
        return {
          icon: Building2,
          title: 'Your portfolio is waiting',
          description: 'Add companies, countries, or agencies to compare against the Global Index and discover care investment opportunities.',
          buttonText: 'Add to Portfolio',
          suggestions: [
            'Browse S&P 500 companies',
            'Explore care leaders',
            'Compare by sector'
          ]
        };
      case 'comparison':
        return {
          icon: TrendingUp,
          title: 'Ready to compare',
          description: 'Select entities to see how they stack up against care investment benchmarks and peer performance.',
          buttonText: 'Start Comparing',
          suggestions: [
            'Head-to-head analysis',
            'Sector comparisons',
            'Regional insights'
          ]
        };
      default:
        return {
          icon: Globe,
          title: 'Your dashboard is waiting',
          description: 'Add companies, countries, or agencies to compare against the Global Index and track care investment performance.',
          buttonText: 'Add Now',
          suggestions: [
            'Explore care leaders',
            'Track your favorites',
            'Build your watchlist'
          ]
        };
    }
  };

  const content = getContent();
  const Icon = content.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[400px] p-8"
    >
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-10 h-10 text-white" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="headline-h3 text-[var(--text-primary)] mb-3">
            {content.title}
          </h3>
          
          <p className="body-medium text-[var(--text-secondary)] mb-6 leading-relaxed">
            {content.description}
          </p>

          {/* Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {content.suggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="px-3 py-1 bg-[var(--fintech-feminine-bg-lavender)] text-[var(--fintech-feminine-purple)] rounded-full body-small"
              >
                {suggestion}
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={onAddData}
              className="md3-btn-filled inline-flex items-center gap-2 px-8 py-3"
              style={{
                background: 'var(--care-emerald)',
                borderRadius: '24px'
              }}
            >
              <Plus className="w-4 h-4" />
              {content.buttonText}
            </Button>
          </motion.div>
        </motion.div>

        {/* Sparkle Decoration */}
        <motion.div
          className="absolute top-4 right-4 text-[var(--fintech-feminine-lavender)]"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-4 text-[var(--care-emerald)]"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sparkles className="w-4 h-4" />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface EmptyPortfolioStateProps {
  onAddCompanies: () => void;
  onAddCountries: () => void;
  onAddAgencies: () => void;
}

export function EmptyPortfolioState({ onAddCompanies, onAddCountries, onAddAgencies }: EmptyPortfolioStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center min-h-[500px] p-8"
    >
      <div className="text-center max-w-lg">
        {/* Animated Heart Icon */}
        <motion.div
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-emerald-500 to-purple-600 flex items-center justify-center"
          animate={{ 
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="text-white text-2xl">♥</div>
        </motion.div>

        <h3 className="headline-h2 text-[var(--text-primary)] mb-4">
          Build Your Care Portfolio
        </h3>
        
        <p className="body-content text-[var(--text-secondary)] mb-8 leading-relaxed">
          Start tracking care investments and discover entities that align with your values. 
          Compare performance against the Global Care Index 2025.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.button
            onClick={onAddCompanies}
            className="p-6 bg-white border border-[var(--outline-variant)] rounded-xl hover:border-[var(--care-emerald)] hover:shadow-md transition-all duration-200 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Building2 className="w-8 h-8 text-[var(--care-emerald)] mb-3" />
            <h4 className="body-data-medium text-[var(--text-primary)] mb-2">Companies</h4>
            <p className="body-small text-[var(--text-secondary)]">Track corporate care practices</p>
          </motion.button>

          <motion.button
            onClick={onAddCountries}
            className="p-6 bg-white border border-[var(--outline-variant)] rounded-xl hover:border-[var(--fintech-feminine-purple)] hover:shadow-md transition-all duration-200 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Globe className="w-8 h-8 text-[var(--fintech-feminine-purple)] mb-3" />
            <h4 className="body-data-medium text-[var(--text-primary)] mb-2">Countries</h4>
            <p className="body-small text-[var(--text-secondary)]">Compare national policies</p>
          </motion.button>

          <motion.button
            onClick={onAddAgencies}
            className="p-6 bg-white border border-[var(--outline-variant)] rounded-xl hover:border-[var(--fintech-feminine-coral)] hover:shadow-md transition-all duration-200 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <TrendingUp className="w-8 h-8 text-[var(--fintech-feminine-coral)] mb-3" />
            <h4 className="body-data-medium text-[var(--text-primary)] mb-2">Agencies</h4>
            <p className="body-small text-[var(--text-secondary)]">Monitor institutional care</p>
          </motion.button>
        </div>

        <div className="text-center">
          <p className="body-small text-[var(--text-secondary)]">
            Or explore our curated lists to get started quickly
          </p>
        </div>
      </div>
    </motion.div>
  );
}