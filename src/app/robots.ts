import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/test-db/', '/.env*', '/DATABASE_SETUP.md'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
} 