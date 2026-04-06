import { Pressable, View } from 'react-native';
import { ColorProp } from '../../../../types/addHobbyModalTypes';

export const ColorBall = ({ name, isSelected, onPress }: ColorProp) => {
  return (
    <Pressable onPress={onPress}>
      <View
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{ borderColor: name, borderWidth: isSelected ? 4 : 0 }}>
        <View className="h-8 w-8 rounded-full" style={{ backgroundColor: name }} />
      </View>
    </Pressable>
  );
};
