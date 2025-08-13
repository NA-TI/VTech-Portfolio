# 🚀 V-Tech Portfolio Deployment Guide

This guide will help you fix the Vercel deployment issues and get your portfolio website live.

## 🔧 Issues Fixed

1. ✅ **Dynamic Server Usage Warnings** - Fixed by adding `export const dynamic = 'force-dynamic'` to all API routes
2. ✅ **Build Configuration** - Verified Next.js build works correctly
3. ✅ **API Route Configuration** - All routes now properly configured for server-side rendering

## 📋 Prerequisites

- [Vercel Account](https://vercel.com)
- [Supabase Account](https://supabase.com)
- [GitHub Repository](https://github.com) (optional, for automatic deployments)

## 🗄️ Step 1: Set up Supabase Database

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and API keys

### 1.2 Run Database Schema
1. Go to your Supabase dashboard → SQL Editor
2. Copy and paste the contents of `sql/schema.sql`
3. Execute the script to create all tables

### 1.3 Insert Sample Data (Optional)
1. Copy and paste the contents of `sql/sample-data.sql`
2. Execute to populate with sample data

## 🔐 Step 2: Configure Environment Variables

### 2.1 In Vercel Dashboard
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://vt-ech-portfolio.vercel.app
NEXT_PUBLIC_GA_ID=your_google_analytics_id_here

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (Optional - for contact form)
RESEND_API_KEY=your_resend_api_key_here
FROM_EMAIL=your_email@domain.com
```

### 2.2 Get Supabase Credentials
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## 🚀 Step 3: Deploy to Vercel

### 3.1 Connect Repository (if not already connected)
1. Go to [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### 3.2 Deploy
1. Click **Deploy**
2. Wait for the build to complete
3. Your site will be available at the provided URL

## 🔧 Step 4: Verify Deployment

### 4.1 Check Build Logs
- Ensure no errors in the build process
- Verify all API routes are properly configured

### 4.2 Test Functionality
1. **Homepage**: Should load without errors
2. **Admin Panel**: Navigate to `/admin` and login with:
   - Username: `admin`
   - Password: `admin123`
3. **Contact Form**: Test the contact form at `/contact`
4. **API Routes**: Verify all API endpoints work

## 🛠️ Troubleshooting

### Common Issues

#### 1. "Deployment Not Found" Error
- **Cause**: Missing environment variables or build failures
- **Solution**: 
  - Check all environment variables are set in Vercel
  - Verify Supabase credentials are correct
  - Check build logs for errors

#### 2. Database Connection Issues
- **Cause**: Incorrect Supabase credentials
- **Solution**:
  - Double-check `NEXT_PUBLIC_SUPABASE_URL` and API keys
  - Ensure database schema is properly set up
  - Check Supabase project is active

#### 3. Admin Login Issues
- **Cause**: JWT_SECRET not set or incorrect
- **Solution**:
  - Set a strong JWT_SECRET in environment variables
  - Ensure ADMIN_USERNAME and ADMIN_PASSWORD are set

#### 4. Contact Form Not Working
- **Cause**: Missing Resend API key or email configuration
- **Solution**:
  - Set up Resend account and get API key
  - Configure FROM_EMAIL address
  - Or disable email functionality temporarily

### Build Errors
If you encounter build errors:
1. Check the build logs in Vercel dashboard
2. Ensure all dependencies are properly installed
3. Verify TypeScript compilation passes locally

## 🔒 Security Considerations

### Production Checklist
- [ ] Change default admin credentials
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Enable HTTPS (automatic with Vercel)
- [ ] Set up proper CORS policies
- [ ] Configure Supabase Row Level Security
- [ ] Use environment-specific configurations

### Environment Variables Security
- Never commit `.env.local` files to git
- Use Vercel's environment variable encryption
- Rotate API keys regularly
- Use service role keys only for server-side operations

## 📊 Monitoring

### Vercel Analytics
- Enable Vercel Analytics for performance monitoring
- Monitor build times and deployment success rates

### Supabase Monitoring
- Check database performance in Supabase dashboard
- Monitor API usage and limits
- Set up alerts for unusual activity

## 🎯 Next Steps

1. **Customize Content**: Update your portfolio information
2. **Add Projects**: Use the admin panel to add your projects
3. **Configure Domain**: Set up a custom domain in Vercel
4. **SEO Optimization**: Update meta tags and descriptions
5. **Performance**: Optimize images and implement caching

## 📞 Support

If you encounter issues:
1. Check the build logs in Vercel dashboard
2. Verify all environment variables are set correctly
3. Test the application locally first
4. Check Supabase dashboard for database issues

---

**Happy Deploying! 🚀**

Your V-Tech Portfolio should now be live and fully functional on Vercel.
