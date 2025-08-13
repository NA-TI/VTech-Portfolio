import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Initialize Supabase client with admin credentials for content management
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// This will store all editable content for the site
interface SiteContent {
  // Homepage
  homepage: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
      primaryButton: string;
      secondaryButton: string;
    };
    services: {
      title: string;
      subtitle: string;
      description: string;
      ctaText: string;
    };
    testimonials: {
      title: string;
      subtitle: string;
    };
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  
  // Company Information
  company: {
    name: string;
    tagline: string;
    bio: string;
    email: string;
    phone: string;
    address: string;
    logo: string;
    available: boolean;
  };
  
  // Navigation
  navigation: {
    brand: string;
    items: Array<{
      label: string;
      href: string;
      icon?: string;
    }>;
  };
  
  // Footer
  footer: {
    description: string;
    copyright: string;
    columns: Array<{
      title: string;
      links: Array<{
        label: string;
        href: string;
      }>;
    }>;
    social: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  
  // About Page
  about: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    sections: Array<{
      title: string;
      content: string;
      image?: string;
    }>;
  };
  
  // Services Page
  services: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    cta: {
      title: string;
      description: string;
      buttonText: string;
    };
  };
  
  // Contact Page
  contact: {
    hero: {
      title: string;
      subtitle: string;
      description: string;
    };
    info: {
      title: string;
      description: string;
    };
  };
  
  // SEO & Meta
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    keywords: string[];
    ogImage: string;
  };
}

// Default content structure
const defaultContent: SiteContent = {
  homepage: {
    hero: {
      title: "Build Software Solutions That Scale",
      subtitle: "Software Development • Cloud Solutions • Digital Innovation",
      description: "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
      primaryButton: "Start Your Project",
      secondaryButton: "View Our Work"
    },
    services: {
      title: "What We Build",
      subtitle: "Comprehensive Development Services",
      description: "From concept to deployment, we handle every aspect of your software development needs.",
      ctaText: "See All Services"
    },
    testimonials: {
      title: "Trusted by Startups",
      subtitle: "What Our Clients Say"
    },
    cta: {
      title: "Ready to Build Your Next Project?",
      description: "Let's discuss how we can help bring your ideas to life with custom software solutions.",
      buttonText: "Get Started Today"
    }
  },
  
  company: {
    name: "VTech Software Solutions",
    tagline: "Building Tomorrow's Software Today",
    bio: "VTech is a technology company building reliable software products and services. We craft modern web and mobile applications, integrate cloud-native solutions, and deliver clean user experiences that help businesses move faster.",
    email: "vtechofficial@gmail.com",
    phone: "+1 (555) 123-4567",
    address: "Addis Ababa, Ethiopia",
    logo: "/window.svg",
    available: true
  },
  
  navigation: {
    brand: "VTech",
    items: [
      { label: "Home", href: "/", icon: "home" },
      { label: "About", href: "/about", icon: "user" },
      { label: "Services", href: "/services", icon: "briefcase" },
      { label: "Projects", href: "/projects", icon: "folder" },
      { label: "Contact", href: "/contact", icon: "mail" }
    ]
  },
  
  footer: {
    description: "Building scalable software solutions that drive business growth. From web applications to cloud infrastructure, we deliver technology that works.",
    copyright: "VTech Software Solutions. All rights reserved.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "Services", href: "/services" },
          { label: "Portfolio", href: "/portfolio" },
          { label: "Pricing", href: "/pricing" },
          { label: "Case Studies", href: "/case-studies" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Blog", href: "/blog" },
          { label: "Contact", href: "/contact" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Documentation", href: "/docs" },
          { label: "Support", href: "/support" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms of Service", href: "/terms" }
        ]
      }
    ],
    social: [
      { platform: "GitHub", url: "https://github.com/vtech-solutions", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/vtech-solutions", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com/vtechsolutions", icon: "twitter" }
    ]
  },
  
  about: {
    hero: {
      title: "We Build Software That Actually Works",
      subtitle: "Our Story",
      description: "Founded with a mission to create reliable, scalable software solutions that help businesses thrive in the digital age."
    },
    sections: [
      {
        title: "Our Mission",
        content: "To deliver high-quality software solutions that solve real business problems and drive growth for our clients."
      },
      {
        title: "Our Approach",
        content: "We combine cutting-edge technology with proven methodologies to create software that's both innovative and reliable."
      }
    ]
  },
  
  services: {
    hero: {
      title: "Software Development Services",
      subtitle: "What We Offer",
      description: "Comprehensive development services from concept to deployment."
    },
    cta: {
      title: "Ready to Start Your Project?",
      description: "Let's discuss how we can help build your next software solution.",
      buttonText: "Get In Touch"
    }
  },
  
  contact: {
    hero: {
      title: "Let's Build Something Great Together",
      subtitle: "Get In Touch",
      description: "Ready to start your project? We'd love to hear about your ideas and discuss how we can help bring them to life."
    },
    info: {
      title: "Get In Touch",
      description: "Ready to start your project? We'd love to hear from you."
    }
  },
  
  seo: {
    defaultTitle: "VTech Software Solutions - Professional Software Development",
    defaultDescription: "VTech builds reliable software products and services. Custom web applications, mobile apps, cloud solutions, and digital innovation.",
    keywords: ["software development", "web development", "mobile apps", "cloud solutions", "custom software"],
    ogImage: "/og-image.jpg"
  }
};

