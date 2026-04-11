import { supabase } from '@/lib/supabase/supabase';

const softDeleteHobby = async (hobbyId: string) => {
  try {
    const { data, error } = await supabase
      .from('hobbies')
      .update({
        is_active: false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', hobbyId)
      .select()
      .single();
    if (error) return { success: false as const, errorMessage: error.message };
    return { success: true, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Some unexpected error occured during deleting a hobby';
    return { success: false as const, errorMessage };
  }
};

export default softDeleteHobby;
