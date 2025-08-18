"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "pending" | "read" | "replied";
  created_at: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | Message["status"]>("all");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const load = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/contact", { credentials: "include" });
      const data = await res.json();
      if (data?.success) {
        setMessages(data.data || []);
      } else {
        toast.error(data?.error || "Failed to load messages");
      }
    } catch (e) {
      toast.error("Failed to load messages");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: Message["status"]) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data?.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status } : m))
        );
        if (selectedMessage?.id === id) {
          setSelectedMessage((prev) => (prev ? { ...prev, status } : null));
        }
        toast.success("Status updated");
      } else {
        toast.error(data?.error || "Update failed");
      }
    } catch (e) {
      toast.error("Update failed");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (data?.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        toast.success("Message deleted");
      } else {
        toast.error(data?.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const filtered = messages.filter((m) => {
    const matchesFilter = filter === "all" ? true : m.status === filter;
    const matchesSearch =
      searchQuery === "" ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: Message["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300";
      case "read":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300";
      case "replied":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-40 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filtered.length} of {messages.length} messages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm w-48"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {viewMode === "grid" ? "List" : "Grid"}
          </button>
          <button
            onClick={load}
            className="px-3 py-2 text-sm rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Messages Grid/List */}
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 gap-4"
            : "space-y-4"
        }
      >
        <AnimatePresence>
          {filtered.map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-lg transition-all duration-200 cursor-pointer ${
                selectedMessage?.id === m.id
                  ? "ring-2 ring-blue-500 dark:ring-blue-400"
                  : ""
              }`}
              onClick={() =>
                setSelectedMessage(selectedMessage?.id === m.id ? null : m)
              }
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {m.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {m.email}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusColor(m.status)}`}
                >
                  {m.status}
                </span>
              </div>

              <div className="mt-3">
                <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {selectedMessage?.id === m.id
                    ? m.message
                    : m.message.length > 150
                      ? `${m.message.substring(0, 150)}...`
                      : m.message}
                </p>
                {selectedMessage?.id === m.id && m.message.length > 150 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(null);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                  >
                    Show less
                  </button>
                )}
                {selectedMessage?.id !== m.id && m.message.length > 150 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMessage(m);
                    }}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-2"
                  >
                    Read more
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(m.created_at)}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={m.status}
                    onChange={(e) =>
                      setStatus(m.id, e.target.value as Message["status"])
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      remove(m.id);
                    }}
                    className="text-sm px-2 py-1 rounded bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">
            {searchQuery || filter !== "all"
              ? "No messages found"
              : "No messages yet"}
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {searchQuery || filter !== "all"
              ? "Try adjusting your search or filter criteria"
              : "Contact form submissions will appear here"}
          </p>
        </motion.div>
      )}
    </div>
  );
}
