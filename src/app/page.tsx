"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkills, useProfile } from '@/hooks/useData';
import { usePerformance } from '@/hooks/usePerformance';
import FlipWords from '@/components/FlipWords';
import GhostLoader from '@/components/GhostLoader';
import OptimizedImage from '@/components/OptimizedImage';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';


// --- Icons ---
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="currentColor">
    <path d="M9.352,6.913L14.72,0h-1.32L9.014,6.082L5.432,0H0l5.626,8.125L0,15.1h1.32l4.634-5.594L10.01,15.1h5.432L9.352,6.913z M7.91,8.455l-0.64-0.908L2.26,1.077h2.05l3.87,5.52l0.64,0.908l5.24,7.47h-2.05L7.91,8.455z"/>
  </svg>
);

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
          className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
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
  const { data: skills, isLoading: skillsLoading, error: skillsError, isValidating: skillsValidating } = useSkills();
  const { data: profile, isLoading: profileLoading, error: profileError, isValidating: profileValidating } = useProfile();
  
  // Initialize performance monitoring
  usePerformance();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Test database connection
  console.log('🔗 Database connection test:');
  console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
  console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');

  // Extract profile data with fallbacks
  const profileData = profile?.success ? profile.data : null;
  const displayName = profileData?.name || 'NA-TI ናቲ';
  const displayTitle = profileData?.title || 'Creative Designer';
  const displayBio = profileData?.bio || 'I bring ideas to life through innovative design and development. From pixel-perfect websites to stunning graphics and immersive 3D experiences, I create digital solutions that captivate and convert.';
  const isAvailable = profileData?.available_for_projects ?? true;
  const avatarUrl = profileData?.avatar_url || '/window.svg';
  const socialLinks = profileData?.social_links || {};
  const userSkills = profileData?.skills || [];
  
  // Create dynamic subtitle from skills or use fallback
  const displaySubtitle = userSkills.length > 0 
    ? userSkills.slice(0, 3).join(' • ') 
    : 'Web • Graphics • 3D Visualization';

  // Define the words for FlipWords animation
  const titleWords = ['Creative Designer', 'Design Engineer'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hero-card bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              {/* Left Column: Text Content */}
              <div className="lg:w-2/3 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex items-center justify-center lg:justify-start gap-3 mb-4"
                >
                  <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className={`text-sm font-medium ${isAvailable ? 'text-green-700 dark:text-green-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {isAvailable ? 'Available for projects' : 'Currently unavailable'}
                  </span>
                </motion.div>

                <div className="mb-6 overflow-visible">
                                  <h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-gray-900 dark:text-white mb-4 leading-normal animate-fade-in"
                  style={{ 
                    textRendering: 'optimizeLegibility',
                    fontFeatureSettings: '"kern" 1, "liga" 1',
                    lineHeight: '1.2',
                    animationDelay: '0.3s'
                  }}
                >
                    <span className="font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ 
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 'inherit',
                      paddingBottom: '0.1em'
                    }}>
                      <FlipWords 
                        words={titleWords}
                        duration={4000}
                        className="inline-block"
                      />
                    </span>
                  </h1>
                  <h2 
                    className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-light animate-fade-in"
                    style={{ animationDelay: '0.5s' }}
                  >
                    {displaySubtitle}
                  </h2>
                </div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  className="mb-6 max-w-2xl"
                >
                  <SelectiveTextStyling
                    text={displayBio}
                    styledWords={profileData?.styled_words || []}
                    className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-wrap gap-4 mb-6 justify-center lg:justify-start"
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/projects" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                      View My Work
                      <ArrowRightIcon />
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link href="/contact" className="px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300 flex items-center gap-2">
                      Let's Talk
                      <ArrowRightIcon />
                    </Link>
                  </motion.div>
                </motion.div>


              </div>

              {/* Right Column: Avatar and Tags */}
              <div className="lg:w-1/3 flex flex-col items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative mb-8"
                >
                  <div className="w-72 h-72 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                    <OptimizedImage 
                      src={avatarUrl} 
                      alt={displayName}
                      fill
                      priority
                      sizes="(max-width: 768px) 280px, 288px"
                      className="w-full h-full"
                      quality={85}
                    />
                  </div>
                  
                  {/* Floating skill tags */}
                  <div className="absolute -inset-8">
                    {(userSkills.length > 0 ? userSkills.slice(0, 4) : ['Web Dev', 'Graphics', '3D Art']).map((skill, index) => {
                      const positions = [
                        { top: '10%', right: '5%' },
                        { bottom: '15%', left: '0%' },
                        { top: '20%', left: '5%' },
                        { bottom: '10%', right: '10%' }
                      ];
                      
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.8 + index * 0.2,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="absolute px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm border border-white/20"
                          style={positions[index]}
                        >
                          {skill}
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
                
                {/* Social Links below profile picture */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Follow my journey:</span>
                  <div className="flex gap-3">
                    {[
                      { 
                        href: socialLinks.github || "https://github.com/natihabtamu", 
                        icon: <GithubIcon />, 
                        label: "GitHub",
                        show: socialLinks.github,
                        color: "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700"
                      },
                      { 
                        href: socialLinks.linkedin || "https://linkedin.com/in/nati-habtamu", 
                        icon: <LinkedinIcon />, 
                        label: "LinkedIn",
                        show: socialLinks.linkedin,
                        color: "hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                      },
                      { 
                        href: socialLinks.twitter || "https://twitter.com", 
                        icon: <TwitterIcon />, 
                        label: "Twitter",
                        show: socialLinks.twitter,
                        color: "hover:bg-sky-100 hover:text-sky-600 dark:hover:bg-sky-900/20 dark:hover:text-sky-400"
                      },
                      { 
                        href: socialLinks.behance || "https://behance.net", 
                        icon: <BehanceIcon />, 
                        label: "Behance",
                        show: socialLinks.behance,
                        color: "hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/20 dark:hover:text-purple-400"
                      },
                      { 
                        href: socialLinks.dribbble || "https://dribbble.com", 
                        icon: <DribbbleIcon />, 
                        label: "Dribbble",
                        show: socialLinks.dribbble,
                        color: "hover:bg-pink-100 hover:text-pink-600 dark:hover:bg-pink-900/20 dark:hover:text-pink-400"
                      },
                    ].filter(social => social.show || (!socialLinks.github && !socialLinks.linkedin && !socialLinks.twitter && social.label !== 'Behance' && social.label !== 'Dribbble')).slice(0, 4).map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 ${social.color} transition-all duration-300 shadow-sm hover:shadow-md`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        title={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
              What I <span className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-none" style={{ 
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Create</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Combining creativity with technical expertise to deliver exceptional digital experiences
            </p>
            
            {/* DevOps Infinity Symbol */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12"
            >
              <div className="relative bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-900/30 dark:to-purple-900/30 rounded-3xl p-12 backdrop-blur-xl border border-blue-200/40 dark:border-blue-800/40 shadow-2xl overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 8 + i * 2,
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
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center relative z-10"
                >
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2"
                  >
                    Full-Stack Excellence
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    viewport={{ once: true }}
                    className="text-sm text-gray-600 dark:text-gray-300 font-medium"
                  >
                    Modern Development Solutions
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {skillsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <GhostLoader size="lg" className="mb-4" />
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  Loading skills...
                </p>
              </div>
            </div>
          ) : skillsError ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  id: '1',
                  title: "Web Design & Development",
                  description: "Creating responsive, user-focused websites with modern technologies and clean aesthetics.",
                  icon_name: "web",
                  color_gradient: "from-blue-500 to-cyan-500",
                  styled_words: []
                },
                {
                  id: '2',
                  title: "Graphics Design",
                  description: "Crafting visual identities, branding materials, and digital graphics that tell compelling stories.",
                  icon_name: "graphics",
                  color_gradient: "from-purple-500 to-pink-500",
                  styled_words: []
                },
                {
                  id: '3',
                  title: "3D Product Visualization",
                  description: "Bringing products to life with photorealistic 3D renders and interactive experiences.",
                  icon_name: "3d",
                  color_gradient: "from-orange-500 to-red-500",
                  styled_words: []
                }
              ].map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color_gradient} p-4 text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border-2 border-white/20"
                    />
                    {getSkillIcon(skill.icon_name)}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative">
                    {skill.title}
                  </h3>
                  
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed relative">
                    <SelectiveTextStyling
                      text={skill.description}
                      styledWords={skill.styled_words || []}
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-60"
                        animate={{
                          x: [0, 20, 0],
                          y: [0, -20, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Real-time sync indicator */}
              {skillsValidating && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="col-span-full flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-4"
                >
                  <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                  />
                  <span>⚡ Syncing latest updates...</span>
                </motion.div>
              )}
              
              {skills?.data?.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative p-8 bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  {/* Hover effect background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color_gradient || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-2xl border-2 border-white/20"
                    />
                    <span className="text-2xl relative z-10">
                      {skill.title.toLowerCase().includes('web') ? '🌐' : 
                       skill.title.toLowerCase().includes('graphics') ? '🎨' :
                       skill.title.toLowerCase().includes('3d') ? '🎯' :
                       skill.icon_name || '💻'}
                    </span>
                    {/* Real-time sync indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse border-2 border-white" title="Real-time sync active"></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 relative">
                    {skill.title}
                  </h3>
                  
                  <div className="text-gray-600 dark:text-gray-300 leading-relaxed relative">
                    <SelectiveTextStyling
                      text={skill.description}
                      styledWords={skill.styled_words || []}
                      className="text-gray-600 dark:text-gray-300 leading-relaxed"
                    />
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-60"
                        animate={{
                          x: [0, 20, 0],
                          y: [0, -20, 0],
                          scale: [0, 1, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                        }}
                      />
                    ))}
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
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Let's collaborate and bring your vision to life with exceptional design and development.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  Start Your Project
                  <ArrowRightIcon />
                </Link>
              </motion.div>
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
