"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import FileUpload from "@/components/FileUpload";

interface SettingsForm {
  // Branding
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogImage: string;

  // Contact
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;

  // Social Media
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    instagram: string;
  };

  // Admin
  adminEmail: string;
  enableNotifications: boolean;
  autoBackup: boolean;
}

export default function AdminSettingsPage() {
  const [form, setForm] = useState<SettingsForm>({
    siteName: "VTech Portfolio",
    siteDescription: "Professional portfolio and services",
    logo: "",
    favicon: "",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    metaTitle: "VTech Portfolio - Professional Development Services",
    metaDescription:
      "Professional web development, mobile apps, and AI solutions",
    metaKeywords: "web development, mobile apps, AI, portfolio",
    ogImage: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: "",
      instagram: "",
    },
    adminEmail: "",
    enableNotifications: true,
    autoBackup: true,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("branding");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/settings", {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setForm((prev) => ({ ...prev, ...data.data }));
        }
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Settings saved successfully");
        // Optimistically update local form with normalized server response
        if (data.data) setForm((prev) => ({ ...prev, ...data.data }));
        // Invalidate client caches so public pages pick up changes
        try {
          const { dataCache } = await import("@/hooks/useData");
          dataCache.invalidateSettings();
        } catch {}
        // Trigger content refresh if available
        if (
          typeof window !== "undefined" &&
          (window as any).vtechContentRefresh
        ) {
          (window as any).vtechContentRefresh();
        }
      } else {
        toast.error(data.error || "Failed to save settings");
      }
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "branding", name: "Branding", icon: "🎨" },
    { id: "seo", name: "SEO", icon: "🔍" },
    { id: "contact", name: "Contact", icon: "📞" },
    { id: "social", name: "Social Media", icon: "📱" },
    { id: "admin", name: "Admin", icon: "⚙️" },
  ];

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your site configuration and preferences
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Branding Tab */}
            {activeTab === "branding" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Name
                    </label>
                    <input
                      type="text"
                      name="siteName"
                      value={form.siteName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Description
                    </label>
                    <input
                      type="text"
                      name="siteDescription"
                      value={form.siteDescription}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo
                    </label>
                    <FileUpload
                      onFileUpload={() => {}}
                      onUploadComplete={(url) =>
                        setForm((prev) => ({ ...prev, logo: url }))
                      }
                      accept="image/*"
                      maxSize={2}
                      folder="branding"
                    />
                    {form.logo && (
                      <img
                        src={form.logo}
                        alt="Logo"
                        className="mt-2 h-12 w-auto"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Favicon
                    </label>
                    <FileUpload
                      onFileUpload={() => {}}
                      onUploadComplete={(url) =>
                        setForm((prev) => ({ ...prev, favicon: url }))
                      }
                      accept="image/*"
                      maxSize={1}
                      folder="branding"
                    />
                    {form.favicon && (
                      <img
                        src={form.favicon}
                        alt="Favicon"
                        className="mt-2 h-8 w-8"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      name="primaryColor"
                      value={form.primaryColor}
                      onChange={handleChange}
                      className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Secondary Color
                    </label>
                    <input
                      type="color"
                      name="secondaryColor"
                      value={form.secondaryColor}
                      onChange={handleChange}
                      className="w-full h-12 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* SEO Tab */}
            {activeTab === "seo" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={form.metaTitle}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    value={form.metaDescription}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Meta Keywords
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={form.metaKeywords}
                    onChange={handleChange}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Open Graph Image
                  </label>
                  <FileUpload
                    onFileUpload={() => {}}
                    onUploadComplete={(url) =>
                      setForm((prev) => ({ ...prev, ogImage: url }))
                    }
                    accept="image/*"
                    maxSize={2}
                    folder="seo"
                    crop={{ aspect: 1200 / 630, circular: false }}
                    presets={[
                      { id: "og", label: "OG 1200×630", aspect: 1200 / 630 },
                      { id: "16x9", label: "16:9", aspect: 16 / 9 },
                      { id: "square", label: "Square 1:1", aspect: 1 },
                      { id: "free", label: "Freeform", aspect: null },
                    ]}
                  />
                  {form.ogImage && (
                    <img
                      src={form.ogImage}
                      alt="OG Image"
                      className="mt-2 h-32 w-auto rounded"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {/* Contact Tab */}
            {activeTab === "contact" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={form.contactEmail}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={form.contactPhone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Address
                  </label>
                  <textarea
                    name="contactAddress"
                    value={form.contactAddress}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </motion.div>
            )}

            {/* Social Media Tab */}
            {activeTab === "social" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={form.socialLinks.linkedin}
                      onChange={(e) =>
                        handleSocialChange("linkedin", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={form.socialLinks.github}
                      onChange={(e) =>
                        handleSocialChange("github", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      value={form.socialLinks.twitter}
                      onChange={(e) =>
                        handleSocialChange("twitter", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={form.socialLinks.instagram}
                      onChange={(e) =>
                        handleSocialChange("instagram", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Admin Tab */}
            {activeTab === "admin" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <input
                    type="email"
                    name="adminEmail"
                    value={form.adminEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="enableNotifications"
                      checked={form.enableNotifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable email notifications
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="autoBackup"
                      checked={form.autoBackup}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Enable automatic backups
                    </label>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
