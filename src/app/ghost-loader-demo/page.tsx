"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GhostLoader from '@/components/GhostLoader';
import LoadingSpinner from '@/components/LoadingSpinner';

interface VariantOption {
  name: string;
  size: 'sm' | 'md' | 'lg' | 'xl';
  variant: 'default' | 'minimal' | 'glow' | 'neon' | 'gradient' | 'cosmic' | 'fire' | 'ice';
  speed: 'slow' | 'normal' | 'fast';
}

export default function GhostLoaderDemo() {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption>({
    name: 'Default',
    size: 'md',
    variant: 'default',
    speed: 'normal'
  });

  const variants: VariantOption[] = [
    { name: 'Default', size: 'md', variant: 'default', speed: 'normal' },
    { name: 'Minimal', size: 'md', variant: 'minimal', speed: 'normal' },
    { name: 'Glow', size: 'md', variant: 'glow', speed: 'normal' },
    { name: 'Neon', size: 'md', variant: 'neon', speed: 'normal' },
    { name: 'Gradient', size: 'md', variant: 'gradient', speed: 'normal' },
    { name: 'Cosmic', size: 'md', variant: 'cosmic', speed: 'normal' },
    { name: 'Fire', size: 'md', variant: 'fire', speed: 'normal' },
    { name: 'Ice', size: 'md', variant: 'ice', speed: 'normal' },
  ];

  const sizes = [
    { name: 'Small', value: 'sm' },
    { name: 'Medium', value: 'md' },
    { name: 'Large', value: 'lg' },
    { name: 'Extra Large', value: 'xl' },
  ];

  const speeds = [
    { name: 'Slow', value: 'slow' },
    { name: 'Normal', value: 'normal' },
    { name: 'Fast', value: 'fast' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            GhostLoader Showcase
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ultra-enhanced loading animations with multiple variants, speeds, and sizes
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customize Your Ghost</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Variant Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Variant
              </label>
              <div className="grid grid-cols-2 gap-2">
                {variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedVariant.variant === variant.variant
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedVariant({ ...selectedVariant, size: size.value as any })}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedVariant.size === size.value
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Speed Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Speed
              </label>
              <div className="grid grid-cols-3 gap-2">
                {speeds.map((speed) => (
                  <button
                    key={speed.name}
                    onClick={() => setSelectedVariant({ ...selectedVariant, speed: speed.value as any })}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      selectedVariant.speed === speed.value
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {speed.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Live Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Live Preview
          </h2>
          <div className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <GhostLoader 
                size={selectedVariant.size} 
                variant={selectedVariant.variant}
                speed={selectedVariant.speed}
                className="mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {selectedVariant.name} • {selectedVariant.size.toUpperCase()} • {selectedVariant.speed}
              </p>
            </div>
          </div>
        </motion.div>

        {/* All Variants Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            All Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {variants.map((variant, index) => (
              <motion.div
                key={variant.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <GhostLoader 
                  size="md" 
                  variant={variant.variant}
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {variant.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {variant.variant} variant
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* LoadingSpinner Integration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            LoadingSpinner Integration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Ghost Default', variant: 'ghost' },
              { name: 'Ghost Minimal', variant: 'ghost-minimal' },
              { name: 'Ghost Glow', variant: 'ghost-glow' },
              { name: 'Ghost Neon', variant: 'ghost-neon' },
              { name: 'Ghost Gradient', variant: 'ghost-gradient' },
              { name: 'Ghost Cosmic', variant: 'ghost-cosmic' },
              { name: 'Ghost Fire', variant: 'ghost-fire' },
              { name: 'Ghost Ice', variant: 'ghost-ice' },
              { name: 'Dots', variant: 'dots' },
            ].map((spinner, index) => (
              <motion.div
                key={spinner.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="text-center p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <LoadingSpinner 
                  variant={spinner.variant as any} 
                  size="md"
                  className="mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {spinner.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  LoadingSpinner variant
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Usage Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">GhostLoader Direct</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
{`import GhostLoader from '@/components/GhostLoader';

// Basic usage
<GhostLoader />

// With variants
<GhostLoader size="lg" variant="glow" />

// With speed control
<GhostLoader size="xl" variant="neon" speed="fast" />

// All variants
<GhostLoader variant="default" />
<GhostLoader variant="minimal" />
<GhostLoader variant="glow" />
<GhostLoader variant="neon" />
<GhostLoader variant="gradient" />
<GhostLoader variant="cosmic" />
<GhostLoader variant="fire" />
<GhostLoader variant="ice" />

// Interactive mode
<GhostLoader variant="cosmic" interactive={true} />`}
              </pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">LoadingSpinner Integration</h3>
              <pre className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
{`import LoadingSpinner from '@/components/LoadingSpinner';

// Ghost variants
<LoadingSpinner variant="ghost" />
<LoadingSpinner variant="ghost-minimal" />
<LoadingSpinner variant="ghost-glow" />
<LoadingSpinner variant="ghost-neon" />
<LoadingSpinner variant="ghost-gradient" />
<LoadingSpinner variant="ghost-cosmic" />
<LoadingSpinner variant="ghost-fire" />
<LoadingSpinner variant="ghost-ice" />

// Interactive variants
<LoadingSpinner variant="ghost-cosmic" interactive={true} />
<LoadingSpinner variant="ghost-fire" interactive={true} />

// Other variants
<LoadingSpinner variant="dots" />
<LoadingSpinner variant="pulse" />
<LoadingSpinner variant="grid" />
<LoadingSpinner variant="wave" />

// Admin loading state
<AdminLoadingState 
  variant="ghost-cosmic" 
  size="lg"
  message="Loading admin panel..."
/>`}
              </pre>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 