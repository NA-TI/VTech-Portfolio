"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigationContent } from "@/hooks/useContent";
import { useHSBColors } from "@/hooks/useHSBColors";

// --- Icons ---
const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { brandGradients, createStyles } = useHSBColors();

  // Get navigation content from CMS
  const {
    content: navigationContent,
    isLoading,
    isMounted,
  } = useNavigationContent();

  // Use CMS data or fallback to default navigation
  const brandName =
    isMounted && navigationContent?.brand ? navigationContent.brand : "VTech";
  const navItems =
    isMounted && navigationContent?.items
      ? navigationContent.items
      : [
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { href: "/skills", label: "Skills" },
          { href: "/portfolio", label: "Work" },
          { href: "/about", label: "Company" },
        ];

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              {navigationContent?.logoImage ? (
                <>
                  {/* Logo Image - Circular and properly sized */}
                  <div className="relative">
                    <img
                      src={navigationContent.logoImage}
                      alt={brandName}
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 shadow-sm"
                      onError={(e) => {
                        // Fallback to text logo if image fails to load
                        e.currentTarget.style.display = "none";
                        const textLogo =
                          e.currentTarget.parentElement?.parentElement?.querySelector(
                            ".text-logo-fallback"
                          );
                        if (textLogo) {
                          textLogo.classList.remove("hidden");
                        }
                      }}
                    />
                  </div>
                  {/* Brand Name - Always visible beside logo */}
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {brandName}
                  </span>
                </>
              ) : (
                /* Text-only logo fallback */
                <div className="flex items-center space-x-2 text-logo-fallback">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={createStyles.gradient(brandGradients.secondary)}
                  >
                    <span className="text-white font-bold text-sm">V</span>
                  </div>
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    {brandName}
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-slate-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-all duration-200"
              >
                Get Started
                <ArrowRightIcon />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Ultra-thin Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-800/50 z-50 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4">
              <div className="space-y-0.5">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        pathname === item.href
                          ? "text-slate-900 dark:text-white bg-gray-100/80 dark:bg-gray-800/80"
                          : "text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-50/80 dark:hover:bg-gray-800/30"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Ultra-thin Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.1 }}
                  className="pt-3"
                >
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-2 w-full px-3 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-all duration-200"
                  >
                    Get Started
                    <ArrowRightIcon />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
