import { useThemeTokens } from '@/hooks/useThemeTokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, Text, Pressable } from 'react-native';
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
import resetPassword from '@/lib/supabase/auth/resetPassword';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Please enter a valid email')),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Please enter a valid email')),
});

type LoginFormInput = z.input<typeof loginSchema>;
type LoginFormOutput = z.output<typeof loginSchema>;
type ForgotPasswordInput = z.input<typeof forgotPasswordSchema>;
type ForgotPasswordOutput = z.output<typeof forgotPasswordSchema>;

const LoginScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput, unknown, LoginFormOutput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control: forgotControl,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors, isSubmitting: isForgotSubmitting },
  } = useForm<ForgotPasswordInput, unknown, ForgotPasswordOutput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const { login } = useAuth();
  const [authError, setAuthError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormOutput) => {
    setAuthError(null);
    const email = data.email;
    const password = data.password;
    const result = await login(email, password);

    if (!result.success) {
      setAuthError(result.errorMessage ?? 'Unable to sign in right now. Please try again.');
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

  const [showForgotPasswordMenu, setShowForgotPasswordMenu] = useState(false);
  const sendRecoveryLink = async (email: string) => {
    console.log(email);
    try {
      const { success, data, errorMessage } = await resetPassword(email);
      if (success) console.log('yay');
      else console.log(errorMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        {showForgotPasswordMenu ? (
          <>
            <View className="gap-2 pb-8 pt-4">
              <Text
                className={`text-md font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
                FORGOT YOUR PASSWORD?
              </Text>
              <Text
                className={`font-handwriting-bold text-4xl ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
                Send a recovery link...
              </Text>
            </View>

            <AuthFormCard key="forgot-password-form">
              <Controller
                control={forgotControl}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <AuthTextField
                    label="Email"
                    placeholder="tuna@mayo.com"
                    value={value ?? ''}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    error={forgotErrors.email?.message}
                  />
                )}
              />
              <AuthPrimaryButton
                text="Send recovery link"
                isLoading={isForgotSubmitting}
                onPress={handleForgotSubmit((data) => sendRecoveryLink(data.email))}
              />
            </AuthFormCard>

            <View className="gap-2 pb-8 pt-4">
              <Pressable onPress={() => setShowForgotPasswordMenu(false)}>
                <Text
                  className={`text-md text-center font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
                  Go Back
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <View className="gap-2 pb-8 pt-4">
              <Text
                className={`text-md font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
                WELCOME BACK
              </Text>
              <Text
                className={`font-handwriting-bold text-4xl ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
                Let&apos;s continue your streak
              </Text>
              <Text
                className={`font-jetbrains-mono ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
                Your habits are waiting.
              </Text>
            </View>

            <AuthFormCard key="login-form">
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

              {!!authError && (
                <Text className="font-jetbrains-mono text-sm text-red-500">{authError}</Text>
              )}

              <AuthPrimaryButton
                text="Log In"
                loadingText="Signing in..."
                isLoading={isSubmitting}
                onPress={handleSubmit(onSubmit)}
              />

              <Pressable onPress={() => setShowForgotPasswordMenu(true)}>
                <Text
                  className={`font-jetbrains-mono-bold text-sm ${isDark ? 'text-text-primary' : 'text-text-primary-light'} py-2`}>
                  Forgot Password?
                </Text>
              </Pressable>

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

            <View className="gap-4">
              <Text
                className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light '} text-center font-handwriting-bold text-xl`}>
                New Here? Start your journey today!
              </Text>
              <AuthSecondaryButton
                text="Create an account"
                onPress={() => router.push('/auth/signup')}
              />
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
