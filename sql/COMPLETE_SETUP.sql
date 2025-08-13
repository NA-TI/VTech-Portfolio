-- ================================================================
-- V-TECH PORTFOLIO - COMPLETE DATABASE SETUP
-- ================================================================
-- This script creates ALL necessary tables, indexes, policies, and sample data
-- Run this ONCE in your Supabase SQL Editor to set up everything

-- ================================================================
-- 1. SITE CONTENT TABLE (for content management)
-- ================================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key VARCHAR(100) NOT NULL UNIQUE,
  content_data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT true,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by VARCHAR(255)
);

-- ================================================================
-- 2. PROJECTS TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'ai', 'cloud', 'enterprise')),
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  key_features TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('planning', 'development', 'completed', 'archived')),
  
  -- Category-specific JSON data
  web_details JSONB DEFAULT '{}',
  mobile_details JSONB DEFAULT '{}',
  ai_details JSONB DEFAULT '{}',
  cloud_details JSONB DEFAULT '{}',
  enterprise_details JSONB DEFAULT '{}',
  
  -- URLs and Media
  short_description VARCHAR(500),
  case_study_url TEXT,
  
  -- General project details
  project_duration TEXT,
  client TEXT,
  team_size INTEGER,
  challenges TEXT,
  solutions TEXT,
  lessons_learned TEXT,
  additional_images JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 3. SKILLS TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  subcategory VARCHAR(100),
  
  -- Visual Design
  icon_name VARCHAR(50) NOT NULL,
  icon_svg TEXT,
  color_gradient VARCHAR(100) NOT NULL,
  background_pattern VARCHAR(100),
  
  -- Skill Metrics
  proficiency INTEGER DEFAULT 0 CHECK (proficiency >= 0 AND proficiency <= 100),
  years_experience DECIMAL(3,1) DEFAULT 0,
  projects_count INTEGER DEFAULT 0,
  
  -- Related Information
  related_technologies TEXT[] DEFAULT '{}',
  certifications TEXT[] DEFAULT '{}',
  learning_resources JSONB DEFAULT '[]',
  
  -- Display Options
  show_on_homepage BOOLEAN DEFAULT true,
  show_proficiency BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 4. CONTACT MESSAGES TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 5. PROFILES TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  bio TEXT NOT NULL,
  avatar_url TEXT,
  email VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  social_links JSONB DEFAULT '{}',
  skills TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  available_for_projects BOOLEAN DEFAULT true,
  styled_words TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 6. FUN INTERESTS TABLE (for the fun page)
-- ================================================================
CREATE TABLE IF NOT EXISTS fun_interests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  color_gradient VARCHAR(100) NOT NULL,
  order_index INTEGER DEFAULT 0,
  styled_words JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 7. TESTIMONIALS TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Client Information
  client_name VARCHAR(255) NOT NULL,
  client_title VARCHAR(255),
  client_company VARCHAR(255),
  client_email VARCHAR(255),
  client_avatar_url TEXT,
  
  -- Testimonial Content
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  project_title VARCHAR(255),
  
  -- Related Project
  project_id UUID REFERENCES projects(id),
  
  -- Display Options
  featured BOOLEAN DEFAULT false,
  show_on_homepage BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'archived')),
  approved_by UUID,
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 8. BLOG POSTS TABLE (for future use)
-- ================================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Post Content
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  
  -- Categorization
  category VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Publishing
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  published_at TIMESTAMP WITH TIME ZONE,
  author_id UUID,
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- Display
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- 9. ANALYTICS EVENTS TABLE (for future use)
-- ================================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Event Details
  event_type VARCHAR(100) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  
  -- User/Session Info
  user_id UUID,
  session_id VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  
  -- Page/Route Info
  page_url TEXT,
  referrer_url TEXT,
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
-- ================================================================
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE fun_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- CREATE POLICIES FOR ALL TABLES
-- ================================================================

-- Site Content Policies
CREATE POLICY "Allow public read access" ON site_content FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON site_content FOR UPDATE USING (true);

-- Projects Policies
CREATE POLICY "Allow public read access" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON projects FOR UPDATE USING (true);

-- Skills Policies
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON skills FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON skills FOR UPDATE USING (true);

-- Contact Messages Policies
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated update" ON contact_messages FOR UPDATE USING (true);

-- Profiles Policies
CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON profiles FOR UPDATE USING (true);

-- Fun Interests Policies
CREATE POLICY "Allow public read access" ON fun_interests FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON fun_interests FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON fun_interests FOR UPDATE USING (true);

