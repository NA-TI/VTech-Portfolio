-- ================================================================
-- VERIFICATION SCRIPT
-- ================================================================
-- Run this after updating content to verify everything is working

-- Check that content exists
SELECT 
  content_key,
  version,
  updated_by,
  created_at,
  updated_at
FROM site_content 
WHERE content_key = 'main';

-- Check homepage sections exist
SELECT 
  'homepage.hero' as section,
  CASE WHEN content_data->'homepage'->'hero' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'homepage.metrics' as section,
  CASE WHEN content_data->'homepage'->'metrics' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'homepage.processSteps' as section,
  CASE WHEN content_data->'homepage'->'processSteps' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'homepage.testimonials' as section,
  CASE WHEN content_data->'homepage'->'testimonials' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'homepage.interactiveFeatures' as section,
  CASE WHEN content_data->'homepage'->'interactiveFeatures' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'about.teamMembers' as section,
  CASE WHEN content_data->'about'->'teamMembers' IS NOT NULL THEN '✅' ELSE '❌' END as status
FROM site_content WHERE content_key = 'main';

-- Count items in each section
SELECT 
  'Metrics Count' as section,
  jsonb_array_length(content_data->'homepage'->'metrics') as count
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Process Steps Count' as section,
  jsonb_array_length(content_data->'homepage'->'processSteps') as count
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Testimonials Count' as section,
  jsonb_array_length(content_data->'homepage'->'testimonials') as count
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Interactive Features Count' as section,
  jsonb_array_length(content_data->'homepage'->'interactiveFeatures') as count
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Team Members Count' as section,
  jsonb_array_length(content_data->'about'->'teamMembers') as count
FROM site_content WHERE content_key = 'main';

-- Show sample data from each section
SELECT 
  'Sample Metrics' as section,
  content_data->'homepage'->'metrics'->0 as sample_data
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Sample Process Step' as section,
  content_data->'homepage'->'processSteps'->0 as sample_data
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Sample Testimonial' as section,
  content_data->'homepage'->'testimonials'->0 as sample_data
FROM site_content WHERE content_key = 'main'

UNION ALL

SELECT 
  'Sample Team Member' as section,
  content_data->'about'->'teamMembers'->0 as sample_data
FROM site_content WHERE content_key = 'main';
