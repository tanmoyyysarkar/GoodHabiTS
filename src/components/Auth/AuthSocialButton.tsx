import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View, Alert } from 'react-native';

type AuthSocialButtonProps = {
  icon: 'logo-google' | 'logo-apple';
  text: string;
  onPress: () => void;
  disabled?: boolean;
};

const AuthSocialButton = ({ icon, text, onPress, disabled = false }: AuthSocialButtonProps) => {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    if (disabled) {
      Alert.alert('Not Supported', `${text} login is currently not supported.`);
      return;
    }
    onPress();
  };

  return (
    <Pressable
      className={`h-12 flex-1 flex-row items-center justify-center gap-2 rounded-xl border ${isDark ? 'border-border bg-card-bg-elevated' : 'border-border-light bg-card-bg-elevated-light'} ${disabled ? 'opacity-50' : ''}`}
      onPress={handlePress}
      disabled={disabled}>
      <View className="flex-row gap-2 px-4">
        <Ionicons name={icon} size={18} color={isDark ? '#ffffff' : '#000000'} />
        <Text
          className={`font-jetbrains-mono-semibold ${isDark ? 'text-text-primary' : 'text-text-primary-light'}`}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default AuthSocialButton;
