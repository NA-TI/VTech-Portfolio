# 🧹 Image Cleanup Implementation Guide

This guide explains the new automatic image cleanup functionality that deletes old images when new ones are uploaded.

## 🎯 **What Changed**

### **Before:**

- Each upload created a new file with a unique timestamp
- Old images remained in storage indefinitely
- Storage space accumulated over time
- No automatic cleanup

### **After:**

- New uploads automatically delete the previous image
- Only Supabase storage URLs are cleaned up
- External URLs (CDNs, etc.) are preserved
- Storage space is managed automatically

## 🔧 **How It Works**

### **1. Upload Process**

When you upload a new image through the admin panel:

1. **File Selection**: Choose a new image file
2. **Current Image Check**: System checks if there's an existing image
3. **Upload**: New image is uploaded to Supabase storage
4. **Cleanup**: If the current image is from Supabase storage, it's deleted
5. **Update**: Database is updated with the new image URL

### **2. Cleanup Logic**

```typescript
// Only Supabase URLs are cleaned up
if (oldImageUrl && oldImageUrl.includes("supabase.co")) {
  await deleteOldImage(oldImageUrl);
}
```

### **3. URL Extraction**

The system extracts the filename from Supabase URLs:

```
Input:  https://xxx.supabase.co/storage/v1/object/public/media/logos/1703123456789-abc123.jpg
Output: logos/1703123456789-abc123.jpg
```

## 📍 **Where It Works**

The cleanup functionality is available in all admin areas with image uploads:

### **✅ Admin Profile** (`/admin/profile`)

- Profile pictures
- Avatar images

### **✅ Admin Content** (`/admin/content`)

- Logo images
- Branding assets

### **✅ Admin Settings** (`/admin/settings`)

- Logo uploads
- Favicon uploads

### **✅ Admin Projects** (`/admin/projects/new`)

- Project screenshots
- Project thumbnails

## 🛡️ **Safety Features**

### **1. URL Validation**

- Only Supabase storage URLs are processed
- External URLs (CDNs, other domains) are ignored
- Invalid URLs are safely handled

### **2. Error Handling**

- Cleanup failures don't affect upload success
- Detailed logging for debugging
- Graceful fallback if deletion fails

### **3. File Type Safety**

- Only image files are processed
- File size limits enforced (5MB max)
- MIME type validation

## 🧪 **Testing**

### **Run the Test Script**

```bash
npm run test-cleanup
```

This will:

- Test URL extraction logic
- Verify error handling
- List current files in storage
- Validate cleanup functionality

### **Manual Testing**

1. Upload an image through any admin page
2. Upload a new image to replace it
3. Check Supabase storage dashboard
4. Verify old file is deleted

## 📊 **Storage Management**

### **Before Cleanup**

```
media/
├── logos/
│   ├── 1703123456789-abc123.jpg (old)
│   ├── 1703123456790-def456.jpg (old)
│   └── 1703123456791-ghi789.jpg (current)
└── avatars/
    ├── 1703123456788-jkl012.jpg (old)
    └── 1703123456792-mno345.jpg (current)
```

### **After Cleanup**

```
media/
├── logos/
│   └── 1703123456791-ghi789.jpg (current only)
└── avatars/
    └── 1703123456792-mno345.jpg (current only)
```

## 🔍 **Monitoring**

### **Console Logs**

The system logs all cleanup operations:

```
Attempting to delete old image: logos/1703123456789-abc123.jpg
Successfully deleted old image: logos/1703123456789-abc123.jpg
```

### **Supabase Dashboard**

- Monitor storage usage in real-time
- View file deletion history
- Check storage policies

## 🚨 **Important Notes**

### **What Gets Cleaned Up**

- ✅ Images uploaded through FileUpload component
- ✅ Files stored in Supabase storage
- ✅ Images with valid Supabase URLs

### **What Doesn't Get Cleaned Up**

- ❌ External URLs (CDNs, other domains)
- ❌ Manually entered image URLs
- ❌ Files uploaded outside the admin panel
- ❌ Non-image files

### **Backup Considerations**

- Old images are permanently deleted
- Consider backing up important images
- Use version control for critical assets

## 🔧 **Troubleshooting**

### **Cleanup Not Working**

1. Check if the old image URL is from Supabase
2. Verify storage permissions
3. Check console logs for errors
4. Run the test script

### **Storage Still Full**

1. Check for external URLs not being cleaned
2. Look for files uploaded outside admin panel
3. Manually clean up old files in Supabase dashboard

### **Permission Errors**

1. Verify storage policies are set correctly
2. Check service role key permissions
3. Ensure bucket exists and is accessible

## 📈 **Benefits**

### **Storage Efficiency**

- Automatic space management
- No manual cleanup required
- Reduced storage costs

### **User Experience**

- Seamless image updates
- No broken image links
- Consistent file management

### **Maintenance**

- Less manual intervention
- Automated cleanup process
- Better resource utilization

## 🔮 **Future Enhancements**

Potential improvements to consider:

- [ ] Bulk cleanup for multiple files
- [ ] Scheduled cleanup for old unused files
- [ ] Image optimization before upload
- [ ] Backup system for important images
- [ ] Cleanup history and audit trail
