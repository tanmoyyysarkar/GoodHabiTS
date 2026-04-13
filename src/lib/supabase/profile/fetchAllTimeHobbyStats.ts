import { supabase } from '@/lib/supabase/supabase';

export type YearHeatMapData = {
  date: string;
  total_minutes_logged: number;
  total_target_minutes: number;
};

export const fetchAllTimeHobbyStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_my_hobby_stats_all_time');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetching all time hobby stats';
    return { success: false as const, errorMessage };
  }
};
