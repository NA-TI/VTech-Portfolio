"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import FileUpload from "@/components/FileUpload";

export default function ContentManagement() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState("hero");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/content", {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Request": "true",
        },
      });
      const data = await response.json();
      if (data.success) {
        // Ensure arrays exist
        const contentWithArrays = {
          ...data.data,
          homepage: {
            ...data.data.homepage,
            metrics: data.data.homepage?.metrics || [],
            testimonials: data.data.homepage?.testimonials || [],
          },
        };
        setContent(contentWithArrays);
      } else {
        toast.error("Failed to load content");
      }
    } catch (error) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;

    // Validate content before saving
    if (!validateContent()) {
      toast.error("Content validation failed. Check console for details.");
      return;
    }

    try {
      setSaving(true);
      console.log("Saving content:", content);

      const response = await fetch("/api/content", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Admin-Request": "true",
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      console.log("Save response:", data);

      if (data.success) {
        toast.success(
          `Saved! Content updated successfully. Version: ${data.version}`
        );
        console.log("Content saved successfully:", data);

        // Force refresh the main page content
        if (
          typeof window !== "undefined" &&
          (window as any).vtechContentRefresh
        ) {
          (window as any).vtechContentRefresh();
        }

        // Also trigger a page reload to ensure fresh content
        setTimeout(() => {
          if (typeof window !== "undefined") {
            window.location.reload();
          }
        }, 1000);
      } else {
        toast.error("Failed to save: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const updateField = (path, value) => {
    if (!content) return;
    const newContent = { ...content };
    const keys = path.split(".");
    let current = newContent;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  const updateArrayField = (path, index, field, value) => {
    if (!content) return;
    const newContent = { ...content };
    const keys = path.split(".");
    let current = newContent;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Ensure the array exists
    if (!Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]] = [];
    }

    // Ensure the item exists
    if (!current[keys[keys.length - 1]][index]) {
      current[keys[keys.length - 1]][index] = {};
    }

    // Update the field
    current[keys[keys.length - 1]][index][field] = value;
    setContent(newContent);
  };

  const addArrayItem = (path, defaultItem) => {
    if (!content) return;
    console.log("Adding item to:", path, defaultItem);
    const newContent = { ...content };
    const keys = path.split(".");
    let current = newContent;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Initialize array if it doesn't exist
    if (!Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]] = [];
    }

    // Add the new item at the top
    current[keys[keys.length - 1]].unshift(defaultItem);
    console.log("Updated content:", newContent);
    setContent(newContent);
  };

  const removeArrayItem = (path, index) => {
    if (!content) return;
    const newContent = { ...content };
    const keys = path.split(".");
    let current = newContent;

    // Navigate to the parent object
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }

    // Remove the item from the array
    if (Array.isArray(current[keys[keys.length - 1]])) {
      current[keys[keys.length - 1]].splice(index, 1);
    }
    setContent(newContent);
  };

  const validateContent = () => {
    if (!content) return false;

    // Check if testimonials array exists and has proper structure
    const testimonials = content?.homepage?.testimonials;
    if (!Array.isArray(testimonials)) {
      console.error("Testimonials is not an array:", testimonials);
      return false;
    }

    // Check each testimonial has required fields
    for (let i = 0; i < testimonials.length; i++) {
      const testimonial = testimonials[i];
      if (!testimonial.name || !testimonial.content) {
        console.error(`Testimonial ${i} missing required fields:`, testimonial);
        return false;
      }
    }

    return true;
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  if (!content) {
    return (
      <div className="p-8 text-center text-red-600">Failed to load content</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Content Editor</h1>
              <p className="text-gray-400 mt-1">Manage your website content</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("/api/content/test");
                    const data = await response.json();
                    console.log("Content test result:", data);
                    if (data.success) {
                      toast.success("Database connection working!");
                    } else {
                      toast.error("Database issue: " + data.error);
                    }
                  } catch (error) {
                    toast.error("Test failed");
                  }
                }}
                className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Test DB
              </button>
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.open("/", "_blank");
                  }
                }}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Site
              </button>
              <button
                onClick={async () => {
                  try {
                    const response = await fetch("/api/content");
                    const data = await response.json();
                    console.log("Current content from API:", data);
                    if (data.success) {
                      toast.success(
                        `Content loaded: ${data.data?.homepage?.testimonials?.length || 0} testimonials`
                      );
                    } else {
                      toast.error("Failed to load content");
                    }
                  } catch (error) {
                    toast.error("Test failed");
                  }
                }}
                className="px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Test Content
              </button>
              <button
                onClick={saveContent}
                disabled={saving}
                className="px-8 py-3 bg-gradient-to-r from-vtech-cyan-600 to-vtech-cyan-700 hover:from-vtech-cyan-700 hover:to-vtech-cyan-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6 mb-6">
          <div className="flex space-x-1">
            {[
              "hero",
              "promotional",
              "about",
              "metrics",
              "contact",
              "capabilities",
              "testimonials",
              "company",
              "navigation",
            ].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  tab === t
                    ? "bg-gradient-to-r from-vtech-cyan-600 to-vtech-cyan-700 text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === "development" && (
          <div className="bg-gray-700 rounded-xl p-4 mb-6 border border-gray-600">
            <h3 className="text-white font-semibold mb-2">Debug Info:</h3>
            <div className="text-sm text-gray-300">
              <p>Metrics count: {content?.homepage?.metrics?.length || 0}</p>
              <p>
                Testimonials count:{" "}
                {content?.homepage?.testimonials?.length || 0}
              </p>
              <p>Current tab: {tab}</p>
              <details className="mt-2">
                <summary className="cursor-pointer text-vtech-cyan-400">
                  View Content Structure
                </summary>
                <pre className="mt-2 text-xs bg-gray-800 p-2 rounded overflow-auto max-h-40">
                  {JSON.stringify(content, null, 2)}
                </pre>
              </details>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="bg-gray-800 dark:bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-8">
          {tab === "hero" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-cyan-500 to-vtech-cyan-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Hero Section</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Main Title
                </label>
                <input
                  type="text"
                  value={content?.homepage?.hero?.title || ""}
                  onChange={(e) =>
                    updateField("homepage.hero.title", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Build Software Solutions That Scale"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Description
                </label>
                <textarea
                  value={content?.homepage?.hero?.description || ""}
                  onChange={(e) =>
                    updateField("homepage.hero.description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="VTech is a technology company building reliable software products and services."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Primary Button
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.hero?.primaryButton || ""}
                    onChange={(e) =>
                      updateField("homepage.hero.primaryButton", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="Start Your Project →"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Secondary Button
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.hero?.secondaryButton || ""}
                    onChange={(e) =>
                      updateField(
                        "homepage.hero.secondaryButton",
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="View Our Work →"
                  />
                </div>
              </div>
            </div>
          )}

          {tab === "about" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-cyan-500 to-vtech-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 18a8 8 0 1116 0H2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  About — Meet Our Team
                </h2>
              </div>

              {/* Team Members Editor */}
              <div className="space-y-6">
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      addArrayItem("about.teamMembers", {
                        id: crypto.randomUUID(),
                        name: "",
                        role: "",
                        description: "",
                        avatar: "👤",
                        photo: "",
                        skills: [],
                        social: [],
                        status: "online",
                      })
                    }
                    className="px-4 py-2 bg-gradient-to-r from-vtech-cyan-600 to-vtech-cyan-700 text-white rounded-lg"
                  >
                    Add Team Member
                  </button>
                </div>

                {(content?.about?.teamMembers || []).map((member, index) => (
                  <div
                    key={member.id || index}
                    className="bg-gray-700 rounded-xl p-6 border border-gray-600"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Member {index + 1}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={member.name || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "about.teamMembers",
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          placeholder="Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Role
                        </label>
                        <input
                          type="text"
                          value={member.role || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "about.teamMembers",
                              index,
                              "role",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          placeholder="Frontend Engineer"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Short Bio
                        </label>
                        <textarea
                          rows={3}
                          value={member.description || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "about.teamMembers",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          placeholder="Tell a short story about this team member"
                        />
                      </div>

                      {/* Profile Photo Upload with Crop */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Profile Photo
                        </label>
                        <FileUpload
                          onFileUpload={() => {}}
                          onUploadComplete={(url) =>
                            updateArrayField(
                              "about.teamMembers",
                              index,
                              "photo",
                              url
                            )
                          }
                          currentImage={member.photo || ""}
                          folder="team"
                          label=""
                          className="mb-4"
                        />
                        <p className="text-xs text-gray-400">
                          Upload a square photo. Cropper will open to help you
                          fit 1:1.
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "promotional" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-orange-500 to-vtech-orange-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Promotional Content
                </h2>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  This content appears in the main promotional section on the
                  homepage. Edit the text that displays the company's value
                  proposition. You can also upload a custom logo to replace the
                  default "VT" icon.
                </p>
              </div>

              {/* Company Logo Upload */}
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Company Logo
                </h3>

                {/* File Upload Component */}
                <FileUpload
                  onFileUpload={(file) => {
                    // This is called when a file is selected, but we don't need to do anything here
                    // The actual upload and URL setting is handled by onUploadComplete
                  }}
                  onUploadComplete={(url) => {
                    updateField("homepage.promotional.logoImage", url);
                  }}
                  currentImage={content?.homepage?.promotional?.logoImage || ""}
                  folder="promotional-logos"
                  label=""
                  className="mb-4"
                />

                {/* URL Input as Alternative */}
                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-400 mb-2">
                    Or enter image URL manually:
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.promotional?.logoImage || ""}
                    onChange={(e) =>
                      updateField(
                        "homepage.promotional.logoImage",
                        e.target.value
                      )
                    }
                    className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <p className="text-xs text-gray-400 mt-2">
                  Upload a logo or provide a URL. This will replace the "VT"
                  icon in the promotional section.
                </p>

                {/* Logo Preview */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Logo Preview
                  </label>
                  <div className="flex items-center space-x-2">
                    {content?.homepage?.promotional?.logoImage ? (
                      <div className="flex items-center space-x-2">
                        {/* Circular logo image preview */}
                        <div className="relative">
                          <img
                            src={content.homepage.promotional.logoImage}
                            alt="Logo Preview"
                            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-600 shadow-sm"
                            onError={(e) => {
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
                        {/* Company name preview */}
                        <span className="text-xl font-semibold text-white">
                          {content?.homepage?.promotional?.companyName ||
                            "VTech Team"}
                        </span>
                        <span className="text-sm text-gray-400">
                          (Custom Logo)
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-logo-fallback">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                          VT
                        </div>
                        <span className="text-xl font-semibold text-white">
                          {content?.homepage?.promotional?.companyName ||
                            "VTech Team"}
                        </span>
                        <span className="text-sm text-gray-400">
                          (Default VT Icon)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Logo Type Indicator */}
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      {content?.homepage?.promotional?.logoImage
                        ? "Currently using custom logo"
                        : "Currently using default VT icon"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Line 1 (Gray text)
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.promotional?.line1 || ""}
                    onChange={(e) =>
                      updateField("homepage.promotional.line1", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="We don't just"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Line 2 (Cyan text)
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.promotional?.line2 || ""}
                    onChange={(e) =>
                      updateField("homepage.promotional.line2", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="build software"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Line 3 (Gray text)
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.promotional?.line3 || ""}
                    onChange={(e) =>
                      updateField("homepage.promotional.line3", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="—we build solutions that drive"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Line 4 (Gradient text)
                  </label>
                  <input
                    type="text"
                    value={content?.homepage?.promotional?.line4 || ""}
                    onChange={(e) =>
                      updateField("homepage.promotional.line4", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="measurable business results"
                  />
                </div>

                {/* Company Logo Upload */}
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Company Logo
                  </h3>

                  {/* File Upload Component */}
                  <FileUpload
                    onFileUpload={(file) => {
                      // This is called when a file is selected, but we don't need to do anything here
                      // The actual upload and URL setting is handled by onUploadComplete
                    }}
                    onUploadComplete={(url) => {
                      updateField("homepage.promotional.logoImage", url);
                    }}
                    currentImage={
                      content?.homepage?.promotional?.logoImage || ""
                    }
                    folder="promotional-logos"
                    label=""
                    className="mb-4"
                  />

                  {/* URL Input as Alternative */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-gray-400 mb-2">
                      Or enter image URL manually:
                    </label>
                    <input
                      type="text"
                      value={content?.homepage?.promotional?.logoImage || ""}
                      onChange={(e) =>
                        updateField(
                          "homepage.promotional.logoImage",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Upload a logo or provide a URL. This will replace the "VT"
                    icon in the promotional section.
                  </p>

                  {/* Logo Preview */}
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Logo Preview
                    </label>
                    <div className="flex items-center space-x-2">
                      {content?.homepage?.promotional?.logoImage ? (
                        <div className="flex items-center space-x-2">
                          {/* Circular logo image preview */}
                          <div className="relative">
                            <img
                              src={content.homepage.promotional.logoImage}
                              alt="Logo Preview"
                              className="w-16 h-16 rounded-xl object-cover border-2 border-gray-600 shadow-sm"
                              onError={(e) => {
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
                          {/* Company name preview */}
                          <span className="text-xl font-semibold text-white">
                            {content?.homepage?.promotional?.companyName ||
                              "VTech Team"}
                          </span>
                          <span className="text-sm text-gray-400">
                            (Custom Logo)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-logo-fallback">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-sm">
                            VT
                          </div>
                          <span className="text-xl font-semibold text-white">
                            {content?.homepage?.promotional?.companyName ||
                              "VTech Team"}
                          </span>
                          <span className="text-sm text-gray-400">
                            (Default VT Icon)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Logo Type Indicator */}
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        {content?.homepage?.promotional?.logoImage
                          ? "Currently using custom logo"
                          : "Currently using default VT icon"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={content?.homepage?.promotional?.companyName || ""}
                      onChange={(e) =>
                        updateField(
                          "homepage.promotional.companyName",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                      placeholder="VTech Team"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={content?.homepage?.promotional?.tagline || ""}
                      onChange={(e) =>
                        updateField(
                          "homepage.promotional.tagline",
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                      placeholder="Delivering excellence since 2020"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "company" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-purple-500 to-vtech-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Company Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={content?.company?.name || ""}
                    onChange={(e) =>
                      updateField("company.name", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="VTech Solutions"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={content?.company?.tagline || ""}
                    onChange={(e) =>
                      updateField("company.tagline", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="Innovation. Excellence. Results."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Description
                </label>
                <textarea
                  value={content?.company?.description || ""}
                  onChange={(e) =>
                    updateField("company.description", e.target.value)
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="Leading technology company specializing in custom software development and digital solutions."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={content?.company?.email || ""}
                    onChange={(e) =>
                      updateField("company.email", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="hello@vtech.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={content?.company?.phone || ""}
                    onChange={(e) =>
                      updateField("company.phone", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Address
                </label>
                <textarea
                  value={content?.company?.address || ""}
                  onChange={(e) =>
                    updateField("company.address", e.target.value)
                  }
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="123 Tech Street, Innovation City, IC 12345"
                />
              </div>
            </div>
          )}

          {tab === "metrics" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-vtech-green-500 to-vtech-green-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      Performance Metrics
                    </h2>
                    <p className="text-sm text-gray-400 mt-1">
                      Use Prefix (e.g., $) and Suffix (e.g., K, M, %) to format
                      your metrics. Examples: $1M, 75%, 50K, 24/7
                    </p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    addArrayItem("homepage.metrics", {
                      value: "",
                      label: "",
                      description: "",
                      icon: "briefcase",
                      color: "vtech-cyan",
                      prefix: "",
                      suffix: "",
                    })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-vtech-green-600 to-vtech-green-700 hover:from-vtech-green-700 hover:to-vtech-green-800 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Metric
                </button>
              </div>

              <div className="space-y-6">
                {(!content?.homepage?.metrics ||
                  content.homepage.metrics.length === 0) && (
                  <div className="text-center py-8 bg-gray-700 rounded-xl border border-gray-600">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No Metrics Yet
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Click "Add Metric" to create your first performance
                      metric.
                    </p>
                  </div>
                )}
                {content?.homepage?.metrics?.map((metric, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl p-6 border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Metric {index + 1}
                      </h3>
                      <button
                        onClick={() =>
                          removeArrayItem("homepage.metrics", index)
                        }
                        className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Prefix
                        </label>
                        <input
                          type="text"
                          value={metric.prefix || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "prefix",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="$"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Value
                        </label>
                        <input
                          type="text"
                          value={metric.value || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "value",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="150"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Suffix
                        </label>
                        <select
                          value={metric.suffix || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "suffix",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">None</option>
                          <option value="K">K (Thousands)</option>
                          <option value="M">M (Millions)</option>
                          <option value="B">B (Billions)</option>
                          <option value="%">% (Percentage)</option>
                          <option value="%+">%+ (Percentage Plus)</option>
                          <option value="%↑">%↑ (Percentage Increase)</option>
                          <option value="%↓">%↓ (Percentage Decrease)</option>
                          <option value="+">+ (Plus)</option>
                          <option value="hrs">hrs (Hours)</option>
                          <option value="days">days</option>
                          <option value="users">users</option>
                          <option value="/7">/7 (Per Week)</option>
                          <option value="/24">/24 (Per Day)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Label
                        </label>
                        <input
                          type="text"
                          value={metric.label || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "label",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="Projects Completed"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          value={metric.description || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          rows={2}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="Successfully delivered projects across various industries"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Icon
                        </label>
                        <select
                          value={metric.icon || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="briefcase">Briefcase</option>
                          <option value="shield">Shield</option>
                          <option value="rocket">Rocket</option>
                          <option value="clock">Clock</option>
                          <option value="users">Users</option>
                          <option value="code">Code</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Color
                        </label>
                        <select
                          value={metric.color || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.metrics",
                              index,
                              "color",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="vtech-cyan">Cyan</option>
                          <option value="vtech-green">Green</option>
                          <option value="vtech-purple">Purple</option>
                          <option value="vtech-orange">Orange</option>
                        </select>
                      </div>
                    </div>

                    {/* Preview Section */}
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Preview
                      </label>
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-vtech-cyan-400 mb-2">
                            {metric.prefix || ""}
                            {metric.value || "0"}
                            {metric.suffix || ""}
                          </div>
                          <div className="text-sm text-gray-400">
                            {metric.label || "Metric Label"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "capabilities" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-purple-500 to-vtech-cyan-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 3h12l-1 14H5L4 3zm3 4h2v6H7V7zm4 0h2v6h-2V7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Enterprise Capabilities
                </h2>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Manage the capabilities grid displayed on the homepage. Add,
                  remove, or edit items.
                </p>
              </div>

              <div className="flex justify-end mb-4">
                <button
                  onClick={() =>
                    addArrayItem("homepage.capabilities", {
                      title: "New Capability",
                      capability: "",
                      metrics: "",
                      icon: "⚙️",
                      description: "",
                    })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-vtech-purple-600 to-vtech-cyan-600 text-white rounded-lg"
                >
                  Add Capability
                </button>
              </div>

              <div className="space-y-6">
                {(content?.homepage?.capabilities || []).map((cap, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl p-6 border border-gray-600"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Title
                        </label>
                        <input
                          type="text"
                          value={cap.title || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.capabilities",
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Capability
                        </label>
                        <input
                          type="text"
                          value={cap.capability || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.capabilities",
                              index,
                              "capability",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Metrics
                        </label>
                        <input
                          type="text"
                          value={cap.metrics || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.capabilities",
                              index,
                              "metrics",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Icon (emoji)
                        </label>
                        <input
                          type="text"
                          value={cap.icon || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.capabilities",
                              index,
                              "icon",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          maxLength={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={cap.description || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.capabilities",
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() =>
                          removeArrayItem("homepage.capabilities", index)
                        }
                        className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "contact" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-cyan-500 to-vtech-green-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 2h10v6H5V7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Contact & Social
                </h2>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Centralized editor for company contact details and social
                  links.
                </p>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    value={content?.company?.email || ""}
                    onChange={(e) =>
                      updateField("company.email", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="hello@yourcompany.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={content?.company?.phone || ""}
                    onChange={(e) =>
                      updateField("company.phone", e.target.value)
                    }
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Address
                </label>
                <textarea
                  rows={2}
                  value={content?.company?.address || ""}
                  onChange={(e) =>
                    updateField("company.address", e.target.value)
                  }
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                  placeholder="123 Tech Street, City, Country"
                />
              </div>

              {/* Social Links */}
              <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">
                    Social Links
                  </h3>
                  <button
                    onClick={() =>
                      addArrayItem("footer.social", {
                        platform: "",
                        url: "",
                        icon: "",
                      })
                    }
                    className="px-3 py-2 bg-gradient-to-r from-vtech-cyan-600 to-vtech-green-600 text-white rounded-lg"
                  >
                    Add Link
                  </button>
                </div>

                <div className="space-y-4">
                  {(content?.footer?.social || []).map((link, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Platform
                        </label>
                        <input
                          type="text"
                          value={link.platform || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "footer.social",
                              index,
                              "platform",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          placeholder="LinkedIn"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          URL
                        </label>
                        <input
                          type="url"
                          value={link.url || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "footer.social",
                              index,
                              "url",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                          placeholder="https://linkedin.com/company/..."
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Icon
                          </label>
                          <input
                            type="text"
                            value={link.icon || ""}
                            onChange={(e) =>
                              updateArrayField(
                                "footer.social",
                                index,
                                "icon",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white"
                            placeholder="linkedin | github | twitter"
                          />
                        </div>
                        <button
                          onClick={() =>
                            removeArrayItem("footer.social", index)
                          }
                          className="px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg"
                          title="Remove"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                  {(content?.footer?.social || []).length === 0 && (
                    <p className="text-sm text-gray-400">
                      No social links yet. Click "Add Link".
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab === "testimonials" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-vtech-orange-500 to-vtech-orange-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-white">
                    Client Testimonials
                  </h2>
                </div>
                <button
                  onClick={() =>
                    addArrayItem("homepage.testimonials", {
                      name: "",
                      title: "",
                      company: "",
                      content: "",
                      rating: 5,
                      projectType: "",
                      duration: "",
                    })
                  }
                  className="px-4 py-2 bg-gradient-to-r from-vtech-orange-600 to-vtech-orange-700 hover:from-vtech-orange-700 hover:to-vtech-orange-800 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Add Testimonial
                </button>
              </div>

              <div className="space-y-6">
                {(!content?.homepage?.testimonials ||
                  content.homepage.testimonials.length === 0) && (
                  <div className="text-center py-8 bg-gray-700 rounded-xl border border-gray-600">
                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      No Testimonials Yet
                    </h3>
                    <p className="text-gray-400 mb-4">
                      Click "Add Testimonial" to add your first client
                      testimonial.
                    </p>
                  </div>
                )}
                {content?.homepage?.testimonials?.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 rounded-xl p-6 border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">
                        Testimonial {index + 1}
                      </h3>
                      <button
                        onClick={() =>
                          removeArrayItem("homepage.testimonials", index)
                        }
                        className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Client Photo Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Client Photo (optional)
                        </label>
                        <FileUpload
                          onFileUpload={() => {}}
                          onUploadComplete={(url) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "image",
                              url
                            )
                          }
                          currentImage={testimonial.image || ""}
                          folder={`testimonials`}
                          label=""
                          className="mb-4"
                        />
                        <p className="text-xs text-gray-400">
                          Upload a client photo. If not provided, the initial of
                          their name will be shown.
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Client Name
                        </label>
                        <input
                          type="text"
                          value={testimonial.name || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "name",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="Sarah Johnson"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={testimonial.title || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="CEO"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          value={testimonial.company || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "company",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="TechStart Inc."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Rating
                        </label>
                        <select
                          value={testimonial.rating || 5}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "rating",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value={5}>5 Stars</option>
                          <option value={4}>4 Stars</option>
                          <option value={3}>3 Stars</option>
                          <option value={2}>2 Stars</option>
                          <option value={1}>1 Star</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Project Type
                        </label>
                        <input
                          type="text"
                          value={testimonial.projectType || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "projectType",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="E-commerce Platform"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={testimonial.duration || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "duration",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="3 months"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Testimonial Content
                        </label>
                        <textarea
                          value={testimonial.content || ""}
                          onChange={(e) =>
                            updateArrayField(
                              "homepage.testimonials",
                              index,
                              "content",
                              e.target.value
                            )
                          }
                          rows={4}
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                          placeholder="VTech delivered an exceptional e-commerce platform..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "navigation" && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-vtech-blue-500 to-vtech-blue-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm1 0v10h12V5H4z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M7 7a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm0 4a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Navigation & Brand
                </h2>
              </div>

              <div className="bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300">
                  Manage your brand logo and navigation menu. You can upload an
                  image directly with advanced cropping tools, provide a URL, or
                  use text-only branding. The system supports drag-and-drop
                  image uploads with automatic optimization and circular
                  cropping for perfect logo display.
                </p>
              </div>

              {/* Brand Settings */}
              <div className="space-y-6">
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Brand Logo
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Brand Name (Text Logo)
                      </label>
                      <input
                        type="text"
                        value={content?.navigation?.brand || ""}
                        onChange={(e) =>
                          updateField("navigation.brand", e.target.value)
                        }
                        className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                        placeholder="VTech"
                      />
                      <p className="text-xs text-gray-400 mt-2">
                        This will be used as text logo if no image is uploaded
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">
                        Logo Image
                      </label>

                      {/* File Upload Component */}
                      <FileUpload
                        onFileUpload={(file) => {
                          // This is called when a file is selected, but we don't need to do anything here
                          // The actual upload and URL setting is handled by onUploadComplete
                        }}
                        onUploadComplete={(url) => {
                          updateField("navigation.logoImage", url);
                        }}
                        currentImage={content?.navigation?.logoImage || ""}
                        folder="logos"
                        label=""
                        className="mb-4"
                      />

                      {/* URL Input as Alternative */}
                      <div className="mt-4">
                        <label className="block text-xs font-medium text-gray-400 mb-2">
                          Or enter image URL manually:
                        </label>
                        <input
                          type="text"
                          value={content?.navigation?.logoImage || ""}
                          onChange={(e) =>
                            updateField("navigation.logoImage", e.target.value)
                          }
                          className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200 text-sm"
                          placeholder="https://example.com/logo.png"
                        />
                      </div>

                      <p className="text-xs text-gray-400 mt-2">
                        Upload an image or provide a URL. If provided, this will
                        be used instead of text.
                      </p>
                    </div>
                  </div>

                  {/* Logo Preview */}
                  <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-600">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Logo Preview
                    </label>
                    <div className="flex items-center space-x-2">
                      {content?.navigation?.logoImage ? (
                        <div className="flex items-center space-x-2">
                          {/* Circular logo image preview */}
                          <div className="relative">
                            <img
                              src={content.navigation.logoImage}
                              alt="Logo Preview"
                              className="h-8 w-8 rounded-full object-cover border-2 border-gray-600 shadow-sm"
                              onError={(e) => {
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
                          {/* Brand name preview */}
                          <span className="text-xl font-semibold text-white">
                            {content?.navigation?.brand || "VTech"}
                          </span>
                          <span className="text-sm text-gray-400">
                            (Image + Text)
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 text-logo-fallback">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-vtech-cyan-500 to-vtech-cyan-600">
                            <span className="text-white font-bold text-sm">
                              V
                            </span>
                          </div>
                          <span className="text-xl font-semibold text-white">
                            {content?.navigation?.brand || "VTech"}
                          </span>
                          <span className="text-sm text-gray-400">
                            (Text Only)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Logo Type Indicator */}
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <p className="text-xs text-gray-400">
                        {content?.navigation?.logoImage
                          ? "Currently using image + text logo"
                          : "Currently using text-only logo"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="bg-gray-700 rounded-xl p-6 border border-gray-600">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">
                      Navigation Menu
                    </h3>
                    <button
                      onClick={() =>
                        addArrayItem("navigation.items", {
                          label: "",
                          href: "",
                          icon: "home",
                        })
                      }
                      className="px-4 py-2 bg-gradient-to-r from-vtech-blue-600 to-vtech-blue-700 hover:from-vtech-blue-700 hover:to-vtech-blue-800 text-white rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Menu Item
                    </button>
                  </div>

                  <div className="space-y-4">
                    {(!content?.navigation?.items ||
                      content.navigation.items.length === 0) && (
                      <div className="text-center py-6 bg-gray-800 rounded-lg border border-gray-600">
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg
                            className="w-6 h-6 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3 5a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm1 0v10h12V5H4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h4 className="text-md font-semibold text-white mb-1">
                          No Menu Items Yet
                        </h4>
                        <p className="text-gray-400 text-sm">
                          Click "Add Menu Item" to create your navigation menu.
                        </p>
                      </div>
                    )}

                    {content?.navigation?.items?.map((item, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 rounded-lg p-4 border border-gray-600"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-white">
                            Menu Item {index + 1}
                          </h4>
                          <button
                            onClick={() =>
                              removeArrayItem("navigation.items", index)
                            }
                            className="px-3 py-1 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors duration-200"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Label
                            </label>
                            <input
                              type="text"
                              value={item.label || ""}
                              onChange={(e) =>
                                updateArrayField(
                                  "navigation.items",
                                  index,
                                  "label",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                              placeholder="Home"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              URL
                            </label>
                            <input
                              type="text"
                              value={item.href || ""}
                              onChange={(e) =>
                                updateArrayField(
                                  "navigation.items",
                                  index,
                                  "href",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                              placeholder="/"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Icon
                            </label>
                            <select
                              value={item.icon || "home"}
                              onChange={(e) =>
                                updateArrayField(
                                  "navigation.items",
                                  index,
                                  "icon",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-vtech-cyan-500 focus:border-transparent transition-all duration-200"
                            >
                              <option value="home">Home</option>
                              <option value="user">User/About</option>
                              <option value="briefcase">
                                Briefcase/Services
                              </option>
                              <option value="folder">Folder/Projects</option>
                              <option value="mail">Mail/Contact</option>
                              <option value="code">Code</option>
                              <option value="settings">Settings</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
