
-- Insert Sample Profile
INSERT INTO profiles (name, title, bio, email, location, social_links, skills, experience_years, available_for_projects) VALUES
('V-Tech', 'Software Development Company', 'VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.', 'vtechofficial@gmail.com', 'Addis Ababa, Ethiopia', '{"github": "https://github.com/vtech-solutions", "linkedin": "https://linkedin.com/company/vtech-solutions", "twitter": "https://twitter.com/vtechsolutions"}', '{"Web Development", "Mobile Apps", "Cloud Solutions", "AI/ML"}', 3, true);

-- Insert Sample Skills
INSERT INTO skills (title, description, category, icon_name, color_gradient, display_order) VALUES
('Web Development', 'Building modern, responsive web applications with cutting-edge technologies.', 'Development', 'web', 'from-blue-500 to-cyan-500', 1),
('Mobile Development', 'Creating native and cross-platform mobile applications for iOS and Android.', 'Development', 'mobile', 'from-purple-500 to-pink-500', 2),
('Cloud Solutions', 'Designing and implementing scalable cloud infrastructure and services.', 'Infrastructure', 'cloud', 'from-orange-500 to-red-500', 3),
('AI & Machine Learning', 'Developing intelligent solutions with artificial intelligence and machine learning.', 'AI/ML', 'ai', 'from-green-500 to-teal-500', 4);

-- Insert Sample Projects
INSERT INTO projects (title, description, category, image_url, live_url, github_url, technologies, featured) VALUES
('E-commerce Platform', 'A modern e-commerce platform built with Next.js and Stripe integration. Features include user authentication, product catalog, shopping cart, and secure payment processing.', 'web', '/projects/ecommerce.jpg', 'https://project-demo.com', 'https://github.com/vtech-solutions/ecommerce', '{"Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"}', true),
('Mobile Banking App', 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management features.', 'mobile', '/projects/banking.jpg', 'https://app-store.com/banking', 'https://github.com/vtech-solutions/banking-app', '{"React Native", "Node.js", "PostgreSQL", "Redis"}', true),
('AI-Powered Analytics Dashboard', 'An intelligent analytics platform that provides real-time insights and predictive analytics for business intelligence.', 'ai', '/projects/analytics.jpg', 'https://analytics-demo.com', 'https://github.com/vtech-solutions/analytics', '{"Python", "TensorFlow", "React", "D3.js"}', false);

-- Insert Initial Site Content
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
    "testimonials": {
      "title": "Trusted by Startups",
      "subtitle": "What Our Clients Say"
    },
    "cta": {
      "title": "Ready to Build Your Next Project?",
      "description": "Let''s discuss how we can help bring your ideas to life with custom software solutions.",
      "buttonText": "Get Started Today"
    }
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
}'::jsonb, true, 1, 'admin');
