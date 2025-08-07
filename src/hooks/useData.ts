import { useState, useEffect, useCallback, useRef } from 'react';

// Global cache store
class DataCache {
  private cache = new Map<string, any>();
  private subscribers = new Map<string, Set<Function>>();
  private broadcast?: BroadcastChannel;

  constructor() {
    // Set up cross-tab communication
    if (typeof window !== 'undefined') {
      this.broadcast = new BroadcastChannel('portfolio-data-sync');
      this.broadcast.onmessage = (event) => {
        const { type, key, data } = event.data;
        if (type === 'cache-update') {
          this.cache.set(key, data);
          this.notifySubscribers(key, data);
        } else if (type === 'cache-invalidate') {
          this.cache.delete(key);
          this.notifySubscribers(key, null);
        }
      };
    }
  }

  get(key: string) {
    return this.cache.get(key);
  }

  set(key: string, data: any, broadcast = true) {
    this.cache.set(key, data);
    this.notifySubscribers(key, data);
    
    if (broadcast && this.broadcast) {
      this.broadcast.postMessage({
        type: 'cache-update',
        key,
        data
      });
    }
  }

  invalidate(key: string, broadcast = true) {
    this.cache.delete(key);
    this.notifySubscribers(key, null);
    
    if (broadcast && this.broadcast) {
      this.broadcast.postMessage({
        type: 'cache-invalidate',
        key
      });
    }
  }

  subscribe(key: string, callback: Function) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)!.add(callback);

    // Return unsubscribe function
    return () => {
      const keySubscribers = this.subscribers.get(key);
      if (keySubscribers) {
        keySubscribers.delete(callback);
        if (keySubscribers.size === 0) {
          this.subscribers.delete(key);
        }
      }
    };
  }

  private notifySubscribers(key: string, data: any) {
    const keySubscribers = this.subscribers.get(key);
    if (keySubscribers) {
      keySubscribers.forEach(callback => callback(data));
    }
  }
}

// Global cache instance
const globalCache = new DataCache();

// Profile data interfaces
export interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'bold-color' | 'italic-color';
  color?: string;
}

export interface ProfileData {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  email: string;
  location?: string;
  social_links?: Record<string, string>;
  skills?: string[];
  experience_years?: number;
  available_for_projects?: boolean;
  styled_words?: StyledWord[];
  created_at?: string;
  updated_at?: string;
}

export interface ProfileResponse {
  success: boolean;
  data?: ProfileData;
  error?: string;
}

// Skills data interfaces
export interface SkillData {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  color_gradient?: string;
  proficiency: number;
  styled_words?: StyledWord[];
  created_at?: string;
  updated_at?: string;
}

export interface SkillsResponse {
  success: boolean;
  data?: SkillData[];
  error?: string;
}

// Projects data interfaces
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'graphics' | '3d';
  image_url: string;
  live_url?: string;
  github_url?: string;
  technologies?: string[];
  featured?: boolean;
  styled_words?: StyledWord[];
  created_at?: string;
  updated_at?: string;
}

export interface ProjectsResponse {
  success: boolean;
  data?: ProjectData[];
  error?: string;
}

export interface UseDataOptions {
  revalidateOnFocus?: boolean;
  revalidateInterval?: number;
  optimisticUpdate?: boolean;
  cacheTime?: number;
}

