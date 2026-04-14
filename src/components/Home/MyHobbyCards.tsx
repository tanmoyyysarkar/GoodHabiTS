import { Text, View, Pressable, TouchableOpacity } from 'react-native';
import { ThemeTokens } from '@/theme/tokens';
import { HobbyCardData } from '@/screens/HomeScreen';
import Popover, { PopoverPlacement } from 'react-native-popover-view';
import { Ionicons } from '@expo/vector-icons';

interface MyHobbyCardProps {
  isDark: boolean;
  tokens: ThemeTokens;
  hobbyData: HobbyCardData[];
  onAddPress: () => void;
  onLongPress: (hobbyId: string) => void;
}

const MyHobbyCard = ({ hobbyData, isDark, tokens, onAddPress, onLongPress }: MyHobbyCardProps) => {
  const hobbyCards = hobbyData.map((hobby) => (
    <Pressable key={hobby.id} onLongPress={() => onLongPress(hobby.id)}>
      <View
        className={`${isDark ? ' bg-card-bg' : ' bg-card-bg-light'} flex h-28 w-[100px] items-center justify-center gap-1 rounded-2xl`}
        style={{
          borderWidth: 0.5,
          borderColor: hobby.color,
          // shadowColor: tokens.border,
          // shadowOffset: { width: 0, height: 8 },
          // shadowOpacity: 0.25,
          // shadowRadius: 12,
          // elevation: 6,
        }}>
        <Text className="text-3xl">{hobby.emoji}</Text>
        <View className="w-full items-center px-1">
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} w-full text-center font-jetbrains-mono-light text-sm leading-4`}>
            {hobby.name.trim()}
          </Text>
        </View>
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
    <View className="gap-2">
      <View className="flex-row items-center justify-between">
        <Text
          className={`${isDark ? `text-text-secondary` : `text-text-tertiary-light`} pb-4 font-jetbrains-mono opacity-70`}>
          MY HOBBIES
        </Text>
        <Popover
          placement={PopoverPlacement.LEFT}
          popoverStyle={{ backgroundColor: 'transparent' }}
          from={
            <TouchableOpacity>
              <Ionicons name="information-circle" color={tokens.textPrimary} size={24} />
            </TouchableOpacity>
          }>
          <View
            className="px-3 py-2"
            style={{
              backgroundColor: tokens.cardBgElevated,
              borderRadius: 14,
              maxWidth: 220,
              borderWidth: 1,
              borderColor: tokens.border,
            }}>
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 6 }}>
              <Text
                style={{
                  color: tokens.textPrimary,
                  fontSize: 13,
                  lineHeight: 18,
                  flexShrink: 1,
                }}>
                Long press a hobby to edit or delete it
              </Text>
              <Text
                style={{
                  color: tokens.textSecondary,
                  fontSize: 10,
                  lineHeight: 18,
                  flexShrink: 1,
                }}>
                Streak Logic is not implemented yet 😅
              </Text>
            </View>
          </View>
        </Popover>
      </View>

      <View className="flex w-full items-center justify-center">
        <View className="w-[324px] flex-row flex-wrap content-start justify-start gap-3">
          <Pressable
            onPress={onAddPress}
            className={`${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} flex h-28 w-[100px] items-center justify-center gap-1 rounded-2xl active:opacity-70`}
            style={{borderWidth: 0.5}}
            >
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
