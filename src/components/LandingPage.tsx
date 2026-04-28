import { motion } from 'motion/react';
import { ArrowRight, BarChart3, TrendingUp, Users, Globe, Heart, GitCompare, PieChart } from 'lucide-react';
import { Button } from './ui/button';
import { Company } from '../data/companies';
import { CareMarketTicker } from './CareMarketTicker';
import { WhyNowSection } from './WhyNowSection';
import { TrustSignalsSection } from './TrustSignalsSection';
import { CareEconomyReportBanner } from './CareEconomyReportBanner';
import practiceHeroImage from 'figma:asset/db0e141680feb78931b68b37e1014715ba885abc.png';

interface LandingPageProps {
  onLogin: (username: string, password: string) => void;
  onNavigateToLogin: () => void;
  onNavigateToInsights: () => void;
  onNavigateToAbout: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToTechDocs: () => void;
  onNavigateToCarePortfolio?: () => void;
  onLogoClick: () => void;
  loginError: string;
  companies: Company[];
}

export function LandingPage({
  onNavigateToLogin,
  onNavigateToInsights,
  onNavigateToAbout,
  onNavigateToDashboard,
  onNavigateToTechDocs,
  onNavigateToCarePortfolio,
  onLogoClick,
  companies
}: LandingPageProps) {

  return (
    <div className="min-h-screen bg-white">

      {/* ─── Care Market Ticker ─── */}
      <CareMarketTicker />

      {/* ─── Hero Section ─── */}
      <section 
        className="relative overflow-hidden pt-20 pb-20 lg:pt-24 lg:pb-32"
        aria-labelledby="hero-heading"
        role="banner"
      >
        {/* Background mesh */}
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(107,63,160,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(43,174,102,0.06) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(107,63,160,0.04) 0%, transparent 50%)'
            }}
          />
          <div 
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'linear-gradient(rgba(107,63,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(107,63,160,1) 1px, transparent 1px)',
              backgroundSize: '64px 64px'
            }}
          />
        </div>

        <div className="mx-auto max-w-[1200px] px-6">
          {/* Centered copy */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            
            {/* Kicker */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="mb-8"
            >
              <div 
                className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 backdrop-blur-sm"
                style={{
                  background: 'rgba(107,63,160,0.06)',
                  border: '1px solid rgba(107,63,160,0.12)',
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2BAE66' }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', color: '#6B3FA0' }}>
                  GLOBAL CARE INDEX 2026
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                color: 'var(--bg-deep-navy)',
              }}
              className="mb-6"
            >
              Care is{' '}
              <span className="relative inline-block" style={{ color: 'var(--fintech-feminine-purple)' }}>
                Capital
                <motion.span 
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full"
                  style={{ background: 'var(--fintech-feminine-purple)' }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0, 0, 1] }}
                />
              </span>.
            </motion.h1>
            
            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              style={{
                fontFamily: "'Inter', system-ui, sans-serif",
                fontWeight: 400,
                fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                maxWidth: '540px',
              }}
              className="mb-10"
            >
              Track how S&P 500 companies invest in families and futures, with a transparent, data-driven Care&nbsp;Index.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <Button
                onClick={onNavigateToCarePortfolio || onNavigateToDashboard}
                className="group relative overflow-hidden rounded-full text-white border-0 h-12 px-7 shadow-[0_2px_16px_rgba(43,174,102,0.3)] hover:shadow-[0_4px_24px_rgba(43,174,102,0.4)] transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-500/25"
                style={{ background: '#2BAE66' }}
                aria-label="Explore the Care Index portfolio"
              >
                <span className="relative z-10 flex items-center gap-2" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px' }}>
                  Explore the Index
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Button>
              
              <Button
                onClick={onNavigateToLogin}
                variant="outline"
                className="group rounded-full h-12 px-7 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-purple-500/20 bg-white"
                style={{
                  borderColor: 'rgba(107,63,160,0.25)',
                  color: 'var(--fintech-feminine-purple)',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '15px',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--fintech-feminine-purple)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.borderColor = 'var(--fintech-feminine-purple)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'var(--fintech-feminine-purple)';
                  e.currentTarget.style.borderColor = 'rgba(107,63,160,0.25)';
                }}
                aria-label="Sign up for Carefolio"
              >
                <span className="flex items-center gap-2">
                  Get started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </span>
              </Button>
            </motion.div>

            {/* Trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-6 sm:gap-10"
            >
              {[
                { value: '500+', label: 'Companies' },
                { value: '15+', label: 'Care metrics' },
                { value: '1M+', label: 'Data points' },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-3">
                  {i > 0 && <div className="w-px h-8 bg-gray-200 -ml-3 sm:-ml-5 mr-0" />}
                  <div>
                    <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: '20px', color: 'var(--bg-deep-navy)', fontFeatureSettings: "'tnum' 1" }}>
                      {stat.value}
                    </div>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 400 }}>
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard preview card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0, 0, 1] }}
            className="relative max-w-4xl mx-auto"
          >
            {/* Glow */}
            <div 
              className="absolute -inset-4 rounded-3xl -z-10 blur-2xl opacity-40"
              style={{ background: 'linear-gradient(135deg, rgba(43,174,102,0.2), rgba(107,63,160,0.15))' }}
            />

            <div 
              className="rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(20px)',
                borderColor: 'rgba(0,0,0,0.06)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 8px 32px rgba(0,0,0,0.06)',
              }}
            >
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div 
                    className="hidden sm:block rounded-md px-3 py-1"
                    style={{ background: 'rgba(0,0,0,0.03)', fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    carefolio.com/dashboard
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#2BAE66' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace" }}>Live</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-5 sm:p-6">
                {/* Metric cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                  {[
                    { label: 'Portfolio Value', value: '$2.4M', change: '+12.3%' },
                    { label: 'Avg Care Score', value: '82.4', change: '+3.1' },
                    { label: 'Companies Tracked', value: '247', change: '+18' },
                  ].map((metric, i) => (
                    <motion.div
                      key={metric.label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                      className="rounded-xl p-2.5 sm:p-4"
                      style={{ background: 'rgba(0,0,0,0.02)' }}
                    >
                      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif", marginBottom: '4px', lineHeight: 1.3 }}>
                        {metric.label}
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: 'clamp(14px, 2.5vw, 24px)', color: 'var(--bg-deep-navy)', fontFeatureSettings: "'tnum' 1" }}>
                          {metric.value}
                        </span>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 500, color: '#2BAE66' }}>
                          {metric.change}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Company list */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                      Top Care Leaders
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'IBM Plex Mono', monospace" }}>
                      Score
                    </span>
                  </div>

                  {[
                    { symbol: 'CRM', name: 'Salesforce', sector: 'Technology', score: 89, color: '#0176D3' },
                    { symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', score: 86, color: '#D51920' },
                    { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology', score: 84, color: '#00A4EF' },
                  ].map((company, i) => (
                    <motion.div
                      key={company.symbol}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + i * 0.12 }}
                      className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer transition-colors duration-200"
                      style={{ background: 'transparent' }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(43,174,102,0.04)'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                          style={{ background: company.color, fontSize: '11px', fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace" }}
                        >
                          {company.symbol.slice(0, 2)}
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--bg-deep-navy)', fontFamily: "'Inter', sans-serif" }}>
                            {company.name}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                            {company.sector}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: '#2BAE66' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${company.score}%` }}
                            transition={{ duration: 1.2, delay: 1.0 + i * 0.15, ease: [0.2, 0, 0, 1] }}
                          />
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 500, fontSize: '16px', color: '#2BAE66', fontFeatureSettings: "'tnum' 1", minWidth: '28px', textAlign: 'right' as const }}>
                          {company.score}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Footer CTA */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="mt-5 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: 'rgba(0,0,0,0.05)' }}
                >
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                    Real-time care scoring across Fortune 500
                  </span>
                  <button
                    onClick={onNavigateToDashboard}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 transition-all duration-200 hover:gap-2.5 cursor-pointer border-0"
                    style={{ background: 'rgba(43,174,102,0.08)', color: '#2BAE66', fontSize: '13px', fontWeight: 500, fontFamily: "'Inter', sans-serif" }}
                    aria-label="Open full dashboard"
                  >
                    Open dashboard
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute hidden sm:flex -left-3 top-1/3 sm:-left-6 rounded-xl px-3 py-2 items-center gap-2 z-20"
              style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <Globe className="w-4 h-4" style={{ color: '#6B3FA0' }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--bg-deep-navy)', fontFamily: "'Inter', sans-serif" }}>
                S&P 500
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="absolute hidden sm:flex -right-3 top-1/4 sm:-right-6 rounded-xl px-3 py-2 items-center gap-2 z-20"
              style={{ background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)' }}
            >
              <Heart className="w-4 h-4" style={{ color: '#2BAE66' }} />
              <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--bg-deep-navy)', fontFamily: "'Inter', sans-serif" }}>
                Care-first
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Why Now Section ─── */}
      <WhyNowSection />

      {/* ─── Power Tools Strip ─── */}
      <section
        className="py-12 border-t border-b"
        style={{ borderColor: 'rgba(0,0,0,0.05)', background: 'white' }}
        aria-label="Power tools"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <p
            className="text-center mb-8"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              color: 'var(--text-secondary)',
            }}
          >
            CARE INTELLIGENCE TOOLS
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Compare tool */}
            <motion.a
              href="/compare"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-5 rounded-2xl px-6 py-5 no-underline transition-all duration-200 group"
              style={{
                background: 'rgba(107,63,160,0.04)',
                border: '1px solid rgba(107,63,160,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(107,63,160,0.08)';
                e.currentTarget.style.borderColor = 'rgba(107,63,160,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(107,63,160,0.04)';
                e.currentTarget.style.borderColor = 'rgba(107,63,160,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(107,63,160,0.1)' }}
              >
                <GitCompare className="w-6 h-6" style={{ color: '#6B3FA0' }} />
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '16px', color: 'var(--bg-deep-navy)', marginBottom: '3px' }}>
                  Compare Companies
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Stack 2–3 companies side by side. Useful before accepting a job offer or rebalancing.
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" style={{ color: '#6B3FA0' }} />
            </motion.a>

            {/* Portfolio score tool */}
            <motion.a
              href="/portfolio-score"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-5 rounded-2xl px-6 py-5 no-underline transition-all duration-200 group"
              style={{
                background: 'rgba(43,174,102,0.04)',
                border: '1px solid rgba(43,174,102,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(43,174,102,0.08)';
                e.currentTarget.style.borderColor = 'rgba(43,174,102,0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(43,174,102,0.04)';
                e.currentTarget.style.borderColor = 'rgba(43,174,102,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(43,174,102,0.1)' }}
              >
                <PieChart className="w-6 h-6" style={{ color: '#2BAE66' }} />
              </div>
              <div className="flex-1">
                <div style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontWeight: 600, fontSize: '16px', color: 'var(--bg-deep-navy)', marginBottom: '3px' }}>
                  Score My Portfolio
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Enter your holdings and get a weighted Care Score for your entire portfolio.
                </div>
              </div>
              <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" style={{ color: '#2BAE66' }} />
            </motion.a>
          </div>
        </div>
      </section>

      {/* ─── How Carefolio Works in Practice ─── */}
      <section 
        className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="how-it-works-heading"
        role="main"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left mb-12 md:mb-16"
          >
            <h2 
              id="how-it-works-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-gray-900"
            >
              How <span className="whitespace-nowrap" style={{ color: '#6B3FA0' }}>Carefolio</span> works <span className="whitespace-nowrap" style={{ color: '#2BAE66' }}>in practice</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
              See how companies, investors, and professionals use our Care Index to make informed decisions about where care practices really matter.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start mb-12 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative px-4 sm:px-0"
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={practiceHeroImage} 
                  alt="Carefolio in practice" 
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="px-4 sm:px-0"
            >
              <div className="space-y-4 sm:space-y-5">
                {[
                  { icon: TrendingUp, color: 'emerald', title: 'Investment Decision Support', desc: 'Portfolio managers integrate Care Index scores to identify companies with sustainable, long-term value creation through care investment.' },
                  { icon: Users, color: 'purple', title: 'Professional Care Assessment', desc: 'HR professionals and care advocates use detailed metrics to benchmark companies and drive organizational improvement.' },
                  { icon: BarChart3, color: 'blue', title: 'Data-Driven Care Strategy', desc: 'Organizations track progress against 15+ care metrics to build comprehensive family support programs and maternal health initiatives.' },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-4 md:gap-5"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-${item.color}-100`}>
                      <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Trust Signals ─── */}
      <TrustSignalsSection />

      {/* ─── 2026 Report Banner ─── */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[1200px] px-6">
          <CareEconomyReportBanner variant="hero" />
        </div>
      </section>
    </div>
  );
}