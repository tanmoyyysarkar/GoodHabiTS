import { useSettings } from '@/context/SettingsContext';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, View } from 'react-native';

interface ThemeSliderButtonTypes {
  tokens: ThemeTokens;
}

const OPTIONS = ['light', 'system', 'dark'] as const;
const FALLBACK_BUTTON_WIDTH = 56;
const INDICATOR_SIZE = 48;

const ThemeSliderButton = ({ tokens }: ThemeSliderButtonTypes) => {
  const { changeColorScheme, colorSchemePreference } = useSettings();
  const [trackWidth, setTrackWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const selectedIndex = useMemo(() => {
    return OPTIONS.indexOf(colorSchemePreference);
  }, [colorSchemePreference]);

  const buttonWidth = trackWidth > 0 ? trackWidth / OPTIONS.length : FALLBACK_BUTTON_WIDTH;
  const indicatorOffsetX = buttonWidth > 0 ? (buttonWidth - INDICATOR_SIZE) / 2 : 0;

  useEffect(() => {
    if (buttonWidth <= 0) return;

    Animated.spring(translateX, {
      toValue: selectedIndex * buttonWidth + indicatorOffsetX,
      useNativeDriver: true,
      speed: 16,
      bounciness: 0,
    }).start();
  }, [buttonWidth, selectedIndex, indicatorOffsetX, translateX]);

  const onTrackLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      className="rounded-full p-2"
      style={{
        backgroundColor: tokens.cardBgElevated,
        borderWidth: 1,
        borderColor: tokens.border,
      }}>
      <View
        onLayout={onTrackLayout}
        className="relative flex-row items-center rounded-full"
        style={{ overflow: 'hidden' }}>
        {buttonWidth > 0 ? (
          <Animated.View
            pointerEvents="none"
            className="absolute rounded-full"
            style={{
              left: 0,
              top: '50%',
              width: INDICATOR_SIZE,
              height: INDICATOR_SIZE,
              borderRadius: INDICATOR_SIZE / 2,
              backgroundColor: tokens.buttonPrimary,
              transform: [{ translateX }, { translateY: -(INDICATOR_SIZE / 2) }],
            }}
          />
        ) : null}

        <Pressable
          onPress={() => changeColorScheme('light')}
          style={{ width: buttonWidth }}
          className="items-center justify-center py-2">
          <Ionicons
            size={40}
            color={selectedIndex === 0 ? '#fff5ec' : tokens.textPrimary}
            name={colorSchemePreference === 'light' ? 'sunny' : 'sunny-outline'}
          />
        </Pressable>
        <Pressable
          onPress={() => changeColorScheme('system')}
          style={{ width: buttonWidth }}
          className="items-center justify-center py-2">
          <Ionicons
            size={32}
            color={selectedIndex === 1 ? '#fff5ec' : tokens.textPrimary}
            name={colorSchemePreference === 'system' ? 'desktop' : 'desktop-outline'}
          />
        </Pressable>
        <Pressable
          onPress={() => changeColorScheme('dark')}
          style={{ width: buttonWidth }}
          className="items-center justify-center py-2">
          <Ionicons
            size={40}
            color={selectedIndex === 2 ? '#fff5ec' : tokens.textPrimary}
            name={colorSchemePreference === "dark" ? "moon" : "moon-outline"}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default ThemeSliderButton;
