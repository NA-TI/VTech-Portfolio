import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-none">
            404
          </h1>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            Let's get you back on track.
          </p>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/projects"
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
          >
            View Projects
          </Link>
          
          <Link 
            href="/contact"
            className="px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
          >
            Contact Me
          </Link>
        </div>

        {/* Fun Element */}
        <div className="mt-12 text-gray-400 dark:text-gray-600">
          <p className="text-sm">
            "Not all who wander are lost, but this page definitely is." 
            <span className="block mt-2">— J.R.R. Tolkien (probably)</span>
          </p>
        </div>
      </div>
    </div>
  );
} 