import { MonthlySummaryData, fetch30dayInsights } from '@/lib/supabase/fetch30dayInsights';
import { ThemeTokens } from '@/theme/tokens';
import { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface HobbyCompletionData {
  value: number;
  date: string;
}

interface TimeDoneData {
  value: number;
  date: string;
}

/*
  We always render a fixed 30-day window in this chart.
  Even if backend data has gaps, the chart still shows a continuous timeline with zero-filled days.
  This keeps the X-axis stable and prevents visual "jumping" when data volume changes.
*/
const DAY_WINDOW = 30;

/*
  Converts a Date into the exact key format used by backend rows (YYYY-MM-DD).
  Matching format is important because we index Supabase rows in a Map by this key.
*/
const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/*
  We intentionally show sparse X-axis labels to avoid clutter on small screens.
  Labels are shown for:
  - the first point
  - the last point
  - every 5th point in between

  The returned label uses 2 lines (day + month) to reduce truncation risk.
*/
const getSparseDayLabel = (dateKey: string, index: number) => {
  const isSparseTick = index === 0 || index === DAY_WINDOW - 1 || (index + 1) % 5 === 0;
  if (!isSparseTick) {
    return '';
  }

  const [yearText, monthText, dayText] = dateKey.split('-');
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);

  if (!year || !month || !day) {
    return '';
  }

  const labelDate = new Date(year, month - 1, day);
  const monthShort = labelDate.toLocaleString('en-US', { month: 'short' });
  return `${day}\n${monthShort}`;
};

/*
  Left axis (% completion) is naturally easy to read with 25-point steps.
  The minutes axis can vary widely, so we choose from a list of "nice" step values.
*/
const PERCENT_AXIS_STEP = 25;

const MINUTE_AXIS_CANDIDATE_STEPS = [5, 10, 15, 20, 30, 45, 60, 90, 120];

/*
  Picks a readable minute step so right-axis labels look clean.
  We target around 4 vertical sections to balance readability and detail.
*/
const getMinuteAxisStep = (maxMinutes: number) => {
  const targetSections = 4;
  const idealStep = maxMinutes / targetSections;
  const step = MINUTE_AXIS_CANDIDATE_STEPS.find((candidate) => candidate >= idealStep);
  return step ?? MINUTE_AXIS_CANDIDATE_STEPS[MINUTE_AXIS_CANDIDATE_STEPS.length - 1];
};

/*
  Normalizes backend rows into a full, ordered 30-day series.

  Why this exists:
  - Backend may not return every day (e.g., no sessions that day).
  - Chart libraries render best with complete, predictable series.

  What we compute per day:
  - completionPercent = completed_hobbies / total_hobbies * 100 (safe zero fallback)
  - totalMinutes = total minutes logged for that date (safe zero fallback)
*/
const buildLast30DaySeries = (rows: MonthlySummaryData[]) => {
  const rowByDate = new Map(rows.map((row) => [row.date, row]));
  const completionSeries: HobbyCompletionData[] = [];
  const timeSeries: TimeDoneData[] = [];

  for (let offset = DAY_WINDOW - 1; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - offset);
    const dateKey = formatDateKey(date);
    const row = rowByDate.get(dateKey);

    const completionPercent =
      row && row.total_hobbies > 0
        ? Math.round((row.completed_hobbies / row.total_hobbies) * 100)
        : 0;
    const totalMinutes = row?.total_minutes ?? 0;

    completionSeries.push({ value: completionPercent, date: dateKey });
    timeSeries.push({ value: totalMinutes, date: dateKey });
  }

  return { completionSeries, timeSeries };
};

interface DailySessionsLineChartProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

