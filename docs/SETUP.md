# 🚀 Portfolio Template Setup Guide

This guide will walk you through setting up your portfolio website step by step.

## 📋 Prerequisites

Before you begin, make sure you have:
- [Node.js](https://nodejs.org/) 18+ installed
- [Git](https://git-scm.com/) installed
- A [Supabase](https://supabase.com/) account (free tier available)
- A code editor (VS Code recommended)

## 🎯 Quick Setup (Automated)

### Step 1: Clone the Template
```bash
git clone <template-repo-url>
cd portfolio-template
```

### Step 2: Run Setup Script
```bash
node scripts/setup.js
```

The setup script will:
- Ask for your personal information
- Guide you through Supabase setup
- Create your `.env.local` file
- Update project files with your info

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Visit Your Portfolio
Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Manual Setup

If you prefer to set up manually, follow these steps:

### Step 1: Clone and Install
```bash
git clone <template-repo-url>
cd portfolio-template
npm install
```

### Step 2: Set up Supabase

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/Login and create a new project
   - Choose a name for your project
   - Set a database password
   - Choose a region close to you

2. **Get Your Credentials**
   - Go to Project Settings > API
   - Copy your project URL
   - Copy your anon key
   - Copy your service role key

3. **Set up Database Schema**
   - Go to SQL Editor in your Supabase dashboard
   - Copy and paste the contents of `sql/schema.sql`
   - Click "Run" to execute

4. **Insert Sample Data**
   - In SQL Editor, copy and paste `sql/sample-data.sql`
   - Click "Run" to insert sample data

### Step 3: Configure Environment

1. **Copy Environment Template**
   ```bash
   cp env.example .env.local
   ```

2. **Edit Environment Variables**
   ```bash
   # Edit .env.local with your information
   nano .env.local
   ```

   Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

### Step 4: Customize Your Information

1. **Edit Personal Info**
   ```bash
   # Edit src/config/personal-info.ts
   nano src/config/personal-info.ts
   ```

2. **Update Database Profile**
   - Go to your Supabase dashboard
   - Navigate to Table Editor > profiles
   - Edit the sample profile with your information

### Step 5: Start Development
```bash
npm run dev
```

## 🎨 Customization

### Personal Information
Edit `src/config/personal-info.ts` to update:
- Your name and title
- Bio description
- Social media links
- Skills and expertise

### Profile Image
1. Add your profile image to `public/avatar.jpg`
2. Or update the avatar path in the config file

### Projects
1. Go to your Supabase dashboard
2. Navigate to Table Editor > projects
3. Add your projects or edit the sample ones
4. Upload project images to your public folder

### Skills
1. Go to Table Editor > skills
2. Edit the sample skills or add your own
3. Update descriptions and proficiency levels

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with database included
- **DigitalOcean**: App Platform deployment

## 🔐 Admin Panel

Access your admin panel at `/admin`:
- Username: `admin`
- Password: `admin123` (change this in production)

## 📧 Contact Form

The contact form is automatically set up. To enable email notifications:
1. Get a Resend API key from [resend.com](https://resend.com)
2. Add it to your `.env.local` file
3. Set your `FROM_EMAIL` in the environment variables

## 🛠️ Troubleshooting

### Common Issues

**Database Connection Error**
- Check your Supabase credentials in `.env.local`
- Verify your Supabase project is active
- Ensure you've run the SQL schema scripts

**Build Errors**
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run lint`
- Verify all environment variables are set

**Admin Panel Not Working**
- Check your admin credentials in `.env.local`
- Ensure JWT_SECRET is set
- Verify Supabase authentication is enabled

### Getting Help

1. Check the [Database Setup Guide](DATABASE_SETUP.md)
2. Review the [Deployment Guide](DEPLOYMENT.md)
3. Check the [Customization Guide](CUSTOMIZATION.md)

## 🎉 Next Steps

After setup:
1. **Customize your content** - Update projects, skills, and bio
2. **Add your images** - Upload project images and avatar
3. **Deploy your portfolio** - Choose a hosting platform
4. **Set up custom domain** - Point your domain to your deployment
5. **Enable analytics** - Add Google Analytics tracking

---

**Need help?** Check the other documentation files or create an issue in the repository. 