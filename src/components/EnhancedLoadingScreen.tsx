"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAnime } from "../hooks/useAnime";
import { useNavigationContent } from "@/hooks/useContent";

interface EnhancedLoadingScreenProps {
  isLoading?: boolean;
  contentLoaded?: boolean;
}

export default function EnhancedLoadingScreen({
  isLoading = true,
  contentLoaded = false,
}: EnhancedLoadingScreenProps) {
  const [shouldShow, setShouldShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { animate, timeline, stagger, random, isLoaded } = useAnime();
  const { content: navigationContent, isMounted: navIsMounted } =
    useNavigationContent();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !isLoaded) return;

    if (contentLoaded && !isLoading) {
      // Animate out
      const tl = timeline();
      if (tl) {
        tl.add({
          targets: containerRef.current,
          opacity: [1, 0],
          scale: [1, 0.8],
          duration: 800,
          easing: "easeInOutQuart",
        }).add(
          {
            targets: ".particle",
            opacity: [1, 0],
            scale: [1, 0],
            translateX: () => random(-100, 100),
            translateY: () => random(-100, 100),
            duration: 600,
            delay: stagger(50),
            easing: "easeOutExpo",
          },
          "-=400"
        );
      }

      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isClient, isLoading, contentLoaded, timeline, stagger, random, isLoaded]);

  useEffect(() => {
    if (!isClient || !shouldShow || !containerRef.current || !isLoaded) return;

    // Initial animation
    const tl = timeline();
    if (!tl) return;

    // Animate logo
    tl.add({
      targets: logoRef.current,
      scale: [0, 1],
      rotate: [180, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutElastic(1, 0.5)",
    })
      .add(
        {
          targets: ".particle",
          opacity: [0, 1],
          scale: [0, 1],
          translateX: [0, () => random(-50, 50)],
          translateY: [0, () => random(-50, 50)],
          duration: 800,
          delay: stagger(100),
          easing: "easeOutBack",
        },
        "-=600"
      )
      .add(
        {
          targets: ".progress-bar",
          width: ["0%", "100%"],
          duration: 2000,
          easing: "easeInOutQuart",
          update: (anim) => {
            setProgress(Math.round(anim.progress));
          },
        },
        "-=400"
      );

    // Continuous particle animation
    animate(".particle", {
      translateX: () => random(-20, 20),
      translateY: () => random(-20, 20),
      scale: () => random(0.8, 1.2),
      duration: () => random(2000, 4000),
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  }, [isClient, shouldShow, animate, timeline, stagger, random, isLoaded]);

  if (!shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden"
    >
      {/* Animated background particles */}
      <div ref={particlesRef} className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Enhanced logo with morphing effect */}
        <div ref={logoRef} className="relative mb-8">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto relative">
            {/* Inner morphing shape or uploaded logo */}
            {navIsMounted && navigationContent?.logoImage ? (
              <img
                src={navigationContent.logoImage}
                alt={navigationContent?.brand || "Brand"}
                className="absolute inset-2 w-auto h-auto rounded-full object-cover border-2 border-white/30"
                style={{ inset: "0.5rem" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback =
                    (e.currentTarget.nextSibling as HTMLElement) || null;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
            ) : null}
            <div
              className={`absolute inset-2 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center ${navIsMounted && navigationContent?.logoImage ? "hidden" : ""}`}
            >
              <div className="text-white font-bold text-lg md:text-xl">V</div>
            </div>

            {/* Floating dots */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                style={{
                  left: `${50 + 35 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                  top: `${50 + 35 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Brand name with typewriter effect */}
        <div className="text-2xl md:text-3xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            {navIsMounted && navigationContent?.brand
              ? navigationContent.brand
              : "VTech"}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 mx-auto mb-4">
          <div className="bg-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="progress-bar h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Progress text */}
        <div className="text-sm text-white/70 font-medium">
          Loading... {progress}%
        </div>

        {/* Subtle loading dots */}
        <div className="flex justify-center mt-4 space-x-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1.4s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
    </div>
  );
}
