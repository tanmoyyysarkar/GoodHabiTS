import { View, Text } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface HomeHeaderProps {
  greeting?: string;
  name?: string;
  avatar?: string;
  isDark: boolean;
  tokens: ThemeTokens;
}

const HomeHeader = ({
  greeting = 'Good morning',
  name = 'Arjun',
  avatar = 'AR',
  isDark,
  tokens,
}: HomeHeaderProps) => {

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <Text
          className={`text-lg ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} opacity-70`}
        >
          {greeting}.
        </Text>
        <Text
          className={`mt-2 text-4xl font-bold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}
        >
          {name} 👋
        </Text>
      </View>

      {/* Avatar with accent color */}
      <View
        className="flex h-14 w-14 items-center justify-center rounded-full"
        style={{ backgroundColor: tokens.buttonPrimary }}
      >
        <Text className="text-lg font-bold text-white">{avatar}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
