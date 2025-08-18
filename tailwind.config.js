/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Creato Display",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
        heading: [
          "Creato Display",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
        display: [
          "Creato Display",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        // HSB-Enhanced VTech Brand Colors
        // Based on your current slate-800, cyan-500, orange-500 system
        vtech: {
          // Slate variations (Hue: 220°, your current slate-800)
          slate: {
            50: "hsl(220, 8%, 98%)",
            100: "hsl(220, 10%, 95%)",
            200: "hsl(220, 12%, 90%)",
            300: "hsl(220, 15%, 80%)",
            400: "hsl(220, 20%, 70%)",
            500: "hsl(220, 25%, 60%)",
            600: "hsl(220, 30%, 50%)",
            700: "hsl(220, 35%, 40%)",
            800: "hsl(220, 40%, 30%)", // Your current slate-800
            900: "hsl(220, 45%, 20%)",
          },

          // Cyan variations (Hue: 190°, your current cyan-500)
          cyan: {
            50: "hsl(190, 10%, 98%)",
            100: "hsl(190, 15%, 95%)",
            200: "hsl(190, 20%, 90%)",
            300: "hsl(190, 25%, 80%)",
            400: "hsl(190, 30%, 70%)",
            500: "hsl(190, 60%, 50%)", // Your current cyan-500
            600: "hsl(190, 70%, 40%)", // Richer dark version
            700: "hsl(190, 80%, 30%)",
            800: "hsl(190, 85%, 20%)",
            900: "hsl(190, 90%, 10%)",
          },

          // Purple variations (Hue: 260°, modern tech accent)
          purple: {
            50: "hsl(260, 10%, 98%)",
            100: "hsl(260, 15%, 95%)",
            200: "hsl(260, 20%, 90%)",
            300: "hsl(260, 25%, 80%)",
            400: "hsl(260, 30%, 70%)",
            500: "hsl(260, 60%, 50%)", // Modern tech purple
            600: "hsl(260, 70%, 40%)", // Richer dark version
            700: "hsl(260, 80%, 30%)",
            800: "hsl(260, 85%, 20%)",
            900: "hsl(260, 90%, 10%)",
          },

          // Teal variations (Hue: 180°, sophisticated accent)
          teal: {
            50: "hsl(180, 10%, 98%)",
            100: "hsl(180, 15%, 95%)",
            200: "hsl(180, 20%, 90%)",
            300: "hsl(180, 25%, 80%)",
            400: "hsl(180, 30%, 70%)",
            500: "hsl(180, 60%, 50%)", // Sophisticated teal
            600: "hsl(180, 70%, 40%)", // Richer dark version
            700: "hsl(180, 80%, 30%)",
            800: "hsl(180, 85%, 20%)",
            900: "hsl(180, 90%, 10%)",
          },

          // Keep orange for backward compatibility but deprecate
          orange: {
            50: "hsl(30, 10%, 98%)",
            100: "hsl(30, 15%, 95%)",
            200: "hsl(30, 20%, 90%)",
            300: "hsl(30, 25%, 80%)",
            400: "hsl(30, 30%, 70%)",
            500: "hsl(30, 70%, 50%)", // Deprecated - use purple or teal instead
            600: "hsl(30, 80%, 40%)",
            700: "hsl(30, 85%, 30%)",
            800: "hsl(30, 90%, 20%)",
            900: "hsl(30, 95%, 10%)",
          },

          // HSB-optimized gradients
          gradients: {
            primary:
              "linear-gradient(135deg, hsl(220, 40%, 30%) 0%, hsl(190, 60%, 50%) 100%)",
            brand:
              "linear-gradient(135deg, hsl(220, 40%, 30%) 0%, hsl(190, 60%, 50%) 50%, hsl(260, 60%, 50%) 100%)",
            accent:
              "linear-gradient(135deg, hsl(190, 60%, 50%) 0%, hsl(260, 60%, 50%) 100%)",
            tech: "linear-gradient(135deg, hsl(220, 40%, 30%) 0%, hsl(260, 60%, 50%) 100%)",
            subtle:
              "linear-gradient(135deg, hsl(220, 8%, 98%) 0%, hsl(190, 10%, 95%) 100%)",
            dark: "linear-gradient(135deg, hsl(220, 45%, 20%) 0%, hsl(190, 80%, 30%) 100%)",
            modern:
              "linear-gradient(135deg, hsl(220, 40%, 30%) 0%, hsl(180, 60%, 50%) 100%)",
          },

          // Simple VTech color names for database compatibility
          "vtech-cyan": "hsl(190, 60%, 50%)",
          "vtech-purple": "hsl(260, 60%, 50%)",
          "vtech-green": "hsl(180, 60%, 50%)",
          "vtech-orange": "hsl(30, 70%, 50%)",
          "vtech-blue": "hsl(220, 60%, 50%)",
          "vtech-red": "hsl(0, 70%, 50%)",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
