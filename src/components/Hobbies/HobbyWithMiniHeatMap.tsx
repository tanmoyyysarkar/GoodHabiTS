import { getHeatMapColor } from '@/lib/colorsAndShades/getHeatMapColor';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ProgressRing } from './ProgressRing';

interface HobbyWithMiniHeatMapProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

type HobbyHeatmapItem = {
  name: string;
  color: string;
  category: string;
  emoji: string;
  totalHours: number;
  streakCount: number;
  totalTimePerDay: number;
  timeDoneToday: number;
  timeDonePerDay: number[];
  startDay: number; //sun = 1 -> sat = 7
};

export const HobbyData: HobbyHeatmapItem = {
  name: 'Guitar',
  color: '#504aa6b9',
  category: 'Creative',
  emoji: '🎸',
  totalHours: 68,
  streakCount: 12,
  totalTimePerDay: 90,
  timeDoneToday: 60,
  timeDonePerDay: [
    0, 15, 20, 10, 35, 45, 25, 30, 55, 40, 20, 0, 15, 25, 40, 60, 50, 30, 20, 10, 45, 55, 30, 35,
    25, 15, 20, 10, 50, 60,
  ],
  startDay: 5, //thu -> 5
};

const HobbyWithMiniHeatMap = ({ isDark, tokens }: HobbyWithMiniHeatMapProps) => {
  const progress = (HobbyData.timeDoneToday / HobbyData.totalTimePerDay) * 100;

  const days = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

  const heatMap = HobbyData.timeDonePerDay.map((time, index) => (
    <View
      key={index}
      style={{
        backgroundColor: getHeatMapColor(time, HobbyData.totalTimePerDay, HobbyData.color, isDark),
        borderWidth: 0.5,
        borderColor: HobbyData.color,
      }}
      className={`${isDark ? 'border-border' : 'border-border-light'} h-6 w-6 rounded-md`}
    />
  ));

  const emptyHeats = Array.from({ length: HobbyData.startDay - 1 }, (_, index) => (
    <View
      key={`empty-${index}`}
      className="h-6 w-6 rounded-md"
      style={{ borderWidth: 0.5, borderColor: HobbyData.color, backgroundColor: 'transparent' }}
    />
  ));

  const heatMapAligned = [...emptyHeats, ...heatMap];

  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} gap-4 rounded-2xl border p-4`}>
      <View className="flex-row justify-between">
        <View className="flex-row gap-4">
          <View
            style={{ backgroundColor: HobbyData.color }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl">
            <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              {HobbyData.emoji}
            </Text>
          </View>
          <View>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              {HobbyData.name}
            </Text>
            <Text
              className={`${isDark ? 'text-text-secondary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
              {HobbyData.category} • {HobbyData.totalHours} hrs total
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-center">
          <View
            style={{ backgroundColor: HobbyData.color }}
            className="flex h-6 items-center justify-center rounded-full px-2">
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
              🔥{HobbyData.streakCount}d
            </Text>
          </View>
          <Pressable className="mt-2 flex-1">
            <Ionicons name="chevron-down-outline" size={24} color={'white'} />
          </Pressable>
        </View>
      </View>
      <View className="flex-row items-center justify-between gap-4">
        <View
          className={`${isDark ? 'bg-card-bg-elevated' : 'bg-card-bg-elevated-light'} h-2 flex-1 rounded-full`}>
          <View
            style={{ backgroundColor: HobbyData.color, width: `${progress}%` }}
            className="h-2 rounded-full"
          />
        </View>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-xs`}>
          {HobbyData.timeDoneToday}/{HobbyData.totalTimePerDay} min today
        </Text>
      </View>
      <View className="flex-row items-center justify-between pr-6">
        <View className="gap-2">
          <View className="flex-row gap-1">
            {days.map((day) => (
              <View key={day} className="flex h-6 w-6 items-center justify-center">
                <Text
                  className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono-light text-sm`}>
                  {day}
                </Text>
              </View>
            ))}
          </View>
          <View className="w-[192px] flex-row flex-wrap gap-1">{heatMapAligned}</View>
        </View>
        <View className="flex items-center justify-between p-1">
          <ProgressRing
            progress={75}   //TODO: add logic
            size={90}
            strokeWidth={15}
            mainColor={HobbyData.color}
            isDark={isDark}
          />
          <View className="mt-2 flex items-center justify-center gap-1">
            <Text
              className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-semibold text-[10px]`}>
              WEEKLY AVG
            </Text>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xs`}  //TODO: Add login
              >
              42 min
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HobbyWithMiniHeatMap;
