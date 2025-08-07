"use client";
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform-gpu z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />
      
      {/* Circular progress indicator (bottom right) */}
      <CircularProgress />
    </>
  );
}

function CircularProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = scrollPx / winHeightPx;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', updateScrollProgress);
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  const circumference = 2 * Math.PI * 20; // radius = 20
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollProgress * circumference);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: scrollProgress > 0.1 ? 1 : 0,
        scale: scrollProgress > 0.1 ? 1 : 0 
      }}
      className="fixed bottom-8 right-8 z-40"
    >
      <div className="relative w-14 h-14 cursor-pointer group"
           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        {/* Background circle */}
        <svg className="w-14 h-14 transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-gray-300 dark:text-gray-600"
          />
          {/* Progress circle */}
          <circle
            cx="28"
            cy="28"
            r="20"
            stroke="url(#gradient)"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Up arrow icon */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 dark:text-gray-400 group-hover:text-purple-500 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </div>
        
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-700 dark:text-gray-300 group-hover:text-purple-500 transition-colors pointer-events-none">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </motion.div>
  );
} 