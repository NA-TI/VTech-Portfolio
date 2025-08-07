"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import GhostLoader from '@/components/GhostLoader';

// Enhanced Icons
const ProjectsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
  </svg>
);

const SkillsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

const MessagesIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const ViewsIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
);

const TrendingDownIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="22,17 13.5,8.5 8.5,13.5 2,7"/>
    <polyline points="16,17 22,17 22,11"/>
  </svg>
);

const ClockIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const ActivityIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
  </svg>
);

interface DashboardStats {
  projects: number;
  skills: number;
  messages: number;
  pendingMessages: number;
  views: number;
  lastUpdated: string;
  recentActivity: Array<{
    id: string;
    type: 'project' | 'message' | 'skill' | 'view';
    title: string;
    time: string;
    status: 'success' | 'warning' | 'info';
  }>;
  weeklyViews: number[];
  monthlyGrowth: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    messages: 0,
    pendingMessages: 0,
    views: 0,
    lastUpdated: new Date().toLocaleString(),
    recentActivity: [],
    weeklyViews: [120, 190, 300, 500, 200, 300, 450],
    monthlyGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    fetchDashboardStats();
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [projectsRes, skillsRes, messagesRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/contact')
      ]);

      // Helper to safely parse JSON or throw error
      const getJsonOrThrow = async (res: Response, label: string) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`${label} fetch failed: ${res.status} - ${text}`);
        }
        return res.json();
      };

      const projects = await getJsonOrThrow(projectsRes, 'Projects');
      const skills = await getJsonOrThrow(skillsRes, 'Skills');
      const messages = await getJsonOrThrow(messagesRes, 'Messages');

      // Calculate pending messages
      const pendingMessages = messages.data?.filter((msg: any) => msg.status === 'pending').length || 0;

      // Generate mock recent activity
      const recentActivity = [
        {
          id: '1',
          type: 'message' as const,
          title: 'New contact message from John Doe',
          time: '2 minutes ago',
          status: 'warning' as const
        },
        {
          id: '2',
          type: 'project' as const,
          title: 'Updated "E-commerce Platform" project',
          time: '1 hour ago',
          status: 'success' as const
        },
        {
          id: '3',
          type: 'view' as const,
          title: 'Portfolio viewed from LinkedIn',
          time: '3 hours ago',
          status: 'info' as const
        },
        {
          id: '4',
          type: 'skill' as const,
          title: 'Added new skill: "React Native"',
          time: '1 day ago',
          status: 'success' as const
        }
      ];

      setStats({
        projects: projects.data?.length || 0,
        skills: skills.data?.length || 0,
        messages: messages.data?.length || 0,
        pendingMessages,
        views: Math.floor(Math.random() * 1000) + 500,
        lastUpdated: new Date().toLocaleString(),
        recentActivity,
        weeklyViews: [120, 190, 300, 500, 200, 300, 450],
        monthlyGrowth: 15.3
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setError('Failed to load dashboard data');
      // Fallback to mock data
      setStats({
        projects: 3,
        skills: 3,
        messages: 0,
        pendingMessages: 0,
        views: 847,
        lastUpdated: new Date().toLocaleString(),
        recentActivity: [],
        weeklyViews: [120, 190, 300, 500, 200, 300, 450],
        monthlyGrowth: 15.3
      });
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: ProjectsIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      href: '/admin/projects',
      trend: stats.projects > 0 ? '+12%' : '0%',
      trendDirection: 'up' as const,
      description: 'Portfolio projects'
    },
    {
      title: 'Skills & Services',
      value: stats.skills,
      icon: SkillsIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      textColor: 'text-purple-600 dark:text-purple-400',
      href: '/admin/skills',
      trend: stats.skills > 0 ? '+8%' : '0%',
      trendDirection: 'up' as const,
      description: 'Professional skills'
    },
    {
      title: 'Contact Messages',
      value: stats.messages,
      icon: MessagesIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      textColor: 'text-green-600 dark:text-green-400',
      href: '/admin/messages',
      trend: stats.pendingMessages > 0 ? `${stats.pendingMessages} pending` : 'All caught up',
      trendDirection: stats.pendingMessages > 0 ? 'up' as const : 'neutral' as const,
      description: 'Incoming inquiries'
    },
    {
      title: 'Portfolio Views',
      value: stats.views,
      icon: ViewsIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      textColor: 'text-orange-600 dark:text-orange-400',
      href: '#',
      trend: `+${stats.monthlyGrowth}%`,
      trendDirection: 'up' as const,
      description: 'This month'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Project',
      description: 'Create a new portfolio project',
      href: '/admin/projects/new',
      color: 'from-blue-500 to-purple-500',
      icon: ProjectsIcon,
      badge: 'New'
    },
    {
      title: 'Update Profile',
      description: 'Edit your personal information',
      href: '/admin/profile',
      color: 'from-green-500 to-blue-500',
      icon: SkillsIcon
    },
    {
      title: 'View Messages',
      description: `Check ${stats.pendingMessages} pending messages`,
      href: '/admin/messages',
      color: 'from-purple-500 to-pink-500',
      icon: MessagesIcon,
      badge: stats.pendingMessages > 0 ? `${stats.pendingMessages}` : undefined
    },
    {
      title: 'Manage Skills',
      description: 'Update your skills and services',
      href: '/admin/skills',
      color: 'from-orange-500 to-red-500',
      icon: SkillsIcon
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'warning': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'info': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return <ProjectsIcon className="w-4 h-4" />;
      case 'message': return <MessagesIcon className="w-4 h-4" />;
      case 'skill': return <SkillsIcon className="w-4 h-4" />;
      case 'view': return <ViewsIcon className="w-4 h-4" />;
      default: return <ActivityIcon className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <GhostLoader size="xl" variant="glow" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 px-0 max-w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent"
          >
            Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 mt-2"
          >
            Welcome back! Here's what's happening with your portfolio.
          </motion.p>
        </div>
        
        {/* Timeframe Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center space-x-2 mt-4 lg:mt-0"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">Timeframe:</span>
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { key: '7d', label: '7 Days' },
              { key: '30d', label: '30 Days' },
              { key: '90d', label: '90 Days' }
            ].map((timeframe) => (
              <button
                key={timeframe.key}
                onClick={() => setSelectedTimeframe(timeframe.key as any)}
                className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-md transition-all ${
                  selectedTimeframe === timeframe.key
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {timeframe.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {error && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-xl p-6"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
            </svg>
            <span className="text-lg font-semibold text-red-700 dark:text-red-300">
              Oops! Something went wrong.
            </span>
          </div>
          <p className="mt-2 text-red-600 dark:text-red-200">
            We couldn't load your dashboard data. Please try again.
          </p>
          <button
            onClick={fetchDashboardStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </motion.div>
      )}

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <Link href={card.href}>
                <div className={`p-4 md:p-6 rounded-xl border border-gray-200 dark:border-gray-700 ${card.bgColor} hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                          {card.title}
                        </p>
                        <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                          {card.value}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {card.description}
                        </p>
                      </div>
                      <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${card.color} shadow-lg`}>
                        <Icon className="text-white w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </div>
                    
                    {/* Enhanced trend indicator */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {card.trendDirection === 'up' ? (
                          <TrendingUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-500 mr-1" />
                        ) : card.trendDirection === 'neutral' ? (
                          <TrendingDownIcon className="w-3 h-3 md:w-4 md:h-4 text-red-500 mr-1" />
                        ) : null}
                        <span className={`text-xs md:text-sm font-medium ${
                          card.trendDirection === 'up' 
                            ? 'text-green-600 dark:text-green-400'
                            : card.trendDirection === 'neutral'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-gray-600 dark:text-gray-400'
                        }`}>
                          {card.trend}
                        </span>
                      </div>
                      <ClockIcon className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3"></span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={action.href}>
                      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative flex items-start space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center shadow-lg`}>
                            <Icon className="text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {action.title}
                              </h3>
                              {action.badge && (
                                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-full">
                                  {action.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                              {action.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-500 rounded-full mr-3"></span>
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                {stats.recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(activity.status)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/admin/messages" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                  View all activity →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analytics Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></span>
            Portfolio Views
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</span>
          </div>
        </div>
        
        {/* Simple bar chart */}
        <div className="flex items-end justify-between h-32 space-x-2">
          {stats.weeklyViews.map((value, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t"
                style={{ height: `${(value / Math.max(...stats.weeklyViews)) * 100}%` }}
              />
              <span className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Last Updated */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {stats.lastUpdated}
        </p>
      </motion.div>
    </div>
  );
} 