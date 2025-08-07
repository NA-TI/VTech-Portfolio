/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'ihwtmbszdcyxqiurifco.supabase.co'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Completely disable all devtools and indicators
  devIndicators: {
    buildActivity: false,
    buildActivityPosition: 'bottom-right',
  },
  
  // Disable experimental features that might cause issues
  experimental: {
    optimizePackageImports: [],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Modern JavaScript target
  swcMinify: true,
  
  // Performance optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // Only disable devtools in development, keep HMR working
    if (dev && !isServer) {
      // Add custom plugin to disable React DevTools only
      config.plugins.push(
        new webpack.DefinePlugin({
          '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true, supportsFiber: false, inject: () => {}, onCommitFiberRoot: () => {}, onCommitFiberUnmount: () => {} })',
          'process.env.REACT_DEVTOOLS_GLOBAL_HOOK_DISABLED': 'true',
        })
      );
    }
    
    // Performance optimizations
    if (!isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      };
    }
    
    return config;
  },
  

  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 