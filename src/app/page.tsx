"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePerformance } from '@/hooks/usePerformance';
import { companyInfo } from '@/config/company-info';


// --- Icons ---

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M14.449 13.5h-13.449v-3h13.449l-4.449-4.449 2.121-2.121 7.879 7.879-7.879 7.879-2.121-2.121z"/>
  </svg>
);

// Skills Icons
const WebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const GraphicsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 5 4 4L7 21l-4-4 12-12"/>
    <path d="m13 7 4 4L5 23l-4-4 12-12"/>
  </svg>
);

const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const BehanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.74 16.35c0 .14.09.26.2.36.14.12.33.18.55.18h1.78V18h-1.87c-.51 0-.94-.19-1.28-.57-.34-.38-.52-.85-.52-1.42V10.5c0-.57.18-1.04.52-1.42.34-.38.77-.57 1.28-.57H22.77V9h-1.78c-.22 0-.41.06-.55.18-.11.1-.2.22-.2.36v1.25h2.53v1.11h-2.53v4.45zM0 4.5h6.47c1.27 0 2.27.3 3 .9.73.6 1.1 1.5 1.1 2.7 0 .7-.2 1.3-.6 1.8-.4.5-.9.8-1.5 1v.1c.8.2 1.4.6 1.8 1.2.4.6.6 1.3.6 2.1 0 1.3-.4 2.3-1.2 3-.8.7-1.9 1.1-3.3 1.1H0V4.5zm2.5 4.4h3.5c.6 0 1.1-.1 1.4-.4.3-.3.5-.7.5-1.2s-.2-.9-.5-1.2c-.3-.3-.8-.4-1.4-.4H2.5v3.2zm0 5.7h3.8c.7 0 1.2-.2 1.6-.5.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-.9-.5-1.6-.5H2.5v3.8zM10.7 2.5h8.3v1.5h-8.3V2.5z"/>
  </svg>
);

const DribbbleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.825 2.218 4.133 2.266 6.638-.87-.184-1.938-.383-3.16-.383-1.064 0-2.075.138-2.915.334-.123-.3-.246-.6-.384-.899 1.456-.6 2.677-1.335 3.662-2.076.522-.392 1.002-.823 1.531-1.614zm-1.043-1.617c-.708 1.086-1.456 1.94-2.262 2.677-.955.874-2.051 1.548-3.282 2.023-.415-.855-.876-1.71-1.383-2.517-.415-.661-.876-1.276-1.383-1.848.923-.415 1.94-.738 3.051-.923 1.064-.177 2.167-.223 3.235-.092.445.046.876.123 1.317.231.246.046.492.108.738.177l.415.1c.046.015.092.046.138.062.046.015.092.046.138.062.046.015.092.046.138.062zm-8.217 1.04c.646.708 1.225 1.487 1.733 2.336.415.692.8 1.425 1.133 2.189-.692-.046-1.456-.092-2.266-.092-1.456 0-2.82.185-4.053.477-.092-.784-.138-1.594-.138-2.428 0-1.456.277-2.843.8-4.137.508-.015 1.04-.046 1.594-.123.615-.092 1.225-.215 1.825-.369.123-.031.246-.077.369-.123z"/>
  </svg>
);

// Icon mapping for skills
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case 'web':
      return <WebIcon />;
    case 'graphics':
      return <GraphicsIcon />;
    case '3d':
      return <CubeIcon />;
    default:
      return <WebIcon />;
  }
};

