import { ThemeTokens } from '@/theme/tokens';
import { View, Text, Animated, Pressable } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { formatMinutes } from './formatMinutes';
import { AddHobbyFormInput, AddHobbyFormOutput } from '@/types/addHobbyModalTypes';
import { useEffect, useRef } from 'react';

interface daySchema {
  val: string;
  isSelected: boolean;
}

interface TimeSelectionSliderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  control: Control<AddHobbyFormInput, unknown, AddHobbyFormOutput>;
  selectedColor: string;
  days: daySchema[];
  onDayPillPress: (val: string) => void;
}

interface DayPillProps {
  day: daySchema;
  tokens: ThemeTokens;
  selectedColor: string;
  onPress: () => void;
}

const DayPill = ({ day, tokens, selectedColor, onPress }: DayPillProps) => {
  const scaleAnim = useRef(new Animated.Value(day.isSelected ? 1.08 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: day.isSelected ? 1.08 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [day.isSelected, scaleAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          className="h-10 w-12 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: day.isSelected ? `${selectedColor}70` : tokens.cardBgElevated,
            borderColor: day.isSelected ? selectedColor : tokens.border,
          }}>
          <Text
            className="text-md font-jetbrains-mono-light"
            style={{
              color: tokens.textPrimary,
            }}>
            {day.val}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const TimeSelectionSlider = ({
  control,
  isDark,
  selectedColor,
  tokens,
  days,
  onDayPillPress,
}: TimeSelectionSliderProps) => {
  return (
    <View className={`${isDark ? 'border-border' : 'border-border-light'} rounded-2xl border p-4`}>
      <Controller
        control={control}
        name="minutesPerDay"
        render={({ field: { onChange, value } }) => {
          const minutesPerDay = typeof value === 'number' ? value : 30;

          return (
            <View>
              <View
                className="mb-4 flex h-20 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: `${selectedColor}70`,
                  borderWidth: 1,
                  borderColor: selectedColor,
                }}>
                <Text
                  className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-4xl`}>
                  {formatMinutes(minutesPerDay)}
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text
                  className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} w-10 font-jetbrains-mono-light text-sm`}>
                  15m
                </Text>
                <Slider
                  minimumValue={15}
                  maximumValue={360}
                  step={15}
                  value={minutesPerDay}
                  onValueChange={onChange}
                  minimumTrackTintColor={selectedColor}
                  maximumTrackTintColor={tokens.border}
                  thumbTintColor={selectedColor}
                  style={{ flex: 1 }}
                />
                <Text
                  className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} w-10 text-right font-jetbrains-mono-light text-sm`}>
                  6h
                </Text>
              </View>
            </View>
          );
        }}
      />
      <View className="mt-6 flex-row items-center justify-between">
        {days.map((day) => {
          return (
            <DayPill
              key={day.val}
              day={day}
              selectedColor={selectedColor}
              tokens={tokens}
              onPress={() => onDayPillPress(day.val)}
            />
          );
        })}
      </View>
    </View>
  );
};

export default TimeSelectionSlider;
