import { ThemeTokens } from '@/theme/tokens';
import { useState } from 'react';
import { LayoutChangeEvent, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface MoodVsSessionGraphProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

interface MoodVsSessionDataType {
  session_id: string;
  minutes_logged: number;
  feeling: number;
}

const feelingToEmoji = [
  { emoji: '😫', value: 1 },
  { emoji: '😕', value: 2 },
  { emoji: '🙂', value: 3 },
  { emoji: '😁', value: 4 },
  { emoji: '🤩', value: 5 },
];

const moodVsSessionRawData: MoodVsSessionDataType[] = Array.from({ length: 50 }, (_, i) => ({
  //RANDOM MOCK DATA
  session_id: (i + 1).toString(),
  minutes_logged: (Math.floor(Math.random() * 12) + 1) * 5, // 5–60 mins
  feeling: Math.floor(Math.random() * 5) + 1, // 1–5
}));

const AXIS_STEP = 15;

const MoodVsSessionGraph = ({ isDark, tokens }: MoodVsSessionGraphProps) => {

  const moodStats = moodVsSessionRawData.reduce(
    (acc, item) => {
      if (!acc[item.feeling]) {
        acc[item.feeling] = { total: 0, count: 0 };
      }

      acc[item.feeling].total += item.minutes_logged;
      acc[item.feeling].count += 1;

      return acc;
    },
    {} as Record<number, { total: number; count: number }>
  );

  const chartData = feelingToEmoji.map((mood) => {
    const stats = moodStats[mood.value];

    const avg = stats && stats.count > 0 ? Math.round(stats.total / stats.count) : 0;

    return {
      value: avg,
      label: mood.emoji,
    };
  });

  const highestValue = Math.max(...chartData.map((point) => point.value), AXIS_STEP);
  const maxValue = Math.ceil(highestValue / AXIS_STEP) * AXIS_STEP;
  const noOfSections = Math.max(1, maxValue / AXIS_STEP);
  const yAxisLabelTexts = Array.from(
    { length: noOfSections + 1 },
    (_, index) => String(index * AXIS_STEP)
  );

  const chartColor = isDark ? '#ff1fff' : '#fff';

  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-2xl border p-3`}>
      <LineChart
        data={chartData}
        height={120}
        areaChart
        curved
        spacing={70}
        disableScroll
        initialSpacing={10}
        endSpacing={0}
        maxValue={maxValue}
        noOfSections={noOfSections}
        yAxisLabelTexts={yAxisLabelTexts}
        color={chartColor}
        startFillColor={chartColor}
        endFillColor={chartColor}
        startOpacity={0.3}
        endOpacity={0}
        hideRules
        yAxisTextStyle={{ color: tokens.textSecondary }}
        xAxisLabelTextStyle={{ color: tokens.textSecondary }}
        hideDataPoints
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </View>
  );
};

export default MoodVsSessionGraph;
