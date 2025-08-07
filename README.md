# 🎨 Modern Portfolio Template

A beautiful, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. Features a modern design with database integration, admin panel, and smooth animations.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional design with dark mode support
- 📱 **Fully Responsive** - Mobile-first approach with perfect responsiveness
- ⚡ **Next.js 15** - Built with the latest Next.js for optimal performance
- 🗄️ **Database Integration** - Supabase backend with real-time data
- 🔐 **Admin Panel** - Manage your portfolio content easily
- 📧 **Contact Form** - Integrated contact form with email notifications
- 🎯 **SEO Optimized** - Meta tags, sitemap, and robots.txt included
- 🌙 **Dark Mode** - Automatic dark mode support
- 🎭 **Smooth Animations** - Framer Motion animations throughout
- ♿ **Accessible** - WCAG compliant design

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

1. **Clone this template**
   ```bash
   git clone <template-repo-url>
   cd portfolio-template
   ```

2. **Run the setup script**
   ```bash
   node scripts/setup.js
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Visit your portfolio**
   Open [http://localhost:3000](http://localhost:3000)

### Option 2: Manual Setup

1. **Clone and install**
   ```bash
   git clone <template-repo-url>
   cd portfolio-template
   npm install
   ```

2. **Set up Supabase**
   - Create a Supabase project at [supabase.com](https://supabase.com)
   - Get your project URL and API keys
   - Run the SQL scripts in `sql/schema.sql` and `sql/sample-data.sql`

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Customize your information**
   - Edit `src/config/personal-info.ts`
   - Update your profile in the Supabase dashboard
   - Add your projects and skills

## 📋 Setup Requirements

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git
- Supabase account (free tier available)

### Environment Variables
Create a `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=your_google_analytics_id

# Email Configuration (optional)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=your_email@domain.com

# Admin Configuration
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_password
JWT_SECRET=your_jwt_secret

# Google Site Verification (optional)
GOOGLE_SITE_VERIFICATION=your_verification_code
```

## 🗄️ Database Setup

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login and create a new project
3. Choose a name for your project
4. Set a database password
5. Choose a region close to you

### 2. Set up Database Schema
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `sql/schema.sql`
4. Click "Run" to execute the schema

### 3. Insert Sample Data
1. In the SQL Editor, copy and paste the contents of `sql/sample-data.sql`
2. Click "Run" to insert sample data

### 4. Update Your Information
1. Go to Table Editor > profiles
2. Edit the sample profile with your information
3. Update name, title, bio, email, location, and social links

## 🎨 Customization

### Personal Information
Edit `src/config/personal-info.ts` to update:
- Your name and title
- Bio description
- Social media links
- Skills and expertise

### Styling
- All styles use Tailwind CSS classes
- Customize colors in `tailwind.config.js`
- Modify animations in components

### Content Management
- **Admin Panel**: Visit `/admin` to manage content
- **Database**: Use Supabase dashboard for direct data management
- **Projects**: Add your projects through the admin panel or database

## 📁 Project Structure

```
portfolio-template/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── config/             # Configuration files
├── public/                 # Static assets
├── scripts/                # Setup and utility scripts
├── sql/                    # Database schema and sample data
├── docs/                   # Documentation
└── docs/                   # Documentation
```

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Connect GitHub repository
- **Railway**: Deploy with database included
- **DigitalOcean**: App Platform deployment

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
```

### Database Management
- **Admin Panel**: `/admin` - Manage content through web interface
- **Supabase Dashboard**: Direct database management
- **API Routes**: `/api/*` - Custom API endpoints

## 📚 Documentation

- [Setup Guide](docs/SETUP.md) - Detailed setup instructions
- [Database Setup](docs/DATABASE_SETUP.md) - Database configuration
- [Deployment Guide](docs/DEPLOYMENT.md) - Deployment instructions
- [Customization Guide](docs/CUSTOMIZATION.md) - How to customize

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database powered by [Supabase](https://supabase.com/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

**Made with ❤️ for creators and developers** 