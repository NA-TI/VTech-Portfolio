"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface ProfileForm {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar_url: string;
  email: string;
  location: string;
  available_for_projects: boolean;
}

export default function AdminProfilePage() {
  const [form, setForm] = useState<ProfileForm>({
    name: "",
    title: "",
    company: "",
    bio: "",
    avatar_url: "",
    email: "",
    location: "",
    available_for_projects: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("/api/profile", { credentials: "include" });
        const data = await res.json();
        if (data?.success && data.data) {
          const p = data.data as Partial<ProfileForm>;
          setForm(prev => ({
            ...prev,
            name: p.name || "",
            title: p.title || "",
            bio: p.bio || "",
            avatar_url: p.avatar_url || "",
            email: p.email || "",
            location: p.location || "",
            available_for_projects: p.available_for_projects ?? true,
          }));
        }
      } catch (e) {
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data?.success) {
        toast.success("Profile saved");
      } else {
        toast.error(data?.error || "Save failed");
      }
    } catch (e) {
      toast.error("Save failed");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-56 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Profile Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your personal information and public profile</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-slate-700 to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {form.name ? form.name.charAt(0).toUpperCase() : 'A'}
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Title
                  </label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Company/Organization
                  </label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                Profile Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Avatar URL
                  </label>
                  <input
                    type="url"
                    name="avatar_url"
                    value={form.avatar_url}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    placeholder="https://your-avatar-url.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Direct link to your profile picture
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
                    placeholder="Write a brief introduction about yourself, your experience, and what you do..."
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    This will be displayed on your public profile
                  </p>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-700 pb-3">
                Availability
              </h2>
              <label className="inline-flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="available_for_projects"
                  checked={form.available_for_projects}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Available for new projects
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Show visitors that you're open to new opportunities
                  </p>
                </div>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-6">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium"
              >
                Reset Changes
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-gradient-to-r from-slate-700 to-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition font-medium"
              >
                {isSaving ? "Saving..." : "Save Profile"}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Profile Preview Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="sticky top-24 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Preview</h3>
              <div className="text-center">
                {form.avatar_url ? (
                  <img
                    src={form.avatar_url}
                    alt="Profile"
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100 dark:border-gray-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-slate-700 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {form.name ? form.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {form.name || 'Your Name'}
                </h4>
                {form.title && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{form.title}</p>
                )}
                {form.company && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">at {form.company}</p>
                )}
                {form.location && (
                  <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">{form.location}</p>
                )}
                {form.available_for_projects && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    Available for projects
                  </span>
                )}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">Profile Tips</h4>
                  <p className="text-xs text-blue-700 dark:text-blue-400">
                    Keep your bio concise and professional. Include your key skills and what makes you unique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


