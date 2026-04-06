import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { LogSessionHeaderProps } from '../../../../types/logSessionModalTypes';

export const LogSessionMenuHeader = ({ isDark, tokens, onClose, hobby }: LogSessionHeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-t-0 p-4`}>
      <View className="flex-row justify-between">
        <View
          className="flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: `${hobby.color}70`,
            borderColor: hobby.color,
            borderWidth: 2,
          }}>
          <Text className="text-3xl">{hobby.icon}</Text>
        </View>
        <View className="flex justify-end px-3">
          <Text
            className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-xs`}>
            LOG SESSION
          </Text>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
            {hobby.name}
          </Text>
        </View>
      </View>
      <View className="flex-row items-start">
        <View className="flex h-6 items-center justify-center rounded-full border border-orange-600 bg-orange-600/60 px-2">
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
            🔥{hobby.streakCount}d
          </Text>
        </View>
        <Pressable className="ml-4 active:opacity-70" onPress={onClose}>
          <View
            className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-10 w-12 items-center justify-center rounded-full border`}>
            <Ionicons name="arrow-back-outline" size={24} color={tokens.textPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
};
