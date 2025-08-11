"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
              We Build <span className="bg-gradient-to-r from-slate-800 via-cyan-600 to-teal-600 bg-clip-text text-transparent">Software</span><br />That Actually Works
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              {companyInfo.bio}
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
    </main>
  );
}
