import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { ModalHeaderProps } from '../../../../types/logSessionModalTypes';

export const HobbyListHeader = ({ isDark, tokens, onClose }: ModalHeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-t-0 p-4`}>
      <View className="flex-col justify-between">
        <Text
          className={`${isDark ? 'text-text-tertiary' : 'text-text-tertiary-light'} font-jetbrains-mono text-sm`}>
          SELECT HOBBY
        </Text>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-3xl`}>
          Which one today?
        </Text>
      </View>
      <Pressable className="ml-4 active:opacity-70" onPress={onClose}>
        <View
          className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-10 w-10 items-center justify-center rounded-full border`}>
          <Ionicons name="close-outline" size={24} color={tokens.textPrimary} />
        </View>
      </Pressable>
    </View>
  );
};
