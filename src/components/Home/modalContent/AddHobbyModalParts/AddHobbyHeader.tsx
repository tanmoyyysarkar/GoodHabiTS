import { Pressable, Text, View } from 'react-native';
import { AddHobbyHeaderProps } from '../../../../types/addHobbyModalTypes';
import { Ionicons } from '@expo/vector-icons';

export const AddHobbyHeader = ({
  isDark,
  selectedColor,
  selectedIcon,
  mode,
}: AddHobbyHeaderProps) => {
  return (
    <View
      className={`${isDark ? 'border-b-border' : 'border-b-border-light'} w-full flex-row items-center justify-between border border-x-0 border-t-0 py-4 pl-4 pr-8`}>
      <View className="justify flex-row items-center">
        <View
          className="h-16 w-16 items-center justify-center rounded-3xl"
          style={{
            backgroundColor: `${selectedColor}70`,
            borderColor: selectedColor,
            borderWidth: 1,
          }}>
          <Text className="text-center text-3xl">{selectedIcon}</Text>
        </View>

        <View className="ml-3 flex justify-center">
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
            {mode === 'add' ? 'New Hobby' : 'Edit Hobby'}
          </Text>
          <Text
            className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
            {mode === 'add' ? "Build a habit you'll love" : 'Manage your existing hobby'}
          </Text>
        </View>
      </View>

      {mode === 'edit' ? (
        <Pressable
        //TODO ADD THE DELETE HOBBY FUNCTIONALITY HERE
        >
          <Ionicons name="trash-outline" size={36} color="red" />
        </Pressable>
      ) : null}
    </View>
  );
};
