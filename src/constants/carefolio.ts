// Carefolio application constants

// Authentication constants
export const DEMO_CREDENTIALS = {
  username: 'admin',
  password: '123'
} as const;

// Portfolio thresholds
export const CARE_THRESHOLDS = {
  LEGENDARY_SCORE: 90,
  HIGH_CARE_SCORE: 80,
  LOW_CARE_SCORE: 60,
  COMPARISON_MAX: 5
} as const;

// Health status mappings
export const HEALTH_STATUS_EMOJIS = {
  blooming: '🌸',
  healthy: '🌱',
  wilting: '🛑',
  dying: '🛑'
} as const;

// Portfolio chemistry bonuses
export const CHEMISTRY_BONUSES = {
  PARENTAL_LEAVE: 25,
  SECTOR_DIVERSITY: 30,
  SUSTAINABILITY: 20
} as const;

// Default filter values
export const DEFAULT_FILTERS = {
  SECTOR: 'all',
  HEALTH: 'all',
  SORT_BY: 'integrity',
  ROW_COUNT: 25
} as const;

// View modes
export const VIEW_MODES = {
  CAREFOLIO: 'carefolio',
  TABLE: 'table'
} as const;

// Page types
export const PAGES = {
  LANDING: 'landing',
  METHODOLOGY: 'methodology',
  DASHBOARD: 'dashboard'
} as const;