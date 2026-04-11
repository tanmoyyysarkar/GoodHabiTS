import { Pressable, Text, View } from 'react-native';
import { useState } from 'react';
import { AddHobbyHeaderProps } from '@/types/addHobbyModalTypes';
import { Ionicons } from '@expo/vector-icons';
import Popover, { PopoverPlacement } from 'react-native-popover-view';

export const AddHobbyHeader = ({
  isDark,
  selectedColor,
  selectedIcon,
  mode,
  onDeletePress,
}: AddHobbyHeaderProps) => {
  const [isDeletePopoverVisible, setIsDeletePopoverVisible] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);

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
        <>
          <Pressable onPress={() => setIsDeletePopoverVisible(true)} hitSlop={8}>
            <Ionicons name="trash-outline" size={36} color="red" />
          </Pressable>

          <Popover
            placement={PopoverPlacement.CENTER}
            isVisible={isDeletePopoverVisible}
            onRequestClose={() => setIsDeletePopoverVisible(false)}
            onCloseComplete={() => {
              if (!isPendingDelete) return;
              onDeletePress();
              setIsPendingDelete(false);
            }}
            popoverStyle={{ backgroundColor: 'transparent' }}>
            <View
              className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} mx-4 gap-5 rounded-2xl border`}
              style={{
                width: 300,
                padding: 24,
              }}>
              <Text
                className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-center font-jetbrains-mono-light text-xl`}>
                Are you sure you want to delete this hobby?
              </Text>
              <View className="flex items-center justify-center rounded-2xl bg-button-primary p-3">
                <Pressable
                  onPress={() => {
                    setIsPendingDelete(true);
                    setIsDeletePopoverVisible(false);
                  }}>
                  <Text className="font-jetbrains-mono-bold text-xl text-white">Confirm Delete</Text>
                </Pressable>
              </View>
            </View>
          </Popover>
        </>
      ) : null}
    </View>
  );
};
