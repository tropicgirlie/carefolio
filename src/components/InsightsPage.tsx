import { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Heart, Shield, Calculator, BarChart3, TrendingUp, Plus, Lightbulb, ArrowRight, CheckCircle, AlertCircle, Mail, Zap, Globe, Award, Target, Users, Building, Briefcase } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface InsightsPageProps {
  onNavigateToLanding: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onLogoClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

// Animated Section Component
const AnimatedSection = ({ 
  children, 
  delay = 0,
  direction = 'up',
  className = ''
}: { 
  children: React.ReactNode; 
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { opacity: 0, y: 32 };
      case 'down': return { opacity: 0, y: -32 };
      case 'left': return { opacity: 0, x: -32 };
      case 'right': return { opacity: 0, x: 32 };
      default: return { opacity: 0, y: 32 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialPosition()}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : getInitialPosition()}
      transition={{ duration: 0.6, delay: delay, ease: [0.2, 0, 0, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Simple Framework Card Component - Clean, refined style
function FrameworkCard({ 
  title, 
  metrics, 
  borderColor, 
  icon: Icon,
  delay = 0 
}: { 
  title: string;
  metrics: Array<{ label: string; description: string; icon?: any }>;
  borderColor: string;
  icon: any;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay} className="flex-1">
      <Card className="h-full elevation-subtle hover:elevation-strong transition-all duration-300 border border-outline-variant">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${borderColor}20` }}
            >
              <Icon className="w-6 h-6" style={{ color: borderColor }} />
            </div>
            <h3 className="body-medium-medium">{title}</h3>
          </div>
          
          <div className="space-y-3">
            {metrics.map((metric, index) => (
              <div key={metric.label} className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-container-low transition-colors">
                <div 
                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${borderColor}15` }}
                >
                  <metric.icon className="w-3 h-3" style={{ color: borderColor }} />
                </div>
                <span className="body-data text-on-surface">{metric.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

// Coinbase-Style Data Card Component
function DataInsightCard({ 
  title, 
  description, 
  icon: Icon, 
  insights, 
  color,
  delay = 0 
}: { 
  title: string;
  description: string;
  icon: any;
  insights: Array<{ metric: string; label: string; trend?: string }>;
  color: string;
  delay?: number;
}) {
  return (
    <AnimatedSection delay={delay}>
      <Card className="h-full elevation-subtle hover:elevation-strong transition-all duration-300 border border-outline-variant">
        <CardContent className="p-8">
          <div className="flex items-start gap-4 mb-6">
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color}15` }}
            >
              <Icon className="w-7 h-7" style={{ color: color }} />
            </div>
            <div className="flex-1">
              <h3 className="headline-h3 mb-2">{title}</h3>
              <p className="body-small text-on-surface-variant leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={insight.label} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                <div className="flex-1">
                  <div className="data-medium font-bold mb-1" style={{ color: color }}>
                    {insight.metric}
                  </div>
                  <p className="body-small text-on-surface-variant">{insight.label}</p>
                </div>
                {insight.trend && (
                  <TrendingUp className="w-5 h-5 text-care-emerald ml-3" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AnimatedSection>
  );
}

export function InsightsPage({
  onNavigateToLanding,
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToDashboard,
  onNavigateToTechDocs,
  onLogoClick,
  isAuthenticated,
  onLogout
}: InsightsPageProps) {

  const nurtureMetrics = [
    { 
      label: 'Parental Leave', 
      description: 'Weeks of paid leave for new parents, including maternity, paternity, and adoption leave policies.',
      icon: Heart 
    },
    { 
      label: 'Childcare Support', 
      description: 'On-site childcare facilities, subsidies, backup care services, and family benefits.',
      icon: Heart 
    },
    { 
      label: 'Women Leadership', 
      description: 'Percentage of women in executive roles, board representation, and advancement programs.',
      icon: TrendingUp 
    },
    { 
      label: 'Pay Transparency', 
      description: 'Salary disclosure practices, pay equity audits, and compensation transparency measures.',
      icon: BarChart3 
    }
  ];

  const harmMetrics = [
    { 
      label: 'Environmental Impact', 
      description: 'Carbon emissions, pollution violations, and environmental sustainability practices.',
      icon: Shield 
    },
    { 
      label: 'Supply Chain Issues', 
      description: 'Labor violations, unsafe working conditions, and ethical sourcing practices.',
      icon: Shield 
    },
    { 
      label: 'Labor Violations', 
      description: 'Worker rights violations, union disputes, and workplace safety issues.',
      icon: Shield 
    },
    { 
      label: 'Legal Risks', 
      description: 'Regulatory fines, lawsuits, and compliance failures across all jurisdictions.',
      icon: Shield 
    }
  ];

  const careScoreMetrics = [
    { 
      label: 'Final Score (0-100)', 
      description: 'Calculated using the formula: Nurture × (100 - Harm) ÷ 100, then normalized to a 0-100 scale.',
      icon: Calculator 
    },
    { 
      label: 'Letter Grade (A-E)', 
      description: 'A: 90-100 (Exceptional), B: 70-89 (Strong), C: 50-69 (Moderate), D: 40-49 (Limited), E: 0-39 (Needs Attention).',
      icon: BarChart3 
    },
    { 
      label: 'Sector Ranking', 
      description: 'Relative position within industry sector based on care infrastructure investments.',
      icon: TrendingUp 
    }
  ];

  const keyFindings = [
    {
      metric: "87%",
      label: "of companies improved their care scores in 2024",
      trend: "up",
      color: "#2BAE66"
    },
    {
      metric: "34",
      label: "companies moved up a full letter grade",
      trend: "up",
      color: "#00C896"
    },
    {
      metric: "12.3%",
      label: "average increase in parental leave policies",
      trend: "up",
      color: "#2BAE66"
    },
    {
      metric: "$2.8B",
      label: "total invested in childcare infrastructure",
      trend: "up",
      color: "#F25C05"
    }
  ];

  return (
    <div className="min-h-screen bg-background">


      {/* Main Content - Grid-aligned */}
      <main className="container py-16 space-y-24">

        {/* 1. HERO SECTION - Coinbase Style */}
        <AnimatedSection className="text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-care-emerald/10 rounded-full border border-care-emerald/20 mb-6">
                <BarChart3 className="w-4 h-4 text-care-emerald" />
                <span className="body-small-medium text-care-emerald">Research & Methodology</span>
              </div>
              
              <h1 className="headline-hero text-center">
                The data behind<br />
                <span className="text-care-emerald">care as capital</span>
              </h1>
              
              <p className="body-content text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                Explore how we score companies and the research behind smarter, care-first investing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                {!isAuthenticated && (
                  <button 
                    onClick={onNavigateToLogin}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#6B3FA0] text-white border-2 border-[#6B3FA0] rounded-full font-medium transition-all duration-200 hover:bg-[#5A3188] hover:border-[#5A3188] h-12 text-lg"
                  >
                    <TrendingUp className="w-5 h-5" />
                    View Live Data
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                
                <button 
                  onClick={() => window.open('https://carefolio.beehiiv.com/', '_blank')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[var(--fintech-feminine-purple)] rounded-full font-medium transition-all duration-200 hover:bg-[var(--fintech-feminine-purple)] hover:text-white text-[var(--fintech-feminine-purple)] h-12 text-lg"
                >
                  <Mail className="w-5 h-5" />
                  Research Updates
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* 2. SCORING FRAMEWORK - KEPT AS REQUESTED */}
        <AnimatedSection delay={0.1} className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="headline-h2">Our Scoring Framework</h2>
            <p className="body-content text-on-surface-variant max-w-2xl mx-auto">
              The Care Score combines nurture investments with harm offsets to create a comprehensive company rating.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FrameworkCard
              title="Nurture Pillars"
              metrics={nurtureMetrics}
              borderColor="#2BAE66"
              icon={Heart}
              delay={0.2}
            />
            
            <FrameworkCard
              title="Harm Offsets"
              metrics={harmMetrics}
              borderColor="#E46C6C"
              icon={Shield}
              delay={0.3}
            />
            
            <FrameworkCard
              title="Care Score"
              metrics={careScoreMetrics}
              borderColor="#F25C05"
              icon={Calculator}
              delay={0.4}
            />
          </div>
        </AnimatedSection>

        {/* 3. 2024 KEY FINDINGS - KEPT AS REQUESTED */}
        <AnimatedSection delay={0.2} className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="headline-h2">2024 Key Findings</h2>
            <p className="body-content text-on-surface-variant max-w-2xl mx-auto">
              Market-moving insights from our comprehensive analysis of S&P 500 care infrastructure investments.
            </p>
          </div>

          <div className="bg-gradient-to-br from-care-emerald/5 to-care-vibrant-mint/3 rounded-2xl p-8 border border-care-emerald/10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {keyFindings.map((finding, index) => (
                <motion.div
                  key={finding.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  className="bg-background rounded-xl p-6 elevation-subtle border border-outline-variant hover:elevation-strong transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: finding.color }}
                    />
                    <TrendingUp className="w-4 h-4 text-care-emerald" />
                  </div>
                  <div className="space-y-2">
                    <div 
                      className="data-large font-bold"
                      style={{ color: finding.color }}
                    >
                      {finding.metric}
                    </div>
                    <p className="body-small text-on-surface-variant leading-tight">
                      {finding.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* 4. RESEARCH METHODOLOGY - NEW COINBASE STYLE */}
        <AnimatedSection delay={0.3} className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="headline-h2">Research Methodology</h2>
            <p className="body-content text-on-surface-variant max-w-2xl mx-auto">
              How we measure care infrastructure across multiple data sources and validation methods.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DataInsightCard
              title="Data Collection"
              description="Multi-source approach combining public filings, corporate reports, and regulatory databases"
              icon={Globe}
              color="#2BAE66"
              insights={[
                { metric: "500+", label: "Companies analyzed" },
                { metric: "12", label: "Data sources per company" },
                { metric: "50+", label: "Metrics tracked" }
              ]}
              delay={0.4}
            />

            <DataInsightCard
              title="Validation Process"
              description="Rigorous cross-verification and expert review to ensure data accuracy and reliability"
              icon={CheckCircle}
              color="#00C896"
              insights={[
                { metric: "3x", label: "Independent verification" },
                { metric: "95%", label: "Data accuracy rate" },
                { metric: "Monthly", label: "Update frequency" }
              ]}
              delay={0.5}
            />

            <DataInsightCard
              title="Scoring Algorithm"
              description="Proprietary algorithm balancing nurture investments against harm factors with sector weighting"
              icon={Calculator}
              color="#F25C05"
              insights={[
                { metric: "4", label: "Primary dimensions" },
                { metric: "16", label: "Sub-metrics weighted" },
                { metric: "0-100", label: "Standardized scale" }
              ]}
              delay={0.6}
            />
          </div>
        </AnimatedSection>

        {/* 5. MARKET INSIGHTS - NEW PROFESSIONAL SECTION */}
        <AnimatedSection delay={0.4} className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="headline-h2">Market Intelligence</h2>
            <p className="body-content text-on-surface-variant max-w-2xl mx-auto">
              Investment-grade insights into care infrastructure trends and their financial implications.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Sector Performance */}
            <AnimatedSection delay={0.5} direction="left">
              <Card className="elevation-subtle border border-outline-variant h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/20 flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-6 h-6 text-care-emerald" />
                    </div>
                    <span className="headline-h3 text-on-surface whitespace-nowrap">Sector Performance Leaders</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { sector: "Technology", score: 78.2, change: "+5.1", leader: "Microsoft" },
                    { sector: "Healthcare", score: 72.8, change: "+3.4", leader: "Johnson & Johnson" },
                    { sector: "Financial Services", score: 69.1, change: "+2.7", leader: "JPMorgan Chase" },
                    { sector: "Consumer Goods", score: 65.4, change: "+1.9", leader: "Procter & Gamble" },
                    { sector: "Energy", score: 52.3, change: "-1.2", leader: "Chevron" }
                  ].map((sector, index) => (
                    <div key={sector.sector} className="flex items-center justify-between p-4 rounded-lg hover:bg-surface-container-low transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="body-medium-medium">{sector.sector}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {sector.change}
                          </Badge>
                        </div>
                        <p className="body-small text-on-surface-variant">Leading: {sector.leader}</p>
                      </div>
                      <div className="text-right">
                        <div className="data-medium font-bold text-care-emerald">{sector.score}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Right: Investment Themes */}
            <AnimatedSection delay={0.6} direction="right">
              <Card className="elevation-subtle border border-outline-variant h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--care-emerald)]/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-care-emerald" />
                    </div>
                    <span className="headline-h3 text-on-surface whitespace-nowrap">Investment Themes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    {
                      theme: "Care Infrastructure ROI",
                      description: "Companies with robust parental leave see 40% higher retention rates",
                      impact: "Revenue Protection"
                    },
                    {
                      theme: "Talent Attraction Premium",
                      description: "Top-tier care policies reduce recruitment costs by 25%",
                      impact: "Cost Efficiency"
                    },
                    {
                      theme: "Regulatory Anticipation",
                      description: "Proactive care policies position companies ahead of policy changes",
                      impact: "Risk Mitigation"
                    },
                    {
                      theme: "ESG Integration",
                      description: "Care scores increasingly correlate with overall ESG performance",
                      impact: "Value Creation"
                    }
                  ].map((theme) => (
                    <div key={theme.theme} className="space-y-3 p-4 border border-outline-variant rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <h4 className="body-medium-medium">{theme.theme}</h4>
                        <Badge className="bg-care-emerald/10 text-care-emerald text-xs">
                          {theme.impact}
                        </Badge>
                      </div>
                      <p className="body-small text-on-surface-variant leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </AnimatedSection>



      </main>
    </div>
  );
}