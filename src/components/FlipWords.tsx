"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}

export default function FlipWords({ 
  words, 
  duration = 3000, 
  className = "" 
}: FlipWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 200);
    }, duration);

    return () => clearInterval(interval);
  }, [words.length, duration]);

  const currentWord = words[currentWordIndex];

  return (
    <div className={`relative inline-block ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWord}
          initial={{ 
            opacity: 0, 
            y: 10,
            filter: "blur(8px)"
          }}
          animate={{ 
            opacity: 1, 
            y: 0,
            filter: "blur(0px)"
          }}
          exit={{ 
            opacity: 0, 
            y: -40,
            x: 40,
            scale: 2,
            filter: "blur(8px)"
          }}
          transition={{
            type: "spring",
            stiffness: isAnimating ? 200 : 150,
            damping: isAnimating ? 20 : 15,
            mass: 0.8
          }}
          className="inline-block"
        >
          {currentWord.split('').map((char, index) => (
            <motion.span
              key={index}
              initial={{ 
                opacity: 0, 
                y: 20,
                filter: "blur(4px)"
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)"
              }}
              transition={{
                delay: index * 0.05,
                duration: 0.3,
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </div>
  );
} 