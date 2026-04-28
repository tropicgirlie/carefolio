import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { ArrowRight, Info, Heart, Shield, Sparkles, TrendingUp, Building2 } from 'lucide-react';
import { Company } from '../data/companies';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SeeInActionSectionProps {
  companies: Company[];
  onNavigateToDashboard: () => void;
}

// Animated Counter Component
function AnimatedCounter({ 
  value, 
  suffix = '', 
  prefix = '', 
  duration = 1200,
  delay = 0.6 // Synchronized delay
}: { 
  value: number; 
  suffix?: string; 
  prefix?: string; 
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Add consistent delay to counter animation
      const timer = setTimeout(() => {
        animate(motionValue, value, { duration: duration / 1000 });
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, motionValue, value, duration, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// Progress Bar Component
function AnimatedProgressBar({ 
  value, 
  className = "",
  delay = 0.8 // Synchronized delay
}: { 
  value: number; 
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className={`h-2 bg-surface-container rounded-full overflow-hidden ${className}`} ref={ref}>
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1.2, delay: delay, ease: [0.2, 0, 0, 1] }}
        className="h-full bg-gradient-to-r from-care-emerald to-care-vibrant-mint rounded-full"
      />
    </div>
  );
}

// Demo Card Component
function DemoCard({ 
  company, 
  index, 
  onExplore 
}: { 
  company: Company; 
  index: number; 
  onExplore: () => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate derived metrics
  const careScore = company.care_index.score;
  const nurtureIndex = Math.round((
    company.care_metrics.parental_leave.flexibility_score + 
    company.care_metrics.childcare_support.score + 
    company.care_metrics.women_leadership.score
  ) / 3);
  const harmReduction = 100 - company.harm_index.score;
  const marketCapB = (company.market_cap / 1000000000).toFixed(1);

  // Synchronized animation delays based on card index
  const cardDelay = 0.4 + (index * 0.15); // Same as card entrance
  const counterDelay = cardDelay + 0.2; // Counters start after card is visible
  const progressDelay = cardDelay + 0.4; // Progress bar starts after counters

  // Care Band styling
  const getBandStyle = (band: string) => {
    switch (band) {
      case 'A': return 'bg-gradient-to-r from-care-vibrant-mint to-care-emerald text-white';
      case 'B': return 'bg-gradient-to-r from-care-emerald to-care-teal text-white';
      case 'C': return 'bg-gradient-to-r from-neutral-lilac to-neutral-blush text-on-surface';
      case 'D': return 'bg-gradient-to-r from-harm-coral to-harm-rose text-white';
      case 'E': return 'bg-gradient-to-r from-bg-deep-navy to-neutral-lilac text-white';
      default: return 'bg-neutral-lilac text-on-surface';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: 0.4 + (index * 0.15), // Base delay + consistent staggering
        ease: [0.2, 0, 0, 1]
      }}
      className="group relative"
    >
      <div 
        className={`bg-white rounded-2xl transition-all duration-300 hover:shadow-xl relative overflow-hidden cursor-pointer flex flex-col ${
          isHovered ? 'transform hover:-translate-y-1' : ''
        }`}
        style={{
          width: '320px', // Fixed width for consistency
          height: '480px', // Fixed height for consistency
          minWidth: '320px',
          maxWidth: '320px',
          padding: '24px',
          boxShadow: isHovered 
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Top Band - Identity - Fixed Height */}
        <div className="flex items-start justify-between" style={{ height: '72px', marginBottom: '24px' }}>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-12 h-12 bg-surface rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
              <Building2 className="w-6 h-6 text-care-emerald" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="headline-h3 text-on-surface leading-tight truncate" style={{ height: '28px', marginBottom: '4px' }}>
                {company.name}
              </h3>
              <div className="flex items-center gap-2" style={{ height: '20px' }}>
                <span className="data-small text-on-surface-variant">
                  {company.symbol}
                </span>
                <div className="w-1 h-1 bg-care-emerald rounded-full flex-shrink-0"></div>
                <span className="body-small text-on-surface-variant capitalize truncate">
                  {company.sector}
                </span>
              </div>
            </div>
          </div>
          
          {/* Care Band Badge - Fixed Position */}
          <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg flex-shrink-0 ${getBandStyle(company.care_index.band)}`}>
            <span className="body-medium-medium font-bold">{company.care_index.band}</span>
          </div>
        </div>

        {/* Middle Band - Main Metrics - Fixed Height */}
        <div className="text-center" style={{ height: '120px', marginBottom: '24px' }}>
          <div style={{ height: '32px', marginBottom: '8px' }}>
            <span className="data-large font-bold text-care-emerald">
              <AnimatedCounter value={careScore} delay={counterDelay} />
            </span>
            <span className="body-small text-on-surface-variant ml-1">/100</span>
          </div>
          <p className="body-small text-on-surface-variant" style={{ height: '20px', marginBottom: '16px' }}>Care Index Score</p>
          
          <div style={{ height: '8px', marginBottom: '16px' }}>
            <AnimatedProgressBar value={careScore} delay={progressDelay} />
          </div>
          
          <p className="body-small text-on-surface-variant" style={{ height: '20px' }}>
            Market Cap: ${marketCapB}B
          </p>
        </div>

        {/* Bottom Band - Sub-metrics - Fixed Height */}
        <div className="grid grid-cols-3 gap-4" style={{ height: '100px', marginBottom: '24px' }}>
          {/* Nurture Index */}
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-maternal-wisdom/10 to-maternal-wisdom/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300" style={{ marginBottom: '8px' }}>
              <Heart className="w-5 h-5 text-maternal-wisdom" />
            </div>
            <div className="data-medium text-maternal-wisdom font-bold" style={{ height: '22px', marginBottom: '4px' }}>
              <AnimatedCounter value={nurtureIndex} delay={counterDelay + 0.1} />
            </div>
            <p className="body-small text-on-surface-variant text-xs" style={{ height: '16px' }}>Nurture</p>
          </div>

          {/* Harm Reduction */}
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-care-emerald/10 to-care-emerald/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300" style={{ marginBottom: '8px' }}>
              <Shield className="w-5 h-5 text-care-emerald" />
            </div>
            <div className="data-medium text-care-emerald font-bold" style={{ height: '22px', marginBottom: '4px' }}>
              <AnimatedCounter value={harmReduction} suffix="%" delay={counterDelay + 0.2} />
            </div>
            <p className="body-small text-on-surface-variant text-xs" style={{ height: '16px' }}>Protection</p>
          </div>

          {/* Maternal Intelligence */}
          <div className="text-center">
            <div className="w-10 h-10 bg-gradient-to-br from-cta-orange/10 to-cta-orange/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300" style={{ marginBottom: '8px' }}>
              <Sparkles className="w-5 h-5 text-cta-orange" />
            </div>
            <div className="data-medium text-cta-orange font-bold" style={{ height: '22px', marginBottom: '4px' }}>A+</div>
            <p className="body-small text-on-surface-variant text-xs" style={{ height: '16px' }}>Wisdom</p>
          </div>
        </div>



        {/* CTA Button - Fixed Position at Bottom */}
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onExplore}
            className="w-full bg-gradient-to-r from-care-emerald to-care-vibrant-mint text-white rounded-xl font-medium transition-all duration-300 hover:shadow-lg group-hover:shadow-xl relative overflow-hidden"
            style={{ height: '48px', padding: '0 24px' }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span className="body-medium-medium">Explore Full Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
            
            {/* Ripple effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-care-vibrant-mint to-care-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-care-emerald/10 to-care-vibrant-mint/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </motion.div>
  );
}

export function SeeInActionSection({ companies, onNavigateToDashboard }: SeeInActionSectionProps) {
  // Select 3 diverse companies for demo
  const demoCompanies = companies
    .filter(company => 
      company && 
      company.care_index && 
      company.care_metrics && 
      company.symbol && 
      company.story
    )
    .sort((a, b) => b.care_index.score - a.care_index.score)
    .slice(0, 3);

  if (demoCompanies.length === 0) {
    return null;
  }

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)'
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-br from-care-emerald/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/4 w-80 h-80 bg-gradient-to-br from-care-vibrant-mint/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Main Headline */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
            className="headline-h1 text-on-surface mb-6"
            style={{ fontSize: '36px', fontWeight: 'bold' }}
          >
            See Carefolio in Action
          </motion.h2>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
            className="body-medium mb-8 mx-auto max-w-2xl"
            style={{ color: '#6B7280' }}
          >
            Real company scores powered by care data.
          </motion.p>

          {/* Explainer Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
            className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mx-auto max-w-4xl"
            style={{ backgroundColor: '#E6F4ED' }}
          >
            <Info className="w-5 h-5 flex-shrink-0" style={{ color: '#2BAE66' }} />
            <p 
              className="body-small leading-relaxed"
              style={{ 
                fontSize: '14px',
                color: '#2BAE66',
                textAlign: 'center'
              }}
            >
              Scores combine Nurture Index + Harm Reduction. Maternal Intelligence highlights practices invisible in ESG.
            </p>
          </motion.div>
        </div>

        {/* Demo Cards Grid */}
        <div className="relative">
          {/* Desktop: 3 cards side by side - Fixed Grid */}
          <div className="hidden lg:flex lg:justify-center lg:gap-8">
            {demoCompanies.map((company, index) => (
              <DemoCard
                key={company.symbol}
                company={company}
                index={index}
                onExplore={onNavigateToDashboard}
              />
            ))}
          </div>

          {/* Tablet: 2 cards - Fixed Grid */}
          <div className="hidden md:flex lg:hidden md:justify-center md:gap-6 max-w-4xl mx-auto">
            {demoCompanies.slice(0, 2).map((company, index) => (
              <DemoCard
                key={company.symbol}
                company={company}
                index={index}
                onExplore={onNavigateToDashboard}
              />
            ))}
          </div>

          {/* Mobile: 1 card with simple scroll - Fixed Card Width */}
          <div className="md:hidden">
            <div className="flex gap-6 overflow-x-auto pb-4 px-4 -mx-4 snap-x snap-mandatory">
              {demoCompanies.map((company, index) => (
                <div key={company.symbol} className="flex-shrink-0 snap-center">
                  <DemoCard
                    company={company}
                    index={index}
                    onExplore={onNavigateToDashboard}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Call-to-Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.2, 0, 0, 1] }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center gap-3 text-on-surface-variant">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-care-emerald"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-care-emerald" />
              <span className="body-small">Interactive demo with 500+ S&P companies</span>
            </div>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-care-emerald"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}