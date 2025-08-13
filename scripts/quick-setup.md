# 🚀 Quick Database Setup

## Step 1: Go to Supabase Dashboard
1. Visit: https://supabase.com
2. Login to your account
3. Open your project: `zkirioqwnkzjzenhxofy`

## Step 2: Run Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste this SQL:

```sql
-- Projects Table
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

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  color_gradient VARCHAR(100) NOT NULL,
  proficiency INTEGER DEFAULT 0 CHECK (proficiency >= 0 AND proficiency <= 100),
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profile Table
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

-- Enable Row Level Security on all tables
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

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
CREATE POLICY "Allow authenticated read" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Profiles Policies
CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON profiles FOR UPDATE USING (true);
```

3. Click **Run** to execute

## Step 3: Add Sample Data
1. In the same SQL Editor, copy and paste this:

```sql
-- Insert Sample Profile
INSERT INTO profiles (name, title, bio, email, location, social_links, skills, experience_years, available_for_projects) VALUES
('V-Tech', 'Software Development Company', 'VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.', 'vtechofficial@gmail.com', 'Addis Ababa, Ethiopia', '{"github": "https://github.com/vtech-solutions", "linkedin": "https://linkedin.com/company/vtech-solutions", "twitter": "https://twitter.com/vtechsolutions"}', '{"Web Development", "Mobile Apps", "Cloud Solutions", "AI/ML"}', 3, true);

-- Insert Sample Skills
INSERT INTO skills (title, description, icon_name, color_gradient, "order") VALUES
('Web Development', 'Building modern, responsive web applications with cutting-edge technologies.', 'web', 'from-blue-500 to-cyan-500', 1),
('Mobile Development', 'Creating native and cross-platform mobile applications for iOS and Android.', 'mobile', 'from-purple-500 to-pink-500', 2),
('Cloud Solutions', 'Designing and implementing scalable cloud infrastructure and services.', 'cloud', 'from-orange-500 to-red-500', 3),
('AI & Machine Learning', 'Developing intelligent solutions with artificial intelligence and machine learning.', 'ai', 'from-green-500 to-teal-500', 4);

-- Insert Sample Projects
INSERT INTO projects (title, description, category, image_url, live_url, github_url, technologies, featured) VALUES
('E-commerce Platform', 'A modern e-commerce platform built with Next.js and Stripe integration. Features include user authentication, product catalog, shopping cart, and secure payment processing.', 'web', '/projects/ecommerce.jpg', 'https://project-demo.com', 'https://github.com/vtech-solutions/ecommerce', '{"Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"}', true),
('Mobile Banking App', 'A secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management features.', 'mobile', '/projects/banking.jpg', 'https://app-store.com/banking', 'https://github.com/vtech-solutions/banking-app', '{"React Native", "Node.js", "PostgreSQL", "Redis"}', true),
('AI-Powered Analytics Dashboard', 'An intelligent analytics platform that provides real-time insights and predictive analytics for business intelligence.', 'ai', '/projects/analytics.jpg', 'https://analytics-demo.com', 'https://github.com/vtech-solutions/analytics', '{"Python", "TensorFlow", "React", "D3.js"}', false);
```

2. Click **Run** to execute

## Step 4: Verify Setup
1. Go to **Table Editor** in your Supabase dashboard
2. Check that all tables are created: `profiles`, `projects`, `skills`, `contact_messages`
3. Verify that sample data is inserted

## Step 5: Deploy to Production
1. Set environment variables in Vercel (see main deployment guide)
2. Redeploy your application
3. Test your live site!

---

**Your database should now be ready for production!** 🎉

