import React from 'react';

// Icon Props Interface
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

// NAVIGATION & CORE ICONS - Coinbase Style
export const HomeIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 9L12 2L21 9V20A2 2 0 0 1 19 22H5A2 2 0 0 1 3 20V9Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 22V12H15V22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DashboardIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const PortfolioIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M20 7H4A2 2 0 0 0 2 9V19A2 2 0 0 0 4 21H20A2 2 0 0 0 22 19V9A2 2 0 0 0 20 7Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 21V5A2 2 0 0 0 14 3H10A2 2 0 0 0 8 5V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const InsightsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 3V18A3 3 0 0 0 6 21H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 9L13 13.5L10.5 11L7 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// CARE & IMPACT ICONS - Professional Clean Style
export const CareIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M8 14S9.5 16 12 16S16 14 16 14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="9" r="1" fill={color}/>
    <circle cx="15" cy="9" r="1" fill={color}/>
  </svg>
);

export const ImpactIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 1V3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M12 21V23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M4.22 4.22L5.64 5.64" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M18.36 18.36L19.78 19.78" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M1 12H3" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M21 12H23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M4.22 19.78L5.64 18.36" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M18.36 5.64L19.78 4.22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const GrowthIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12L9 6L13 10L21 2" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 6H21V10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// DATA & METRICS ICONS
export const MetricIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="8" width="4" height="13" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="10" y="4" width="4" height="17" rx="2" stroke={color} strokeWidth={strokeWidth}/>
    <rect x="17" y="11" width="4" height="10" rx="2" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const PerformanceIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 20V10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M18 20V4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M6 20V16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const TrendIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 12L18 8L14 12L8 6L2 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// COMPANY & TEAM ICONS
export const CompanyIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 21H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M5 21V7L13 4V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M19 21V11L13 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 9V9.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12V12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 15V15.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 18V18.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TeamIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M16 21V19A4 4 0 0 0 12 15H5A4 4 0 0 0 1 19V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="8.5" cy="7" r="4" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M23 21V19A4 4 0 0 0 19 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 3.13A4 4 0 0 1 16 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LeadershipIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M6 21V19A4 4 0 0 1 10 15H14A4 4 0 0 1 18 19V21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 1L13.5 4L17 4.5L15 7L15.5 10.5L12 9L8.5 10.5L9 7L7 4.5L10.5 4L12 1Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SYSTEM & UTILITY ICONS
export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M21 21L16.65 16.65" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M7 12H17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M10 18H14" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M19.4 15A1.65 1.65 0 0 0 20.25 13.38L20.86 12A1.65 1.65 0 0 0 20.25 10.62L19.4 9A1.65 1.65 0 0 0 17.75 8.25L16.37 7.64A1.65 1.65 0 0 0 14.99 8.25L14 9.1A1.65 1.65 0 0 0 13.35 10.75L12.74 12.13A1.65 1.65 0 0 0 13.35 13.51L14 14.36A1.65 1.65 0 0 0 15.64 15L17.02 15.61A1.65 1.65 0 0 0 18.4 15Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// STATUS & FEEDBACK ICONS
export const CheckIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

export const AlertIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 8V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M12 16H12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 16V12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M12 8H12.01" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

// ACTION ICONS
export const AddIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth}/>
    <path d="M12 8V16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M8 12H16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 4H4A2 2 0 0 0 2 6V20A2 2 0 0 0 4 22H18A2 2 0 0 0 20 20V13" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5A2.121 2.121 0 0 1 21 5L12 14L8 15L9 11L18.5 2.5Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H5H21" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 11V17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
    <path d="M14 11V17" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"/>
  </svg>
);

// NAVIGATION ARROWS
export const ChevronLeftIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M15 18L9 12L15 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M9 18L15 12L9 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronUpIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M18 15L12 9L6 15" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M6 9L12 15L18 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SPECIAL CAREFOLIO ICONS - Clean Professional Style
export const CarefolioLogoIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2"/>
    <circle cx="16" cy="12" r="3" fill="var(--care-emerald)"/>
    <circle cx="16" cy="20" r="2" fill="var(--care-vibrant-mint)"/>
    <circle cx="12" cy="16" r="1.5" fill="var(--care-teal)"/>
    <circle cx="20" cy="16" r="1.5" fill="var(--care-teal)"/>
  </svg>
);

export const NurtureIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '', strokeWidth = 1.5 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22C17 17 20 13 20 9A8 8 0 0 0 4 9C4 13 7 17 12 22Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="2" stroke={color} strokeWidth={strokeWidth}/>
  </svg>
);

// Icon Collection Export
export const coinbaseIcons = {
  // Navigation
  home: HomeIcon,
  dashboard: DashboardIcon,
  portfolio: PortfolioIcon,
  insights: InsightsIcon,
  
  // Care & Impact
  care: CareIcon,
  impact: ImpactIcon,
  growth: GrowthIcon,
  nurture: NurtureIcon,
  
  // Data & Metrics
  metric: MetricIcon,
  performance: PerformanceIcon,
  trend: TrendIcon,
  
  // Company & Team
  company: CompanyIcon,
  team: TeamIcon,
  leadership: LeadershipIcon,
  
  // System
  search: SearchIcon,
  filter: FilterIcon,
  sort: SortIcon,
  settings: SettingsIcon,
  
  // Status
  check: CheckIcon,
  alert: AlertIcon,
  info: InfoIcon,
  
  // Actions
  add: AddIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  
  // Navigation
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  chevronUp: ChevronUpIcon,
  chevronDown: ChevronDownIcon,
  
  // Brand
  carefolio: CarefolioLogoIcon,
};

export type CoinbaseIconName = keyof typeof coinbaseIcons;

// Icon Wrapper Component
interface CoinbaseIconProps extends IconProps {
  name: CoinbaseIconName;
}

export const CoinbaseIcon: React.FC<CoinbaseIconProps> = ({ name, ...props }) => {
  const IconComponent = coinbaseIcons[name];
  return <IconComponent {...props} />;
};