"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSkills } from "@/hooks/useData";
import { useHSBColors } from "@/hooks/useHSBColors";

// Icons for different skill categories
const SkillIcon = ({ iconName }: { iconName?: string }) => {
  const icons: { [key: string]: string } = {
    react: "⚛️",
    nextjs: "▲",
    nodejs: "🟢",
    python: "🐍",
    postgresql: "🐘",
    aws: "☁️",
    docker: "🐳",
    typescript: "📘",
  };

  return <span className="text-2xl">{icons[iconName || "react"] || "💻"}</span>;
};

export default function SkillsPage() {
  const { data: skillsResponse, isLoading, error } = useSkills();
  const { brandGradients, createStyles } = useHSBColors();

  const skills = skillsResponse?.data || [];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 dark:border-slate-700 border-t-vtech-cyan-500 mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">
              Loading skills...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">
              Failed to load skills. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-6">
              Technical{" "}
              <span className="font-bold text-gradient-vtech-primary">
                Skills
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our comprehensive expertise across modern technologies and
              development practices
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {skills.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-3xl">💻</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                No skills available yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Skills will be displayed here once they are added to the system.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-800/50 overflow-hidden group"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {skill.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                        {skill.category}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-xl bg-${skill.color || "vtech-cyan"} shadow-lg ml-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <SkillIcon iconName={skill.icon} />
                    </div>
                  </div>

                  {/* Proficiency Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Proficiency Level
                      </span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {skill.proficiency}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.proficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                        className={`h-full bg-${skill.color || "vtech-cyan"} rounded-full relative`}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </motion.div>
                    </div>

                    {/* Proficiency Labels */}
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Expert</span>
                    </div>
                  </div>

                  {/* Skill Level Indicator */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Skill Level
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          skill.proficiency >= 80
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : skill.proficiency >= 60
                              ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                              : skill.proficiency >= 40
                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {skill.proficiency >= 80
                          ? "Expert"
                          : skill.proficiency >= 60
                            ? "Advanced"
                            : skill.proficiency >= 40
                              ? "Intermediate"
                              : "Beginner"}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div
            className="rounded-3xl p-12 text-white relative overflow-hidden"
            style={createStyles.gradient(brandGradients.primary)}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Work Together?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Let's discuss how our expertise can help bring your project to
                life
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    Get Started Today
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href="/portfolio"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                  >
                    View Our Work
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  animate={{
                    x: [0, 50, 0],
                    y: [0, -50, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 8 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    left: `${(i * 5) % 100}%`,
                    top: `${(i * 7) % 100}%`,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
