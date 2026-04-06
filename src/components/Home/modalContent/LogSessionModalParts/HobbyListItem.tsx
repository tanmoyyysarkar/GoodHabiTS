import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { HobbyListItemProps } from '../../../../types/logSessionModalTypes';

export const HobbyListItem = ({
  name,
  icon,
  streakCount,
  color,
  minutesPerDay,
  isDark,
  tertiaryTextColor,
  onPress,
}: HobbyListItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <View className="mx-3 flex-row items-center justify-between gap-2">
        <View className="flex-row gap-3">
          <View
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: `${color}70`,
              borderColor: color,
              borderWidth: 2,
            }}>
            <Text className="text-3xl">{icon}</Text>
          </View>
          <View className="flex gap-1">
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono text-lg`}>
              {name}
            </Text>
            <View className="flex-row items-center gap-1">
              <View style={{ backgroundColor: `${color}60` }} className="rounded-full p-1">
                <Text className="font-jetbrains-mono text-xs" style={{ color: color }}>
                  🎯 {minutesPerDay}m/day
                </Text>
              </View>
              <Text className="ml-2 font-jetbrains-mono text-xs" style={{ color: tertiaryTextColor }}>
                🔥{streakCount}day streak
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Ionicons name="chevron-forward-outline" size={24} color={tertiaryTextColor}></Ionicons>
        </View>
      </View>
    </Pressable>
  );
};
