import { motion } from 'motion/react';
import { Building2, Globe, Shield } from 'lucide-react';

type ViewType = 'companies' | 'countries' | 'agencies';

interface ViewToggleProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  className?: string;
}

export function ViewToggle({ currentView, onViewChange, className = '' }: ViewToggleProps) {
  const views = [
    {
      id: 'companies' as ViewType,
      label: 'Companies',
      icon: Building2,
      description: 'Corporate care investment'
    },
    {
      id: 'countries' as ViewType,
      label: 'Countries',
      icon: Globe,
      description: 'National care policies'
    },
    {
      id: 'agencies' as ViewType,
      label: 'Agencies',
      icon: Shield,
      description: 'Government departments',
      disabled: true // Coming soon
    }
  ] as const;

  return (
    <div className={`flex items-center bg-[var(--bg-secondary)] p-2 rounded-2xl ${className}`}>
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.id;
        const isDisabled = view.disabled;

        return (
          <button
            key={view.id}
            onClick={() => !isDisabled && onViewChange(view.id)}
            disabled={isDisabled}
            className={`
              relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-200 
              ${isDisabled 
                ? 'opacity-50 cursor-not-allowed' 
                : 'cursor-pointer'
              }
              ${!isActive && !isDisabled
                ? 'hover:bg-[var(--bg-card)] hover:shadow-sm'
                : ''
              }
            `}
            title={isDisabled ? 'Coming soon' : view.description}
          >
            {/* Active background */}
            {isActive && (
              <motion.div
                layoutId="activeViewBackground"
                className="absolute inset-0 bg-[var(--care-emerald)] rounded-xl"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              />
            )}
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-3">
              <Icon 
                className={`w-5 h-5 ${
                  isActive 
                    ? 'text-white' 
                    : isDisabled
                      ? 'text-[var(--text-secondary)]'
                      : 'text-[var(--text-primary)]'
                }`} 
              />
              <span 
                className={`body-medium-medium ${
                  isActive 
                    ? 'text-white' 
                    : isDisabled
                      ? 'text-[var(--text-secondary)]'
                      : 'text-[var(--text-primary)]'
                }`}
              >
                {view.label}
              </span>
              
              {/* Coming Soon Badge */}
              {isDisabled && (
                <span className="px-2 py-1 bg-[var(--neutral-lilac)] text-white text-xs rounded-full">
                  Soon
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}