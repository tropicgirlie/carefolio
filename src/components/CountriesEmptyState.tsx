import { motion } from 'motion/react';
import { Globe, Plus, TrendingUp } from 'lucide-react';

interface CountriesEmptyStateProps {
  onAddCountry?: () => void;
  className?: string;
}

export function CountriesEmptyState({ onAddCountry, className = '' }: CountriesEmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex flex-col items-center justify-center py-20 px-8 text-center ${className}`}
    >
      {/* Animated Globe Icon */}
      <motion.div
        className="relative mb-8"
        animate={{ 
          rotate: [0, 5, -5, 0],
          y: [0, -8, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-[var(--care-emerald)] to-[var(--care-vibrant-mint)] rounded-full flex items-center justify-center shadow-lg">
          <Globe className="w-12 h-12 text-white" />
        </div>
        
        {/* Floating particles */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 bg-[var(--fintech-feminine-purple)] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.5
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-3 w-2 h-2 bg-[var(--fintech-feminine-coral)] rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-2 h-2 bg-[var(--fintech-feminine-lavender)] rounded-full"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 0.2
          }}
        />
      </motion.div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="headline-h2 text-[var(--text-primary)] mb-4"
      >
        Explore Global Care
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="body-content text-[var(--text-secondary)] mb-8 max-w-lg leading-relaxed"
      >
        Discover how countries around the world are investing in care. Explore parental leave policies, childcare systems, and women's health outcomes in our global care database.
      </motion.p>

      {/* Stats Preview */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-8 mb-8 p-6 bg-[var(--fintech-feminine-bg-lavender)] rounded-2xl border border-[var(--fintech-feminine-purple)]/20"
      >
        <div className="text-center">
          <div className="data-large text-[var(--fintech-feminine-purple)] mb-1">
            6+
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Countries Ready
          </div>
        </div>
        
        <div className="w-px h-12 bg-[var(--outline-variant)]" />
        
        <div className="text-center">
          <div className="data-large text-[var(--care-emerald)] mb-1">
            4
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Care Pillars
          </div>
        </div>
        
        <div className="w-px h-12 bg-[var(--outline-variant)]" />
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-1">
            <TrendingUp className="w-5 h-5 text-[var(--care-vibrant-mint)]" />
            <span className="data-large text-[var(--care-vibrant-mint)]">A-E</span>
          </div>
          <div className="body-small text-[var(--text-secondary)]">
            Index Bands
          </div>
        </div>
      </motion.div>



      {/* Helper Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="body-small text-[var(--text-secondary)] mt-6"
      >
        Sign up to start tracking and comparing countries in your portfolio
      </motion.p>
    </motion.div>
  );
}