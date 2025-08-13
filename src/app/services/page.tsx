"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { companyInfo } from "@/config/company-info";

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function ServicesPage() {
  const { content, isLoading } = useContent();
  const services = companyInfo.services;

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

  const servicesContent = content.services;

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Header */}
      <section className="px-4 py-16 border-b border-gray-200/60 dark:border-gray-800/60 bg-gray-50/40 dark:bg-gray-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {servicesContent.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {servicesContent.hero.description}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border border-gray-200/60 dark:border-gray-700/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
            >
              {/* Background Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-100/50 dark:to-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Top Decorative Element */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-500`}
              ></div>

              <div className="relative p-8">
                {/* Icon and Title Section */}
                <div className="flex items-start gap-6 mb-6">
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <span className="relative z-10">{service.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                      {service.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {service.features
                    .slice(0, 4)
                    .map((feature: string, i: number) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200/60 dark:border-gray-600/60 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300 hover:scale-105"
                      >
                        {feature}
                      </motion.span>
                    ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center justify-between">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 text-white dark:text-gray-900 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-600 dark:hover:from-gray-100 dark:hover:to-gray-300 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Start a project
                    <ArrowRightIcon />
                  </Link>

                  {/* Service Count Badge */}
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-600 text-white p-10 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {servicesContent.cta.title}
            </h3>
            <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
              Tell us your goals. We'll propose a phased plan with clear
              milestones, budget ranges, and timelines.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get a free consultation
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
