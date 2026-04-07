import { useThemeTokens } from '@/hooks/useThemeTokens';
import { Pressable, Text } from 'react-native';

type AuthPrimaryButtonProps = {
  text: string;
  loadingText?: string;
  isLoading?: boolean;
  onPress: () => void;
  disabled?: boolean;
};

const AuthPrimaryButton = ({
  text,
  loadingText,
  isLoading = false,
  onPress,
  disabled = false,
}: AuthPrimaryButtonProps) => {
  const tokens = useThemeTokens();
  const isDisabled = disabled || isLoading;

  return (
    <Pressable
      className="h-12 items-center justify-center rounded-xl"
      style={{ backgroundColor: tokens.buttonPrimary, opacity: isDisabled ? 0.65 : 1 }}
      onPress={onPress}
      disabled={isDisabled}>
      <Text className="font-jetbrains-mono-bold text-lg text-white">
        {isLoading ? loadingText ?? text : text}
      </Text>
    </Pressable>
  );
};

export default AuthPrimaryButton;
