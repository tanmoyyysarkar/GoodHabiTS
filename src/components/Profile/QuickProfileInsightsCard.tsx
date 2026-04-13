import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';

interface QuickProfileInsightsCardProps {
  totalMinutes: number;
  bestStreak: number;
  hobbyCount: number;
  tokens: ThemeTokens;
  isDark: boolean;
}

const QuickProfileInsightsCard = ({
  totalMinutes,
  bestStreak,
  hobbyCount,
  tokens,
  isDark,
}: QuickProfileInsightsCardProps) => {
  const hours = Math.floor(totalMinutes / 60);
  return (
    <View className="flex-row items-center justify-between">
      <View
        className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-elevated-light'} flex h-20 w-32 items-center justify-center rounded-2xl`}
        style={{
          borderWidth: 1,
          shadowColor: tokens.border,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        }}>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          {hours}
        </Text>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jakarta-sans-light text-sm`}>
          Total hrs
        </Text>
      </View>

      <View
        className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-elevated-light'} flex h-20 w-32 items-center justify-center rounded-2xl`}
        style={{
          borderWidth: 1,
          shadowColor: tokens.border,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        }}>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          {bestStreak}
        </Text>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jakarta-sans-light text-sm`}>
          best streak
        </Text>
      </View>

      <View
        className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-elevated-light'} flex h-20 w-32 items-center justify-center rounded-2xl`}
        style={{
          borderWidth: 1,
          shadowColor: tokens.border,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        }}>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          {hobbyCount}
        </Text>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jakarta-sans-light text-sm`}>
          hobbies
        </Text>
      </View>
    </View>
  );
};

export default QuickProfileInsightsCard;
