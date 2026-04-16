import { useThemeTokens } from '@/hooks/useThemeTokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { z } from 'zod';

import {
  AuthDivider,
  AuthFormCard,
  AuthPrimaryButton,
  AuthSecondaryButton,
  AuthSocialButton,
  AuthTextField,
} from '@/components/Auth';
import { useAuth } from '@/context/AuthContext';
import getReadableAuthError from '@/lib/supabase/auth/getReadableAuthError';
import signInWithGoogle from '@/lib/supabase/auth/signInWithGoogle';

const signupSchema = z
  .object({
    name: z.string().min(1, 'Name is required').min(2, 'Name must be at least 2 characters'),
    email: z.string().min(1, 'Email is required').pipe(z.email('Please enter a valid email')),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormInput = z.input<typeof signupSchema>;
type SignupFormOutput = z.output<typeof signupSchema>;

const SignupScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInput, unknown, SignupFormOutput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { signup } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormOutput) => {
    setAuthError(null);
    const email = data.email;
    const password = data.password;
    const full_name = data.name;
    const result = await signup(email, password, full_name);

    if (!result.success) {
      setAuthError(result.errorMessage ?? 'Unable to create account right now. Please try again.');
    }
  };

  const googleSignIn = async () => {
    setAuthError(null);
    const { success, errorMessage } = await signInWithGoogle();
    if (!success) {
      setAuthError(getReadableAuthError(errorMessage));
      return;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="gap-8 px-6"
          showsVerticalScrollIndicator={false}>
          <View className="gap-2 pt-4">
            <Text
              className={`text-md font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
              CREATE ACCOUNT
            </Text>
            <Text
              className={`font-handwriting-bold text-4xl ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              Start your journey
            </Text>
            <Text
              className={`font-jetbrains-mono ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
              Track sessions, build streaks, and celebrate progress.
            </Text>
          </View>

          <AuthFormCard>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthTextField
                  label="Name"
                  placeholder="Tuna Mayo"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="words"
                  autoCorrect={false}
                  error={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthTextField
                  label="Email"
                  placeholder="tunamayo@gmail.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <AuthTextField
                  label="Password"
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
                  label="Confirm Password"
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

            {!!authError && (
              <Text className="font-jetbrains-mono text-sm text-red-500">{authError}</Text>
            )}

            <AuthPrimaryButton
              text="Create account"
              loadingText="Creating account..."
              isLoading={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />

            <AuthDivider text="OR CONTINUE WITH" />

            <View className="flex-row gap-3">
              <AuthSocialButton icon="logo-google" text="Google" onPress={googleSignIn} />
              <AuthSocialButton
                icon="logo-apple"
                text="Apple"
                onPress={() => {
                  // Apple auth not yet implemented
                }}
                disabled={true}
              />
            </View>
          </AuthFormCard>

          <View className="gap-4 pb-8">
            <Text
              className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light '} text-center font-handwriting-bold text-xl`}>
              Already have an account?
            </Text>
            <AuthSecondaryButton text="Sign in" onPress={() => router.push('/auth/login')} />
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
