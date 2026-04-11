import { supabase } from '@/lib/supabase/supabase';

export type YearHeatMapData = {
  date: string;
  total_minutes_logged: number;
  total_target_minutes: number;
};

export const get365HeatMap = async () => {
  try {
    const { data, error } = await supabase.rpc('get_365_day_heatmap');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetching the data for 365 days';
    return { success: false as const, errorMessage };
  }
};
