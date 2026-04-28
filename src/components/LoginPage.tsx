import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Mail, User, ArrowRight, Heart, CheckCircle, Leaf } from 'lucide-react';
import carefolioLogo from 'figma:asset/ea19f9c0b622ef8fcaa387fdcfcc67bc3454a661.png';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface EarlyAccessPageProps {
  onNavigateToLanding: () => void;
  onLogoClick: () => void;
}

const INTEREST_OPTIONS = [
  { id: 'parental-leave', label: 'Parental Leave Policies', emoji: '👶' },
  { id: 'dei', label: 'DEI & Leadership', emoji: '🌱' },
  { id: 'pay-equity', label: 'Pay Equity Data', emoji: '⚖️' },
  { id: 'esg-investing', label: 'ESG Investing', emoji: '📊' },
  { id: 'company-compare', label: 'Company Comparisons', emoji: '🔍' },
  { id: 'portfolio', label: 'Portfolio Building', emoji: '💼' },
];

export function LoginPage({
  onNavigateToLanding,
  onLogoClick,
}: EarlyAccessPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string }>({});

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string } = {};
    if (!name.trim()) errors.name = 'We need your name to personalize your experience';
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Show success state, then open mailto with form data
    setSubmitted(true);
    const subject = encodeURIComponent('Early Access Request — Carefolio');
    const interestLabels = interests
      .map(id => INTEREST_OPTIONS.find(o => o.id === id)?.label)
      .filter(Boolean)
      .join(', ');
    const body = encodeURIComponent(
      `Hi Carefolio team,\n\nI'd like to request early access.\n\nName: ${name.trim()}\nEmail: ${email.trim()}${interestLabels ? `\nInterests: ${interestLabels}` : ''}\n\nLooking forward to it!\n`
    );
    setTimeout(() => {
      window.location.href = `mailto:info@carefolio.io?subject=${subject}&body=${body}`;
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
        <motion.div
          className="absolute top-1/4 -right-40 w-80 h-80 bg-gradient-to-br from-[#6B3FA0]/20 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -left-40 w-80 h-80 bg-gradient-to-br from-[#2BAE66]/15 to-transparent rounded-full blur-3xl"
          animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-[#F5ECFA]/40 to-[#6B3FA0]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <Card
          className="border-0 shadow-xl bg-white/95 backdrop-blur-sm"
          style={{ boxShadow: '0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.08)' }}
        >
          <CardContent className="p-8">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-col items-center mb-6"
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity mb-4"
                      onClick={onLogoClick}
                      title="Triple-click for developer access"
                    >
                      <img src={carefolioLogo} alt="Carefolio" className="w-10 h-10" />
                      <h1
                        style={{
                          fontFamily: "'Figtree', system-ui, sans-serif",
                          fontSize: '28px',
                          fontWeight: 600,
                          lineHeight: '1.2',
                        }}
                      >
                        <span style={{ color: '#6B3FA0' }}>Care</span>
                        <span style={{ color: '#2BAE66' }}>folio</span>
                      </h1>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#6B3FA0] to-[#2BAE66] rounded-full mb-6" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <h2
                      className="mb-2"
                      style={{
                        fontFamily: "'Figtree', system-ui, sans-serif",
                        fontSize: '24px',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        lineHeight: '1.25',
                      }}
                    >
                      Get Early Access
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '15px',
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                        lineHeight: '1.5',
                      }}
                    >
                      Join the investors who care about where their money grows
                    </p>
                  </motion.div>
                </div>

                {/* What early access includes */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="rounded-xl p-4 mb-6"
                  style={{ backgroundColor: '#F5ECFA', border: '1px solid rgba(107, 63, 160, 0.15)' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: '#6B3FA0' }}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p
                        className="mb-2"
                        style={{
                          fontFamily: "'Inter', system-ui, sans-serif",
                          fontSize: '14px',
                          fontWeight: 500,
                          color: '#6B3FA0',
                        }}
                      >
                        Early access includes
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          'Care Index scores for S&P 500 companies',
                          'Portfolio builder with care-weighted analysis',
                          'Weekly care insights newsletter',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Heart
                              className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                              style={{ color: '#6B3FA0' }}
                            />
                            <span
                              style={{
                                fontFamily: "'Inter', system-ui, sans-serif",
                                fontSize: '13px',
                                fontWeight: 400,
                                color: 'var(--text-secondary)',
                                lineHeight: '1.4',
                              }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => {
                          setName(e.target.value);
                          if (formErrors.name) setFormErrors(prev => ({ ...prev, name: undefined }));
                        }}
                        className={`pl-12 h-12 bg-white border-2 rounded-xl transition-all duration-200 focus:border-[#6B3FA0] focus:ring-2 focus:ring-[#6B3FA0]/20 ${formErrors.name ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="What should we call you?"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '16px', fontWeight: 400 }}
                      />
                    </div>
                    {formErrors.name && (
                      <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', fontWeight: 400, color: '#DC2626' }}>
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => {
                          setEmail(e.target.value);
                          if (formErrors.email) setFormErrors(prev => ({ ...prev, email: undefined }));
                        }}
                        className={`pl-12 h-12 bg-white border-2 rounded-xl transition-all duration-200 focus:border-[#6B3FA0] focus:ring-2 focus:ring-[#6B3FA0]/20 ${formErrors.email ? 'border-red-500' : 'border-gray-200'}`}
                        placeholder="you@example.com"
                        style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '16px', fontWeight: 400 }}
                      />
                    </div>
                    {formErrors.email && (
                      <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: '13px', fontWeight: 400, color: '#DC2626' }}>
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Interests */}
                  <div className="space-y-3">
                    <label
                      style={{
                        fontFamily: "'Inter', system-ui, sans-serif",
                        fontSize: '14px',
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                      }}
                    >
                      What matters most to you?{' '}
                      <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>(optional)</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {INTEREST_OPTIONS.map(opt => {
                        const selected = interests.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => toggleInterest(opt.id)}
                            className="flex items-center gap-2 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 text-left"
                            style={{
                              backgroundColor: selected ? '#F5ECFA' : 'white',
                              borderColor: selected ? '#6B3FA0' : '#E5E7EB',
                              fontFamily: "'Inter', system-ui, sans-serif",
                              fontSize: '13px',
                              fontWeight: selected ? 500 : 400,
                              color: selected ? '#6B3FA0' : 'var(--text-secondary)',
                            }}
                          >
                            <span>{opt.emoji}</span>
                            <span className="truncate">{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #6B3FA0 0%, #8B5FBF 100%)',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '16px',
                      fontWeight: 500,
                      boxShadow: '0 4px 12px rgba(107, 63, 160, 0.3)',
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span>Request Early Access</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </Button>

                  <p
                    className="text-center"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                      lineHeight: '1.4',
                    }}
                  >
                    No spam. Just care-focused insights and early product access.
                  </p>
                </motion.form>

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  className="mt-8 pt-6 border-t border-gray-100 text-center"
                >
                  <button
                    onClick={onNavigateToLanding}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#6B3FA0',
                    }}
                  >
                    ← Back to Home
                  </button>
                </motion.div>
              </>
            ) : (
              /* ───── Success State ───── */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: '#E9F7EF' }}
                >
                  <CheckCircle className="w-8 h-8" style={{ color: '#2BAE66' }} />
                </motion.div>

                <h2
                  className="mb-2"
                  style={{
                    fontFamily: "'Figtree', system-ui, sans-serif",
                    fontSize: '24px',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: '1.25',
                  }}
                >
                  You're on the list, {name}!
                </h2>
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '15px',
                    fontWeight: 400,
                    color: 'var(--text-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  We'll send early access details to your inbox. Redirecting you to complete signup...
                </p>

                <div className="flex items-center justify-center gap-2 mb-8">
                  <Leaf className="w-4 h-4" style={{ color: '#2BAE66' }} />
                  <span
                    style={{
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '13px',
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Growing a garden of care-focused companies
                  </span>
                </div>

                <button
                  onClick={onNavigateToLanding}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-50"
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#6B3FA0',
                  }}
                >
                  ← Explore Carefolio
                </button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #6B3FA0 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>
    </div>
  );
}