import { LayoutChangeEvent, View } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useEffect, useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS_BY_ROUTE: Partial<Record<string, IoniconName>> = {
  index: 'home',
  hobbies: 'barbell',
  insights: 'bar-chart',
  profile: 'person',
}; // Map each route to the icon shown in the custom tab bar.

const INDICATOR_HORIZONTAL_PADDING = 20; // Makes highlight narrower than tab width.
const INDICATOR_VERTICAL_PADDING = 15; // Makes highlight slightly shorter than bar height.
const INDICATOR_SPRING_CONFIG = {
  damping: 18,
  stiffness: 180,
  mass: 0.8,
}; // Controls smoothness/bounce of highlight movement.

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme(); // Theme-aware colors (light/dark safe).
  const { buildHref } = useLinkBuilder(); // Supports links on web and deep links.
  const [dimensions, setDimensions] = useState({ height: 20, width: 100 }); // Fallback before onLayout runs.

  const buttonWidth = dimensions.width / state.routes.length;
  const indicatorWidth = buttonWidth - INDICATOR_HORIZONTAL_PADDING; // Pill width inside each tab cell.
  const indicatorOffset = (buttonWidth - indicatorWidth) / 2; // Centers pill inside the tab.

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  }; // Recompute dimensions on first layout and orientation changes.

  const tabPositionX = useSharedValue(0); // Animated X position of active highlight.

  useEffect(() => {
    tabPositionX.value = withSpring(state.index * buttonWidth, INDICATOR_SPRING_CONFIG);
  }, [buttonWidth, state.index, tabPositionX]); // Keep highlight synced when active tab changes.

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value + indicatorOffset }],
    };
  }); // Runs on UI thread for smooth 60fps transform updates.

  return (
    // Floating-card shadow: iOS shadow + Android elevation.
    <View
      onLayout={onTabBarLayout}
      className="absolute bottom-7 mx-12 flex-row items-center justify-between rounded-[35] bg-white py-3"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 10,
        elevation: 8,
      }}>
      <Animated.View
        // Active-tab highlight that slides behind icons/labels.
        className="absolute rounded-[30]"
        style={[animatedStyle, {
          backgroundColor: colors.primary,
          height: dimensions.height - INDICATOR_VERTICAL_PADDING,
          width: indicatorWidth,
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name; // Default label fallback.

        const isFocused = state.index === index;
        const color = isFocused ? colors.background : colors.text; // Contrast color on active highlight.
        const iconName = ICONS_BY_ROUTE[route.name] ?? 'ellipse'; // Safe fallback icon.
        const labelContent =
          typeof label === 'function'
            ? label({
                focused: isFocused,
                color,
                position: options.tabBarLabelPosition ?? 'below-icon',
                children: route.name,
              })
            : label; // Resolve function labels to renderable content.

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          }); // Let listeners intercept tab presses first.

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          }); // Expose long-press event hook.
        };

        return (
          <TabBarButton
            key={route.key}
            route={route}
            isFocused={isFocused}
            color={color}
            label={labelContent}
            iconName={iconName}
            href={buildHref(route.name, route.params) ?? ''}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
