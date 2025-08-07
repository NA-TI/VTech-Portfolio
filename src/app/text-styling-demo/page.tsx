"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface Example {
  title: string;
  text: string;
  styledWords: StyledWord[];
}

// Arrow Icon for back button
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.551 13.5h13.449v-3h-13.449l4.449-4.449-2.121-2.121-7.879 7.879 7.879 7.879 2.121-2.121z"/>
  </svg>
);

const TextStylingDemo = () => {
  const [activeExample, setActiveExample] = useState(0);

  const examples: Example[] = [
    {
      title: "Portfolio Bio",
      text: "I bring ideas to life through innovative design and development. From pixel-perfect websites to stunning graphics and immersive 3D experiences, I create digital solutions that captivate and convert.",
      styledWords: [
        { word: 'ideas', style: 'bold' },
        { word: 'innovative', style: 'bold-color', color: 'blue' },
        { word: 'captivate', style: 'italic' },
        { word: 'convert', style: 'bold-color', color: 'purple' }
      ]
    },
    {
      title: "Project Description",
      text: "A curated collection of projects that showcase my passion for innovative design and cutting-edge development. Each piece tells a unique story of creativity and technical excellence.",
      styledWords: [
        { word: 'curated', style: 'bold' },
        { word: 'passion', style: 'bold-color', color: 'purple' },
        { word: 'innovative', style: 'italic' },
        { word: 'cutting-edge', style: 'bold-color', color: 'blue' },
        { word: 'excellence', style: 'bold-color', color: 'green' }
      ]
    },
    {
      title: "Service Description",
      text: "Crafting exceptional digital experiences through innovative design and cutting-edge development. Let's bring your vision to life with creative solutions that stand out.",
      styledWords: [
        { word: 'exceptional', style: 'bold' },
        { word: 'innovative', style: 'bold-color', color: 'purple' },
        { word: 'cutting-edge', style: 'italic' },
        { word: 'vision', style: 'bold-color', color: 'blue' },
        { word: 'creative', style: 'bold-color', color: 'pink' }
      ]
    },
    {
      title: "About Section",
      text: "As the sun dipped below the horizon, painting the sky in shades of orange and gold, Maya stood at the edge of the old wooden dock, watching the ripples dance across the surface of the lake. The water had always been her escape—a silent companion that listened without judgment. Tonight, it mirrored her thoughts, calm on the outside but swirling just beneath.",
      styledWords: [
        { word: 'horizon', style: 'bold' },
        { word: 'The', style: 'italic' },
        { word: 'calm', style: 'bold-color', color: 'blue' }
      ]
    },
    {
      title: "Fun Page Intro",
      text: "When I'm not pretending to be a productive adult, you can find me doing 3D art, watching anime, or being judged by my cat Kiwi. Because apparently having one creative outlet wasn't enough.",
      styledWords: [
        { word: 'pretending', style: 'italic' },
        { word: 'productive', style: 'bold' },
        { word: '3D art', style: 'bold-color', color: 'purple' },
        { word: 'anime', style: 'bold-color', color: 'blue' },
        { word: 'Kiwi', style: 'bold-color', color: 'pink' },
        { word: 'creative', style: 'italic' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
            <ArrowLeftIcon />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Text Styling Demo</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              Selective <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Text Styling</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Highlight key words in paragraphs with subtle styling to draw attention to important concepts
            </motion.p>
          </div>
        </motion.div>

        {/* Example Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {examples.map((example, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveExample(index)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeExample === index
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {example.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Example Display */}
        <motion.div 
          key={activeExample}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              {examples[activeExample].title}
            </h3>
            
            <div className="mb-8">
              <SelectiveTextStyling
                text={examples[activeExample].text}
                styledWords={examples[activeExample].styledWords}
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              />
            </div>

            {/* Styling Legend */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Applied Styling:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {examples[activeExample].styledWords.map((word, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      word.style === 'bold' ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200' :
                      word.style === 'italic' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                      word.style === 'color' ? `bg-${word.color || 'blue'}-100 dark:bg-${word.color || 'blue'}-900 text-${word.color || 'blue'}-800 dark:text-${word.color || 'blue'}-200` :
                      `bg-${word.color || 'blue'}-100 dark:bg-${word.color || 'blue'}-900 text-${word.color || 'blue'}-800 dark:text-${word.color || 'blue'}-200`
                    }`}>
                      {word.style}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">"{word.word}"</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Usage Instructions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200/50 dark:border-blue-700/50">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              How to Use
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>• <strong>Bold:</strong> Use for emphasis on key concepts</p>
              <p>• <em>Italic:</em> Use for subtle emphasis or foreign terms</p>
              <p>• <span className="text-blue-600 dark:text-blue-400 font-bold">Color:</span> Use to highlight important terms or categories</p>
              <p>• <span className="text-purple-600 dark:text-purple-400 font-bold">Bold + Color:</span> Use for maximum emphasis on critical terms</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TextStylingDemo; 