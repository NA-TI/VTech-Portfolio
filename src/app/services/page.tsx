"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useContent } from "@/hooks/useContent";
import { companyInfo } from "@/config/company-info";

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
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
              className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-gray-950 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${service.color} text-white flex items-center justify-center text-xl`}>{service.icon}</div>
                <div>
                  <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">{service.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base">{service.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {service.features.slice(0, 6).map((feature: string, i: number) => (
                  <span key={i} className="text-xs md:text-sm px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-gray-800/60">
                    {feature}
                  </span>
                ))}
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-white hover:opacity-80">
                Start a project
                <ArrowRightIcon />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 to-cyan-600 text-white p-10 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{servicesContent.cta.title}</h3>
          <p className="text-white/90 mb-6">Tell us your goals. Well propose a phased plan with clear milestones, budget ranges, and timelines.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Get a free consultation
            <ArrowRightIcon />
          </Link>
        </div>
      </section>
    </main>
  );
}


