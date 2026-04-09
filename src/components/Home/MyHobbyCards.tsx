import { Text, View, Pressable, ScrollView } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface hobbyCardData {
  emoji: string;
  name: string;
  streakScore: number;
}

interface MyHobbyCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onAddPress: () => void;
  hobbyData: hobbyCardData[];
}

const MyHobbyCard = ({
  hobbyData,
  isDark,
  tokens,
  onAddPress,
}: MyHobbyCardProps) => {
  const hobbyCards = hobbyData.map((hobby, index) => (
    <View
      key={index}
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} mx-2 mb-6 flex h-28 w-[85px] items-center justify-center gap-1 rounded-2xl border`}
      style={{
        shadowColor: tokens.border,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
      }}>
      <Text className="text-3xl">{hobby.emoji}</Text>
      <Text
        className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-sm`}>
        {hobby.name}
      </Text>
      <View
        className={`${isDark ? ' bg-purple-700' : 'bg-card-bg-elevated-light'} rounded-full px-1`}>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-xs`}>
          {/* {hobby.streakScore > 0 ? `${hobby.streakScore}d 🔥` : ''} */}
          {hobby.streakScore}d 🔥
        </Text>
      </View>
    </View>
  ));

  return (
    <View className="">
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 font-jetbrains-mono opacity-70`}>
        MY HOBBIES
      </Text>
      <View className="flex-row items-center">
        <Pressable
          onPress={onAddPress}
          className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} mb-6 mr-2 flex h-28 w-[85px] items-center justify-center gap-1 rounded-3xl border active:opacity-70`}>
          <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>+</Text>
          <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>Add</Text>
        </Pressable>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex-row"
          className="flex-1">
          {hobbyCards}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyHobbyCard;