export function useData<T>(
  endpoint: string,
  options: UseDataOptions = {}
) {
  const {
    revalidateOnFocus = true,
    revalidateInterval = 0,
    optimisticUpdate = true,
    cacheTime = 5 * 60 * 1000 // 5 minutes
  } = options;

  const [data, setData] = useState<T | null>(() => globalCache.get(endpoint));
  const [isLoading, setIsLoading] = useState(!data);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  
  const lastFetchTime = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch function
  const fetchData = useCallback(async (showLoading = true) => {
    if (showLoading && !data) setIsLoading(true);
    setIsValidating(true);
    setError(null);

    try {
      const response = await fetch(endpoint, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      lastFetchTime.current = Date.now();
      
      // Update cache and state
      globalCache.set(endpoint, result, true);
      setData(result);
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('Fetch error:', err);
      throw err;
    } finally {
      setIsLoading(false);
      setIsValidating(false);
    }
  }, [endpoint, data]);

  // Mutate function for optimistic updates
  const mutate = useCallback(async (
    newData?: T | ((current: T | null) => T),
    shouldRevalidate = true
  ) => {
    // Optimistic update
    if (newData !== undefined) {
      const updatedData = typeof newData === 'function' 
        ? (newData as Function)(data) 
        : newData;
      
      setData(updatedData);
      globalCache.set(endpoint, updatedData, true);
    }

    // Revalidate if needed
    if (shouldRevalidate) {
      try {
        await fetchData(false);
      } catch (err) {
        // Revert on error if we had optimistic update
        if (newData !== undefined) {
          const cachedData = globalCache.get(endpoint);
          if (cachedData) {
            setData(cachedData);
          }
        }
        throw err;
      }
    }
  }, [data, endpoint, fetchData]);

  // Invalidate cache
  const invalidate = useCallback(() => {
    globalCache.invalidate(endpoint, true);
    setData(null);
    fetchData();
  }, [endpoint, fetchData]);

  // Subscribe to cache updates
  useEffect(() => {
    const unsubscribe = globalCache.subscribe(endpoint, (newData: T | null) => {
      setData(newData);
      if (newData === null) {
        fetchData();
      }
    });

    return unsubscribe;
  }, [endpoint, fetchData]);

  // Initial fetch
  useEffect(() => {
    const cachedData = globalCache.get(endpoint);
    const now = Date.now();
    const isStale = !cachedData || (now - lastFetchTime.current > cacheTime);

    if (!cachedData || isStale) {
      fetchData();
    } else {
      setData(cachedData);
      setIsLoading(false);
    }
  }, [endpoint, fetchData, cacheTime]);

  // Revalidate on focus
  useEffect(() => {
    if (!revalidateOnFocus) return;

    const handleFocus = () => {
      const now = Date.now();
      if (now - lastFetchTime.current > 30000) { // 30 seconds
        fetchData(false);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [revalidateOnFocus, fetchData]);

  // Interval revalidation
  useEffect(() => {
    if (!revalidateInterval || revalidateInterval <= 0) return;

    intervalRef.current = setInterval(() => {
      fetchData(false);
    }, revalidateInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [revalidateInterval, fetchData]);

  return {
    data,
    isLoading,
    error,
    isValidating,
    mutate,
    invalidate,
    refetch: () => fetchData(false)
  };
}

// Enhanced hook functions with real-time features
export function useProjects(category?: string, featured?: boolean) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (featured) params.append('featured', 'true');
  
  const endpoint = `/api/projects${params.toString() ? `?${params.toString()}` : ''}`;
  return useData<ProjectsResponse>(endpoint, {
    revalidateOnFocus: true,
    cacheTime: 3 * 60 * 1000, // 3 minutes for projects
  });
}

export function useSkills() {
  return useData<SkillsResponse>('/api/skills', {
    revalidateOnFocus: true,
    revalidateInterval: 30000, // Revalidate every 30 seconds
    cacheTime: 2 * 60 * 1000, // 2 minutes for skills
  });
}

export function useProfile() {
  return useData<ProfileResponse>('/api/profile', {
    revalidateOnFocus: true,
    cacheTime: 10 * 60 * 1000, // 10 minutes for profile
  });
}

// Utility functions for cache management
export const dataCache = {
  invalidateAll: () => {
    if (typeof window !== 'undefined') {
      ['/api/skills', '/api/projects', '/api/profile'].forEach(key => {
        globalCache.invalidate(key, true);
      });
    }
  },
  
  invalidateSkills: () => {
    globalCache.invalidate('/api/skills', true);
  },
  
  invalidateProjects: () => {
    globalCache.invalidate('/api/projects', true);
  },
  
  invalidateProfile: () => {
    globalCache.invalidate('/api/profile', true);
  },

  optimisticUpdateSkill: (skillId: string, updates: Partial<SkillData>) => {
    const currentData = globalCache.get('/api/skills') as SkillsResponse;
    if (currentData?.data) {
      const updatedData = {
        ...currentData,
        data: currentData.data.map(skill => 
          skill.id === skillId ? { ...skill, ...updates } : skill
        )
      };
      globalCache.set('/api/skills', updatedData, true);
    }
  },

  optimisticAddSkill: (newSkill: SkillData) => {
    const currentData = globalCache.get('/api/skills') as SkillsResponse;
    if (currentData?.data) {
      const updatedData = {
        ...currentData,
        data: [newSkill, ...currentData.data]
      };
      globalCache.set('/api/skills', updatedData, true);
    }
  },

  optimisticRemoveSkill: (skillId: string) => {
    const currentData = globalCache.get('/api/skills') as SkillsResponse;
    if (currentData?.data) {
      const updatedData = {
        ...currentData,
        data: currentData.data.filter(skill => skill.id !== skillId)
      };
      globalCache.set('/api/skills', updatedData, true);
    }
  }
}; 