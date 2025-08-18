"use client";
import React from "react";
import { useHSBColors } from "@/hooks/useHSBColors";

const DocsPage = () => {
  const { brandGradients, createStyles } = useHSBColors();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Developer
              <span
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                style={createStyles.gradient(brandGradients.primary)}
              >
                {" "}
                Documentation
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12">
              Comprehensive guides, API references, and resources for developers
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="bg-white dark:bg-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Coming Soon
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We're building comprehensive documentation to help you integrate
              with our APIs and services. Our docs will include detailed guides,
              code examples, and best practices.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Get Notified
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Be the first to know when our documentation launches and get
                early access to our developer resources.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What to Expect Section */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our documentation will provide everything you need to build with
              our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Quick Start Guides
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get up and running in minutes with step-by-step tutorials
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                API Reference
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete API documentation with examples and code snippets
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Best Practices
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn industry best practices and optimization techniques
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
