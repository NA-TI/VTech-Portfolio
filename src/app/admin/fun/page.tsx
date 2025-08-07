"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import RichTextEditor from '@/components/RichTextEditor';

interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

interface FunInterest {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color_gradient: string;
  order_index: number;
  created_at: string;
  updated_at: string;
  styled_words?: StyledWord[];
}



// Icon options for the dropdown
const iconOptions = [
  { value: 'cube', label: '3D Cube', icon: '📦' },
  { value: 'game', label: 'Game Controller', icon: '🎮' },
  { value: 'coffee', label: 'Coffee', icon: '☕' },
  { value: 'music', label: 'Music', icon: '🎵' },
  { value: 'travel', label: 'Travel', icon: '✈️' },
  { value: 'book', label: 'Book', icon: '📚' },
  { value: 'heart', label: 'Heart', icon: '❤️' },
  { value: 'star', label: 'Star', icon: '⭐' },
  { value: 'lightbulb', label: 'Lightbulb', icon: '💡' },
  { value: 'palette', label: 'Palette', icon: '🎨' },
];

// Color gradient options
const colorOptions = [
  { value: 'from-purple-500 to-pink-500', label: 'Purple to Pink' },
  { value: 'from-blue-500 to-cyan-500', label: 'Blue to Cyan' },
  { value: 'from-green-500 to-emerald-500', label: 'Green to Emerald' },
  { value: 'from-orange-500 to-red-500', label: 'Orange to Red' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow to Orange' },
  { value: 'from-indigo-500 to-purple-500', label: 'Indigo to Purple' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink to Rose' },
  { value: 'from-teal-500 to-cyan-500', label: 'Teal to Cyan' },
];

export default function FunAdminPage() {
  const [interests, setInterests] = useState<FunInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingInterest, setEditingInterest] = useState<FunInterest | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'cube',
    color_gradient: 'from-purple-500 to-pink-500',
  });
  const [styledWords, setStyledWords] = useState<StyledWord[]>([]);

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      const { data, error } = await supabase
        .from('fun_interests')
        .select('*')
        .order('order_index');

      if (error) {
        console.error('Error fetching interests:', error);
        if (error.message.includes('relation "fun_interests" does not exist')) {
          alert('The fun_interests table does not exist. Please run the SQL setup script first.');
        } else {
          alert(`Failed to fetch interests: ${error.message}`);
        }
        throw error;
      }
      setInterests(data || []);
    } catch (error) {
      console.error('Error fetching interests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (description: string, styledWords: StyledWord[]) => {
    console.log('🔍 handleDescriptionChange called with:', { 
      description, 
      styledWords,
      descriptionLength: description.length,
      styledWordsCount: styledWords.length
    });
    setFormData(prev => ({ ...prev, description }));
    setStyledWords(styledWords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingInterest) {
      await updateInterest();
    } else {
      await createInterest();
    }
  };

  const createInterest = async () => {
    try {
      setIsCreating(true);
      
      console.log('🔍 Creating interest with styled_words:', styledWords);
      
      const { data, error } = await supabase
        .from('fun_interests')
        .insert([{
          ...formData,
          order_index: interests.length + 1,
          styled_words: styledWords,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        alert(`Failed to create interest: ${error.message}`);
        throw error;
      }

      setInterests(prev => [...prev, data]);
      resetForm();
    } catch (error) {
      console.error('Error creating interest:', error);
      if (!(error instanceof Error && error.message.includes('Failed to create interest'))) {
        alert(`Failed to create interest: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const updateInterest = async () => {
    if (!editingInterest) return;

    try {
      setIsCreating(true);
      
      console.log('🔍 Updating interest with styled_words:', styledWords);
      
      const { data, error } = await supabase
        .from('fun_interests')
        .update({
          ...formData,
          styled_words: styledWords,
        })
        .eq('id', editingInterest.id)
        .select()
        .single();

      if (error) {
        console.error('Supabase update error:', error);
        alert(`Failed to update interest: ${error.message}`);
        throw error;
      }

      setInterests(prev => prev.map(interest => 
        interest.id === editingInterest.id ? data : interest
      ));
      
      setEditingInterest(null);
      resetForm();
    } catch (error) {
      console.error('Error updating interest:', error);
      if (!(error instanceof Error && error.message.includes('Failed to update interest'))) {
        alert(`Failed to update interest: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    } finally {
      setIsCreating(false);
    }
  };

  const deleteInterest = async (id: string) => {
    try {
      setIsDeleting(id);
      
      const { error } = await supabase
        .from('fun_interests')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setInterests(prev => prev.filter(interest => interest.id !== id));
    } catch (error) {
      console.error('Error deleting interest:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  const editInterest = (interest: FunInterest) => {
    try {
      console.log('🔍 Editing interest:', interest);
      console.log('🔍 Interest styled_words:', interest.styled_words);
      
      setEditingInterest(interest);
      setFormData({
        title: interest.title,
        description: interest.description,
        icon_name: interest.icon_name,
        color_gradient: interest.color_gradient,
      });
      setStyledWords(interest.styled_words || []);
    } catch (error) {
      console.error('Error setting up edit form:', error);
      alert('Failed to load interest for editing. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon_name: 'cube',
      color_gradient: 'from-purple-500 to-pink-500',
    });
    setStyledWords([]);
    setEditingInterest(null);
  };

  const cancelEdit = () => {
    if (editingInterest) {
      // Check if there are unsaved changes
      const hasChanges = 
        formData.title !== editingInterest.title ||
        formData.description !== editingInterest.description ||
        formData.icon_name !== editingInterest.icon_name ||
        formData.color_gradient !== editingInterest.color_gradient ||
        JSON.stringify(styledWords) !== JSON.stringify(editingInterest.styled_words || []);

      if (hasChanges) {
        const confirmCancel = window.confirm('You have unsaved changes. Are you sure you want to cancel?');
        if (!confirmCancel) return;
      }

      // Restore original data when canceling
      setFormData({
        title: editingInterest.title,
        description: editingInterest.description,
        icon_name: editingInterest.icon_name,
        color_gradient: editingInterest.color_gradient,
      });
      setStyledWords(editingInterest.styled_words || []);
    }
    setEditingInterest(null);
  };

  const hasUnsavedChanges = () => {
    if (!editingInterest) return false;
    
    return (
      formData.title !== editingInterest.title ||
      formData.description !== editingInterest.description ||
      formData.icon_name !== editingInterest.icon_name ||
      formData.color_gradient !== editingInterest.color_gradient ||
      JSON.stringify(styledWords) !== JSON.stringify(editingInterest.styled_words || [])
    );
  };

  const getIconDisplay = (iconName: string) => {
    const icon = iconOptions.find(opt => opt.value === iconName);
    return icon ? icon.icon : '📦';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading interests...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Manage Fun Interests
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Edit the interests and hobbies that appear on your Fun page
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {editingInterest ? 'Edit Interest' : 'Add New Interest'}
              </h2>
              {editingInterest && hasUnsavedChanges() && (
                <span className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full">
                  Unsaved Changes
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 3D Art, Anime & Gaming"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <RichTextEditor
                  key={editingInterest?.id || 'new'} // Force re-initialization when editing different interests
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  placeholder="Describe your interest or hobby..."
                  className="w-full"
                  initialStyledWords={editingInterest?.styled_words || []}
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Icon
                </label>
                <select
                  name="icon_name"
                  value={formData.icon_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {iconOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color Gradient */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color Gradient
                </label>
                <select
                  name="color_gradient"
                  value={formData.color_gradient}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

                             {/* Preview */}
               <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                 <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Preview</h3>
                 <div className="flex items-center space-x-3">
                   <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${formData.color_gradient} flex items-center justify-center text-white text-xl`}>
                     {getIconDisplay(formData.icon_name)}
                   </div>
                   <div>
                     <h4 className="font-semibold text-gray-900 dark:text-white">{formData.title || 'Title'}</h4>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                       {formData.description || 'Description will appear here...'}
                     </p>
                   </div>
                 </div>
               </div>

                               {/* Debug Info */}
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Debug Info</h3>
                  <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    <p><strong>Styled Words Count:</strong> {styledWords.length}</p>
                    <p><strong>Styled Words:</strong> {JSON.stringify(styledWords)}</p>
                    <p><strong>Description Length:</strong> {formData.description.length}</p>
                    <p><strong>Editing Mode:</strong> {editingInterest ? 'Yes' : 'No'}</p>
                    <p><strong>Has Unsaved Changes:</strong> {hasUnsavedChanges() ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                             {/* Buttons */}
               <div className="flex space-x-4">
                 <button
                   type="submit"
                   disabled={isCreating}
                   className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                     isCreating 
                       ? 'bg-gray-400 text-white cursor-not-allowed' 
                       : hasUnsavedChanges() 
                         ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                         : 'bg-blue-600 hover:bg-blue-700 text-white'
                   }`}
                 >
                   {isCreating 
                     ? 'Saving...' 
                     : editingInterest 
                       ? (hasUnsavedChanges() ? 'Update Interest*' : 'Update Interest')
                       : 'Add Interest'
                   }
                 </button>
                 {editingInterest && (
                   <button
                     type="button"
                     onClick={cancelEdit}
                     className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
                   >
                     Cancel
                   </button>
                 )}
               </div>
            </form>
          </div>

          {/* Interests List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Current Interests ({interests.length})
            </h2>

            <div className="space-y-4">
              {interests.map((interest) => (
                <motion.div
                  key={interest.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${interest.color_gradient} flex items-center justify-center text-white text-lg`}>
                        {getIconDisplay(interest.icon_name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {interest.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {interest.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => editInterest(interest)}
                        className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                        title="Edit interest"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteInterest(interest.id)}
                        disabled={isDeleting === interest.id}
                        className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors disabled:opacity-50"
                        title="Delete interest"
                      >
                        {isDeleting === interest.id ? (
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {interests.length === 0 && (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>No interests added yet. Create your first one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 