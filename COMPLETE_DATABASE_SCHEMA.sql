-- ================================================================
-- VTECH PORTFOLIO - COMPLETE DATABASE SCHEMA
-- ================================================================
-- This script creates all tables, policies, and default data
-- for the VTech Portfolio application.
-- 
-- BEFORE RUNNING: Delete all existing tables in Supabase
-- ================================================================

-- ================================================================
-- 1. AUTHENTICATION & USERS
-- ================================================================
-- Note: auth.users table is managed by Supabase Auth
-- We'll reference it in our RLS policies

-- ================================================================
-- 2. SITE CONTENT MANAGEMENT (CMS)
-- ================================================================
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content_key VARCHAR(100) UNIQUE NOT NULL,
  content_data JSONB NOT NULL,
  version INTEGER DEFAULT 1,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_site_content_published ON site_content(is_published);

-- ================================================================
-- 3. PROJECTS TABLE (Enhanced)
-- ================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'graphics', '3d', 'ai', 'cloud', 'enterprise')),
  
  -- URLs and Media
  image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  live_url TEXT,
  github_url TEXT,
  case_study_url TEXT,
  demo_video_url TEXT,
  
  -- Technical Details
  technologies TEXT[] DEFAULT '{}',
  tech_stack JSONB DEFAULT '{}',
  key_features TEXT[] DEFAULT '{}',
  
  -- Project Management
  status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('planning', 'development', 'completed', 'archived')),
  featured BOOLEAN DEFAULT false,
  priority INTEGER DEFAULT 0,
  
  -- Metrics and Details
  project_duration VARCHAR(100),
  team_size INTEGER,
  client VARCHAR(255),
  budget_range VARCHAR(100),
  
  -- Challenges and Solutions
  challenges TEXT,
  solutions TEXT,
  lessons_learned TEXT,
  
  -- Category-specific JSON data
  web_details JSONB DEFAULT '{}',
  mobile_details JSONB DEFAULT '{}',
  graphics_details JSONB DEFAULT '{}',
  design_3d_details JSONB DEFAULT '{}',
  ai_details JSONB DEFAULT '{}',
  
  -- SEO and Discovery
  tags TEXT[] DEFAULT '{}',
  slug VARCHAR(255) UNIQUE,
  meta_description TEXT,
  
  -- Timestamps
  project_start_date DATE,
  project_end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- ================================================================
-- 4. SKILLS TABLE (Enhanced)
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_homepage ON skills(show_on_homepage);

-- ================================================================
-- 5. PROFILES TABLE (Enhanced)
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  
  -- Personal Information
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255),
  bio TEXT NOT NULL,
  short_bio VARCHAR(500),
  
  -- Contact Information
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  location VARCHAR(255),
  timezone VARCHAR(100),
  website_url TEXT,
  
  -- Media
  avatar_url TEXT,
  cover_image_url TEXT,
  resume_url TEXT,
  
  -- Social Links
  social_links JSONB DEFAULT '{}',
  
  -- Professional Details
  skills TEXT[] DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',
  industries TEXT[] DEFAULT '{}',
  experience_years INTEGER DEFAULT 0,
  
  -- Availability
  available_for_projects BOOLEAN DEFAULT true,
  availability_status VARCHAR(100) DEFAULT 'open',
  hourly_rate_range VARCHAR(100),
  preferred_project_size VARCHAR(100),
  
  -- Preferences
  preferred_technologies TEXT[] DEFAULT '{}',
  work_preferences JSONB DEFAULT '{}',
  
  -- Display Options
  show_availability BOOLEAN DEFAULT true,
  show_rates BOOLEAN DEFAULT false,
  public_profile BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_availability ON profiles(available_for_projects);
CREATE INDEX IF NOT EXISTS idx_profiles_public ON profiles(public_profile);

-- ================================================================
-- 6. CONTACT MESSAGES TABLE (Enhanced)
-- ================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Contact Information
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  
  -- Message Details
  subject VARCHAR(500),
  message TEXT NOT NULL,
  message_type VARCHAR(100) DEFAULT 'general',
  priority VARCHAR(50) DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
  
  -- Project Information (optional)
  project_type VARCHAR(100),
  budget_range VARCHAR(100),
  timeline VARCHAR(100),
  project_description TEXT,
  
  -- Status Management
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'resolved', 'archived')),
  assigned_to UUID REFERENCES auth.users(id),
  
  -- Response Information
  response_message TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  responded_by UUID REFERENCES auth.users(id),
  
  -- Metadata
  source VARCHAR(100) DEFAULT 'website',
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- Flags
  is_spam BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  follow_up_date DATE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_priority ON contact_messages(priority);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_spam ON contact_messages(is_spam);

