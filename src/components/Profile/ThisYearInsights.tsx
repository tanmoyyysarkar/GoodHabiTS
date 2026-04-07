import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';

interface ThisYearInsightItem {
  name: string;
  value: string;
}

interface ThisYearInsightsProps {
  isDark: boolean;
  data: ThisYearInsightItem[];
  tokens: ThemeTokens;
}

const ThisYearInsights = ({ isDark, data, tokens }: ThisYearInsightsProps) => {
  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} w-full rounded-2xl border p-4`}
      style={{
        borderWidth: 1,
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}>
      {data.map((item, index) => {
        const isLast = index === data.length - 1;

        return (
          <View key={item.name}>
            <View className="flex-row items-center justify-between py-3">
              <Text
                className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jakarta-sans-light text-base`}>
                {item.name}
              </Text>
              <Text
                className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-base`}>
                {item.value}
              </Text>
            </View>
            {!isLast ? (
              <View
                className="w-full"
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: tokens.border,
                  opacity: isDark ? 0.95 : 0.85,
                }}
              />
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

export default ThisYearInsights;
