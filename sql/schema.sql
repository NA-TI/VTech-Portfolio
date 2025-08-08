
-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'graphics', '3d')),
  image_url TEXT,
  live_url TEXT,
  github_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  
  -- Web Development specific fields
  code_snippets JSONB,
  tech_stack TEXT[],
  deployment_info TEXT,
  performance_metrics JSONB,
  
  -- Graphics Design specific fields
  design_process TEXT,
  inspiration TEXT,
  color_palette TEXT[],
  design_tools TEXT[],
  mockups JSONB,
  
  -- 3D Design specific fields
  modeling_process TEXT,
  software_used TEXT[],
  render_settings TEXT,
  wireframes JSONB,
  final_renders JSONB,
  
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
