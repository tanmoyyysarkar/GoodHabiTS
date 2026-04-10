import CategoryBreakDown from '@/components/Insights/CategoryBreakDown';
import DailySessionsLineChart from '@/components/Insights/DailySessionsLineChart';
import InsightsSubHeadingText from '@/components/Insights/InsightsSubHeading';
import MoodVsSessionGraph from '@/components/Insights/MoodVsSessionGraph';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, View } from 'react-native';

const InsightsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pt-8 px-6 pb-24"
        nestedScrollEnabled
        directionalLockEnabled>
        <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono text-3xl">
          Insights
        </Text>
        <InsightsSubHeadingText isDark={isDark} text="DAILY SESSIONS" />
        <DailySessionsLineChart isDark={isDark} tokens={tokens} />
        <InsightsSubHeadingText isDark={isDark} text="ACTIVITY HEATMAP" />
        <InsightsSubHeadingText isDark={isDark} text="CATEGORY BREAKDOWN" />
        <CategoryBreakDown isDark={isDark} tokens={tokens} />
        <InsightsSubHeadingText isDark={isDark} text="MOOD VS SESSIONS" />
        <MoodVsSessionGraph isDark={isDark} tokens={tokens} />
        <View className='h-6'/>
      </ScrollView>
    </View>
  );
};

export default InsightsScreen;
