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

const MyHobbyCard = ({ hobbyData, isDark, tokens, onAddPress }: MyHobbyCardProps) => {
  const hobbyCards = hobbyData.map((hobby, index) => (
    <Pressable key={index}>
    <View
      className={`${isDark ? 'border-border bg-card-bg' : 'border-border-light bg-card-bg-light'} flex h-28 w-[100px] items-center justify-center gap-1 rounded-2xl border`}
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
        {hobby.streakScore >= 0 ? ( //TODO Fix this >= to > after streak logic is put in place
          <View
            className={`${isDark ? ' bg-purple-700' : 'bg-card-bg-elevated-light'} rounded-full px-1`}>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-light text-xs`}>
              {hobby.streakScore}d 🔥
            </Text>
          </View>
        ) : null}
    </View>
      </Pressable>
  ));

  return (
    <View className="">
      <Text
        className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 font-jetbrains-mono opacity-70`}>
        MY HOBBIES
      </Text>
      <View className="flex w-full items-center justify-center">
        <View className="w-[324px] flex-row flex-wrap content-start justify-start gap-3">
          <Pressable
            onPress={onAddPress}
            className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-28 w-[100px] items-center justify-center gap-1 rounded-2xl border active:opacity-70`}>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold`}>
              +
            </Text>
            <Text
              className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
              Add
            </Text>
          </Pressable>
          {hobbyCards}
        </View>
      </View>
    </View>
  );
};

export default MyHobbyCard;
