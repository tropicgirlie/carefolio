import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Heart, Shield, Users, Building, Factory, Truck, AlertTriangle, Award, Star, TrendingUp, Baby, Briefcase, BarChart3, Lock, Mail, Loader2, Plus, Minus, Equal, Play, Calculator, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';
import { TopNavigation } from './TopNavigation';

interface MethodologyPageProps {
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

// Accordion Section Component
function AccordionSection({ 
  title, 
  children, 
  defaultOpen = false,
  icon 
}: { 
  title: string; 
  children: React.ReactNode; 
  defaultOpen?: boolean;
  icon: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-outline-variant rounded-xl overflow-hidden elevation-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 bg-surface-container hover:bg-surface-container-high transition-colors duration-200 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-care-emerald/10 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h3 className="headline-h3 text-on-surface">{title}</h3>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-on-surface-variant" />
        ) : (
          <ChevronDown className="w-5 h-5 text-on-surface-variant" />
        )}
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="overflow-hidden"
        >
          <div className="p-6 bg-surface">
            {children}
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Enhanced Interactive Formula Component
function InteractiveFormulaSection() {
  const [activeComponent, setActiveComponent] = useState<'nurture' | 'harm' | 'result' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCalculation, setShowCalculation] = useState(false);

  // Sample calculation values for demonstration
  const [nurtureScore] = useState(85);
  const [harmScore] = useState(15);
  const finalScore = Math.round(nurtureScore * (100 - harmScore) / 100);

  const handlePlayAnimation = () => {
    setIsAnimating(true);
    setShowCalculation(true);
    
    // Reset after animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 3000);
  };

  const nurtureMetrics = [
    { icon: Baby, label: 'Parental Leave', weight: 30, value: 90, color: '#2BAE66' },
    { icon: Users, label: 'Childcare Support', weight: 25, value: 85, color: '#00C896' },
    { icon: Briefcase, label: 'Women Leadership', weight: 25, value: 80, color: '#009688' },
    { icon: Heart, label: 'Health Benefits', weight: 20, value: 85, color: '#2BAE66' }
  ];

