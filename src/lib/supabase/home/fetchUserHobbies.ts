import { supabase } from '@/lib/supabase/supabase';

const fetchUserHobbies = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('hobbies')
      .select('id, name, icon, streak_score, color, target_minutes, category')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false });
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Some unexpected error happened while fetching hobby data';
    return { success: false, errorMessage };
  }
};

export default fetchUserHobbies;
