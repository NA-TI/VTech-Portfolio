'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl mb-4">
            ⚠️
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-4">
            Something went wrong!
          </h1>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto">
            We encountered an unexpected error. Don't worry, our team has been notified 
            and we're working to fix it.
          </p>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <summary className="cursor-pointer font-medium text-red-700 dark:text-red-300">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-sm text-red-600 dark:text-red-400 overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={reset}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
          
          <Link 
            href="/"
            className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300"
          >
            Back to Home
          </Link>
          
          <Link 
            href="/contact"
            className="px-8 py-4 bg-white/20 dark:bg-black/20 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-white/30 dark:hover:bg-black/30 transition-all duration-300"
          >
            Report Issue
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-gray-400 dark:text-gray-600">
          <p className="text-sm">
            Error ID: {error.digest || 'Unknown'}
          </p>
        </div>
      </div>
    </div>
  );
} 