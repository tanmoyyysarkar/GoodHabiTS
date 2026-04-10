import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

interface HobbyCompletionData {
  value: number;
  day: string;
}

interface TimeDoneData {
  value: number;
  day: string;
}

const getSparseDayLabel = (day: string) => {
  const dayNumber = Number(day);
  return dayNumber === 1 || dayNumber === 30 || dayNumber % 5 === 0 ? day : '';
};

const AXIS_STEP = 25;

const completionData: HobbyCompletionData[] = [
  { day: '1', value: 40 },
  { day: '2', value: 55 },
  { day: '3', value: 60 },
  { day: '4', value: 30 },
  { day: '5', value: 75 },
  { day: '6', value: 80 },
  { day: '7', value: 50 },
  { day: '8', value: 65 },
  { day: '9', value: 70 },
  { day: '10', value: 45 },
  { day: '11', value: 90 },
  { day: '12', value: 85 },
  { day: '13', value: 60 },
  { day: '14', value: 55 },
  { day: '15', value: 75 },
  { day: '16', value: 80 },
  { day: '17', value: 50 },
  { day: '18', value: 65 },
  { day: '19', value: 70 },
  { day: '20', value: 45 },
  { day: '21', value: 90 },
  { day: '22', value: 85 },
  { day: '23', value: 60 },
  { day: '24', value: 55 },
  { day: '25', value: 75 },
  { day: '26', value: 80 },
  { day: '27', value: 50 },
  { day: '28', value: 65 },
  { day: '29', value: 70 },
  { day: '30', value: 95 },
];

const timeDoneData: TimeDoneData[] = [
  { day: '1', value: 20 },
  { day: '2', value: 35 },
  { day: '3', value: 40 },
  { day: '4', value: 15 },
  { day: '5', value: 50 },
  { day: '6', value: 60 },
  { day: '7', value: 30 },
  { day: '8', value: 45 },
  { day: '9', value: 55 },
  { day: '10', value: 25 },
  { day: '11', value: 70 },
  { day: '12', value: 65 },
  { day: '13', value: 40 },
  { day: '14', value: 35 },
  { day: '15', value: 50 },
  { day: '16', value: 60 },
  { day: '17', value: 30 },
  { day: '18', value: 45 },
  { day: '19', value: 55 },
  { day: '20', value: 25 },
  { day: '21', value: 70 },
  { day: '22', value: 65 },
  { day: '23', value: 40 },
  { day: '24', value: 90 },
  { day: '25', value: 50 },
  { day: '26', value: 60 },
  { day: '27', value: 30 },
  { day: '28', value: 120 },
  { day: '29', value: 55 },
  { day: '30', value: 75 },
];

//TODO ADD REAL DATA FROM DB
interface DailySessionsLineChartProps {
  isDark: boolean;
  tokens: ThemeTokens;
  // CompletionData: HobbyCompletionData[];
  // TimeDoneData: TimeDoneData[];
}

const DailySessionsLineChart = ({ isDark, tokens }: DailySessionsLineChartProps) => {
  const completionChartData = completionData.map((item) => ({
    value: item.value,
    label: getSparseDayLabel(item.day),
  }));

  const timeDoneChartData = timeDoneData.map((item) => ({
    value: item.value,
  }));

  const highestValue = Math.max(
    //This computes the highest percentage value passed to the graph
    ...completionData.map((item) => item.value),
    ...timeDoneData.map((item) => item.value),
    100
  );
  const maxValue = Math.ceil(highestValue / AXIS_STEP) * AXIS_STEP; //This is needed so that if a person does overtime
  // the values are shown above 100% and the value for eg 150 doesnt become 100 and rest are normalized
  const noOfSections = Math.max(1, maxValue / AXIS_STEP);
  const yAxisLabelTexts = Array.from({ length: noOfSections + 1 }, (_, index) =>
    index === 0 ? '' : String(index * AXIS_STEP)
  );

  const completionColor = isDark ? '#c9a4ff' : '#9148ff';
  const timeDoneColor = isDark ? '#30b4a4' : '#009f8d';
  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} overflow-hidden rounded-2xl border p-4`}>
      <View className="mb-2 ml-8 flex-col gap-2">
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: completionColor }} />
          <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono-light text-sm">
            Hobbies Completed
          </Text>
        </View>
        <View className="flex-row items-center gap-2">
          <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: timeDoneColor }} />
          <Text style={{ color: tokens.textPrimary }} className="font-jetbrains-mono-light text-sm">
            Time spent
          </Text>
        </View>
      </View>
      <LineChart
        areaChart
        curved
        data={completionChartData}
        data2={timeDoneChartData}
        nestedScrollEnabled
        height={150}
        spacing={20}
        endSpacing={0}
        initialSpacing={4}
        yAxisThickness={0}
        xAxisThickness={0}
        maxValue={maxValue}
        noOfSections={noOfSections}
        yAxisLabelTexts={yAxisLabelTexts}
        yAxisTextStyle={{ color: tokens.textSecondary, fontSize: 10 }}
        yAxisLabelWidth={28}
        color1={completionColor}
        color2={timeDoneColor}
        textColor1="green"
        hideDataPoints
        startFillColor1={completionColor}
        startFillColor2={timeDoneColor}
        startOpacity={0.3}
        endOpacity={0}
        xAxisLabelTextStyle={{ color: tokens.textSecondary, fontSize: 10 }}
        hideRules
        rulesThickness={0}
      />
    </View>
  );
};

export default DailySessionsLineChart;