-- ================================================================
-- 7. TESTIMONIALS TABLE (New)
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
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status);
CREATE INDEX IF NOT EXISTS idx_testimonials_homepage ON testimonials(show_on_homepage);

-- ================================================================
-- 8. BLOG POSTS TABLE (Future Enhancement)
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
  author_id UUID REFERENCES auth.users(id),
  
  -- Engagement
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  
  -- Display
  featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(featured);

-- ================================================================
-- 9. ANALYTICS TABLE (Optional)
-- ================================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
  -- Event Details
  event_type VARCHAR(100) NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  
  -- Page/Resource
  page_url TEXT,
  resource_type VARCHAR(100),
  resource_id UUID,
  
  -- User Information
  session_id VARCHAR(255),
  user_id UUID REFERENCES auth.users(id),
  ip_address INET,
  user_agent TEXT,
  
  -- Location
  country VARCHAR(100),
  city VARCHAR(100),
  
  -- Referrer Information
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  
  -- Additional Data
  metadata JSONB DEFAULT '{}',
  
  -- Timestamp
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_resource ON analytics_events(resource_type, resource_id);

-- ================================================================
-- 10. ROW LEVEL SECURITY POLICIES
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- ================================================================
-- SITE CONTENT POLICIES
-- ================================================================
CREATE POLICY "Public can read published content" ON site_content
  FOR SELECT USING (is_published = true);

CREATE POLICY "Authenticated users can read all content" ON site_content
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert content" ON site_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update content" ON site_content
  FOR UPDATE USING (auth.role() = 'authenticated');

-- ================================================================
-- PROJECTS POLICIES
-- ================================================================
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- ================================================================
-- SKILLS POLICIES
-- ================================================================
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage skills" ON skills
  FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- PROFILES POLICIES
-- ================================================================
CREATE POLICY "Anyone can view public profiles" ON profiles
  FOR SELECT USING (public_profile = true);

CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can insert profiles" ON profiles
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- ================================================================
-- CONTACT MESSAGES POLICIES
-- ================================================================
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete contact messages" ON contact_messages
  FOR DELETE USING (auth.role() = 'authenticated');

-- ================================================================
-- TESTIMONIALS POLICIES
-- ================================================================
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Authenticated users can manage testimonials" ON testimonials
  FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- BLOG POSTS POLICIES
-- ================================================================
CREATE POLICY "Anyone can view published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage blog posts" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- ANALYTICS POLICIES
-- ================================================================
CREATE POLICY "Anyone can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view analytics" ON analytics_events
  FOR SELECT USING (auth.role() = 'authenticated');

-- ================================================================
-- 11. DEFAULT DATA INSERTION
-- ================================================================

-- Insert default site content (CMS data)
INSERT INTO site_content (content_key, content_data) VALUES 
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
}');

-- Insert default skills
INSERT INTO skills (title, description, category, icon_name, color_gradient, proficiency, display_order, show_on_homepage) VALUES
('React & Next.js', 'Building modern web applications with React ecosystem and Next.js framework for optimal performance and SEO.', 'Frontend Development', 'react', 'from-blue-500 to-cyan-500', 95, 1, true),
('Node.js & Express', 'Server-side development with Node.js and Express for scalable backend services and RESTful APIs.', 'Backend Development', 'nodejs', 'from-green-500 to-emerald-500', 90, 2, true),
('TypeScript', 'Strongly typed JavaScript development for better code quality, maintainability, and developer experience.', 'Programming Languages', 'typescript', 'from-blue-600 to-blue-700', 92, 3, true),
('PostgreSQL & MongoDB', 'Database design and management with both relational (PostgreSQL) and NoSQL (MongoDB) databases.', 'Databases', 'database', 'from-purple-500 to-purple-600', 85, 4, true),
('AWS & Cloud Services', 'Cloud infrastructure management and deployment using AWS services for scalable applications.', 'Cloud & DevOps', 'cloud', 'from-orange-500 to-red-500', 80, 5, true),
('UI/UX Design', 'User interface and experience design with focus on usability, accessibility, and modern design principles.', 'Design', 'design', 'from-pink-500 to-rose-500', 88, 6, true);

