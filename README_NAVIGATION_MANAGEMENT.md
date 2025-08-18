# Navigation & Brand Management

This feature allows you to manage your website's navigation menu and brand logo directly from the admin panel.

## Features

### Brand Logo Management

- **Text Logo**: Set your brand name that appears as text
- **Image Upload**: Upload logo images directly with drag-and-drop support
- **URL Input**: Alternatively, provide a logo image URL
- **Automatic Fallback**: If the image fails to load, it automatically falls back to the text logo
- **Live Preview**: See how your logo will appear in the navigation
- **Image Optimization**: Automatic resizing and optimization for web use

### Navigation Menu Management

- **Add/Remove Menu Items**: Dynamically manage your navigation menu
- **Custom Labels**: Set custom labels for each menu item
- **URL Management**: Configure the destination URLs for each menu item
- **Icon Selection**: Choose from predefined icons for each menu item

## How to Use

### Accessing the Feature

1. Go to your admin panel (`/admin`)
2. Navigate to the "Content" section
3. Click on the "Navigation" tab

### Setting Up Your Brand Logo

#### Text Logo Only

1. Enter your brand name in the "Brand Name" field
2. Leave the "Logo Image URL" field empty
3. The system will display your brand name with a styled "V" icon

#### Image Logo

1. Enter your brand name in the "Brand Name" field (used as fallback)
2. **Option A - Upload Image**: Use the drag-and-drop upload area to upload your logo directly
3. **Option B - URL Input**: Alternatively, add the URL to your logo image in the text field
4. The image will be displayed instead of the text logo
5. If the image fails to load, it will automatically fall back to the text logo

### Managing Navigation Menu

#### Adding Menu Items

1. Click "Add Menu Item" button
2. Fill in the required fields:
   - **Label**: The text that appears in the navigation
   - **URL**: The destination URL (e.g., `/about`, `/services`)
   - **Icon**: Choose an appropriate icon from the dropdown

#### Editing Menu Items

1. Click on any existing menu item to edit
2. Modify the label, URL, or icon as needed
3. Changes are saved automatically when you click "Save Changes"

#### Removing Menu Items

1. Click the "Remove" button next to any menu item
2. The item will be removed from the navigation

## Supported Icons

The following icons are available for menu items:

- **Home**: House icon for homepage
- **User/About**: User icon for about pages
- **Briefcase/Services**: Briefcase icon for services
- **Folder/Projects**: Folder icon for projects/portfolio
- **Mail/Contact**: Mail icon for contact pages
- **Code**: Code icon for technical pages
- **Settings**: Settings icon for configuration pages

## Technical Details

### Database Structure

The navigation data is stored in the `site_content` table with the following structure:

```json
{
  "navigation": {
    "brand": "VTech",
    "logoImage": "https://example.com/logo.png",
    "items": [
      {
        "label": "Home",
        "href": "/",
        "icon": "home"
      }
    ]
  }
}
```

### File Changes

- **Admin Panel**: `src/app/admin/content/page.tsx` - Added navigation tab
- **Navigation Component**: `src/components/Navigation.tsx` - Updated to support image logos
- **Content Hook**: `src/hooks/useContent.ts` - Added logoImage field support
- **Database**: `sql/UPDATE_NAVIGATION.sql` - SQL script to update existing data

### CSS Classes

The feature uses existing VTech color classes:

- `vtech-blue-500` to `vtech-blue-800` for navigation tab styling
- `vtech-cyan-500` to `vtech-cyan-600` for brand icon styling

## Best Practices

### Logo Images

- **Upload Formats**: PNG, JPG, GIF, SVG (PNG/SVG recommended for best quality)
- **Recommended Size**: 32px height, any width (max 128px)
- **Upload Method**: Drag-and-drop or click to browse files
- **File Size Limit**: Maximum 5MB per image
- **Background**: Transparent background recommended for best results
- **Optimization**: Images are automatically optimized for web use

### Navigation Items

- Keep menu labels short and descriptive
- Use consistent URL patterns (e.g., `/about`, `/services`)
- Don't add too many menu items (recommended: 5-7 items)
- Consider the user experience and logical grouping

### Performance

- **Automatic Optimization**: Images are automatically optimized for web use
- **CDN Storage**: Uploaded images are stored in Supabase CDN for fast loading
- **Fallback Handling**: The system automatically handles image loading failures
- **Caching**: Images are cached for improved performance

## Troubleshooting

### Logo Not Displaying

1. **For Uploaded Images**: Check if the upload completed successfully
2. **For URL Images**: Check if the image URL is correct and accessible
3. Verify the image format is supported (PNG, JPG, GIF, SVG)
4. Check browser console for any loading errors
5. The system will automatically fall back to text logo if image fails
6. Ensure the image file size is under 5MB

### Navigation Changes Not Saving

1. Ensure you're logged in as an admin
2. Click "Save Changes" button after making modifications
3. Check the browser console for any error messages
4. Refresh the page to see if changes are applied

### Menu Items Not Appearing

1. Verify that menu items have both label and URL filled
2. Check if the navigation data is properly saved in the database
3. Ensure the content is being loaded correctly from the API

## Future Enhancements

Potential improvements for future versions:

- Drag-and-drop menu item reordering
- Submenu support for nested navigation
- Custom icon upload functionality
- Mobile-specific navigation settings
- A/B testing for different navigation layouts
