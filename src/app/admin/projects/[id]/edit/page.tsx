"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';

// Icons
const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15,18 9,12 15,6"/>
  </svg>
);

const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

interface ProjectForm {
  title: string;
  description: string;
  short_description: string;
  category: 'web' | 'mobile' | 'ai' | 'cloud' | 'enterprise';
  image_url: string;
  image_file: File | null;
  live_url: string;
  github_url: string;
  case_study_url: string;
  technologies: string[];
  key_features: string[];
  featured: boolean;
  // Category-specific fields
  project_type?: string;
  platform?: string;
  deployment_type?: string;
  framework?: string;
  database?: string;
}

export default function EditProject({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProject, setIsLoadingProject] = useState(true);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    short_description: '',
    category: 'web',
    image_url: '',
    image_file: null,
    live_url: '',
    github_url: '',
    case_study_url: '',
    technologies: [],
    key_features: [],
    featured: false
  });
  const [techInput, setTechInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [params.id]);

  const fetchProject = async () => {
    try {
      setIsLoadingProject(true);
      const response = await fetch(`/api/projects/${params.id}`, {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        const project = data.data;
        
        setForm({
          title: project.title || '',
          description: project.description || '',
          short_description: project.short_description || '',
          category: project.category || 'web',
          image_url: project.image_url || '',
          image_file: null,
          live_url: project.live_url || '',
          github_url: project.github_url || '',
          case_study_url: project.case_study_url || '',
          technologies: project.technologies || [],
          key_features: project.key_features || [],
          featured: project.featured || false,
        });
        
        if (project.image_url) {
          setUploadedImageUrl(project.image_url);
        }
      } else {
        toast.error('Failed to fetch project details');
        router.push('/admin/projects');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      toast.error('Failed to load project');
      router.push('/admin/projects');
    } finally {
      setIsLoadingProject(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        title: form.title,
        description: form.description,
        short_description: form.short_description,
        category: form.category,
        image_url: uploadedImageUrl || form.image_url,
        live_url: form.live_url,
        github_url: form.github_url,
        case_study_url: form.case_study_url,
        technologies: form.technologies,
        key_features: form.key_features,
        featured: form.featured,
      };

      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project updated successfully!');
        router.push('/admin/projects');
      } else {
        toast.error(data.error || 'Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Something went wrong. Please try again.');
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
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Edit Project
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update your project details and showcase information
        </p>
      </motion.div>

      {/* Simplified Form for now */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Enhanced edit functionality is being built. For now, you can manage projects from the main projects page.
          </p>
        </div>
      </motion.div>
    </div>
  );
}



