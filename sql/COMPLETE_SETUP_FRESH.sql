-- ================================================================
-- COMPLETE FRESH DATABASE SETUP
-- ================================================================
-- This script creates a complete fresh database setup
-- Run this after deleting all tables except contact

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ================================================================
-- SITE CONTENT TABLE
-- ================================================================

-- Create the site_content table
CREATE TABLE IF NOT EXISTS site_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_key VARCHAR(255) UNIQUE NOT NULL,
  content_data JSONB NOT NULL DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(255) DEFAULT 'admin',
  updated_by VARCHAR(255) DEFAULT 'admin'
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_site_content_updated_at ON site_content(updated_at);

-- ================================================================
-- PROJECTS TABLE
-- ================================================================

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  image_url VARCHAR(500),
  technologies TEXT[],
  category VARCHAR(100),
  status VARCHAR(50) DEFAULT 'published',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(255) DEFAULT 'admin',
  updated_by VARCHAR(255) DEFAULT 'admin'
);

-- Create indexes for projects
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);

-- ================================================================
-- SKILLS TABLE
-- ================================================================

-- Create the skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 5),
  icon VARCHAR(100),
  color VARCHAR(50),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by VARCHAR(255) DEFAULT 'admin',
  updated_by VARCHAR(255) DEFAULT 'admin'
);

-- Create indexes for skills
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_order ON skills(order_index);

-- ================================================================
-- ROW LEVEL SECURITY (RLS)
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content
CREATE POLICY "Public read access for site_content" ON site_content
  FOR SELECT USING (true);

CREATE POLICY "Admin full access for site_content" ON site_content
  FOR ALL USING (auth.role() = 'admin');

-- Create policies for projects
CREATE POLICY "Public read access for projects" ON projects
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admin full access for projects" ON projects
  FOR ALL USING (auth.role() = 'admin');

-- Create policies for skills
CREATE POLICY "Public read access for skills" ON skills
  FOR SELECT USING (true);

CREATE POLICY "Admin full access for skills" ON skills
  FOR ALL USING (auth.role() = 'admin');

-- ================================================================
-- INITIAL CONTENT DATA
-- ================================================================

-- Insert the main site content
INSERT INTO site_content (content_key, content_data, version, created_at, updated_at, created_by, updated_by)
VALUES (
  'main',
  '{
    "homepage": {
      "hero": {
        "title": "Build Software Solutions That Scale",
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
          "color": "vtech-cyan"
        },
        {
          "value": "99.9",
          "label": "Uptime SLA",
          "description": "Reliable infrastructure with guaranteed availability",
          "icon": "shield",
          "color": "vtech-green"
        },
        {
          "value": "50",
          "label": "Faster Deployments",
          "description": "Reduced deployment time with CI/CD automation",
          "icon": "rocket",
          "color": "vtech-purple"
        },
        {
          "value": "24/7",
          "label": "Support Available",
          "description": "Round-the-clock technical support and maintenance",
          "icon": "clock",
          "color": "vtech-orange"
        }
      ],
      "testimonials": [
        {
          "name": "Sarah Johnson",
          "title": "CTO",
          "company": "TechStart Inc.",
          "content": "VTech delivered exceptional results on our custom CRM system. Their technical expertise and attention to detail exceeded our expectations.",
          "rating": 5,
          "projectType": "Custom CRM System",
          "duration": "4 months"
        },
        {
          "name": "Michael Chen",
          "title": "Product Manager",
          "company": "GrowthCorp",
          "content": "The mobile app VTech built for us has been a game-changer. User engagement increased by 300% after launch.",
          "rating": 5,
          "projectType": "Mobile Application",
          "duration": "6 months"
        },
        {
          "name": "Emily Rodriguez",
          "title": "Founder",
          "company": "HealthTech Solutions",
          "content": "Working with VTech was seamless. They understood our complex requirements and delivered a robust, scalable solution on time.",
          "rating": 5,
          "projectType": "Healthcare Platform",
          "duration": "8 months"
        }
      ]
    },
    "company": {
      "name": "VTech Software Solutions",
             "tagline": "Building Tomorrow''s Digital Infrastructure Today",
      "description": "We are a forward-thinking software development company specializing in custom applications, cloud solutions, and digital transformation. Our team combines cutting-edge technology with business expertise to deliver scalable, secure, and innovative software solutions that drive growth.",
      "email": "hello@vtech-solutions.com",
      "phone": "+1 (555) 123-4567",
      "address": "123 Tech Street, Suite 400, San Francisco, CA 94105"
    }
  }'::jsonb,
  1,
  NOW(),
  NOW(),
  'admin',
  'admin'
);

-- ================================================================
-- SAMPLE PROJECTS
-- ================================================================

-- Insert sample projects
INSERT INTO projects (title, description, content, image_url, technologies, category, featured, order_index)
VALUES 
  (
    'E-Commerce Platform',
    'A modern e-commerce platform built with Next.js and Stripe integration',
    'Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard.',
    '/projects/ecommerce.jpg',
    ARRAY['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    'Web Development',
    true,
    1
  ),
  (
    'Mobile Banking App',
    'Cross-platform mobile banking application with biometric authentication',
    'Secure mobile banking app with real-time transactions, biometric login, and push notifications.',
    '/projects/banking.jpg',
    ARRAY['React Native', 'Node.js', 'MongoDB', 'AWS', 'Firebase'],
    'Mobile Development',
    true,
    2
  ),
  (
    'Healthcare Management System',
    'Comprehensive healthcare platform for patient management and medical records',
    'HIPAA-compliant healthcare system with patient portals, appointment scheduling, and medical record management.',
    '/projects/healthcare.jpg',
    ARRAY['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Redis'],
    'Enterprise',
    false,
    3
  );

-- ================================================================
-- SAMPLE SKILLS
-- ================================================================

-- Insert sample skills
INSERT INTO skills (name, category, proficiency, icon, color, order_index)
VALUES 
  ('React', 'Frontend', 5, 'react', 'vtech-cyan', 1),
  ('Next.js', 'Frontend', 5, 'nextjs', 'vtech-purple', 2),
  ('Node.js', 'Backend', 5, 'nodejs', 'vtech-green', 3),
  ('Python', 'Backend', 4, 'python', 'vtech-orange', 4),
  ('PostgreSQL', 'Database', 5, 'postgresql', 'vtech-cyan', 5),
  ('AWS', 'Cloud', 4, 'aws', 'vtech-orange', 6),
  ('Docker', 'DevOps', 4, 'docker', 'vtech-blue', 7),
  ('TypeScript', 'Frontend', 5, 'typescript', 'vtech-blue', 8);

-- ================================================================
-- VERIFICATION
-- ================================================================

-- Verify the setup
SELECT '🎉 Complete database setup finished!' as message;
SELECT '✅ Tables created with RLS policies' as status;
SELECT '📝 Sample data inserted' as data_status;
SELECT '🚀 Ready for admin panel usage' as next_step;

-- Show table counts
SELECT 'site_content' as table_name, COUNT(*) as record_count FROM site_content
UNION ALL
SELECT 'projects' as table_name, COUNT(*) as record_count FROM projects
UNION ALL
SELECT 'skills' as table_name, COUNT(*) as record_count FROM skills;