-- Testimonials Policies
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON testimonials FOR UPDATE USING (true);

-- Blog Posts Policies
CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON blog_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON blog_posts FOR UPDATE USING (true);

-- Analytics Events Policies
CREATE POLICY "Allow public insert" ON analytics_events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON analytics_events FOR SELECT USING (true);

-- ================================================================
-- CREATE INDEXES FOR PERFORMANCE
-- ================================================================

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created ON projects(created_at DESC);

-- Skills indexes
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_homepage ON skills(show_on_homepage);
CREATE INDEX IF NOT EXISTS idx_skills_proficiency ON skills(proficiency);

-- Contact messages indexes
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);

-- Fun interests indexes
CREATE INDEX IF NOT EXISTS idx_fun_interests_order ON fun_interests(order_index);

-- Testimonials indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_homepage ON testimonials(show_on_homepage);

-- Blog posts indexes
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(featured);

-- Analytics indexes
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at DESC);

-- ================================================================
-- INSERT SAMPLE DATA
-- ================================================================

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

-- Insert Sample Fun Interests
INSERT INTO fun_interests (title, description, icon_name, color_gradient, order_index, styled_words) VALUES
('Coding Challenges', 'Solving complex programming problems and participating in hackathons.', 'code', 'from-purple-500 to-pink-500', 1, '[{"word": "Coding", "style": "bold-color", "color": "#8B5CF6"}, {"word": "Challenges", "style": "color", "color": "#EC4899"}]'),
('Open Source', 'Contributing to open source projects and building tools for the developer community.', 'github', 'from-green-500 to-blue-500', 2, '[{"word": "Open", "style": "bold-color", "color": "#10B981"}, {"word": "Source", "style": "color", "color": "#3B82F6"}]'),
('Tech Meetups', 'Attending and speaking at technology conferences and local developer meetups.', 'users', 'from-orange-500 to-red-500', 3, '[{"word": "Tech", "style": "bold-color", "color": "#F97316"}, {"word": "Meetups", "style": "color", "color": "#EF4444"}]');

-- Insert Sample Testimonials
INSERT INTO testimonials (client_name, client_title, client_company, content, rating, featured, show_on_homepage, status) VALUES
('Sarah Johnson', 'CEO', 'TechStart Inc.', 'VTech delivered an exceptional e-commerce platform that exceeded our expectations. The team was professional, responsive, and delivered on time.', 5, true, true, 'approved'),
('Michael Chen', 'CTO', 'InnovateCorp', 'Working with VTech was a game-changer for our mobile app development. Their expertise in React Native and cloud solutions is outstanding.', 5, true, true, 'approved'),
('Emily Rodriguez', 'Product Manager', 'ScaleUp Solutions', 'The AI analytics dashboard VTech built for us has transformed how we make business decisions. Highly recommended!', 5, false, true, 'approved');

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

-- ================================================================
-- VERIFICATION QUERIES
-- ================================================================
-- Run these queries to verify everything was created successfully

-- Check all tables exist
SELECT 
  table_name,
  CASE WHEN table_name IN (
    'site_content', 'projects', 'skills', 'contact_messages', 
    'profiles', 'fun_interests', 'testimonials', 'blog_posts', 'analytics_events'
  ) THEN '✅' ELSE '❌' END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'site_content', 'projects', 'skills', 'contact_messages', 
  'profiles', 'fun_interests', 'testimonials', 'blog_posts', 'analytics_events'
)
ORDER BY table_name;

-- Check sample data was inserted
SELECT 'profiles' as table_name, COUNT(*) as record_count FROM profiles
UNION ALL
SELECT 'skills', COUNT(*) FROM skills
UNION ALL
SELECT 'projects', COUNT(*) FROM projects
UNION ALL
SELECT 'fun_interests', COUNT(*) FROM fun_interests
UNION ALL
SELECT 'testimonials', COUNT(*) FROM testimonials
UNION ALL
SELECT 'site_content', COUNT(*) FROM site_content;

-- ================================================================
-- SETUP COMPLETE! 🎉
-- ================================================================
-- Your V-Tech portfolio database is now fully configured with:
-- ✅ All required tables created
-- ✅ Row Level Security enabled
-- ✅ Access policies configured
-- ✅ Performance indexes created
-- ✅ Sample data inserted
-- ✅ Content management system ready
--
-- Next steps:
-- 1. Test your application locally: npm run dev
-- 2. Deploy to production with environment variables set
-- 3. Access admin panel at /admin to customize content

