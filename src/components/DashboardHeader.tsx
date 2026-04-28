import { Heart, List, LayoutGrid, LogOut } from 'lucide-react';
import { Button } from './ui/button';

interface DashboardHeaderProps {
  user: string;
  viewMode: 'carefolio' | 'table';
  onNavigateToLanding: () => void;
  onNavigateToMethodology: () => void;
  onViewModeChange: (mode: 'carefolio' | 'table') => void;
  onLogout: () => void;
}

export function DashboardHeader({
  user,
  viewMode,
  onNavigateToLanding,
  onNavigateToMethodology,
  onViewModeChange,
  onLogout
}: DashboardHeaderProps) {
  return (
    <header className="bg-[var(--bg-card)] elevation-1 sticky top-0 z-30 border-b border-[var(--outline-variant)]">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="flex items-center justify-between">
          {/* Carefolio Logo & Title - Orange Hero Headline */}
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[var(--care-emerald)] to-[var(--maternal-wisdom)] rounded-2xl flex items-center justify-center elevation-2 relative">
              <Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-current" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[var(--care-vibrant-mint)] rounded-full heart-leaf-icon" />
            </div>
            <div className="flex flex-col">
              <h1 className="headline-large text-[var(--highlight-orange)]">
                Carefolio
              </h1>
              <p className="caption text-[var(--text-secondary)]">
                A portfolio of care as capital • Welcome, {user}
              </p>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex items-center gap-4">
            {/* Navigation Links */}
            <button
              onClick={onNavigateToLanding}
              className="md3-btn-text"
            >
              Home
            </button>
            <button
              onClick={onNavigateToMethodology}
              className="md3-btn-text"
            >
              Methodology
            </button>

            {/* View Toggle - Enhanced with MomOps styling */}
            <div className="flex items-center bg-[var(--bg-secondary)] rounded-full p-1 border border-[var(--outline-variant)]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('table')}
                className={`
                  h-10 px-4 lg:px-5 label-text font-medium transition-all duration-300 rounded-full state-layer
                  ${viewMode === 'table' 
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm elevation-1' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]/50'
                  }
                `}
              >
                <List className="w-4 h-4 mr-2 stroke-current" strokeWidth={2} />
                <span className="hidden sm:inline">Data</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewModeChange('carefolio')}
                className={`
                  h-10 px-4 lg:px-5 label-text font-medium transition-all duration-300 rounded-full state-layer
                  ${viewMode === 'carefolio' 
                    ? 'bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm elevation-1' 
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)]/50'
                  }
                `}
              >
                <LayoutGrid className="w-4 h-4 mr-2 stroke-current" strokeWidth={2} />
                <span className="hidden sm:inline">Cards</span>
              </Button>
            </div>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="h-10 px-4 text-[var(--text-secondary)] hover:text-[var(--harm-coral)] hover:bg-[var(--error-container)] transition-all duration-300 rounded-full border border-[var(--outline-variant)]"
            >
              <LogOut className="w-4 h-4 mr-2 stroke-current" strokeWidth={2} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}