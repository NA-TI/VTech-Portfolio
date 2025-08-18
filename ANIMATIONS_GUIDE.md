# Advanced Animations Guide

This guide covers the advanced animations implemented using [anime.js](https://animejs.com/) in your VTech portfolio. These animations provide sophisticated visual effects that enhance user experience and engagement.

## 🚀 Quick Start

### Installation

The required dependencies are already installed:

```bash
npm install animejs @types/animejs
```

### Basic Usage

```tsx
import { useAnime } from "../hooks/useAnime";

function MyComponent() {
  const { animate, timeline, stagger } = useAnime();

  useEffect(() => {
    animate(".my-element", {
      opacity: [0, 1],
      translateY: [50, 0],
      duration: 800,
      easing: "easeOutBack",
    });
  }, [animate]);

  return <div className="my-element">Animated content</div>;
}
```

## 📚 Components Overview

### 1. EnhancedLoadingScreen

A sophisticated loading screen with particle effects, morphing shapes, and progress indicators.

**Features:**

- Floating particles with random movement
- Morphing logo with elastic animations
- Progress bar with real-time updates
- Smooth exit animations

**Usage:**

```tsx
import EnhancedLoadingScreen from "../components/EnhancedLoadingScreen";

<EnhancedLoadingScreen isLoading={true} contentLoaded={false} />;
```

### 2. AnimatedBackground

Dynamic background with floating particles, morphing shapes, and interactive effects.

**Features:**

- Configurable particle count
- Morphing geometric shapes
- Mouse-following ripple effects
- Ambient light effects

**Usage:**

```tsx
import AnimatedBackground from "../components/AnimatedBackground";

<AnimatedBackground
  particleCount={50}
  morphingShapes={true}
  interactive={true}
/>;
```

### 3. EnhancedInteractiveElements

Interactive cards with advanced hover animations and particle effects.

**Features:**

- Staggered entrance animations
- Particle systems on hover
- Morphing icons
- Animated underlines
- Glow effects

**Usage:**

```tsx
import EnhancedInteractiveElements from "../components/EnhancedInteractiveElements";

<EnhancedInteractiveElements />;
```

### 4. ScrollTriggeredAnimations

Scroll-based animations with intersection observer integration.

**Features:**

- Progress indicators
- Staggered card reveals
- Text slide-in effects
- Morphing shapes
- Timeline control

**Usage:**

```tsx
import ScrollTriggeredAnimations from "../components/ScrollTriggeredAnimations";

<ScrollTriggeredAnimations />;
```

## 🎨 Animation Presets

Use the predefined animation presets for consistent effects:

```tsx
import { useAnimationPresets } from "../lib/animationPresets";

function MyComponent() {
  const { applyPreset, applyStaggeredPreset } = useAnimationPresets();

  useEffect(() => {
    // Apply a single preset
    applyPreset(".element", "fadeIn");

    // Apply with stagger
    applyStaggeredPreset(".elements", "slideInFromBottom", 200);
  }, [applyPreset, applyStaggeredPreset]);

  return (
    <div>
      <div className="element">Single element</div>
      <div className="elements">Element 1</div>
      <div className="elements">Element 2</div>
      <div className="elements">Element 3</div>
    </div>
  );
}
```

### Available Presets

#### Entrance Animations

- `fadeIn` - Simple fade in
- `slideInFromLeft` - Slide from left
- `slideInFromRight` - Slide from right
- `slideInFromBottom` - Slide from bottom
- `scaleIn` - Scale with elastic effect
- `rotateIn` - Rotate and scale in

#### Hover Animations

- `hoverScale` - Scale on hover
- `hoverLift` - Lift and scale
- `hoverGlow` - Add glow effect

#### Special Effects

- `bounce` - Bounce animation
- `pulse` - Continuous pulse
- `shake` - Shake effect
- `wiggle` - Wiggle rotation
- `particleFloat` - Floating particles
- `morphCircle` - Morphing shapes

#### Loading Animations

- `loadingSpin` - Continuous rotation
- `loadingPulse` - Pulsing effect

#### Text Animations

- `typewriter` - Typewriter effect
- `textReveal` - Staggered text reveal

## 🛠️ Custom Animations

### Basic Animation

```tsx
const { animate } = useAnime();

animate(".target", {
  opacity: [0, 1],
  translateY: [50, 0],
  duration: 800,
  easing: "easeOutBack",
  delay: 200,
});
```

### Timeline Animation

```tsx
const { timeline } = useAnime();

const tl = timeline();
tl.add({
  targets: ".element1",
  opacity: [0, 1],
  duration: 600,
}).add(
  {
    targets: ".element2",
    translateX: [-100, 0],
    duration: 800,
  },
  "-=300"
); // Start 300ms before previous animation ends
```

### Staggered Animation

```tsx
const { animate, stagger } = useAnime();

animate(".elements", {
  opacity: [0, 1],
  translateY: [30, 0],
  duration: 600,
  delay: stagger(100), // 100ms delay between each element
  easing: "easeOutQuart",
});
```

### Random Values

```tsx
const { animate, random } = useAnime();

animate(".particles", {
  translateX: () => random(-100, 100),
  translateY: () => random(-100, 100),
  scale: () => random(0.5, 1.5),
  duration: () => random(1000, 3000),
  easing: "easeInOutSine",
});
```

## 🎯 Advanced Techniques

### Scroll-Triggered Animations

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target, {
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 800,
            easing: "easeOutBack",
          });
        }
      });
    },
    { threshold: 0.1 }
  );

  const elements = document.querySelectorAll(".scroll-trigger");
  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}, [animate]);
