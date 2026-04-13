import { View, Text, Pressable } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface HobbiesHeaderProps {
  activeHobbies: number;
  totalTime: number;
  isDark: boolean;
  tokens: ThemeTokens;
  onPlusPress?: () => void;
}

const HobbiesHeader = ({
  isDark,
  tokens,
  onPlusPress,
  activeHobbies,
  totalTime,
}: HobbiesHeaderProps) => {
  return (
    <View>
        <Text
          className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-black'} font-jetbrains-mono`}>
          My Hobbies
        </Text>
        <Text
          className={`text-md ${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono opacity-60`}>
          {activeHobbies} active • {totalTime} total hours
        </Text>
    </View>
  );
};

export default HobbiesHeader;
