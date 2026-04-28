import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowRight, Eye, Zap, TrendingUp, Building2, Users, Scale } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import missionBackground from 'figma:asset/00356ee7d77f45125a0bfcbfe15e381a33d5e804.png';
import aboutHeroImage from 'figma:asset/a7560333d4e926390b9ad87ff171b55daf6d59ae.png';
import heroImage from 'figma:asset/cd84b4c82ed8545ed7a8dd4aae2efa05aa805502.png';

interface AboutPageProps {
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

export function AboutPage({ 
  onNavigateToLanding, 
  onNavigateToInsights, 
  onNavigateToAbout, 
  onNavigateToLogin, 
  onNavigateToDashboard, 
  onNavigateToTechDocs, 
  onLogoClick, 
  isAuthenticated, 
  onLogout 
}: AboutPageProps) {
  
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content - Grid-aligned */}
      <main className="container py-16 space-y-24">
        
        {/* 1. HERO SECTION - Clean and Focused */}
        <AnimatedSection className="text-center space-y-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.2, 0, 0, 1] }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-care-emerald/10 rounded-full border border-care-emerald/20 mb-6">
                <Zap className="w-4 h-4 text-care-emerald" />
                <span className="body-small-medium text-care-emerald">Our Story</span>
              </div>
              
              <h1 className="headline-hero text-center">
                Making care infrastructure<br />
                <span className="text-care-emerald">visible and investable</span>
              </h1>
              
              <p className="body-content text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
                From a personal search for parental leave data to the world's first platform that makes care infrastructure measurable, comparable, and investable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <button 
                  onClick={onNavigateToDashboard}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#6B3FA0] text-white border-2 border-[#6B3FA0] rounded-full font-medium transition-all duration-200 hover:bg-[#5A3188] hover:border-[#5A3188] h-12 text-lg"
                >
                  <TrendingUp className="w-5 h-5" />
                  Explore Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
                
                <button 
                  onClick={onNavigateToInsights}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[var(--fintech-feminine-purple)] rounded-full font-medium transition-all duration-200 hover:bg-[var(--fintech-feminine-purple)] hover:text-white text-[var(--fintech-feminine-purple)] h-12 text-lg"
                >
                  <Eye className="w-5 h-5" />
                  View Research
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatedSection>
        
