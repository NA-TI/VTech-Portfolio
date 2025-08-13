"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFooterContent } from "@/hooks/useContent";

const GitHubIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const TwitterIcon = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);



const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  // Get footer content from CMS
  const { content: footerContent, company: companyContent, isLoading, isMounted: cmsIsMounted } = useFooterContent();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-slate-800 to-cyan-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isMounted && cmsIsMounted && companyContent?.name ? companyContent.name : "VTech Solutions"}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                {isMounted && cmsIsMounted && footerContent?.description ? footerContent.description : "Building scalable software solutions that drive business growth. From web applications to cloud infrastructure, we deliver technology that works."}
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/vtech-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="GitHub"
                >
                  <GitHubIcon />
                </a>
                <a
                  href="https://linkedin.com/company/vtech-solutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://twitter.com/vtechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/case-studies"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Case Studies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/docs"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/support"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()} {isMounted && cmsIsMounted && footerContent?.copyright ? footerContent.copyright : (isMounted && companyContent?.name ? `${companyContent.name}. All rights reserved.` : "VTech Software Solutions. All rights reserved.")}
            </p>
            <div className="flex items-center space-x-6">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Built with Next.js
              </span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Hosted on Vercel
              </span>
              {isMounted && (
                <>
                  <span className="text-gray-300 dark:text-gray-600">•</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 