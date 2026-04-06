import { Pressable, Text, View } from 'react-native';
import { AddHobbyFooterProps } from '../../../../types/addHobbyModalTypes';

export const AddHobbyFooter = ({ isDark, selectedColor, isSubmitting, onClose, onSave }: AddHobbyFooterProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row gap-4 border border-x-0 border-b-0 p-4`}>
      <View
        className={`${isDark ? 'border-border bg-card-bg-elevated' : 'bg-card-bg-elevated-lightr border-border-light'} flex h-16 w-36 flex-row items-center justify-center rounded-2xl border`}>
        <Pressable onPress={onClose} className="active:opacity-70">
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
            Cancle
          </Text>
        </Pressable>
      </View>
      <View
        className="flex h-16 flex-1 items-center justify-center rounded-2xl"
        style={{
          backgroundColor: `${selectedColor}70`,
          borderColor: selectedColor,
          borderWidth: 1,
        }}>
        <Pressable onPress={onSave} disabled={isSubmitting}>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-semibold text-xl`}>
            {isSubmitting ? 'Saving...' : 'Save Hobby'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
