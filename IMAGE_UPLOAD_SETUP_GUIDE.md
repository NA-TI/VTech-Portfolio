# Image Upload Setup Guide

This guide will help you set up the image upload functionality for the navigation logo feature.

## Prerequisites

1. **Supabase Account**: You need a Supabase account and project
2. **Environment Variables**: Configure your Supabase credentials

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or use an existing one
3. Note down your project URL and anon key

### 1.2 Configure Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Other variables...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 1.3 Create Storage Bucket

1. Go to your Supabase dashboard
2. Navigate to **Storage** in the left sidebar
3. Click **Create a new bucket**
4. Set the bucket name to: `media`
5. Make sure **Public bucket** is checked (for public access to uploaded images)
6. Click **Create bucket**

### 1.4 Configure Storage Policies

1. In the Storage section, click on the `media` bucket
2. Go to **Policies** tab
3. Add the following policies:

#### Policy 1: Allow public read access

```sql
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');
```

#### Policy 2: Allow authenticated uploads

```sql
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');
```

#### Policy 3: Allow authenticated updates

```sql
CREATE POLICY "Authenticated users can update" ON storage.objects FOR UPDATE USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

## Step 2: Test the Upload

### 2.1 Restart Your Development Server

```bash
npm run dev
```

### 2.2 Test Upload Functionality

1. Go to your admin panel (`/admin`)
2. Navigate to **Content** → **Navigation** tab
3. Try uploading a logo image using the drag-and-drop area
4. Check the browser console for any error messages

## Troubleshooting

### Error: "File upload not configured"

- **Solution**: Make sure your `.env.local` file has the correct Supabase URL and anon key
- **Check**: Verify the environment variables are loaded by checking the browser console

### Error: "Storage bucket 'media' not found"

- **Solution**: Create the `media` bucket in your Supabase project
- **Steps**: Follow Step 1.3 above

### Error: "Failed to upload file"

- **Solution**: Check the storage policies in your Supabase project
- **Steps**: Follow Step 1.4 above

### Error: "Only image files are allowed"

- **Solution**: Make sure you're uploading an image file (PNG, JPG, GIF, SVG)
- **Note**: Maximum file size is 5MB

### Error: "File size must be less than 5MB"

- **Solution**: Compress your image or use a smaller file
- **Recommendation**: Use images under 1MB for better performance

## Alternative: Use URL Instead of Upload

If you're having trouble with the upload functionality, you can still use the URL input method:

1. Upload your logo to any image hosting service (e.g., Imgur, Cloudinary, or your own server)
2. Copy the direct image URL
3. Paste it in the "Or enter image URL manually" field in the admin panel

## File Requirements

- **Formats**: PNG, JPG, GIF, SVG (PNG/SVG recommended)
- **Size**: Maximum 5MB
- **Dimensions**: Recommended 32px height, any width (max 128px)
- **Background**: Transparent background recommended

## Security Notes

- The upload API only accepts image files
- Files are validated for type and size
- Uploaded files are stored in a public bucket for easy access
- Consider implementing additional security measures for production use

## Production Considerations

For production deployment:

1. **Environment Variables**: Set up environment variables in your hosting platform
2. **CORS**: Configure CORS settings if needed
3. **Rate Limiting**: Consider implementing rate limiting for uploads
4. **File Cleanup**: Implement automatic cleanup of unused files
5. **CDN**: Consider using a CDN for better image delivery performance

