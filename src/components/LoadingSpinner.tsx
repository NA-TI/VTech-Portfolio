"use client";
import { motion } from 'framer-motion';
import GhostLoader from './GhostLoader';

interface LoadingSpinnerProps {
  variant?: 'dots' | 'circle' | 'pulse' | 'grid' | 'wave' | 'ghost' | 'ghost-minimal' | 'ghost-glow' | 'ghost-neon' | 'ghost-gradient' | 'ghost-cosmic' | 'ghost-fire' | 'ghost-ice';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  interactive?: boolean;
}

export default function LoadingSpinner({ 
  variant = 'ghost', 
  size = 'md',
  className = '',
  speed = 'normal',
  interactive = false
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const baseClass = `${sizeClasses[size]} ${className}`;

  // Handle GhostLoader variants
  if (variant.startsWith('ghost-')) {
    const ghostVariant = variant.replace('ghost-', '') as 'default' | 'minimal' | 'glow' | 'neon' | 'gradient' | 'cosmic' | 'fire' | 'ice';
    return <GhostLoader size={size} variant={ghostVariant} className={className} speed={speed} interactive={interactive} />;
  }

  switch (variant) {
    case 'dots':
      return <DotsLoader className={baseClass} speed={speed} />;
    case 'pulse':
      return <PulseLoader className={baseClass} speed={speed} />;
    case 'grid':
      return <GridLoader className={baseClass} speed={speed} />;
    case 'wave':
      return <WaveLoader className={baseClass} speed={speed} />;
    case 'ghost':
      return <GhostLoader size={size} className={className} speed={speed} interactive={interactive} />;
    default:
      return <GhostLoader size={size} className={className} speed={speed} interactive={interactive} />;
  }
}

// Spinning circle loader
function CircleLoader({ className, speed }: { className: string; speed: 'slow' | 'normal' | 'fast' }) {
  const speedMultiplier = {
    slow: 2,
    normal: 1,
    fast: 0.5
  };

  return (
    <motion.div
      className={`${className} rounded-full border-2 border-gray-200 dark:border-gray-700`}
      style={{
        borderTopColor: 'rgb(59, 130, 246)', // blue-500
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1 * speedMultiplier[speed],
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// Bouncing dots loader
function DotsLoader({ className, speed }: { className: string; speed: 'slow' | 'normal' | 'fast' }) {
  const speedMultiplier = {
    slow: 1.5,
    normal: 1,
    fast: 0.5
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 }
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6 * speedMultiplier[speed],
            repeat: Infinity,
            repeatType: "reverse",
            delay: i * 0.1
          }}
        />
      ))}
    </div>
  );
}

// Pulsing loader
function PulseLoader({ className, speed }: { className: string; speed: 'slow' | 'normal' | 'fast' }) {
  const speedMultiplier = {
    slow: 1.5,
    normal: 1,
    fast: 0.5
  };

  return (
    <motion.div
      className={`${className} bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 1.5 * speedMultiplier[speed],
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Grid loader (9 squares)
function GridLoader({ className, speed }: { className: string; speed: 'slow' | 'normal' | 'fast' }) {
  const speedMultiplier = {
    slow: 1.5,
    normal: 1,
    fast: 0.5
  };

  return (
    <div className={`grid grid-cols-3 gap-1 ${className}`}>
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 1.2 * speedMultiplier[speed],
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
          style={{ aspectRatio: '1' }}
        />
      ))}
    </div>
  );
}

// Wave loader
function WaveLoader({ className, speed }: { className: string; speed: 'slow' | 'normal' | 'fast' }) {
  const speedMultiplier = {
    slow: 1.5,
    normal: 1,
    fast: 0.5
  };

  return (
    <div className={`flex items-end space-x-1 ${className}`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
          animate={{
            height: ["20%", "100%", "20%"]
          }}
          transition={{
            duration: 1 * speedMultiplier[speed],
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Page transition loader
export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center">
        <LoadingSpinner variant="ghost-glow" size="lg" />
        <motion.p
          className="mt-4 text-gray-600 dark:text-gray-400 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Enhanced skeleton loader for content
export function SkeletonLoader({ className = '', lines = 3, variant = 'default' }: { 
  className?: string; 
  lines?: number;
  variant?: 'default' | 'minimal' | 'glow';
}) {
  const variants = {
    default: 'bg-gray-200 dark:bg-gray-700',
    minimal: 'bg-gray-100 dark:bg-gray-800',
    glow: 'bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800'
  };

  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className={`h-4 rounded-md w-full ${variants[variant]}`} />
          {i === lines - 1 && <div className={`h-4 rounded-md w-2/3 ${variants[variant]}`} />}
        </div>
      ))}
    </div>
  );
}

// Enhanced loading card for projects/skills
export function LoadingCard({ variant = 'default' }: { variant?: 'default' | 'minimal' | 'glow' }) {
  const cardVariants = {
    default: 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700',
    minimal: 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800',
    glow: 'bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 border-blue-200 dark:border-blue-800'
  };

  return (
    <div className={`rounded-xl p-6 shadow-sm border ${cardVariants[variant]}`}>
      <div className="animate-pulse">
        <SkeletonLoader className="h-4 w-3/4 mb-3" variant={variant} />
        <SkeletonLoader className="h-3 w-full mb-2" variant={variant} />
        <SkeletonLoader className="h-3 w-2/3 mb-4" variant={variant} />
        <div className="flex gap-2">
          <SkeletonLoader className="h-6 w-16 rounded-full" variant={variant} />
          <SkeletonLoader className="h-6 w-20 rounded-full" variant={variant} />
          <SkeletonLoader className="h-6 w-14 rounded-full" variant={variant} />
        </div>
      </div>
    </div>
  );
}

// Admin-specific loading states
export function AdminLoadingState({ 
  variant = 'ghost-glow', 
  size = 'lg',
  message = 'Loading...',
  showSpinner = true 
}: {
  variant?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showSpinner?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {showSpinner && (
        <div className="mb-4">
          <LoadingSpinner variant={variant as any} size={size} />
        </div>
      )}
      <motion.p
        className="text-gray-600 dark:text-gray-400 font-medium text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {message}
      </motion.p>
    </div>
  );
} 