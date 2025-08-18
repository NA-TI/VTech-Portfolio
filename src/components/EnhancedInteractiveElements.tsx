"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAnime } from "../hooks/useAnime";

interface EnhancedInteractiveCardProps {
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
  index: number;
}

const EnhancedInteractiveCard: React.FC<EnhancedInteractiveCardProps> = ({
  title,
  description,
  icon,
  details,
  color,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const { animate, timeline, stagger, random, isLoaded } = useAnime();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isLoaded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Trigger entrance animation
          const tl = timeline();
          if (tl) {
            tl.add({
              targets: cardRef.current,
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              duration: 800,
              delay: index * 200,
              easing: "easeOutBack",
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isClient, index, timeline]);

  const handleHoverStart = () => {
    if (!isClient || !isLoaded) return;

    setIsHovered(true);

    // Enhanced hover animations
    const tl = timeline();
    if (!tl) return;

    // Icon animation
    tl.add({
      targets: iconRef.current,
      rotate: [0, 360],
      scale: [1, 1.2],
      duration: 600,
      easing: "easeOutElastic(1, 0.5)",
    }).add(
      {
        targets: ".card-particle",
        opacity: [0, 1],
        scale: [0, 1],
        translateX: () => random(-30, 30),
        translateY: () => random(-30, 30),
        duration: 400,
        delay: stagger(50),
        easing: "easeOutBack",
      },
      "-=300"
    );

    // Continuous floating animation for particles
    animate(".card-particle", {
      translateX: () => random(-10, 10),
      translateY: () => random(-10, 10),
      scale: () => random(0.8, 1.2),
      duration: () => random(2000, 4000),
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  };

  const handleHoverEnd = () => {
    if (!isClient || !isLoaded) return;

    setIsHovered(false);

    // Reset animations
    animate(iconRef.current, {
      rotate: 0,
      scale: 1,
      duration: 400,
      easing: "easeOutQuart",
    });

    animate(".card-particle", {
      opacity: 0,
      scale: 0,
      duration: 300,
      easing: "easeInQuart",
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      className="relative group cursor-pointer opacity-0"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50 h-full flex flex-col overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="card-particle absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Icon */}
        <motion.div
          ref={iconRef}
          className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl mx-auto bg-gradient-to-br from-vtech-cyan-50 to-vtech-purple-50 dark:from-vtech-cyan-900/20 dark:to-vtech-purple-900/20 relative overflow-hidden"
        >
          {/* Icon background animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 transform scale-0 group-hover:scale-100 transition-transform duration-500" />
          <span className="relative z-10">{icon}</span>
        </motion.div>

        {/* Title with animated underline */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center relative">
          {title}
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400"
            animate={{ width: isHovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4 leading-relaxed flex-1">
          {description}
        </p>

        {/* Interactive Details with enhanced animations */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Key Features
                </h4>
                <ul className="space-y-1">
                  {details.map((detail, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                    >
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-vtech-cyan-500 mr-2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced Hover Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-vtech-cyan-600 dark:text-vtech-cyan-400 font-medium"
          animate={{
            opacity: isHovered ? 0 : 1,
            y: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          Hover for details
        </motion.div>
      </div>

      {/* Enhanced Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-vtech-cyan-500/5 to-vtech-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
    </motion.div>
  );
};

interface EnhancedInteractiveElementsProps {
  className?: string;
}

const EnhancedInteractiveElements: React.FC<
  EnhancedInteractiveElementsProps
> = ({ className = "" }) => {
  const interactiveCards = [
    {
      title: "Real-time Analytics",
      description: "Live performance monitoring and insights",
      icon: "📊",
      details: [
        "Real-time data visualization",
        "Custom dashboard creation",
        "Performance alerts",
        "Export capabilities",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI-Powered Insights",
      description: "Machine learning for predictive analytics",
      icon: "🤖",
      details: [
        "Predictive modeling",
        "Pattern recognition",
        "Automated reporting",
        "Smart recommendations",
      ],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Cloud Integration",
      description: "Seamless cloud infrastructure management",
      icon: "☁️",
      details: [
        "Multi-cloud support",
        "Auto-scaling",
        "Cost optimization",
        "Security compliance",
      ],
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className={`grid md:grid-cols-3 gap-6 lg:gap-8 ${className}`}>
      {interactiveCards.map((card, index) => (
        <EnhancedInteractiveCard key={card.title} {...card} index={index} />
      ))}
    </div>
  );
};

export default EnhancedInteractiveElements;
