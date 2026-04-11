import { supabase } from '@/lib/supabase/supabase';

export type CurrentDaySummaryData = {
  id: string;
  name: string;
  color: string;
  target_minutes: number;
  minutes_today: number;
  sessions_today: number;
};

export const fetchCurrentDaySessions = async () => {
  try {
    const { data, error } = await supabase.rpc('get_today_hobby_and_session_stats');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error Adding a new hobby';
    return { success: false as const, errorMessage };
  }
};
