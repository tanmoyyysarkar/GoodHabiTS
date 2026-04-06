import { ThemeTokens } from '@/theme/tokens';
import { Text, View } from 'react-native';

interface MilestoneCardProps {
  name: string;
  emoji: string;
  isAchieved: boolean;
  tokens: ThemeTokens;
}

const MilestoneCard = ({ name, emoji, isAchieved, tokens }: MilestoneCardProps) => {
  return (
    <View
      className={`${isAchieved ? "" : "opacity-35"} flex h-24 w-24 items-center justify-center rounded-2xl border p-1`}
      style={{
        backgroundColor: '#003b4e',
        borderColor: '#5bd6ff',
      }}>
      <Text className="text-2xl">{emoji}</Text>
      <Text
        className="text-sm text-center"
        style={{
          color: isAchieved ? 'white' : tokens.textPrimary,
        }}>
        {name}
      </Text>
    </View>
  );
};

export default MilestoneCard;
