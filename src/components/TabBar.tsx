import { LayoutChangeEvent, View } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const ICONS_BY_ROUTE: Partial<Record<string, IoniconName>> = {
  index: 'home',
  hobbies: 'barbell',
  insights: 'bar-chart',
  profile: 'person',
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  const [dimensions, setDimensions] = useState({ height: 20, width: 100 });

  const buttonWidth = dimensions.width / state.routes.length;

  const onTabBarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      height: e.nativeEvent.layout.height,
      width: e.nativeEvent.layout.width,
    });
  };

  const tabPositionX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: tabPositionX.value }],
    };
  });

  return (
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
        className="absolute mx-3 rounded-[30]"
        style={[animatedStyle,{
          backgroundColor: colors.primary,
          height: dimensions.height - 15,
          width: buttonWidth - 20
        }]}
      />
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const color = isFocused ? colors.background : colors.text;

        const iconName = ICONS_BY_ROUTE[route.name] ?? 'ellipse';

        const labelContent =
          typeof label === 'function'
            ? label({
                focused: isFocused,
                color,
                position: options.tabBarLabelPosition ?? 'below-icon',
                children: route.name,
              })
            : label;

        const onPress = () => {
          tabPositionX.value = withSpring(buttonWidth * index, { duration: 1000 });
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
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
