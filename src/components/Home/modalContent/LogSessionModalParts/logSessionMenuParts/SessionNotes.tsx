import { ThemeTokens } from '@/theme/tokens';
import { Mood } from '@/types/logSessionModalTypes';
import { TextInput, View } from 'react-native';

interface SessionNotesProps {
  color: string;
  notes: string;
  onChangeText: (text: string) => void;
  selectedMood: Mood | null;
  tokens: ThemeTokens;
}

const SessionNotes = ({ color, notes, onChangeText, selectedMood, tokens }: SessionNotesProps) => {
  return (
    <View
      className="h-32 w-full overflow-hidden rounded-2xl border px-3"
      style={{
        backgroundColor: tokens.cardBgElevated,
        borderColor: selectedMood ? selectedMood.color : color,
        borderWidth: 1,
      }}>
      <TextInput
        multiline
        placeholder="Optional"
        placeholderTextColor={tokens.textTertiary}
        value={notes}
        onChangeText={onChangeText}
        textAlignVertical="top"
        className="flex-1 pt-3 font-jakarta-sans-light text-md"
        style={{ color: tokens.textPrimary }}
      />
    </View>
  );
};

export default SessionNotes;
