import { Pressable, Text, View } from 'react-native';
import { MoodPillProps } from '../../../../types/logSessionModalTypes';

export const MoodPill = ({ emoji, color, name, tokens, onPress, isSelected }: MoodPillProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl"
        style={{
          backgroundColor: isSelected ? `${color}70` : tokens.cardBgElevated,
          borderColor: isSelected ? color : tokens.border,
          borderWidth: 1,
        }}>
        <Text className="text-3xl">{emoji}</Text>
        <Text
          className="font-jetbrains-mono-light text-xs "
          style={{ color: isSelected ? color : tokens.textSecondary }}>
          {name}
        </Text>
      </View>
    </Pressable>
  );
};
