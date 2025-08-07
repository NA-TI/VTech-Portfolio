# Database Setup Instructions

## 1. Create Supabase Project
1. Go to https://supabase.com
2. Sign up/Login and create a new project
3. Choose a name for your project
4. Set a database password
5. Choose a region close to you

## 2. Set up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `sql/schema.sql`
4. Click "Run" to execute the schema

## 3. Insert Sample Data
1. In the SQL Editor, copy and paste the contents of `sql/sample-data.sql`
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
Make sure your `.env.local` file has the correct Supabase credentials:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
