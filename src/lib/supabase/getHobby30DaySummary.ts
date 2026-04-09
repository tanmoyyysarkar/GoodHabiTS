import { supabase } from './supabase';

export type MonthlySummaryData = {
  hobby_id: string;
  name: string;
  icon: string;
  color: string;
  streak_score: number;
  target_minutes: number;
  category: string;
  last_30_days_minutes: number[];
};

export const getHobby30DaySummary = async () => {
  try {
    const { data, error } = await supabase.rpc('get_hobby_30day_summary');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetch the last 30 days summary';
    return { success: false as const, errorMessage };
  }
};
