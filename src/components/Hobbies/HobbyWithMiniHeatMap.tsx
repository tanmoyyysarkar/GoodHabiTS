import { getHeatMapColor } from '@/lib/colorsAndShades/getHeatMapColor';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ProgressRing } from './ProgressRing';
import { HobbyHeatmapItem } from '@/types/HobbyHeatMapItem';
import { useEffect, useState } from 'react';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface HobbyWithMiniHeatMapProps {
  isDark: boolean;
  tokens: ThemeTokens;
  data: HobbyHeatmapItem;
}

const HobbyWithMiniHeatMap = ({ isDark, tokens, data }: HobbyWithMiniHeatMapProps) => {
  const progress = (data.timeDoneToday / data.totalTimePerDay) * 100;

  const days = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

  const heatMap = data.timeDonePerDay.map((time, index) => (
    <View
      key={index}
      style={{
        backgroundColor: getHeatMapColor(time, data.totalTimePerDay, data.color, isDark),
        borderWidth: 0.5,
        borderColor: data.color,
      }}
      className={`${isDark ? 'border-border' : 'border-border-light'} h-6 w-6 rounded-md`}
    />
  ));

  const emptyHeats = Array.from({ length: data.startDay - 1 }, (_, index) => (
    <View
      key={`empty-${index}`}
      className="h-6 w-6 rounded-md"
      style={{ borderWidth: 0.5, borderColor: data.color, backgroundColor: 'transparent' }}
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

  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} gap-4 rounded-2xl border p-4`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-row gap-4">
          <View
            style={{ backgroundColor: data.color }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl">
            <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
              {data.emoji}
            </Text>
          </View>
          <View>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
              {data.name}
            </Text>
            <Text
              className={`${isDark ? 'text-text-secondary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
              {data.category} • {data.totalHours} hrs total
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
              🔥{data.streakCount}d
            </Text>
          </View>
          <View className="mt-2 h-6 w-6 items-center justify-center">
            <Animated.View style={iconStyle}>
              <Ionicons name="chevron-down-outline" size={24} color={'white'} />
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
          {data.timeDoneToday}/{data.totalTimePerDay} min today
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
                progress={75} //TODO: add logic
                size={90}
                strokeWidth={15}
                mainColor={data.color}
                isDark={isDark}
              />
              <View className="mt-2 flex items-center justify-center gap-1">
                <Text
                  className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-semibold text-[10px]`}>
                  WEEKLY AVG
                </Text>
                <Text
                  className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xs`} //TODO: Add login
                >
                  42 min
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
