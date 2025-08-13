"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

// Enhanced Icons
const TrendingUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
);

const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const SkillsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const MessagesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ViewsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/>
    <path d="m12 5 7 7-7 7"/>
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  views: number;
  weeklyViews: number[];
  monthlyGrowth: number;
  recentActivity: ActivityItem[];
}

interface ActivityItem {
  id: string;
  type: 'project' | 'message' | 'skill' | 'view';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ComponentType;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    messages: 0,
    views: 0,
    weeklyViews: [120, 190, 300, 500, 200, 300, 450],
    monthlyGrowth: 15.3,
    recentActivity: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch data from multiple endpoints
      const [projectsRes, skillsRes, messagesRes] = await Promise.all([
        fetch('/api/projects', { credentials: 'include' }),
        fetch('/api/skills', { credentials: 'include' }),
        fetch('/api/contact', { credentials: 'include' })
      ]);

      const getJsonSafely = async (res: Response, label: string) => {
        if (!res.ok) {
          console.warn(`${label} fetch failed: ${res.status}`);
          return { data: [] };
        }
        return res.json();
      };

      const [projects, skills, messages] = await Promise.all([
        getJsonSafely(projectsRes, 'Projects'),
        getJsonSafely(skillsRes, 'Skills'),
        getJsonSafely(messagesRes, 'Messages')
      ]);

      // Generate recent activity
      const recentActivity: ActivityItem[] = [
        {
          id: '1',
          type: 'message',
          title: 'New Contact Message',
          description: 'Someone inquired about web development services',
          timestamp: '2 hours ago',
          icon: MessagesIcon,
          color: 'text-blue-500'
        },
        {
          id: '2',
          type: 'project',
          title: 'Project Updated',
          description: 'E-commerce Website project was modified',
          timestamp: '4 hours ago',
          icon: ProjectsIcon,
          color: 'text-green-500'
        },
        {
          id: '3',
          type: 'view',
          title: 'High Traffic Day',
          description: 'Portfolio received 150+ views today',
          timestamp: '6 hours ago',
          icon: ViewsIcon,
          color: 'text-purple-500'
        },
        {
          id: '4',
          type: 'skill',
          title: 'Skill Added',
          description: 'Added new React.js skill to portfolio',
          timestamp: '1 day ago',
          icon: SkillsIcon,
          color: 'text-orange-500'
        }
      ];

      setStats({
        projects: projects.data?.length || 0,
        skills: skills.data?.length || 0,
        messages: messages.data?.length || 0,
        views: 1247, // Fixed value to avoid hydration mismatch
        weeklyViews: [120, 190, 300, 500, 200, 300, 450],
        monthlyGrowth: 15.3,
        recentActivity
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: ProjectsIcon,
      color: 'from-blue-500 to-cyan-500',
      href: '/admin/projects',
      trend: '+12%',
      description: 'Active portfolio projects'
    },
    {
      title: 'Skills & Services',
      value: stats.skills,
      icon: SkillsIcon,
      color: 'from-purple-500 to-pink-500',
      href: '/admin/skills',
      trend: '+8%',
      description: 'Technical competencies'
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessagesIcon,
      color: 'from-green-500 to-emerald-500',
      href: '/admin/messages',
      trend: 'New',
      description: 'Contact inquiries'
    },
    {
      title: 'Portfolio Views',
      value: stats.views,
      icon: ViewsIcon,
      color: 'from-orange-500 to-red-500',
      href: '#',
      trend: `+${stats.monthlyGrowth}%`,
      description: 'Monthly visitors'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Showcase your latest work',
      href: '/admin/projects/new',
      color: 'from-blue-500 to-purple-500',
      icon: ProjectsIcon
    },
    {
      title: 'Update Profile',
      description: 'Edit personal information',
      href: '/admin/profile',
      color: 'from-green-500 to-blue-500',
      icon: SkillsIcon
    },
    {
      title: 'View Messages',
      description: 'Check recent inquiries',
      href: '/admin/messages',
      color: 'from-purple-500 to-pink-500',
      icon: MessagesIcon
    },
    {
      title: 'Upload Media',
      description: 'Manage images and files',
      href: '/admin/media',
      color: 'from-orange-500 to-red-500',
      icon: ViewsIcon
    }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load dashboard
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchDashboardData}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href={card.href}>
                <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {card.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {card.value.toLocaleString()}
                        </p>
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} shadow-lg`}>
                        <Icon />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      {card.description}
                    </p>

                    {/* Trend */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <TrendingUpIcon />
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                          {card.trend}
                        </span>
                      </div>
                      <ArrowRightIcon />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Traffic
            </h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <CalendarIcon />
              <span>Last 7 days</span>
            </div>
          </div>

          {/* Chart */}
          <div className="relative">
            <div className="flex items-end justify-between h-32 space-x-2 mb-4">
              {stats.weeklyViews.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / Math.max(...stats.weeklyViews)) * 100}%` }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-t min-h-[4px] relative group cursor-pointer"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded">
                    {value}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Days */}
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {stats.weeklyViews.reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Average</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {Math.round(stats.weeklyViews.reduce((a, b) => a + b, 0) / 7)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">Growth</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                +{stats.monthlyGrowth}%
              </p>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Link
              href="/admin/activity"
              className="text-sm text-blue-500 hover:text-blue-600 font-medium"
            >
              View all
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${activity.color}`}>
                    <Icon />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {activity.description}
                    </p>
                    <div className="flex items-center mt-1 text-xs text-gray-400">
                      <ClockIcon />
                      <span className="ml-1">{activity.timestamp}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group"
              >
                <Link href={action.href}>
                  <div className="relative p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative z-10 text-center">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${action.color} text-white mb-3 shadow-lg`}>
                        <Icon />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {action.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}

