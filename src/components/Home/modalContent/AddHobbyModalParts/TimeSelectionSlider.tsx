import { ThemeTokens } from '@/theme/tokens';
import { View, Text } from 'react-native';
import { Control, Controller } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { formatMinutes } from './formatMinutes';
import { AddHobbyFormInput, AddHobbyFormOutput } from '@/types/addHobbyModalTypes';

interface TimeSelectionSliderProps {
  isDark: boolean;
  tokens: ThemeTokens;
  control: Control<AddHobbyFormInput, unknown, AddHobbyFormOutput>;
  selectedColor: string;
}

const TimeSelectionSlider = ({
  control,
  isDark,
  selectedColor,
  tokens,
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
    </View>
  );
};

export default TimeSelectionSlider;
