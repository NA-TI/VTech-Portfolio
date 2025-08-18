-- Setup Storage Bucket for Image Uploads
-- This script creates the media bucket and configures all necessary policies

-- Step 1: Create the media bucket
-- Note: Bucket creation must be done through the Supabase dashboard
-- Go to Storage > Create a new bucket > Name: "media" > Public bucket: checked

-- Step 2: Create storage policies for the media bucket

-- Policy 1: Allow public read access to all files in media bucket
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

-- Policy 2: Allow authenticated users to upload files to media bucket
CREATE POLICY "Authenticated users can upload" ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- Policy 3: Allow authenticated users to update files in media bucket
CREATE POLICY "Authenticated users can update" ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- Policy 4: Allow authenticated users to delete files from media bucket
CREATE POLICY "Authenticated users can delete" ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
);

-- Policy 5: Allow public access for specific file types (images)
CREATE POLICY "Public image access" ON storage.objects 
FOR SELECT 
USING (
  bucket_id = 'media' 
  AND (storage.extension(name) = ANY(ARRAY['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp']))
);

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Test query to verify bucket exists (run this after creating the bucket in dashboard)
SELECT 
  id,
  name,
  public,
  created_at,
  updated_at
FROM storage.buckets 
WHERE name = 'media';

