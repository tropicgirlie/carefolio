import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, TrendingUp, BarChart3, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Nudge {
  id: string;
  type: 'export' | 'compare' | 'trend' | 'celebrate';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  action: {
    label: string;
    onClick: () => void;
  };
  priority: number; // Higher numbers shown first
  showAfter?: string; // Show after this action
}

interface ProgressiveNudgesProps {
  userActions: string[]; // Array of completed actions
  onExportReport: () => void;
  onViewComparison: () => void;
  onViewTrends: () => void;
}

export function ProgressiveNudges({ 
  userActions, 
  onExportReport, 
  onViewComparison, 
  onViewTrends 
}: ProgressiveNudgesProps) {
  const [dismissedNudges, setDismissedNudges] = useState<Set<string>>(new Set());

  // Define all possible nudges
  const allNudges: Nudge[] = [
    {
      id: 'export-report',
      type: 'export',
      title: 'Export your Carefolio Report',
      description: 'Share your care investment insights with stakeholders and track your progress over time.',
      icon: Download,
      action: {
        label: 'Export Report',
        onClick: onExportReport
      },
      priority: 3,
      showAfter: 'first-save'
    },
    {
      id: 'compare-global',
      type: 'compare',
      title: 'Compare your picks to the Global Index',
      description: 'See how your portfolio performs against the Global Care Index 2025 benchmark.',
      icon: TrendingUp,
      action: {
        label: 'View Comparison',
        onClick: onViewComparison
      },
      priority: 2,
      showAfter: 'first-save'
    },
    {
      id: 'resilience-trend',
      type: 'trend',
      title: 'See your Resilience Premium trend',
      description: 'Track how your care-focused investments are building long-term resilience.',
      icon: BarChart3,
      action: {
        label: 'View Trends',
        onClick: onViewTrends
      },
      priority: 1,
      showAfter: 'first-save'
    },
    {
      id: 'portfolio-milestone',
      type: 'celebrate',
      title: 'Great progress on your care portfolio!',
      description: 'You\'ve built a diverse portfolio. Consider exploring sector-specific insights.',
      icon: Sparkles,
      action: {
        label: 'Explore More',
        onClick: onViewComparison
      },
      priority: 4,
      showAfter: 'portfolio-milestone'
    }
  ];

  // Filter nudges based on user actions and dismissal state
  const availableNudges = allNudges.filter(nudge => {
    // Check if nudge has been dismissed
    if (dismissedNudges.has(nudge.id)) return false;
    
    // Check if prerequisite action has been completed
    if (nudge.showAfter && !userActions.includes(nudge.showAfter)) return false;
    
    return true;
  }).sort((a, b) => b.priority - a.priority);

  // Show only the highest priority nudge
  const currentNudge = availableNudges[0];

  const handleDismiss = (nudgeId: string) => {
    setDismissedNudges(prev => new Set([...prev, nudgeId]));
  };

  const getNudgeStyles = (type: Nudge['type']) => {
    switch (type) {
      case 'export':
        return {
          bg: 'bg-[var(--fintech-feminine-bg-lavender)]',
          border: 'border-[var(--fintech-feminine-purple)]/20',
          iconBg: 'bg-[var(--fintech-feminine-purple)]',
          iconColor: 'text-white',
          titleColor: 'text-[var(--fintech-feminine-purple)]'
        };
      case 'compare':
        return {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          iconBg: 'bg-[var(--care-emerald)]',
          iconColor: 'text-white',
          titleColor: 'text-[var(--care-emerald)]'
        };
      case 'trend':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconBg: 'bg-blue-500',
          iconColor: 'text-white',
          titleColor: 'text-blue-600'
        };
      case 'celebrate':
        return {
          bg: 'bg-gradient-to-r from-[var(--fintech-feminine-bg-lavender)] to-emerald-50',
          border: 'border-[var(--care-emerald)]/30',
          iconBg: 'bg-gradient-to-r from-[var(--fintech-feminine-purple)] to-[var(--care-emerald)]',
          iconColor: 'text-white',
          titleColor: 'text-[var(--text-primary)]'
        };
      default:
        return {
          bg: 'bg-[var(--bg-secondary)]',
          border: 'border-[var(--outline-variant)]',
          iconBg: 'bg-[var(--care-emerald)]',
          iconColor: 'text-white',
          titleColor: 'text-[var(--text-primary)]'
        };
    }
  };

  if (!currentNudge) return null;

  const styles = getNudgeStyles(currentNudge.type);
  const Icon = currentNudge.icon;

  return (
    <AnimatePresence>
      <motion.div
        key={currentNudge.id}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
        className={`
          relative mx-6 my-4 p-4 rounded-xl border ${styles.bg} ${styles.border}
          shadow-sm hover:shadow-md transition-all duration-200
        `}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <motion.div
            className={`w-10 h-10 rounded-lg ${styles.iconBg} flex items-center justify-center flex-shrink-0`}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className={`w-5 h-5 ${styles.iconColor}`} />
          </motion.div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className={`body-data-medium ${styles.titleColor} mb-1`}>
              {currentNudge.title}
            </h4>
            <p className="body-small text-[var(--text-secondary)] mb-3 leading-relaxed">
              {currentNudge.description}
            </p>

            {/* Action Button */}
            <Button
              onClick={currentNudge.action.onClick}
              variant="outline"
              size="sm"
              className="inline-flex items-center gap-2 hover:shadow-sm"
            >
              {currentNudge.action.label}
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>

          {/* Dismiss Button */}
          <button
            onClick={() => handleDismiss(currentNudge.id)}
            className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Decorative Element for Celebrate Type */}
        {currentNudge.type === 'celebrate' && (
          <motion.div
            className="absolute top-2 right-12 text-[var(--fintech-feminine-lavender)]"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

interface NudgeManagerProps {
  userActions: string[];
  onExportReport: () => void;
  onViewComparison: () => void;
  onViewTrends: () => void;
  showNudges?: boolean;
}

export function NudgeManager({ 
  userActions, 
  onExportReport, 
  onViewComparison, 
  onViewTrends,
  showNudges = true 
}: NudgeManagerProps) {
  if (!showNudges) return null;

  return (
    <ProgressiveNudges
      userActions={userActions}
      onExportReport={onExportReport}
      onViewComparison={onViewComparison}
      onViewTrends={onViewTrends}
    />
  );
}