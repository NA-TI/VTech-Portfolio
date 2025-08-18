"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// Removed hardcoded companyInfo import - now using CMS data
import { useHomepageContent } from "@/hooks/useContent";
import { companyInfo } from "@/config/company-info";
import EnhancedMetrics from "@/components/EnhancedMetrics";
import ProcessDiagram from "@/components/ProcessDiagram";
import EnhancedTestimonials from "@/components/EnhancedTestimonials";
import InteractiveElements from "@/components/InteractiveElements";
import { useHSBColors } from "@/hooks/useHSBColors";
import { useSkills } from "@/hooks/useData";

// --- Icons ---

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M14.449 13.5h-13.449v-3h13.449l-4.449-4.449 2.121-2.121 7.879 7.879-7.879 7.879-2.121-2.121z" />
  </svg>
);

// Skills Icons
const WebIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const GraphicsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 5 4 4L7 21l-4-4 12-12" />
    <path d="m13 7 4 4L5 23l-4-4 12-12" />
  </svg>
);

const CubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const BehanceIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.74 16.35c0 .14.09.26.2.36.14.12.33.18.55.18h1.78V18h-1.87c-.51 0-.94-.19-1.28-.57-.34-.38-.52-.85-.52-1.42V10.5c0-.57.18-1.04.52-1.42.34-.38.77-.57 1.28-.57H22.77V9h-1.78c-.22 0-.41.06-.55.18-.11.1-.2.22-.2.36v1.25h2.53v1.11h-2.53v4.45zM0 4.5h6.47c1.27 0 2.27.3 3 .9.73.6 1.1 1.5 1.1 2.7 0 .7-.2 1.3-.6 1.8-.4.5-.9.8-1.5 1v.1c.8.2 1.4.6 1.8 1.2.4.6.6 1.3.6 2.1 0 1.3-.4 2.3-1.2 3-.8.7-1.9 1.1-3.3 1.1H0V4.5zm2.5 4.4h3.5c.6 0 1.1-.1 1.4-.4.3-.3.5-.7.5-1.2s-.2-.9-.5-1.2c-.3-.3-.8-.4-1.4-.4H2.5v3.2zm0 5.7h3.8c.7 0 1.2-.2 1.6-.5.4-.3.6-.8.6-1.4 0-.6-.2-1.1-.6-1.4-.4-.3-.9-.5-1.6-.5H2.5v3.8zM10.7 2.5h8.3v1.5h-8.3V2.5z" />
  </svg>
);

const DribbbleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0C5.374 0 0 5.374 0 12s5.374 12 12 12 12-5.374 12-12S18.626 0 12 0zm7.568 5.302c1.4 1.825 2.218 4.133 2.266 6.638-.87-.184-1.938-.383-3.16-.383-1.064 0-2.075.138-2.915.334-.123-.3-.246-.6-.384-.899 1.456-.6 2.677-1.335 3.662-2.076.522-.392 1.002-.823 1.531-1.614zm-1.043-1.617c-.708 1.086-1.456 1.94-2.262 2.677-.955.874-2.051 1.548-3.282 2.023-.415-.855-.876-1.71-1.383-2.517-.415-.661-.876-1.276-1.383-1.848.923-.415 1.94-.738 3.051-.923 1.064-.177 2.167-.223 3.235-.092.445.046.876.123 1.317.231.246.046.492.108.738.177l.415.1c.046.015.092.046.138.062.046.015.092.046.138.062.046.015.092.046.138.062zm-8.217 1.04c.646.708 1.225 1.487 1.733 2.336.415.692.8 1.425 1.133 2.189-.692-.046-1.456-.092-2.266-.092-1.456 0-2.82.185-4.053.477-.092-.784-.138-1.594-.138-2.428 0-1.456.277-2.843.8-4.137.508-.015 1.04-.046 1.594-.123.615-.092 1.225-.215 1.825-.369.123-.031.246-.077.369-.123z" />
  </svg>
);

