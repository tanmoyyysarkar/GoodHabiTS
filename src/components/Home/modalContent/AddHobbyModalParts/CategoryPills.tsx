import { useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { CategoryProp } from '../../../../types/addHobbyModalTypes';

export const CategoryPills = ({
  name,
  isSelected,
  onPress,
  isDark,
  selectedColor,
  tokens,
}: CategoryProp) => {
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1.06 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isSelected ? 1.06 : 1,
      useNativeDriver: true,
      friction: 7,
      tension: 120,
    }).start();
  }, [isSelected, scaleAnim]);

  return (
    <Pressable onPress={onPress}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View
          className="flex h-10 items-center justify-center rounded-full border px-3"
          style={{
            backgroundColor: isSelected ? `${selectedColor}70` : tokens.cardBgElevated,
            borderColor: isSelected ? selectedColor : tokens.border,
          }}>
          <Text
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-md font-jetbrains-mono-light`}>
            {name}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};
