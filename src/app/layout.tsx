import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import ClientCustomCursor from "@/components/ClientCustomCursor";



export const metadata: Metadata = {
  title: {
    default: "NA-TI ናቲ - Creative Designer & Developer",
    template: "%s | NA-TI ናቲ Portfolio"
  },
  description: "Creative designer and developer specializing in web development, graphics design, and 3D visualization. Creating digital solutions that captivate and convert.",
  keywords: [
    "portfolio", "creative designer", "web developer", "graphics design", "3D visualization",
    "UI/UX designer", "frontend developer", "digital designer", "creative development",
    "web design", "product design", "branding", "visual identity", "NA-TI", "ናቲ"
  ],
  authors: [{ name: "NA-TI ናቲ", url: "https://nati.com" }],
  creator: "NA-TI ናቲ",
  publisher: "NA-TI ናቲ",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://na-ti-portfolio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://na-ti-portfolio.vercel.app',
    title: 'NA-TI ናቲ - Creative Designer & Developer',
    description: 'Creative designer and developer specializing in web development, graphics design, and 3D visualization. Creating digital solutions that captivate and convert.',
    siteName: 'NA-TI ናቲ Portfolio',
    images: [
      {
        url: 'https://opengraph.b-cdn.net/production/images/81ef657c-a048-46f2-81a1-87cbd15caaa4.png?token=jchhvHlDlyduV2Hx8HNe-MmypliVI3z-ckWqyRfPxao&height=792&width=1200&expires=33290012733',
        width: 1200,
        height: 792,
        alt: 'NA-TI ናቲ - Creative Designer & Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NA-TI ናቲ - Creative Designer & Developer',
    description: 'Creative designer and developer specializing in web development, graphics design, and 3D visualization. Creating digital solutions that captivate and convert.',
    images: ['https://opengraph.b-cdn.net/production/images/81ef657c-a048-46f2-81a1-87cbd15caaa4.png?token=jchhvHlDlyduV2Hx8HNe-MmypliVI3z-ckWqyRfPxao&height=792&width=1200&expires=33290012733'],
    creator: '@nati',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-profile.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        <link rel="dns-prefetch" href="//ihwtmbszdcyxqiurifco.supabase.co" />
        <link rel="preload" href="/manifest.json" as="application/manifest" />
        <link rel="preload" href="/og-image.jpg" as="image" />
        
        {/* Critical CSS inlining */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            .hero-card { 
              background: rgba(255, 255, 255, 0.8); 
              backdrop-filter: blur(20px);
              border-radius: 1rem;
              box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            }
            .dark .hero-card { 
              background: rgba(0, 0, 0, 0.8); 
            }
            .gradient-text {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .animate-fade-in {
              animation: fadeIn 0.5s ease-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `
        }} />
        
        {/* Preload critical resources */}
        <link rel="modulepreload" href="/_next/static/chunks/pages/index.js" />
        
        {/* Prevent FOUC (Flash of Unstyled Content) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
              
              
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Skip to content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Skip to main content
        </a>
        
        {/* Loading indicator */}
        <div id="loading-indicator" className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 origin-left transition-transform duration-300 ease-out"></div>
        
        <ErrorBoundary>
          <ClientCustomCursor />
          <Navigation />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
        </ErrorBoundary>
        
        {/* Analytics placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor Core Web Vitals
              if ('performance' in window) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const navigation = performance.getEntriesByType('navigation')[0];
                    if (navigation) {
                      console.log('Page Load Time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
                    }
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}