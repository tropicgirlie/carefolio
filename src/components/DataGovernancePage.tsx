import { motion } from 'motion/react';

interface DataGovernancePageProps {
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function DataGovernancePage({
  onNavigateToLanding,
  onNavigateToAbout,
  onNavigateToInsights,
  onNavigateToDashboard,
  onNavigateToLogin,
  onLogoClick,
  onLogout,
  isAuthenticated
}: DataGovernancePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <main className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <h1 className="headline-h1 text-[var(--text-primary)] mb-6">
              Data Governance
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--care-emerald)] to-[var(--care-vibrant-mint)] mx-auto rounded-full"></div>
          </motion.div>

          {/* Body Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg mx-auto text-left"
          >
            <p className="body-content text-[var(--text-primary)] leading-relaxed mb-8">
              Carefolio's Care Index is built from trusted sources including government reports, public health databases, and verified institutional surveys. We update our datasets quarterly and review methodologies with external advisors. All scoring methods are openly documented so results can be understood and challenged.
            </p>
          </motion.div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12"
          >
            <button
              onClick={onNavigateToLanding}
              className="md3-btn-outlined"
            >
              Back to Home
            </button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}