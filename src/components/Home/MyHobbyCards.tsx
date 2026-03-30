import { Text, View } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';

interface SummaryCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
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
];

const MyHobbyCard = ({ isDark, tokens }: SummaryCardProps) => {
  const hobbyCards = myHobbyList.map((hobby) => (
    <View
      key={hobby.name}
      className={`${isDark ? 'bg-card-bg border-border' : 'bg-card-bg-light border-border-light'} flex h-28 w-[85px] items-center justify-center gap-1 rounded-2xl border`}>
      <Text className="text-3xl">{hobby.emoji}</Text>
      <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
        {hobby.name}
      </Text>
      <View className={`${isDark ? ' bg-purple-700' : 'bg-card-bg-elevated-light'} rounded-full px-1`}>
        <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} text-xs`}>
          {hobby.StreakScore}d 🔥
        </Text>
      </View>
    </View>
  ));

  return (
    <View>
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 opacity-70`}>
        MY HOBBIES
      </Text>
      <View className="flex flex-row justify-between">
        {hobbyCards}
        <View
          className={`${isDark ? 'bg-card-bg border-border' : 'bg-card-bg-light border-border-light'} flex h-28 w-20 items-center justify-center gap-1 rounded-2xl border`}>
          <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>+</Text>
          <Text className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>Add</Text>
        </View>
      </View>
    </View>
  );
};

export default MyHobbyCard;
