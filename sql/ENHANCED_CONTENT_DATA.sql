-- ================================================================
-- V-TECH PORTFOLIO - ENHANCED CONTENT DATA
-- ================================================================
-- This script updates the site_content table with comprehensive data
-- including all sections that can be edited from the admin panel

-- First, clear existing content
DELETE FROM site_content WHERE content_key = 'main';

-- Insert Enhanced Site Content with ALL editable sections
INSERT INTO site_content (content_key, content_data, is_published, version, updated_by) VALUES
('main', '{
  "homepage": {
    "hero": {
      "title": "Build Software Solutions That Scale",
      "subtitle": "Software Development • Cloud Solutions • Digital Innovation",
      "description": "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
      "primaryButton": "Start Your Project",
      "secondaryButton": "View Our Work"
    },
    "services": {
      "title": "What We Build",
      "subtitle": "Comprehensive Development Services",
      "description": "From concept to deployment, we handle every aspect of your software development needs.",
      "ctaText": "See All Services"
    },
    "testimonialsSection": {
      "title": "Trusted by Startups",
      "subtitle": "What Our Clients Say"
    },
    "cta": {
      "title": "Ready to Build Your Next Project?",
      "description": "Let''s discuss how we can help bring your ideas to life with custom software solutions.",
      "buttonText": "Get Started Today"
    },
    "metrics": [
      {
        "value": "150+",
        "label": "Projects Completed",
        "description": "Successfully delivered projects across various industries",
        "icon": "briefcase",
        "color": "vtech-cyan",
        "suffix": "+",
        "prefix": ""
      },
      {
        "value": "99.9",
        "label": "Uptime SLA",
        "description": "Reliable infrastructure with guaranteed availability",
        "icon": "shield",
        "color": "vtech-green",
        "suffix": "%",
        "prefix": ""
      },
      {
        "value": "50",
        "label": "Faster Deployments",
        "description": "Reduced deployment time with CI/CD automation",
        "icon": "rocket",
        "color": "vtech-purple",
        "suffix": "%",
        "prefix": ""
      },
      {
        "value": "24/7",
        "label": "Support Available",
        "description": "Round-the-clock technical support and maintenance",
        "icon": "clock",
        "color": "vtech-orange",
        "suffix": "",
        "prefix": ""
      }
    ],
    "processSteps": [
      {
        "id": "discovery",
        "title": "Discovery & Planning",
        "description": "We start by understanding your business needs, goals, and technical requirements to create a comprehensive project plan.",
        "icon": "search",
        "deliverables": ["Requirements Document", "Technical Architecture", "Project Timeline", "Cost Estimate"]
      },
      {
        "id": "design",
        "title": "Design & Prototyping",
        "description": "Our design team creates intuitive user interfaces and interactive prototypes to visualize the final product.",
        "icon": "palette",
        "deliverables": ["UI/UX Designs", "Interactive Prototypes", "Design System", "User Flows"]
      },
      {
        "id": "development",
        "title": "Development & Testing",
        "description": "We build your solution using modern technologies and best practices, with continuous testing throughout the process.",
        "icon": "code",
        "deliverables": ["Working Application", "Unit Tests", "Integration Tests", "Performance Optimization"]
      },
      {
        "id": "deployment",
        "title": "Deployment & Launch",
        "description": "We deploy your application to production with proper monitoring, security, and performance optimization.",
        "icon": "rocket",
        "deliverables": ["Production Deployment", "Monitoring Setup", "Security Audit", "Launch Support"]
      }
    ],
    "testimonials": [
      {
        "id": "sarah-johnson",
        "name": "Sarah Johnson",
        "title": "CEO",
        "company": "TechStart Inc.",
        "content": "VTech delivered an exceptional e-commerce platform that exceeded our expectations. The team was professional, responsive, and delivered on time. Our online sales increased by 300% within the first quarter.",
        "rating": 5,
        "image": "/testimonials/sarah.jpg",
        "projectType": "E-commerce Platform",
        "duration": "3 months",
        "results": [
          {
            "metric": "Online Sales",
            "improvement": "300% increase",
            "timeframe": "First quarter"
          },
          {
            "metric": "User Engagement",
            "improvement": "150% increase",
            "timeframe": "First month"
          },
          {
            "metric": "Mobile Conversion",
            "improvement": "200% increase",
            "timeframe": "First quarter"
          }
        ]
      },
      {
        "id": "michael-chen",
        "name": "Michael Chen",
        "title": "CTO",
        "company": "InnovateCorp",
        "content": "Working with VTech was a game-changer for our mobile app development. Their expertise in React Native and cloud solutions is outstanding. The app launched successfully and received 4.8 stars on both app stores.",
        "rating": 5,
        "image": "/testimonials/michael.jpg",
        "projectType": "Mobile Banking App",
        "duration": "6 months",
        "results": [
          {
            "metric": "App Store Rating",
            "improvement": "4.8/5 stars",
            "timeframe": "Launch"
          },
          {
            "metric": "User Downloads",
            "improvement": "50,000+ downloads",
            "timeframe": "First month"
          },
          {
            "metric": "Transaction Volume",
            "improvement": "500% increase",
            "timeframe": "First quarter"
          }
        ]
      },
      {
        "id": "emily-rodriguez",
        "name": "Emily Rodriguez",
        "title": "Product Manager",
        "company": "ScaleUp Solutions",
        "content": "The AI analytics dashboard VTech built for us has transformed how we make business decisions. The real-time insights and predictive analytics have helped us increase operational efficiency by 40%.",
        "rating": 5,
        "image": "/testimonials/emily.jpg",
        "projectType": "AI Analytics Platform",
        "duration": "4 months",
        "results": [
          {
            "metric": "Operational Efficiency",
            "improvement": "40% increase",
            "timeframe": "First quarter"
          },
          {
            "metric": "Data Processing Speed",
            "improvement": "10x faster",
            "timeframe": "Implementation"
          },
          {
            "metric": "Decision Accuracy",
            "improvement": "85% improvement",
            "timeframe": "First quarter"
          }
        ]
      }
    ],
    "interactiveFeatures": [
      {
        "id": "real-time-collaboration",
        "title": "Real-time Collaboration",
        "description": "Built-in collaboration tools that enable teams to work together seamlessly across different time zones and locations.",
        "icon": "users",
        "details": "Live editing, version control, and instant communication features that keep your team connected and productive."
      },
      {
        "id": "ai-powered-analytics",
        "title": "AI-Powered Analytics",
        "description": "Advanced analytics and machine learning capabilities that provide actionable insights and predictive modeling.",
        "icon": "brain",
        "details": "Intelligent data processing, automated reporting, and predictive analytics that help you make data-driven decisions."
      },
      {
        "id": "scalable-architecture",
        "title": "Scalable Architecture",
        "description": "Cloud-native architecture designed to scale automatically with your business growth and user demands.",
        "icon": "cloud",
        "details": "Microservices architecture, auto-scaling, load balancing, and high availability that ensures your application grows with your business."
      },
      {
        "id": "security-first",
        "title": "Security First",
        "description": "Enterprise-grade security measures that protect your data and ensure compliance with industry standards.",
        "icon": "shield",
        "details": "End-to-end encryption, regular security audits, compliance certifications, and proactive threat detection."
      }
    ]
  },
  "company": {
    "name": "VTech Software Solutions",
    "tagline": "Building Tomorrow''s Software Today",
    "bio": "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
    "email": "vtechofficial@gmail.com",
    "phone": "+1 (555) 123-4567",
    "address": "Addis Ababa, Ethiopia",
    "logo": "/window.svg",
    "available": true
  },
  "navigation": {
    "brand": "VTech",
    "items": [
      {"label": "Home", "href": "/", "icon": "home"},
      {"label": "About", "href": "/about", "icon": "user"},
      {"label": "Services", "href": "/services", "icon": "briefcase"},
      {"label": "Projects", "href": "/projects", "icon": "folder"},
      {"label": "Contact", "href": "/contact", "icon": "mail"}
    ]
  },
  "footer": {
    "description": "Building scalable software solutions that drive business growth. From web applications to cloud infrastructure, we deliver technology that works.",
    "copyright": "VTech Software Solutions. All rights reserved.",
    "columns": [
      {
        "title": "Product",
        "links": [
          {"label": "Services", "href": "/services"},
          {"label": "Portfolio", "href": "/portfolio"},
          {"label": "Pricing", "href": "/pricing"},
          {"label": "Case Studies", "href": "/case-studies"}
        ]
      },
      {
        "title": "Company",
        "links": [
          {"label": "About", "href": "/about"},
          {"label": "Careers", "href": "/careers"},
          {"label": "Blog", "href": "/blog"},
          {"label": "Contact", "href": "/contact"}
        ]
      },
      {
        "title": "Resources",
        "links": [
          {"label": "Documentation", "href": "/docs"},
          {"label": "Support", "href": "/support"},
          {"label": "Privacy Policy", "href": "/privacy"},
          {"label": "Terms of Service", "href": "/terms"}
        ]
      }
    ],
    "social": [
      {"platform": "GitHub", "url": "https://github.com/vtech-solutions", "icon": "github"},
      {"platform": "LinkedIn", "url": "https://linkedin.com/company/vtech-solutions", "icon": "linkedin"},
      {"platform": "Twitter", "url": "https://twitter.com/vtechsolutions", "icon": "twitter"}
    ]
  },
  "about": {
    "hero": {
      "title": "We Build Software That Actually Works",
      "subtitle": "Our Story",
      "description": "Founded with a mission to create reliable, scalable software solutions that help businesses thrive in the digital age."
    },
    "sections": [
      {
        "title": "Our Mission",
        "content": "To deliver high-quality software solutions that solve real business problems and drive growth for our clients."
      },
      {
        "title": "Our Approach",
        "content": "We combine cutting-edge technology with proven methodologies to create software that''s both innovative and reliable."
      }
    ],
    "teamMembers": [
      {
        "id": "john-doe",
        "name": "John Doe",
        "role": "Lead Developer",
        "description": "Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies.",
        "avatar": "/team/john.jpg",
        "skills": ["React", "Node.js", "AWS", "TypeScript"],
        "social": [
          {"platform": "GitHub", "url": "https://github.com/johndoe", "icon": "github"},
          {"platform": "LinkedIn", "url": "https://linkedin.com/in/johndoe", "icon": "linkedin"}
        ],
        "status": "online"
      },
      {
        "id": "jane-smith",
        "name": "Jane Smith",
        "role": "UI/UX Designer",
        "description": "Creative designer specializing in user experience and interface design for web and mobile applications.",
        "avatar": "/team/jane.jpg",
        "skills": ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
        "social": [
          {"platform": "Dribbble", "url": "https://dribbble.com/janesmith", "icon": "dribbble"},
          {"platform": "Behance", "url": "https://behance.net/janesmith", "icon": "behance"}
        ],
        "status": "online"
      }
    ]
  },
  "services": {
    "hero": {
      "title": "Software Development Services",
      "subtitle": "What We Offer",
      "description": "Comprehensive development services from concept to deployment."
    },
    "cta": {
      "title": "Ready to Start Your Project?",
      "description": "Let''s discuss how we can help build your next software solution.",
      "buttonText": "Get In Touch"
    }
  },
  "contact": {
    "hero": {
      "title": "Let''s Build Something Great Together",
      "subtitle": "Get In Touch",
      "description": "Ready to start your project? We''d love to hear about your ideas and discuss how we can help bring them to life."
    },
    "info": {
      "title": "Get In Touch",
      "description": "Ready to start your project? We''d love to hear from you."
    }
  },
  "seo": {
    "defaultTitle": "VTech Software Solutions - Professional Software Development",
    "defaultDescription": "VTech builds reliable software products and services. Custom web applications, mobile apps, cloud solutions, and digital innovation.",
    "keywords": ["software development", "web development", "mobile apps", "cloud solutions", "custom software"],
    "ogImage": "/og-image.jpg"
  }
}'::jsonb, true, 2, 'admin');

-- ================================================================
-- VERIFICATION
-- ================================================================
-- Check that the content was inserted successfully
SELECT 
  content_key,
  version,
  updated_by,
  created_at,
  updated_at
FROM site_content 
WHERE content_key = 'main';

-- Check the structure of the content
SELECT 
  jsonb_typeof(content_data) as data_type,
  jsonb_object_keys(content_data) as top_level_keys
FROM site_content 
WHERE content_key = 'main';
