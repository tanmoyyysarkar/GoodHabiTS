import { supabase } from './supabase';

export type MonthlySummaryData = {
  date: string;
  completed_hobbies: number;
  total_hobbies: number;
  total_minutes: number;
};

export const fetch30dayInsights = async () => {
  try {
    const { data, error } = await supabase.rpc('get_30_day_summary_for_insights_line_chart');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetch the last 30 day insights';
    return { success: false as const, errorMessage };
  }
};