-- Insert default profile
INSERT INTO profiles (name, title, company, bio, email, location, social_links, experience_years, available_for_projects) VALUES
('VTech Solutions', 'Full-Stack Developer & Designer', 'VTech Software Solutions', 'Passionate full-stack developer and designer with expertise in modern web technologies. I create digital solutions that are both beautiful and functional, helping businesses grow through technology.', 'vtechofficial@gmail.com', 'Addis Ababa, Ethiopia', '{"github": "https://github.com/vtech-solutions", "linkedin": "https://linkedin.com/company/vtech-solutions", "twitter": "https://twitter.com/vtechsolutions", "website": "https://vtech-solutions.com"}', 5, true);

-- Insert sample projects
INSERT INTO projects (title, description, short_description, category, image_url, live_url, github_url, technologies, featured, status) VALUES
('E-Commerce Platform', 'A comprehensive e-commerce solution built with Next.js, featuring user authentication, product catalog, shopping cart, payment processing with Stripe, and admin dashboard for inventory management.', 'Modern e-commerce platform with full payment integration', 'web', '/projects/ecommerce.jpg', 'https://demo-ecommerce.vtech.com', 'https://github.com/vtech-solutions/ecommerce', '["Next.js", "React", "TypeScript", "Stripe", "PostgreSQL", "Tailwind CSS"]', true, 'completed'),

('Task Management SaaS', 'A collaborative project management application with real-time updates, team collaboration features, file sharing, time tracking, and comprehensive reporting dashboard.', 'Team collaboration and project management tool', 'web', '/projects/task-management.jpg', 'https://tasks.vtech.com', 'https://github.com/vtech-solutions/taskapp', '["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"]', true, 'completed'),

('Mobile Banking App', 'Secure mobile banking application with biometric authentication, transaction history, bill payments, money transfers, and real-time notifications.', 'Secure mobile banking with biometric auth', 'mobile', '/projects/banking-app.jpg', NULL, NULL, '["React Native", "Node.js", "PostgreSQL", "JWT", "Stripe", "Push Notifications"]', true, 'completed'),

('Brand Identity Package', 'Complete brand identity design for a fintech startup including logo design, color palette, typography system, brand guidelines, and marketing materials.', 'Complete brand identity for fintech startup', 'graphics', '/projects/brand-identity.jpg', NULL, NULL, '["Adobe Illustrator", "Adobe Photoshop", "Figma", "Adobe InDesign"]', false, 'completed'),

('3D Product Visualization', 'Photorealistic 3D product renders for an electronics company, including detailed materials, lighting setup, and interactive web viewer.', 'Photorealistic 3D product renders', '3d', '/projects/3d-products.jpg', 'https://3d-viewer.vtech.com', NULL, '["Blender", "Substance Painter", "Three.js", "WebGL"]', false, 'completed');

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_title, client_company, content, rating, featured, status, display_order) VALUES
('Sarah Johnson', 'CEO', 'TechStart Inc.', 'VTech delivered an exceptional e-commerce platform that exceeded our expectations. The attention to detail and technical expertise was outstanding.', 5, true, 'approved', 1),
('Michael Chen', 'Product Manager', 'InnovateCorp', 'Working with VTech was a pleasure. They understood our requirements perfectly and delivered a robust task management solution on time and within budget.', 5, true, 'approved', 2),
('Emily Davis', 'Marketing Director', 'GrowthCo', 'The brand identity package VTech created for us perfectly captured our vision. Professional, creative, and exactly what we needed to stand out in the market.', 5, false, 'approved', 3);

-- ================================================================
-- 12. TRIGGER FUNCTIONS FOR UPDATED_AT
-- ================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for all tables with updated_at
CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON site_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- 13. USEFUL VIEWS (Optional)
-- ================================================================

-- View for public projects
CREATE VIEW public_projects AS
SELECT 
  id, title, short_description, category, image_url, live_url, 
  technologies, featured, created_at
FROM projects 
WHERE status = 'completed'
ORDER BY featured DESC, created_at DESC;

-- View for featured content
CREATE VIEW featured_content AS
SELECT 
  'project' as content_type, id, title as name, short_description as description, 
  image_url, created_at
FROM projects 
WHERE featured = true AND status = 'completed'
UNION ALL
SELECT 
  'testimonial' as content_type, id, client_name as name, content as description, 
  client_avatar_url as image_url, created_at
FROM testimonials 
WHERE featured = true AND status = 'approved'
ORDER BY created_at DESC;

-- ================================================================
-- COMPLETION MESSAGE
-- ================================================================
-- This completes the VTech Portfolio database schema.
-- All tables, policies, triggers, and default data have been created.
--
-- Next steps:
-- 1. Update your API routes to use the database
-- 2. Test all functionality
-- 3. Deploy and monitor
-- ================================================================










