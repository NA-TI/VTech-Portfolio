import { useAnime } from "../hooks/useAnime";

// Animation presets for common use cases
export const animationPresets = {
  // Entrance animations
  fadeIn: {
    opacity: [0, 1],
    duration: 600,
    easing: "easeOutQuart",
  },

  slideInFromLeft: {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 800,
    easing: "easeOutBack",
  },

  slideInFromRight: {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 800,
    easing: "easeOutBack",
  },

  slideInFromBottom: {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 800,
    easing: "easeOutBack",
  },

  scaleIn: {
    opacity: [0, 1],
    scale: [0.8, 1],
    duration: 600,
    easing: "easeOutElastic(1, 0.5)",
  },

  rotateIn: {
    opacity: [0, 1],
    rotate: [180, 0],
    scale: [0.5, 1],
    duration: 1000,
    easing: "easeOutBack",
  },

  // Hover animations
  hoverScale: {
    scale: [1, 1.05],
    duration: 300,
    easing: "easeOutQuart",
  },

  hoverLift: {
    translateY: [0, -10],
    scale: [1, 1.02],
    duration: 300,
    easing: "easeOutQuart",
  },

  hoverGlow: {
    boxShadow: [
      "0 4px 6px rgba(0, 0, 0, 0.1)",
      "0 10px 25px rgba(59, 130, 246, 0.3)",
    ],
    duration: 300,
    easing: "easeOutQuart",
  },

  // Exit animations
  fadeOut: {
    opacity: [1, 0],
    duration: 400,
    easing: "easeInQuart",
  },

  slideOutToLeft: {
    opacity: [1, 0],
    translateX: [0, -50],
    duration: 400,
    easing: "easeInQuart",
  },

  slideOutToRight: {
    opacity: [1, 0],
    translateX: [0, 50],
    duration: 400,
    easing: "easeInQuart",
  },

  // Special effects
  bounce: {
    translateY: [0, -20, 0],
    duration: 600,
    easing: "easeInOutQuad",
  },

  pulse: {
    scale: [1, 1.1, 1],
    duration: 1000,
    easing: "easeInOutQuad",
    loop: true,
  },

  shake: {
    translateX: [0, -10, 10, -10, 10, 0],
    duration: 500,
    easing: "easeInOutQuad",
  },

  wiggle: {
    rotate: [0, -5, 5, -5, 5, 0],
    duration: 500,
    easing: "easeInOutQuad",
  },

  // Particle effects
  particleFloat: {
    translateX: () => Math.random() * 100 - 50,
    translateY: () => Math.random() * 100 - 50,
    scale: () => Math.random() * 0.5 + 0.5,
    opacity: () => Math.random() * 0.5 + 0.3,
    duration: () => Math.random() * 3000 + 2000,
    easing: "easeInOutSine",
    direction: "alternate",
    loop: true,
  },

  // Morphing animations
  morphCircle: {
    borderRadius: ["50%", "0%", "50% 0% 50% 0%", "50%"],
    rotate: [0, 90, 180, 360],
    duration: 2000,
    easing: "easeInOutQuart",
    loop: true,
  },

  // Loading animations
  loadingSpin: {
    rotate: [0, 360],
    duration: 1000,
    easing: "linear",
    loop: true,
  },

  loadingPulse: {
    scale: [1, 1.2, 1],
    opacity: [0.5, 1, 0.5],
    duration: 1500,
    easing: "easeInOutQuad",
    loop: true,
  },

  // Text animations
  typewriter: {
    width: ["0%", "100%"],
    duration: 2000,
    easing: "easeInOutQuart",
  },

  textReveal: {
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 600,
    delay: (el: any, i: number) => i * 100,
    easing: "easeOutQuart",
  },
};

// Stagger configurations
export const staggerConfigs = {
  small: 50,
  medium: 100,
  large: 200,
  extraLarge: 300,
};

// Easing functions
export const easingFunctions = {
  smooth: "easeInOutQuart",
  bouncy: "easeOutBack",
  elastic: "easeOutElastic(1, 0.5)",
  sharp: "easeInOutCubic",
  gentle: "easeInOutSine",
};

// Hook for easy animation usage
export const useAnimationPresets = () => {
  const { animate, timeline, stagger } = useAnime();

  const applyPreset = (
    targets: string | Element | NodeList | null,
    preset: string,
    options = {}
  ) => {
    const presetConfig =
      animationPresets[preset as keyof typeof animationPresets];
    if (!presetConfig) {
      console.warn(`Animation preset "${preset}" not found`);
      return;
    }

    return animate(targets, {
      ...presetConfig,
      ...options,
    });
  };

  const applyStaggeredPreset = (
    targets: string | Element | NodeList | null,
    preset: string,
    staggerDelay: number = staggerConfigs.medium,
    options = {}
  ) => {
    const presetConfig =
      animationPresets[preset as keyof typeof animationPresets];
    if (!presetConfig) {
      console.warn(`Animation preset "${preset}" not found`);
      return;
    }

    return animate(targets, {
      ...presetConfig,
      delay: stagger(staggerDelay),
      ...options,
    });
  };

  const createSequence = (
    animations: Array<{
      targets: string | Element | NodeList | null;
      preset: string;
      options?: any;
      position?: string;
    }>
  ) => {
    const tl = timeline();

    animations.forEach(
      ({ targets, preset, options = {}, position = "+=0" }) => {
        const presetConfig =
          animationPresets[preset as keyof typeof animationPresets];
        if (presetConfig) {
          tl.add(
            {
              targets,
              ...presetConfig,
              ...options,
            },
            position
          );
        }
      }
    );

    return tl;
  };

  return {
    applyPreset,
    applyStaggeredPreset,
    createSequence,
    presets: animationPresets,
    staggerConfigs,
    easingFunctions,
  };
};

// Utility functions for common animation patterns
export const animationUtils = {
  // Create a floating animation for elements
  createFloatingAnimation: (targets: string | Element | NodeList | null) => {
    const { animate } = useAnime();
    return animate(targets, {
      translateY: [0, -10, 0],
      duration: 2000,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  },

  // Create a breathing animation
  createBreathingAnimation: (targets: string | Element | NodeList | null) => {
    const { animate } = useAnime();
    return animate(targets, {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      duration: 3000,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });
  },

  // Create a wave animation for multiple elements
  createWaveAnimation: (targets: string | Element | NodeList | null) => {
    const { animate, stagger } = useAnime();
    return animate(targets, {
      translateY: [0, -20, 0],
      duration: 1000,
      delay: stagger(100),
      easing: "easeInOutQuad",
      direction: "alternate",
      loop: true,
    });
  },

  // Create a ripple effect
  createRippleEffect: (x: number, y: number, container: HTMLElement) => {
    const { animate } = useAnime();
    const ripple = document.createElement("div");
    ripple.className =
      "absolute w-4 h-4 bg-cyan-400/20 rounded-full pointer-events-none";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    container.appendChild(ripple);

    animate(ripple, {
      scale: [0, 3],
      opacity: [0.5, 0],
      duration: 1000,
      easing: "easeOutQuart",
      complete: () => ripple.remove(),
    });
  },
};
