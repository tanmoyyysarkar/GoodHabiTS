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

    if (error) return { success: false as const, errorMessage: error.message };
    if (!data?.url) return { success: false as const, errorMessage: 'No OAuth URL returned' };

    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);

    if (res.type !== 'success') {
      const messages = {
        cancel: 'Google sign-in was cancelled',
        dismiss: 'Google sign-in was dismissed',
      };
      return {
        success: false as const,
        errorMessage: messages[res.type as 'cancel' | 'dismiss'] ?? 'Google sign-in did not complete',
      };
    }

    if (!res.url) {
      return { success: false as const, errorMessage: 'Google sign-in did not return a callback URL' };
    }

    // ✅ URL is right here — parse it immediately, no deep link needed
    const parsed = new URL(res.url);
    const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ''));
    const queryParams = parsed.searchParams;

    // Try PKCE code exchange first, then fall back to implicit tokens
    const code = queryParams.get('code');
    if (code) {
      const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) return { success: false as const, errorMessage: exchangeError.message };

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return { success: false as const, errorMessage: 'No active session after code exchange' };

      return { success: true as const };
    }

    const access_token = hashParams.get('access_token') ?? queryParams.get('access_token');
    const refresh_token = hashParams.get('refresh_token') ?? queryParams.get('refresh_token');

    if (!access_token || !refresh_token) {
      return { success: false as const, errorMessage: 'No auth tokens returned' };
    }

    const { error: sessionError } = await supabase.auth.setSession({ access_token, refresh_token });
    if (sessionError) return { success: false as const, errorMessage: sessionError.message };

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return { success: false as const, errorMessage: 'No active session after token set' };

    return { success: true as const };

  } catch (error) {
    return {
      success: false as const,
      errorMessage: error instanceof Error ? error.message : 'Unexpected error during Google sign-in',
    };
  }
};

export default signInWithGoogle;
