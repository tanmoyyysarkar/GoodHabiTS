import { Text, View, Pressable, ScrollView } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface SummaryCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
  onAddPress?: () => void;
}

const myHobbyList = [
  {
    emoji: '🎸',
    name: 'Guitar',
    StreakScore: 12,
  },
  {
    emoji: '🏃‍♂️',
    name: 'Running',
    StreakScore: 5,
  },
  {
    emoji: '✏️',
    name: 'Sketching',
    StreakScore: 2,
  },
  {
    emoji: '🎸',
    name: 'Guitar',
    StreakScore: 12,
  },
  {
    emoji: '🏃‍♂️',
    name: 'Running',
    StreakScore: 5,
  },
  {
    emoji: '✏️',
    name: 'Sketching',
    StreakScore: 2,
  },
];

const MyHobbyCard = ({ isDark, tokens, onAddPress }: SummaryCardProps) => {
  const hobbyCards = myHobbyList.map((hobby, index) => (
    <View
      key={index}
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} flex h-28 w-[85px] items-center justify-center gap-1 rounded-2xl border mb-6 mx-2`}
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
          {hobby.StreakScore}d 🔥
        </Text>
      </View>
    </View>
  ));

  return (
    <View className=''>
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 font-jetbrains-mono opacity-70`}>
        MY HOBBIES
      </Text>
      <View className="flex-row items-center">
        <Pressable
          onPress={onAddPress}
          className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} flex h-28 w-[85px] items-center justify-center gap-1 rounded-3xl border active:opacity-70 mr-2 mb-6`}>
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
