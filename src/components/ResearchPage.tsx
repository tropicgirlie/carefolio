import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, BookOpen, Database, Building2, Users, TrendingUp, ExternalLink, Eye, Star, Brain, Heart, Shield, BarChart3, Globe, Leaf, FileText, Link as LinkIcon, AlertCircle, CheckCircle, ArrowLeft, Mail, Lock, Loader2, Plus, Minus, Equal, Baby, Briefcase, Factory, Truck, AlertTriangle } from 'lucide-react';
import { TopNavigation } from './TopNavigation';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ResearchPageProps {
  onNavigateToLanding: () => void;
  onNavigateToMethodology: () => void;
  onNavigateToResearch: () => void;
  onNavigateToAbout: () => void;
  onNavigateToLogin: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onLogoClick: () => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

export function ResearchPage({
  onNavigateToLanding,
  onNavigateToMethodology,
  onNavigateToResearch,
  onNavigateToAbout,
  onNavigateToLogin,
  onNavigateToDashboard,
  onNavigateToTechDocs,
  onLogoClick,
  isAuthenticated,
  onLogout
}: ResearchPageProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const heroRef = useRef(null);
  const formulaRef = useRef(null);
  const papersRef = useRef(null);
  const sourcesRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isFormulaInView = useInView(formulaRef, { once: true, margin: "-100px" });
  const isPapersInView = useInView(papersRef, { once: true, margin: "-100px" });
  const isSourcesInView = useInView(sourcesRef, { once: true, margin: "-100px" });

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <TopNavigation
        currentPage="research"
        onNavigateToLanding={onNavigateToLanding}
        onNavigateToMethodology={onNavigateToMethodology}
        onNavigateToResearch={onNavigateToResearch}
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToLogin={onNavigateToLogin}
        onNavigateToDashboard={onNavigateToDashboard}
        onLogoClick={onLogoClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />

      {/* Main Content */}
      <main className="container py-16 space-y-24">
        
        {/* 1. HERO SECTION */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <div className="bg-gradient-to-br from-care-emerald/10 to-care-vibrant-mint/5 rounded-3xl p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-8 right-8 w-20 h-20 border-2 border-care-emerald rounded-full"></div>
              <div className="absolute bottom-8 left-8 w-16 h-16 border-2 border-care-vibrant-mint rounded-full"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              >
                <h1 className="headline-h1 mb-6">
                  Research & Methodology
                </h1>
                <p className="body-large text-on-surface-variant max-w-3xl mx-auto">
                  Academic foundations and data sources behind our care investment analysis framework.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. CARE SCORE FORMULA - ENHANCED INTERACTIVE DESIGN */}
        <motion.div
          ref={formulaRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isFormulaInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="headline-h2">The Care Score Formula</h2>
            <p className="body-large text-on-surface-variant max-w-2xl mx-auto">
              A comprehensive methodology measuring care as capital
            </p>
          </div>

          <Card className="bg-gradient-to-br from-surface to-surface-container-low border-0 rounded-3xl overflow-hidden elevation-strong">
            <CardContent className="p-0">
              {/* Formula Header */}
              <div className="bg-gradient-to-r from-care-emerald to-care-vibrant-mint p-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFormulaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-white"
                >
                  <div className="data-large font-mono text-3xl mb-4 font-bold">
                    CareScore = Nurture × (100 – Harm)
                  </div>
                  <p className="body-medium opacity-90">
                    Where scores are normalized to 0-100 scale
                  </p>
                </motion.div>
              </div>

              {/* Interactive Formula Breakdown */}
              <div className="p-8">
                <div className="grid lg:grid-cols-7 gap-6 items-center">
                  
                  {/* Nurture Pillars - Enhanced */}
                  <motion.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isFormulaInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    onHoverStart={() => setHoveredCard('nurture')}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card className={`h-full transition-all duration-300 ${
                      hoveredCard === 'nurture' 
                        ? 'elevation-strong scale-105 border-care-emerald' 
                        : 'elevation-subtle border-care-emerald/20'
                    } bg-gradient-to-br from-care-emerald/5 to-care-emerald/10`}>
                      <CardContent className="p-6 text-center space-y-6 flex flex-col h-full">
                        {/* Icon with Animation */}
                        <motion.div 
                          className="w-20 h-20 bg-gradient-to-br from-care-emerald to-care-vibrant-mint rounded-2xl flex items-center justify-center mx-auto"
                          animate={hoveredCard === 'nurture' ? { rotate: [0, -5, 5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Heart className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="headline-h3 mb-4 text-care-emerald">Nurture Pillars</h3>
                          <p className="body-small text-on-surface-variant mb-6">
                            Comprehensive care infrastructure investments
                          </p>
                          
                          {/* Visual Metrics */}
                          <div className="space-y-4">
                            {[
                              { icon: Baby, label: 'Parental Leave', weight: '30%', color: '#2BAE66' },
                              { icon: Users, label: 'Childcare Support', weight: '25%', color: '#00C896' },
                              { icon: Briefcase, label: 'Women Leadership', weight: '25%', color: '#009688' },
                              { icon: Heart, label: 'Health Benefits', weight: '20%', color: '#2BAE66' }
                            ].map((pillar, index) => {
                              const Icon = pillar.icon;
                              return (
                                <motion.div
                                  key={pillar.label}
                                  className="flex items-center gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={isFormulaInView ? { opacity: 1, y: 0 } : {}}
                                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                                >
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${pillar.color}20` }}
                                  >
                                    <Icon className="w-4 h-4" style={{ color: pillar.color }} />
                                  </div>
                                  <div className="flex-1 text-left">
                                    <div className="body-small font-medium text-on-surface">{pillar.label}</div>
                                    <div className="data-small text-care-emerald">{pillar.weight}</div>
                                  </div>
                                  {/* Progress indicator */}
                                  <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: pillar.color }}
                                      initial={{ width: 0 }}
                                      animate={isFormulaInView ? { width: pillar.weight } : {}}
                                      transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Mathematical Operators - Enhanced */}
                  <motion.div
                    className="lg:col-span-1 text-center space-y-8"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isFormulaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    {/* Multiplication */}
                    <motion.div
                      className="relative"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-care-emerald to-care-vibrant-mint rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-white font-bold text-2xl">×</span>
                      </div>
                    </motion.div>
                    
                    {/* Subtraction */}
                    <motion.div
                      className="relative"
                      animate={{ rotate: [360, 0] }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-harm-coral to-harm-rose rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <span className="text-white font-bold text-2xl">−</span>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Harm Offsets - Enhanced */}
                  <motion.div
                    className="lg:col-span-3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={isFormulaInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    onHoverStart={() => setHoveredCard('harm')}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <Card className={`h-full transition-all duration-300 ${
                      hoveredCard === 'harm' 
                        ? 'elevation-strong scale-105 border-harm-coral' 
                        : 'elevation-subtle border-harm-coral/20'
                    } bg-gradient-to-br from-harm-coral/5 to-harm-coral/10`}>
                      <CardContent className="p-6 text-center space-y-6 flex flex-col h-full">
                        {/* Icon with Animation */}
                        <motion.div 
                          className="w-20 h-20 bg-gradient-to-br from-harm-coral to-harm-rose rounded-2xl flex items-center justify-center mx-auto"
                          animate={hoveredCard === 'harm' ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          <Shield className="w-10 h-10 text-white" />
                        </motion.div>
                        
                        <div className="flex-1">
                          <h3 className="headline-h3 mb-4 text-harm-coral">Harm Offsets</h3>
                          <p className="body-small text-on-surface-variant mb-6">
                            Corporate harm that reduces overall care impact
                          </p>
                          
                          {/* Visual Metrics */}
                          <div className="space-y-4">
                            {[
                              { icon: Factory, label: 'Environmental Impact', severity: 'High', color: '#E46C6C' },
                              { icon: Truck, label: 'Supply Chain Issues', severity: 'High', color: '#C94D6A' },
                              { icon: AlertTriangle, label: 'Regulatory Violations', severity: 'Medium', color: '#E46C6C' }
                            ].map((harm, index) => {
                              const Icon = harm.icon;
                              return (
                                <motion.div
                                  key={harm.label}
                                  className="flex items-center gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={isFormulaInView ? { opacity: 1, y: 0 } : {}}
                                  transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                                >
                                  <div 
                                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${harm.color}20` }}
                                  >
                                    <Icon className="w-4 h-4" style={{ color: harm.color }} />
                                  </div>
                                  <div className="flex-1 text-left">
                                    <div className="body-small font-medium text-on-surface">{harm.label}</div>
                                    <div className="data-small text-harm-coral">Impact: {harm.severity}</div>
                                  </div>
                                  {/* Severity indicator */}
                                  <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      className="h-full rounded-full"
                                      style={{ backgroundColor: harm.color }}
                                      initial={{ width: 0 }}
                                      animate={isFormulaInView ? { 
                                        width: harm.severity === 'High' ? '80%' : '60%' 
                                      } : {}}
                                      transition={{ duration: 1, delay: 1 + (index * 0.1) }}
                                    />
                                  </div>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Equals and Result - Enhanced */}
                <motion.div
                  className="text-center mt-12 pt-8 border-t border-outline-variant"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isFormulaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  {/* Animated Equals */}
                  <motion.div
                    className="mb-8"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-cta-orange to-cta-orange-light rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Equal className="w-10 h-10 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Result Card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isFormulaInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    <Card className="bg-gradient-to-r from-cta-orange/10 to-cta-orange-light/10 border-cta-orange/30 inline-block elevation-strong">
                      <CardContent className="p-8 text-center">
                        <motion.div
                          animate={{ rotateY: [0, 360] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-16 h-16 bg-gradient-to-br from-cta-orange to-cta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-4"
                        >
                          <BarChart3 className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="headline-h3 text-cta-orange mb-2">Care Score</h3>
                        <p className="body-medium text-on-surface-variant mb-4">
                          Comprehensive care investment rating
                        </p>
                        <div className="flex items-center justify-center gap-4">
                          <div className="text-center">
                            <div className="data-large text-cta-orange font-bold">0-100</div>
                            <div className="data-small text-on-surface-variant">Scale</div>
                          </div>
                          <div className="w-px h-8 bg-outline-variant"></div>
                          <div className="text-center">
                            <div className="data-large text-cta-orange font-bold">A-E</div>
                            <div className="data-small text-on-surface-variant">Bands</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Call to Action */}
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0 }}
                    animate={isFormulaInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 1.8 }}
                  >
                    <Button 
                      onClick={onNavigateToMethodology}
                      className="md3-btn-outlined gap-2 hover:scale-105 transition-transform"
                    >
                      <BookOpen className="w-4 h-4" />
                      Read Full Methodology
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* 3. RESEARCH PAPERS SECTION */}
        <motion.div
          ref={papersRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isPapersInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="headline-h2">Academic Research</h2>
            <p className="body-large text-on-surface-variant max-w-2xl mx-auto">
              Our methodology builds on extensive academic research in care economics and sustainable business practices.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Care Economics and Business Performance",
                authors: "Dr. Sarah Chen, Harvard Business Review",
                year: "2023",
                summary: "Comprehensive analysis of how care investments correlate with long-term financial performance across S&P 500 companies.",
                link: "#",
                category: "Primary Research",
                impact: "High"
              },
              {
                title: "Maternal Capital Theory",
                authors: "Prof. Maria Rodriguez, Stanford Economics",
                year: "2022", 
                summary: "Theoretical framework for understanding maternal wisdom in investment decision-making and its systemic impacts.",
                link: "#",
                category: "Economic Theory",
                impact: "High"
              },
              {
                title: "ESG and Care Infrastructure",
                authors: "Dr. James Wilson, MIT Sloan",
                year: "2023",
                summary: "Analysis of Environmental, Social, and Governance factors with specific focus on care-related metrics and outcomes.",
                link: "#",
                category: "ESG Analysis",
                impact: "Medium"
              },
              {
                title: "Women Leadership and Company Resilience",
                authors: "Dr. Lisa Park, Wharton School",
                year: "2022",
                summary: "Statistical analysis of correlation between women in leadership positions and company resilience during economic downturns.",
                link: "#",
                category: "Leadership Studies",
                impact: "High"
              },
              {
                title: "Parental Leave Policies and Innovation",
                authors: "Dr. Ahmad Hassan, London Business School",
                year: "2023",
                summary: "Study examining the relationship between comprehensive parental leave policies and company innovation metrics.",
                link: "#",
                category: "Policy Research",
                impact: "Medium"
              },
              {
                title: "Childcare Support and Employee Retention",
                authors: "Dr. Rachel Green, UC Berkeley",
                year: "2022",
                summary: "Research on how childcare benefits impact employee satisfaction, retention, and overall company performance.",
                link: "#",
                category: "HR Research",
                impact: "Medium"
              }
            ].map((paper, index) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isPapersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              >
                <Card className="h-full hover:elevation-strong transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant={paper.impact === 'High' ? 'default' : 'secondary'} className="mb-2">
                        {paper.category}
                      </Badge>
                      <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-care-emerald transition-colors" />
                    </div>
                    <CardTitle className="headline-h3 group-hover:text-care-emerald transition-colors">
                      {paper.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <p className="body-small text-on-surface-variant">{paper.authors}</p>
                        <p className="data-small text-care-emerald">{paper.year}</p>
                      </div>
                      <p className="body-small text-on-surface">{paper.summary}</p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-care-emerald rounded-full"></div>
                        <span className="data-small text-care-emerald">Impact: {paper.impact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 4. DATA SOURCES SECTION */}
        <motion.div
          ref={sourcesRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isSourcesInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-12"
        >
          <div className="text-center space-y-4">
            <h2 className="headline-h2">Data Sources</h2>
            <p className="body-large text-on-surface-variant max-w-2xl mx-auto">
              Our analysis draws from multiple authoritative sources to ensure comprehensive and accurate assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                category: "Financial Data",
                icon: TrendingUp,
                sources: [
                  "SEC 10-K and 10-Q filings",
                  "Bloomberg Terminal",
                  "Yahoo Finance API",
                  "Company annual reports"
                ],
                color: "care-emerald"
              },
              {
                category: "Care Metrics",
                icon: Heart,
                sources: [
                  "Company HR policies",
                  "Glassdoor employee reviews",
                  "LinkedIn diversity data",
                  "Industry surveys"
                ],
                color: "care-vibrant-mint"
              },
              {
                category: "ESG Data",
                icon: Leaf,
                sources: [
                  "MSCI ESG ratings",
                  "Sustainalytics scores",
                  "CDP environmental data",
                  "B Corp assessments"
                ],
                color: "neutral-lilac"
              },
              {
                category: "Regulatory Data",
                icon: Shield,
                sources: [
                  "EPA violation records",
                  "OSHA safety reports",
                  "SEC enforcement actions",
                  "FTC compliance data"
                ],
                color: "harm-coral"
              }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={isSourcesInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + (index * 0.1) }}
                >
                  <Card className="h-full hover:elevation-strong transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-${category.color}/10 rounded-xl flex items-center justify-center`}>
                          <Icon className={`w-6 h-6 text-${category.color}`} />
                        </div>
                        <CardTitle className="headline-h3">{category.category}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {category.sources.map((source, sourceIndex) => (
                          <motion.div
                            key={source}
                            className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors"
                            initial={{ opacity: 0, y: 10 }}
                            animate={isSourcesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) + (sourceIndex * 0.05) }}
                          >
                            <div className={`w-2 h-2 bg-${category.color} rounded-full flex-shrink-0`}></div>
                            <span className="body-small text-on-surface">{source}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 5. CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-bg-deep-navy to-bg-navy-medium text-text-on-navy rounded-2xl p-12 elevation-3">
            <h2 className="headline-h2 text-text-on-navy mb-4">
              Explore the Methodology
            </h2>
            <p className="body-large text-text-on-navy-secondary mb-8 max-w-2xl mx-auto">
              Dive deeper into our research methodology and see how we calculate care scores for every S&P 500 company.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onNavigateToMethodology}
                className="md3-btn-filled bg-cta-orange hover:bg-cta-orange-light gap-3 px-8 py-4 text-lg"
              >
                <BookOpen className="w-5 h-5" />
                Read Methodology
              </Button>
              {isAuthenticated && (
                <Button 
                  onClick={onNavigateToDashboard}
                  className="md3-btn-outlined gap-3 px-8 py-4 text-lg border-text-on-navy text-text-on-navy hover:bg-text-on-navy hover:text-bg-deep-navy"
                >
                  <BarChart3 className="w-5 h-5" />
                  View Dashboard
                </Button>
              )}
            </div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}