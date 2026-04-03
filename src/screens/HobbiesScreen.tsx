import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import HobbiesHeader from '@/components/Hobbies/HobbiesHeader';
import SearchBox from '@/components/Hobbies/SearchBox';
import CategoryPills from '@/components/Hobbies/CategoryPills';

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
      <ScrollView className="flex-1" contentContainerClassName="gap-8 px-6">
        <HobbiesHeader isDark={isDark} tokens={tokens} activeHobbies={3} totalTime={147} />
        <SearchBox isDark={isDark} tokens={tokens}/>
        <CategoryPills isDark={isDark}/>
      </ScrollView>
    </LinearGradient>
  );
};

export default HobbiesScreen;
