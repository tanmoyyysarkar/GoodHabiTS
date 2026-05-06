import { supabase } from '@/lib/supabase/supabase';

const updatePassword = async (password: string) => {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password,
    });
    if (error) return { success: false as const, errorMessage: error.message };
    return { success: true as const, data };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Some unexpected error occured while updating password';
    return { success: false as const, errorMessage };
  }
};

export default updatePassword;
