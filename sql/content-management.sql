-- Content Management Database Schema for VTech Portfolio
-- This schema stores all editable content for the website

-- Create the site_content table to store all website content
CREATE TABLE IF NOT EXISTS site_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_key TEXT NOT NULL UNIQUE,
    content_data JSONB NOT NULL,
    is_published BOOLEAN DEFAULT true,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_by TEXT,
    created_by TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_site_content_published ON site_content(is_published);

-- Create RLS policies for security
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Allow read access to published content
CREATE POLICY "Allow read access to published content" ON site_content
    FOR SELECT USING (is_published = true);

-- Allow authenticated users to update content
CREATE POLICY "Allow authenticated users to update content" ON site_content
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert content
CREATE POLICY "Allow authenticated users to insert content" ON site_content
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_site_content_updated_at 
    BEFORE UPDATE ON site_content 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT SELECT, INSERT, UPDATE ON site_content TO authenticated;
GRANT SELECT ON site_content TO anon;
