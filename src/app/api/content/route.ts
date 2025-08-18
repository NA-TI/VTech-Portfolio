import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Initialize Supabase client with admin credentials for content management
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This will store all editable content for the site
interface SiteContent {
  // Homepage
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      primaryButton: string;
      secondaryButton: string;
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
      icon: string;
      description: string;
    }>;
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
    // New sections for enhanced components
    metrics: Array<{
      value: string;
      label: string;
      description: string;
      icon: string;
      color: string;
      suffix?: string;
      prefix?: string;
    }>;
    processSteps: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      deliverables: string[];
    }>;
    testimonials: Array<{
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
    interactiveFeatures: Array<{
      id: string;
      title: string;
      description: string;
      icon: string;
      details: string;
    }>;
  };

  // Company Information
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

  // Navigation
  navigation: {
    brand: string;
    items: Array<{
      label: string;
      href: string;
      icon?: string;
    }>;
  };

  // Footer
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

  // About Page
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
    teamMembers: Array<{
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

  // Services Page
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

  // Contact Page
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

  // SEO
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

// Default content structure
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
    capabilities: [
      {
        title: "Cloud Architecture",
        capability: "Multi-cloud deployment strategies",
        metrics: "99.9% uptime SLA",
        icon: "☁️",
        description:
          "Design and implement resilient, auto-scaling cloud infrastructure across AWS, Azure, and GCP platforms.",
      },
      {
        title: "DevOps & Security",
        capability: "CI/CD pipeline automation",
        metrics: "50% faster deployments",
        icon: "🔒",
        description:
          "Implement secure development practices with automated testing, deployment, and infrastructure-as-code.",
      },
      {
        title: "Performance Engineering",
        capability: "High-traffic system optimization",
        metrics: "10M+ requests/hour",
        icon: "⚡",
        description:
          "Build systems that handle enterprise-scale traffic with sub-second response times and fault tolerance.",
      },
      {
        title: "Data Engineering",
        capability: "Real-time analytics pipelines",
        metrics: "Petabyte-scale processing",
        icon: "📊",
        description:
          "Design data architectures for business intelligence, machine learning, and real-time decision making.",
      },
      {
        title: "API Development",
        capability: "Microservices architecture",
        metrics: "99.95% availability",
        icon: "🔗",
        description:
          "Build scalable, versioned APIs with comprehensive documentation and robust authentication systems.",
      },
      {
        title: "Quality Assurance",
        capability: "Automated testing frameworks",
        metrics: "95% code coverage",
        icon: "✅",
        description:
          "Implement comprehensive testing strategies including unit, integration, and end-to-end automation.",
      },
    ],
    cta: {
      title: "Ready to Build Your Next Project?",
      description:
        "Let's discuss how we can help bring your ideas to life with custom software solutions.",
      buttonText: "Get Started Today",
    },
    // Enhanced components data
    metrics: [
      {
        value: "45",
        label: "Performance Improvement",
        description: "Average performance boost across all client projects",
        icon: "🚀",
        color: "vtech-cyan",
        suffix: "%",
      },
      {
        value: "2.3",
        label: "Revenue Generated",
        description: "Millions in additional revenue for our clients",
        icon: "💎",
        color: "vtech-purple",
        prefix: "$",
        suffix: "M",
      },
      {
        value: "300",
        label: "User Engagement",
        description: "Average increase in user engagement for mobile apps",
        icon: "📱",
        color: "vtech-teal",
        suffix: "%",
      },
      {
        value: "50",
        label: "Cost Reduction",
        description: "Average operational cost savings for clients",
        icon: "📊",
        color: "vtech-cyan",
        suffix: "K",
      },
    ],
    processSteps: [
      {
        id: "discovery",
        title: "Discovery & Planning",
        description:
          "We analyze your requirements and create a comprehensive project roadmap",
        icon: "🔍",
        deliverables: [
          "Requirements document",
          "Technical specification",
          "Project timeline",
          "Resource allocation",
        ],
      },
      {
        id: "design",
        title: "Design & Prototyping",
        description: "Create user-centered designs and interactive prototypes",
        icon: "🎨",
        deliverables: [
          "UI/UX designs",
          "Interactive prototypes",
          "Design system",
          "User flows",
        ],
      },
      {
        id: "development",
        title: "Development & Testing",
        description:
          "Build robust solutions with continuous testing and quality assurance",
        icon: "💻",
        deliverables: [
          "Working application",
          "Unit tests",
          "Integration tests",
          "Performance optimization",
        ],
      },
      {
        id: "deployment",
        title: "Deployment & Support",
        description:
          "Launch your solution and provide ongoing maintenance and support",
        icon: "🚀",
        deliverables: [
          "Production deployment",
          "User training",
          "Documentation",
          "Support plan",
        ],
      },
    ],
    testimonials: [
      {
        id: "1",
        name: "Sarah Johnson",
        title: "CTO",
        company: "TechStart Inc.",
        content:
          "VTech delivered exceptional results on our custom CRM system. Their technical expertise and attention to detail exceeded our expectations.",
        rating: 5,
        image: "/testimonials/sarah.jpg",
        projectType: "Custom CRM System",
        duration: "3 months",
        results: [
          {
            metric: "User Adoption Rate",
            improvement: "+85%",
            timeframe: "3 months",
          },
          {
            metric: "Process Efficiency",
            improvement: "+60%",
            timeframe: "6 months",
          },
          {
            metric: "Customer Satisfaction",
            improvement: "+45%",
            timeframe: "1 year",
          },
        ],
      },
      {
        id: "2",
        name: "Michael Chen",
        title: "Product Manager",
        company: "GrowthCorp",
        content:
          "The mobile app VTech built for us has been a game-changer. User engagement increased dramatically after launch.",
        rating: 5,
        image: "/testimonials/michael.jpg",
        projectType: "Mobile Application",
        duration: "4 months",
        results: [
          {
            metric: "User Engagement",
            improvement: "+300%",
            timeframe: "2 months",
          },
          {
            metric: "App Store Rating",
            improvement: "4.8/5",
            timeframe: "1 month",
          },
          {
            metric: "Daily Active Users",
            improvement: "+250%",
            timeframe: "3 months",
          },
        ],
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        title: "Founder",
        company: "HealthTech Solutions",
        content:
          "Working with VTech was seamless. They understood our complex requirements and delivered a robust, scalable solution on time.",
        rating: 5,
        image: "/testimonials/emily.jpg",
        projectType: "Healthcare Platform",
        duration: "6 months",
        results: [
          {
            metric: "System Uptime",
            improvement: "99.9%",
            timeframe: "Ongoing",
          },
          {
            metric: "Processing Speed",
            improvement: "+75%",
            timeframe: "2 months",
          },
          {
            metric: "Cost Savings",
            improvement: "$50K/year",
            timeframe: "1 year",
          },
        ],
      },
    ],
    interactiveFeatures: [
      {
        id: "1",
        title: "Real-time Analytics",
        description: "Advanced data visualization and insights",
        icon: "📊",
        details:
          "Comprehensive analytics dashboard with real-time monitoring, custom reports, and predictive insights to drive data-informed decisions.",
      },
      {
        id: "2",
        title: "AI-Powered Automation",
        description: "Intelligent process automation",
        icon: "🤖",
        details:
          "Machine learning algorithms that automate repetitive tasks, optimize workflows, and provide intelligent recommendations.",
      },
      {
        id: "3",
        title: "Cloud Integration",
        description: "Seamless cloud infrastructure",
        icon: "☁️",
        details:
          "Enterprise-grade cloud solutions with auto-scaling, load balancing, and global CDN for optimal performance.",
      },
      {
        id: "4",
        title: "Mobile-First Design",
        description: "Responsive and accessible interfaces",
        icon: "📱",
        details:
          "Progressive web apps and native mobile applications with intuitive UX and cross-platform compatibility.",
      },
    ],
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
    teamMembers: [
      {
        id: "1",
        name: "Alex Chen",
        role: "CEO & Lead Developer",
        description:
          "Full-stack architect with 8+ years of experience. Passionate about scalable solutions and cutting-edge technologies.",
        avatar: "👨‍💻",
        photo: "",
        skills: ["React/Next.js", "Node.js", "TypeScript", "AWS"],
        social: [
          { platform: "LinkedIn", url: "#", icon: "linkedin" },
          { platform: "GitHub", url: "#", icon: "github" },
          { platform: "Twitter", url: "#", icon: "twitter" },
        ],
        status: "online",
      },
      {
        id: "2",
        name: "Sarah Kim",
        role: "UX/UI Designer",
        description:
          "Creative designer focused on user-centered design principles and creating intuitive digital experiences.",
        avatar: "👩‍🎨",
        photo: "",
        skills: [
          "Figma",
          "Adobe Creative Suite",
          "Prototyping",
          "User Research",
        ],
        social: [
          { platform: "LinkedIn", url: "#", icon: "linkedin" },
          { platform: "Dribbble", url: "#", icon: "dribbble" },
          { platform: "Behance", url: "#", icon: "behance" },
        ],
        status: "online",
      },
      {
        id: "3",
        name: "Marcus Rodriguez",
        role: "Backend Engineer",
        description:
          "Experienced backend developer specializing in scalable architecture and database optimization.",
        avatar: "👨‍💻",
        photo: "",
        skills: ["Python", "Django", "PostgreSQL", "Docker"],
        social: [
          { platform: "LinkedIn", url: "#", icon: "linkedin" },
          { platform: "GitHub", url: "#", icon: "github" },
          { platform: "Stack Overflow", url: "#", icon: "stackoverflow" },
        ],
        status: "busy",
      },
      {
        id: "4",
        name: "Lisa Wang",
        role: "DevOps Engineer",
        description:
          "Infrastructure specialist focused on CI/CD pipelines and cloud-native solutions.",
        avatar: "👩‍💻",
        photo: "",
        skills: ["AWS", "Kubernetes", "Terraform", "Jenkins"],
        social: [
          { platform: "LinkedIn", url: "#", icon: "linkedin" },
          { platform: "GitHub", url: "#", icon: "github" },
          { platform: "Medium", url: "#", icon: "medium" },
        ],
        status: "online",
      },
      {
        id: "5",
        name: "David Thompson",
        role: "Mobile Developer",
        description:
          "Cross-platform mobile developer with expertise in React Native and native iOS/Android development.",
        avatar: "👨‍💻",
        photo: "",
        skills: ["React Native", "Swift", "Kotlin", "Firebase"],
        social: [
          { platform: "LinkedIn", url: "#", icon: "linkedin" },
          { platform: "GitHub", url: "#", icon: "github" },
          { platform: "App Store", url: "#", icon: "appstore" },
        ],
        status: "offline",
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

export async function GET(request: NextRequest) {
  try {
    // Allow public access for content (but require auth for admin panel)
    const isAdminRequest = request.headers.get("X-Admin-Request") === "true";

    if (isAdminRequest) {
      const auth = await requireAuth(request);
      if (!auth) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Fetch content from database
    const { data: siteContent, error } = await supabaseAdmin
      .from("site_content")
      .select("content_data, version, updated_at")
      .eq("content_key", "main")
      .single();

    if (error) {
      console.error("Database fetch error:", error);
      // Fall back to default content if database fails
      return NextResponse.json({
        success: true,
        data: defaultContent,
        source: "fallback",
        error: error.message,
      });
    }

    if (!siteContent || !siteContent.content_data) {
      console.log("No content found in database, using default");
      return NextResponse.json({
        success: true,
        data: defaultContent,
        source: "fallback",
        reason: "no_content_in_db",
      });
    }

    console.log("Content loaded from database successfully");
    return NextResponse.json({
      success: true,
      data: siteContent.content_data,
      source: "database",
      version: siteContent.version,
      updated_at: siteContent.updated_at,
    });
  } catch (error) {
    console.error("Content fetch error:", error);
    // Fall back to default content on any error
    return NextResponse.json({
      success: true,
      data: defaultContent,
      source: "fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate the content structure
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid content data" },
        { status: 400 }
      );
    }

    // Sanitize and validate content
    const sanitizedContent = sanitizeContent(body);

    // Check if content already exists
    const { data: existingContent } = await supabaseAdmin
      .from("site_content")
      .select("id, version")
      .eq("content_key", "main")
      .single();

    if (existingContent) {
      // Update existing content
      const { data, error } = await supabaseAdmin
        .from("site_content")
        .update({
          content_data: sanitizedContent,
          updated_at: new Date().toISOString(),
          updated_by: auth.username || null,
          version: existingContent.version + 1,
        })
        .eq("content_key", "main")
        .select("content_data, version, updated_at")
        .single();

      if (error) {
        console.error("Database update error:", error);
        return NextResponse.json(
          {
            error: "Failed to update content in database",
            details: error.message,
          },
          { status: 500 }
        );
      }

      console.log(
        "Content updated successfully in database, version:",
        data.version
      );

      return NextResponse.json({
        success: true,
        message: "Content updated successfully",
        data: data.content_data,
        version: data.version,
        updated_at: data.updated_at,
      });
    } else {
      // Insert new content
      const { data, error } = await supabaseAdmin
        .from("site_content")
        .insert({
          content_key: "main",
          content_data: sanitizedContent,
          version: 1,
          updated_by: auth.username || null,
        })
        .select("content_data, version, updated_at")
        .single();

      if (error) {
        console.error("Database insert error:", error);
        return NextResponse.json(
          {
            error: "Failed to create content in database",
            details: error.message,
          },
          { status: 500 }
        );
      }

      console.log("Content created successfully in database");

      return NextResponse.json({
        success: true,
        message: "Content created successfully",
        data: data.content_data,
        version: data.version,
        updated_at: data.updated_at,
      });
    }
  } catch (error) {
    console.error("Content update error:", error);
    return NextResponse.json(
      {
        error: "Failed to update content",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to sanitize content
function sanitizeContent(content: any): SiteContent {
  // Basic validation and sanitization
  // In a production app, you'd want more robust validation
  try {
    // Deep merge with default content to ensure all required fields exist
    const sanitized = deepMerge(defaultContent, content);

    // Basic type checking
    if (typeof sanitized.homepage?.hero?.title !== "string") {
      throw new Error("Invalid homepage hero title");
    }

    if (typeof sanitized.company?.name !== "string") {
      throw new Error("Invalid company name");
    }

    return sanitized;
  } catch (error) {
    console.error("Content sanitization error:", error);
    return defaultContent;
  }
}

// Deep merge utility function
function deepMerge(target: any, source: any): any {
  const result = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }

  return result;
}
