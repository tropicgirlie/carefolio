import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Code, 
  Database, 
  Layers, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Eye, 
  EyeOff,
  Copy,
  ExternalLink,
  GitBranch,
  Zap,
  Heart,
  Target,
  Users,
  Palette,
  FileText,
  Terminal,
  Package,
  Rocket,
  X
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';

interface TechDocsProps {
  onClose: () => void;
}

export function TechDocs({ onClose }: TechDocsProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (password === 'pitombeira') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password. Triple-click the Carefolio logo for access.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-[var(--care-emerald)]">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <img src={carefolioLogo} alt="Carefolio" className="w-8 h-8" />
                <span className="headline-h3 text-[var(--care-emerald)]">Carefolio</span>
              </div>
              <CardTitle className="headline-h2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-[var(--care-emerald)]" />
                Technical Documentation
              </CardTitle>
              <p className="body-medium text-[var(--text-secondary)]">
                Developer resources and project architecture
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="body-small-medium">Access Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Enter admin password"
                    className="pr-10"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {error && (
                  <p className="body-small text-[var(--harm-coral)]">{error}</p>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={handleLogin} className="flex-1 md3-btn-filled">
                  <BookOpen className="w-4 h-4" />
                  Access Docs
                </Button>
                <Button onClick={onClose} variant="outline">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center">
                <p className="body-small text-[var(--text-secondary)]">
                  💡 Hint: Triple-click the Carefolio logo anywhere in the app
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Header */}
      <header className="bg-[var(--bg-card)] border-b border-[var(--outline-variant)] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img src={carefolioLogo} alt="Carefolio" className="w-6 h-6" />
                <span className="headline-h3 text-[var(--care-emerald)]">Carefolio</span>
                <Badge variant="outline" className="data-small">
                  TECH DOCS v2.1
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="body-small">
                Last Updated: Dec 24, 2024
              </Badge>
              <Button onClick={onClose} variant="outline">
                <X className="w-4 h-4" />
                Close
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Architecture
            </TabsTrigger>
            <TabsTrigger value="components" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Components
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data & Types
            </TabsTrigger>
            <TabsTrigger value="deployment" className="flex items-center gap-2">
              <Rocket className="w-4 h-4" />
              Deployment
            </TabsTrigger>
            <TabsTrigger value="status" className="flex items-center gap-2">
              <GitBranch className="w-4 h-4" />
              Status
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[var(--care-emerald)]" />
                  Project Context
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">One-Liner Pitch</h4>
                    <p className="body-medium">
                      <strong>Carefolio</strong> - A garden-themed investment platform that visualizes S&P 500 companies as trading cards based on their care investment versus harm footprint, using sophisticated Coinbase × Female Invest inspired design with maternal wisdom and systemic thinking.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">Target User</h4>
                    <p className="body-medium">
                      <strong>Conscious investors</strong> seeking ESG-focused companies with strong care practices. Users want data-driven insights about nurture infrastructure (parental leave, women leadership, pay transparency) with gamified presentation that makes complex care metrics accessible and actionable.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">Stack Decision</h4>
                    <div className="space-y-2">
                      <Badge variant="secondary">React 18+ with TypeScript</Badge>
                      <Badge variant="secondary">Tailwind CSS v4</Badge>
                      <Badge variant="secondary">Motion/React (Framer Motion)</Badge>
                      <Badge variant="secondary">Shadcn/UI Components</Badge>
                      <Badge variant="secondary">Figma Make Platform</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Design Philosophy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">🎨 Color Strategy</h5>
                      <p className="body-small">Orange exclusively for CTAs/actions. New Carefolio green palette (Emerald #2BAE66, Vibrant Mint #00C896, Teal #009688) for all data visualization and brand elements.</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">📝 Typography System</h5>
                      <p className="body-small">Figtree SemiBold for headlines, Inter Regular/Medium for body text, IBM Plex Mono for dyscalculia-friendly data display with tabular numbers.</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">🔄 MomOps DNA</h5>
                      <p className="body-small">Deep Navy backgrounds, heart-leaf icons, maternal-coded symbols integrated throughout while maintaining fintech-clean professionalism.</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">📱 Material Design 3</h5>
                      <p className="body-small">48px button heights, proper elevation system, state layers, and refined component interactions following MD3 specifications.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Architecture Tab */}
          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <Layers className="w-6 h-6 text-[var(--care-emerald)]" />
                  Architecture Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">Folder Structure</h4>
                    <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-4 rounded-lg font-mono text-sm">
                      <pre>{`├── App.tsx                    # Main router
├── components/
│   ├── ui/                   # Shadcn components
│   ├── figma/               # Protected components
│   ├── LandingPage.tsx      # Public landing
│   ├── Dashboard.tsx        # Card grid view
│   ├── Leaderboard.tsx      # Table view
│   ├── MethodologyPage.tsx  # Care methodology
│   └── CarefolioCard.tsx    # Company cards
├── data/
│   └── companies.ts         # Mock S&P 500 data
├── styles/
│   └── globals.css          # Design system
├── utils/
│   ├── helpers.ts           # Utilities
│   └── portfolioAnalytics.ts # Analytics
└── constants/
    └── carefolio.ts         # App constants`}</pre>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">Data Flow</h4>
                    <div className="space-y-3">
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">1. Authentication</h5>
                        <p className="body-small">Simple admin/123 login → sets isAuthenticated state → enables dashboard access</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">2. Company Data</h5>
                        <p className="body-small">mockCompanies array → filtered/sorted → passed to Dashboard/Leaderboard components</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">3. Navigation</h5>
                        <p className="body-small">PageType state in App.tsx → conditional rendering → AnimatePresence transitions</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">4. UI State</h5>
                        <p className="body-small">Local component state → filters, selection, modals → no external state management needed</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Key Components Hierarchy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium text-[var(--care-emerald)] mb-2">App.tsx</h5>
                      <ul className="body-small space-y-1">
                        <li>• Router logic</li>
                        <li>• Auth state</li>
                        <li>• Page transitions</li>
                        <li>• Background elements</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium text-[var(--care-emerald)] mb-2">LandingPage.tsx</h5>
                      <ul className="body-small space-y-1">
                        <li>• Hero section</li>
                        <li>• Login form</li>
                        <li>• Care methodology</li>
                        <li>• Company previews</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium text-[var(--care-emerald)] mb-2">Dashboard.tsx</h5>
                      <ul className="body-small space-y-1">
                        <li>• Card grid layout</li>
                        <li>• Filter controls</li>
                        <li>• Portfolio analytics</li>
                        <li>• CarefolioCard rendering</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium text-[var(--care-emerald)] mb-2">Leaderboard.tsx</h5>
                      <ul className="body-small space-y-1">
                        <li>• Table layout</li>
                        <li>• Spotlight card</li>
                        <li>• Peer comparison modal</li>
                        <li>• Dynamic badges</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <Package className="w-6 h-6 text-[var(--care-emerald)]" />
                  Component Library
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Design System Components</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Typography Classes</h5>
                      <div className="space-y-1 body-small">
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.headline-h1</code> - 40px Figtree SemiBold<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.headline-h2</code> - 32px Figtree SemiBold<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.headline-h3</code> - 22px Figtree SemiBold<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.body-large</code> - 18px Inter Regular<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.body-medium</code> - 16px Inter Regular<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.body-small</code> - 14px Inter Regular<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.data-large</code> - 18px IBM Plex Mono<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.data-medium</code> - 16px IBM Plex Mono
                      </div>
                    </div>
                    
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Button System</h5>
                      <div className="space-y-1 body-small">
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.md3-btn-filled</code> - Orange primary CTA<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.md3-btn-outlined</code> - Green outlined secondary<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">.md3-btn-text</code> - Green text tertiary<br/>
                        All buttons: 40px min-height, 20px border-radius, proper state layers
                      </div>
                    </div>
                    
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Color Variables</h5>
                      <div className="space-y-1 body-small">
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">--care-emerald</code> - #2BAE66<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">--care-vibrant-mint</code> - #00C896<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">--care-teal</code> - #009688<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">--cta-orange</code> - #FF6B35<br/>
                        <code className="bg-[var(--bg-card)] px-2 py-1 rounded">--harm-coral</code> - #E46C6C
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Custom Components</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="body-medium-medium">CarefolioCard.tsx</h5>
                      <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-3 rounded-lg font-mono text-sm">
                        <pre>{`interface CarefolioCardProps {
  company: Company;
  isSelected?: boolean;
  onSelect?: () => void;
  showDetails?: boolean;
}

// Features:
// - Responsive card layout
// - Care score visualization  
// - Band badges (A-E ranking)
// - Hover animations
// - Maternal narrative display`}</pre>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="body-medium-medium">Leaderboard.tsx</h5>
                      <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-3 rounded-lg font-mono text-sm">
                        <pre>{`interface LeaderboardProps {
  companies: Company[];
  onNavigateToLanding: () => void;
  onNavigateToMethodology: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

// Features:
// - Sortable table view
// - Dynamic badge notifications
// - Spotlight card panel
// - Peer comparison modal`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Usage Patterns</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">🎨 Animation Standards</h5>
                      <p className="body-small mb-2">All components use Motion/React with consistent easing:</p>
                      <code className="body-small bg-[var(--bg-card)] px-2 py-1 rounded block">cubic-bezier(0.2, 0, 0, 1)</code>
                      <p className="body-small mt-2">Page transitions: 0.3s duration, y: 20px offset</p>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">📱 Responsive Breakpoints</h5>
                      <div className="body-small space-y-1">
                        <div>Mobile: &lt; 800px (1 column)</div>
                        <div>Tablet: 800px - 1199px (2 columns)</div>
                        <div>Desktop: 1200px - 1599px (3 columns)</div>
                        <div>Large: ≥ 1600px (4 columns)</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & Types Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <Database className="w-6 h-6 text-[var(--care-emerald)]" />
                  Data Schema & Types
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Core Company Interface</h4>
                  <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`interface Company {
  company_id: string;
  name: string;
  symbol: string;
  sector: string;
  market_cap: number;
  
  care_index: {
    score: number;           // 0-100 overall care score
    rank: number;           // S&P 500 ranking
    percentile: number;     // Top X% of companies
  };
  
  harm_index: {
    score: number;          // 0-100 harm reduction score
    categories: string[];   // Areas of impact
  };
  
  care_metrics: {
    parental_leave: {
      weeks_paid: number;
      weeks_unpaid: number;
      parent_gender_neutral: boolean;
    };
    
    women_leadership: {
      ceo_female: boolean;
      board_percentage: number;
      executive_percentage: number;
    };
    
    pay_transparency: {
      transparency_score: number;    // A-F scale
      pay_equity_audit: boolean;
      published_ranges: boolean;
    };
    
    childcare_support: {
      onsite_available: boolean;
      subsidies_provided: boolean;
      backup_care: boolean;
    };
  };
  
  story?: {
    maternal_voice?: string;         // Narrative description
    care_highlights: string[];       // Key achievements
    growth_areas: string[];          // Improvement opportunities
  };
}`}</pre>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Care Band Classification</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div className="bg-gradient-to-br from-[var(--care-vibrant-mint)] to-[var(--care-emerald)] text-white p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🌸</div>
                      <div className="body-small-medium">Band A</div>
                      <div className="data-small">85+ Score</div>
                      <div className="body-small">Legendary Care</div>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--care-emerald)] to-[var(--care-teal)] text-white p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">💎</div>
                      <div className="body-small-medium">Band B</div>
                      <div className="data-small">70-84 Score</div>
                      <div className="body-small">Strong Care</div>
                    </div>
                    <div className="bg-[var(--neutral-lilac)] text-white p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🟡</div>
                      <div className="body-small-medium">Band C</div>
                      <div className="data-small">55-69 Score</div>
                      <div className="body-small">Moderate Care</div>
                    </div>
                    <div className="bg-[var(--harm-coral)] text-white p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🔴</div>
                      <div className="body-small-medium">Band D</div>
                      <div className="data-small">40-54 Score</div>
                      <div className="body-small">At Risk</div>
                    </div>
                    <div className="bg-[var(--bg-deep-navy)] text-white p-3 rounded-lg text-center">
                      <div className="text-2xl mb-1">🚨</div>
                      <div className="body-small-medium">Band E</div>
                      <div className="data-small">&lt;40 Score</div>
                      <div className="body-small">Critical</div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Data Validation Rules</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Score Validation</h5>
                      <ul className="body-small space-y-1">
                        <li>• Care/Harm scores: 0-100 integer range</li>
                        <li>• Percentages: 0-100 with 1 decimal precision</li>
                        <li>• Weeks: Non-negative integers</li>
                        <li>• Market cap: Positive numbers in USD</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Data Consistency</h5>
                      <ul className="body-small space-y-1">
                        <li>• All companies must have valid symbols</li>
                        <li>• Sectors from predefined list</li>
                        <li>• Care metrics always present</li>
                        <li>• Story data optional but structured</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Deployment Tab */}
          <TabsContent value="deployment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-[var(--care-emerald)]" />
                  Deployment & Environment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Figma Make Platform</h4>
                  <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                    <p className="body-medium mb-3">
                      This project runs on Figma Make platform with zero external dependencies or API keys required.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="body-medium-medium mb-2">✅ What Works</h5>
                        <ul className="body-small space-y-1">
                          <li>• React 18+ with TypeScript</li>
                          <li>• Tailwind CSS v4 with custom variables</li>
                          <li>• Motion/React animations</li>
                          <li>• Shadcn/UI component library</li>
                          <li>• Local state management</li>
                          <li>• Mock data from /data/companies.ts</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="body-medium-medium mb-2">⚠️ Platform Limitations</h5>
                        <ul className="body-small space-y-1">
                          <li>• No external API calls</li>
                          <li>• No persistent data storage</li>
                          <li>• No server-side functionality</li>
                          <li>• Limited file system access</li>
                          <li>• Can't install additional packages</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Environment Configuration</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h5 className="body-medium-medium">Authentication</h5>
                      <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-3 rounded-lg font-mono text-sm">
                        <pre>{`// Demo credentials (hardcoded)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=123
DOCS_PASSWORD=docs

// In production, use:
// - NextAuth.js or Clerk
// - Environment variables
// - Secure session management`}</pre>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="body-medium-medium">Build Configuration</h5>
                      <div className="bg-[var(--bg-deep-navy)] text-[var(--text-on-navy)] p-3 rounded-lg font-mono text-sm">
                        <pre>{`// Figma Make auto-handles:
// - TypeScript compilation
// - Tailwind CSS processing  
// - Asset optimization
// - Hot reload in development

// Manual optimization needed:
// - Component code splitting
// - Image lazy loading
// - Animation performance`}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">Migration Path (Future)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Phase 1: Extract</h5>
                      <ul className="body-small space-y-1">
                        <li>• Export to Next.js 14+</li>
                        <li>• Migrate to App Router</li>
                        <li>• Add Prisma + PostgreSQL</li>
                        <li>• Implement real authentication</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Phase 2: Scale</h5>
                      <ul className="body-small space-y-1">
                        <li>• Add real S&P 500 API</li>
                        <li>• Implement user portfolios</li>
                        <li>• Add comparison features</li>
                        <li>• Build analytics dashboard</li>
                      </ul>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">Phase 3: Extend</h5>
                      <ul className="body-small space-y-1">
                        <li>• Multi-market support</li>
                        <li>• Advanced filtering</li>
                        <li>• Social features</li>
                        <li>• Mobile app (Expo)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="headline-h2 flex items-center gap-3">
                  <GitBranch className="w-6 h-6 text-[var(--care-emerald)]" />
                  Current Status & Roadmap
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="headline-h3 text-[var(--care-emerald)]">✅ Completed Features</h4>
                    <div className="space-y-3">
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">🎨 Design System</h5>
                        <p className="body-small">Complete Carefolio color palette, typography system, Material 3 components, responsive grid layouts</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">🏠 Landing Experience</h5>
                        <p className="body-small">Hero section, authentication, methodology overview, company previews with proper animations</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">📊 Dashboard Views</h5>
                        <p className="body-small">Card grid dashboard, leaderboard table, spotlight panels, portfolio analytics, filtering systems</p>
                      </div>
                      <div className="bg-[var(--bg-secondary)] p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">🔍 Advanced Features</h5>
                        <p className="body-small">Peer comparison modal, dynamic badge notifications, care band classification, maternal narratives</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="headline-h3 text-[var(--harm-coral)]">🚧 Missing / In Progress</h4>
                    <div className="space-y-3">
                      <div className="bg-[var(--harm-coral)]/10 border border-[var(--harm-coral)]/20 p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">📱 Mobile Optimization</h5>
                        <p className="body-small">Mobile navigation, touch interactions, smaller screen layouts need refinement</p>
                      </div>
                      <div className="bg-[var(--harm-coral)]/10 border border-[var(--harm-coral)]/20 p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">🔧 Advanced Filtering</h5>
                        <p className="body-small">Multi-select filters, saved filter presets, advanced search operators</p>
                      </div>
                      <div className="bg-[var(--harm-coral)]/10 border border-[var(--harm-coral)]/20 p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">📈 Analytics Dashboard</h5>
                        <p className="body-small">Portfolio performance tracking, trend analysis, benchmark comparisons</p>
                      </div>
                      <div className="bg-[var(--harm-coral)]/10 border border-[var(--harm-coral)]/20 p-3 rounded-lg">
                        <h5 className="body-medium-medium mb-1">💾 Data Export</h5>
                        <p className="body-small">CSV/PDF export, shareable portfolio links, print-friendly views</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">🎯 Next Priorities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-[var(--cta-orange)]/10 to-[var(--harm-coral)]/10 p-4 rounded-lg border border-[var(--cta-orange)]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">🚀</span>
                        <h5 className="body-medium-medium">High Priority</h5>
                      </div>
                      <ul className="body-small space-y-1">
                        <li>• Fix mobile navigation</li>
                        <li>• Add loading states</li>
                        <li>• Improve table performance</li>
                        <li>• Add error boundaries</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--care-emerald)]/10 to-[var(--care-vibrant-mint)]/10 p-4 rounded-lg border border-[var(--care-emerald)]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">⭐</span>
                        <h5 className="body-medium-medium">Medium Priority</h5>
                      </div>
                      <ul className="body-small space-y-1">
                        <li>• Enhanced search functionality</li>
                        <li>• Company detail modals</li>
                        <li>• Accessibility improvements</li>
                        <li>• Animation optimizations</li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-[var(--neutral-lilac)]/10 to-[var(--neutral-blush)]/10 p-4 rounded-lg border border-[var(--neutral-lilac)]/20">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">💡</span>
                        <h5 className="body-medium-medium">Future Ideas</h5>
                      </div>
                      <ul className="body-small space-y-1">
                        <li>• AI-powered insights</li>
                        <li>• Social sharing features</li>
                        <li>• Custom dashboards</li>
                        <li>• Real-time data integration</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="headline-h3 text-[var(--care-emerald)]">🏥 Emergency Protocols</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">🚨 When Everything Breaks</h5>
                      <ol className="body-small space-y-1 list-decimal list-inside">
                        <li>Check browser console for errors</li>
                        <li>Verify all imports are correct</li>
                        <li>Check CSS variable definitions in globals.css</li>
                        <li>Test with simple component first</li>
                        <li>Revert to last working state if needed</li>
                      </ol>
                    </div>
                    <div className="bg-[var(--bg-secondary)] p-4 rounded-lg">
                      <h5 className="body-medium-medium mb-2">🔧 Common Issues & Fixes</h5>
                      <ul className="body-small space-y-1">
                        <li>• <strong>Cards not rendering:</strong> Check company data structure</li>
                        <li>• <strong>Colors not showing:</strong> Verify CSS variable format</li>
                        <li>• <strong>Animations janky:</strong> Reduce Motion complexity</li>
                        <li>• <strong>Layout broken:</strong> Check grid/flex properties</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[var(--care-emerald)]/10 to-[var(--care-vibrant-mint)]/10 p-6 rounded-lg border border-[var(--care-emerald)]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle className="w-6 h-6 text-[var(--care-emerald)]" />
                    <h4 className="headline-h3">Project Health Status</h4>
                  </div>
                  <p className="body-large mb-4">
                    <strong>🟢 HEALTHY</strong> — Core functionality complete, design system stable, ready for feature expansion.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Design System: Complete</Badge>
                    <Badge variant="secondary">Authentication: Working</Badge>
                    <Badge variant="secondary">Data Flow: Stable</Badge>
                    <Badge variant="secondary">UI Components: Production Ready</Badge>
                    <Badge variant="secondary">Mobile: Needs Work</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-8 mt-12 border-t border-[var(--outline-variant)]">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-6 text-sm text-[var(--text-secondary)]">
            <span>Made by <a href="https://luana.systems" target="_blank" rel="noopener noreferrer" className="text-[var(--care-emerald)] hover:text-[var(--care-vibrant-mint)] transition-colors">luana.systems</a></span>
            <span>•</span>
            <span>Powered by <a href="https://momops.org" target="_blank" rel="noopener noreferrer" className="text-[var(--care-emerald)] hover:text-[var(--care-vibrant-mint)] transition-colors">MomOps</a></span>
            <span>•</span>
            <span>Research by <a href="https://femhealth.science" target="_blank" rel="noopener noreferrer" className="text-[var(--care-emerald)] hover:text-[var(--care-vibrant-mint)] transition-colors">FemHealth</a></span>
          </div>
          <div className="text-xs text-[var(--text-secondary)]/70">
            Tech Documentation v2.1 • Last Updated: Dec 24, 2024
          </div>
        </div>
      </footer>
    </div>
  );
}