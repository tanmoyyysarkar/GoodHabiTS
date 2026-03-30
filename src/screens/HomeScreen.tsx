import StreakBox from '@/components/Home/StreakBox';
import HomeHeader from '@/components/Home/HomeHeader';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, View } from 'react-native';
import SummaryCard from '@/components/Home/SummaryCard';
import MyHobbyCard from '@/components/Home/MyHobbyCards';
import LogASessionButton from '@/components/Home/LogASessionButton';

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
      <ScrollView className="flex-1" contentContainerClassName="gap-8 px-6">
        <HomeHeader isDark={isDark} tokens={tokens} />
        <StreakBox isDark={isDark} tokens={tokens} />
        <SummaryCard isDark={isDark} tokens={tokens} />
        <MyHobbyCard isDark={isDark} tokens={tokens} />
        <LogASessionButton isDark={isDark} />
        <View className='h-24 w-max'></View>
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
