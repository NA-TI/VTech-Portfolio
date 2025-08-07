import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface StyledWord {
  word: string;
  style: 'bold' | 'italic' | 'color' | 'bold-color' | 'italic-color';
  color?: string;
}

export interface FunInterest {
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



export function useFunInterests() {
  const [interests, setInterests] = useState<FunInterest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('fun_interests')
        .select('*')
        .order('order_index');

      if (error) throw error;

      console.log('🔍 useFunInterests Debug:');
      console.log('• Raw data from database:', data);
      console.log('• Data length:', data?.length);
      if (data && data.length > 0) {
        console.log('• First interest styled_words:', data[0].styled_words);
        console.log('• styled_words type:', typeof data[0].styled_words);
        console.log('• styled_words is array:', Array.isArray(data[0].styled_words));
      }

      setInterests(data || []);
    } catch (err) {
      console.error('Error fetching fun interests:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch interests');
    } finally {
      setLoading(false);
    }
  };

  return { interests, loading, error, refetch: fetchInterests };
} 