const DailySessionsLineChart = ({ isDark, tokens }: DailySessionsLineChartProps) => {
  const [insightsRows, setInsightsRows] = useState<MonthlySummaryData[]>([]);

  /*
    One-time fetch on mount.
    If the request fails, we keep empty data so the chart still renders a 30-day zero baseline.
  */
  useEffect(() => {
    const loadMetrics = async () => {
      const { success, data, errorMessage } = await fetch30dayInsights();
      if (!success) {
        console.error(errorMessage);
        return;
      }
      setInsightsRows((data as MonthlySummaryData[] | undefined) ?? []);
    };

    void loadMetrics();
  }, []);

  const { completionSeries, timeSeries } = useMemo(
    () => buildLast30DaySeries(insightsRows),
    [insightsRows]
  );

  /*
    Primary line data (completion %) includes sparse labels on X-axis.
    Secondary line data (minutes) only needs values because labels come from the primary series dates.
  */
  const completionChartData = completionSeries.map((item, index) => ({
    value: item.value,
    label: getSparseDayLabel(item.date, index),
  }));

  const timeDoneChartData = timeSeries.map((item) => ({
    value: item.value,
  }));

  /*
    Left axis scaling (percentage):
    - Ensure the axis can always show up to at least 100%.
    - If values exceed 100, extend to the next 25-step boundary.
  */
  const highestCompletion = Math.max(...completionSeries.map((item) => item.value), 100);
  const percentMaxValue = Math.ceil(highestCompletion / PERCENT_AXIS_STEP) * PERCENT_AXIS_STEP;
  const percentNoOfSections = Math.max(1, percentMaxValue / PERCENT_AXIS_STEP);

  /*
    Right axis scaling (minutes):
    - Compute max minute value in the current window.
    - Choose a human-friendly step (5, 10, 15, ...).
    - Build labels from top to bottom so the manual axis aligns visually with chart sections.
  */
  const highestMinutes = Math.max(...timeSeries.map((item) => item.value), 0);
  const minuteAxisStep = getMinuteAxisStep(highestMinutes);
  const minuteNoOfSections = Math.max(1, Math.ceil(highestMinutes / minuteAxisStep));
  const minuteMaxValue = minuteNoOfSections * minuteAxisStep;
  const minuteAxisLabels = Array.from(
    { length: minuteNoOfSections + 1 },
    (_, index) => `${minuteMaxValue - index * minuteAxisStep}m`
  );

  const completionColor = isDark ? '#c9a4ff' : '#9148ff';
  const timeDoneColor = isDark ? '#30b4a4' : '#009f8d';
  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-2xl border p-4`}>
      <View className="mb-2 ml-8 flex-col gap-2">
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: completionColor }} />
          <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono-light text-sm">
            Hobbies Completed (%)
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: timeDoneColor }} />
          <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono-light text-sm">
            Time spent (mins)
          </Text>
        </View>
      </View>
      <View className="flex-row items-start">
        <View className="flex-1">
          <LineChart
            /*
              Dual-axis setup:
              - `data` (primary) uses left % axis.
              - `secondaryData` uses an independent minutes scale.

              Note: we intentionally hide gifted-chart's secondary Y-axis text and
              render our own right-side labels in a sibling View. This avoids an
              intermittent visibility issue where the library axis can be clipped
              or not shown depending on container/layout conditions.
            */
            areaChart
            curved
            data={completionChartData}
            secondaryData={timeDoneChartData}
            secondaryLineConfig={{
              areaChart: true,
              color: timeDoneColor,
              hideDataPoints: true,
              startFillColor: timeDoneColor,
              endFillColor: timeDoneColor,
              startOpacity: 0.3,
              endOpacity: 0,
            }}
            secondaryYAxis={{
              yAxisSide: 1,
              maxValue: minuteMaxValue,
              noOfSections: minuteNoOfSections,
              yAxisLabelSuffix: 'm',
              hideYAxisText: true,
              yAxisLabelWidth: 36,
              yAxisTextStyle: { color: tokens.textSecondary, fontSize: 10 },
              yAxisThickness: 0,
              yAxisColor: 'transparent',
            }}
            scrollToEnd
            scrollAnimation={false}
            height={150}
            spacing={20}
            endSpacing={0}
            initialSpacing={4}
            yAxisThickness={0}
            xAxisThickness={0}
            maxValue={percentMaxValue}
            noOfSections={percentNoOfSections}
            yAxisLabelSuffix="%"
            yAxisTextStyle={{ color: tokens.textSecondary, fontSize: 10 }}
            yAxisLabelWidth={28}
            color1={completionColor}
            hideDataPoints
            startFillColor1={completionColor}
            startOpacity={0.3}
            endOpacity={0}
            xAxisTextNumberOfLines={2}
            xAxisLabelsHeight={28}
            xAxisLabelTextStyle={{ color: tokens.textSecondary, fontSize: 10 }}
            hideRules
            rulesThickness={0}
          />
        </View>
        {/*
          Manual right axis for minutes.
          This guarantees a visible minutes scale and keeps formatting consistent (`Xm`).
        */}
        <View style={{ width: 36, height: 150 }} className="ml-1 justify-between">
          {minuteAxisLabels.map((label) => (
            <Text key={label} style={{ color: tokens.textSecondary, fontSize: 10 }}>
              {label}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DailySessionsLineChart;