// Icon mapping for skills
const getSkillIcon = (iconName: string) => {
  switch (iconName) {
    case "web":
      return <WebIcon />;
    case "mobile":
      return <GraphicsIcon />; // reuse existing icon if no MobileIcon
    case "ai":
      return <CubeIcon />; // reuse existing icon if no AiIcon
    case "cloud":
      return <WebIcon />; // fallback to web icon for cloud
    case "enterprise":
      return <WebIcon />; // fallback to web icon for enterprise
    default:
      return <WebIcon />;
  }
};

// Enhanced floating elements with better performance
const FloatingElements = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Enhanced floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-vtech-cyan-400/30 to-vtech-purple-400/30 rounded-full"
          animate={{
            x: [0, 150, 0],
            y: [0, -150, 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + i * 8}%`,
          }}
        />
      ))}

      {/* Larger floating elements */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`large-${i}`}
          className="absolute w-4 h-4 bg-gradient-to-r from-vtech-cyan-500/20 to-vtech-purple-500/20 rounded-full blur-sm"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 15}%`,
          }}
        />
      ))}
    </div>
  );
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);
  }, []);

  // Get content from CMS with loading state
  const {
    content: homepageContent,
    company: companyContent,
    isLoading,
    isMounted,
  } = useHomepageContent();

  // Mark content as ready when it's loaded and mounted
  useEffect(() => {
    if (isMounted && !isLoading) {
      const timer = setTimeout(() => {
        setContentReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMounted, isLoading]);

  // HSB Color System - only initialize on client
  const hsBColors = useHSBColors();
  const { brandGradients, brandColors, createStyles } = isClient
    ? hsBColors
    : {
        brandGradients: {},
        brandColors: {},
        createStyles: { gradient: () => ({}) },
      };

  // Company information with CMS fallbacks
  const displayName = companyContent?.name || "VTech Software Solutions";
  const displayTitle =
    companyContent?.tagline || "Building Tomorrow's Software Today";
  const displayBio =
    companyContent?.bio ||
    "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.";
  const isAvailable = companyContent?.available ?? true;
  const avatarUrl = companyContent?.logo || "/window.svg";
  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/vtech-solutions",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/company/vtech-solutions",
      icon: "linkedin",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/vtechsolutions",
      icon: "twitter",
    },
  ];
  // Get skills from database
  const { data: skillsResponse } = useSkills();
  const skills = skillsResponse?.data || [];

  // Extract skill titles for subtitle
  const userSkills =
    skills.length > 0
      ? skills.slice(0, 3).map((skill) => skill.name)
      : ["Web Development", "Mobile Apps", "Cloud Solutions"];

  // Use CMS content or fallback to generated subtitle
  const displaySubtitle =
    homepageContent?.hero?.subtitle ||
    (userSkills.length > 0
      ? userSkills.join(" • ")
      : "Software Development • Cloud Solutions • Digital Innovation");

  // Define the words for FlipWords animation
  const titleWords = [
    "Software Solutions",
    "Digital Innovation",
    "Tech Excellence",
  ];

  // Add refresh function to window for debugging
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).refreshContent = () => {
        console.log("🔄 Manual content refresh triggered");
        window.location.reload();
      };

      // Add a visible refresh button for testing
      (window as any).showRefreshButton = () => {
        const button = document.createElement("button");
        button.textContent = "🔄 Refresh Content";
        button.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 10px 15px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        `;
        button.onclick = () => window.location.reload();
        document.body.appendChild(button);
      };
    }
  }, []);

  // Show loading state until content is ready to prevent flash of old content
  if (!isClient || !contentReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="relative">
              {/* Enhanced spinner */}
              <div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-slate-200 dark:border-slate-700 mx-auto mb-8">
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-transparent border-t-vtech-cyan-500 animate-spin"></div>
                </div>
              </div>

              {/* VTech branding */}
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                VTech
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Loading your experience...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50 dark:from-slate-950 dark:via-black dark:to-slate-900 relative overflow-hidden">
      {/* FloatingElements removed - animated background circles disabled */}

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden">
        {/* Enhanced background effects */}
        <div className="absolute inset-0">
          {/* Radial gradient overlay */}
          <div className="absolute inset-0 bg-radial-gradient opacity-30"></div>

          {/* Animated background shapes removed - circle animations disabled */}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Enhanced Status Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-400/10 dark:to-emerald-400/10 border border-green-500/20 dark:border-green-400/20 rounded-full mb-12 backdrop-blur-sm shadow-lg"
          >
            <div className="relative">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            </div>
            <span className="text-sm font-semibold text-green-700 dark:text-green-400 tracking-wide">
              Ready for new projects
            </span>
          </motion.div>

          {/* Enhanced Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-none">
              {isClient && isMounted && homepageContent?.hero?.title ? (
                <span className="block">
                  {homepageContent.hero.title.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                      className="inline-block mr-4"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ) : (
                <>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="block"
                  >
                    We Build
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="block"
                  >
                    <span
                      className="text-gradient-vtech-software"
                      style={{
                        background:
                          "linear-gradient(90deg, hsl(190, 60%, 50%) 0%, hsl(190, 70%, 60%) 25%, hsl(30, 70%, 50%) 75%, hsl(30, 80%, 60%) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      Software That Actually Works
                    </span>
                  </motion.span>
                </>
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-light max-w-4xl mx-auto leading-relaxed"
            >
              {isClient && isMounted && homepageContent?.hero?.description
                ? homepageContent.hero.description
                : "Founded with a mission to create reliable, scalable software solutions that help businesses thrive in the digital age."}
            </motion.p>
          </motion.div>

          {/* Enhanced Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-32"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Link
                href="/contact"
                className="relative px-8 py-4 text-white rounded-2xl font-semibold text-base shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center gap-3 overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700"
              >
                <span className="relative z-10">
                  {isMounted && homepageContent?.hero?.primaryButton
                    ? homepageContent.hero.primaryButton
                    : "Start Your Project"}
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightIcon />
                </motion.div>
                {/* Enhanced button glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <Link
                href="/portfolio"
                className="relative px-8 py-4 border-2 rounded-2xl font-semibold text-base transition-all duration-500 flex items-center gap-3 overflow-hidden backdrop-blur-sm bg-white/5 hover:bg-white/10 border-gray-300/30 hover:border-gray-300/50 text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white"
              >
                <span className="relative z-10">
                  {isMounted && homepageContent?.hero?.secondaryButton
                    ? homepageContent.hero.secondaryButton
                    : "View Our Work"}
                </span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <ArrowRightIcon />
                </motion.div>
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Metrics Section - Better Positioning */}
      <section className="relative -mt-40 pb-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.1 }}
            className="relative z-20"
          >
            <EnhancedMetrics
              metrics={
                homepageContent?.metrics || [
                  {
                    value: "150",
                    label: "Projects Completed",
                    description:
                      "Successfully delivered projects across various industries",
                    icon: "📊",
                    color: "vtech-cyan",
                    suffix: "+",
                  },
                  {
                    value: "80",
                    label: "Happy Clients",
                    description:
                      "Satisfied clients who trust us with their digital transformation",
                    icon: "😊",
                    color: "vtech-purple",
                    suffix: "+",
                  },
                  {
                    value: "15",
                    label: "Team Members",
                    description:
                      "Expert developers, designers, and strategists",
                    icon: "👥",
                    color: "vtech-teal",
                    suffix: "+",
                  },
                  {
                    value: "4",
                    label: "Years Experience",
                    description: "Building innovative solutions since 2020",
                    icon: "📅",
                    color: "vtech-cyan",
                    suffix: "+",
                  },
                ]
              }
            />
          </motion.div>
        </div>
      </section>

      {/* ULTRA THIN Professional Pull Quote Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        {/* Minimal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-cyan-50/30 dark:from-slate-900/30 dark:via-transparent dark:to-slate-800/20" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Ultra Thin Quote Container */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            {/* Ultra Thin Background */}
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-16 md:p-20 lg:p-24 shadow-sm border border-gray-200/30 dark:border-gray-700/30">
              {/* Ultra Thin Quote Content */}
              <div className="relative z-10 text-center">
                {/* Main Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1.0,
                    delay: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  {/* First Line */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white leading-tight mb-6"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {homepageContent?.promotional?.line1 || "We don't just"}
                    </span>
                  </motion.h2>

                  {/* Second Line */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-5xl md:text-6xl lg:text-7xl font-medium text-cyan-600 dark:text-cyan-400 leading-tight mb-6"
                  >
                    {homepageContent?.promotional?.line2 || "build software"}
                  </motion.h3>

                  {/* Third Line */}
                  <motion.h4
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-700 dark:text-gray-300 leading-tight mb-6"
                  >
                    {homepageContent?.promotional?.line3 ||
                      "—we build solutions that drive"}
                  </motion.h4>

                  {/* Fourth Line */}
                  <motion.h5
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  >
                    <span className="bg-gradient-to-r from-cyan-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                      {homepageContent?.promotional?.line4 ||
                        "measurable business results"}
                    </span>
                  </motion.h5>

                  {/* Ultra Thin Separator */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    whileInView={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1.0, delay: 1.3 }}
                    viewport={{ once: true }}
                    className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto"
                    style={{ maxWidth: "120px" }}
                  />
                </motion.div>

                {/* Ultra Thin Author Section */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center gap-6"
                >
                  {/* Ultra Thin Avatar */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.7 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    {homepageContent?.promotional?.logoImage ? (
                      <img
                        src={homepageContent.promotional.logoImage}
                        alt={
                          homepageContent?.promotional?.companyName ||
                          "VTech Team"
                        }
                        className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-700 shadow-sm"
                        onError={(e) => {
                          // Fallback to default VT icon if image fails to load
                          e.currentTarget.style.display = "none";
                          const vtIcon =
                            e.currentTarget.parentElement?.querySelector(
                              ".vt-fallback"
                            );
                          if (vtIcon) {
                            vtIcon.classList.remove("hidden");
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-sm ${homepageContent?.promotional?.logoImage ? "hidden vt-fallback" : ""}`}
                    >
                      VT
                    </div>
                  </motion.div>

                  {/* Ultra Thin Author Info */}
                  <div className="text-left">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                      viewport={{ once: true }}
                      className="text-xl font-semibold text-gray-900 dark:text-white mb-1"
                    >
                      {homepageContent?.promotional?.companyName ||
                        "VTech Team"}
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                      viewport={{ once: true }}
                      className="text-sm text-cyan-600 dark:text-cyan-400 font-medium"
                    >
                      {homepageContent?.promotional?.tagline ||
                        "Delivering excellence since 2020"}
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Ultra Thin Corner Accents */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.3 }}
                viewport={{ once: true }}
                className="absolute top-4 left-4 w-6 h-6 border-l border-t border-cyan-500/40 rounded-tl-lg"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                viewport={{ once: true }}
                className="absolute top-4 right-4 w-6 h-6 border-r border-t border-purple-500/40 rounded-tr-lg"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.7 }}
                viewport={{ once: true }}
                className="absolute bottom-4 left-4 w-6 h-6 border-l border-b border-purple-500/40 rounded-bl-lg"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 2.9 }}
                viewport={{ once: true }}
                className="absolute bottom-4 right-4 w-6 h-6 border-r border-b border-cyan-500/40 rounded-br-lg"
              />
            </div>

            {/* Ultra Thin Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.1 }}
              viewport={{ once: true }}
              className="flex justify-center space-x-4 mt-8"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3.3,
                }}
                viewport={{ once: true }}
                className="w-2 h-2 rounded-full bg-cyan-500"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3.5,
                }}
                viewport={{ once: true }}
                className="w-2 h-2 rounded-full bg-purple-500"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3.7,
                }}
                viewport={{ once: true }}
                className="w-2 h-2 rounded-full bg-cyan-500"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-vtech-slate-900/10 via-transparent to-vtech-cyan-500/5" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-vtech-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-vtech-cyan-500/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Enhanced Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 dark:text-white mb-6"
            >
              {isMounted && homepageContent?.services?.title ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: homepageContent.services.title.replace(
                      /Build/g,
                      '<span class="font-bold text-gradient-vtech-primary">Build</span>'
                    ),
                  }}
                />
              ) : (
                <>
                  What We{" "}
                  <span className="font-bold text-gradient-vtech-primary">
                    Build
                  </span>
                </>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              {isMounted && homepageContent?.services?.description
                ? homepageContent.services.description
                : "From concept to deployment, we handle every aspect of your software development needs with cutting-edge technologies and proven methodologies."}
            </motion.p>
          </motion.div>

          {/* Enhanced Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Web Applications",
                description:
                  "Full-stack web applications built for scale, performance, and exceptional user experiences",
                icon: "🌐",
                technologies: ["React", "Node.js", "TypeScript"],
                features: [
                  "Progressive Web Apps",
                  "Real-time Features",
                  "SEO Optimized",
                ],
                color: "from-vtech-cyan-500 to-vtech-purple-500",
              },
              {
                title: "Mobile Solutions",
                description:
                  "Native and cross-platform mobile applications that deliver native performance",
                icon: "📱",
                technologies: ["React Native", "Flutter", "Swift"],
                features: [
                  "Cross-platform",
                  "Native Performance",
                  "App Store Ready",
                ],
                color: "from-vtech-purple-500 to-vtech-cyan-500",
              },
              {
                title: "Cloud Infrastructure",
                description:
                  "Scalable cloud architecture and DevOps automation for enterprise-grade solutions",
                icon: "☁️",
                technologies: ["AWS", "Docker", "Kubernetes"],
                features: [
                  "Auto-scaling",
                  "High Availability",
                  "Cost Optimized",
                ],
                color: "from-vtech-cyan-500 to-vtech-purple-500",
              },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Service Card */}
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-800/50 hover:shadow-2xl transition-all duration-500 group-hover:scale-105 h-full flex flex-col relative overflow-hidden">
                  {/* Background Glow Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />

                  {/* Enhanced Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={`w-20 h-20 rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-6 bg-gradient-to-br ${service.color} shadow-lg relative z-10`}
                  >
                    {service.icon}
                    {/* Icon Glow */}
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.color} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}
                    />
                  </motion.div>

                  {/* Service Title */}
                  <motion.h3
                    whileHover={{ color: "hsl(190, 60%, 50%)" }}
                    transition={{ duration: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center relative z-10"
                  >
                    {service.title}
                  </motion.h3>

                  {/* Service Description */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6 text-center flex-1 relative z-10">
                    {service.description}
                  </p>

                  {/* Enhanced Technology Tags */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6 relative z-10">
                    {service.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: techIndex * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="text-xs px-4 py-2 bg-gradient-to-r from-vtech-cyan-50 to-vtech-purple-50 dark:from-vtech-cyan-900/30 dark:to-vtech-purple-900/30 text-vtech-cyan-700 dark:text-vtech-cyan-300 rounded-full font-medium border border-vtech-cyan-200/50 dark:border-vtech-cyan-700/50 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 relative z-10">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: featureIndex * 0.1,
                        }}
                        viewport={{ once: true }}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-vtech-cyan-500 mr-3 flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-vtech-cyan-500/30 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-vtech-purple-500/30 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-vtech-cyan-500/30 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-vtech-purple-500/30 rounded-br-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              {isMounted && homepageContent?.services?.ctaText
                ? homepageContent.services.ctaText
                : "Ready to bring your vision to life? Let's discuss your project and create something extraordinary together."}
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-3 text-white rounded-xl font-semibold text-base hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-500 hover:from-vtech-cyan-600 hover:to-vtech-purple-600 relative overflow-hidden group"
              >
                <span className="relative z-10">Discuss Your Project</span>
                <motion.div
                  className="ml-3 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowRightIcon />
                </motion.div>
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-vtech-cyan-500/20 to-vtech-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Development Process Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Our{" "}
              <span className="font-bold text-gradient-vtech-primary">
                Development Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A proven methodology that ensures quality, transparency, and
              successful project delivery
            </p>
          </motion.div>

          <ProcessDiagram
            steps={
              homepageContent?.processSteps || [
                {
                  id: "discovery",
                  title: "Discovery & Planning",
                  description:
                    "We analyze your requirements and create a comprehensive project roadmap",
                  icon: "🔍",
                  deliverables: [
                    "Requirements document",
                    "Technical specification",
                    "Project timeline",
                    "Resource allocation",
                  ],
                },
                {
                  id: "design",
                  title: "Design & Prototyping",
                  description:
                    "Create user-centered designs and interactive prototypes",
                  icon: "🎨",
                  deliverables: [
                    "UI/UX designs",
                    "Interactive prototypes",
                    "Design system",
                    "User flows",
                  ],
                },
                {
                  id: "development",
                  title: "Development & Testing",
                  description:
                    "Build robust solutions with continuous testing and quality assurance",
                  icon: "💻",
                  deliverables: [
                    "Working application",
                    "Unit tests",
                    "Integration tests",
                    "Performance optimization",
                  ],
                },
                {
                  id: "deployment",
                  title: "Deployment & Support",
                  description:
                    "Launch your solution and provide ongoing maintenance and support",
                  icon: "🚀",
                  deliverables: [
                    "Production deployment",
                    "User training",
                    "Documentation",
                    "Support plan",
                  ],
                },
              ]
            }
          />
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Advanced{" "}
              <span className="font-bold text-gradient-vtech-primary">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our cutting-edge capabilities that set us apart from the
              competition
            </p>
          </motion.div>

          <InteractiveElements />
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              Trusted by{" "}
              <span className="font-bold text-gradient-vtech-primary">
                Industry Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Here's what our clients say about working with us
            </p>
          </motion.div>

          <EnhancedTestimonials
            testimonials={homepageContent?.testimonials || []}
          />
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
              Enterprise{" "}
              <span className="font-bold text-gradient-vtech-primary">
                Capabilities
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Proven expertise in delivering mission-critical solutions at scale
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(homepageContent?.capabilities || []).map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                    style={createStyles.gradient(brandGradients.secondary)}
                  >
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
                We may be growing, but our commitment to excellence is
                unwavering
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Left: Our Principles */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Our Development Principles
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: "🎯",
                      title: "Code Quality",
                      desc: "Clean, maintainable, well-documented code",
                    },
                    {
                      icon: "🔐",
                      title: "Security First",
                      desc: "Built-in security from day one",
                    },
                    {
                      icon: "👥",
                      title: "User-Centric",
                      desc: "Every feature designed with users in mind",
                    },
                    {
                      icon: "🚀",
                      title: "Agile Delivery",
                      desc: "Fast iterations with continuous feedback",
                    },
                  ].map((principle, index) => (
                    <div
                      key={principle.title}
                      className="flex items-start gap-3"
                    >
                      <div className="text-lg">{principle.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {principle.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {principle.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Our Commitments */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-200/50 dark:border-gray-800/50">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Our Commitments
                </h4>
                <div className="space-y-4">
                  {[
                    {
                      icon: "📞",
                      title: "Direct Communication",
                      desc: "Talk directly with developers, not account managers",
                    },
                    {
                      icon: "⏰",
                      title: "Transparent Timeline",
                      desc: "Honest project estimates and regular updates",
                    },
                    {
                      icon: "💰",
                      title: "Fair Pricing",
                      desc: "No hidden costs, competitive rates for quality work",
                    },
                    {
                      icon: "🔧",
                      title: "Post-Launch Support",
                      desc: "We don't disappear after project completion",
                    },
                  ].map((commitment, index) => (
                    <div
                      key={commitment.title}
                      className="flex items-start gap-3"
                    >
                      <div className="text-lg">{commitment.icon}</div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm">
                          {commitment.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {commitment.desc}
                        </div>
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
          <div
            className="rounded-3xl p-12 text-white relative overflow-hidden"
            style={createStyles.gradient(brandGradients.primary)}
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                {isMounted && homepageContent?.cta?.title
                  ? homepageContent.cta.title
                  : "Ready to Build Your Next Project?"}
              </h2>
              <p className="text-xl mb-8 text-white/90">
                {isMounted && homepageContent?.cta?.description
                  ? homepageContent.cta.description
                  : "Let's discuss how we can help bring your ideas to life with custom software solutions."}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-800 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                  >
                    {isMounted && homepageContent?.cta?.buttonText
                      ? homepageContent.cta.buttonText
                      : "Get Started Today"}
                    <ArrowRightIcon />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all duration-300 shadow-lg border border-white/20"
                  >
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
