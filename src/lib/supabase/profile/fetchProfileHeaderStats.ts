import { supabase } from '@/lib/supabase/supabase';

export type ProfileHeaderStatsData = {
  total_minutes: number;
  streak: number;
  total_hobbies: number;
};

export const fetchProfileHeaderStats = async () => {
  try {
    const { data, error } = await supabase.rpc('get_my_profile_header_stats');
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error fetching profile header stats';
    return { success: false as const, errorMessage };
  }
};