// Client-side only floating elements for background
const FloatingElements = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-slate-400 to-cyan-400 rounded-full opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Initialize performance monitoring
  usePerformance();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Company information
  const displayName = companyInfo.name;
  const displayTitle = companyInfo.tagline;
  const displayBio = companyInfo.bio;
  const isAvailable = companyInfo.available;
  const avatarUrl = companyInfo.logo || '/window.svg';
  const socialLinks = companyInfo.social;
  const userSkills = companyInfo.services.slice(0, 3).map(service => service.title.replace(' Development', '').replace(' Solutions', ''));
  
  // Create dynamic subtitle from services
  const displaySubtitle = userSkills.length > 0 
    ? userSkills.join(' • ') 
    : 'Software Development • Cloud Solutions • Digital Innovation';

  // Define the words for FlipWords animation
  const titleWords = ['Software Solutions', 'Digital Innovation', 'Tech Excellence'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="radial-spotlight"></div>
        <div className="max-w-6xl mx-auto text-center">
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 dark:bg-green-400/10 border border-green-500/20 dark:border-green-400/20 rounded-full mb-8"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-medium text-green-700 dark:text-green-400">
              Ready for new projects
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Build <span className="bg-gradient-to-r from-slate-800 via-cyan-500 to-orange-500 bg-clip-text text-transparent">
                Better
              </span> Software
                  </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              We craft custom software solutions that scale with your business. 
              From web applications to cloud infrastructure.
            </p>
                </motion.div>

          {/* Primary CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="px-8 py-4 bg-gradient-to-r from-slate-800 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                Start Your Project
                      <ArrowRightIcon />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/portfolio" className="px-8 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 flex items-center gap-2">
                View Our Work
                      <ArrowRightIcon />
                    </Link>
                  </motion.div>
                </motion.div>

          {/* Social Proof - Company Stats */}
                <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {companyInfo.stats.slice(0, 4).map((stat, index) => (
                        <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                  </div>
                </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
                
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
                <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              What We <span className="font-bold bg-gradient-to-r from-slate-800 to-cyan-500 bg-clip-text text-transparent">
                Build
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Three core areas where we excel
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Applications",
                description: "Full-stack web apps built for scale and performance",
                icon: "🌐",
                technologies: ["React", "Node.js", "TypeScript"]
              },
              {
                title: "Mobile Solutions", 
                description: "Native and cross-platform mobile applications",
                icon: "📱",
                technologies: ["React Native", "Flutter", "Swift"]
              },
              {
                title: "Cloud Infrastructure",
                description: "Scalable cloud architecture and DevOps automation",
                icon: "☁️",
                technologies: ["AWS", "Docker", "Kubernetes"]
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-slate-800 to-cyan-500 flex items-center justify-center text-white text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {service.technologies.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  </div>
                </motion.div>
            ))}
              </div>

          {/* Simple CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Need something custom? We build exactly what you need.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-800 to-cyan-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                Discuss Your Project
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Trusted by <span className="font-bold bg-gradient-to-r from-slate-800 to-cyan-500 bg-clip-text text-transparent">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here's what our clients say about working with us
            </p>
          </motion.div>
            
          <div className="grid md:grid-cols-3 gap-8">
            {companyInfo.testimonials.map((testimonial, index) => (
            <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-200/50 dark:border-gray-800/50 h-full">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm mr-4">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white text-sm">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.title}, {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
                
            {/* Capabilities & Certifications */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
                <motion.div
            initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Enterprise <span className="font-bold bg-gradient-to-r from-slate-800 to-cyan-500 bg-clip-text text-transparent">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Proven expertise in delivering mission-critical solutions at scale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Cloud Architecture",
                capability: "Multi-cloud deployment strategies",
                metrics: "99.9% uptime SLA",
                icon: "☁️",
                description: "Design and implement resilient, auto-scaling cloud infrastructure across AWS, Azure, and GCP platforms."
              },
              {
                title: "DevOps & Security",
                capability: "CI/CD pipeline automation",
                metrics: "50% faster deployments",
                icon: "🔒",
                description: "Implement secure development practices with automated testing, deployment, and infrastructure-as-code."
              },
              {
                title: "Performance Engineering",
                capability: "High-traffic system optimization",
                metrics: "10M+ requests/hour",
                icon: "⚡",
                description: "Build systems that handle enterprise-scale traffic with sub-second response times and fault tolerance."
              },
              {
                title: "Data Engineering",
                capability: "Real-time analytics pipelines",
                metrics: "Petabyte-scale processing",
                icon: "📊",
                description: "Design data architectures for business intelligence, machine learning, and real-time decision making."
              },
              {
                title: "API Development",
                capability: "Microservices architecture",
                metrics: "99.95% availability",
                icon: "🔗",
                description: "Build scalable, versioned APIs with comprehensive documentation and robust authentication systems."
              },
              {
                title: "Quality Assurance",
                capability: "Automated testing frameworks",
                metrics: "95% code coverage",
                icon: "✅",
                description: "Implement comprehensive testing strategies including unit, integration, and end-to-end automation."
              }
            ].map((capability, index) => (
                <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-700 to-cyan-500 flex items-center justify-center text-white text-xl">
                    {capability.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {capability.title}
                  </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {capability.capability}
                    </p>
                    <div className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs font-medium">
                      {capability.metrics}
                    </div>
                  </div>
                  </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {capability.description}
                </p>
                </motion.div>
              ))}
            </div>

          {/* Why Choose VTech */}
                <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose VTech?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We may be growing, but our commitment to excellence is unwavering
              </p>
                  </div>
                  
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Our Principles */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Development Principles</h4>
                <div className="space-y-4">
                  {[
                    { icon: "🎯", title: "Code Quality", desc: "Clean, maintainable, well-documented code" },
                    { icon: "🔐", title: "Security First", desc: "Built-in security from day one" },
                    { icon: "👥", title: "User-Centric", desc: "Every feature designed with users in mind" },
                    { icon: "🚀", title: "Agile Delivery", desc: "Fast iterations with continuous feedback" }
                  ].map((principle, index) => (
                    <div key={principle.title} className="flex items-start gap-3">
                      <div className="text-lg">{principle.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{principle.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{principle.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
                  </div>
                  
              {/* Right: Our Commitments */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Our Commitments</h4>
                <div className="space-y-4">
                  {[
                    { icon: "📞", title: "Direct Communication", desc: "Talk directly with developers, not account managers" },
                    { icon: "⏰", title: "Transparent Timeline", desc: "Honest project estimates and regular updates" },
                    { icon: "💰", title: "Fair Pricing", desc: "No hidden costs, competitive rates for quality work" },
                    { icon: "🔧", title: "Post-Launch Support", desc: "We don't disappear after project completion" }
                  ].map((commitment, index) => (
                    <div key={commitment.title} className="flex items-start gap-3">
                      <div className="text-lg">{commitment.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">{commitment.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{commitment.desc}</div>
                      </div>
                    </div>
                    ))}
                  </div>
              </div>
            </div>
          </motion.div>
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
          <div className="bg-gradient-to-r from-slate-800 via-cyan-600 to-orange-500 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Partner with VTech to build scalable software solutions that drive growth and innovation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                    Get Free Consultation
                    <ArrowRightIcon />
                  </Link>
                </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                  <Link href="/portfolio" className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20">
                    View Case Studies
                  <ArrowRightIcon />
                </Link>
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
