import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutAnimation, Pressable, Text, View } from 'react-native';

interface HobbyBreakDownCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

interface HobbyData {
  name: string;
  color: string;
  totalTime: number;
}

interface HobbyBreakDownListItemProps extends HobbyData {
  isDark: boolean;
  index: number;
}

const HobbyBreakDownListItem = ({
  name,
  color,
  totalTime,
  isDark,
  index,
}: HobbyBreakDownListItemProps) => {
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-b-0 ${index === 0 ? 'border-t-0' : ''} py-4`}>
      <View className="flex-row items-center justify-center gap-4">
        <View className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-md font-jetbrains-mono-light`}>
          {name}
        </Text>
      </View>
      <Text
        className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
        {totalTime}hrs
      </Text>
    </View>
  );
};

const HobbyBreakDownCard = ({ isDark, tokens }: HobbyBreakDownCardProps) => {
  const collapsedLastIndex = 2;
  const HobbyBreakdownData: HobbyData[] = [
    {
      name: 'Guitar',
      color: '#9500ff',
      totalTime: 87,
    },
    {
      name: 'Running',
      color: '#1cc099',
      totalTime: 38,
    },
    {
      name: 'Sketching',
      color: '#ee4242',
      totalTime: 50,
    },
    {
      name: 'Reading',
      color: '#4a90e2',
      totalTime: 64,
    },
    {
      name: 'Cooking',
      color: '#ff8a00',
      totalTime: 42,
    },
    {
      name: 'Cycling',
      color: '#00b894',
      totalTime: 71,
    },
    {
      name: 'Photography',
      color: '#6c5ce7',
      totalTime: 29,
    },
  ];

  const [lastIndex, setLastIndex] = useState(
    HobbyBreakdownData.length > collapsedLastIndex
      ? collapsedLastIndex
      : HobbyBreakdownData.length - 1
  );
  const isExpanded = lastIndex === HobbyBreakdownData.length - 1;
  const arrowRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const expandProgress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const [renderExtraItems, setRenderExtraItems] = useState(isExpanded);
  const [extraContentHeight, setExtraContentHeight] = useState(0);

  const baseItems = HobbyBreakdownData.slice(
    0,
    Math.min(collapsedLastIndex + 1, HobbyBreakdownData.length)
  );
  const extraItems = HobbyBreakdownData.slice(collapsedLastIndex + 1);

  useEffect(() => {
    Animated.timing(arrowRotation, {
      toValue: isExpanded ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [arrowRotation, isExpanded]);

  useEffect(() => {
    if (isExpanded) {
      setRenderExtraItems(true);
    }

    Animated.timing(expandProgress, {
      toValue: isExpanded ? 1 : 0,
      duration: 260,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished && !isExpanded) {
        setRenderExtraItems(false);
      }
    });
  }, [expandProgress, isExpanded]);

  const handleArrowPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (lastIndex === collapsedLastIndex) setLastIndex(HobbyBreakdownData.length - 1);
    else setLastIndex(collapsedLastIndex);
  };

  const rotate = arrowRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const animatedExtraHeight = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.max(extraContentHeight, 1)],
  });
  const animatedExtraTranslateY = expandProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [-8, 0],
  });

  return (
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} rounded-2xl border p-2 px-4`}
      style={{
        borderWidth: 1,
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}>
      {baseItems.map((hobbyData, index) => (
        <HobbyBreakDownListItem
          color={hobbyData.color}
          index={index}
          isDark={isDark}
          name={hobbyData.name}
          totalTime={hobbyData.totalTime}
          key={hobbyData.name}
        />
      ))}
      {extraItems.length > 0 && renderExtraItems ? (
        <Animated.View
          style={{
            height: animatedExtraHeight,
            opacity: expandProgress,
            transform: [{ translateY: animatedExtraTranslateY }],
            overflow: 'hidden',
          }}>
          <View
            onLayout={(event) => {
              const nextHeight = event.nativeEvent.layout.height;
              if (nextHeight > 0 && nextHeight !== extraContentHeight) {
                setExtraContentHeight(nextHeight);
              }
            }}>
            {extraItems.map((hobbyData, extraIndex) => (
              <HobbyBreakDownListItem
                color={hobbyData.color}
                index={collapsedLastIndex + 1 + extraIndex}
                isDark={isDark}
                name={hobbyData.name}
                totalTime={hobbyData.totalTime}
                key={hobbyData.name}
              />
            ))}
          </View>
        </Animated.View>
      ) : null}
      {HobbyBreakdownData.length > 3 ? (
        <Pressable onPress={handleArrowPress} className="flex w-full items-center justify-center">
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons size={24} color={tokens.textPrimary} name="chevron-down-outline" />
          </Animated.View>
        </Pressable>
      ) : null}
    </View>
  );
};

export default HobbyBreakDownCard;
