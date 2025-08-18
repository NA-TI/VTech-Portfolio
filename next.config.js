/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.unsplash.com",
      "via.placeholder.com",
      "ihwtmbszdcyxqiurifco.supabase.co",
      "zkirioqwnkzjzenhxofy.supabase.co",
    ],
    formats: ["image/webp", "image/avif"],
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
    buildActivityPosition: "bottom-right",
  },

  // Disable experimental features that might cause issues
  experimental: {
    optimizePackageImports: [],
    // Disable turbo temporarily to fix chunk loading issues
    // turbo: {
    //   rules: {
    //     '*.svg': {
    //       loaders: ['@svgr/webpack'],
    //       as: '*.js',
    //     },
    //   },
    // },
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
          __REACT_DEVTOOLS_GLOBAL_HOOK__:
            "({ isDisabled: true, supportsFiber: false, inject: () => {}, onCommitFiberRoot: () => {}, onCommitFiberUnmount: () => {} })",
          "process.env.REACT_DEVTOOLS_GLOBAL_HOOK_DISABLED": "true",
        })
      );
    }

    // Performance optimizations
    if (!isServer) {
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          common: {
            name: "common",
            minChunks: 2,
            chunks: "all",
            priority: 5,
          },
        },
      };
    }

    return config;
  },

  // Security headers - relaxed for development
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      // Allow proper MIME types for Next.js static files
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Prevent caching of content API
      {
        source: "/api/content",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
      // Ensure proper MIME types for JavaScript files
      {
        source: "/_next/static/chunks/(.*).js",
        headers: [
          {
            key: "Content-Type",
            value: "application/javascript; charset=utf-8",
          },
        ],
      },
      // Ensure proper MIME types for CSS files
      {
        source: "/_next/static/(.*).css",
        headers: [
          {
            key: "Content-Type",
            value: "text/css; charset=utf-8",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
module.exports = nextConfig;
