import { ThemeTokens } from '@/theme/tokens';
import { Mood } from '@/types/logSessionModalTypes';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, Pressable } from 'react-native';

interface DoneForTodayProps {
  isDoneForToday: boolean;
  selectedMood: Mood | null;
  color: string;
  tokens: ThemeTokens;
  isDark: boolean;
  onToggle: () => void;
  minutesPerDay: number;
}

const DoneForToday = ({
  isDoneForToday,
  color,
  isDark,
  onToggle,
  selectedMood,
  tokens,
  minutesPerDay,
}: DoneForTodayProps) => {
  return (
    <View
      className=" h-20 w-full flex-row items-center justify-between rounded-2xl p-3"
      style={{
        backgroundColor: isDoneForToday
          ? selectedMood
            ? `${selectedMood.color}70`
            : `${color}70`
          : tokens.cardBgElevated,
        borderWidth: 1,
        borderColor: isDoneForToday ? (selectedMood ? selectedMood.color : color) : tokens.border,
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
      <Pressable onPress={onToggle} className="px-2">
        <Ionicons
          name={isDoneForToday ? 'checkmark-circle-outline' : 'ellipse-outline'}
          size={40}
          color={isDoneForToday ? (selectedMood ? selectedMood.color : color) : tokens.textSecondary}
        />
      </Pressable>
    </View>
  );
};

export default DoneForToday;
