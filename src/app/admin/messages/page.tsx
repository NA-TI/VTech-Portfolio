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

  useEffect(() => { load(); }, []);

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
        setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
        toast.success("Updated");
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
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE", credentials: "include" });
      const data = await res.json();
      if (data?.success) {
        setMessages(prev => prev.filter(m => m.id !== id));
        toast.success("Deleted");
      } else {
        toast.error(data?.error || "Delete failed");
      }
    } catch (e) {
      toast.error("Delete failed");
    }
  };

  const filtered = messages.filter(m => filter === "all" ? true : m.status === filter);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Messages</h1>
          <p className="text-gray-600 dark:text-gray-400">View and manage contact inquiries</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={e => setFilter(e.target.value as any)}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
          <button onClick={load} className="px-3 py-2 text-sm rounded-lg bg-gray-100 dark:bg-gray-800">
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {filtered.map((m, index) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{m.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{m.email}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  m.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300' :
                  m.status === 'read' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                }`}>
                  {m.status}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 whitespace-pre-wrap">{m.message}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(m.created_at).toLocaleString()}
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={m.status}
                    onChange={e => setStatus(m.id, e.target.value as Message["status"])}
                    className="text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                  </select>
                  <button onClick={() => remove(m.id)} className="text-sm px-2 py-1 rounded bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-300">
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}



