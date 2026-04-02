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
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text className={`text-3xl font-semibold ${isDark ? 'text-white' : 'text-black'} font-jetbrains-mono`}>
          My Hobbies
        </Text>
        <Text className={`text-md ${isDark ? 'text-text-primary' : 'text-text-primary-light'} opacity-60 font-jetbrains-mono`}>
          {activeHobbies} active • {totalTime} total hours
        </Text>
      </View>
      <Pressable
        onPress={onPlusPress}
        className="flex h-14 w-14 items-center justify-center  rounded-full bg-text-primary active:opacity-70">
        <Text className="text-3xl text-text-primary-light">+</Text>
      </Pressable>
    </View>
  );
};

export default HobbiesHeader;
