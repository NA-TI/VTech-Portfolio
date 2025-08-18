-- Fixed Storage Policies for Image Uploads
-- This script creates the correct policies for server-side uploads

-- First, drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Uploads" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Updates" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Deletes" ON storage.objects;
DROP POLICY IF EXISTS "Public image access" ON storage.objects;

-- Policy 1: Allow public read access to all files in media bucket
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT 
USING (bucket_id = 'media');

-- Policy 2: Allow ANYONE to upload files to media bucket (for server-side uploads)
CREATE POLICY "Allow Uploads" ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'media');

-- Policy 3: Allow ANYONE to update files in media bucket (for server-side operations)
CREATE POLICY "Allow Updates" ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'media');

-- Policy 4: Allow ANYONE to delete files from media bucket (for server-side operations)
CREATE POLICY "Allow Deletes" ON storage.objects 
FOR DELETE 
USING (bucket_id = 'media');

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Test query to verify bucket exists
SELECT 
  id,
  name,
  public,
  created_at
FROM storage.buckets 
WHERE name = 'media';
