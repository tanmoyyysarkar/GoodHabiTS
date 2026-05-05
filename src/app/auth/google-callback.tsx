import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { supabase } from '@/lib/supabase/supabase';
import { ActivityIndicator, View } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';

export default function AuthCallback() {
  const router = useRouter();
  const tokens = useThemeTokens();

  useEffect(() => {
    let isMounted = true;

    const redirectFromSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) return;
      router.replace(session ? '/' : '/auth/login');
    };

    const processCallbackUrl = async (url: string | null) => {
      // If there is no callback URL payload, fall back to current session state.
      if (!url || !url.includes('auth/callback')) {
        await redirectFromSession();
        return;
      }

      const parsed = new URL(url);
      const queryParams = parsed.searchParams;
      const hashParams = new URLSearchParams(parsed.hash.replace(/^#/, ''));

      const code = queryParams.get('code');
      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          if (isMounted) router.replace('/auth/login');
          return;
        }

        await redirectFromSession();
        return;
      }

      const access_token = hashParams.get('access_token') ?? queryParams.get('access_token');
      const refresh_token = hashParams.get('refresh_token') ?? queryParams.get('refresh_token');

      if (!access_token || !refresh_token) {
        if (isMounted) router.replace('/auth/login');
        return;
      }

      const { error } = await supabase.auth.setSession({ access_token, refresh_token });
      if (error) {
        if (isMounted) router.replace('/auth/login');
        return;
      }

      await redirectFromSession();
    };

    Linking.getInitialURL().then(processCallbackUrl);

    const subscription = Linking.addEventListener('url', (event) => {
      processCallbackUrl(event.url);
    });

    return () => {
      isMounted = false;
      subscription.remove();
    };
  }, []);

  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: tokens.cardBg }}>
      <ActivityIndicator size="large" color={tokens.textPrimary} />
    </View>
  );
}
