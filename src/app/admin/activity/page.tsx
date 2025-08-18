"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface ActivityLog {
  id: string;
  action: string;
  description: string;
  entity_type:
    | "project"
    | "skill"
    | "content"
    | "profile"
    | "message"
    | "settings"
    | "system";
  entity_id?: string;
  user_id: string;
  user_name: string;
  created_at: string;
  metadata?: any;
}

export default function AdminActivityPage() {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | ActivityLog["entity_type"]>(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "timeline">("timeline");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/activity", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setActivities(data.data || []);
        } else {
          toast.error("Failed to load activity logs");
        }
      } else {
        toast.error("Failed to load activity logs");
      }
    } catch (error) {
      console.error("Activity load error:", error);
      toast.error("Failed to load activity logs");
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case "create":
        return "➕";
      case "update":
        return "✏️";
      case "delete":
        return "🗑️";
      case "login":
        return "🔐";
      case "logout":
        return "🚪";
      case "upload":
        return "📤";
      case "download":
        return "📥";
      default:
        return "📝";
    }
  };

  const getEntityIcon = (entityType: ActivityLog["entity_type"]) => {
    switch (entityType) {
      case "project":
        return "💼";
      case "skill":
        return "⭐";
      case "content":
        return "📄";
      case "profile":
        return "👤";
      case "message":
        return "💬";
      case "settings":
        return "⚙️";
      case "system":
        return "🔧";
      default:
        return "📋";
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case "create":
        return "text-green-600 bg-green-50 dark:bg-green-900/20";
      case "update":
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/20";
      case "delete":
        return "text-red-600 bg-red-50 dark:bg-red-900/20";
      case "login":
        return "text-purple-600 bg-purple-50 dark:bg-purple-900/20";
      case "logout":
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
      default:
        return "text-gray-600 bg-gray-50 dark:bg-gray-900/20";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 168) {
      // 7 days
      const days = Math.floor(diffInHours / 24);
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter =
      filter === "all" ? true : activity.entity_type === filter;
    const matchesSearch =
      searchQuery === "" ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user_name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Activity Log
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Track all admin actions and system events
            </p>
          </div>
          <button
            onClick={loadActivities}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Activities</option>
              <option value="project">Projects</option>
              <option value="skill">Skills</option>
              <option value="content">Content</option>
              <option value="profile">Profile</option>
              <option value="message">Messages</option>
              <option value="settings">Settings</option>
              <option value="system">System</option>
            </select>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  viewMode === "timeline"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Timeline
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Activity List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
      >
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No activities found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {searchQuery || filter !== "all"
                ? "Try adjusting your search or filters"
                : "Activities will appear here as you make changes"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence>
              {filteredActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg">
                        {getActionIcon(activity.action)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.user_name}
                        </span>
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}
                        >
                          {activity.action}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {getEntityIcon(activity.entity_type)}{" "}
                          {activity.entity_type}
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                        {activity.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(activity.created_at)}
                        </span>

                        {activity.metadata && (
                          <div className="flex items-center space-x-2">
                            {activity.metadata.changes && (
                              <span className="text-xs text-blue-600 dark:text-blue-400">
                                {Object.keys(activity.metadata.changes).length}{" "}
                                changes
                              </span>
                            )}
                            {activity.metadata.fileSize && (
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {activity.metadata.fileSize}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl">📊</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Activities
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activities.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <span className="text-2xl">➕</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Created
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  activities.filter((a) => a.action.toLowerCase() === "create")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <span className="text-2xl">✏️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Updated
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  activities.filter((a) => a.action.toLowerCase() === "update")
                    .length
                }
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <span className="text-2xl">🗑️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Deleted
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {
                  activities.filter((a) => a.action.toLowerCase() === "delete")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
