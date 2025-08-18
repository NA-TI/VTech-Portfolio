import { useEffect, useRef, useCallback, useState } from "react";

// Dynamic import to ensure anime.js is only loaded on the client side
let anime: any = null;

export const useAnime = () => {
  const animeRef = useRef<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load anime.js on the client side
  useEffect(() => {
    const loadAnime = async () => {
      if (typeof window !== "undefined" && !anime) {
        try {
          const animeModule = await import("animejs");
          anime = (animeModule as any).default || animeModule;
          setIsLoaded(true);
        } catch (error) {
          console.error("Failed to load anime.js:", error);
        }
      } else if (anime) {
        setIsLoaded(true);
      }
    };

    loadAnime();
  }, []);

  const animate = useCallback(
    (targets: any, options: any) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return null;
      }

      if (animeRef.current) {
        animeRef.current.pause();
      }

      try {
        animeRef.current = anime({
          targets,
          ...options,
        });
        return animeRef.current;
      } catch (error) {
        console.error("Animation error:", error);
        return null;
      }
    },
    [isLoaded]
  );

  const timeline = useCallback(() => {
    if (!anime || !isLoaded) {
      console.warn("anime.js not loaded yet");
      return null;
    }

    try {
      return anime.timeline();
    } catch (error) {
      console.error("Timeline error:", error);
      return null;
    }
  }, [isLoaded]);

  const stagger = useCallback(
    (value: any, options?: any) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return 0;
      }

      try {
        return anime.stagger(value, options);
      } catch (error) {
        console.error("Stagger error:", error);
        return 0;
      }
    },
    [isLoaded]
  );

  const random = useCallback(
    (min: number, max: number) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return Math.random() * (max - min) + min;
      }

      try {
        return anime.random(min, max);
      } catch (error) {
        console.error("Random error:", error);
        return Math.random() * (max - min) + min;
      }
    },
    [isLoaded]
  );

  const easing = useCallback(
    (name: string, ...args: number[]) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return "easeInOutQuad";
      }

      try {
        return anime.easing(name, ...args);
      } catch (error) {
        console.error("Easing error:", error);
        return "easeInOutQuad";
      }
    },
    [isLoaded]
  );

  const createMotionPath = useCallback(
    (path: string) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return null;
      }

      try {
        return anime.path(path);
      } catch (error) {
        console.error("Motion path error:", error);
        return null;
      }
    },
    [isLoaded]
  );

  const createDrawable = useCallback(
    (path: string) => {
      if (!anime || !isLoaded) {
        console.warn("anime.js not loaded yet");
        return null;
      }

      try {
        return anime.path(path);
      } catch (error) {
        console.error("Drawable error:", error);
        return null;
      }
    },
    [isLoaded]
  );

  const morphTo = useCallback((target: string) => {
    return target;
  }, []);

  const onScroll = useCallback((options: any) => {
    return options;
  }, []);

  const createSpring = useCallback((options: any) => {
    return options;
  }, []);

  const createScope = useCallback((options: any) => {
    return options;
  }, []);

  useEffect(() => {
    return () => {
      if (animeRef.current) {
        try {
          animeRef.current.pause();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      }
    };
  }, []);

  return {
    animate,
    timeline,
    stagger,
    random,
    easing,
    createMotionPath,
    createDrawable,
    morphTo,
    onScroll,
    createSpring,
    createScope,
    isLoaded,
  };
};
