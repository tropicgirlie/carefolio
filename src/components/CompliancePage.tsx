import { motion } from 'motion/react';

interface CompliancePageProps {
  onNavigateToLanding: () => void;
  onNavigateToAbout: () => void;
  onNavigateToInsights: () => void;
  onNavigateToDashboard: () => void;
  onNavigateToLogin: () => void;
  onLogoClick: () => void;
  onLogout: () => void;
  isAuthenticated: boolean;
}

export function CompliancePage({
  onNavigateToLanding,
  onNavigateToAbout,
  onNavigateToInsights,
  onNavigateToDashboard,
  onNavigateToLogin,
  onLogoClick,
  onLogout,
  isAuthenticated
}: CompliancePageProps) {
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
              Compliance
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--fintech-feminine-coral)] to-[var(--fintech-feminine-coral-soft)] mx-auto rounded-full"></div>
          </motion.div>

          {/* Body Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="prose prose-lg mx-auto text-left"
          >
            <p className="body-content text-[var(--text-primary)] leading-relaxed mb-8">
              Carefolio is designed in alignment with GDPR requirements, including clear consent, limited data retention, and user rights to access or delete their information. Our infrastructure follows SOC 2 principles for security and integrity. As the platform expands, we will pursue formal audits and publish the results here.
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