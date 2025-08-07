"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSkills, dataCache, SkillData } from "@/hooks/useData";
import GhostLoader from '@/components/GhostLoader';
import RichTextEditor from '@/components/RichTextEditor';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface Skill {
  id: string;
  title: string;
  description: string;
  icon_name?: string;
  color_gradient?: string;
  proficiency: number;
  created_at?: string;
  styled_words?: StyledWord[];
}

const SKILL_ICONS = [
  { emoji: '💻', label: 'Development' },
  { emoji: '🎨', label: 'Design' },
  { emoji: '📱', label: 'Mobile' },
  { emoji: '🌐', label: 'Web' },
  { emoji: '⚡', label: 'Performance' },
  { emoji: '🚀', label: 'Innovation' },
  { emoji: '🔧', label: 'Tools' },
  { emoji: '📊', label: 'Analytics' },
  { emoji: '🎯', label: 'Strategy' },
  { emoji: '💡', label: 'Ideas' },
  { emoji: '🔍', label: 'Research' },
  { emoji: '📈', label: 'Growth' },
  { emoji: '🎭', label: 'Creative' },
  { emoji: '🖥️', label: 'Desktop' },
  { emoji: '📝', label: 'Content' },
  { emoji: '🎪', label: 'Entertainment' },
  { emoji: '🔬', label: 'Science' },
  { emoji: '🎲', label: 'Gaming' },
  { emoji: '🎸', label: 'Music' },
  { emoji: '🎬', label: 'Video' }
];

