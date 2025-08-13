-- ================================================================
-- FIX CONTENT MANAGEMENT SYSTEM
-- ================================================================
-- This script fixes the content management system by:
-- 1. Ensuring the site_content table exists with correct structure
-- 2. Inserting/updating the main content with proper structure
-- 3. Setting up correct RLS policies
-- 4. Adding proper indexes
-- ================================================================

-- 1. Ensure site_content table exists with correct structure
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

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_content_key ON site_content(content_key);
CREATE INDEX IF NOT EXISTS idx_site_content_published ON site_content(is_published);

-- 3. Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies
DROP POLICY IF EXISTS "Public can read published content" ON site_content;
CREATE POLICY "Public can read published content" ON site_content
  FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Authenticated users can read all content" ON site_content;
CREATE POLICY "Authenticated users can read all content" ON site_content
  FOR SELECT USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can insert content" ON site_content;
CREATE POLICY "Authenticated users can insert content" ON site_content
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update content" ON site_content;
CREATE POLICY "Authenticated users can update content" ON site_content
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 5. Insert or update the main content with complete structure
INSERT INTO site_content (content_key, content_data, is_published, version, updated_by) 
VALUES (
  'main',
  '{
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
  }'::jsonb,
  true,
  1,
  null
)
ON CONFLICT (content_key) 
DO UPDATE SET
  content_data = EXCLUDED.content_data,
  version = site_content.version + 1,
  updated_at = NOW(),
  is_published = true;

-- 6. Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_site_content_updated_at ON site_content;
CREATE TRIGGER update_site_content_updated_at 
  BEFORE UPDATE ON site_content 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Verify the content was inserted correctly
SELECT 
  content_key,
  version,
  is_published,
  created_at,
  updated_at,
  jsonb_typeof(content_data) as content_type
FROM site_content 
WHERE content_key = 'main';

-- 8. Test the content structure
SELECT 
  content_data->'homepage'->'hero'->>'title' as hero_title,
  content_data->'company'->>'name' as company_name,
  content_data->'navigation'->>'brand' as nav_brand,
  content_data->'footer'->>'description' as footer_desc
FROM site_content 
WHERE content_key = 'main';

-- ================================================================
-- CONTENT MANAGEMENT SYSTEM FIXED! 🎉
-- ================================================================
-- Your content management system is now properly configured with:
-- ✅ Correct table structure
-- ✅ Proper RLS policies
-- ✅ Complete content structure
-- ✅ Performance indexes
-- ✅ Automatic timestamp updates
--
-- Next steps:
-- 1. Test the admin panel at /admin/content
-- 2. Verify content updates are saved to database
-- 3. Check that frontend components display updated content

