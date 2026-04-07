import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { View, ScrollView, Pressable, Text } from 'react-native';

const LoginScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const router = useRouter();

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        <View>
          <Text>Hello from new login screen</Text>
        </View>
        <Pressable className="h-30 h-20 bg-red-700" onPress={() => router.push('/auth/signup')}>
          <Text className="text-xl font-bold text-white">GO TO Signup PAGE</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
