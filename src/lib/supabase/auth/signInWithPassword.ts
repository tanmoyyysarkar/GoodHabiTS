import { supabase } from '@/lib/supabase/supabase';
import { AuthResponsePassword } from '@supabase/supabase-js';

export type AuthFailureResult = {
  success: false;
  errorMessage: string;
};

export type PasswordSignInSuccessResult = {
  success: true;
  data: AuthResponsePassword['data'];
};

export type PasswordSignInResult = PasswordSignInSuccessResult | AuthFailureResult;

const signInWithPassword = async (
  email: string,
  password: string
): Promise<PasswordSignInResult> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false as const, errorMessage: error.message };
    }
    return { success: true as const, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error signin in';
    return { success: false as const, errorMessage };
  }
};

export default signInWithPassword;
