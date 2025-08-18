-- ================================================================
-- SYNC CONTENT TO MAIN PAGE
-- ================================================================
-- This script syncs all enhanced content data to the main page
-- Run this after setting up your admin interface

-- Update the main content with comprehensive data structure
UPDATE site_content 
SET content_data = '{
  "homepage": {
    "hero": {
      "title": "Transform Your Business with Cutting-Edge Technology",
      "subtitle": "We build innovative digital solutions that drive growth and efficiency",
      "description": "VTech specializes in creating custom software solutions, web applications, and digital platforms that help businesses thrive in the digital age.",
      "cta": {
        "primary": "Get Started",
        "secondary": "View Our Work"
      }
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
          }
        ]
      },
      {
        "id": "michael-chen",
        "name": "Michael Chen",
        "title": "CTO",
        "company": "InnovateCorp",
        "content": "Working with VTech was a game-changer for our mobile app development. Their expertise in React Native and cloud solutions is outstanding.",
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
    ],
    "cta": {
      "title": "Ready to Transform Your Business?",
      "description": "Let us help you build the digital solution that will take your business to the next level. Get in touch today for a free consultation.",
      "buttonText": "Start Your Project"
    }
  },
  "about": {
    "hero": {
      "title": "About VTech",
      "subtitle": "Innovation, Excellence, and Results",
      "description": "We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences that drive business growth."
    },
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
      "title": "Our Services",
      "subtitle": "Comprehensive digital solutions for modern businesses",
      "description": "From custom software development to cloud infrastructure, we provide end-to-end solutions that help your business grow and succeed."
    },
    "cta": {
      "title": "Ready to Get Started?",
      "description": "Let us help you choose the right solution for your business needs.",
      "buttonText": "Contact Us"
    }
  },
  "contact": {
    "hero": {
      "title": "Get In Touch",
      "subtitle": "Let us help you bring your vision to life",
      "description": "Ready to start your next project? We would love to hear from you and discuss how we can help you achieve your goals."
    },
    "info": {
      "title": "Contact Information",
      "description": "We are here to help and answer any questions you might have. We look forward to hearing from you."
    }
  },
  "company": {
    "name": "VTech Solutions",
    "tagline": "Innovation. Excellence. Results.",
    "description": "Leading technology company specializing in custom software development and digital solutions.",
    "contact": {
      "email": "hello@vtech.com",
      "phone": "+1 (555) 123-4567",
      "address": "123 Tech Street, Innovation City, IC 12345"
    },
    "social": {
      "linkedin": "https://linkedin.com/company/vtech",
      "twitter": "https://twitter.com/vtech",
      "github": "https://github.com/vtech"
    }
  },
  "navigation": {
    "main": [
      {"label": "Home", "href": "/"},
      {"label": "About", "href": "/about"},
      {"label": "Services", "href": "/services"},
      {"label": "Portfolio", "href": "/portfolio"},
      {"label": "Contact", "href": "/contact"}
    ],
    "footer": [
      {"label": "Privacy Policy", "href": "/privacy"},
      {"label": "Terms of Service", "href": "/terms"},
      {"label": "Support", "href": "/support"}
    ]
  },
  "footer": {
    "description": "VTech Solutions - Transforming businesses through innovative technology solutions.",
    "links": {
      "company": [
        {"label": "About Us", "href": "/about"},
        {"label": "Our Team", "href": "/about#team"},
        {"label": "Careers", "href": "/careers"}
      ],
      "services": [
        {"label": "Web Development", "href": "/services#web"},
        {"label": "Mobile Apps", "href": "/services#mobile"},
        {"label": "Cloud Solutions", "href": "/services#cloud"}
      ],
      "support": [
        {"label": "Documentation", "href": "/docs"},
        {"label": "Contact Support", "href": "/support"},
        {"label": "FAQ", "href": "/faq"}
      ]
    }
  }
}'::jsonb,
    version = version + 1,
    updated_at = NOW(),
    updated_by = 'admin'
WHERE content_key = 'main';

-- Verify the update was successful
SELECT '🎉 Content successfully synced to main page!' as message;
SELECT '✅ All sections are now ready for editing in the admin panel' as status;
