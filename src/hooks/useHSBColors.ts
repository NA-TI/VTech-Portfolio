import { useState, useEffect, useMemo } from "react";

// HSB Color Interface
interface HSBColor {
  hue: number;
  saturation: number;
  brightness: number;
}

// VTech Brand Color System
interface VTechColors {
  slate: HSBColor;
  cyan: HSBColor;
  orange: HSBColor;
}

// HSB Color Variations
interface ColorVariations {
  light: HSBColor;
  base: HSBColor;
  dark: HSBColor;
  enriched: HSBColor;
}

// Gradient Configuration
interface GradientConfig {
  type: "linear" | "radial";
  direction?:
    | "to-r"
    | "to-br"
    | "to-b"
    | "to-bl"
    | "to-l"
    | "to-tl"
    | "to-t"
    | "to-tr";
  stops: HSBColor[];
  positions?: number[];
}

export const useHSBColors = () => {
  // VTech Brand Colors (based on your current system)
  const brandColors: VTechColors = useMemo(
    () => ({
      slate: { hue: 220, saturation: 40, brightness: 30 }, // Your slate-800
      cyan: { hue: 190, saturation: 60, brightness: 50 }, // Your cyan-500
      orange: { hue: 30, saturation: 70, brightness: 50 }, // Your orange-500
    }),
    []
  );

  // Generate color variations using HSB principles
  const generateVariations = (baseColor: HSBColor): ColorVariations => {
    return {
      light: {
        hue: baseColor.hue,
        saturation: Math.max(10, baseColor.saturation * 0.3),
        brightness: Math.min(98, baseColor.brightness + 40),
      },
      base: baseColor,
      dark: {
        hue: baseColor.hue,
        saturation: Math.min(95, baseColor.saturation * 1.2), // Increase saturation
        brightness: Math.max(10, baseColor.brightness * 0.6), // Decrease brightness
      },
      enriched: {
        hue: baseColor.hue,
        saturation: Math.min(95, baseColor.saturation * 1.3),
        brightness: Math.min(90, baseColor.brightness * 1.1),
      },
    };
  };

  // Convert HSB to HSL string
  const hsbToHsl = (color: HSBColor): string => {
    return `hsl(${color.hue}, ${color.saturation}%, ${color.brightness}%)`;
  };

  // Convert HSB to CSS custom property
  const hsbToCSSVar = (color: HSBColor, prefix: string = "vtech"): string => {
    return `hsl(var(--${prefix}-hue), ${color.saturation}%, ${color.brightness}%)`;
  };

  // Generate gradient string
  const generateGradient = (config: GradientConfig): string => {
    const { type, direction = "to-r", stops, positions } = config;

    if (type === "linear") {
      const gradientStops = stops
        .map((stop, index) => {
          const position =
            positions?.[index] ?? (index / (stops.length - 1)) * 100;
          return `${hsbToHsl(stop)} ${position}%`;
        })
        .join(", ");

      return `linear-gradient(${direction}, ${gradientStops})`;
    } else {
      const gradientStops = stops
        .map((stop, index) => {
          const position =
            positions?.[index] ?? (index / (stops.length - 1)) * 100;
          return `${hsbToHsl(stop)} ${position}%`;
        })
        .join(", ");

      return `radial-gradient(circle, ${gradientStops})`;
    }
  };

  // VTech Brand Gradients (matching your current usage)
  const brandGradients = useMemo(
    () => ({
      // Your current "from-slate-800 via-cyan-500 to-orange-500"
      primary: generateGradient({
        type: "linear",
        direction: "to-r",
        stops: [brandColors.slate, brandColors.cyan, brandColors.orange],
        positions: [0, 50, 100],
      }),

      // Your current "from-slate-800 to-blue-600"
      secondary: generateGradient({
        type: "linear",
        direction: "to-r",
        stops: [
          brandColors.slate,
          { ...brandColors.cyan, brightness: 40 }, // Darker cyan
        ],
      }),

      // Subtle background gradient
      subtle: generateGradient({
        type: "linear",
        direction: "to-br",
        stops: [
          { ...brandColors.slate, saturation: 8, brightness: 98 },
          { ...brandColors.cyan, saturation: 10, brightness: 95 },
        ],
      }),

      // Dark gradient for CTAs
      dark: generateGradient({
        type: "linear",
        direction: "to-br",
        stops: [
          { ...brandColors.slate, brightness: 20 },
          { ...brandColors.cyan, brightness: 30 },
        ],
      }),
    }),
    [brandColors]
  );

  // Enhanced hover effects using HSB principles
  const hoverEffects = useMemo(
    () => ({
      // "Remove white" principle for darker hover
      darken: (color: HSBColor, factor: number = 0.8): HSBColor => ({
        hue: color.hue,
        saturation: Math.min(95, color.saturation * 1.1), // Increase saturation
        brightness: Math.max(10, color.brightness * factor), // Decrease brightness
      }),

      // "Add white" principle for lighter hover
      lighten: (color: HSBColor, factor: number = 1.2): HSBColor => ({
        hue: color.hue,
        saturation: Math.max(10, color.saturation * 0.9), // Decrease saturation
        brightness: Math.min(98, color.brightness * factor), // Increase brightness
      }),

      // Enrich color (increase saturation and brightness)
      enrich: (color: HSBColor, factor: number = 1.2): HSBColor => ({
        hue: color.hue,
        saturation: Math.min(95, color.saturation * factor),
        brightness: Math.min(90, color.brightness * factor),
      }),
    }),
    []
  );

  // Service-specific color variations
  const serviceColors = useMemo(
    () => ({
      custom: generateVariations(brandColors.slate),
      mobile: generateVariations(brandColors.cyan),
      cloud: generateVariations(brandColors.orange),
      ai: generateVariations({ hue: 120, saturation: 60, brightness: 50 }), // Green
      consulting: generateVariations({
        hue: 270,
        saturation: 60,
        brightness: 50,
      }), // Purple
      support: generateVariations({ hue: 0, saturation: 60, brightness: 50 }), // Red
    }),
    [brandColors]
  );

  // Dynamic theme adjustment
  const [themeHue, setThemeHue] = useState(0);

  const adjustThemeHue = (adjustment: number) => {
    setThemeHue((prev) => (prev + adjustment) % 360);
  };

  // Get adjusted colors based on theme
  const getAdjustedColors = (baseColors: VTechColors): VTechColors => {
    if (themeHue === 0) return baseColors;

    return {
      slate: {
        ...baseColors.slate,
        hue: (baseColors.slate.hue + themeHue) % 360,
      },
      cyan: { ...baseColors.cyan, hue: (baseColors.cyan.hue + themeHue) % 360 },
      orange: {
        ...baseColors.orange,
        hue: (baseColors.orange.hue + themeHue) % 360,
      },
    };
  };

  // Accessibility helpers
  const getContrastColor = (backgroundColor: HSBColor): HSBColor => {
    // Simple luminance calculation
    const luminance = backgroundColor.brightness / 100;
    return luminance > 0.5
      ? { hue: 0, saturation: 0, brightness: 20 } // Dark text
      : { hue: 0, saturation: 0, brightness: 95 }; // Light text
  };

  // CSS-in-JS helpers
  const createStyles = {
    gradient: (gradient: string) => ({ background: gradient }),
    color: (color: HSBColor) => ({ color: hsbToHsl(color) }),
    backgroundColor: (color: HSBColor) => ({
      backgroundColor: hsbToHsl(color),
    }),
    borderColor: (color: HSBColor) => ({ borderColor: hsbToHsl(color) }),
    textGradient: (gradient: string) => ({
      background: gradient,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }),
  };

  return {
    // Core colors
    brandColors,
    getAdjustedColors,

    // Utilities
    hsbToHsl,
    hsbToCSSVar,
    generateGradient,
    generateVariations,

    // Pre-built gradients
    brandGradients,

    // Hover effects
    hoverEffects,

    // Service colors
    serviceColors,

    // Theme controls
    themeHue,
    setThemeHue,
    adjustThemeHue,

    // Accessibility
    getContrastColor,

    // Style helpers
    createStyles,
  };
};



