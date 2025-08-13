import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: supabaseUrl ? 'Set' : 'Missing',
    key: supabaseAnonKey ? 'Set' : 'Missing'
  });
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Project {
  id: string;
  title: string;
  description: string;
  short_description?: string;
  category: 'web' | 'mobile' | 'ai' | 'cloud' | 'enterprise'; // ← Updated categories
  image_url: string;
  live_url?: string;
  github_url?: string;
  case_study_url?: string; // ← New field
  technologies: string[];
  key_features?: string[]; // ← New field
  featured: boolean;
  status?: 'planning' | 'development' | 'completed' | 'archived'; // ← New field
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon_name: string;
  color_gradient: string;
  proficiency: number;
  order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'read' | 'replied';
  created_at: string;
}

export interface Profile {
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
} 