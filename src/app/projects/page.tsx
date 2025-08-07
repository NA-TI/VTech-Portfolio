"use client";
import React, { useState, useMemo } from 'react';
import { useProjects } from '@/hooks/useData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import GhostLoader from '@/components/GhostLoader';
import SelectiveTextStyling from '@/components/SelectiveTextStyling';

// --- Arrow Icon for back button ---
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9.551 13.5h13.449v-3h-13.449l4.449-4.449-2.121-2.121-7.879 7.879 7.879 7.879 2.121-2.121z"/>
  </svg>
);

// --- Filter Icons ---
const WebIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const GraphicsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 5 4 4L7 21l-4-4 12-12"/>
    <path d="m13 7 4 4L5 23l-4-4 12-12"/>
  </svg>
);

const CubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const GridIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

// Enhanced project interface
interface ProjectItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'web' | 'graphics' | '3d';
  tags: string[];
  year: string;
  client?: string;
  description?: string;
  technologies?: string[];
}

// Project categories
const categories = [
  { id: 'all', label: 'All Projects', icon: <GridIcon />, color: 'from-gray-500 to-gray-600' },
  { id: 'web', label: 'Web Design', icon: <WebIcon />, color: 'from-blue-500 to-cyan-500' },
  { id: 'graphics', label: 'Graphics', icon: <GraphicsIcon />, color: 'from-purple-500 to-pink-500' },
  { id: '3d', label: '3D Visualization', icon: <CubeIcon />, color: 'from-orange-500 to-red-500' },
];

// Helper functions
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'web': return 'from-blue-500 to-cyan-500';
    case 'graphics': return 'from-purple-500 to-pink-500';
    case '3d': return 'from-orange-500 to-red-500';
    default: return 'from-gray-500 to-gray-600';
  }
};

const getCategoryLabel = (category: string) => {
  switch (category) {
    case 'web': return 'Web Design';
    case 'graphics': return 'Graphics';
    case '3d': return '3D Visualization';
    default: return 'Project';
  }
};

// Enhanced Project Card Component with unique style
const ProjectCard = ({ project, onClick }: { project: ProjectItem; onClick: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-lg transition-all duration-500 cursor-pointer border border-gray-100 dark:border-gray-800 max-w-4xl mx-auto"
      onClick={onClick}
    >
      <div className="relative flex flex-col lg:flex-row">
        {/* Image Section: Top (Mobile) / Right (Desktop) */}
        <div className="order-1 lg:order-2 lg:w-2/5 p-4 lg:p-6 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = `https://placehold.co/600x400/fecaca/333333?text=${encodeURIComponent(project.title)}`;
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section: Bottom (Mobile) / Left (Desktop) */}
        <div className="order-2 lg:order-1 lg:w-3/5 p-5 lg:p-7 flex flex-col justify-center text-center lg:text-left">
          {/* Category Badge */}
          <div className="mb-3 flex justify-center lg:justify-start">
            <span className="inline-block px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-bold rounded-full uppercase tracking-wider">
              {getCategoryLabel(project.category)}
            </span>
          </div>

          {/* Project Title */}
          <div className="mb-4">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Project Description */}
          {project.description && (
            <div className="mb-5">
              <p className="text-gray-600 dark:text-gray-300 text-base lg:text-lg leading-relaxed">
                {project.description}
              </p>
            </div>
          )}

          {/* Technologies/Roles */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="flex items-center justify-center lg:justify-start">
            <button 
              className="group relative px-6 py-3 bg-gray-900 text-white rounded-full font-medium text-sm overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-white group-hover:w-5 group-hover:h-5 transition-all duration-300 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 74 74"
                  >
                    <circle strokeWidth="3" stroke="black" r="35.5" cy="37" cx="37"></circle>
                    <path
                      fill="black"
                      d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                    ></path>
                  </svg>
                </div>
                <span>view case study</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsPage() {
  const router = useRouter();
  const { data: projects, isLoading: loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = useMemo(() => {
    if (!projects?.data) return [];
    
    // Transform ProjectData to ProjectItem format
    const transformedProjects: ProjectItem[] = projects.data.map((project) => ({
      id: project.id,
      imageUrl: project.image_url,
      title: project.title,
      category: project.category,
      tags: project.technologies || [],
      year: new Date(project.created_at || Date.now()).getFullYear().toString(),
      client: undefined,
      description: project.description,
      technologies: project.technologies || []
    }));
    
    if (activeCategory === 'all') {
      return transformedProjects;
    }
    return transformedProjects.filter((project) => project.category === activeCategory);
  }, [projects, activeCategory]);

  const stats = useMemo(() => {
    if (!projects?.data) return { total: 0, web: 0, graphics: 0, '3d': 0 };
    return {
      total: projects.data.length,
      web: projects.data.filter((p: any) => p.category === 'web').length,
      graphics: projects.data.filter((p: any) => p.category === 'graphics').length,
      '3d': projects.data.filter((p: any) => p.category === '3d').length,
    };
  }, [projects]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-black dark:to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors mb-8">
            <ArrowLeftIcon />
            Back to Home
          </Link>
          
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Portfolio Showcase</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
            >
              My <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Creative</span> Work
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <SelectiveTextStyling
                text="A curated collection of projects that showcase my passion for innovative design and cutting-edge development"
                styledWords={[
                  { word: 'curated', style: 'bold' },
                  { word: 'passion', style: 'bold-color', color: 'purple' },
                  { word: 'innovative', style: 'italic' },
                  { word: 'cutting-edge', style: 'bold-color', color: 'blue' }
                ]}
                className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed"
              />
            </motion.div>
          </div>

          {/* Category Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 mb-16"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-500 ${
                  activeCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-xl scale-105`
                    : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-700/50'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                <div className={`p-2 rounded-lg ${activeCategory === category.id ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-700'}`}>
                  {category.icon}
                </div>
                <span className="text-lg">{category.label}</span>
                {category.id !== 'all' && (
                  <span className={`ml-3 px-3 py-1 rounded-full text-sm font-bold ${
                    activeCategory === category.id 
                      ? 'bg-white/30 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}>
                    {stats[category.id as keyof typeof stats] || 0}
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <GhostLoader size="lg" className="mb-4" />
                <p className="mt-4 text-gray-600 dark:text-gray-400">Loading projects...</p>
              </motion.div>
            ) : error ? (
              <motion.div
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-red-600 dark:text-red-400">Failed to load projects</p>
              </motion.div>
            ) : filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <p className="text-gray-600 dark:text-gray-400">No projects found in this category</p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-16"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => handleProjectClick(project.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 