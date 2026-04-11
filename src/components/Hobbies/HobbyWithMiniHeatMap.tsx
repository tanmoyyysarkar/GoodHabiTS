import { getHeatMapColor } from '@/lib/colorsAndShades/getHeatMapColor';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ProgressRing } from './ProgressRing';
import { useEffect, useState } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { MonthlySummaryData } from '@/lib/supabase/hobbies/getHobby30DaySummary';

interface HobbyWithMiniHeatMapProps {
  isDark: boolean;
  tokens: ThemeTokens;
  data: MonthlySummaryData;
}

const HobbyWithMiniHeatMap = ({ isDark, tokens, data }: HobbyWithMiniHeatMapProps) => {
  const progress = (data.last_30_days_minutes[29] / data.target_minutes) * 100;

  const days = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

  const heatMap = data.last_30_days_minutes.map((time, index) => (
    <View
      key={index}
      style={{
        backgroundColor: getHeatMapColor(time, data.target_minutes, data.color, isDark),
        borderWidth: 0.5,
        borderColor: data.color,
      }}
      className={`${isDark ? 'border-border' : 'border-border-light'} h-6 w-6 rounded-md`}
    />
  ));

  const todayDay = new Date().getDay() + 1; // 1..7, Sun..Sat
  const leadingEmptyCount = (todayDay - 1 - ((data.last_30_days_minutes.length - 1) % 7) + 7) % 7;

  const emptyHeats = Array.from({ length: leadingEmptyCount }, (_, index) => (
    <View
      key={`empty-${index}`}
      className="h-6 w-6 rounded-md"
      style={{ backgroundColor: 'transparent' }}
    />
  ));

  const heatMapAligned = [...emptyHeats, ...heatMap];

  const [isExpanded, setIsExpanded] = useState(false);
  const animatedProgress = useSharedValue(0);

  const contentStyle = useAnimatedStyle(() => {
    const maxHeight = interpolate(animatedProgress.value, [0, 1], [0, 320]);
    return {
      maxHeight,
      opacity: animatedProgress.value,
      overflow: 'hidden',
    };
  });

  const iconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(animatedProgress.value, [0, 1], [180, 0]);
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  useEffect(() => {
    animatedProgress.value = withTiming(isExpanded ? 1 : 0, {
      duration: 500,
      easing: Easing.out(Easing.cubic),
    });
  }, [isExpanded, animatedProgress]);

  const handlePress = () => {
    setIsExpanded((prev) => !prev);
  };

  const totalHoursDoneThisMonth = data.last_30_days_minutes.reduce(
    (total, item) => total + item,
    0
  );
  const ringProgress = Math.floor((totalHoursDoneThisMonth / (data.target_minutes * 30)) * 100);
  const monthlyAverageMins = Math.floor(totalHoursDoneThisMonth / 30);
  return (
    <View
      className={`${isDark ? 'bg-card-bg' : 'bg-card-bg-light'} gap-4 rounded-2xl p-4`}
      style={{
        borderWidth: 0.5,
        borderColor: data.color,
        shadowColor: data.color,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row gap-4">
          <View
            style={{ backgroundColor: `${data.color}70`, borderWidth: 1, borderColor: data.color }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl">
            <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-xl`}>
              {data.icon}
            </Text>
          </View>
          <View>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              {data.name}
            </Text>
            <Text
              className={`${isDark ? 'text-text-secondary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
              {data.category} • {totalHoursDoneThisMonth} hrs total
            </Text>
          </View>
        </View>

        <Pressable
          onPress={handlePress}
          accessibilityState={{ expanded: isExpanded }}
          className="items-center self-start">
          <View
            style={{ backgroundColor: data.color }}
            className="flex h-6 items-center justify-center rounded-full px-2">
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
              🔥{data.streak_score}d
            </Text>
          </View>
          <View className="mt-2 h-6 w-6 items-center justify-center">
            <Animated.View style={iconStyle}>
              <Ionicons name="chevron-up-outline" size={24} color={tokens.textPrimary} />
            </Animated.View>
          </View>
        </Pressable>
      </View>
      <View className="flex-row items-center justify-between gap-4">
        <View
          className={`${isDark ? 'bg-card-bg-elevated' : 'bg-card-bg-elevated-light'} h-2 flex-1 rounded-full`}>
          <View
            style={{ backgroundColor: data.color, width: `${progress}%` }}
            className="h-2 rounded-full"
          />
        </View>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-xs`}>
          {data.last_30_days_minutes[29]}/{data.target_minutes} min today
        </Text>
      </View>

      <Animated.View style={contentStyle}>
        <View>
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
                progress={ringProgress} //TODO: add logic
                size={90}
                strokeWidth={15}
                mainColor={data.color}
                isDark={isDark}
              />
              <View className="mt-2 flex items-center justify-center gap-1">
                <Text
                  className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-semibold text-[10px]`}>
                  MONTHLY AVG
                </Text>
                <Text
                  className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xs`} //TODO: Add login
                >
                  {monthlyAverageMins} min
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default HobbyWithMiniHeatMap;
