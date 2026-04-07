import { Text, View } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface SummaryCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

const todayStatsData = [
  {
    name: 'sessions',
    value: 3,
  },
  {
    name: 'minutes',
    value: 85,
  },
  {
    name: 'hobbies',
    value: 3,
  },
];

const hobbyProgressData = [
  {
    name: 'Guitar',
    color: '#9500ff',
    totalTime: 90,
    timeDone: 60,
  },
  {
    name: 'Running',
    color: '#1cc099',
    totalTime: 60,
    timeDone: 30,
  },
  {
    name: 'Sketching',
    color: '#ee4242',
    totalTime: 30,
    timeDone: 50,
  },
];

const SummaryCard = ({ isDark, tokens }: SummaryCardProps) => {
  const statsCards = todayStatsData.map((data) => (
    <View
      style={{
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.50,
        shadowRadius: 12,
        elevation: 3,
      }}
      key={data.name}
      className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-20 w-[105px] items-center justify-center rounded-2xl border p-2`}>
      <Text className={`${isDark ? `text-white` : `text-black`} font-jetbrains-mono-bold text-2xl`}>
        {data.value}
      </Text>
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-secondary-light`} font-jetbrains-mono text-sm`}>
        {data.name}
      </Text>
    </View>
  ));

  const progressBars = hobbyProgressData.map((data) => {
    const progress = (data.timeDone / data.totalTime) * 100;
    return (
      <View key={data.name} className="gap-2 pb-4">
        <View className="flex-row items-center gap-2">
          <View className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
          <Text
            className={`flex-1 font-medium ${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold`}>
            {data.name}
          </Text>
          <Text
            className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono`}>
            {data.timeDone} / {data.totalTime} min
          </Text>
        </View>
        <View
          className={`h-2 overflow-hidden rounded-full ${
            isDark ? 'bg-card-bg-elevated' : 'bg-card-bg-elevated-light'
          }`}>
          <View
            className="h-full rounded-full"
            style={{
              backgroundColor: data.color,
              width: `${progress}%`,
            }}
          />
        </View>
      </View>
    );
  });

  return (
    <View>
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} font-jetbrains-mono pb-4 opacity-70`}>
        TODAY'S SUMMARY
      </Text>
      <View
        className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-2xl border p-4`}
        style={{
          borderWidth: 1,
          shadowColor: tokens.border,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 12,
          elevation: 6,
        }}>
        <Text
          className={`${isDark ? `text-text-secondary` : `text-text-secondary-light`} font-jetbrains-mono-semibold pb-4`}>
          Sunday, March 29
        </Text>
        <View className="mb-2 flex-row flex-wrap justify-between">{statsCards}</View>
        {progressBars}
      </View>
    </View>
  );
};

export default SummaryCard;
