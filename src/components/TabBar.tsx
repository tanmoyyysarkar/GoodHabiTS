import { Animated as RNAnimated, LayoutChangeEvent, View } from 'react-native';
import { useLinkBuilder } from '@react-navigation/native';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import { useThemeTokens } from '@/hooks/useThemeTokens';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS_BY_ROUTE: Partial<Record<string, { active: IoniconName; inactive: IoniconName }>> = {
  index: { active: 'home', inactive: 'home-outline' },
  hobbies: { active: 'barbell', inactive: 'barbell-outline' },
  insights: { active: 'bar-chart', inactive: 'bar-chart-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
}; // Map each route to filled/outline icons for focused and unfocused states.

const INDICATOR_HORIZONTAL_PADDING = 20; // Makes highlight narrower than tab width.
const INDICATOR_VERTICAL_PADDING = 15; // Makes highlight slightly shorter than bar height.

export function TabBar({ state, descriptors, navigation, position }: MaterialTopTabBarProps) {
  const theme = useThemeTokens(); // Load custom theme tokens first.
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

  // `position` is provided by material-top-tabs and updates continuously while dragging.
  // Mapping position -> pixels makes the indicator follow finger movement in real time.
  const translateX = RNAnimated.add(RNAnimated.multiply(position, buttonWidth), indicatorOffset); // Tracks finger drag progress in real time.

  return (
    // Floating-card shadow: iOS shadow + Android elevation.
    <View
      onLayout={onTabBarLayout}
      className="absolute bottom-4 mx-12 flex-row items-center justify-between rounded-[35] py-3"
      style={{
        backgroundColor: theme.tabbarBg,
        borderColor: theme.border,
        borderWidth: 1,
      }}>
      <RNAnimated.View
        // Active-tab highlight that slides behind icons/labels.
        className="absolute rounded-[30]"
        style={{
          backgroundColor: theme.buttonPrimary,
          height: dimensions.height - INDICATOR_VERTICAL_PADDING,
          width: indicatorWidth,
          transform: [{ translateX }],
        }}
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
        const color = isFocused ? '#fff5ec' : theme.textSecondary; // Contrast color on active highlight.
        const iconPair = ICONS_BY_ROUTE[route.name] ?? {
          active: 'ellipse',
          inactive: 'ellipse-outline',
        };
        const iconName = isFocused ? iconPair.active : iconPair.inactive;
        const labelContent =
          typeof label === 'function'
            ? label({
                focused: isFocused,
                color,
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
            // Tap navigation still goes through navigator state so swipe and tap stay in sync.
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
            theme={theme}
          />
        );
      })}
    </View>
  );
}
