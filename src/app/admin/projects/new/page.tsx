"use client";
import React, { useState } from 'react';
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

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

interface ProjectForm {
  title: string;
  description: string;
  short_description: string;
  category: 'web' | 'mobile' | 'ai' | 'cloud' | 'enterprise';
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

export default function NewProject() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    short_description: '',
    category: 'web',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const addTechnology = () => {
    if (techInput.trim() && !form.technologies.includes(techInput.trim())) {
      setForm(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const addFeature = () => {
    if (featureInput.trim() && !form.key_features.includes(featureInput.trim())) {
      setForm(prev => ({
        ...prev,
        key_features: [...prev.key_features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setForm(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const removeFeature = (feature: string) => {
    setForm(prev => ({
      ...prev,
      key_features: prev.key_features.filter(f => f !== feature)
    }));
  };

  const handleTechKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  const handleFeatureKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFeature();
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setForm(prev => ({ ...prev, image_file: file }));
      
      // For now, create a blob URL for preview
      // In production, you'd upload to your storage service
      const blobUrl = URL.createObjectURL(file);
      setUploadedImageUrl(blobUrl);
      
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Error handling file upload:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.title || !form.description || !form.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare form data
      const projectData = {
        title: form.title,
        description: form.description,
        short_description: form.short_description,
        category: form.category,
        image_url: uploadedImageUrl || '', // For now, using blob URL
        live_url: form.live_url,
        github_url: form.github_url,
        case_study_url: form.case_study_url,
        technologies: form.technologies,
        key_features: form.key_features,
        featured: form.featured,
        // Category-specific data
        project_type: form.project_type,
        platform: form.platform,
        deployment_type: form.deployment_type,
        framework: form.framework,
        database: form.database,
      };

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Project created successfully!');
        router.push('/admin/projects');
      } else {
        toast.error(data.error || 'Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCategorySpecificFields = () => {
    switch (form.category) {
      case 'web':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Type
              </label>
              <select
                value={form.project_type || ''}
                onChange={(e) => setForm(prev => ({ ...prev, project_type: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select type</option>
                <option value="spa">Single Page Application</option>
                <option value="ecommerce">E-commerce Platform</option>
                <option value="dashboard">Admin Dashboard</option>
                <option value="portfolio">Portfolio Website</option>
                <option value="blog">Blog/CMS</option>
                <option value="api">REST API</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Framework
              </label>
              <select
                value={form.framework || ''}
                onChange={(e) => setForm(prev => ({ ...prev, framework: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select framework</option>
                <option value="react">React</option>
                <option value="nextjs">Next.js</option>
                <option value="vue">Vue.js</option>
                <option value="angular">Angular</option>
                <option value="svelte">Svelte</option>
                <option value="vanilla">Vanilla JS</option>
              </select>
            </div>
          </div>
        );
      case 'mobile':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Platform
              </label>
              <select
                value={form.platform || ''}
                onChange={(e) => setForm(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select platform</option>
                <option value="ios">iOS</option>
                <option value="android">Android</option>
                <option value="cross-platform">Cross-platform</option>
                <option value="pwa">Progressive Web App</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Development Framework
              </label>
              <select
                value={form.framework || ''}
                onChange={(e) => setForm(prev => ({ ...prev, framework: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select framework</option>
                <option value="react-native">React Native</option>
                <option value="flutter">Flutter</option>
                <option value="ionic">Ionic</option>
                <option value="xamarin">Xamarin</option>
                <option value="native">Native Development</option>
              </select>
            </div>
          </div>
        );
      case 'ai':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Solution Type
              </label>
              <select
                value={form.project_type || ''}
                onChange={(e) => setForm(prev => ({ ...prev, project_type: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select type</option>
                <option value="chatbot">Chatbot/Virtual Assistant</option>
                <option value="prediction">Predictive Analytics</option>
                <option value="classification">Image/Text Classification</option>
                <option value="recommendation">Recommendation System</option>
                <option value="nlp">Natural Language Processing</option>
                <option value="computer-vision">Computer Vision</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ML Framework
              </label>
              <select
                value={form.framework || ''}
                onChange={(e) => setForm(prev => ({ ...prev, framework: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select framework</option>
                <option value="tensorflow">TensorFlow</option>
                <option value="pytorch">PyTorch</option>
                <option value="scikit-learn">Scikit-learn</option>
                <option value="openai">OpenAI API</option>
                <option value="huggingface">Hugging Face</option>
              </select>
            </div>
          </div>
        );
      case 'cloud':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cloud Provider
              </label>
              <select
                value={form.platform || ''}
                onChange={(e) => setForm(prev => ({ ...prev, platform: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select provider</option>
                <option value="aws">Amazon Web Services</option>
                <option value="azure">Microsoft Azure</option>
                <option value="gcp">Google Cloud Platform</option>
                <option value="digitalocean">DigitalOcean</option>
                <option value="vercel">Vercel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Deployment Type
              </label>
              <select
                value={form.deployment_type || ''}
                onChange={(e) => setForm(prev => ({ ...prev, deployment_type: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select deployment</option>
                <option value="serverless">Serverless</option>
                <option value="containers">Containerized</option>
                <option value="vm">Virtual Machines</option>
                <option value="kubernetes">Kubernetes</option>
                <option value="static">Static Hosting</option>
              </select>
            </div>
          </div>
        );
      case 'enterprise':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Solution Type
              </label>
              <select
                value={form.project_type || ''}
                onChange={(e) => setForm(prev => ({ ...prev, project_type: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select type</option>
                <option value="erp">ERP System</option>
                <option value="crm">CRM Platform</option>
                <option value="inventory">Inventory Management</option>
                <option value="hr">HR Management System</option>
                <option value="finance">Financial Software</option>
                <option value="workflow">Workflow Automation</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Database
              </label>
              <select
                value={form.database || ''}
                onChange={(e) => setForm(prev => ({ ...prev, database: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select database</option>
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="oracle">Oracle</option>
                <option value="mongodb">MongoDB</option>
                <option value="mssql">SQL Server</option>
              </select>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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
          Create New Project
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Add a new project to showcase in your portfolio
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Basic Information
            </h2>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Enter project title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Provide a detailed description of your project..."
                required
              />
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="short_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description
              </label>
              <input
                type="text"
                id="short_description"
                name="short_description"
                value={form.short_description}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Brief one-line description for previews"
                maxLength={500}
              />
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              >
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Applications</option>
                <option value="ai">AI/ML Solutions</option>
                <option value="cloud">Cloud Infrastructure</option>
                <option value="enterprise">Enterprise Software</option>
              </select>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Media & Links
            </h2>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Image
              </label>
              <FileUpload
                onFileUpload={handleFileUpload}
                currentImage={uploadedImageUrl || undefined}
                accept="image/*"
                maxSize={5}
              />
            </div>

            {/* Live URL */}
            <div>
              <label htmlFor="live_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live Demo URL
              </label>
              <input
                type="url"
                id="live_url"
                name="live_url"
                value={form.live_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="https://your-project.com"
              />
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="github_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub Repository URL
              </label>
              <input
                type="url"
                id="github_url"
                name="github_url"
                value={form.github_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="https://github.com/username/repo"
              />
            </div>

            {/* Case Study URL */}
            <div>
              <label htmlFor="case_study_url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Case Study URL
              </label>
              <input
                type="url"
                id="case_study_url"
                name="case_study_url"
                value={form.case_study_url}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                placeholder="Link to detailed case study or documentation"
              />
            </div>
          </div>

          {/* Category-Specific Fields */}
          {form.category && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
                {form.category.charAt(0).toUpperCase() + form.category.slice(1)} Specific Details
              </h2>
              {getCategorySpecificFields()}
            </div>
          )}

          {/* Technologies */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Technologies Used
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add Technologies
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={handleTechKeyPress}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., React, TypeScript, Node.js"
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                    >
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechnology(tech)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Key Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Key Features
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={handleFeatureKeyPress}
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  placeholder="e.g., Real-time sync, User authentication"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Add
                </button>
              </div>
              
              {/* Features List */}
              {form.key_features.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {form.key_features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm"
                    >
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2">
              Settings
            </h2>

            {/* Featured */}
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={form.featured}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-500 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Featured Project
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                (Will be highlighted in portfolio)
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Link
              href="/admin/projects"
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <SaveIcon />
              <span>{isLoading ? 'Creating...' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

