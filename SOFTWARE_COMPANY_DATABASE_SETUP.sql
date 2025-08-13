-- ================================================================
-- VTECH SOFTWARE COMPANY - COMPLETE DATABASE SETUP
-- ================================================================
-- Fresh database setup for software company portfolio
-- This is your MAIN database script - use this for new setups
-- ================================================================

-- ================================================================
-- 1. DROP EXISTING TABLES (if doing fresh setup)
-- ================================================================
-- Uncomment these lines if you want to start completely fresh:
-- DROP TABLE IF EXISTS projects CASCADE;
-- DROP TABLE IF EXISTS skills CASCADE;
-- DROP TABLE IF EXISTS contact_messages CASCADE;
-- DROP TABLE IF EXISTS profiles CASCADE;

-- ================================================================
-- 2. PROJECTS TABLE (Software Company Focus)
-- ================================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  short_description VARCHAR(500),
  category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'ai', 'cloud', 'enterprise')),
  
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
  ai_details JSONB DEFAULT '{}',
  cloud_details JSONB DEFAULT '{}',
  enterprise_details JSONB DEFAULT '{}',
  
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
-- 3. SKILLS TABLE (Software Company Focus)
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

-- Create indexes for skills
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_display_order ON skills(display_order);
CREATE INDEX IF NOT EXISTS idx_skills_homepage ON skills(show_on_homepage);

-- ================================================================
-- 4. CONTACT MESSAGES TABLE
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
  
  -- Response Information
  response_message TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  source VARCHAR(100) DEFAULT 'website',
  ip_address INET,
  user_agent TEXT,
  
  -- Flags
  is_spam BOOLEAN DEFAULT false,
  is_starred BOOLEAN DEFAULT false,
  follow_up_date DATE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact messages
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_priority ON contact_messages(priority);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_messages(created_at DESC);

-- ================================================================
-- 5. PROFILES TABLE
-- ================================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  
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

-- ================================================================
-- 6. ROW LEVEL SECURITY POLICIES
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Projects Policies
CREATE POLICY "Anyone can view projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage projects" ON projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Skills Policies
CREATE POLICY "Anyone can view skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage skills" ON skills
  FOR ALL USING (auth.role() = 'authenticated');

-- Contact Messages Policies
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Profiles Policies
CREATE POLICY "Anyone can view public profiles" ON profiles
  FOR SELECT USING (public_profile = true);

CREATE POLICY "Authenticated users can manage profiles" ON profiles
  FOR ALL USING (auth.role() = 'authenticated');

-- ================================================================
-- 7. TRIGGER FUNCTIONS FOR UPDATED_AT
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
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_messages_updated_at BEFORE UPDATE ON contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- 8. INSERT SOFTWARE COMPANY SAMPLE DATA
-- ================================================================

-- Insert software company skills
INSERT INTO skills (title, description, category, icon_name, color_gradient, proficiency, display_order, show_on_homepage) VALUES
('React & Next.js', 'Building modern web applications with React ecosystem and Next.js framework for optimal performance and SEO.', 'Frontend Development', 'react', 'from-blue-500 to-cyan-500', 95, 1, true),
('Node.js & Express', 'Server-side development with Node.js and Express for scalable backend services and RESTful APIs.', 'Backend Development', 'nodejs', 'from-green-500 to-emerald-500', 90, 2, true),
('TypeScript', 'Strongly typed JavaScript development for better code quality, maintainability, and developer experience.', 'Programming Languages', 'typescript', 'from-blue-600 to-blue-700', 92, 3, true),
('React Native & Flutter', 'Cross-platform mobile development for iOS and Android with native performance and shared codebase.', 'Mobile Development', 'mobile', 'from-green-500 to-teal-500', 88, 4, true),
('Python & AI/ML', 'Machine learning and AI development with Python, TensorFlow, and modern ML frameworks.', 'AI/ML', 'python', 'from-purple-500 to-pink-500', 85, 5, true),
('AWS & Cloud Services', 'Cloud infrastructure management and deployment using AWS services for scalable applications.', 'Cloud & DevOps', 'cloud', 'from-orange-500 to-red-500', 80, 6, true);

-- Insert software company profile
INSERT INTO profiles (name, title, company, bio, email, location, social_links, experience_years, available_for_projects, specializations) VALUES
('VTech Solutions', 'Full-Stack Software Developer', 'VTech Software Solutions', 'Passionate software development company specializing in modern web applications, mobile solutions, and cloud infrastructure. We build scalable, secure, and user-friendly software that drives business growth and digital transformation.', 'vtechofficial@gmail.com', 'Addis Ababa, Ethiopia', '{"github": "https://github.com/vtech-solutions", "linkedin": "https://linkedin.com/company/vtech-solutions", "twitter": "https://twitter.com/vtechsolutions", "website": "https://vtech-solutions.com"}', 5, true, ARRAY['Web Development', 'Mobile Apps', 'Cloud Solutions', 'AI/ML', 'Enterprise Software']);

