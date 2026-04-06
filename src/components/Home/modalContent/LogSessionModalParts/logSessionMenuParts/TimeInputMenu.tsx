import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemeTokens } from '@/theme/tokens';
import { Mood, Time } from '@/types/logSessionModalTypes';

interface props {
  incHour: () => void;
  decHour: () => void;
  incMin: () => void;
  decMin: () => void;
  tokens: ThemeTokens;
  selectedMood: Mood | null;
  timeDone: Time;
}

const TimeInputMenu = ({
  decHour,
  decMin,
  incHour,
  incMin,
  selectedMood,
  tokens,
  timeDone,
}: props) => {
  return (
    <View className="flex-row items-center justify-center gap-2">
      <View className="flex items-center justify-center gap-2">
        <Pressable
          onPress={incHour}
          className="flex h-8 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.border,
            borderWidth: 1,
          }}>
          <Ionicons name="chevron-up-outline" size={24} color={tokens.textTertiary} />
        </Pressable>
        <View
          className="flex h-12 w-16 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: selectedMood ? selectedMood.color : tokens.border,
            borderWidth: 1,
          }}>
          <Text className="font-jetbrains-mono-bold text-2xl" style={{ color: tokens.textPrimary }}>
            {timeDone.hours}
          </Text>
        </View>
        <Pressable
          className="flex h-8 w-12 items-center justify-center rounded-xl"
          onPress={decHour}
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.border,
            borderWidth: 1,
          }}>
          <Ionicons name="chevron-down-outline" size={24} color={tokens.textTertiary} />
        </Pressable>
      </View>
      <Text className="font-jetbrains-mono-bold text-4xl" style={{ color: tokens.textTertiary }}>
        :
      </Text>
      <View className="flex items-center justify-center gap-2">
        <Pressable
          className="flex h-8 w-12 items-center justify-center rounded-xl"
          onPress={incMin}
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.border,
            borderWidth: 1,
          }}>
          <Ionicons name="chevron-up-outline" size={24} color={tokens.textTertiary} />
        </Pressable>
        <View
          className="flex h-12 w-16 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: selectedMood ? selectedMood.color : tokens.border,
            borderWidth: 1,
          }}>
          <Text className="font-jetbrains-mono-bold text-2xl" style={{ color: tokens.textPrimary }}>
            {timeDone.minutes}
          </Text>
        </View>
        <Pressable
          onPress={decMin}
          className="flex h-8 w-12 items-center justify-center rounded-xl"
          style={{
            backgroundColor: tokens.cardBg,
            borderColor: tokens.border,
            borderWidth: 1,
          }}>
          <Ionicons name="chevron-down-outline" size={24} color={tokens.textTertiary} />
        </Pressable>
      </View>
    </View>
  );
};

export default TimeInputMenu;