export async function GET(request: NextRequest) {
  try {
    // Allow public access for content (but require auth for admin panel)
    const isAdminRequest = request.headers.get('X-Admin-Request') === 'true';
    
    if (isAdminRequest) {
      const auth = await requireAuth(request);
      if (!auth) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    // Fetch content from database
    const { data: siteContent, error } = await supabaseAdmin
      .from('site_content')
      .select('content_data')
      .eq('content_key', 'main')
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('Database fetch error:', error);
      // Fall back to default content if database fails
      return NextResponse.json({
        success: true,
        data: defaultContent,
        source: 'fallback'
      });
    }

    return NextResponse.json({
      success: true,
      data: siteContent.content_data,
      source: 'database'
    });
  } catch (error) {
    console.error('Content fetch error:', error);
    // Fall back to default content on any error
    return NextResponse.json({
      success: true,
      data: defaultContent,
      source: 'fallback'
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const auth = await requireAuth(request);
    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    
    // Validate the content structure
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid content data' }, { status: 400 });
    }

    // Sanitize and validate content
    const sanitizedContent = sanitizeContent(body);
    
    // Update content in database
    const { data, error } = await supabaseAdmin
      .from('site_content')
      .update({
        content_data: sanitizedContent,
        updated_at: new Date().toISOString(),
        updated_by: auth.username || null,
        version: 1 // For now, we'll increment this manually later
      })
      .eq('content_key', 'main')
      .select()
      .single();

    if (error) {
      console.error('Database update error:', error);
      return NextResponse.json({ 
        error: 'Failed to update content in database',
        details: error.message 
      }, { status: 500 });
    }

    console.log('Content updated successfully in database');
    
    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      data: data.content_data
    });
  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json({ 
      error: 'Failed to update content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper function to sanitize content
function sanitizeContent(content: any): SiteContent {
  // Basic validation and sanitization
  // In a production app, you'd want more robust validation
  try {
    // Ensure all required sections exist
    const sanitized = {
      homepage: content.homepage || defaultContent.homepage,
      company: content.company || defaultContent.company,
      navigation: content.navigation || defaultContent.navigation,
      footer: content.footer || defaultContent.footer,
      about: content.about || defaultContent.about,
      services: content.services || defaultContent.services,
      contact: content.contact || defaultContent.contact,
      seo: content.seo || defaultContent.seo
    };

    return sanitized;
  } catch (error) {
    console.error('Content sanitization error:', error);
    return defaultContent;
  }
}
