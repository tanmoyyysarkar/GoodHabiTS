import { useThemeTokens } from '@/hooks/useThemeTokens';
import { Pressable, Text } from 'react-native';

type LogOutButtonProps = {
  text: string;
  onPress: () => void;
};

const LogOutButton = ({ text, onPress }: LogOutButtonProps) => {
  const tokens = useThemeTokens();

  return (
    <Pressable
      className="h-12 items-center justify-center rounded-xl mb-10"
      style={{ backgroundColor: tokens.buttonPrimary }}
      onPress={onPress}>
      <Text className="font-jetbrains-mono-bold text-lg text-white">{text}</Text>
    </Pressable>
  );
};

export default LogOutButton;
