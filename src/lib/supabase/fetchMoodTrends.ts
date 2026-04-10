import { supabase } from './supabase';

export type MoodVsSessionDataType = {
  id: string;
  minutes_logged: number;
  feeling: number;
};

export const fetchMoodTrends = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('id, minutes_logged, feeling')
      .eq('user_id', userId)
      .gt('minutes_logged', 0)
      .order('session_date', { ascending: true });
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Some unexpected error happened while fetching mood trends';
    return { success: false, errorMessage };
  }
};
