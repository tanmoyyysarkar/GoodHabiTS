import { ThemeTokens } from '@/theme/tokens';
import { Mood } from '@/types/logSessionModalTypes';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

interface DoneForTodayProps {
  doneForToday: boolean;
  selectedMood: Mood | null;
  color: string;
  tokens: ThemeTokens;
  isDark: boolean;
  onPress: () => void;
  minutesPerDay: number;
}

const DoneForToday = ({
  doneForToday,
  color,
  isDark,
  onPress,
  selectedMood,
  tokens,
  minutesPerDay,
}: DoneForTodayProps) => {
  return (
    <View
      className=" h-20 w-full flex-row items-center justify-between rounded-2xl p-3"
      style={{
        backgroundColor: doneForToday
          ? selectedMood
            ? `${selectedMood.color}70`
            : `${color}70`
          : tokens.cardBgElevated,
        borderWidth: 1,
        borderColor: doneForToday ? (selectedMood ? selectedMood.color : color) : tokens.border,
      }}>
      <View>
        <Text
          className={`${isDark ? 'text-text-primary' : 'text-text-primary-light'} font-jetbrains-mono-bold text-xl`}>
          Done For Today!
        </Text>
        <Text
          className={`${isDark ? 'text-text-secondary' : 'text-text-secondary-light'} font-jetbrains-mono text-sm`}>
          Mark {minutesPerDay}m - Your daily goal
        </Text>
      </View>
      <Pressable onPress={onPress} className="px-2">
        <Ionicons
          name={doneForToday ? 'checkmark-circle-outline' : 'ellipse-outline'}
          size={40}
          color={doneForToday ? (selectedMood ? selectedMood.color : color) : tokens.textSecondary}
        />
      </Pressable>
    </View>
  );
};

export default DoneForToday;
