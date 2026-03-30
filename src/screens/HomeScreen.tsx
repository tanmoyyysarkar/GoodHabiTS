import StreakBox from '@/components/StreakBox';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text } from 'react-native';

const HomeScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <LinearGradient
      colors={tokens.pageBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      {/* Header Section */}
      <View className="mx-6 my-8 flex-row items-center justify-between">
        <View className="flex-1">
          <Text 
            className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} opacity-70`}
          >
            Good morning.
          </Text>
          <Text 
            className={`mt-2 text-4xl font-bold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}
          >
            Arjun 👋
          </Text>
        </View>

        {/* Avatar with accent color */}
        <View 
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: tokens.accent }}
        >
          <Text className="text-lg font-bold text-white">AR</Text>
        </View>
      </View>

      {/* Streak Box */}
      <View className="flex-1 px-6">
        <StreakBox />
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
