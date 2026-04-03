import { View, Text, Pressable } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface HomeHeaderProps {
  greeting?: string;
  name?: string;
  avatar?: string;
  isDark: boolean;
  tokens: ThemeTokens;
  onProfilePress?: () => void;
}

const HomeHeader = ({
  greeting = 'Good morning',
  name = 'Arjun',
  avatar = 'AR',
  isDark,
  tokens,
  onProfilePress,
}: HomeHeaderProps) => {

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text
          className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} opacity-70 font-jetbrains-mono-semibold`}
        >
          {greeting}.
        </Text>
        <Text
          className={`mt-2 text-4xl font-handwriting-bold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}
        >
          {name} 👋
        </Text>
      </View>

      {/* Avatar with accent color */}
      <Pressable
        onPress={onProfilePress}
        className="flex h-14 w-14 items-center justify-center rounded-full active:opacity-70"
        style={{ backgroundColor: tokens.buttonPrimary }}
      >
        <Text className="text-lg font-jetbrains-mono-bold text-white">{avatar}</Text>
      </Pressable>
    </View>
  );
};

export default HomeHeader;
