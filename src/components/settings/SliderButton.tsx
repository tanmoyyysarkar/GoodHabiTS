import { ThemeTokens } from '@/theme/tokens';
import { useRef, useState } from 'react';
import { Animated, Pressable, View } from 'react-native';

interface SliderButtonProps {
  tokens: ThemeTokens;
  onToggle: () => void;
}

const SliderButton = ({ tokens, onToggle }: SliderButtonProps) => {
  const [isOn, setIsOn] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

  const TRACK_WIDTH = 56;
  const TRACK_HEIGHT = 32;
  const THUMB_SIZE = 28;
  const TRACK_PADDING = 2;
  const THUMB_TRAVEL = TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2;

  const trackBackgroundColor = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [tokens.cardBgElevated, '#9500ff9a'],
  });

  const thumbTranslateX = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, THUMB_TRAVEL],
  });

  const handlePress = () => {
    setIsOn(prev => {
      const next = !prev;

      Animated.timing(progress, {
        toValue: next ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();

      onToggle();
      return next;
    });
  };

  return (
    <Pressable onPress={handlePress} accessibilityRole="switch" accessibilityState={{ checked: isOn }}>
      <Animated.View
        className="flex-row rounded-full items-center"
        style={{
          width: TRACK_WIDTH,
          height: TRACK_HEIGHT,
          backgroundColor: trackBackgroundColor,
          borderColor: tokens.border,
          borderWidth: 1,
          paddingHorizontal: TRACK_PADDING,
          overflow: 'hidden',
        }}>
        <Animated.View
          className="rounded-full bg-slate-300"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            borderColor: tokens.border,
            borderWidth: 0.5,
            transform: [{ translateX: thumbTranslateX }],
          }}></Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default SliderButton;
