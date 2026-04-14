import { Text, View } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface StreakBoxProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

const StreakBox = ({ isDark, tokens }: StreakBoxProps) => {
  return (
    <View
      className="flex-row items-center gap-4 rounded-2xl p-4"
      style={{
        borderColor: tokens.border,
          borderWidth: 0.5,
          backgroundColor: tokens.cardBgElevated,
          // shadowColor: tokens.border,
          // shadowOffset: { width: 0, height: 8 },
          // shadowOpacity: 0.25,
          // shadowRadius: 12,
          // elevation: 6,
        }}>
      <Text className="text-4xl font">🔥</Text>
      <Text
        className={`flex-1 text-lg ${
          isDark ? 'text-text-primary' : 'text-text-primary-light'
        } font-jetbrains-mono-semibold`}>
        12-day streak! Log a session today to keep it going.
      </Text>
    </View>
  );
};

export default StreakBox;
