"use client";
import React, { useState, useMemo } from "react";
import { useProjects } from "@/hooks/useData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
// GhostLoader removed - replace with your preferred loader
import { useHSBColors } from "@/hooks/useHSBColors";

// Simple Icons
const CodeIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

const WebIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
);

const MobileIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z"
    />
  </svg>
);

const CloudIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
    />
  </svg>
);

const AIIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const EnterpriseIcon = () => (
  <svg
    className="w-4 h-4 sm:w-5 sm:h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.731.084-.716.084-.716 1.205.082 1.838 1.215 1.838 1.215 1.07 1.835 2.809 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// Project Interface
interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "web" | "mobile" | "cloud" | "ai" | "enterprise";
  technologies: string[];
  image_url: string;
  live_url?: string;
  github_url?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "maintenance";
}

// Categories
const categories = [
  {
    id: "all",
    label: "All Solutions",
    icon: <CodeIcon />,
    color: "from-slate-600 to-slate-700",
  },
  {
    id: "web",
    label: "Web Applications",
    icon: <WebIcon />,
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: <MobileIcon />,
    color: "from-purple-600 to-indigo-600",
  },
  {
    id: "cloud",
    label: "Cloud Infrastructure",
    icon: <CloudIcon />,
    color: "from-emerald-600 to-teal-600",
  },
  {
    id: "ai",
    label: "AI Integration",
    icon: <AIIcon />,
    color: "from-orange-600 to-red-600",
  },
  {
    id: "enterprise",
    label: "Enterprise Systems",
    icon: <EnterpriseIcon />,
    color: "from-gray-600 to-zinc-600",
  },
];

// Project Card Component
const ProjectCard = ({
  project,
  onClick,
}: {
  project: ProjectItem;
  onClick: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
            ⭐ Featured
          </span>
        </div>
      )}

      {/* Project Image */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <img
          src={project.image_url}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/600x400/e2e8f0/64748b?text=${encodeURIComponent(project.title)}`;
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-full">
            {project.category === "web"
              ? "Web App"
              : project.category === "mobile"
                ? "Mobile App"
                : project.category === "cloud"
                  ? "Cloud Solution"
                  : project.category === "ai"
                    ? "AI Integration"
                    : project.category === "enterprise"
                      ? "Enterprise"
                      : "Software"}
          </span>
          <div className="flex items-center space-x-2">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLinkIcon />
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <GitHubIcon />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button */}
        <motion.button
          onClick={onClick}
          className="w-full px-6 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>View Case Study</span>
          <ExternalLinkIcon />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();
  const { data: projects, isLoading: loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState("all");

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // HSB Color System - only initialize on client
  const hsBColors = useHSBColors();
  const { brandGradients, createStyles } = isClient
    ? hsBColors
    : {
        brandGradients: {},
        createStyles: { gradient: () => ({}) },
      };

  const filteredProjects = useMemo(() => {
    if (!projects?.data) return [];

    // Transform ProjectData to ProjectItem format
    const transformedProjects: ProjectItem[] = projects.data.map((project) => ({
      id: project.id,
      title: project.title,
      description: project.description,
      category: project.category as
        | "web"
        | "mobile"
        | "cloud"
        | "ai"
        | "enterprise",
      technologies: project.technologies || [],
      image_url: project.image_url,
      live_url: project.live_url,
      github_url: project.github_url,
      featured: project.featured,
      status: "completed" as const,
    }));

    if (activeCategory === "all") {
      return transformedProjects;
    }
    return transformedProjects.filter(
      (project) => project.category === activeCategory
    );
  }, [projects, activeCategory]);

  const stats = useMemo(() => {
    if (!projects?.data)
      return { total: 0, web: 0, mobile: 0, cloud: 0, ai: 0, enterprise: 0 };
    return {
      total: projects.data.length,
      web: projects.data.filter((p: any) => p.category === "web").length,
      mobile: projects.data.filter((p: any) => p.category === "mobile").length,
      cloud: projects.data.filter((p: any) => p.category === "cloud").length,
      ai: projects.data.filter((p: any) => p.category === "ai").length,
      enterprise: projects.data.filter((p: any) => p.category === "enterprise")
        .length,
    };
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Show loading state during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-950 dark:via-black dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-950 dark:via-black dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-8 w-48 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading projects...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-950 dark:via-black dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-950 dark:via-black dark:to-slate-900">
      {/* Ultra-thin Header Section */}
      <section className="relative overflow-hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
              Software
              <span className="text-gradient-vtech-primary"> Solutions</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
              Discover our portfolio of enterprise-grade applications,
              innovative platforms, and cutting-edge technology solutions.
            </p>

            {/* Ultra-thin Client Satisfaction */}
            <div className="text-center mb-6 md:mb-8">
              <div className="relative inline-block mb-2">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-pulse leading-none">
                  100%
                </div>
                <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce shadow-lg">
                  <span className="text-white text-xs md:text-sm font-bold flex items-center justify-center h-full">
                    ★
                  </span>
                </div>
              </div>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2 md:mb-3 tracking-wide">
                Client Satisfaction
              </div>
              <div className="w-24 md:w-32 h-1 md:h-1.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full animate-pulse shadow-sm"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ultra-thin Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 md:mb-12"
        >
          <div className="mb-6 md:mb-8 lg:mb-12">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 lg:mb-6 text-center">
              Filter by Technology Focus
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3 max-w-6xl mx-auto">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative p-2 md:p-3 lg:p-4 rounded-lg text-center transition-all duration-300 ${
                    activeCategory === category.id
                      ? "text-white shadow-lg border-2"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                  style={
                    activeCategory === category.id
                      ? createStyles.gradient(brandGradients.dark)
                      : {}
                  }
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg ${
                        activeCategory === category.id
                          ? "bg-white/20 text-white"
                          : "bg-gradient-to-r " + category.color + " text-white"
                      }`}
                    >
                      {category.icon}
                    </div>
                    <div className="text-center">
                      <h3
                        className={`text-xs sm:text-sm font-medium ${
                          activeCategory === category.id
                            ? "text-white"
                            : "text-gray-900 dark:text-white"
                        }`}
                      >
                        {category.label}
                      </h3>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We don't have any projects in the{" "}
                  {categories.find((c) => c.id === activeCategory)?.label}{" "}
                  category yet.
                </p>
                <button
                  onClick={() => setActiveCategory("all")}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
                >
                  View All Projects
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project.id)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center rounded-2xl p-10 text-white"
          style={createStyles.gradient(brandGradients.dark)}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can build a custom software solution that
            drives your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start a Project
            </Link>
            <Link
              href="/services"
              className="px-6 py-3 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Services
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
