import DailySessionsLineChart from '@/components/Insights/DailySessionsLineChart';
import InsightsSubHeadingText from '@/components/Insights/InsightsSubHeading';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const InsightsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [isPageScrollEnabled, setIsPageScrollEnabled] = useState(true);

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-1 pt-8 px-6"
        scrollEnabled={isPageScrollEnabled}
        nestedScrollEnabled
        directionalLockEnabled>
        <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono text-3xl">
          Insights
        </Text>
        <InsightsSubHeadingText isDark={isDark} text="DAILY SESSIONS" />
        <DailySessionsLineChart
          isDark={isDark}
          tokens={tokens}
          onInteractionStart={() => setIsPageScrollEnabled(false)}
          onInteractionEnd={() => setIsPageScrollEnabled(true)}
        />
        <InsightsSubHeadingText isDark={isDark} text="ACTIVITY HEATMAP" />
        <InsightsSubHeadingText isDark={isDark} text="CATEGORY BREAKDOWN" />
        <InsightsSubHeadingText isDark={isDark} text="MOOD VS SESSIONS" />
      </ScrollView>
    </View>
  );
};

export default InsightsScreen;
