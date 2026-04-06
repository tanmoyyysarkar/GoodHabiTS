import { Pressable, Text, View } from 'react-native';
import { LogSessionMenuFooterProps } from '../../../../types/logSessionModalTypes';

export const LogSessionMenuFooter = ({
  isDark,
  accentColor,
  selectedMoodName,
  onCancel,
  onSubmit,
}: LogSessionMenuFooterProps) => {
  return (
    <View className="flex-row gap-4 pt-4">
      <View
        className={`${isDark ? 'border-border bg-card-bg-elevated' : 'bg-card-bg-elevated-lightr border-border-light'} flex h-16 w-36 flex-row items-center justify-center rounded-2xl border`}>
        <Pressable className="active:opacity-70" onPress={onCancel}>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
            Cancel
          </Text>
        </Pressable>
      </View>
      <View
        className="flex h-16 flex-1 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `${accentColor}70`,
          borderColor: accentColor,
          borderWidth: 1,
        }}>
        <Pressable disabled={selectedMoodName ? false : true} onPress={onSubmit}>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
            Log Session →
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
