import { useState, useEffect } from "react";

interface SiteContent {
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      primaryButton: string;
      secondaryButton: string;
    };
    promotional?: {
      line1: string;
      line2: string;
      line3: string;
      line4: string;
      companyName: string;
      tagline: string;
      logoImage?: string;
    };
    services: {
      title: string;
      subtitle: string;
      description: string;
      ctaText: string;
    };
    testimonialsSection: {
      title: string;
      subtitle: string;
    };
    capabilities?: Array<{
      title: string;
      capability: string;
      metrics: string;
      icon: string; // emoji or icon name
      description: string;
    }>;
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
    // Enhanced components data
    metrics?: Array<{
      value: string;
      label: string;
      description: string;
      icon: string;
      color: string;
      suffix?: string;
      prefix?: string;
    }>;
    processSteps?: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      deliverables: string[];
    }>;
    testimonials?: Array<{
      id: string;
      name: string;
      title: string;
      company: string;
      content: string;
      rating: number;
      image: string;
      projectType: string;
      duration: string;
      results: Array<{
        metric: string;
        improvement: string;
        timeframe: string;
      }>;
    }>;
    interactiveFeatures?: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      details: string;
    }>;
  };
  company: {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
    available: boolean;
  };
  navigation: {
    brand: string;
    logoImage?: string;
    items: Array<{
      label: string;
      href: string;
      icon?: string;
    }>;
  };
  footer: {
    description: string;
    copyright: string;
    columns: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    social: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  about: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    sections: Array<{
      title: string;
      content: string;
      image?: string;
    }>;
    teamMembers?: Array<{
      id: string;
      name: string;
      role: string;
      description: string;
      avatar: string;
      photo?: string;
      skills: string[];
      social: Array<{
        platform: string;
        url: string;
        icon: string;
      }>;
      status: "online" | "offline" | "busy";
    }>;
  };
  services: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  contact: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    info: {
      title: string;
      description: string;
    };
  };
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

// Default fallback content
const defaultContent: SiteContent = {
  homepage: {
    hero: {
      title: "Build Software Solutions That Scale",
      subtitle: "Software Development • Cloud Solutions • Digital Innovation",
      description:
        "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
      primaryButton: "Start Your Project",
      secondaryButton: "View Our Work",
    },
    services: {
      title: "What We Build",
      subtitle: "Comprehensive Development Services",
      description:
        "From concept to deployment, we handle every aspect of your software development needs.",
      ctaText: "See All Services",
    },
    testimonialsSection: {
      title: "Trusted by Startups",
      subtitle: "What Our Clients Say",
    },
    cta: {
      title: "Ready to Build Your Next Project?",
      description:
        "Let's discuss how we can help bring your ideas to life with custom software solutions.",
      buttonText: "Get Started Today",
    },
    promotional: {
      line1: "We don't just",
      line2: "build software",
      line3: "—we build solutions that drive",
      line4: "measurable business results",
      companyName: "VTech Team",
      tagline: "Delivering excellence since 2020",
      logoImage: "",
    },
  },
  company: {
    name: "VTech Software Solutions",
    tagline: "Building Tomorrow's Software Today",
    bio: "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
    email: "vtechofficial@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "Addis Ababa, Ethiopia",
    logo: "/window.svg",
    available: true,
  },
  navigation: {
    brand: "VTech",
    logoImage: "",
    items: [
      { label: "Home", href: "/", icon: "home" },
      { label: "About", href: "/about", icon: "user" },
      { label: "Services", href: "/services", icon: "briefcase" },
      { label: "Projects", href: "/projects", icon: "folder" },
      { label: "Contact", href: "/contact", icon: "mail" },
    ],
  },
  footer: {
    description:
      "Building scalable software solutions that drive business growth. From web applications to cloud infrastructure, we deliver technology that works.",
    copyright: "VTech Software Solutions. All rights reserved.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Services", href: "/services" },
          { label: "Portfolio", href: "/portfolio" },

          { label: "Case Studies", href: "/case-studies" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Support", href: "/support" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" },
        ],
      },
    ],
    social: [
      {
        platform: "GitHub",
        url: "https://github.com/vtech-solutions",
        icon: "github",
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/company/vtech-solutions",
        icon: "linkedin",
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/vtechsolutions",
        icon: "twitter",
      },
    ],
  },
  about: {
    hero: {
      title: "We Build Software That Actually Works",
      subtitle: "Our Story",
      description:
        "Founded with a mission to create reliable, scalable software solutions that help businesses thrive in the digital age.",
    },
    sections: [
      {
        title: "Our Mission",
        content:
          "To deliver high-quality software solutions that solve real business problems and drive growth for our clients.",
      },
      {
        title: "Our Approach",
        content:
          "We combine cutting-edge technology with proven methodologies to create software that's both innovative and reliable.",
      },
    ],
  },
  services: {
    hero: {
      title: "Software Development Services",
      subtitle: "What We Offer",
      description:
        "Comprehensive development services from concept to deployment.",
    },
    cta: {
      title: "Ready to Start Your Project?",
      description:
        "Let's discuss how we can help build your next software solution.",
      buttonText: "Get In Touch",
    },
  },
  contact: {
    hero: {
      title: "Let's Build Something Great Together",
      subtitle: "Get In Touch",
      description:
        "Ready to start your project? We'd love to hear about your ideas and discuss how we can help bring them to life.",
    },
    info: {
      title: "Get In Touch",
      description: "Ready to start your project? We'd love to hear from you.",
    },
  },
  seo: {
    defaultTitle:
      "VTech Software Solutions - Professional Software Development",
    defaultDescription:
      "VTech builds reliable software products and services. Custom web applications, mobile apps, cloud solutions, and digital innovation.",
    keywords: [
      "software development",
      "web development",
      "mobile apps",
      "cloud solutions",
      "custom software",
    ],
    ogImage: "/og-image.jpg",
  },
};

