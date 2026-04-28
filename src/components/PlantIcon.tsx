import { motion } from 'motion/react';

interface PlantIconProps {
  plantType: string;
  healthStatus: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function PlantIcon({ plantType, healthStatus, size = 'md', className = '' }: PlantIconProps) {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-6 h-6';
      case 'lg': return 'w-8 h-8';
      case 'xl': return 'w-12 h-12';
      default: return 'w-6 h-6';
    }
  };

  const getHealthColors = () => {
    switch (healthStatus) {
      case 'blooming':
        return {
          primary: 'text-emerald-600',
          secondary: 'text-emerald-400',
          accent: 'text-emerald-500'
        };
      case 'healthy':
        return {
          primary: 'text-green-600',
          secondary: 'text-green-400',
          accent: 'text-green-500'
        };
      case 'wilting':
        return {
          primary: 'text-amber-600',
          secondary: 'text-amber-400',
          accent: 'text-amber-500'
        };
      case 'dying':
        return {
          primary: 'text-red-600',
          secondary: 'text-red-400',
          accent: 'text-red-500'
        };
      default:
        return {
          primary: 'text-gray-600',
          secondary: 'text-gray-400',
          accent: 'text-gray-500'
        };
    }
  };

  const colors = getHealthColors();

  const TreeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M12 22V18M12 18C12 16.5 10.5 15 9 15C7.5 15 6 16.5 6 18M12 18C12 16.5 13.5 15 15 15C16.5 15 18 16.5 18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        className={colors.primary}
        animate={healthStatus === 'blooming' ? { pathLength: [0.8, 1, 0.8] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle
        cx="12"
        cy="10"
        r="6"
        fill="currentColor"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.circle
        cx="12"
        cy="10"
        r="4"
        fill="currentColor"
        className={colors.primary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
    </svg>
  );

  const FlowerIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M12 22V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={colors.primary}
      />
      <motion.g
        animate={healthStatus === 'blooming' ? { rotate: [0, 5, -5, 0] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ transformOrigin: '12px 10px' }}
      >
        <motion.circle cx="12" cy="6" r="3" fill="currentColor" className={colors.accent} />
        <motion.circle cx="8" cy="10" r="3" fill="currentColor" className={colors.accent} />
        <motion.circle cx="16" cy="10" r="3" fill="currentColor" className={colors.accent} />
        <motion.circle cx="10" cy="14" r="3" fill="currentColor" className={colors.accent} />
        <motion.circle cx="14" cy="14" r="3" fill="currentColor" className={colors.accent} />
        <motion.circle
          cx="12"
          cy="10"
          r="2"
          fill="currentColor"
          className={colors.primary}
          animate={healthStatus === 'blooming' ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.g>
    </svg>
  );

  const SucculentIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M12 22V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={colors.primary}
      />
      <motion.rect
        x="9"
        y="8"
        width="6"
        height="10"
        rx="3"
        fill="currentColor"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { scaleY: [1, 1.05, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.ellipse
        cx="12"
        cy="6"
        rx="4"
        ry="2"
        fill="currentColor"
        className={colors.primary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
    </svg>
  );

  const VineIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M4 12C4 12 8 8 12 12C16 16 20 12 20 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={colors.primary}
        animate={healthStatus === 'blooming' ? { pathLength: [0.7, 1, 0.7] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.circle cx="6" cy="10" r="1.5" fill="currentColor" className={colors.accent} />
      <motion.circle cx="12" cy="14" r="1.5" fill="currentColor" className={colors.accent} />
      <motion.circle cx="18" cy="10" r="1.5" fill="currentColor" className={colors.accent} />
    </svg>
  );

  const ShrubIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M12 22V18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={colors.primary}
      />
      <motion.circle
        cx="8"
        cy="12"
        r="4"
        fill="currentColor"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 2.8, repeat: Infinity }}
      />
      <motion.circle
        cx="16"
        cy="12"
        r="4"
        fill="currentColor"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.03, 1] } : {}}
        transition={{ duration: 2.8, repeat: Infinity, delay: 0.5 }}
      />
      <motion.circle
        cx="12"
        cy="8"
        r="3"
        fill="currentColor"
        className={colors.primary}
        animate={healthStatus === 'blooming' ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2.3, repeat: Infinity, delay: 0.2 }}
      />
    </svg>
  );

  const SeedlingIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" className={`${getSizeClasses()} ${className}`}>
      <motion.path
        d="M12 22V16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={colors.primary}
      />
      <motion.path
        d="M12 16C12 14 10 12 8 12C6 12 4 14 4 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { pathLength: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.path
        d="M12 16C12 14 14 12 16 12C18 12 20 14 20 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        className={colors.secondary}
        animate={healthStatus === 'blooming' ? { pathLength: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
    </svg>
  );

  const plantComponents = {
    tree: TreeIcon,
    flower: FlowerIcon,
    succulent: SucculentIcon,
    vine: VineIcon,
    shrub: ShrubIcon,
    seedling: SeedlingIcon
  };

  const PlantComponent = plantComponents[plantType as keyof typeof plantComponents] || SeedlingIcon;

  return <PlantComponent />;
}