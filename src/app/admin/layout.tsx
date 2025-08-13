"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import AdminSidebar from '@/components/AdminSidebar';

// Icons
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          // Redirect to login if not on login page
          if (pathname !== '/admin/login') {
            router.push('/admin/login');
            return;
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
          return;
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // If we're on the login page, just render children
  if (pathname === '/admin/login') {
    return (
      <>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#374151',
              color: '#fff',
            },
          }}
        />
        {children}
      </>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render anything (redirect will happen)
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#374151',
            color: '#fff',
          },
        }}
      />

      {/* Sidebar */}
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(prev => !prev)}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className={`flex-1 min-h-screen transition-[margin] duration-300 ease-out ${
        sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
      } ml-0 flex flex-col`}>
        
        {/* Top Navigation Bar */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 shadow-sm"
        >
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all duration-200"
                aria-label="Open sidebar"
              >
                <MenuIcon />
              </button>

              {/* Search Bar */}
              <div className="hidden sm:block relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 focus:border-slate-300 dark:focus:border-slate-600 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-200"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-700 dark:focus:text-gray-300 transition-colors duration-200"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all duration-200">
                <BellIcon />
                {/* subtle badge */}
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-white dark:ring-gray-900"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.username || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Administrator
                  </p>
                </div>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {user?.username?.[0]?.toUpperCase() || 'A'}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 sm:p-6 lg:p-8"
          >
            <div className="max-w-full">
              {children}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                © 2024 VTech Portfolio. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Version 2.0</span>
                <span>•</span>
                <span>Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

