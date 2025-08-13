"use client";
import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Enhanced Icons
const DashboardIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const MessagesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const MediaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const SettingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
);

const ContentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType;
  badge?: number;
  color?: string;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/admin', icon: DashboardIcon },
  { name: 'Projects', href: '/admin/projects', icon: ProjectsIcon },
  { name: 'Skills', href: '/admin/skills', icon: SkillsIcon },
  { name: 'Profile', href: '/admin/profile', icon: ProfileIcon },
  { name: 'Messages', href: '/admin/messages', icon: MessagesIcon, badge: 3 },
  { name: 'Content', href: '/admin/content', icon: ContentIcon },
  { name: 'Media', href: '/admin/media', icon: MediaIcon },
  { name: 'Settings', href: '/admin/settings', icon: SettingsIcon },
];

interface AdminSidebarProps {
  collapsed: boolean;
  onCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({ 
  collapsed, 
  onCollapse, 
  mobileOpen, 
  onMobileClose 
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Get user info
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/verify', {
          credentials: 'include'
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        toast.success('Logged out successfully');
        router.push('/admin/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Something went wrong');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sidebarVariants = {
    expanded: { width: '16rem' },
    collapsed: { width: '5rem' }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        animate={collapsed ? 'collapsed' : 'expanded'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 z-50 h-full bg-white dark:bg-gray-900 shadow-2xl border-r border-gray-200 dark:border-gray-700 flex flex-col ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center space-x-3"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {user?.username?.[0]?.toUpperCase() || 'A'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white text-sm">
                      {user?.username || 'Admin'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Administrator
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={onCollapse}
              className="p-2 rounded-lg hover:bg-gray-100 hover:shadow-sm dark:hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-slate-500/20 transition-all duration-200 hidden lg:block"
              aria-label="Toggle sidebar"
            >
              <motion.div
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeftIcon />
              </motion.div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            const currentSegment = (pathname.split('/')[2] || '');
            const itemSegment = (item.href.split('/')[2] || '');
            const isActive = item.href === '/admin' ? currentSegment === '' : currentSegment === itemSegment;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(item.href);
                    if (mobileOpen) onMobileClose();
                  }}
                  className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? 'bg-slate-800 dark:bg-slate-700 text-white shadow-sm border-l-4 border-slate-600'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  title={collapsed ? item.name : undefined}
                >
                  {/* Active indicator removed to avoid visual glitch; use ring highlight instead */}

                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                    <Icon />
                  </div>

                  <AnimatePresence>
                    {!collapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="flex items-center justify-between flex-1 overflow-hidden"
                      >
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full font-bold ${
                            isActive 
                              ? 'bg-white/20 text-white' 
                              : 'bg-slate-600 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Collapsed badge */}
                  {collapsed && item.badge && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-slate-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                      {item.badge}
                    </div>
                  )}
                </a>
              </motion.div>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-1">
            {/* View Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20 rounded-lg transition-all duration-200 text-sm"
              title={collapsed ? 'View Site' : undefined}
            >
              <HomeIcon />
              {!collapsed && <span>View Site</span>}
            </a>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50/50 dark:hover:bg-red-900/20 hover:text-red-700 dark:hover:text-red-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 rounded-lg transition-all duration-200 text-sm disabled:opacity-50"
              title={collapsed ? 'Logout' : undefined}
            >
              <LogoutIcon />
              {!collapsed && (
                <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
              )}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
}

