import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase/supabase';
import { ActivityIndicator, View } from 'react-native';

export default function AuthCallback() {
  const router = useRouter();
  const hasFinished = useRef(false);

  const finish = useCallback(
    (target: '/auth/login' | '/') => {
      if (hasFinished.current) {
        return;
      }
      hasFinished.current = true;
      router.replace(target);
    },
    [router]
  );

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (hasFinished.current) {
        return;
      }

      if (!url) {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        finish(session ? '/' : '/auth/login');
        return;
      }

      if (!url.includes('auth/callback')) {
        finish('/auth/login');
        return;
      }

      try {
        const parsed = new URL(url);
        const queryParams = parsed.searchParams;
        const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ''));

        const code = queryParams.get('code');
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          finish(error ? '/auth/login' : '/');
          return;
        }

        const access_token = hashParams.get('access_token') ?? queryParams.get('access_token');
        const refresh_token =
          hashParams.get('refresh_token') ?? queryParams.get('refresh_token');

        if (!access_token || !refresh_token) {
          finish('/auth/login');
          return;
        }

        const { error } = await supabase.auth.setSession({ access_token, refresh_token });
        finish(error ? '/auth/login' : '/');
      } catch {
        finish('/auth/login');
      }
    },
    [finish]
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void handleDeepLink(null);
    }, 8000);

    const subscription = Linking.addEventListener('url', ({ url }) => {
      void handleDeepLink(url);
    });

    void Linking.getInitialURL().then((url) => {
      void handleDeepLink(url);
    });

    return () => {
      clearTimeout(timeoutId);
      subscription.remove();
    };
  }, [handleDeepLink]);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
