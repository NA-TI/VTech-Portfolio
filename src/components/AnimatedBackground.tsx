"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAnime } from "../hooks/useAnime";

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  morphingShapes?: boolean;
  interactive?: boolean;
}

export default function AnimatedBackground({
  className = "",
  particleCount = 50,
  morphingShapes = true,
  interactive = true,
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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

    // Create floating particles
    const particles = Array.from({ length: particleCount }).map((_, i) => {
      const particle = document.createElement("div");
      particle.className =
        "absolute w-1 h-1 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-full";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      containerRef.current?.appendChild(particle);
      return particle;
    });

    // Animate particles
    animate(particles, {
      translateX: () => random(-100, 100),
      translateY: () => random(-100, 100),
      scale: () => random(0.5, 2),
      opacity: () => random(0.1, 0.6),
      duration: () => random(3000, 8000),
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
      delay: stagger(100),
    });

    // Create morphing shapes if enabled
    if (morphingShapes) {
      const shapes = Array.from({ length: 3 }).map((_, i) => {
        const shape = document.createElement("div");
        shape.className = "absolute w-32 h-32 opacity-10";
        shape.style.left = `${20 + i * 30}%`;
        shape.style.top = `${20 + i * 20}%`;
        containerRef.current?.appendChild(shape);
        return shape;
      });

      // Morph shapes between different forms
      const morphShapes = () => {
        shapes.forEach((shape, i) => {
          const forms = [
            "border-radius: 50%",
            "border-radius: 0%",
            "border-radius: 50% 0% 50% 0%",
            "border-radius: 0% 50% 0% 50%",
          ];

          animate(shape, {
            borderRadius: forms[Math.floor(Math.random() * forms.length)],
            rotate: () => random(0, 360),
            scale: () => random(0.8, 1.5),
            duration: 3000,
            easing: "easeInOutQuart",
            delay: i * 500,
          });
        });
      };

      morphShapes();
      const morphInterval = setInterval(morphShapes, 4000);

      return () => {
        clearInterval(morphInterval);
        shapes.forEach((shape) => shape.remove());
      };
    }

    // Interactive mouse following effect
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Create ripple effect
        const ripple = document.createElement("div");
        ripple.className =
          "absolute w-4 h-4 bg-cyan-400/20 rounded-full pointer-events-none";
        ripple.style.left = `${mouseX}px`;
        ripple.style.top = `${mouseY}px`;
        containerRef.current?.appendChild(ripple);

        animate(ripple, {
          scale: [0, 3],
          opacity: [0.5, 0],
          duration: 1000,
          easing: "easeOutQuart",
          complete: () => ripple.remove(),
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        particles.forEach((particle) => particle.remove());
      };
    }

    return () => {
      particles.forEach((particle) => particle.remove());
    };
  }, [
    isClient,
    particleCount,
    morphingShapes,
    interactive,
    animate,
    stagger,
    random,
    isLoaded,
  ]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-slate-900/50" />

      {/* Ambient light effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
