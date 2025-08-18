"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useFooterContent, useNavigationContent } from "@/hooks/useContent";
import { useHSBColors } from "@/hooks/useHSBColors";
import { companyInfo } from "@/config/company-info";

// --- Icons ---
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <GitHubIcon />;
    case "linkedin":
      return <LinkedInIcon />;
    case "twitter":
      return <TwitterIcon />;
    default:
      return null;
  }
};

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Get footer content from CMS
  const {
    content: footerContent,
    company: companyContent,
    isLoading,
    isMounted: cmsIsMounted,
  } = useFooterContent();
  const { content: navigationContent, isMounted: navIsMounted } =
    useNavigationContent();

  const { brandGradients, createStyles } = useHSBColors();

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
                {navIsMounted && navigationContent?.logoImage ? (
                  <img
                    src={navigationContent.logoImage}
                    alt={navigationContent?.brand || "Brand"}
                    className="w-8 h-8 rounded-full object-cover border border-gray-300 dark:border-gray-700 mr-3"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback =
                        (e.currentTarget.nextSibling as HTMLElement) || null;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${navIsMounted && navigationContent?.logoImage ? "hidden" : ""}`}
                  style={createStyles.gradient(brandGradients.secondary)}
                >
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isMounted &&
                  cmsIsMounted &&
                  (companyContent?.name || navigationContent?.brand)
                    ? companyContent?.name || navigationContent?.brand
                    : "VTech Solutions"}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                {isMounted && cmsIsMounted && footerContent?.description
                  ? footerContent.description
                  : "Building scalable software solutions that drive business growth. From web applications to cloud infrastructure, we deliver technology that works."}
              </p>
              <div className="flex space-x-4">
                {isMounted &&
                  cmsIsMounted &&
                  footerContent?.social &&
                  footerContent.social.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                {/* Fallback social links if CMS data is not available */}
                {(!isMounted || !cmsIsMounted || !footerContent?.social) && (
                  <>
                    <a
                      href={companyInfo.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <GitHubIcon />
                    </a>
                    <a
                      href={companyInfo.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <LinkedInIcon />
                    </a>
                    <a
                      href={companyInfo.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                      <TwitterIcon />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Dynamic Footer Columns */}
            {isMounted &&
              cmsIsMounted &&
              footerContent?.columns &&
              footerContent.columns.map((column, columnIndex) => (
                <div key={columnIndex}>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    {column.title}
                  </h3>
                  <ul className="space-y-3">
                    {column.links &&
                      column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}

            {/* Fallback columns if CMS data is not available */}
            {(!isMounted || !cmsIsMounted || !footerContent?.columns) && (
              <>
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
              </>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              &copy; {new Date().getFullYear()}{" "}
              {isMounted && cmsIsMounted && footerContent?.copyright
                ? footerContent.copyright
                : isMounted && companyContent?.name
                  ? `${companyContent.name}. All rights reserved.`
                  : "VTech Software Solutions. All rights reserved."}
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
