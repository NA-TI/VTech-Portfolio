-- Update Navigation Content with Logo Image Support
-- This script updates the navigation content to include the new logoImage field

UPDATE site_content 
SET content_data = jsonb_set(
  content_data, 
  '{navigation}', 
  '{
    "brand": "VTech",
    "logoImage": "",
    "items": [
      {"label": "Home", "href": "/", "icon": "home"},
      {"label": "About", "href": "/about", "icon": "user"},
      {"label": "Services", "href": "/services", "icon": "briefcase"},
      {"label": "Projects", "href": "/projects", "icon": "folder"},
      {"label": "Contact", "href": "/contact", "icon": "mail"}
    ]
  }'::jsonb
)
WHERE content_key = 'main_content';

-- If no content exists, insert it
INSERT INTO site_content (content_key, content_data)
SELECT 'main_content', '{
  "navigation": {
    "brand": "VTech",
    "logoImage": "",
    "items": [
      {"label": "Home", "href": "/", "icon": "home"},
      {"label": "About", "href": "/about", "icon": "user"},
      {"label": "Services", "href": "/services", "icon": "briefcase"},
      {"label": "Projects", "href": "/projects", "icon": "folder"},
      {"label": "Contact", "href": "/contact", "icon": "mail"}
    ]
  }
}'::jsonb
WHERE NOT EXISTS (
  SELECT 1 FROM site_content WHERE content_key = 'main_content'
);

-- Verify the update
SELECT content_key, content_data->'navigation' as navigation_data 
FROM site_content 
WHERE content_key = 'main_content';