```

### Particle Systems

```tsx
useEffect(() => {
  const particles = Array.from({ length: 20 }).map(() => {
    const particle = document.createElement("div");
    particle.className = "particle";
    container.appendChild(particle);
    return particle;
  });

  animate(particles, {
    translateX: () => random(-100, 100),
    translateY: () => random(-100, 100),
    scale: () => random(0.5, 1.5),
    opacity: () => random(0.1, 0.6),
    duration: () => random(2000, 5000),
    easing: "easeInOutSine",
    direction: "alternate",
    loop: true,
    delay: stagger(100),
  });
}, [animate, stagger, random]);
```

### Morphing Shapes

```tsx
animate(".shape", {
  borderRadius: ["50%", "0%", "50% 0% 50% 0%", "50%"],
  rotate: [0, 90, 180, 360],
  scale: [1, 1.2, 0.8, 1],
  duration: 3000,
  easing: "easeInOutQuart",
  loop: true,
});
```

## 🎨 Easing Functions

anime.js provides many built-in easing functions:

- `linear` - No easing
- `easeInQuad` - Quadratic ease in
- `easeOutQuad` - Quadratic ease out
- `easeInOutQuad` - Quadratic ease in/out
- `easeInCubic` - Cubic ease in
- `easeOutCubic` - Cubic ease out
- `easeInOutCubic` - Cubic ease in/out
- `easeInQuart` - Quartic ease in
- `easeOutQuart` - Quartic ease out
- `easeInOutQuart` - Quartic ease in/out
- `easeInBack` - Back ease in
- `easeOutBack` - Back ease out
- `easeInOutBack` - Back ease in/out
- `easeInElastic` - Elastic ease in
- `easeOutElastic` - Elastic ease out
- `easeInOutElastic` - Elastic ease in/out

## 📱 Performance Considerations

### Best Practices

1. **Use `transform` and `opacity`** for smooth animations
2. **Avoid animating layout properties** like `width`, `height`, `margin`, `padding`
3. **Use `will-change`** CSS property for elements that will animate
4. **Limit concurrent animations** to prevent performance issues
5. **Clean up animations** when components unmount

### Performance Monitoring

```tsx
useEffect(() => {
  const animation = animate(".element", {
    // animation config
  });

  return () => {
    if (animation) {
      animation.pause();
    }
  };
}, [animate]);
```

## 🎭 Demo Page

Visit `/animations-demo` to see all animations in action:

```tsx
// Navigate to the demo page
<Link href="/animations-demo">View Animation Demo</Link>
```

## 🔧 Customization

### Theme Integration

All animations use your existing color scheme:

- `vtech-cyan-400` - Primary cyan color
- `vtech-purple-400` - Primary purple color
- `gray-900` - Dark backgrounds
- `white` - Light backgrounds

### Responsive Design

Animations automatically adapt to different screen sizes:

- Reduced particle counts on mobile
- Simplified effects for better performance
- Touch-friendly interactions

## 📖 Resources

- [anime.js Official Documentation](https://animejs.com/documentation/)
- [anime.js GitHub Repository](https://github.com/juliangarnier/anime)
- [Easing Functions Reference](https://animejs.com/documentation/#easing)
- [Timeline API Documentation](https://animejs.com/documentation/#timeline)

## 🚀 Next Steps

1. **Explore the demo page** to see all animations in action
2. **Customize presets** in `src/lib/animationPresets.ts`
3. **Add new components** using the existing patterns
4. **Optimize performance** based on your specific needs
5. **Create custom easing functions** for unique effects

---

_This guide covers the advanced animations implemented in your VTech portfolio. For more information, refer to the anime.js documentation or explore the demo page._

