import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Building2, Globe, Shield, Check, Sparkles, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface OnboardingWizardProps {
  isOpen: boolean;
  onComplete: (preferences: OnboardingPreferences) => void;
  onSkip: () => void;
}

interface OnboardingPreferences {
  focus: 'companies' | 'countries' | 'agencies';
  sectors: string[];
  regions: string[];
  metrics: string[];
}

const focusOptions = [
  {
    id: 'companies' as const,
    title: 'Companies',
    description: 'Track corporate care practices and investment opportunities',
    icon: Building2,
    gradient: 'from-emerald-500 to-emerald-600',
    examples: ['S&P 500 companies', 'Care Index leaders', 'ESG innovators'],
    enabled: true
  },
  {
    id: 'countries' as const,
    title: 'Countries',
    description: 'Compare national care policies and systemic progress',
    icon: Globe,
    gradient: 'from-purple-500 to-purple-600',
    examples: ['Nordic countries', 'Policy leaders', 'Emerging markets'],
    enabled: false,
    comingSoon: true
  },
  {
    id: 'agencies' as const,
    title: 'Agencies',
    description: 'Monitor institutional care investments and frameworks',
    icon: Shield,
    gradient: 'from-coral-500 to-coral-600',
    examples: ['UN agencies', 'Development banks', 'Care funds'],
    enabled: false,
    comingSoon: true
  }
];

const sectorOptions = [
  'Healthcare', 'Technology', 'Financial Services', 'Consumer Goods',
  'Manufacturing', 'Energy', 'Education', 'Retail'
];

const regionOptions = [
  'North America', 'Europe', 'Asia-Pacific', 'Latin America',
  'Middle East', 'Africa', 'Nordic Countries', 'Emerging Markets'
];

const metricOptions = [
  'Parental Leave', 'Women Leadership', 'Care Investment',
  'Workplace Flexibility', 'Mental Health Support', 'Community Impact'
];

