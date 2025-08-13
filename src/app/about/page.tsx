"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useContent } from "@/hooks/useContent";
import { companyInfo } from "@/config/company-info";

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 12 2 2 4-4"/>
    <circle cx="12" cy="12" r="10"/>
  </svg>
);

export default function AboutPage() {
  const { content, isLoading } = useContent();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  const aboutContent = content.about;
  const companyContent = content.company;
  
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative px-4 pt-20 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/60 via-cyan-50/40 to-teal-50/30 dark:from-slate-900/30 dark:via-cyan-900/15 dark:to-teal-900/10"></div>
        
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 dark:bg-green-400/10 border border-green-500/20 dark:border-green-400/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-400">
                Building the future of software
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              {aboutContent.hero.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              {aboutContent.hero.description}
            </p>
          </motion.div>
          
          {/* Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {companyInfo.stats.slice(0, 4).map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-8 rounded-3xl bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 hover:border-slate-300/80 dark:hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="text-3xl mb-4">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Sections */}
      {aboutContent.sections && aboutContent.sections.length > 0 && (
        <section className="px-4 py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {aboutContent.sections.map((section, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white/70 dark:bg-gray-950/70 backdrop-blur-md border border-gray-200/60 dark:border-gray-800/60 rounded-2xl p-8 hover:border-slate-300/80 dark:hover:border-gray-600/80 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {section.content}
                  </p>
                  {section.image && (
                    <div className="mt-6">
                      <img 
                        src={section.image} 
                        alt={section.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Company Bio Section */}
      <section className="px-4 py-16 bg-gray-50/40 dark:bg-gray-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About {companyContent.name}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {companyContent.bio}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                📧 {companyContent.email}
              </span>
              {companyContent.phone && (
                <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                  📞 {companyContent.phone}
                </span>
              )}
              <span className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
                📍 {companyContent.address}
              </span>
              {companyContent.available && (
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 rounded-full border border-green-200 dark:border-green-800">
                  ✅ Available for projects
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
