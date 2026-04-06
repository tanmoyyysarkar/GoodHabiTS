import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { IconProp } from '../../../../types/addHobbyModalTypes';

export const IconPills = ({ name, isSelected, onPress, isDark, selectedColor, tokens }: IconProp) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.08 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.08 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [isSelected, scaleAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          className="h-16 w-16 items-center justify-center rounded-2xl border"
          style={{
            backgroundColor: isSelected ? `${selectedColor}70` : tokens.cardBgElevated,
            borderColor: isSelected ? selectedColor : tokens.border,
          }}>
          <Text className="text-2xl">{name}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
