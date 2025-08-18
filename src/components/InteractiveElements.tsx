"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InteractiveCardProps {
  title: string;
  description: string;
  icon: string;
  details: string[];
  color: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  title,
  description,
  icon,
  details,
  color,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50 h-full flex flex-col">
        {/* Icon */}
        <motion.div
          className="flex items-center justify-center w-16 h-16 rounded-2xl mb-4 text-3xl mx-auto bg-gradient-to-br from-vtech-cyan-50 to-vtech-purple-50 dark:from-vtech-cyan-900/20 dark:to-vtech-purple-900/20"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-4 leading-relaxed flex-1">
          {description}
        </p>

        {/* Interactive Details */}
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
                      <span className="w-1.5 h-1.5 rounded-full bg-vtech-cyan-500 mr-2" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover Indicator */}
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-vtech-cyan-600 dark:text-vtech-cyan-400 font-medium"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          Hover for details
        </motion.div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-vtech-cyan-500/5 to-vtech-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

interface InteractiveElementsProps {
  className?: string;
}

const InteractiveElements: React.FC<InteractiveElementsProps> = ({
  className = "",
}) => {
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
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <InteractiveCard {...card} />
        </motion.div>
      ))}
    </div>
  );
};

export default InteractiveElements;
