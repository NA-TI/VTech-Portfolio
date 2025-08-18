#!/usr/bin/env node

/**
 * Content Database Setup Script for VTech Portfolio
 *
 * This script helps you set up the content management database in Supabase.
 * Run this after creating the database schema.
 */

const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Default content data
const defaultContent = {
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
    testimonials: {
      title: "Trusted by Startups",
      subtitle: "What Our Clients Say",
    },
    cta: {
      title: "Ready to Build Your Next Project?",
      description:
        "Let's discuss how we can help bring your ideas to life with custom software solutions.",
      buttonText: "Get Started Today",
    },
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
          { label: "Pricing", href: "/pricing" },
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

async function setupContentDatabase() {
  console.log("🚀 Setting up VTech Portfolio Content Database...\n");

  try {
    // Check if content already exists
    const { data: existingContent, error: checkError } = await supabase
      .from("site_content")
      .select("id")
      .eq("content_key", "main")
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      console.error("❌ Error checking existing content:", checkError.message);
      return;
    }

    if (existingContent) {
      console.log("✅ Content already exists in database");
      console.log(
        "📝 You can now edit content through the admin panel at /admin"
      );
      return;
    }

    // Insert initial content
    const { data, error } = await supabase
      .from("site_content")
      .insert({
        content_key: "main",
        content_data: defaultContent,
        is_published: true,
        version: 1,
        created_by: "admin",
      })
      .select()
      .single();

    if (error) {
      console.error("❌ Error inserting content:", error.message);
      return;
    }

    console.log("✅ Content database setup completed successfully!");
    console.log("📝 Content ID:", data.id);
    console.log("📝 Version:", data.version);
    console.log("\n🎉 You can now:");
    console.log("   1. Visit /admin to edit content");
    console.log("   2. See changes live on your portfolio");
    console.log("   3. All content is now managed from the admin panel");
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    console.log("\n💡 Make sure you have:");
    console.log("   1. Run the SQL schema scripts in Supabase");
    console.log("   2. Set up your environment variables");
    console.log("   3. Have proper database permissions");
  }
}

// Run the setup
setupContentDatabase();
