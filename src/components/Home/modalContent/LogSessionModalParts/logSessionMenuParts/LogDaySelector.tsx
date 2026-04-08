import { ThemeTokens } from '@/theme/tokens';
import { Pressable, Text, View } from 'react-native';

export interface DayOption {
  offset: 0 | 1 | 2 | 3;
  label: string;
  dateLabel: string;
  isoDate: string;
}

interface LogDaySelectorProps {
  dayOptions: DayOption[];
  selectedDayOffset: 0 | 1 | 2 | 3;
  onSelectDay: (offset: 0 | 1 | 2 | 3) => void;
  tokens: ThemeTokens;
  selectedColor: string;
}

const LogDaySelector = ({
  dayOptions,
  selectedDayOffset,
  onSelectDay,
  tokens,
  selectedColor,
}: LogDaySelectorProps) => {
  return (
      <View className="mb-4 flex-row flex-wrap gap-2">
        {dayOptions.map((day) => {
          const isSelected = selectedDayOffset === day.offset;

          return (
            <Pressable
              key={day.isoDate}
              className="h-16 min-w-24 flex-1 items-center justify-center rounded-2xl px-2 active:opacity-80"
              style={{
                backgroundColor: tokens.cardBgElevated,
                borderColor: isSelected ? selectedColor : tokens.border,
                borderWidth: 1,
              }}
              onPress={() => onSelectDay(day.offset)}>
              <Text
                className="font-jetbrains-mono-semibold text-sm"
                style={{ color: isSelected ? selectedColor : tokens.textPrimary }}>
                {day.label}
              </Text>
              <Text className="font-jetbrains-mono text-xs" style={{ color: tokens.textTertiary }}>
                {day.dateLabel}
              </Text>
            </Pressable>
          );
        })}
      </View>
  );
};

export default LogDaySelector;
