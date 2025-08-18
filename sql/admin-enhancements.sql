-- Admin Enhancements SQL Script
-- This script adds the necessary tables for enhanced admin functionality

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_name VARCHAR(255) NOT NULL DEFAULT 'VTech Portfolio',
    site_description TEXT,
    logo TEXT,
    favicon TEXT,
    primary_color VARCHAR(7) DEFAULT '#3B82F6',
    secondary_color VARCHAR(7) DEFAULT '#10B981',
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    og_image TEXT,
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    contact_address TEXT,
    social_links JSONB DEFAULT '{}',
    admin_email VARCHAR(255),
    enable_notifications BOOLEAN DEFAULT true,
    auto_backup BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    action VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    entity_type VARCHAR(50) NOT NULL CHECK (entity_type IN ('project', 'skill', 'content', 'profile', 'message', 'settings', 'system')),
    entity_id UUID,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name VARCHAR(255) NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_action ON activity_logs(action);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for site_settings
CREATE TRIGGER update_site_settings_updated_at 
    BEFORE UPDATE ON site_settings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO site_settings (
    site_name,
    site_description,
    primary_color,
    secondary_color,
    meta_title,
    meta_description,
    meta_keywords,
    social_links,
    enable_notifications,
    auto_backup
) VALUES (
    'VTech Portfolio',
    'Professional portfolio and services',
    '#3B82F6',
    '#10B981',
    'VTech Portfolio - Professional Development Services',
    'Professional web development, mobile apps, and AI solutions',
    'web development, mobile apps, AI, portfolio',
    '{"linkedin": "", "github": "", "twitter": "", "instagram": ""}',
    true,
    true
) ON CONFLICT DO NOTHING;

-- Create RLS policies for site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read site settings" ON site_settings
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update site settings" ON site_settings
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert site settings" ON site_settings
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create RLS policies for activity_logs
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read activity logs" ON activity_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to insert activity logs" ON activity_logs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create function to log activities automatically
CREATE OR REPLACE FUNCTION log_activity(
    p_action VARCHAR(50),
    p_description TEXT,
    p_entity_type VARCHAR(50),
    p_entity_id UUID DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    v_user_id UUID;
    v_user_name VARCHAR(255);
    v_activity_id UUID;
BEGIN
    -- Get current user info
    SELECT auth.uid() INTO v_user_id;
    
    -- Get username from profiles table or use default
    SELECT username INTO v_user_name 
    FROM profiles 
    WHERE id = v_user_id;
    
    IF v_user_name IS NULL THEN
        v_user_name := 'Admin';
    END IF;
    
    -- Insert activity log
    INSERT INTO activity_logs (
        action,
        description,
        entity_type,
        entity_id,
        user_id,
        user_name,
        metadata
    ) VALUES (
        p_action,
        p_description,
        p_entity_type,
        p_entity_id,
        v_user_id,
        v_user_name,
        p_metadata
    ) RETURNING id INTO v_activity_id;
    
    RETURN v_activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON site_settings TO authenticated;
GRANT ALL ON activity_logs TO authenticated;
GRANT EXECUTE ON FUNCTION log_activity TO authenticated;

-- Create some sample activity logs for demonstration
INSERT INTO activity_logs (
    action,
    description,
    entity_type,
    user_name,
    metadata
) VALUES 
    ('login', 'Admin logged in successfully', 'system', 'Admin', '{"ip": "127.0.0.1"}'),
    ('create', 'Created new project: E-commerce Platform', 'project', 'Admin', '{"project_id": "sample-1", "technologies": ["React", "Node.js"]}'),
    ('update', 'Updated homepage hero section', 'content', 'Admin', '{"section": "hero", "changes": ["title", "subtitle"]}'),
    ('create', 'Added new skill: React Development', 'skill', 'Admin', '{"skill_name": "React Development", "proficiency": 90}'),
    ('upload', 'Uploaded project image', 'project', 'Admin', '{"file_size": "2.5MB", "file_type": "image/jpeg"}');

-- Add comments for documentation
COMMENT ON TABLE site_settings IS 'Stores global site configuration and settings';
COMMENT ON TABLE activity_logs IS 'Tracks all admin actions and system events for audit purposes';
COMMENT ON FUNCTION log_activity IS 'Helper function to automatically log admin activities';

