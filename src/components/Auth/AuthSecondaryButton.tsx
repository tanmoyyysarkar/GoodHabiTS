import { useColorScheme } from 'nativewind';
import { Pressable, Text } from 'react-native';

type AuthSecondaryButtonProps = {
  text: string;
  onPress: () => void;
};

const AuthSecondaryButton = ({ text, onPress }: AuthSecondaryButtonProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      className={`h-12 items-center justify-center rounded-xl border ${isDark ? 'border-border' : 'border-border-light'}`}
      onPress={onPress}>
      <Text
        className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-secondary' : 'text-text-secondary-light'}`}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AuthSecondaryButton;
