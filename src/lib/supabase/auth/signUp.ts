import { supabase } from '@/lib/supabase/supabase';

const signUp = async (email: string, password: string, full_name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          avatar_url: '',
        },
      },
    });

    if (error) {
      return { success: false as const, errorMessage: error.message };
    }

    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error signing up';
    return { success: false as const, errorMessage };
  }
};

export default signUp;
