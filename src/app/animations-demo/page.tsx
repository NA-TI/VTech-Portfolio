"use client";
import React, { useState } from "react";
import EnhancedLoadingScreen from "../../components/EnhancedLoadingScreen";
import AnimatedBackground from "../../components/AnimatedBackground";
import EnhancedInteractiveElements from "../../components/EnhancedInteractiveElements";
import ScrollTriggeredAnimations from "../../components/ScrollTriggeredAnimations";

export default function AnimationsDemoPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentLoaded(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <EnhancedLoadingScreen
        isLoading={isLoading}
        contentLoaded={contentLoaded}
      />

      {!isLoading && (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <AnimatedBackground
            particleCount={30}
            morphingShapes={true}
            interactive={true}
          />

          <div className="relative z-10">
            {/* Hero Section */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto text-center">
                <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                  Advanced Animations
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                  Experience the power of anime.js with sophisticated
                  animations, particle effects, and scroll-triggered
                  interactions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Explore Animations
                  </button>
                  <button className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300">
                    View Documentation
                  </button>
                </div>
              </div>
            </section>

            {/* Interactive Elements Section */}
            <section className="py-20 px-4 bg-white dark:bg-gray-800">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Interactive Elements
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Hover over these cards to see advanced particle effects and
                    morphing animations.
                  </p>
                </div>
                <EnhancedInteractiveElements />
              </div>
            </section>

            {/* Scroll Triggered Animations */}
            <section className="py-20 px-4">
              <div className="max-w-6xl mx-auto">
                <ScrollTriggeredAnimations />
              </div>
            </section>

            {/* Animation Features Grid */}
            <section className="py-20 px-4 bg-white dark:bg-gray-800">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                    Animation Features
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Discover the capabilities of anime.js through these advanced
                    features.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Particle Systems",
                      description:
                        "Dynamic floating particles with physics-based movement",
                      icon: "✨",
                      features: [
                        "Random movement",
                        "Scale variations",
                        "Opacity changes",
                        "Loop animations",
                      ],
                    },
                    {
                      title: "Morphing Shapes",
                      description:
                        "Smooth transitions between different geometric forms",
                      icon: "🔄",
                      features: [
                        "Border radius morphing",
                        "Rotation effects",
                        "Scale transformations",
                        "Color transitions",
                      ],
                    },
                    {
                      title: "Scroll Triggers",
                      description:
                        "Animations that activate based on scroll position",
                      icon: "📜",
                      features: [
                        "Intersection Observer",
                        "Staggered reveals",
                        "Progress indicators",
                        "Timeline control",
                      ],
                    },
                    {
                      title: "Advanced Easing",
                      description:
                        "Sophisticated easing functions for natural motion",
                      icon: "📈",
                      features: [
                        "Elastic effects",
                        "Back easing",
                        "Custom curves",
                        "Spring physics",
                      ],
                    },
                    {
                      title: "Timeline Control",
                      description:
                        "Precise orchestration of multiple animations",
                      icon: "⏱️",
                      features: [
                        "Sequential timing",
                        "Parallel execution",
                        "Loop control",
                        "Pause/resume",
                      ],
                    },
                    {
                      title: "Interactive Effects",
                      description: "Mouse and touch-responsive animations",
                      icon: "🖱️",
                      features: [
                        "Hover states",
                        "Click effects",
                        "Mouse following",
                        "Ripple effects",
                      ],
                    },
                  ].map((feature, index) => (
                    <div
                      key={feature.title}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="text-4xl mb-4">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-1">
                        {feature.features.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-500 dark:text-gray-400 flex items-center"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 bg-gray-900 text-white">
              <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-2xl font-bold mb-4">Powered by anime.js</h3>
                <p className="text-gray-400 mb-6">
                  A lightweight JavaScript animation library that works with CSS
                  properties, CSS transforms, SVG, DOM attributes and JavaScript
                  Objects.
                </p>
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://animejs.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Official Website
                  </a>
                  <a
                    href="https://github.com/juliangarnier/anime"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    GitHub Repository
                  </a>
                  <a
                    href="https://animejs.com/documentation/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Documentation
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

