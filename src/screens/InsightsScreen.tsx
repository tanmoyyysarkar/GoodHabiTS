import CategoryBreakDown from '@/components/Insights/CategoryBreakDown';
import DailySessionsLineChart from '@/components/Insights/DailySessionsLineChart';
import HeatMap from '@/components/Insights/HeatMap';
import InsightsSubHeadingText from '@/components/Insights/InsightsSubHeading';
import MoodVsSessionGraph from '@/components/Insights/MoodVsSessionGraph';
import { useThemeTokens } from '@/hooks/useThemeTokens';
import { useColorScheme } from 'nativewind';
import { ScrollView, Text, View, RefreshControl } from 'react-native';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';

import { MonthlySummaryData, fetch30dayInsights } from '@/lib/supabase/insights/fetch30dayInsights';
import { get365HeatMap, YearHeatMapData } from '@/lib/supabase/insights/get365DayHeatMap';
import {
  CategoryDataType,
  getCategoryDistribution,
} from '@/lib/supabase/insights/getCategoryDistribution';
import { fetchMoodTrends, MoodVsSessionDataType } from '@/lib/supabase/insights/fetchMoodTrends';

const InsightsScreen = () => {
  const tokens = useThemeTokens();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { session } = useAuth();

  /*
    This is for the Dual Axis line chart
  */
  const [dataFor30DayLineChart, setDataFor30DayLineChart] = useState<MonthlySummaryData[]>([]);
  const loadMetricsFor30DayLineChart = async () => {
    const { success, data, errorMessage } = await fetch30dayInsights();
    if (!success) {
      console.error(errorMessage);
      return;
    }
    setDataFor30DayLineChart((data as MonthlySummaryData[] | undefined) ?? []);
  };

  /*
    This is for the 365day HeatMap
  */
  const [dataFor365DayHeatMap, setDataFor365DayHeatMap] = useState<YearHeatMapData[]>([]);
  const loadMetricsFor365DayHeatMap = async () => {
    const { success, data, errorMessage } = await get365HeatMap();
    if (!success) {
      console.error(errorMessage);
      return;
    }
    setDataFor365DayHeatMap((data as YearHeatMapData[] | undefined) ?? []);
  };

  /*
    This is for the Category Breakdown Pie Chart
  */
  const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
  const loadMetricsForCategoryBreakdown = async () => {
    const { success, data, errorMessage } = await getCategoryDistribution();
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setCategoryData((data as CategoryDataType[] | undefined) ?? []);
  };

  /*
    This is for the Mood Vs Sessions Scatter Plot
  */
  const [scatterPlotData, setScatterPlotData] = useState<MoodVsSessionDataType[]>([]);
  const loadMetricsForScatterPlot = async () => {
    if (!session) return;
    const { success, data, errorMessage } = await fetchMoodTrends(session.user.id);
    if (!success) {
      console.log(errorMessage);
      return;
    }
    setScatterPlotData((data as MoodVsSessionDataType[]) ?? []);
  };

  useEffect(() => {
    if (!session) return;
    void loadMetricsFor30DayLineChart();
    void loadMetricsFor365DayHeatMap();
    void loadMetricsForCategoryBreakdown();
    void loadMetricsForScatterPlot();
  }, [session]);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    if (!session) return;
    setRefreshing(true);

    await Promise.all([
      loadMetricsFor30DayLineChart(),
      loadMetricsFor365DayHeatMap(),
      loadMetricsForCategoryBreakdown(),
      loadMetricsForScatterPlot(),
    ]);

    setRefreshing(false);
  };

  return (
    <View className="flex-1" style={{ backgroundColor: tokens.pageBg }}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="pt-8 px-6 pb-24"
        nestedScrollEnabled
        directionalLockEnabled
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono text-3xl">
          Insights
        </Text>
        <InsightsSubHeadingText isDark={isDark} text="DAILY SESSIONS" />
        <DailySessionsLineChart isDark={isDark} tokens={tokens} data={dataFor30DayLineChart} />

        <InsightsSubHeadingText isDark={isDark} text="ACTIVITY HEATMAP" />
        <HeatMap isDark={isDark} tokens={tokens} data={dataFor365DayHeatMap} />

        <InsightsSubHeadingText isDark={isDark} text="CATEGORY BREAKDOWN" />
        <CategoryBreakDown isDark={isDark} tokens={tokens} data={categoryData} />

        <InsightsSubHeadingText isDark={isDark} text="MOOD VS SESSIONS" />
        <MoodVsSessionGraph isDark={isDark} tokens={tokens} data={scatterPlotData} />

        <View className="h-6" />
      </ScrollView>
    </View>
  );
};

export default InsightsScreen;
