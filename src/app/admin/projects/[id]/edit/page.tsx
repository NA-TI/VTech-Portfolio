"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import FileUpload from "@/components/FileUpload";

// Ultra-thin icons
const ArrowLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15,18 9,12 15,6" />
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17,21 17,13 7,13 7,21" />
    <polyline points="7,3 7,8 15,8" />
  </svg>
);

const LoadingIcon = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-20"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
    ></circle>
    <path
      className="opacity-60"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface ProjectForm {
  title: string;
  description: string;
  category: "web" | "mobile" | "ai" | "cloud" | "enterprise";
  image_url: string;
  live_url: string;
  github_url: string;
  technologies: string[];
  featured: boolean;
}

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [form, setForm] = useState<ProjectForm>({
    title: "",
    description: "",
    category: "web",
    image_url: "",
    live_url: "",
    github_url: "",
    technologies: [],
    featured: false,
  });
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setIsLoadingProject(true);
      const response = await fetch(`/api/projects/${params.id}`, {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const project = data.data;

        setForm({
          title: project.title || "",
          description: project.description || "",
          category: project.category || "web",
          image_url: project.image_url || "",
          live_url: project.live_url || "",
          github_url: project.github_url || "",
          technologies: project.technologies || [],
          featured: project.featured || false,
        });
      } else {
        toast.error("Failed to fetch project details");
        router.push("/admin/projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      toast.error("Failed to load project");
      router.push("/admin/projects");
    } finally {
      setIsLoadingProject(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
      setForm((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setForm((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleImageUploadComplete = (url: string) => {
    setForm((prev) => ({
      ...prev,
      image_url: url,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        title: form.title,
        description: form.description,
        category: form.category,
        image_url: form.image_url,
        live_url: form.live_url,
        github_url: form.github_url,
        technologies: form.technologies,
        featured: form.featured,
      };

      const response = await fetch(`/api/projects/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Project updated successfully!");
        router.push("/admin/projects");
      } else {
        toast.error(data.error || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingProject) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64"></div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
              <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href="/admin/projects"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon />
            <span>Back to Projects</span>
          </Link>
        </div>

        <h1 className="text-2xl font-light text-gray-900 dark:text-white mb-2 tracking-wide">
          Edit Project
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 tracking-wide">
          Update your project details and showcase information
        </p>
      </motion.div>

      {/* Ultra-thin Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-white/10 dark:border-gray-700/50 shadow-xl"
      >
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm tracking-wide"
              placeholder="Enter project title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 resize-none text-sm tracking-wide"
              placeholder="Provide a detailed description of your project..."
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm tracking-wide"
              required
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Applications</option>
              <option value="ai">AI/ML Solutions</option>
              <option value="cloud">Cloud Infrastructure</option>
              <option value="enterprise">Enterprise Software</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <FileUpload
              onFileUpload={() => {}} // We handle this in onUploadComplete
              onUploadComplete={handleImageUploadComplete}
              currentImage={form.image_url}
              accept="image/*"
              maxSize={5}
              folder="projects"
              label="Project Image"
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              Live Demo URL
            </label>
            <input
              type="url"
              name="live_url"
              value={form.live_url}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm tracking-wide"
              placeholder="https://your-project.com"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              GitHub Repository URL
            </label>
            <input
              type="url"
              name="github_url"
              value={form.github_url}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm tracking-wide"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 tracking-wide">
              Technologies
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={handleTechKeyPress}
                className="flex-1 px-4 py-2 bg-white/5 dark:bg-gray-700/50 border border-white/10 dark:border-gray-600/50 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm tracking-wide"
                placeholder="e.g., React, TypeScript, Node.js"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all duration-200 text-sm tracking-wide border border-blue-500/20"
              >
                Add
              </button>
            </div>

            {/* Technologies List */}
            {form.technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full text-xs tracking-wide border border-blue-500/20"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleInputChange}
              className="w-4 h-4 text-blue-500 bg-white/5 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/50 rounded focus:ring-1 focus:ring-blue-500/50"
            />
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 tracking-wide">
              Featured Project
            </label>
            <span className="text-xs text-gray-500 dark:text-gray-400 tracking-wide">
              (Will be highlighted in portfolio)
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200/20 dark:border-gray-700/50">
            <Link
              href="/admin/projects"
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors text-sm tracking-wide"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wide border border-blue-500/20"
            >
              {isLoading ? (
                <>
                  <LoadingIcon />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <SaveIcon />
                  <span>Update Project</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
