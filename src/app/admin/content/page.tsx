"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

// Icons
const SaveIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
);

const ResetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,4 23,10 17,10"/>
    <polyline points="1,20 1,14 7,14"/>
    <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <line x1="10" y1="11" x2="10" y2="17"/>
    <line x1="14" y1="11" x2="14" y2="17"/>
  </svg>
);

interface SiteContent {
  homepage: any;
  company: any;
  navigation: any;
  footer: any;
  about: any;
  services: any;
  contact: any;
  seo: any;
}

export default function ContentManagementPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('homepage');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'homepage', label: 'Homepage', description: 'Hero, services, testimonials sections' },
    { id: 'company', label: 'Company Info', description: 'Business details and contact info' },
    { id: 'navigation', label: 'Navigation', description: 'Menu items and brand settings' },
    { id: 'footer', label: 'Footer', description: 'Footer links and social media' },
    { id: 'about', label: 'About Page', description: 'About page content and sections' },
    { id: 'services', label: 'Services Page', description: 'Services page content' },
    { id: 'contact', label: 'Contact Page', description: 'Contact page content' },
    { id: 'seo', label: 'SEO & Meta', description: 'Default meta tags and SEO settings' }
  ];

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/content', { 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Request': 'true'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setContent(data.data);
        console.log('Admin content loaded from:', data.source || 'database');
      } else {
        toast.error('Failed to load content');
      }
    } catch (error) {
      console.error('Load content error:', error);
      toast.error('Failed to load content');
    } finally {
      setIsLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;

    try {
      setIsSaving(true);
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(content)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Content saved successfully');
        setHasChanges(false);
      } else {
        toast.error('Failed to save content');
      }
    } catch (error) {
      console.error('Save content error:', error);
      toast.error('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  const updateContent = (section: string, field: string, value: any) => {
    if (!content) return;
    
    setContent(prev => {
      if (!prev) return prev;
      
      const newContent = { ...prev };
      const keys = field.split('.');
      let current = newContent[section as keyof SiteContent];
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
    
    setHasChanges(true);
  };

  const addArrayItem = (section: string, field: string, defaultItem: any) => {
    if (!content) return;
    
    setContent(prev => {
      if (!prev) return prev;
      
      const newContent = { ...prev };
      const keys = field.split('.');
      let current = newContent[section as keyof SiteContent];
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      if (!Array.isArray(current[keys[keys.length - 1]])) {
        current[keys[keys.length - 1]] = [];
      }
      
      current[keys[keys.length - 1]].push({ ...defaultItem });
      return newContent;
    });
    
    setHasChanges(true);
  };

  const removeArrayItem = (section: string, field: string, index: number) => {
    if (!content) return;
    
    setContent(prev => {
      if (!prev) return prev;
      
      const newContent = { ...prev };
      const keys = field.split('.');
      let current = newContent[section as keyof SiteContent];
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      if (Array.isArray(current[keys[keys.length - 1]])) {
        current[keys[keys.length - 1]].splice(index, 1);
      }
      
      return newContent;
    });
    
    setHasChanges(true);
  };

  const renderFormField = (
    section: string,
    field: string,
    label: string,
    value: any,
    type: 'text' | 'textarea' | 'email' | 'url' | 'boolean' | 'array' = 'text',
    placeholder?: string
  ) => {
    if (type === 'boolean') {
      return (
        <div key={field} className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateContent(section, field, e.target.checked)}
              className="w-4 h-4 text-slate-600 bg-gray-50 border-gray-300 rounded focus:ring-slate-500 focus:ring-2"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
          </label>
        </div>
      );
    }

    if (type === 'textarea') {
      return (
        <div key={field} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <textarea
            value={value || ''}
            onChange={(e) => updateContent(section, field, e.target.value)}
            placeholder={placeholder}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 resize-none"
          />
        </div>
      );
    }

    return (
      <div key={field} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <input
          type={type}
          value={value || ''}
          onChange={(e) => updateContent(section, field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
        />
      </div>
    );
  };

  const renderArrayField = (section: string, field: string, label: string, items: any[], itemTemplate: any) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <button
            onClick={() => addArrayItem(section, field, itemTemplate)}
            className="inline-flex items-center space-x-1 px-3 py-1 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm"
          >
            <PlusIcon />
            <span>Add</span>
          </button>
        </div>
        
        {items && items.map((item, index) => (
          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {label.slice(0, -1)} {index + 1}
              </span>
              <button
                onClick={() => removeArrayItem(section, field, index)}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
            
            {Object.keys(itemTemplate).map(key => (
              <div key={key}>
                <input
                  type="text"
                  value={item[key] || ''}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[index] = { ...newItems[index], [key]: e.target.value };
                    updateContent(section, field, newItems);
                  }}
                  placeholder={`Enter ${key}...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 dark:border-gray-600 focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    if (!content) return null;

    const sectionContent = content[activeTab as keyof SiteContent];
    
    switch (activeTab) {
      case 'homepage':
        return (
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Hero Section</h3>
              <div className="grid grid-cols-1 gap-4">
                {renderFormField('homepage', 'hero.title', 'Main Title', sectionContent?.hero?.title, 'text', 'Enter main hero title...')}
                {renderFormField('homepage', 'hero.subtitle', 'Subtitle', sectionContent?.hero?.subtitle, 'text', 'Enter subtitle...')}
                {renderFormField('homepage', 'hero.description', 'Description', sectionContent?.hero?.description, 'textarea', 'Enter hero description...')}
                {renderFormField('homepage', 'hero.primaryButton', 'Primary Button Text', sectionContent?.hero?.primaryButton, 'text', 'Enter button text...')}
                {renderFormField('homepage', 'hero.secondaryButton', 'Secondary Button Text', sectionContent?.hero?.secondaryButton, 'text', 'Enter button text...')}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Section</h3>
              <div className="grid grid-cols-1 gap-4">
                {renderFormField('homepage', 'services.title', 'Section Title', sectionContent?.services?.title)}
                {renderFormField('homepage', 'services.subtitle', 'Section Subtitle', sectionContent?.services?.subtitle)}
                {renderFormField('homepage', 'services.description', 'Section Description', sectionContent?.services?.description, 'textarea')}
                {renderFormField('homepage', 'services.ctaText', 'CTA Button Text', sectionContent?.services?.ctaText)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call to Action</h3>
              <div className="grid grid-cols-1 gap-4">
                {renderFormField('homepage', 'cta.title', 'CTA Title', sectionContent?.cta?.title)}
                {renderFormField('homepage', 'cta.description', 'CTA Description', sectionContent?.cta?.description, 'textarea')}
                {renderFormField('homepage', 'cta.buttonText', 'Button Text', sectionContent?.cta?.buttonText)}
              </div>
            </div>
          </div>
        );

      case 'company':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Company Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderFormField('company', 'name', 'Company Name', sectionContent?.name)}
                {renderFormField('company', 'tagline', 'Tagline', sectionContent?.tagline)}
                {renderFormField('company', 'email', 'Email', sectionContent?.email, 'email')}
                {renderFormField('company', 'phone', 'Phone', sectionContent?.phone)}
                {renderFormField('company', 'address', 'Address', sectionContent?.address)}
                {renderFormField('company', 'logo', 'Logo URL', sectionContent?.logo, 'url')}
              </div>
              <div className="mt-4">
                {renderFormField('company', 'bio', 'Company Bio', sectionContent?.bio, 'textarea')}
                {renderFormField('company', 'available', 'Available for Projects', sectionContent?.available, 'boolean')}
              </div>
            </div>
          </div>
        );

      case 'navigation':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Navigation Settings</h3>
              <div className="space-y-4">
                {renderFormField('navigation', 'brand', 'Brand Name', sectionContent?.brand)}
                {renderArrayField('navigation', 'items', 'Navigation Items', sectionContent?.items || [], { label: '', href: '', icon: '' })}
              </div>
            </div>
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Footer Content</h3>
              <div className="space-y-4">
                {renderFormField('footer', 'description', 'Footer Description', sectionContent?.description, 'textarea')}
                {renderFormField('footer', 'copyright', 'Copyright Text', sectionContent?.copyright)}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Footer Columns</h3>
              {renderArrayField('footer', 'columns', 'Footer Columns', sectionContent?.columns || [], { title: '', links: [] })}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Media</h3>
              {renderArrayField('footer', 'social', 'Social Links', sectionContent?.social || [], { platform: '', url: '', icon: '' })}
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Hero Section</h3>
              <div className="space-y-4">
                {renderFormField('about', 'hero.title', 'Page Title', sectionContent?.hero?.title)}
                {renderFormField('about', 'hero.subtitle', 'Page Subtitle', sectionContent?.hero?.subtitle)}
                {renderFormField('about', 'hero.description', 'Page Description', sectionContent?.hero?.description, 'textarea')}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About Sections</h3>
              {renderArrayField('about', 'sections', 'About Sections', sectionContent?.sections || [], { title: '', content: '', image: '' })}
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Services Hero Section</h3>
              <div className="space-y-4">
                {renderFormField('services', 'hero.title', 'Page Title', sectionContent?.hero?.title)}
                {renderFormField('services', 'hero.subtitle', 'Page Subtitle', sectionContent?.hero?.subtitle)}
                {renderFormField('services', 'hero.description', 'Page Description', sectionContent?.hero?.description, 'textarea')}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Call to Action</h3>
              <div className="space-y-4">
                {renderFormField('services', 'cta.title', 'CTA Title', sectionContent?.cta?.title)}
                {renderFormField('services', 'cta.description', 'CTA Description', sectionContent?.cta?.description, 'textarea')}
                {renderFormField('services', 'cta.buttonText', 'Button Text', sectionContent?.cta?.buttonText)}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Hero Section</h3>
              <div className="space-y-4">
                {renderFormField('contact', 'hero.title', 'Page Title', sectionContent?.hero?.title)}
                {renderFormField('contact', 'hero.subtitle', 'Page Subtitle', sectionContent?.hero?.subtitle)}
                {renderFormField('contact', 'hero.description', 'Page Description', sectionContent?.hero?.description, 'textarea')}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
              <div className="space-y-4">
                {renderFormField('contact', 'info.title', 'Info Section Title', sectionContent?.info?.title)}
                {renderFormField('contact', 'info.description', 'Info Description', sectionContent?.info?.description, 'textarea')}
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SEO Settings</h3>
              <div className="space-y-4">
                {renderFormField('seo', 'defaultTitle', 'Default Page Title', sectionContent?.defaultTitle)}
                {renderFormField('seo', 'defaultDescription', 'Default Meta Description', sectionContent?.defaultDescription, 'textarea')}
                {renderFormField('seo', 'ogImage', 'Default OG Image URL', sectionContent?.ogImage, 'url')}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">Select a tab to edit content.</p>
          </div>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Content Management</h1>
            <p className="text-gray-600 dark:text-gray-400">Edit all website content from one place</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={loadContent}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ResetIcon />
              <span>Reset</span>
            </button>
            
            <button
              onClick={saveContent}
              disabled={isSaving || !hasChanges}
              className="inline-flex items-center space-x-2 px-6 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <SaveIcon />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>

        {hasChanges && (
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              You have unsaved changes. Don't forget to save your work!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Tabs */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-slate-800 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="font-medium text-sm">{tab.label}</div>
                    <div className="text-xs opacity-75 mt-1">{tab.description}</div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