-- Insert software company sample projects
INSERT INTO projects (
  title, 
  description, 
  short_description,
  category, 
  image_url, 
  live_url, 
  github_url, 
  case_study_url,
  technologies, 
  key_features,
  featured,
  status,
  web_details
) VALUES 
(
  'E-Commerce Platform Pro',
  'A comprehensive e-commerce solution built with Next.js 14, featuring advanced user authentication, dynamic product catalog, intelligent shopping cart, secure Stripe payment processing, real-time inventory management, and a powerful admin dashboard for complete business management.',
  'Full-stack e-commerce platform with payment integration and admin dashboard',
  'web',
  '/projects/ecommerce-platform.jpg',
  'https://demo-ecommerce.vtech.com',
  'https://github.com/vtech-solutions/ecommerce-pro',
  'https://docs.vtech.com/case-studies/ecommerce',
  ARRAY['Next.js 14', 'React', 'TypeScript', 'Stripe', 'PostgreSQL', 'Tailwind CSS', 'Prisma'],
  ARRAY['Real-time inventory', 'Multi-payment methods', 'Admin dashboard', 'Order tracking', 'Email notifications'],
  true,
  'completed',
  '{"project_type": "ecommerce", "framework": "nextjs", "deployment": "vercel", "database": "postgresql"}'
),
(
  'TaskFlow - Project Management SaaS',
  'Enterprise-grade project management application with real-time collaboration, advanced task scheduling, team performance analytics, file sharing, time tracking, automated reporting, and seamless integrations with popular development tools.',
  'Collaborative project management tool with real-time features',
  'web',
  '/projects/taskflow-saas.jpg',
  'https://taskflow.vtech.com',
  'https://github.com/vtech-solutions/taskflow',
  'https://docs.vtech.com/case-studies/taskflow',
  ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'Material-UI', 'JWT'],
  ARRAY['Real-time collaboration', 'Advanced analytics', 'File management', 'Time tracking', 'API integrations'],
  true,
  'completed',
  '{"project_type": "dashboard", "framework": "react", "backend": "nodejs", "database": "mongodb"}'
),
(
  'MobileBank - Secure Banking App',
  'Next-generation mobile banking application with military-grade security, biometric authentication, real-time transaction monitoring, advanced budgeting tools, investment tracking, bill management, and AI-powered financial insights.',
  'Secure mobile banking app with biometric authentication',
  'mobile',
  '/projects/mobile-banking.jpg',
  'https://mobilebank-demo.vtech.com',
  null,
  'https://docs.vtech.com/case-studies/mobilebank',
  ARRAY['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Plaid API', 'Face ID', 'Push Notifications'],
  ARRAY['Biometric login', 'Real-time alerts', 'Budget tracking', 'Investment portfolio', 'Bill payments'],
  true,
  'completed',
  '{"platform": "cross-platform", "framework": "react-native", "security": "biometric", "apis": "plaid"}'
),
(
  'AI-ChatBot Enterprise Assistant',
  'Intelligent conversational AI system powered by GPT-4, designed for enterprise customer support with natural language processing, sentiment analysis, automated ticket routing, multilingual support, and seamless CRM integration.',
  'Enterprise AI chatbot with GPT-4 and CRM integration',
  'ai',
  '/projects/ai-chatbot.jpg',
  'https://ai-demo.vtech.com',
  'https://github.com/vtech-solutions/ai-assistant',
  'https://docs.vtech.com/case-studies/ai-chatbot',
  ARRAY['Python', 'OpenAI GPT-4', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes'],
  ARRAY['Natural language processing', 'Sentiment analysis', 'Multi-language support', 'CRM integration', 'Analytics dashboard'],
  true,
  'completed',
  '{"project_type": "chatbot", "framework": "openai", "deployment": "kubernetes", "languages": "multilingual"}'
),
(
  'CloudScale - Auto-Scaling Infrastructure',
  'Intelligent cloud infrastructure management platform with automated scaling, cost optimization, performance monitoring, security compliance, multi-cloud support, and predictive analytics for optimal resource allocation.',
  'Cloud infrastructure management with auto-scaling',
  'cloud',
  '/projects/cloudscale.jpg',
  'https://cloudscale.vtech.com',
  'https://github.com/vtech-solutions/cloudscale',
  'https://docs.vtech.com/case-studies/cloudscale',
  ARRAY['Terraform', 'AWS', 'Docker', 'Kubernetes', 'Prometheus', 'Grafana', 'Python'],
  ARRAY['Auto-scaling', 'Cost optimization', 'Multi-cloud support', 'Security monitoring', 'Predictive analytics'],
  false,
  'completed',
  '{"platform": "aws", "deployment_type": "kubernetes", "monitoring": "prometheus", "iac": "terraform"}'
),
(
  'Enterprise ERP Suite',
  'Comprehensive Enterprise Resource Planning system with integrated modules for inventory management, human resources, financial accounting, supply chain optimization, customer relationship management, and business intelligence.',
  'Complete ERP system for enterprise resource management',
  'enterprise',
  '/projects/erp-suite.jpg',
  null,
  null,
  'https://docs.vtech.com/case-studies/erp-suite',
  ARRAY['Java', 'Spring Boot', 'PostgreSQL', 'Angular', 'Docker', 'Redis', 'Apache Kafka'],
  ARRAY['Inventory management', 'HR module', 'Financial accounting', 'Supply chain', 'Business intelligence'],
  false,
  'completed',
  '{"project_type": "erp", "database": "postgresql", "framework": "spring", "modules": "all"}'
);

-- ================================================================
-- COMPLETION MESSAGE
-- ================================================================
-- Software Company Database Setup Complete!
-- 
-- Your database now includes:
-- ✅ Updated categories: web, mobile, ai, cloud, enterprise
-- ✅ Enhanced project fields for software development
-- ✅ Sample software company projects
-- ✅ Software development skills
-- ✅ Professional company profile
-- ✅ All necessary indexes and policies
-- 
-- Ready for your software company portfolio! 🚀
-- ================================================================
