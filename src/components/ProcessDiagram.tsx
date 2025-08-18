"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
}

interface ProcessDiagramProps {
  steps: ProcessStep[];
  className?: string;
}

// Icon mapping component
const IconComponent: React.FC<{ iconName: string; className?: string }> = ({
  iconName,
  className = "w-8 h-8",
}) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    // String-based icons
    briefcase: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
    ),
    rocket: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27l-2.77 6.1zM5.64 12.5l-3.83-1.63 6.1-2.77c-.91 1.36-1.69 2.83-2.27 4.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    clock: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26A6.003 6.003 0 0 0 12 16c-1.66 0-3.14-.68-4.22-1.78L6.29 13.29c-.19-.18-.43-.29-.71-.29H4c-.55 0-1 .45-1 1v6h2v-4h1.59l2.71 2.71c.19.18.43.29.71.29h2.82c.28 0 .52-.11.71-.29L14.41 16H16v4h2z" />
      </svg>
    ),
    brain: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
      </svg>
    ),
    cloud: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
      </svg>
    ),
    search: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
      </svg>
    ),
    palette: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    ),
    code: (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
      </svg>
    ),
    // Emoji-based icons (from content data)
    "🚀": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.13 22.19l-1.63-3.83c1.57-.58 3.04-1.36 4.4-2.27l-2.77 6.1zM5.64 12.5l-3.83-1.63 6.1-2.77c-.91 1.36-1.69 2.83-2.27 4.4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
      </svg>
    ),
    "💎": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    "📱": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" />
      </svg>
    ),
    "📊": (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
  };

  // If it's an emoji and not in our map, render it directly
  if (
    iconName &&
    !iconMap[iconName] &&
    /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u.test(
      iconName
    )
  ) {
    return <span className={className}>{iconName}</span>;
  }

  return <>{iconMap[iconName] || <span className={className}>📊</span>}</>;
};

const ProcessDiagram: React.FC<ProcessDiagramProps> = ({
  steps,
  className = "",
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Return a simplified version during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className={`relative ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Static Step Number */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 text-white font-semibold text-sm flex items-center justify-center z-20 shadow-md">
                {index + 1}
              </div>

              {/* Static Card - Clean Design */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col relative">
                {/* Static Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-3xl mx-auto bg-gradient-to-br from-vtech-cyan-500 to-vtech-purple-500 shadow-lg">
                  <IconComponent
                    iconName={step.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>

                {/* Static Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {step.title}
                </h3>

                {/* Static Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Static Deliverables Section */}
                <div className="space-y-4 flex-1 flex flex-col justify-end">
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-center">
                    Deliverables
                  </h4>
                  <ul className="space-y-2.5">
                    {step.deliverables.map((deliverable, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-600 dark:text-gray-400 flex items-start group/item"
                      >
                        <div className="flex items-center justify-center w-3 h-3 rounded-full bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 mr-3 flex-shrink-0 mt-0.5 shadow-sm">
                          <div className="w-1 h-1 rounded-full bg-white" />
                        </div>
                        <span className="leading-relaxed group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-200">
                          {deliverable}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Professional Connection Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-gray-300 via-vtech-cyan-500 to-vtech-purple-500 transform -translate-y-1/2 hidden lg:block origin-left"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Professional Step Number */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 text-white font-semibold text-sm flex items-center justify-center z-20 shadow-md">
              {index + 1}
            </div>

            {/* Clean Professional Card */}
            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group-hover:scale-105 h-full flex flex-col relative"
            >
              {/* Clean Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-3xl mx-auto bg-gradient-to-br from-vtech-cyan-500 to-vtech-purple-500 shadow-lg"
              >
                <IconComponent
                  iconName={step.icon}
                  className="w-8 h-8 text-white"
                />
              </motion.div>

              {/* Clean Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                <motion.span
                  whileHover={{ color: "hsl(190, 60%, 50%)" }}
                  transition={{ duration: 0.3 }}
                >
                  {step.title}
                </motion.span>
              </h3>

              {/* Clean Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8 leading-relaxed flex-1">
                {step.description}
              </p>

              {/* Clean Deliverables Section */}
              <div className="space-y-4 flex-1 flex flex-col justify-end">
                <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide text-center">
                  <motion.span
                    whileHover={{ color: "hsl(190, 60%, 50%)" }}
                    transition={{ duration: 0.3 }}
                  >
                    Deliverables
                  </motion.span>
                </h4>
                <ul className="space-y-2.5">
                  {step.deliverables.map((deliverable, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className="text-xs text-gray-600 dark:text-gray-400 flex items-start group/item"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center w-3 h-3 rounded-full bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 mr-3 flex-shrink-0 mt-0.5 shadow-sm"
                      >
                        <div className="w-1 h-1 rounded-full bg-white" />
                      </motion.div>
                      <motion.span
                        whileHover={{ color: "hsl(190, 60%, 50%)" }}
                        transition={{ duration: 0.3 }}
                        className="leading-relaxed group-hover/item:text-gray-800 dark:group-hover/item:text-gray-200 transition-colors duration-200"
                      >
                        {deliverable}
                      </motion.span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessDiagram;
