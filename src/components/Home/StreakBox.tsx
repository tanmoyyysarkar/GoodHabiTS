import { Text, View } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface StreakBoxProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

const StreakBox = ({ isDark, tokens }: StreakBoxProps) => {
  return (
    <View
      className="flex-row items-center gap-4 rounded-2xl p-4 border"
      style={{
        backgroundColor: tokens.cardBgElevated,
        borderColor: tokens.border
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
