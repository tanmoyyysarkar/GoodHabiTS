import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Animated, LayoutAnimation } from 'react-native';
import { useEffect, useRef } from 'react';
import { ThemeTokens } from '@/theme/tokens';
import { CurrentDaySummaryData } from '@/lib/supabase/fetchCurrentDaySessions';

interface SummaryCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
  summaryData: CurrentDaySummaryData[];
}

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SummaryCard = ({ isDark, tokens, summaryData }: SummaryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const arrowRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const expandProgress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const [renderExtraItems, setRenderExtraItems] = useState(isExpanded);
  const [extraContentHeight, setExtraContentHeight] = useState(0);

  const now = new Date();
  const todayDateLabel = `${WEEKDAY_NAMES[now.getDay()]}, ${MONTH_NAMES[now.getMonth()]} ${now.getDate()}`;

  const todayStatsData = [
    {
      name: 'sessions',
      value: summaryData.reduce((total, item) => total + item.sessions_today, 0),
    },
    {
      name: 'minutes',
      value: summaryData.reduce((total, item) => total + item.minutes_today, 0),
    },
    {
      name: 'hobbies',
      value: summaryData.length,
    },
  ];

  const statsCards = todayStatsData.map((data) => (
    <View
      style={{
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.5,
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

  const progressBars = [...summaryData].sort((a, b) => b.minutes_today - a.minutes_today).map((data, index) => {
    const progress = (data.minutes_today / data.target_minutes) * 100;

    return (
      <View key={`${data.name}-${index}`} className="gap-2 pb-4">
        <View className="flex-row items-center gap-2">
          <View className="h-3 w-3 rounded-full" style={{ backgroundColor: data.color }} />
          <Text
            className={`flex-1 font-medium ${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold`}>
            {data.name}
          </Text>
          <Text
            className={`text-sm ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono`}>
            {data.minutes_today} / {data.target_minutes} min
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

  const visibleProgressBars = progressBars.slice(0, 3);
  const extendedProgressBars = progressBars.slice(3);

  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: isExpanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [arrowRotation, isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      setRenderExtraItems(true);
    }

    Animated.timing(expandProgress, {
      toValue: isExpanded ? 1 : 0,
      duration: 260,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isExpanded) {
        setRenderExtraItems(false);
      }
    });
  }, [expandProgress, isExpanded]);

  const handleArrowPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded((currentValue) => !currentValue);
  };

  const rotate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const animatedExtraHeight = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(extraContentHeight, 1)],
  });
  const animatedExtraTranslateY = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 0],
  });

  return (
    <View>
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 font-jetbrains-mono opacity-70`}>
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
          className={`${isDark ? `text-text-secondary` : `text-text-secondary-light`} pb-4 font-jetbrains-mono-semibold`}>
          {todayDateLabel}
        </Text>
        <View className="mb-2 flex-row flex-wrap justify-between">{statsCards}</View>
        {visibleProgressBars}
        {extendedProgressBars.length > 0 ? (
          <>
            {renderExtraItems ? (
              <Animated.View
                style={{
                  height: animatedExtraHeight,
                  opacity: expandProgress,
                  transform: [{ translateY: animatedExtraTranslateY }],
                  overflow: 'hidden',
                }}>
                <View
                  onLayout={(event) => {
                    const nextHeight = event.nativeEvent.layout.height;
                    if (nextHeight > 0 && nextHeight !== extraContentHeight) {
                      setExtraContentHeight(nextHeight);
                    }
                  }}>
                  {extendedProgressBars}
                </View>
              </Animated.View>
            ) : null}
            <Pressable
              onPress={handleArrowPress}
              className="mt-1 flex w-full items-center justify-center py-1">
              <Animated.View style={{ transform: [{ rotate }] }}>
                <Ionicons name="chevron-down-outline" size={22} color={tokens.textPrimary} />
              </Animated.View>
            </Pressable>
          </>
        ) : null}
      </View>
    </View>
  );
};

export default SummaryCard;
