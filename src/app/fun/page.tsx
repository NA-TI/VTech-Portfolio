"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useFunInterests } from "@/hooks/useFunInterests";
import GhostLoader from '@/components/GhostLoader';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';

// Icons for different hobbies/interests
const BookIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const GameIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const CoffeeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MusicIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
  </svg>
);

const TravelIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ArtIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={`w-5 h-5 ${className || ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default function FunPage() {
  const { interests, loading, error } = useFunInterests();

  // Debug logging
  console.log('🔍 Fun Page Debug:');
  console.log('• Loading:', loading);
  console.log('• Error:', error);
  console.log('• Interests count:', interests?.length);
  console.log('• Interests data:', interests);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'cube': return <ArtIcon />;
      case 'game': return <GameIcon />;
      case 'coffee': return <CoffeeIcon />;
      case 'music': return <MusicIcon />;
      case 'travel': return <TravelIcon />;
      case 'book': return <BookIcon />;
      default: return <ArtIcon />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center py-20">
            <GhostLoader size="lg" className="mb-4" />
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your interests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center py-20">
            <p className="text-red-600 dark:text-red-400">Failed to load interests. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8">
            🌙 When I'm Not Working
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            When I'm not pretending to be a productive adult, you can find me doing 3D art, watching anime, or being judged by my cat Kiwi. Because apparently having one creative outlet wasn't enough.
          </p>
        </motion.div>

        {/* Dynamic Story Sections */}
        <div className="space-y-20">
          {interests.map((interest, index) => (
            <motion.section
              key={interest.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
              className="relative"
            >
              <div className={`flex flex-col lg:flex-row items-start gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 w-full">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${interest.color_gradient} p-5 text-white mb-6 flex items-center justify-center`}>
                    {getIconComponent(interest.icon_name)}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 break-words">
                    {interest.title}
                  </h2>
                  <div className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {interest.styled_words && interest.styled_words.length > 0 ? (
                      <SelectiveTextStyling
                        text={interest.description}
                        styledWords={interest.styled_words}
                        className="break-words"
                      />
                    ) : (
                      interest.description.split('\n').map((paragraph, i) => (
                        <p key={i} className={`${i > 0 ? 'mt-6' : ''} break-words`}>
                          {paragraph}
                        </p>
                      ))
                    )}
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <div className={`bg-gradient-to-r ${interest.color_gradient.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-3xl p-8 border border-gray-200/50 dark:border-gray-700/50`}>
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic break-words">
                      "{interest.title === '3D Art' ? 'Currently working on a 3D scene that\'s been in progress for... let\'s just say \'a while.\' But hey, the render quality is getting there!' : 
                        interest.title === 'Anime & Outdoor Adventures' ? 'Current anime watchlist: Longer than my to-do list. Current biking distance: Shorter than my anime watchlist. Priorities, right?' :
                        interest.title === 'Life with Kiwi & New Adventures' ? 'Kiwi\'s feedback on my latest project: *yawns and walks away* She\'s a harsh critic, but at least she\'s honest.' :
                        'This is my latest obsession. Don\'t judge me, I\'m just being authentically chaotic!'}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

                {/* Personal Reflection */}
        <motion.div 
          className="text-center my-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="max-w-4xl mx-auto p-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              The Reality Check
            </h3>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I talk about my interests like I have all the time in the world. Reality check: I don't. But hey, at least I'm honest about it! These random interests somehow make me better at what I do. Or that's what I tell myself to justify all the random projects I start.
            </p>
            <div className="flex items-center justify-center gap-3 text-lg text-gray-600 dark:text-gray-400 font-medium">
              <span>Thanks for reading my chaotic interests!</span>
              <span className="text-2xl">🐱</span>
              <span>Kiwi says hi too.</span>
            </div>
          </div>
        </motion.div>

        {/* Strong Call to Action */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to Create Something Amazing Together?
          </h3>
                     <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                       Now that you know I'm a real human with questionable time management and a judgmental cat, let's see if we can work together on something awesome.
                     </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg group"
            >
              View My Work
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl hover:bg-white/30 dark:hover:bg-black/30 transition-all font-semibold text-lg group"
            >
              Let's Connect
              <ArrowRightIcon className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 