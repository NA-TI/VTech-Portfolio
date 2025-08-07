#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗄️ Database Setup Script');
console.log('========================\n');

// Database schema SQL
const schemaSQL = `
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
CREATE POLICY "Allow authenticated insert" ON projects FOR INSERT USING (true);
CREATE POLICY "Allow authenticated update" ON projects FOR UPDATE USING (true);

-- Skills Policies
CREATE POLICY "Allow public read access" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON skills FOR INSERT USING (true);
CREATE POLICY "Allow authenticated update" ON skills FOR UPDATE USING (true);

-- Contact Messages Policies
CREATE POLICY "Allow public insert" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated read" ON contact_messages FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated update" ON contact_messages FOR UPDATE USING (auth.role() = 'authenticated');

-- Profiles Policies
CREATE POLICY "Allow public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON profiles FOR INSERT WITH AUTH (true);
CREATE POLICY "Allow authenticated update" ON profiles FOR UPDATE WITH AUTH (true);
`;

// Sample data SQL
const sampleDataSQL = `
-- Insert Sample Skills
INSERT INTO skills (title, description, icon_name, color_gradient, "order") VALUES
('Web Design & Development', 'Creating responsive, user-focused websites with modern technologies and clean aesthetics.', 'web', 'from-blue-500 to-cyan-500', 1),
('Graphics Design', 'Crafting visual identities, branding materials, and digital graphics that tell compelling stories.', 'graphics', 'from-purple-500 to-pink-500', 2),
('3D Product Visualization', 'Bringing products to life with photorealistic 3D renders and interactive experiences.', '3d', 'from-orange-500 to-red-500', 3);

-- Insert Sample Profile (will be updated by setup script)
INSERT INTO profiles (name, title, bio, email, location, social_links, skills, experience_years, available_for_projects) VALUES
('Your Name', 'Creative Designer', 'I bring ideas to life through innovative design and development. From pixel-perfect websites to stunning graphics and immersive 3D experiences, I create digital solutions that captivate and convert.', 'hello@yourname.com', 'Your Location', '{"github": "https://github.com/yourname", "linkedin": "https://linkedin.com/in/yourname", "twitter": "https://twitter.com/yourname"}', '{"Web Design", "Graphics Design", "3D Visualization"}', 3, true);

-- Insert Sample Projects
INSERT INTO projects (title, description, category, image_url, live_url, github_url, technologies, featured) VALUES
('E-commerce Website', 'A modern e-commerce platform built with Next.js and Stripe integration. Features include user authentication, product catalog, shopping cart, and secure payment processing.', 'web', '/projects/ecommerce.jpg', 'https://project-demo.com', 'https://github.com/yourname/ecommerce', '{"Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"}', true),
('Brand Identity Design', 'Complete brand identity design for a tech startup, including logo design, color palette, typography, and brand guidelines.', 'graphics', '/projects/branding.jpg', NULL, NULL, '{"Adobe Illustrator", "Adobe Photoshop", "Figma"}', true),
('3D Product Render', 'Photorealistic 3D render of a modern smartphone with detailed materials and lighting setup.', '3d', '/projects/3d-phone.jpg', NULL, NULL, '{"Blender", "Substance Painter", "Cycles"}', false);
`;

// Create SQL files
function createSQLFiles() {
  console.log('📝 Creating SQL files...');
  
  // Create sql directory if it doesn't exist
  const sqlDir = path.join(__dirname, '..', 'sql');
  if (!fs.existsSync(sqlDir)) {
    fs.mkdirSync(sqlDir, { recursive: true });
  }
  
  // Write schema.sql
  fs.writeFileSync(path.join(sqlDir, 'schema.sql'), schemaSQL);
  console.log('✅ Created sql/schema.sql');
  
  // Write sample-data.sql
  fs.writeFileSync(path.join(sqlDir, 'sample-data.sql'), sampleDataSQL);
  console.log('✅ Created sql/sample-data.sql');
  
  // Create database setup instructions
  const setupInstructions = `# Database Setup Instructions

## 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/Login and create a new project
3. Choose a name for your project
4. Set a database password
5. Choose a region close to you

## 2. Set up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of \`sql/schema.sql\`
4. Click "Run" to execute the schema

## 3. Insert Sample Data
1. In the SQL Editor, copy and paste the contents of \`sql/sample-data.sql\`
2. Click "Run" to insert sample data

## 4. Update Profile Information
1. Go to Table Editor > profiles
2. Edit the sample profile with your information
3. Update name, title, bio, email, location, and social links

## 5. Add Your Projects
1. Go to Table Editor > projects
2. Add your own projects or edit the sample ones
3. Upload project images to your public folder

## 6. Customize Skills
1. Go to Table Editor > skills
2. Edit the sample skills or add your own
3. Update descriptions and proficiency levels

## Environment Variables
Make sure your \`.env.local\` file has the correct Supabase credentials:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
`;

  fs.writeFileSync(path.join(sqlDir, 'README.md'), setupInstructions);
  console.log('✅ Created sql/README.md');
}

// Main function
function main() {
  try {
    createSQLFiles();
    console.log('\n✅ Database setup files created successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Follow the instructions in sql/README.md');
    console.log('2. Set up your Supabase project');
    console.log('3. Run the SQL scripts in your Supabase SQL Editor');
    console.log('4. Update the sample data with your information');
  } catch (error) {
    console.error('❌ Error creating database files:', error.message);
  }
}

main(); 