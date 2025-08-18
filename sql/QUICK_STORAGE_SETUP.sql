-- Quick Storage Setup for Image Uploads
-- Run this in your Supabase SQL Editor

-- Create storage policies for the media bucket
-- (Make sure you've created the 'media' bucket in the dashboard first)

-- Allow public read access
CREATE POLICY "Public Access" ON storage.objects 
FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated uploads
CREATE POLICY "Authenticated Uploads" ON storage.objects 
FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Allow authenticated updates
CREATE POLICY "Authenticated Updates" ON storage.objects 
FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Allow authenticated deletes
CREATE POLICY "Authenticated Deletes" ON storage.objects 
FOR DELETE USING (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Verify setup
SELECT 'Storage policies created successfully!' as status;
