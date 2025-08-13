-- ================================================================
-- VTECH PORTFOLIO - DATABASE MIGRATION FOR SOFTWARE CATEGORIES
-- ================================================================
-- Run this script to update your existing database for software company focus
-- IMPORTANT: Backup your database before running this!
-- ================================================================

-- ================================================================
-- STEP 1: Update the projects table category constraint
-- ================================================================

-- First, drop the existing constraint
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_category_check;

-- Add the new constraint with software company categories
ALTER TABLE projects ADD CONSTRAINT projects_category_check 
  CHECK (category IN ('web', 'mobile', 'ai', 'cloud', 'enterprise'));

-- ================================================================  
-- STEP 2: Add missing columns if they don't exist
-- ================================================================

-- Add short_description column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS short_description VARCHAR(500);

-- Add case_study_url column  
ALTER TABLE projects ADD COLUMN IF NOT EXISTS case_study_url TEXT;

-- Add key_features column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features TEXT[] DEFAULT '{}';

-- Add status column with default
ALTER TABLE projects ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'completed' 
  CHECK (status IN ('planning', 'development', 'completed', 'archived'));

-- Add priority column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0;

-- Add project management columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_duration VARCHAR(100);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS team_size INTEGER;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS client VARCHAR(255);
ALTER TABLE projects ADD COLUMN IF NOT EXISTS budget_range VARCHAR(100);

-- Add challenge/solution columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solutions TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS lessons_learned TEXT;

-- Add category-specific JSON columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS web_details JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS mobile_details JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS ai_details JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS cloud_details JSONB DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS enterprise_details JSONB DEFAULT '{}';

-- Add SEO columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE projects ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- Add project date columns
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_start_date DATE;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS project_end_date DATE;

-- ================================================================
-- STEP 3: Update existing projects to new categories (if any exist)
-- ================================================================

-- Convert 'graphics' to 'web' (assuming graphic projects become web design)
UPDATE projects SET category = 'web' WHERE category = 'graphics';

-- Convert '3d' to 'web' (assuming 3D becomes web-based 3D)
UPDATE projects SET category = 'web' WHERE category = '3d';

-- ================================================================
-- STEP 4: Create missing indexes for performance
-- ================================================================

CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- ================================================================
-- STEP 5: Insert sample software company projects
-- ================================================================

-- Delete old sample projects first (optional)
-- DELETE FROM projects WHERE title IN ('Brand Identity Design', '3D Product Render');

-- Insert new software company sample projects
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
-- Migration completed successfully!
-- Your database now supports the new software company categories:
-- - web (Web Development)
-- - mobile (Mobile Applications) 
-- - ai (AI/ML Solutions)
-- - cloud (Cloud Infrastructure)
-- - enterprise (Enterprise Software)
-- ================================================================
