import { supabase } from '@/lib/supabase/supabase';

export type CategoryDataType = {
  category: string
  total_minutes: number;
};

export const getCategoryDistribution = async () => {
  try {
    const { data, error } = await supabase.rpc('get_category_distribution');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetching the category data';
    return { success: false as const, errorMessage };
  }
};
