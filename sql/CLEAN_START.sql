-- ================================================================
-- CLEAN START - MINIMAL CONTENT SETUP
-- ================================================================
-- This script creates a clean, minimal content structure
-- Only includes the essential content that we actually edit

-- First, let's clear any existing content
DELETE FROM site_content WHERE content_key = 'main';

-- Insert clean, minimal content structure
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

-- Verify the setup
SELECT '🎉 Clean content setup completed!' as message;
SELECT '✅ Only essential content included' as status;
SELECT '📝 Ready for minimal admin editing' as next_step;
