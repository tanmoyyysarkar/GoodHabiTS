import { supabase } from '@/lib/supabase/supabase';
import { AuthResponse } from '@supabase/supabase-js';
import { AuthFailureResult } from './signInWithPassword';

export type SignUpSuccessResult = {
  success: true;
  data: AuthResponse['data'];
};

export type SignUpResult = SignUpSuccessResult | AuthFailureResult;

const signUp = async (
  email: string,
  password: string,
  full_name: string
): Promise<SignUpResult> => {
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

    return { success: true as const, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unexpected error signing up';
    return { success: false as const, errorMessage };
  }
};

export default signUp;