const COLOR_GRADIENTS = [
  { gradient: 'from-blue-500 to-cyan-500', name: 'Ocean Blue', preview: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
  { gradient: 'from-purple-500 to-pink-500', name: 'Purple Pink', preview: 'bg-gradient-to-r from-purple-500 to-pink-500' },
  { gradient: 'from-green-500 to-emerald-500', name: 'Emerald Green', preview: 'bg-gradient-to-r from-green-500 to-emerald-500' },
  { gradient: 'from-yellow-500 to-orange-500', name: 'Sunset Orange', preview: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
  { gradient: 'from-red-500 to-rose-500', name: 'Rose Red', preview: 'bg-gradient-to-r from-red-500 to-rose-500' },
  { gradient: 'from-indigo-500 to-purple-500', name: 'Indigo Purple', preview: 'bg-gradient-to-r from-indigo-500 to-purple-500' },
  { gradient: 'from-teal-500 to-green-500', name: 'Teal Green', preview: 'bg-gradient-to-r from-teal-500 to-green-500' },
  { gradient: 'from-orange-500 to-red-500', name: 'Fire Red', preview: 'bg-gradient-to-r from-orange-500 to-red-500' }
];

export default function SkillsPage() {
  const { data: skillsResponse, isLoading, error: fetchError, mutate } = useSkills();
  const skills = skillsResponse?.data || [];

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState({ 
    title: "", 
    description: "", 
    icon_name: "💻", 
    color_gradient: "from-blue-500 to-cyan-500", 
    proficiency: 80 
  });
  const [styledWords, setStyledWords] = useState<StyledWord[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const openModal = (skill?: Skill) => {
    setEditingSkill(skill || null);
    setForm(skill ? { 
      title: skill.title, 
      description: skill.description, 
      icon_name: skill.icon_name || "💻",
      color_gradient: skill.color_gradient || "from-blue-500 to-cyan-500",
      proficiency: skill.proficiency 
    } : { 
      title: "", 
      description: "", 
      icon_name: "💻", 
      color_gradient: "from-blue-500 to-cyan-500", 
      proficiency: 80 
    });
    setStyledWords(skill?.styled_words || []);
    setShowModal(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSkill(null);
    setForm({ title: "", description: "", icon_name: "💻", color_gradient: "from-blue-500 to-cyan-500", proficiency: 80 });
    setStyledWords([]);
    setError("");
    setSuccess("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'proficiency' ? parseInt(value) || 0 : value });
  };

  const handleDescriptionChange = (description: string, styledWords: StyledWord[]) => {
    setForm(prev => ({ ...prev, description }));
    setStyledWords(styledWords);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are required");
      return;
    }
    
    setIsSaving(true);
    setError("");
    
    try {
      const method = editingSkill ? "PATCH" : "POST";
      const url = editingSkill ? `/api/skills/${editingSkill.id}` : "/api/skills";
      
      // Create optimistic update data
      const optimisticSkill: SkillData = {
        id: editingSkill?.id || `temp-${Date.now()}`,
        title: form.title,
        description: form.description,
        icon_name: form.icon_name,
        color_gradient: form.color_gradient,
        proficiency: form.proficiency,
        created_at: editingSkill?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // Optimistic update
      if (editingSkill) {
        // Update existing skill
        dataCache.optimisticUpdateSkill(editingSkill.id, optimisticSkill);
      } else {
        // Add new skill
        dataCache.optimisticAddSkill(optimisticSkill);
      }

      // Show success message immediately
      setSuccess(editingSkill ? "Skill updated successfully!" : "Skill created successfully!");
      closeModal();

      // Make API call
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          styled_words: styledWords
        }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        // Revalidate to get the correct data from server
        mutate();
      } else {
        // Revert optimistic update on error
        mutate();
        setError(data.error || "Failed to save skill");
        setSuccess("");
      }
    } catch (e) {
      // Revert optimistic update on error
      mutate();
      setError("Failed to save skill");
      setSuccess("");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    setIsDeleting(id);
    
    try {
      // Optimistic removal
      dataCache.optimisticRemoveSkill(id);
      setSuccess("Skill deleted successfully!");

      // Make API call
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (data.success) {
        // Revalidate to confirm deletion
        mutate();
      } else {
        // Revert optimistic update on error
        mutate();
        setError(data.error || "Failed to delete skill");
        setSuccess("");
      }
    } catch (e) {
      // Revert optimistic update on error
      mutate();
      setError("Failed to delete skill");
      setSuccess("");
    } finally {
      setIsDeleting(null);
    }
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return 'text-emerald-600 dark:text-emerald-400';
    if (proficiency >= 70) return 'text-blue-600 dark:text-blue-400';
    if (proficiency >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-orange-600 dark:text-orange-400';
  };

  const getProficiencyLabel = (proficiency: number) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 70) return 'Advanced';
    if (proficiency >= 50) return 'Intermediate';
    return 'Beginner';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <GhostLoader size="xl" variant="glow" className="mb-4" />
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Loading skills...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Skills & Services
            </h1>
            {isLoading && (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
              />
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Showcase your expertise and capabilities • Real-time sync enabled ⚡
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl flex items-center space-x-3 transition-all shadow-lg hover:shadow-xl"
          onClick={() => openModal()}
        >
          <span className="text-2xl">✨</span>
          <span className="font-semibold">Add New Skill</span>
        </motion.button>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {(error || fetchError) && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-center gap-3"
          >
            <span className="text-2xl">❌</span>
            <p className="text-red-600 dark:text-red-400 font-medium">{error || fetchError}</p>
            <button 
              onClick={() => {setError(""); }}
              className="ml-auto text-red-400 hover:text-red-600 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 flex items-center gap-3"
          >
            <span className="text-2xl">✅</span>
            <p className="text-green-600 dark:text-green-400 font-medium">{success}</p>
            <button 
              onClick={() => setSuccess("")}
              className="ml-auto text-green-400 hover:text-green-600 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skills Grid */}
      {isLoading && skills.length === 0 ? (
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <GhostLoader size="lg" variant="glow" className="mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">Loading your skills...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skills.length === 0 ? (
            <div className="col-span-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20 px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl border-2 border-dashed border-gray-300 dark:border-gray-600"
              >
                <div className="text-8xl mb-6">🎯</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">No skills added yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
                  Start building your portfolio by adding your first skill or service
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
                >
                  ✨ Add Your First Skill
                </motion.button>
              </motion.div>
            </div>
          ) : (
            skills.map((skill, index) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative"
              >
                <div className="p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
                  {/* Real-time sync indicator */}
                  <div className="absolute top-4 left-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Real-time sync active"></div>
                  
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                    <div className={`w-full h-full bg-gradient-to-br ${skill.color_gradient} rounded-full blur-xl`}></div>
                  </div>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color_gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {skill.icon_name}
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => openModal(skill)} 
                        className="p-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30" 
                        title="Edit Skill"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(skill.id, skill.title)} 
                        disabled={isDeleting === skill.id}
                        className="p-3 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors rounded-xl hover:bg-red-50 dark:hover:bg-red-900/30 disabled:opacity-50" 
                        title="Delete Skill"
                      >
                        {isDeleting === skill.id ? (
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                          />
                        ) : (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3,6 5,6 21,6"/>
                            <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"/>
                          </svg>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 relative">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {skill.description}
                    </p>
                  </div>

                  {/* Proficiency Section */}
                  <div className="mt-auto relative">
                    <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${getProficiencyColor(skill.proficiency)} bg-current bg-opacity-10`}>
                          {getProficiencyLabel(skill.proficiency)}
                        </span>
                      </div>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {skill.proficiency}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
                          className={`bg-gradient-to-r ${skill.color_gradient} h-full rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                        </motion.div>
                      </div>
                    </div>
                  </div>


                </div>
              </motion.div>
            ))
          )}
        </div>
      )}

      {/* Enhanced Modal - keeping the same design but with faster interactions */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={closeModal} 
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
              
              {/* Header */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {editingSkill ? "✏️ Edit Skill" : "✨ Add New Skill"}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {editingSkill ? "Update your skill information • Changes sync instantly" : "Create a new skill to showcase your expertise • Auto-syncs across all pages"}
                </p>
              </div>
              
              <form onSubmit={handleSave} className="space-y-8">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Skill Title
                  </label>
                  <input 
                    name="title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                    placeholder="e.g., React Development, UI/UX Design"
                    className="w-full px-6 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors text-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <RichTextEditor
                    value={form.description}
                    onChange={handleDescriptionChange}
                    placeholder="Describe your skill, experience, and what makes you unique in this area..."
                    className="w-full"
                    initialStyledWords={styledWords}
                  />
                </div>

                {/* Icon & Color Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Icon Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                      Choose Icon
                    </label>
                    <div className="grid grid-cols-5 gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-2xl max-h-40 overflow-y-auto">
                      {SKILL_ICONS.map(icon => (
                        <button
                          key={icon.emoji}
                          type="button"
                          onClick={() => setForm({...form, icon_name: icon.emoji})}
                          className={`p-3 rounded-xl text-2xl transition-all hover:scale-110 ${
                            form.icon_name === icon.emoji 
                              ? 'bg-blue-500 text-white shadow-lg' 
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          title={icon.label}
                        >
                          {icon.emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Selection */}
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                      Choose Color
                    </label>
                    <div className="grid grid-cols-2 gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-2xl max-h-40 overflow-y-auto">
                      {COLOR_GRADIENTS.map(color => (
                        <button
                          key={color.gradient}
                          type="button"
                          onClick={() => setForm({...form, color_gradient: color.gradient})}
                          className={`p-4 rounded-xl transition-all hover:scale-105 ${
                            form.color_gradient === color.gradient 
                              ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' 
                              : ''
                          }`}
                        >
                          <div className={`w-full h-8 ${color.preview} rounded-lg mb-2`}></div>
                          <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{color.name}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Proficiency Slider */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                    Proficiency Level: {form.proficiency}% 
                    <span className={`ml-2 text-xs font-bold px-2 py-1 rounded-full ${getProficiencyColor(form.proficiency)} bg-current bg-opacity-10`}>
                      {getProficiencyLabel(form.proficiency)}
                    </span>
                  </label>
                  <div className="relative">
                    <input 
                      type="range" 
                      name="proficiency" 
                      min="0" 
                      max="100" 
                      value={form.proficiency} 
                      onChange={handleChange}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 slider"
                      style={{
                        background: `linear-gradient(to right, rgb(59 130 246) 0%, rgb(59 130 246) ${form.proficiency}%, rgb(229 231 235) ${form.proficiency}%, rgb(229 231 235) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
                  <p className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <span>👀</span> Live Preview • Real-time sync
                  </p>
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${form.color_gradient} flex items-center justify-center text-2xl shadow-lg`}>
                        {form.icon_name}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 dark:text-white text-lg">
                          {form.title || 'Your Skill Title'}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          {form.description || 'Your skill description will appear here...'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Proficiency</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{form.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${form.color_gradient} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${form.proficiency}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button 
                    type="button" 
                    onClick={closeModal} 
                    className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSaving} 
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl"
                  >
                    {isSaving && (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    )}
                    {isSaving ? "Saving..." : (editingSkill ? "⚡ Update Instantly" : "⚡ Create Instantly")}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 