  const harmMetrics = [
    { icon: Factory, label: 'Environmental Impact', severity: 'Low', value: 20, color: '#E46C6C' },
    { icon: Truck, label: 'Supply Chain Issues', severity: 'Low', value: 10, color: '#C94D6A' },
    { icon: AlertTriangle, label: 'Regulatory Violations', severity: 'None', value: 5, color: '#E46C6C' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-12"
    >
      <div className="text-center space-y-4">
        <h2 className="headline-h2">The Care Score Formula</h2>
        <p className="body-large text-on-surface-variant max-w-2xl mx-auto">
          An interactive breakdown of how we measure care as capital
        </p>
      </div>

      {/* Enhanced Formula Container */}
      <div className="bg-gradient-to-br from-surface to-surface-container-low rounded-3xl overflow-hidden elevation-strong border border-outline-variant">
        
        {/* Formula Header with Animation Control */}
        <div className="bg-gradient-to-r from-care-emerald to-care-vibrant-mint p-8 text-center relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white relative z-10"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <h3 className="data-large text-3xl font-bold font-mono">
                CareScore = Nurture × (100 – Harm)
              </h3>
              <Button
                onClick={handlePlayAnimation}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 rounded-full p-3"
                disabled={isAnimating}
              >
                {isAnimating ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </Button>
            </div>
            <p className="body-medium opacity-90">
              Where scores are normalized to 0-100 scale
            </p>
          </motion.div>
          
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-8 w-16 h-16 border-2 border-white rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-4 left-8 w-12 h-12 border-2 border-white rounded-full"
            />
          </div>
        </div>

        {/* Interactive Formula Breakdown */}
        <div className="p-8">
          <div className="grid lg:grid-cols-7 gap-8 items-center">
            
            {/* Nurture Component */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onHoverStart={() => setActiveComponent('nurture')}
              onHoverEnd={() => setActiveComponent(null)}
            >
              <div className={`h-full transition-all duration-300 rounded-2xl p-6 ${
                activeComponent === 'nurture' 
                  ? 'elevation-strong scale-105 bg-gradient-to-br from-care-emerald/10 to-care-emerald/5 border-2 border-care-emerald' 
                  : 'elevation-subtle bg-gradient-to-br from-care-emerald/5 to-transparent border border-care-emerald/20'
              }`}>
                
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      activeComponent === 'nurture' ? 'bg-gradient-to-br from-care-emerald to-care-vibrant-mint' : 'bg-gradient-to-br from-care-emerald/20 to-care-vibrant-mint/20'
                    }`}
                    animate={activeComponent === 'nurture' ? { rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Heart className={`w-10 h-10 ${activeComponent === 'nurture' ? 'text-white' : 'text-care-emerald'}`} />
                  </motion.div>
                  <h3 className="headline-h3 text-care-emerald mb-2">Nurture Pillars</h3>
                  <p className="body-small text-on-surface-variant">
                    Care infrastructure investments
                  </p>
                </div>

                {/* Metrics with Visual Progress */}
                <div className="space-y-4">
                  {nurtureMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${metric.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: metric.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="body-small font-medium text-on-surface">{metric.label}</span>
                            <span className="data-small text-care-emerald font-bold">{metric.weight}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: metric.color }}
                                initial={{ width: 0 }}
                                animate={{ width: isAnimating ? `${metric.value}%` : '0%' }}
                                transition={{ duration: 0.8, delay: 1 + (index * 0.2) }}
                              />
                            </div>
                            <span className="data-small font-mono text-on-surface">
                              {isAnimating ? metric.value : '--'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Overall Score Display */}
                <AnimatePresence>
                  {showCalculation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 2 }}
                      className="mt-6 text-center p-4 bg-care-emerald/10 rounded-xl border border-care-emerald/30"
                    >
                      <div className="data-large font-mono font-bold text-care-emerald">
                        {nurtureScore}/100
                      </div>
                      <div className="body-small text-on-surface-variant">Nurture Score</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Mathematical Operators */}
            <motion.div
              className="lg:col-span-1 text-center space-y-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {/* Multiplication */}
              <motion.div
                className="relative mx-auto"
                animate={{ rotate: isAnimating ? 360 : 0 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-care-emerald to-care-vibrant-mint rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">×</span>
                </div>
              </motion.div>
              
              {/* Parentheses and Subtraction */}
              <div className="space-y-4">
                <div className="text-2xl font-bold text-on-surface">(</div>
                <div className="data-large font-mono font-bold text-on-surface">100</div>
                
                <motion.div
                  className="relative mx-auto"
                  animate={{ rotate: isAnimating ? -360 : 0 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-harm-coral to-harm-rose rounded-full flex items-center justify-center shadow-lg">
                    <Minus className="text-white font-bold w-6 h-6" />
                  </div>
                </motion.div>
                
                <div className="text-2xl font-bold text-on-surface">)</div>
              </div>
            </motion.div>

            {/* Harm Component */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onHoverStart={() => setActiveComponent('harm')}
              onHoverEnd={() => setActiveComponent(null)}
            >
              <div className={`h-full transition-all duration-300 rounded-2xl p-6 ${
                activeComponent === 'harm' 
                  ? 'elevation-strong scale-105 bg-gradient-to-br from-harm-coral/10 to-harm-coral/5 border-2 border-harm-coral' 
                  : 'elevation-subtle bg-gradient-to-br from-harm-coral/5 to-transparent border border-harm-coral/20'
              }`}>
                
                {/* Header */}
                <div className="text-center mb-6">
                  <motion.div 
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                      activeComponent === 'harm' ? 'bg-gradient-to-br from-harm-coral to-harm-rose' : 'bg-gradient-to-br from-harm-coral/20 to-harm-rose/20'
                    }`}
                    animate={activeComponent === 'harm' ? { rotate: [0, 5, -5, 0] } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Shield className={`w-10 h-10 ${activeComponent === 'harm' ? 'text-white' : 'text-harm-coral'}`} />
                  </motion.div>
                  <h3 className="headline-h3 text-harm-coral mb-2">Harm Offsets</h3>
                  <p className="body-small text-on-surface-variant">
                    Corporate harm that reduces care impact
                  </p>
                </div>

                {/* Metrics with Visual Impact */}
                <div className="space-y-4">
                  {harmMetrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.label}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/50 hover:bg-white/80 transition-all duration-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + (index * 0.1) }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${metric.color}20` }}
                        >
                          <Icon className="w-5 h-5" style={{ color: metric.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="body-small font-medium text-on-surface">{metric.label}</span>
                            <span className="data-small text-harm-coral font-bold">{metric.severity}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full rounded-full"
                                style={{ backgroundColor: metric.color }}
                                initial={{ width: 0 }}
                                animate={{ width: isAnimating ? `${metric.value}%` : '0%' }}
                                transition={{ duration: 0.8, delay: 1.5 + (index * 0.2) }}
                              />
                            </div>
                            <span className="data-small font-mono text-on-surface">
                              {isAnimating ? metric.value : '--'}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Overall Harm Score Display */}
                <AnimatePresence>
                  {showCalculation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: 2.5 }}
                      className="mt-6 text-center p-4 bg-harm-coral/10 rounded-xl border border-harm-coral/30"
                    >
                      <div className="data-large font-mono font-bold text-harm-coral">
                        {harmScore}/100
                      </div>
                      <div className="body-small text-on-surface-variant">Harm Score</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Calculation Result */}
          <motion.div
            className="text-center mt-12 pt-8 border-t border-outline-variant"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {/* Animated Equals */}
            <motion.div
              className="mb-8"
              animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 1, delay: 2.8 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-cta-orange to-cta-orange-light rounded-full flex items-center justify-center mx-auto shadow-lg">
                <Equal className="w-10 h-10 text-white" />
              </div>
            </motion.div>
            
            {/* Final Result Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              onHoverStart={() => setActiveComponent('result')}
              onHoverEnd={() => setActiveComponent(null)}
            >
              <div className={`bg-gradient-to-r from-cta-orange/10 to-cta-orange-light/10 rounded-2xl p-8 inline-block transition-all duration-300 ${
                activeComponent === 'result' ? 'elevation-strong scale-105 border-2 border-cta-orange' : 'elevation-subtle border border-cta-orange/30'
              }`}>
                <motion.div
                  animate={activeComponent === 'result' ? { rotateY: [0, 360] } : {}}
                  transition={{ duration: 1 }}
                  className="w-20 h-20 bg-gradient-to-br from-cta-orange to-cta-orange-light rounded-2xl flex items-center justify-center mx-auto mb-6"
                >
                  <Calculator className="w-10 h-10 text-white" />
                </motion.div>
                
                <h3 className="headline-h3 text-cta-orange mb-4">Final Care Score</h3>
                
                {/* Live Calculation Display */}
                <AnimatePresence>
                  {showCalculation && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 3 }}
                      className="space-y-4"
                    >
                      <div className="bg-white/80 rounded-lg p-4 border border-cta-orange/20">
                        <div className="data-small font-mono text-on-surface-variant mb-2">
                          Calculation: {nurtureScore} × (100 - {harmScore}) ÷ 100
                        </div>
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.5, delay: 3.2 }}
                          className="data-large font-mono font-bold text-cta-orange"
                        >
                          {finalScore}
                        </motion.div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-6 text-sm">
                        <div className="text-center">
                          <div className="data-medium text-cta-orange font-bold">0-100</div>
                          <div className="body-small text-on-surface-variant">Scale</div>
                        </div>
                        <div className="w-px h-8 bg-outline-variant"></div>
                        <div className="text-center">
                          <div className="data-medium text-cta-orange font-bold">A-E</div>
                          <div className="body-small text-on-surface-variant">Bands</div>
                        </div>
                        <div className="w-px h-8 bg-outline-variant"></div>
                        <div className="text-center">
                          <div className="data-medium text-cta-orange font-bold">
                            {finalScore >= 90 ? 'A' : finalScore >= 70 ? 'B' : finalScore >= 55 ? 'C' : finalScore >= 40 ? 'D' : 'E'}
                          </div>
                          <div className="body-small text-on-surface-variant">Grade</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <Button 
                onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                className="md3-btn-outlined gap-2 hover:scale-105 transition-transform"
              >
                <Info className="w-4 h-4" />
                Explore Detailed Methodology
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export function MethodologyPage({
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
}: MethodologyPageProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <TopNavigation
        currentPage="methodology"
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

      {/* Main Content - Grid-aligned */}
      <main className="container py-16 space-y-24">
        
        {/* 1. HERO SECTION - Green Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
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
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              >
                <h1 className="headline-h1 mb-6">
                  How the Care Index Works
                </h1>
                <p className="body-large text-on-surface-variant max-w-3xl mx-auto">
                  A transparent methodology for measuring care as capital across S&P 500 companies.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 2. ENHANCED INTERACTIVE CARE SCORE FORMULA */}
        <InteractiveFormulaSection />

        {/* 3. Detailed Methodology Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
            
            {/* Nurture Pillars */}
            <AccordionSection 
              title="Nurture Pillars" 
              icon={<Heart className="w-5 h-5 text-[var(--care-emerald)]" />}
              defaultOpen={true}
            >
              <div className="space-y-6">
                <p className="body-large text-on-surface-variant mb-6">
                  Four core areas where companies can invest in care infrastructure:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-care-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Baby className="w-5 h-5 text-care-emerald" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Parental Leave</h4>
                      <p className="body-medium text-on-surface-variant">
                        Weeks of paid leave, flexibility, and partner support policies
                      </p>
                      <div className="data-small text-care-emerald mt-2">
                        Weight: 30%
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-care-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-care-emerald" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Childcare Support</h4>
                      <p className="body-medium text-on-surface-variant">
                        On-site care, subsidies, backup care, and family benefits
                      </p>
                      <div className="data-small text-care-emerald mt-2">
                        Weight: 25%
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-care-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-care-emerald" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Women's Leadership</h4>
                      <p className="body-medium text-on-surface-variant">
                        Board representation, executive roles, and advancement programs
                      </p>
                      <div className="data-small text-care-emerald mt-2">
                        Weight: 25%
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-care-emerald/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-care-emerald" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Health Benefits</h4>
                      <p className="body-medium text-on-surface-variant">
                        Reproductive health, mental health, and wellness programs
                      </p>
                      <div className="data-small text-care-emerald mt-2">
                        Weight: 20%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Harm Offsets */}
            <AccordionSection 
              title="Harm Offsets" 
              icon={<Shield className="w-5 h-5 text-[var(--harm-coral)]" />}
            >
              <div className="space-y-6">
                <p className="body-large text-on-surface-variant mb-6">
                  Areas where corporate harm reduces the overall care score:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-harm-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Factory className="w-5 h-5 text-harm-coral" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Environmental Impact</h4>
                      <p className="body-medium text-on-surface-variant">
                        Carbon emissions, pollution, and environmental violations
                      </p>
                      <div className="data-small text-harm-coral mt-2">
                        Impact: High
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-harm-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Truck className="w-5 h-5 text-harm-coral" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Supply Chain Issues</h4>
                      <p className="body-medium text-on-surface-variant">
                        Labor violations, unsafe conditions, and exploitation
                      </p>
                      <div className="data-small text-harm-coral mt-2">
                        Impact: High
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-harm-coral/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-harm-coral" />
                    </div>
                    <div>
                      <h4 className="headline-h3 text-on-surface mb-2">Regulatory Violations</h4>
                      <p className="body-medium text-on-surface-variant">
                        Fines, sanctions, and compliance failures
                      </p>
                      <div className="data-small text-harm-coral mt-2">
                        Impact: Medium
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container rounded-lg p-4">
                  <h4 className="headline-h3 text-on-surface mb-2">Calculation Method</h4>
                  <p className="body-medium text-on-surface-variant mb-3">
                    Harm scores are subtracted from 100 before multiplying with Nurture scores:
                  </p>
                  <div className="data-medium text-care-emerald font-mono">
                    Final Score = Nurture Score × (100 - Harm Score) / 100
                  </div>
                </div>
              </div>
            </AccordionSection>

            {/* Score Bands */}
            <AccordionSection 
              title="Score Bands (A-E)" 
              icon={<BarChart3 className="w-5 h-5 text-[var(--cta-orange)]" />}
            >
              <div className="space-y-6">
                <p className="body-large text-on-surface-variant mb-6">
                  Care scores are classified into five bands for easy comparison:
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-care-vibrant-mint/10 rounded-lg border border-care-vibrant-mint/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-care-vibrant-mint rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">A</span>
                      </div>
                      <div>
                        <h4 className="headline-h3 text-on-surface">Exceptional Care</h4>
                        <p className="body-medium text-on-surface-variant">Industry leaders in care infrastructure</p>
                      </div>
                    </div>
                    <div className="data-large text-care-vibrant-mint font-mono">
                      90-100
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-care-emerald/10 rounded-lg border border-care-emerald/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-care-emerald rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">B</span>
                      </div>
                      <div>
                        <h4 className="headline-h3 text-on-surface">Strong Care</h4>
                        <p className="body-medium text-on-surface-variant">Above-average care policies and practices</p>
                      </div>
                    </div>
                    <div className="data-large text-care-emerald font-mono">
                      70-89
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-neutral-lilac/10 rounded-lg border border-neutral-lilac/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-neutral-lilac rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">C</span>
                      </div>
                      <div>
                        <h4 className="headline-h3 text-on-surface">Moderate Care</h4>
                        <p className="body-medium text-on-surface-variant">Standard care practices, room for improvement</p>
                      </div>
                    </div>
                    <div className="data-large text-neutral-lilac font-mono">
                      50-69
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-harm-coral/10 rounded-lg border border-harm-coral/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-harm-coral rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">D</span>
                      </div>
                      <div>
                        <h4 className="headline-h3 text-on-surface">Limited Care</h4>
                        <p className="body-medium text-on-surface-variant">Below-average care infrastructure</p>
                      </div>
                    </div>
                    <div className="data-large text-harm-coral font-mono">
                      40-49
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-bg-deep-navy/10 rounded-lg border border-bg-deep-navy/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-bg-deep-navy rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">E</span>
                      </div>
                      <div>
                        <h4 className="headline-h3 text-on-surface">Needs Attention</h4>
                        <p className="body-medium text-on-surface-variant">Significant gaps in care policies</p>
                      </div>
                    </div>
                    <div className="data-large text-bg-deep-navy font-mono">
                      0-39
                    </div>
                  </div>
                </div>
              </div>
            </AccordionSection>

          </motion.div>

        {/* 4. CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <div className="bg-gradient-to-br from-bg-deep-navy to-bg-navy-medium text-text-on-navy rounded-2xl p-12 elevation-3">
            <h2 className="headline-h2 text-text-on-navy mb-4">
              Learn More About Our Research
            </h2>
            <p className="body-large text-text-on-navy-secondary mb-8 max-w-2xl mx-auto">
              Explore the academic foundations and data sources behind our methodology.
            </p>
            <Button 
              onClick={onNavigateToResearch}
              className="md3-btn-filled bg-cta-orange hover:bg-cta-orange-light gap-3 px-8 py-4 text-lg"
            >
              <TrendingUp className="w-5 h-5" />
              Read Our Research
            </Button>
          </div>
        </motion.div>

      </main>
    </div>
  );
}