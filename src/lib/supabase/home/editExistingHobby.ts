import { supabase } from '@/lib/supabase/supabase';
import { success } from 'zod';

const editExistingHobby = async (
  name: string,
  icon: string,
  color: string,
  target_minutes: number,
  days_of_week: string[],
  category: string,
  is_daily: boolean,
  id: string
) => {
  try {
    const { data, error } = await supabase
      .from('hobbies')
      .update({
        name,
        icon,
        color,
        target_minutes,
        is_daily,
        days_of_week,
        category,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();
    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Unexpected error Editing the hobby';
    return { success: false as const, errorMessage };
  }
};

export default editExistingHobby;
