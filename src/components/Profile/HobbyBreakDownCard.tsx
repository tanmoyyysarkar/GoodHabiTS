import { fetchAllTimeHobbyStats } from '@/lib/supabase/profile/fetchAllTimeHobbyStats';
import { ThemeTokens } from '@/theme/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, LayoutAnimation, Pressable, Text, View } from 'react-native';

interface HobbyBreakDownCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
}

interface HobbyData {
  hobby_id: string;
  hobby_name: string;
  color: string;
  total_minutes: number;
}

interface HobbyBreakDownListItemProps {
  isDark: boolean;
  index: number;
    hobby_name: string;
  color: string;
  total_minutes: number;
}

const HobbyBreakDownListItem = ({
  hobby_name,
  color,
  total_minutes,
  isDark,
  index,
}: HobbyBreakDownListItemProps) => {
  const hours = Math.floor(total_minutes / 60);
  const minutes = Math.floor(total_minutes % 60);
  return (
    <View
      className={`${isDark ? 'border-border' : 'border-border-light'} flex-row items-center justify-between border border-x-0 border-b-0 ${index === 0 ? 'border-t-0' : ''} py-4`}>
      <View className="flex-row items-center justify-center gap-4">
        <View className="h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-md font-jetbrains-mono-light`}>
          {hobby_name}
        </Text>
      </View>
      <Text
        className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono-light text-sm`}>
        {`${hours > 0 ? `${hours}hrs ` : ''}`}
        {minutes}mins
      </Text>
    </View>
  );
};

const HobbyBreakDownCard = ({ isDark, tokens }: HobbyBreakDownCardProps) => {
  const [hobbyBreakDownData, setHobbyBreakDownData] = useState<HobbyData[]>([]);
  useEffect(() => {
    const loadMetrics = async () => {
      const { success, data, errorMessage } = await fetchAllTimeHobbyStats();
      if (!success) {
        console.log(errorMessage);
        return;
      }
      setHobbyBreakDownData(data as HobbyData[]);
    };
    void loadMetrics();
  });

  const collapsedLastIndex = 2;
  const [lastIndex, setLastIndex] = useState(
    hobbyBreakDownData.length > collapsedLastIndex
      ? collapsedLastIndex
      : hobbyBreakDownData.length - 1
  );
  const isExpanded = lastIndex === hobbyBreakDownData.length - 1;
  const arrowRotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const expandProgress = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
  const [renderExtraItems, setRenderExtraItems] = useState(isExpanded);
  const [extraContentHeight, setExtraContentHeight] = useState(0);

  const baseItems = hobbyBreakDownData.slice(
    0,
    Math.min(collapsedLastIndex + 1, hobbyBreakDownData.length)
  );
  const extraItems = hobbyBreakDownData.slice(collapsedLastIndex + 1);

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

    if (lastIndex === collapsedLastIndex) setLastIndex(hobbyBreakDownData.length - 1);
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
          hobby_name={hobbyData.hobby_name}
          total_minutes={hobbyData.total_minutes}
          key={hobbyData.hobby_id}
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
                hobby_name={hobbyData.hobby_name}
                total_minutes={hobbyData.total_minutes}
                key={hobbyData.hobby_id}
              />
            ))}
          </View>
        </Animated.View>
      ) : null}
      {hobbyBreakDownData.length > 3 ? (
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
