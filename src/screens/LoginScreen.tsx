import { useThemeTokens } from '@/hooks/useThemeTokens';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Controller, useForm } from 'react-hook-form';
import { View, ScrollView, Pressable, Text, TextInput } from 'react-native';
import { z } from 'zod';

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

  const onSubmit = async (data: LoginFormOutput) => {
    //TODO
    console.log(data);
  };

  const inputBaseStyle = {
    borderColor: isDark ? '#6b6b6b' : '#000000',
    color: tokens.textPrimary,
    backgroundColor: isDark ? tokens.cardBgElevated : tokens.cardBg,
  } as const;

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        <View className="gap-2 pt-4 pb-16">
          <Text
            className={`font-jetbrains-mono-semibold text-md ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} pb-4`}>
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

        <View
          className={`gap-5 rounded-2xl border p-5 ${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'}`}
          style={{
            shadowColor: tokens.border,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
            elevation: 5,
          }}>
          <View className="gap-2">
            <Text
              className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="tunamayo@gmail.com"
                  placeholderTextColor={isDark ? '#8aa0cf' : '#242c40'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="rounded-xl border px-4 py-3 font-jetbrains-mono"
                  style={inputBaseStyle}
                />
              )}
            />
            {errors.email && (
              <Text className="font-jetbrains-mono text-sm text-red-500">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View className="gap-2">
            <Text
              className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="********"
                  placeholderTextColor={isDark ? '#8aa0cf' : '#242c40'}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  className="rounded-xl border px-4 py-3 font-jetbrains-mono"
                  style={inputBaseStyle}
                />
              )}
            />
            {errors.password && (
              <Text className="font-jetbrains-mono text-sm text-red-500">
                {errors.password.message}
              </Text>
            )}
          </View>

          <Pressable
            className="h-12 items-center justify-center rounded-xl"
            style={{ backgroundColor: tokens.buttonPrimary, opacity: isSubmitting ? 0.65 : 1 }}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}>
            <Text className="font-jetbrains-mono-bold text-lg text-white">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Text>
          </Pressable>

          <View className="flex-row items-center gap-3">
            <View
              className={`h-[1px] flex-1 ${isDark ? 'bg-border' : 'bg-border-light'}`}
              style={{ opacity: 0.5 }}
            />
            <Text
              className={`font-jetbrains-mono text-xs ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
              OR CONTINUE WITH
            </Text>
            <View
              className={`h-[1px] flex-1 ${isDark ? 'bg-border' : 'bg-border-light'}`}
              style={{ opacity: 0.5 }}
            />
          </View>

          <View className="flex-row justify-between">
            <Pressable
              className={`h-12 flex-row items-center justify-center gap-2 rounded-xl border ${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'}`}
              onPress={() => {
                // TODO: wire Google auth
              }}>
              <View className="flex-row gap-2 px-12">
                <Ionicons name="logo-google" size={18} color={isDark ? '#ffffff' : '#000000'} />
                <Text
                  className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
                  Google
                </Text>
              </View>
            </Pressable>

            <Pressable
              className={`h-12 flex-row items-center justify-center gap-2 rounded-xl border ${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'}`}
              onPress={() => {
                // TODO: wire Apple auth
              }}>
              <View className="flex-row gap-2 px-12">
                <Ionicons name="logo-apple" size={18} color={isDark ? '#ffffff' : '#000000'} />
                <Text
                  className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
                  Apple
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
        <View className='gap-4'>
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light '} text-center font-handwriting-bold text-xl`}>
            New Here? Start your journey today!
          </Text>
          <Pressable
            className={`h-12 items-center justify-center rounded-xl border ${isDark ? 'border-border' : 'border-border-light'}`}
            onPress={() => router.push('/auth/signup')}>
            <Text
              className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
              Create an account
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
