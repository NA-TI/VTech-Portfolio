"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GhostLoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'minimal' | 'glow' | 'neon' | 'gradient' | 'cosmic' | 'fire' | 'ice';
  className?: string;
  speed?: 'slow' | 'normal' | 'fast';
  interactive?: boolean;
}

export default function GhostLoader({ 
  size = 'md', 
  variant = 'default',
  className = '',
  speed = 'normal',
  interactive = false
}: GhostLoaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, vx: number, vy: number}>>([]);

  const sizeClasses = {
    sm: 'scale-50',
    md: 'scale-80',
    lg: 'scale-100',
    xl: 'scale-125'
  };

  const speedMultiplier = {
    slow: 1.5,
    normal: 1,
    fast: 0.5
  };

  const variants = {
    default: {
      ghost: "linear-gradient(135deg, #3B82F6, #8B5CF6, #EC4899)",
      shadow: "linear-gradient(135deg, #1e293b, #334155)",
      eyes: "linear-gradient(135deg, #ffffff, #f8fafc)",
      pupils: "linear-gradient(135deg, #1e40af, #3730a3)",
      eyeShadow: "rgba(0, 0, 0, 0.1)",
      particles: "#3B82F6"
    },
    minimal: {
      ghost: "linear-gradient(135deg, #6B7280, #9CA3AF)",
      shadow: "linear-gradient(135deg, #374151, #4B5563)",
      eyes: "linear-gradient(135deg, #ffffff, #f1f5f9)",
      pupils: "linear-gradient(135deg, #374151, #4B5563)",
      eyeShadow: "rgba(0, 0, 0, 0.15)",
      particles: "#6B7280"
    },
    glow: {
      ghost: "linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6)",
      shadow: "linear-gradient(135deg, #065f46, #1e40af)",
      eyes: "linear-gradient(135deg, #ffffff, #f0fdf4)",
      pupils: "linear-gradient(135deg, #059669, #0d9488)",
      eyeShadow: "rgba(16, 185, 129, 0.2)",
      particles: "#10B981"
    },
    neon: {
      ghost: "linear-gradient(135deg, #00D4FF, #FF0080, #FF6B35)",
      shadow: "linear-gradient(135deg, #00D4FF, #FF0080)",
      eyes: "linear-gradient(135deg, #ffffff, #f0f9ff)",
      pupils: "linear-gradient(135deg, #00D4FF, #FF0080)",
      eyeShadow: "rgba(0, 212, 255, 0.3)",
      particles: "#00D4FF"
    },
    gradient: {
      ghost: "linear-gradient(135deg, #667eea, #764ba2, #f093fb)",
      shadow: "linear-gradient(135deg, #4c63d2, #667eea)",
      eyes: "linear-gradient(135deg, #ffffff, #f8fafc)",
      pupils: "linear-gradient(135deg, #667eea, #764ba2)",
      eyeShadow: "rgba(102, 126, 234, 0.2)",
      particles: "#667eea"
    },
    cosmic: {
      ghost: "linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)",
      shadow: "linear-gradient(135deg, #4C1D95, #7C3AED)",
      eyes: "linear-gradient(135deg, #ffffff, #fdf4ff)",
      pupils: "linear-gradient(135deg, #8B5CF6, #EC4899)",
      eyeShadow: "rgba(139, 92, 246, 0.3)",
      particles: "#8B5CF6"
    },
    fire: {
      ghost: "linear-gradient(135deg, #EF4444, #F97316, #F59E0B)",
      shadow: "linear-gradient(135deg, #7F1D1D, #DC2626)",
      eyes: "linear-gradient(135deg, #ffffff, #fef2f2)",
      pupils: "linear-gradient(135deg, #EF4444, #DC2626)",
      eyeShadow: "rgba(239, 68, 68, 0.3)",
      particles: "#EF4444"
    },
    ice: {
      ghost: "linear-gradient(135deg, #06B6D4, #3B82F6, #8B5CF6)",
      shadow: "linear-gradient(135deg, #0E7490, #1E40AF)",
      eyes: "linear-gradient(135deg, #ffffff, #f0fdfa)",
      pupils: "linear-gradient(135deg, #06B6D4, #0891B2)",
      eyeShadow: "rgba(6, 182, 212, 0.3)",
      particles: "#06B6D4"
    }
  };

  const currentVariant = variants[variant];

  // Particle system for advanced variants
  useEffect(() => {
    if (variant === 'cosmic' || variant === 'fire' || variant === 'ice') {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
      }));
      setParticles(newParticles);

      const interval = setInterval(() => {
        setParticles(prev => prev.map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vx: p.vx * 0.99,
          vy: p.vy * 0.99
        })));
      }, 50);

      return () => clearInterval(interval);
    }
  }, [variant]);

  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <motion.div 
        id="ghost" 
        className={`relative ${sizeClasses[size]}`}
        animate={{ 
          y: [0, -10, 0],
          rotateY: [0, 5, 0],
          scale: isHovered ? 1.1 : 1
        }}
        transition={{
          duration: 2 * speedMultiplier[speed],
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Particle system for advanced variants */}
        {(variant === 'cosmic' || variant === 'fire' || variant === 'ice') && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map(particle => (
              <motion.div
                key={particle.id}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: `${particle.x + 70}px`,
                  top: `${particle.y + 70}px`,
                  background: currentVariant.particles,
                  boxShadow: `0 0 6px ${currentVariant.particles}`
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: particle.id * 0.2
                }}
              />
            ))}
          </div>
        )}

        <div id="red">
          <div id="pupil"></div>
          <div id="pupil1"></div>
          <div id="eye"></div>
          <div id="eye1"></div>
          <div id="top0"></div>
          <div id="top1"></div>
          <div id="top2"></div>
          <div id="top3"></div>
          <div id="top4"></div>
          <div id="st0"></div>
          <div id="st1"></div>
          <div id="st2"></div>
          <div id="st3"></div>
          <div id="st4"></div>
          <div id="st5"></div>
          <div id="an1"></div>
          <div id="an2"></div>
          <div id="an3"></div>
          <div id="an4"></div>
          <div id="an5"></div>
          <div id="an6"></div>
          <div id="an7"></div>
          <div id="an8"></div>
          <div id="an9"></div>
          <div id="an10"></div>
          <div id="an11"></div>
          <div id="an12"></div>
          <div id="an13"></div>
          <div id="an14"></div>
          <div id="an15"></div>
          <div id="an16"></div>
          <div id="an17"></div>
          <div id="an18"></div>
        </div>
        <div id="shadow"></div>
        
        {/* Enhanced glow effects */}
        {variant === 'glow' && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        )}
        
        {/* Cosmic aura effect */}
        {variant === 'cosmic' && (
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-yellow-400/10 rounded-full blur-2xl animate-pulse"></div>
        )}
        
        {/* Fire aura effect */}
        {variant === 'fire' && (
          <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 via-orange-400/20 to-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
        )}
        
        {/* Ice aura effect */}
        {variant === 'ice' && (
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
        )}

        {/* Breathing animation overlay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 3 * speedMultiplier[speed],
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: `radial-gradient(circle, ${currentVariant.particles}20, transparent)`
          }}
        />
      </motion.div>

      <style jsx>{`
        #ghost {
          position: relative;
          cursor: ${interactive ? 'pointer' : 'default'};
        }

        #red {
          animation: upNDown infinite ${2 * speedMultiplier[speed]}s;
          position: relative;
          width: 140px;
          height: 140px;
          display: grid;
          grid-template-columns: repeat(14, 1fr);
          grid-template-rows: repeat(14, 1fr);
          grid-column-gap: 0px;
          grid-row-gap: 0px;
          grid-template-areas:
            "a1  a2  a3  a4  a5  top0  top0  top0  top0  a10 a11 a12 a13 a14"
            "b1  b2  b3  top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14"
            "c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14"
            "d1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14"
            "e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14"
            "f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4"
            "st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5"
            "an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18";
        }

        @keyframes upNDown {
          0%, 49% {
            transform: translateY(0px);
          }
          50%, 100% {
            transform: translateY(-10px);
          }
        }

        #top0, #top1, #top2, #top3, #top4, #st0, #st1, #st2, #st3, #st4, #st5 {
          background: ${currentVariant.ghost};
          border-radius: 2px;
          ${variant === 'neon' ? 'box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);' : ''}
          ${variant === 'cosmic' ? 'box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);' : ''}
        }

        #top0 { grid-area: top0; }
        #top1 { grid-area: top1; }
        #top2 { grid-area: top2; }
        #top3 { grid-area: top3; }
        #top4 { grid-area: top4; }
        #st0 { grid-area: st0; }
        #st1 { grid-area: st1; }
        #st2 { grid-area: st2; }
        #st3 { grid-area: st3; }
        #st4 { grid-area: st4; }
        #st5 { grid-area: st5; }

        #an1 { grid-area: an1; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an18 { grid-area: an18; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an2 { grid-area: an2; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an17 { grid-area: an17; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an3 { grid-area: an3; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an16 { grid-area: an16; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an4 { grid-area: an4; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an15 { grid-area: an15; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an6 { grid-area: an6; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an12 { grid-area: an12; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an7 { grid-area: an7; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an13 { grid-area: an13; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an9 { grid-area: an9; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an10 { grid-area: an10; animation: flicker1 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an8 { grid-area: an8; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }
        #an11 { grid-area: an11; animation: flicker0 infinite ${0.5 * speedMultiplier[speed]}s; }

        @keyframes flicker0 {
          0%, 49% {
            background: ${currentVariant.ghost};
            border-radius: 2px;
            ${variant === 'neon' ? 'box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);' : ''}
            ${variant === 'cosmic' ? 'box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);' : ''}
            ${variant === 'fire' ? 'box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);' : ''}
            ${variant === 'ice' ? 'box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);' : ''}
          }
          50%, 100% {
            background: transparent;
            box-shadow: none;
          }
        }

        @keyframes flicker1 {
          0%, 49% {
            background: transparent;
          }
          50%, 100% {
            background: ${currentVariant.ghost};
            border-radius: 2px;
            ${variant === 'neon' ? 'box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);' : ''}
            ${variant === 'cosmic' ? 'box-shadow: 0 0 15px rgba(139, 92, 246, 0.4);' : ''}
            ${variant === 'fire' ? 'box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);' : ''}
            ${variant === 'ice' ? 'box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);' : ''}
          }
        }

        /* Enhanced Eye Design with Advanced Effects */
        #eye {
          width: 40px;
          height: 50px;
          position: absolute;
          top: 30px;
          left: 10px;
        }

        #eye::before {
          content: "";
          background: ${currentVariant.eyes};
          width: 20px;
          height: 50px;
          transform: translateX(10px);
          display: block;
          position: absolute;
          border-radius: 10px;
          box-shadow: 0 2px 8px ${currentVariant.eyeShadow}, 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
        }

        #eye::after {
          content: "";
          background: ${currentVariant.eyes};
          width: 40px;
          height: 30px;
          transform: translateY(10px);
          display: block;
          position: absolute;
          border-radius: 15px;
          box-shadow: 0 2px 8px ${currentVariant.eyeShadow}, 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
        }

        #eye1 {
          width: 40px;
          height: 50px;
          position: absolute;
          top: 30px;
          right: 30px;
        }

        #eye1::before {
          content: "";
          background: ${currentVariant.eyes};
          width: 20px;
          height: 50px;
          transform: translateX(10px);
          display: block;
          position: absolute;
          border-radius: 10px;
          box-shadow: 0 2px 8px ${currentVariant.eyeShadow}, 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
        }

        #eye1::after {
          content: "";
          background: ${currentVariant.eyes};
          width: 40px;
          height: 30px;
          transform: translateY(10px);
          display: block;
          position: absolute;
          border-radius: 15px;
          box-shadow: 0 2px 8px ${currentVariant.eyeShadow}, 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.3), 0 1px 3px rgba(0, 0, 0, 0.1);' : ''}
        }

        /* Enhanced Pupil Design with Advanced Effects */
        #pupil {
          width: 20px;
          height: 20px;
          background: ${currentVariant.pupils};
          position: absolute;
          top: 50px;
          left: 10px;
          z-index: 2;
          animation: eyesMovement infinite ${3 * speedMultiplier[speed]}s;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
        }

        #pupil1 {
          width: 20px;
          height: 20px;
          background: ${currentVariant.pupils};
          position: absolute;
          top: 50px;
          right: 50px;
          z-index: 2;
          animation: eyesMovement infinite ${3 * speedMultiplier[speed]}s;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.4);
          ${variant === 'cosmic' ? 'box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 2px 8px rgba(6, 182, 212, 0.4), inset 0 1px 3px rgba(255, 255, 255, 0.3);' : ''}
        }

        @keyframes eyesMovement {
          0%, 49% {
            transform: translateX(0px);
          }
          50%, 99% {
            transform: translateX(10px);
          }
          100% {
            transform: translateX(0px);
          }
        }

        #shadow {
          background: ${currentVariant.shadow};
          width: 140px;
          height: 140px;
          position: absolute;
          border-radius: 50%;
          transform: rotateX(80deg);
          filter: blur(20px);
          top: 80%;
          animation: shadowMovement infinite ${0.5 * speedMultiplier[speed]}s;
          opacity: 0.3;
          ${variant === 'neon' ? 'box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);' : ''}
          ${variant === 'cosmic' ? 'box-shadow: 0 0 25px rgba(139, 92, 246, 0.4);' : ''}
          ${variant === 'fire' ? 'box-shadow: 0 0 25px rgba(239, 68, 68, 0.4);' : ''}
          ${variant === 'ice' ? 'box-shadow: 0 0 25px rgba(6, 182, 212, 0.4);' : ''}
        }

        @keyframes shadowMovement {
          0%, 49% {
            opacity: 0.3;
          }
          50%, 100% {
            opacity: 0.1;
          }
        }

        /* Dark mode adjustments */
        @media (prefers-color-scheme: dark) {
          #eye::before,
          #eye::after,
          #eye1::before,
          #eye1::after {
            background: ${currentVariant.eyes};
            box-shadow: 0 2px 8px ${currentVariant.eyeShadow}, 0 1px 3px rgba(0, 0, 0, 0.2);
          }
          
          #shadow {
            background: ${variant === 'minimal' ? 'linear-gradient(135deg, #1f2937, #374151)' : currentVariant.shadow};
          }
        }

        /* Enhanced hover effects */
        #ghost:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          #ghost {
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
} 