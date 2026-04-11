import { supabase } from '@/lib/supabase/supabase';

const signInWithPassword = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error signin in';
    return { success: false as const, errorMessage };
  }
};

export default signInWithPassword;
