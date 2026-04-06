import { Text, View } from 'react-native';
import { AddHobbyHeaderProps } from '../../../../types/addHobbyModalTypes';

export const AddHobbyHeader = ({ isDark, selectedColor, selectedIcon }: AddHobbyHeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-b-border' : 'border-b-border-light'} w-full flex-row border border-x-0 border-t-0 p-4`}>
      <View
        className="h-16 w-16 items-center justify-center rounded-3xl"
        style={{ backgroundColor: selectedColor }}>
        <Text className="text-center text-3xl">{selectedIcon}</Text>
      </View>

      <View className="ml-3 flex justify-center">
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
          New Hobby
        </Text>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
          Build a habit you'll love
        </Text>
      </View>
    </View>
  );
};
