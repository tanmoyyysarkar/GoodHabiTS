import { Text, PlatformPressable } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { Route } from '@react-navigation/routers';
import { ReactNode, useEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

type TabBarButtonProps = {
  route: Route<string>;
  isFocused: boolean;
  color: string;
  label: string | number | ReactNode;
  iconName: IoniconName;
  href: string;
  accessibilityLabel?: string;
  testID?: string;
  onPress: () => void;
  onLongPress: () => void;
};

const TabBarButton = ({
  route,
  isFocused,
  color,
  label,
  iconName,
  href,
  accessibilityLabel,
  testID,
  onPress,
  onLongPress,
}: TabBarButtonProps) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(isFocused ? 1 : 0, {
      duration: 350,
    });
  }, [scale, isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {

    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.5]);
    const top = interpolate(scale.value, [0, 1], [1, 9]);

    return {
      transform: [{ scale: scaleValue }],
      top
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return { opacity };
  });

  return (
    <PlatformPressable
      key={route.key}
      href={href}
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      onPress={onPress}
      onLongPress={onLongPress}
      className="flex-1 items-center justify-center gap-2">
      <Animated.View style={animatedIconStyle}>
        <Ionicons name={iconName} size={24} color={color} />
      </Animated.View>
      {typeof label === 'string' || typeof label === 'number' ? (
        <Animated.Text className="text-xs font-semibold" style={[{ color }, animatedTextStyle]}>{label}</Animated.Text>
      ) : label && typeof label === 'object' && '$$typeof' in label ? (
        label
      ) : label ? (
        <Animated.Text className="text-xs font-semibold" style={[{ color }, animatedTextStyle]}>{String(label)}</Animated.Text>
      ) : null}
    </PlatformPressable>
  );
};

export default TabBarButton;
