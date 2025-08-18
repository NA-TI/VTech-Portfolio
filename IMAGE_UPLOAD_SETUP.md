# Image Upload Setup Guide

This guide will help you set up the image upload functionality for your V-Tech Portfolio admin panel.

## Features Added

✅ **File Upload Component**: Drag & drop or click to upload images
✅ **Supabase Storage Integration**: Secure cloud storage for all uploaded files
✅ **Admin Profile Pictures**: Upload profile avatars directly from device
✅ **Project Images**: Upload project screenshots and thumbnails
✅ **Media Library**: Centralized media management
✅ **URL Fallback**: Still support external image URLs as alternative

## Setup Instructions

### 1. Environment Variables

Make sure you have these environment variables in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Storage

Run the storage setup script:

```bash
npm run setup-storage
```

This will create three storage buckets:

- `media` - General media files
- `avatars` - Profile pictures
- `projects` - Project images

### 4. Manual Storage Setup (Alternative)

If the script doesn't work, manually create the buckets in your Supabase dashboard:

1. Go to Storage in your Supabase dashboard
2. Create three buckets: `media`, `avatars`, `projects`
3. Set all buckets to public
4. Configure allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
5. Set file size limit to 5MB

## Usage

### Admin Profile Page

1. Go to `/admin/profile`
2. You'll see a new "Profile Picture" upload area
3. Drag & drop an image or click to browse
4. The image will be uploaded to Supabase and the URL will be saved
5. You can still manually enter an image URL as an alternative

### Project Creation

1. Go to `/admin/projects/new`
2. Use the "Project Image" upload area
3. Upload project screenshots or thumbnails
4. Images are automatically organized in the `projects` folder

### Media Library

1. Go to `/admin/media`
2. Upload images to the general media library
3. Copy URLs to use in your content
4. View recently uploaded files

## File Organization

Uploaded files are automatically organized by type:

```
media/
├── avatars/
│   ├── 1234567890-abc123.jpg
│   └── 1234567891-def456.png
├── projects/
│   ├── 1234567892-ghi789.jpg
│   └── 1234567893-jkl012.png
└── media/
    ├── 1234567894-mno345.jpg
    └── 1234567895-pqr678.png
```

## Technical Details

### API Endpoint

- **POST** `/api/upload`
- Accepts FormData with `file` and `folder` fields
- Returns JSON with `success`, `url`, and `fileName`

### FileUpload Component

```tsx
<FileUpload
  onFileUpload={(file) => console.log("File selected:", file)}
  onUploadComplete={(url) => console.log("Uploaded URL:", url)}
  currentImage="https://existing-image.jpg"
  accept="image/*"
  maxSize={5}
  folder="avatars"
/>
```

### Supported Features

- ✅ Drag & drop upload
- ✅ Click to browse
- ✅ Image preview
- ✅ File validation (type & size)
- ✅ Upload progress indication
- ✅ Error handling
- ✅ Automatic URL generation
- ✅ Folder organization

## Troubleshooting

### Upload Fails

1. Check Supabase storage is enabled
2. Verify environment variables are set
3. Ensure storage buckets exist
4. Check file size (max 5MB)
5. Verify file type (images only)

### Images Not Displaying

1. Check bucket is set to public
2. Verify RLS policies allow read access
3. Check image URL is accessible

### Storage Setup Issues

1. Ensure you have service role key (not anon key)
2. Check Supabase project permissions
3. Verify storage is enabled in your plan

## Security Notes

- Files are validated for type and size
- Unique filenames prevent conflicts
- Public buckets for easy access
- Consider implementing RLS policies for production

## Next Steps

- [ ] Add image optimization
- [ ] Implement file deletion
- [ ] Add bulk upload support
- [ ] Create image cropping tool
- [ ] Add file management interface
