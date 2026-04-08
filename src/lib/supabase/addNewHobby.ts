import { supabase } from './supabase';

const addNewHobby = async (
  name: string,
  icon: string,
  color: string,
  target_minutes: number,
  days_of_week: string[],
  is_daily: boolean
) => {
  try {
    const { data, error } = await supabase
      .from('hobbies')
      .insert([
        {
          name,
          icon,
          color,
          target_minutes,
          days_of_week,
          is_daily,
        },
      ])
      .select()
      .single();
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

export default addNewHobby;
