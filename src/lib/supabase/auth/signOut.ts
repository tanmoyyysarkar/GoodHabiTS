import { supabase } from '@/lib/supabase/supabase';

const signOut = async () => {
  try {
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error signing out!';
    return { success: false as const, errorMessage };
  }
};

export default signOut;
