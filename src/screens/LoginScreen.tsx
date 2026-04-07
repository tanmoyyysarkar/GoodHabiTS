import { useThemeTokens } from '@/hooks/useThemeTokens';
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
    setValue,
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

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        <View>
          <Text>WELCOME BACK</Text>
          <Text>Your Streaks are waiting for you</Text>
          <Text>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="tunamayo@gmail.com" value={value} onChangeText={onChange} />
            )}
          />
          {errors.email && <Text>{errors.email.message}</Text>}

          <Text>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput placeholder="********" value={value} onChangeText={onChange} />
            )}
          />
          {errors.password && <Text>{errors.password.message}</Text>}
        </View>

        <Pressable className="h-15 h-10 bg-red-700" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          <Text className="text-xl font-bold text-white">Submit</Text>
        </Pressable>
        <Pressable className="h-15 h-10 bg-red-700" onPress={() => router.push('/auth/signup')}>
          <Text className="text-xl font-bold text-white">GO TO Signup PAGE</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
