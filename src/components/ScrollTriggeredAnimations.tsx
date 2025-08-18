"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAnime } from "../hooks/useAnime";

interface ScrollTriggeredAnimationsProps {
  className?: string;
}

export default function ScrollTriggeredAnimations({
  className = "",
}: ScrollTriggeredAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const { animate, timeline, stagger, random, isLoaded } = useAnime();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (
      !isClient ||
      !containerRef.current ||
      typeof window === "undefined" ||
      !isLoaded
    )
      return;

    // Create scroll-triggered timeline
    const tl = timeline();
    if (!tl) return;

    // Animate progress bar on scroll
    tl.add({
      targets: progressRef.current,
      width: ["0%", "100%"],
      duration: 2000,
      easing: "easeInOutQuart",
      autoplay: false,
      update: (anim) => {
        // Update progress text
        const progressText =
          containerRef.current?.querySelector(".progress-text");
        if (progressText) {
          progressText.textContent = `${Math.round(anim.progress)}%`;
        }
      },
    });

    // Scroll observer for triggering animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;

            if (target.classList.contains("scroll-card")) {
              // Animate cards with stagger
              animate(".scroll-card", {
                opacity: [0, 1],
                translateY: [50, 0],
                scale: [0.9, 1],
                duration: 800,
                delay: stagger(200),
                easing: "easeOutBack",
              });
            }

            if (target.classList.contains("scroll-text")) {
              // Animate text with typewriter effect
              animate(".scroll-text", {
                opacity: [0, 1],
                translateX: [-50, 0],
                duration: 1000,
                delay: stagger(100),
                easing: "easeOutQuart",
              });
            }

            if (target.classList.contains("scroll-shape")) {
              // Animate shapes with morphing
              animate(".scroll-shape", {
                borderRadius: ["50%", "0%", "50% 0% 50% 0%"],
                rotate: [0, 180, 360],
                scale: [0.5, 1.2, 1],
                duration: 1500,
                delay: stagger(300),
                easing: "easeInOutQuart",
              });
            }

            if (target.classList.contains("scroll-progress")) {
              // Start progress animation
              tl.play();
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all scroll-triggered elements
    const scrollElements = containerRef.current.querySelectorAll(
      ".scroll-card, .scroll-text, .scroll-shape, .scroll-progress"
    );
    scrollElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [isClient, animate, timeline, stagger]);

  return (
    <div ref={containerRef} className={`py-20 ${className}`}>
      {/* Progress Section */}
      <div className="scroll-progress mb-20 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Scroll Progress Animation
        </h2>
        <div className="w-64 mx-auto mb-4">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300"
              style={{ width: "0%" }}
            />
          </div>
        </div>
        <div className="progress-text text-lg font-semibold text-gray-700 dark:text-gray-300">
          0%
        </div>
      </div>

      {/* Staggered Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="scroll-card bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-lg mb-4 flex items-center justify-center text-white font-bold">
              {i + 1}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Feature {i + 1}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              This card animates in with a staggered effect as you scroll.
            </p>
          </div>
        ))}
      </div>

      {/* Text Animation Section */}
      <div className="scroll-text mb-20 text-center opacity-0">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Advanced Text Animations
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Watch as this text slides in from the left with a smooth easing
          animation. The power of anime.js combined with scroll triggers creates
          engaging user experiences.
        </p>
      </div>

      {/* Morphing Shapes */}
      <div className="grid md:grid-cols-4 gap-8 mb-20">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="scroll-shape w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full mx-auto opacity-0"
          />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="relative h-64 mb-20 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Experience the Power of Advanced Animations
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          These animations are powered by anime.js and demonstrate the library's
          capabilities for creating sophisticated, scroll-triggered effects.
        </p>
        <button className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
          Explore More
        </button>
      </div>
    </div>
  );
}
