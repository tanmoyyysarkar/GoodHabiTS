import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import HobbiesHeader from '@/components/Hobbies/HobbiesHeader';

const HobbiesScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  return (
    <LinearGradient
      colors={tokens.pageBg as unknown as [string, string, ...string[]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 pt-8">
      <ScrollView className="flex-1 px-6" contentContainerClassName="flex-1 items-center">
        <HobbiesHeader isDark={isDark} tokens={tokens} activeHobbies={3} totalTime={147}/>
      </ScrollView>
    </LinearGradient>
  );
};

export default HobbiesScreen;
