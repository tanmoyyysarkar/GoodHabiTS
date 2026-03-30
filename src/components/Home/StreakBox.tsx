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
        backgroundColor: tokens.buttonPrimaryTint,
        borderWidth: 0.5,
        borderColor: tokens.border,
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}>
      <Text className="text-4xl">🔥</Text>
      <Text
        className={`font-base flex-1 text-lg font-semibold ${
          isDark ? 'text-text-primary' : 'text-text-primary-light'
        }`}>
        12-day streak! Log a session today to keep it going.
      </Text>
    </View>
  );
};

export default StreakBox;
