import { useThemeTokens } from '@/hooks/useThemeTokens';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, Text } from 'react-native';
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
import signInWithGoogle from '@/lib/supabase/auth/signInWithGoogle';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').pipe(z.email('Please enter a valid email')),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

type LoginFormInput = z.input<typeof loginSchema>;
type LoginFormOutput = z.output<typeof loginSchema>;

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

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormOutput) => {
    const email = data.email;
    const password = data.password;
    console.log('submitted credentials:', data);  //delete later
    await login(email, password);
  };

  const googleSignIn = async () => {
    const { success, errorMessage } = await signInWithGoogle();
    if (!success) {
      console.log(errorMessage);
      return;
    }
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

        <AuthFormCard>
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

          <AuthPrimaryButton
            text="Sign In"
            loadingText="Signing in..."
            isLoading={isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />

          <AuthDivider text="OR CONTINUE WITH" />

          <View className="flex-row gap-3">
            <AuthSocialButton
              icon="logo-google"
              text="Google"
              onPress={signInWithGoogle}
            />
            <AuthSocialButton
              icon="logo-apple"
              text="Apple"
              onPress={() => {
                // TODO: wire Apple auth
              }}
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
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