export function OnboardingWizard({ isOpen, onComplete, onSkip }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<OnboardingPreferences>({
    focus: 'companies',
    sectors: [],
    regions: [],
    metrics: []
  });

  const handleFocusSelect = (focus: OnboardingPreferences['focus']) => {
    setPreferences(prev => ({ ...prev, focus }));
  };

  const toggleSelection = (category: keyof Pick<OnboardingPreferences, 'sectors' | 'regions' | 'metrics'>, item: string) => {
    setPreferences(prev => ({
      ...prev,
      [category]: prev[category].includes(item)
        ? prev[category].filter(i => i !== item)
        : [...prev[category], item]
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return preferences.focus !== undefined;
      case 2:
        return preferences.sectors.length > 0 || preferences.regions.length > 0;
      case 3:
        return preferences.metrics.length > 0;
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-white border border-[var(--outline-variant)] shadow-xl">
            {/* Header */}
            <div className="p-8 border-b border-[var(--outline-variant)]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="headline-h3 text-[var(--text-primary)]">Welcome to Carefolio</h2>
                  <p className="body-small text-[var(--text-secondary)]">Let's personalize your dashboard</p>
                </div>
                <button
                  onClick={onSkip}
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Skip for now
                </button>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        step === currentStep
                          ? 'bg-[var(--fintech-feminine-purple)] text-white'
                          : step < currentStep
                          ? 'bg-[var(--care-emerald)] text-white'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)]'
                      }`}
                    >
                      {step < currentStep ? <Check className="w-4 h-4" /> : step}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-12 h-px transition-colors duration-300 ${
                          step < currentStep ? 'bg-[var(--care-emerald)]' : 'bg-[var(--outline-variant)]'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="headline-h3 text-[var(--text-primary)] mb-2">Choose Your Focus</h3>
                      <p className="body-medium text-[var(--text-secondary)]">
                        What would you like to track and analyze in your portfolio?
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {focusOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = preferences.focus === option.id;
                        const isEnabled = option.enabled;
                        const showComingSoon = option.comingSoon;
                        
                        return (
                          <motion.div
                            key={option.id}
                            className={`text-left p-6 rounded-xl border-2 transition-all duration-200 relative ${
                              !isEnabled
                                ? 'border-[var(--outline-variant)] bg-[var(--bg-secondary)] opacity-60 cursor-not-allowed'
                                : isSelected
                                ? 'border-[var(--fintech-feminine-purple)] bg-[var(--fintech-feminine-bg-lavender)] cursor-pointer'
                                : 'border-[var(--outline-variant)] bg-[var(--bg-card)] hover:border-[var(--care-emerald)] cursor-pointer'
                            }`}
                            whileHover={isEnabled ? { scale: 1.02 } : {}}
                            whileTap={isEnabled ? { scale: 0.98 } : {}}
                            onClick={isEnabled ? () => handleFocusSelect(option.id) : undefined}
                          >
                            {showComingSoon && (
                              <div className="absolute -top-2 -right-2 z-10">
                                <div className="bg-[var(--fintech-feminine-purple)] text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                  <Clock className="w-3 h-3" />
                                  <span className="text-xs font-medium">Coming Soon</span>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-start gap-4">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center ${
                                !isEnabled ? 'grayscale' : ''
                              }`}>
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className={`headline-h3 ${
                                    isEnabled ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'
                                  }`}>
                                    {option.title}
                                  </h4>
                                </div>
                                <p className={`body-medium mb-3 ${
                                  isEnabled ? 'text-[var(--text-secondary)]' : 'text-[var(--text-secondary)]'
                                }`}>
                                  {option.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {option.examples.map((example) => (
                                    <Badge 
                                      key={example} 
                                      variant="secondary" 
                                      className={`body-small ${!isEnabled ? 'opacity-50' : ''}`}
                                    >
                                      {example}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              {isSelected && isEnabled && (
                                <div className="w-6 h-6 rounded-full bg-[var(--fintech-feminine-purple)] flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="headline-h3 text-[var(--text-primary)] mb-2">Choose Filters</h3>
                      <p className="body-medium text-[var(--text-secondary)]">
                        Select sectors and regions to focus your analysis
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="body-data-medium text-[var(--text-primary)] mb-3">Sectors</h4>
                        <div className="flex flex-wrap gap-2">
                          {sectorOptions.map((sector) => (
                            <button
                              key={sector}
                              onClick={() => toggleSelection('sectors', sector)}
                              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                preferences.sectors.includes(sector)
                                  ? 'bg-[var(--care-emerald)] text-white'
                                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--care-emerald)]/10'
                              }`}
                            >
                              {sector}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="body-data-medium text-[var(--text-primary)] mb-3">Regions</h4>
                        <div className="flex flex-wrap gap-2">
                          {regionOptions.map((region) => (
                            <button
                              key={region}
                              onClick={() => toggleSelection('regions', region)}
                              className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                preferences.regions.includes(region)
                                  ? 'bg-[var(--care-emerald)] text-white'
                                  : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--care-emerald)]/10'
                              }`}
                            >
                              {region}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mb-6">
                      <h3 className="headline-h3 text-[var(--text-primary)] mb-2">Select Metrics</h3>
                      <p className="body-medium text-[var(--text-secondary)]">
                        Choose the care metrics most important to your analysis
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {metricOptions.map((metric) => (
                        <button
                          key={metric}
                          onClick={() => toggleSelection('metrics', metric)}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            preferences.metrics.includes(metric)
                              ? 'border-[var(--care-emerald)] bg-[var(--care-emerald)]/5'
                              : 'border-[var(--outline-variant)] hover:border-[var(--care-emerald)]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="body-data-medium text-[var(--text-primary)]">{metric}</span>
                            {preferences.metrics.includes(metric) && (
                              <Check className="w-4 h-4 text-[var(--care-emerald)]" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-[var(--outline-variant)] flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              
              <div className="flex items-center gap-3">
                <span className="body-small text-[var(--text-secondary)]">
                  Step {currentStep} of 3
                </span>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 md3-btn-filled"
                >
                  {currentStep === 3 ? (
                    <>
                      Complete Setup
                      <Check className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}