-- Update existing content with enhanced data
UPDATE site_content 
SET content_data = content_data || '{
  "homepage": {
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
  }
}'::jsonb,
    version = version + 1,
    updated_at = NOW(),
    updated_by = 'admin'
WHERE content_key = 'main';