        {/* 2. Origin Story - Streamlined Single Section */}
        <AnimatedSection delay={0.1} className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Hero Image */}
            <AnimatedSection delay={0.2} direction="left">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl"
                >
                  <img
                    src={aboutHeroImage}
                    alt="Professional working mother in tech environment representing the invisible infrastructure gap"
                    className="w-full h-auto object-cover"
                    style={{
                      aspectRatio: '4/5',
                      filter: 'brightness(1.05) contrast(1.02)'
                    }}
                  />
                  
                  {/* Subtle gradient overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-[var(--fintech-feminine-purple)]/10 to-[var(--care-emerald)]/10"
                  />
                </motion.div>
              </div>
            </AnimatedSection>

            {/* Right Column: Complete Origin Story */}
            <AnimatedSection delay={0.4} direction="right">
              <div className="space-y-6">
                <h2 className="headline-h2 mb-4">
                  The discovery that started<br />
                  <span className="text-care-emerald">everything</span>
                </h2>
                
                <div className="space-y-4">
                  <p className="body-content text-on-surface leading-relaxed">
                    While working in tech and navigating motherhood, I discovered something shocking: companies celebrated as "great places to work" often had parental leave policies worse than small startups no one had heard of.
                  </p>
                  
                  <p className="body-content text-on-surface leading-relaxed">
                    The care data I needed was scattered, inconsistent, and nearly impossible to compare. Yet this information was crucial for career decisions and I realized, for investment decisions too. Markets that tracked everything else treated care as invisible.
                  </p>
                  
                  <p className="body-content text-on-surface leading-relaxed">
                    What started as personal research became MomOps, applying maternal wisdom to understand systemic care gaps. As patterns emerged across hundreds of companies, MomOps evolved into Carefolio: the first platform to make care infrastructure visible, measurable, and investable.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>



        {/* 3. Our Mission - Full Width Background */}
        <AnimatedSection delay={0.6}>
          <div 
            className="relative overflow-hidden"
            style={{
              backgroundImage: `url(${missionBackground})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              width: '100vw',
              marginLeft: 'calc(50% - 50vw)'
            }}
          >
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-white/75 backdrop-blur-sm p-[0px] m-[0px]"></div>
            
            <div className="relative z-10 max-w-5xl mx-auto text-center py-24 px-24">
              <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: [0.2, 0, 0, 1] }}
                className="space-y-12"
              >
              {/* Mission Label */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-care-emerald/10 rounded-full border border-care-emerald/20">
                  <Eye className="w-4 h-4 text-care-emerald" />
                  <span className="body-small-medium text-care-emerald">Our Mission</span>
                </div>
              </div>

              {/* Mission Statement - Clean Typography */}
              <div className="space-y-8">
                <h2 className="headline-hero text-on-surface max-w-4xl mx-auto">
                  We make care measurable, comparable and investable, turning{' '}
                  <span className="text-care-emerald">invisible infrastructure</span>{' '}
                  into{' '}
                  <span className="text-care-emerald">visible capital</span>.
                </h2>

                {/* Supporting Text */}
                <p className="body-content text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
                  By quantifying care investments across companies, we enable markets to properly value human sustainability alongside financial performance, creating better outcomes for investors, companies, and working families.
                </p>
              </div>

              {/* Elegant Separator */}
              <div className="flex items-center justify-center space-x-4 my-12">
                <div className="w-12 h-px bg-care-emerald/30"></div>
                <div className="w-2 h-2 rounded-full bg-care-emerald/50"></div>
                <div className="w-12 h-px bg-care-emerald/30"></div>
              </div>

              {/* Key Benefits - Three Column */}
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-care-emerald/10 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 rounded-full bg-care-emerald"></div>
                  </div>
                  <h3 className="headline-h3 text-center">Measurable</h3>
                  <p className="body-small text-on-surface-variant text-center">
                    Quantified metrics that transform qualitative care into comparable data
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-care-emerald/10 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 rounded-full bg-care-emerald"></div>
                  </div>
                  <h3 className="headline-h3 text-center">Comparable</h3>
                  <p className="body-small text-on-surface-variant text-center">
                    Standardized scoring across all companies for informed decisions
                  </p>
                </div>
                
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-care-emerald/10 rounded-xl flex items-center justify-center mx-auto">
                    <div className="w-6 h-6 rounded-full bg-care-emerald"></div>
                  </div>
                  <h3 className="headline-h3 text-center">Investable</h3>
                  <p className="body-small text-on-surface-variant text-center">
                    Actionable insights that enable capital allocation toward care
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button 
                  onClick={onNavigateToInsights}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#6B3FA0] text-white border-2 border-[#6B3FA0] rounded-full font-medium transition-all duration-200 hover:bg-[#5A3188] hover:border-[#5A3188] h-12"
                >
                  See Our Research
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
        </AnimatedSection>

        {/* 4. Audience Benefits - Four Equal Columns */}
        <AnimatedSection delay={0.8} className="mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-care-emerald/10 rounded-full border border-care-emerald/20 mb-6">
              <Users className="w-4 h-4 text-care-emerald" />
              <span className="body-small-medium text-care-emerald">Built for Everyone</span>
            </div>
            <h2 className="headline-h2 mb-6">
              Carefolio serves the entire <span className="text-care-emerald">care ecosystem</span>
            </h2>
            <p className="body-content text-on-surface-variant max-w-3xl mx-auto">
              From investment managers to policy makers, everyone benefits when care infrastructure becomes visible and measurable.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Investors Column */}
            <AnimatedSection delay={0.9} direction="up">
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant elevation-subtle hover:elevation-strong transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-care-emerald/10 rounded-xl flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-care-emerald" />
                </div>
                
                <h3 className="headline-h3 mb-4 text-care-emerald">Investors</h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Integrate care metrics into ESG portfolios with quantified, comparable data across all holdings
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Identify undervalued companies with strong care infrastructure before markets recognize their value
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Companies Column */}
            <AnimatedSection delay={1.0} direction="up">
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant elevation-subtle hover:elevation-strong transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-care-emerald/10 rounded-xl flex items-center justify-center mb-6">
                  <Building2 className="w-8 h-8 text-care-emerald" />
                </div>
                
                <h3 className="headline-h3 mb-4 text-care-emerald">Companies</h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Benchmark your care policies against industry leaders and attract care-conscious talent
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Access capital from investors who understand that care infrastructure drives long-term performance
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Professionals Column */}
            <AnimatedSection delay={1.1} direction="up">
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant elevation-subtle hover:elevation-strong transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-care-emerald/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-care-emerald" />
                </div>
                
                <h3 className="headline-h3 mb-4 text-care-emerald">Professionals</h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Benchmark your employer's care policies against 500+ companies to negotiate better benefits
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Make informed career decisions based on transparent data about company care infrastructure
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Policymakers Column */}
            <AnimatedSection delay={1.2} direction="up">
              <div className="bg-surface rounded-2xl p-8 border border-outline-variant elevation-subtle hover:elevation-strong transition-all duration-300 h-full flex flex-col">
                <div className="w-16 h-16 bg-care-emerald/10 rounded-xl flex items-center justify-center mb-6">
                  <Scale className="w-8 h-8 text-care-emerald" />
                </div>
                
                <h3 className="headline-h3 mb-4 text-care-emerald">Policymakers</h3>
                
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Design evidence-based policies using comprehensive data on care infrastructure across industries
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-care-emerald mt-3 flex-shrink-0"></div>
                    <p className="body-data text-on-surface">
                      Track policy impact on care investment patterns and working family outcomes at scale
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>

      </main>
    </div>
  );
}