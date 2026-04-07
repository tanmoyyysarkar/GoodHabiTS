import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { View, ScrollView, Pressable, Text } from 'react-native';

const SignupScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1 pt-6" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-8 px-6"
        showsVerticalScrollIndicator={false}>
        <View>
          <Text>Hello from signup screen</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignupScreen;
