"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GhostLoader from '@/components/GhostLoader';
import RichTextEditor from '@/components/RichTextEditor';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface Profile {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url: string;
  email: string;
  location: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    behance?: string;
    dribbble?: string;
  };
  skills: string[];
  experience_years: number;
  available_for_projects?: boolean;
  updated_at: string;
  styled_words?: StyledWord[];
}

const skillSuggestions = [
  'Web Development', 'React', 'Next.js', 'TypeScript', 'JavaScript',
  'Graphics Design', 'UI/UX Design', 'Adobe Creative Suite', 'Figma',
  '3D Visualization', '3D Modeling', 'Blender', 'Cinema 4D',
  'Frontend Development', 'Backend Development', 'Database Design',
  'Mobile Development', 'WordPress', 'Shopify', 'E-commerce'
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({
    name: "",
    title: "",
    bio: "",
    avatar_url: "",
    email: "",
    location: "",
    social_links: {
      github: "",
      linkedin: "",
      twitter: "",
      behance: "",
      dribbble: "",
    },
    skills: [] as string[],
    experience_years: 1,
    available_for_projects: true,
  });
  const [styledWords, setStyledWords] = useState<StyledWord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadMode, setUploadMode] = useState<'url' | 'upload'>('url');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Failed to fetch profile");
      } else if (data.data) {
        setProfile(data.data);
        setForm({
          name: data.data.name || "",
          title: data.data.title || "",
          bio: data.data.bio || "",
          avatar_url: data.data.avatar_url || "",
          email: data.data.email || "",
          location: data.data.location || "",
          social_links: {
            github: data.data.social_links?.github || "",
            linkedin: data.data.social_links?.linkedin || "",
            twitter: data.data.social_links?.twitter || "",
            behance: data.data.social_links?.behance || "",
            dribbble: data.data.social_links?.dribbble || "",
          },
          skills: data.data.skills || [],
          experience_years: data.data.experience_years || 1,
          available_for_projects: data.data.available_for_projects ?? true,
        });
        setStyledWords(data.data.styled_words || []);
        setError("");
      } else {
        // No profile yet – use defaults without error
        setProfile(null);
        setError("");
      }
    } catch (e) {
      setError("Failed to fetch profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('social_')) {
      const socialField = name.replace('social_', '');
      setForm(prev => ({
        ...prev,
        social_links: {
          ...prev.social_links,
          [socialField]: value
        }
      }));
    } else if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setForm(prev => ({ ...prev, [name]: target.checked }));
    } else if (type === 'number') {
      setForm(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBioChange = (bio: string, styledWords: StyledWord[]) => {
    setForm(prev => ({ ...prev, bio }));
    setStyledWords(styledWords);
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !form.skills.includes(skill.trim())) {
      setForm(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");
    
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          styled_words: styledWords
        }),
      });
      
      if (res.ok) {
        setSuccess("Profile updated successfully! Changes will appear on your homepage.");
        fetchProfile();
        setTimeout(() => setSuccess(""), 5000);
      } else {
        const err = await res.json();
        setError(err.error || "Failed to update profile");
      }
    } catch (e) {
      setError("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        setForm(prev => ({ ...prev, avatar_url: result.url }));
        setSuccess('Avatar uploaded successfully!');
        setTimeout(() => setSuccess(""), 3000);
      } else {
        console.error('Upload error details:', result);
        setError(result.error || 'Failed to upload image');
        
        // Show more specific error message
        if (result.error?.includes('bucket')) {
          setError('Storage bucket not found. Please create an "avatars" bucket in Supabase Storage and make it public.');
        } else if (result.error?.includes('policy')) {
          setError('Storage permissions issue. Please ensure the "avatars" bucket is public in Supabase.');
        }
      }
    } catch (error) {
      console.error('Upload network error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        handleImageUpload(file);
      } else {
        setError('Please upload an image file (JPEG, PNG, GIF, or WebP)');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <GhostLoader size="xl" variant="glow" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Update your profile information that appears on your homepage
        </p>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg"
          >
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg"
          >
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Basic Information</h2>
          
          <div className="space-y-4">
            {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
              <div className="relative">
          <img
                  src={form.avatar_url || "/window.svg"}
            alt="Avatar"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
                />
                <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white dark:border-gray-800 ${form.available_for_projects ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                
                {isUploading && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <GhostLoader size="sm" />
                  </div>
                )}
              </div>

              {/* Upload Mode Toggle */}
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setUploadMode('url')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    uploadMode === 'url' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode('upload')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    uploadMode === 'upload' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Upload
                </button>
              </div>

              {uploadMode === 'url' ? (
          <input
            type="url"
            name="avatar_url"
            value={form.avatar_url}
                  onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Avatar image URL"
          />
              ) : (
                <div className="w-full">
                  {/* Drag & Drop Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      disabled={isUploading}
                    />
                    
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                      </svg>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        <span className="font-medium">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        PNG, JPG, GIF or WebP (max 5MB)
                      </p>
                    </div>
                  </div>

                  {/* Current URL Display */}
                  {form.avatar_url && (
                    <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        Current: {form.avatar_url}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Availability Status */}
            <div className="flex items-center justify-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <input
                type="checkbox"
                id="available_for_projects"
                name="available_for_projects"
                checked={form.available_for_projects}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="available_for_projects" className="text-sm font-medium text-gray-900 dark:text-white">
                Available for projects
              </label>
              <div className={`w-3 h-3 rounded-full ${form.available_for_projects ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
          <input
            name="name"
            value={form.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Professional Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Creative Designer"
          />
        </div>
              
        <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
          <input
            name="email"
            type="email"
            value={form.email}
                  onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., New York, NY"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years of Experience
                </label>
                <input
                  name="experience_years"
                  type="number"
                  min="0"
                  max="50"
                  value={form.experience_years}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio / Description
              </label>
              <RichTextEditor
                value={form.bio}
                onChange={handleBioChange}
                placeholder="Tell visitors about yourself and what you do..."
                className="w-full"
                initialStyledWords={styledWords}
              />
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Skills & Expertise</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add Skills
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Type a skill and press Enter"
                />
                <button
                  type="button"
                  onClick={() => addSkill(skillInput)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Skill Suggestions */}
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.filter(skill => !form.skills.includes(skill)).slice(0, 8).map((skill) => (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => addSkill(skill)}
                    className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    + {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Skills */}
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Skills ({form.skills.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {form.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Social Media Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🐙 GitHub
              </label>
              <input
                name="social_github"
                type="url"
                value={form.social_links.github}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://github.com/natihabtamu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                💼 LinkedIn
              </label>
              <input
                name="social_linkedin"
                type="url"
                value={form.social_links.linkedin}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://linkedin.com/in/nati-habtamu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🐦 Twitter/X
              </label>
              <input
                name="social_twitter"
                type="url"
                value={form.social_links.twitter}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://twitter.com/natihabtamu"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🎨 Behance
              </label>
              <input
                name="social_behance"
                type="url"
                value={form.social_links.behance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://behance.net/natihabtamu"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🏀 Dribbble
              </label>
              <input
                name="social_dribbble"
                type="url"
                value={form.social_links.dribbble}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="https://dribbble.com/natihabtamu"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={fetchProfile}
            className="px-6 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Reset Changes
          </button>
          <button 
            type="submit" 
            disabled={isSaving} 
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isSaving && (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }} 
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full" 
              />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
} 