export function useContent() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with true to prevent flash
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Only load content on client side to prevent SSR/CSR mismatch
    if (typeof window !== "undefined") {
      loadContent();

      // Add content refresh function to window
      (window as any).vtechContentRefresh = loadContent;
    }
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch content from API with cache busting
      const timestamp = Date.now();
      const response = await fetch(`/api/content?t=${timestamp}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setContent(data.data);
          console.log("Content loaded from:", data.source || "database");
        } else {
          console.log("Using default content (API returned no data)");
          setContent(defaultContent);
        }
      } else {
        console.log(
          "Using default content (API error - status:",
          response.status,
          ")"
        );
        setContent(defaultContent);
      }
    } catch (error) {
      console.log("Using default content (fetch error):", error);
      setContent(defaultContent);
      setError(null); // Don't show error for public pages
    } finally {
      setIsLoading(false);
    }
  };

  const updateContent = async (newContent: Partial<SiteContent>) => {
    try {
      const response = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newContent),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setContent(data.data);
          return { success: true };
        }
      }

      throw new Error("Failed to update content");
    } catch (error) {
      console.error("Update content error:", error);
      setError("Failed to update content");
      return { success: false, error: "Failed to update content" };
    }
  };

  return {
    content: content || defaultContent,
    isLoading,
    error,
    isMounted,
    loadContent,
    updateContent,
  };
}

// Helper hook for specific sections
export function useHomepageContent() {
  const { content, isLoading, isMounted } = useContent();
  return {
    content: content.homepage,
    company: content.company,
    isLoading,
    isMounted,
  };
}

export function useNavigationContent() {
  const { content, isLoading, isMounted } = useContent();
  return {
    content: content.navigation,
    company: content.company,
    isLoading,
    isMounted,
  };
}

export function useFooterContent() {
  const { content, isLoading, isMounted } = useContent();
  return {
    content: content.footer,
    company: content.company,
    isLoading,
    isMounted,
  };
}

export function useSeoContent() {
  const { content, isLoading } = useContent();
  return {
    content: content.seo,
    isLoading,
  };
}
