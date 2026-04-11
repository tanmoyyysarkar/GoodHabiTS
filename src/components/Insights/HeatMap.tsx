import { YearHeatMapData } from '@/lib/supabase/insights/get365DayHeatMap';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef } from 'react';
import { InteractionManager } from 'react-native';
import { ScrollView, Text, View } from 'react-native';

interface HeatMapProps {
  isDark: boolean;
  tokens: ThemeTokens;
  data: YearHeatMapData[];
}

interface HeatProps {
  value: number | null;
  isDark: boolean;
  legend?: boolean;
}

const monthLabels = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const scrollToRightEdge = (scrollViewRef: { current: ScrollView | null }) => {
  // Run after layout/interaction work to avoid race conditions where scrollToEnd is ignored.
  InteractionManager.runAfterInteractions(() => {
    requestAnimationFrame(() => {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    });
  });
};

const HeatMap = ({ isDark, tokens, data }: HeatMapProps) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const Heats = ({ value, isDark, legend = false }: HeatProps) => {
    const normalColor = isDark ? '#2db7ee' : '#0092cb';

    if (value === null) {
      return <View className="h-6 w-6 rounded-md" style={{ opacity: 0 }} />;
    }

    let opacity = '00';
    if (value > 80) opacity = 'ff';
    else if (value > 60) opacity = 'cc';
    else if (value > 40) opacity = '99';
    else if (value > 20) opacity = '66';
    else if (value > 0) opacity = '33';
    else opacity = '00';

    const heatColor = `${normalColor}${opacity}`;

    return (
      <View
        className={`${legend ? 'h-4 w-4' : ' h-6 w-6'} flex items-center justify-center rounded-md`}
        style={{ borderWidth: 0.5, borderColor: `${normalColor}80`, backgroundColor: heatColor }}>
        {value > 100 && !legend ? <Ionicons color={'#ffea00'} name="star" size={12} /> : null}
      </View>
    );
  };

  const todayDay = new Date().getDay() + 1;
  const leadingEmptyCount = (todayDay - 1 - ((data.length - 1) % 7) + 7) % 7;

  const alignedValues = useMemo(
    () => [...Array.from({ length: leadingEmptyCount }, () => null), ...data],
    [leadingEmptyCount, data]
  );

  const columns = useMemo(() => {
    const totalColumns = Math.ceil(alignedValues.length / 7);

    return Array.from({ length: totalColumns }, (_, columnIndex) =>
      Array.from({ length: 7 }, (_, rowIndex) => alignedValues[columnIndex * 7 + rowIndex] ?? null)
    );
  }, [alignedValues]);

  const monthlyLabels = useMemo(() => {
    const currentMonth = new Date().getMonth();

    return Array.from({ length: 12 }, (_, index) => {
      const monthIndex = (currentMonth - 11 + index + 12) % 12;
      return monthLabels[monthIndex];
    });
  }, []);

  const legendHeatVals = [0, 10, 21, 41, 61, 81];

  useEffect(() => {
    if (alignedValues.length === 0) return;
    scrollToRightEdge(scrollViewRef);
  }, [alignedValues.length]);

  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} h-[260px] rounded-2xl border px-6 pb-2 pt-6`}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={() => {
          scrollToRightEdge(scrollViewRef);
        }}>
        <View onLayout={() => scrollToRightEdge(scrollViewRef)}>
          <View className="flex-row items-center justify-between">
            {monthlyLabels.map((label) => (
              <Text
                key={label}
                className="font-jetbrains-mono-light text-[10px]"
                style={{ color: tokens.textPrimary }}>
                {label}
              </Text>
            ))}
          </View>
          <View className="mt-1 flex-row gap-1">
            {columns.map((column, columnIndex) => (
              <View key={`column-${columnIndex}`} className="gap-1">
                {column.map((value, rowIndex) => (
                  <Heats
                    key={`cell-${columnIndex}-${rowIndex}`}
                    isDark={isDark}
                    value={
                      value && value.total_target_minutes > 0
                        ? (value.total_minutes_logged / value.total_target_minutes) * 100
                        : null
                    }
                  />
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center justify-center gap-2">
          <Ionicons color={'#ffea00'} name="star" size={8} />
          <Text
            style={{ color: tokens.textPrimary }}
            className="mr-2 font-jetbrains-mono-light text-sm">
            Overtime
          </Text>
        </View>
        <View className="m-2 flex-row items-center justify-end gap-1">
          <Text
            style={{ color: tokens.textPrimary }}
            className="mr-2 font-jetbrains-mono-light text-sm">
            Less
          </Text>
          {legendHeatVals.map((val, index) => (
            <Heats value={val} key={index} isDark={isDark} legend={true} />
          ))}
          <Text
            style={{ color: tokens.textPrimary }}
            className="ml-2 font-jetbrains-mono-light text-sm">
            More
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeatMap;
