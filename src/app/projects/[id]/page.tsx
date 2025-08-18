"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
// GhostLoader removed - replace with your preferred loader
import SelectiveTextStyling from "@/components/SelectiveTextStyling";

// Simple Icons
const ArrowLeftIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12,19 5,12 12,5" />
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const CalendarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const LightbulbIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 21h6" />
    <path d="M10 21v-4a2 2 0 0 1 4 0v4" />
    <path d="M9 3h6" />
    <path d="M12 3v18" />
  </svg>
);

interface StyledWord {
  word: string;
  style: "bold" | "italic" | "bold-color" | "italic-color";
  color?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  category: "web" | "mobile" | "ai" | "cloud" | "enterprise";
  image_url?: string;
  live_url?: string;
  github_url?: string;
  case_study_url?: string;
  technologies: string[];
  key_features?: string[];
  featured: boolean;
  status?: "planning" | "development" | "completed" | "archived";
  styled_words?: StyledWord[];

  // Web Development specific (keeping backward fields)
  code_snippets?: string;
  tech_stack?: string[];
  deployment_info?: string;
  performance_metrics?: string;

  // General details
  project_duration?: string;
  client?: string;
  team_size?: number;
  challenges?: string;
  solutions?: string;
  lessons_learned?: string;

  created_at: string;
  updated_at: string;
}

export default function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      const { id } = await params;
      const response = await fetch(`/api/projects/${id}`);
      const result = await response.json();

      if (result.success && result.data) {
        setProject(result.data);
      } else {
        setError("Project not found");
      }
    } catch (error) {
      setError("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "web":
        return "bg-blue-500";
      case "graphics":
        return "bg-purple-500";
      case "3d":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return "💻";
      case "graphics":
        return "🎨";
      case "3d":
        return "🎲";
      default:
        return "📁";
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "web":
        return "Web Development";
      case "graphics":
        return "Graphics Design";
      case "3d":
        return "3D Visualization";
      default:
        return "Project";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-8 w-48 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
          >
            <ArrowLeftIcon />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeftIcon className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Section */}
        <motion.header
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Project Badges */}
          <div className="flex items-center gap-3 mb-6">
            <div
              className={`w-12 h-12 rounded-xl ${getCategoryColor(project.category)} flex items-center justify-center text-white text-xl shadow-lg`}
            >
              {getCategoryIcon(project.category)}
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${getCategoryColor(project.category)} shadow-md`}
              >
                {getCategoryLabel(project.category)}
              </span>
              {project.featured && (
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md">
                  ⭐ Featured
                </span>
              )}
            </div>
          </div>

          {/* Project Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {project.title}
          </h1>

          {/* Project Description */}
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-4xl">
            <SelectiveTextStyling
              text={project.description}
              styledWords={project.styled_words || []}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLinkIcon />
                Live Demo
              </motion.a>
            )}
            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon />
                View Code
              </motion.a>
            )}
          </div>
        </motion.header>

        {/* Project Image */}
        {project.image_url && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>
        )}

        {/* Project Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <motion.div
            className="lg:col-span-3 space-y-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* ✨ Overview Section */}
            <section className="bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                ✨ Overview
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.project_duration && (
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="text-blue-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Timeline
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {project.project_duration}
                      </p>
                    </div>
                  </div>
                )}

                {project.team_size && (
                  <div className="flex items-center gap-3">
                    <UsersIcon className="text-purple-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Team Size
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {project.team_size}{" "}
                        {project.team_size === 1 ? "person" : "people"}
                      </p>
                    </div>
                  </div>
                )}

                {project.client && (
                  <div className="flex items-center gap-3">
                    <TargetIcon className="text-green-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Client
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {project.client}
                      </p>
                    </div>
                  </div>
                )}

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex items-center gap-3">
                    <LightbulbIcon className="text-orange-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                        Technologies
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {project.technologies.join(", ")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Category Specific Content */}
            {project.category === "web" &&
              (project.code_snippets || project.performance_metrics) && (
                <section className="bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    💻 Technical Details
                  </h2>

                  {project.code_snippets && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Key Features
                      </h3>
                      <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto shadow-lg">
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                          {project.code_snippets}
                        </pre>
                      </div>
                    </div>
                  )}

                  {project.performance_metrics && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                        Performance Metrics
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.performance_metrics}
                      </p>
                    </div>
                  )}
                </section>
              )}

            {/* Project Journey */}
            {(project.challenges ||
              project.solutions ||
              project.lessons_learned) && (
              <section className="bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  🚀 Project Journey
                </h2>

                {project.challenges && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Challenges
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.challenges}
                    </p>
                  </div>
                )}

                {project.solutions && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Solutions
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.solutions}
                    </p>
                  </div>
                )}

                {project.lessons_learned && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      Lessons Learned
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {project.lessons_learned}
                    </p>
                  </div>
                )}
              </section>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Tech Stack for Web */}
            {project.category === "web" &&
              project.tech_stack &&
              project.tech_stack.length > 0 && (
                <div className="bg-white/60 dark:bg-black/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Tech Stack
                  </h3>

                  <div className="space-y-2">
                    {project.tech_stack.map((tech, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </motion.div>
        </div>

        {/* Back to Projects CTA */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl font-semibold"
          >
            <ArrowLeftIcon />
            View More Projects
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
