import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '@/lib/supabase/supabase';

WebBrowser.maybeCompleteAuthSession();

const signInWithGoogle = async () => {
  try {
    const redirectTo = makeRedirectUri({
      scheme: 'good-habits',
      path: 'auth/callback',
    });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        skipBrowserRedirect: true,
      },
    });

    if (error) {
      return { success: false as const, errorMessage: error.message };
    }

    if (!data?.url) {
      return {
        success: false as const,
        errorMessage: 'Google OAuth URL was not returned by Supabase',
      };
    }

    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (res.type === 'success') {
      // The callback screen handles parsing tokens and setSession.
      return { success: true };
    }

    if (res.type === 'cancel') {
      return { success: false as const, errorMessage: 'Google sign-in was cancelled' };
    }

    if (res.type === 'dismiss') {
      return { success: false as const, errorMessage: 'Google sign-in was dismissed' };
    }

    return { success: false as const, errorMessage: 'Google sign-in did not complete' };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Some unexpected error happened during SignInWithGoogle';
    return { success: false as const, errorMessage };
  }
};

export default signInWithGoogle;
