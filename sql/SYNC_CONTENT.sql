-- SYNC CONTENT TO MAIN PAGE
-- Run this to sync all content data to your main page

UPDATE site_content 
SET content_data = content_data || '{
  "homepage": {
    "hero": {
      "title": "Build Software Solutions That Scale",
      "subtitle": "Technology company building reliable software products and services",
      "description": "VTech is a technology company building reliable software products and services.",
      "primaryButton": "Start Your Project →",
      "secondaryButton": "View Our Work →"
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
      }
    ]
  },
  "about": {
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
      }
    ]
  }
}'::jsonb,
    version = version + 1,
    updated_at = NOW(),
    updated_by = 'admin'
WHERE content_key = 'main';

SELECT '🎉 Content successfully synced!' as message;
