import StreakBox from '@/components/StreakBox';
import HomeHeader from '@/components/HomeHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import SummaryCard from '@/components/SummaryCard';

const HomeScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <LinearGradient
      colors={tokens.pageBg as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 pt-8">
      <View className="flex-1 px-6 gap-8">
        <HomeHeader isDark={isDark} tokens={tokens} />
        <StreakBox isDark={isDark} tokens={tokens} />
        <SummaryCard isDark={isDark} tokens={tokens} />
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;
