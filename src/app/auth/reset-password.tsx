import { useThemeTokens } from '@/hooks/useThemeTokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import * as Linking from 'expo-linking';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { z } from 'zod';

import { AuthFormCard, AuthPrimaryButton, AuthTextField } from '@/components/Auth';
import { supabase } from '@/lib/supabase/supabase';

const resetSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type ResetFormInput = z.input<typeof resetSchema>;
type ResetFormOutput = z.output<typeof resetSchema>;

export default function ResetPasswordCallback() {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const [authError, setAuthError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormInput, unknown, ResetFormOutput>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    const handle = async (url: string | null) => {
      if (!url) return;

      const parsed = new URL(url);
      const hash = new URLSearchParams(parsed.hash.replace(/^#/, ''));
      const query = parsed.searchParams;

      const access_token = hash.get('access_token') ?? query.get('access_token');
      const refresh_token = hash.get('refresh_token') ?? query.get('refresh_token');

      if (access_token && refresh_token) {
        await supabase.auth.setSession({ access_token, refresh_token });
      }
    };

    Linking.getInitialURL().then(handle);
    const sub = Linking.addEventListener('url', (event) => handle(event.url));
    return () => sub.remove();
  }, []);

  const onSubmit = async (data: ResetFormOutput) => {
    setAuthError(null);
    setStatusMessage(null);

    const { error } = await supabase.auth.updateUser({ password: data.password });
    if (error) {
      setAuthError(error.message);
      return;
    }

    setStatusMessage('Password updated. Please log in.');
    await supabase.auth.signOut();
    router.replace('/auth/login');
  };

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        <View className="gap-2 pb-8 pt-4">
          <Text
            className={`text-md font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
            RESET PASSWORD
          </Text>
          <Text
            className={`font-handwriting-bold text-4xl ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
            Create a new password
          </Text>
          <Text
            className={`font-jetbrains-mono ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
            Make it strong and memorable.
          </Text>
        </View>

        <AuthFormCard>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthTextField
                label="New password"
                placeholder="********"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <AuthTextField
                label="Confirm new password"
                placeholder="********"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.confirmPassword?.message}
              />
            )}
          />

          {!!authError && <Text className="font-jetbrains-mono text-sm text-red-500">{authError}</Text>}
          {!!statusMessage && (
            <Text className="font-jetbrains-mono text-sm text-green-500">{statusMessage}</Text>
          )}

          <AuthPrimaryButton
            text="Update password"
            loadingText="Updating..."
            isLoading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </AuthFormCard>

        <Pressable onPress={() => router.replace('/auth/login')}>
          <Text
            className={`text-md text-center font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
            Back to login
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
