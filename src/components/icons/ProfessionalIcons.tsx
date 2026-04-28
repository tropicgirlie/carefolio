import React from 'react';

// Professional Icon Props
interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// DASHBOARD & NAVIGATION ICONS
export const DashboardIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
    <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export const AnalyticsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 12L9 6L13 10L21 2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2H21V7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 22H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const CompaniesIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 16H12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="7" cy="8" r="1" fill={color}/>
    <circle cx="11" cy="8" r="1" fill={color}/>
    <circle cx="15" cy="8" r="1" fill={color}/>
  </svg>
);

// DATA & METRICS ICONS
export const MetricIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 7V12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrendUpIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 14L12 9L16 13L21 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8H21V13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const TrendDownIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M7 10L12 15L16 11L21 16" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 16H21V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ScoreIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// CARE & IMPACT ICONS (Professional versions)
export const CareScoreIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="10" r="2" stroke={color} strokeWidth="1.5" fill={color}/>
  </svg>
);

export const ImpactIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="8" stroke={color} strokeWidth="1.5" fill="none" strokeDasharray="2 2"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

export const GrowthIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22V2" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 7L12 2L7 7" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="8" r="1" fill={color}/>
    <circle cx="12" cy="12" r="1.5" fill={color}/>
    <circle cx="12" cy="16" r="2" fill={color}/>
  </svg>
);

// STATUS & QUALITY ICONS
export const VerifiedIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" fill={color}/>
    <path d="M8 12L11 15L16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const QualityIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L13.09 8.26L20 9L14 14L16 21L12 17L8 21L10 14L4 9L10.91 8.26L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export const SecurityIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 22S8 18 8 13V6L12 4L16 6V13C16 18 12 22 12 22Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M9 12L11 14L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// USER & TEAM ICONS
export const UserIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="5" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M20 21A8 8 0 0 0 4 21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const TeamIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="9" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M3 21V19A4 4 0 0 1 4 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="16" cy="7" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M21 21V19A4 4 0 0 0 20 16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M1 21A8 8 0 0 1 15 21A8 8 0 0 1 1 21Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const LeadershipIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="8" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M6 21V19A4 4 0 0 1 10 15H14A4 4 0 0 1 18 19V21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 2L14 6L18 6L15 9L16 13L12 11L8 13L9 9L6 6L10 6L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

// SYSTEM & UTILITY ICONS
export const FilterIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M4 6H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7 12H17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M10 18H14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M21 21L16.65 16.65" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const SettingsIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M19.4 15A1.65 1.65 0 0 0 20.25 13.38L20.86 12A1.65 1.65 0 0 0 20.25 10.62L19.4 9A1.65 1.65 0 0 0 17.75 8.25L16.37 7.64A1.65 1.65 0 0 0 14.99 8.25L14 9.1A1.65 1.65 0 0 0 13.35 10.75L12.74 12.13A1.65 1.65 0 0 0 13.35 13.51L14 14.36A1.65 1.65 0 0 0 15.64 15L17.02 15.61A1.65 1.65 0 0 0 18.4 15Z" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

export const MoreIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <circle cx="12" cy="12" r="1" fill={color}/>
    <circle cx="19" cy="12" r="1" fill={color}/>
    <circle cx="5" cy="12" r="1" fill={color}/>
  </svg>
);

// ACTION ICONS
export const EditIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M11 4H4A2 2 0 0 0 2 6V20A2 2 0 0 0 4 22H18A2 2 0 0 0 20 20V13" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M18.5 2.5A2.121 2.121 0 0 1 21 5L12 14L8 15L9 11L18.5 2.5Z" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M3 6H5H21" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 6V4A2 2 0 0 1 10 2H14A2 2 0 0 1 16 4V6M19 6V20A2 2 0 0 1 17 22H7A2 2 0 0 1 5 20V6H19Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export const ViewIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
  </svg>
);

// EXPORT ICON
export const ExportIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M14 2H6A2 2 0 0 0 4 4V20A2 2 0 0 0 6 22H18A2 2 0 0 0 20 20V8L14 2Z" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14 2V8H20" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 18V12" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 15L12 12L15 15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// SPECIAL CARE ICONS (Professional versions)
export const CarefolioIcon: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M16 6V26M6 16H26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="16" cy="10" r="2" fill={color}/>
    <circle cx="16" cy="16" r="3" fill={color}/>
    <circle cx="16" cy="22" r="2" fill={color}/>
    <circle cx="10" cy="16" r="2" fill={color}/>
    <circle cx="22" cy="16" r="2" fill={color}/>
  </svg>
);

export const NurtureIcon: React.FC<IconProps> = ({ size = 20, color = 'currentColor', className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 3C8 3 6 7 6 12C6 17 8 21 12 21C16 21 18 17 18 12C18 7 16 3 12 3Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M12 7V17" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M9 10L12 7L15 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="1" fill={color}/>
  </svg>
);

// Icon Map for easy access
export const icons = {
  // Navigation
  dashboard: DashboardIcon,
  analytics: AnalyticsIcon,
  companies: CompaniesIcon,
  
  // Data & Metrics
  metric: MetricIcon,
  trendUp: TrendUpIcon,
  trendDown: TrendDownIcon,
  score: ScoreIcon,
  
  // Care & Impact
  careScore: CareScoreIcon,
  impact: ImpactIcon,
  growth: GrowthIcon,
  nurture: NurtureIcon,
  
  // Status & Quality
  verified: VerifiedIcon,
  quality: QualityIcon,
  security: SecurityIcon,
  
  // User & Team
  user: UserIcon,
  team: TeamIcon,
  leadership: LeadershipIcon,
  
  // System & Utility
  filter: FilterIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  more: MoreIcon,
  
  // Actions
  edit: EditIcon,
  delete: DeleteIcon,
  view: ViewIcon,
  export: ExportIcon,
  
  // Brand
  carefolio: CarefolioIcon,
};

export type IconName = keyof typeof icons;

// Icon Wrapper Component
interface IconWrapperProps extends IconProps {
  name: IconName;
}

export const Icon: React.FC<IconWrapperProps> = ({ name, ...props }) => {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
};