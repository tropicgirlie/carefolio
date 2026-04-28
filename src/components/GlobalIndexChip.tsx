import { motion } from 'motion/react';
import { TrendingUp, Globe, User } from 'lucide-react';

interface GlobalIndexChipProps {
  mode: 'global' | 'personal';
  value: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function GlobalIndexChip({ mode, value, isActive = false, onClick }: GlobalIndexChipProps) {
  const isGlobal = mode === 'global';
  
  return (
    <motion.button
      onClick={onClick}
      className={`
        inline-flex items-center gap-3 px-4 py-3 rounded-full border transition-all duration-200
        ${isActive 
          ? 'bg-white border-[var(--fintech-feminine-purple)] shadow-lg' 
          : 'bg-[#FBF7FE] border-[var(--fintech-feminine-purple)] hover:shadow-md hover:scale-105'
        }
      `}
      whileHover={{ scale: isActive ? 1 : 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Orb Icon with Gradient */}
      <div className="relative">
        <div 
          className={`
            w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium
            ${isGlobal 
              ? 'bg-gradient-to-br from-emerald-500 to-purple-600' 
              : 'bg-gradient-to-br from-purple-600 to-coral-500'
            }
          `}
        >
          {isGlobal ? <Globe className="w-3 h-3" /> : <User className="w-3 h-3" />}
        </div>
        
        {/* Pulse effect for active state */}
        {isActive && (
          <motion.div
            className={`
              absolute inset-0 rounded-full opacity-20
              ${isGlobal 
                ? 'bg-gradient-to-br from-emerald-500 to-purple-600' 
                : 'bg-gradient-to-br from-purple-600 to-coral-500'
              }
            `}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.2, 0, 0.2]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex items-center gap-2">
        <span className="body-data-medium text-[var(--text-primary)]">
          {isGlobal ? 'Global Index 2025' : 'My Dashboard'}
        </span>
        
        {/* Separator */}
        <div className="w-px h-4 bg-[var(--outline-variant)]" />
        
        {/* Value */}
        <div className="flex items-center gap-1">
          <span 
            className="data-medium text-[var(--fintech-feminine-purple)]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {value}
          </span>
          {!isGlobal && (
            <TrendingUp className="w-3 h-3 text-[var(--care-emerald)]" />
          )}
        </div>
      </div>
    </motion.button>
  );
}

