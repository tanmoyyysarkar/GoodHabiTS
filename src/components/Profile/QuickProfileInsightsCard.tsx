import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';

interface QuickProfileInsightsCardProps {
  name: string;
  value: number;
  tokens: ThemeTokens;
  isDark: boolean;
}

const QuickProfileInsightsCard = ({
  name,
  value,
  isDark,
  tokens,
}: QuickProfileInsightsCardProps) => {
  return (
    <View

      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-elevated-light'} h-20 w-32 rounded-2xl flex justify-center items-center`}
      style={{
          borderWidth: 1,
          shadowColor: tokens.border,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        }}>
      <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>{value}</Text>
      <Text className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jakarta-sans-light text-sm`}>
        {name}
      </Text>
    </View>
  );
};

export default QuickProfileInsightsCard;
